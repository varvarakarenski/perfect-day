import type { Listing, Review } from "./types";
import { mockReviews } from "./data/reviews";
import { appendAddition, loadAdditions } from "./storage";

let overlay: HTMLDivElement | null = null;

function getOverlay(): HTMLDivElement {
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.hidden = true;
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  document.body.appendChild(overlay);
  return overlay;
}

function closeModal(): void {
  if (overlay) overlay.hidden = true;
}

function reviewsFor(listingId: string): Review[] {
  const persisted = loadAdditions<Review>("reviews");
  return [...mockReviews, ...persisted].filter((review) => review.listingId === listingId);
}

export function openReviewModal(listing: Listing, onSubmitted: (review: Review) => void): void {
  const root = getOverlay();
  root.innerHTML = "";
  root.hidden = false;

  const panel = document.createElement("div");
  panel.className = "modal-panel";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "modal-close";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", closeModal);

  const heading = document.createElement("h2");
  heading.textContent = listing.name;

  const reviewsList = document.createElement("div");
  reviewsList.className = "modal-reviews";

  function renderReviews(): void {
    const reviews = reviewsFor(listing.id);
    reviewsList.innerHTML = "";

    if (reviews.length === 0) {
      const empty = document.createElement("p");
      empty.className = "modal-empty";
      empty.textContent = "No reviews yet — be the first!";
      reviewsList.appendChild(empty);
      return;
    }

    for (const review of reviews) {
      const item = document.createElement("div");
      item.className = "modal-review";

      const rating = document.createElement("p");
      rating.className = "modal-review-rating";
      rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

      const author = document.createElement("p");
      author.className = "modal-review-author";
      author.textContent = review.reviewerName;

      const text = document.createElement("p");
      text.className = "modal-review-text";
      text.textContent = review.text;

      item.append(rating, author, text);
      reviewsList.appendChild(item);
    }
  }

  const form = document.createElement("form");
  form.className = "modal-form";
  form.innerHTML = `
    <label>Your name <input name="reviewerName" required /></label>
    <label>Rating
      <select name="rating" required>
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Good</option>
        <option value="3">3 - Average</option>
        <option value="2">2 - Below average</option>
        <option value="1">1 - Poor</option>
      </select>
    </label>
    <label>Review <textarea name="text" required></textarea></label>
    <button type="submit">Submit review</button>
  `;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const review: Review = {
      id: crypto.randomUUID(),
      listingId: listing.id,
      reviewerName: String(data.get("reviewerName") ?? "").trim(),
      rating: Number(data.get("rating")),
      text: String(data.get("text") ?? "").trim(),
      createdAt: new Date().toISOString(),
    };

    appendAddition("reviews", review);
    form.reset();
    renderReviews();
    onSubmitted(review);
  });

  panel.append(closeBtn, heading, reviewsList, form);
  root.appendChild(panel);
  renderReviews();
}
