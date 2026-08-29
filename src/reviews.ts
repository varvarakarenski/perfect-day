import type { Review } from "./types";
import { mockReviews } from "./data/reviews";
import { loadAdditions } from "./storage";

export function reviewsFor(listingId: string): Review[] {
  const persisted = loadAdditions<Review>("reviews");
  return [...mockReviews, ...persisted].filter((review) => review.listingId === listingId);
}

export function ratingStats(listingId: string): { averageRating: number; reviewCount: number } {
  const reviews = reviewsFor(listingId);
  if (reviews.length === 0) return { averageRating: 0, reviewCount: 0 };
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return { averageRating: sum / reviews.length, reviewCount: reviews.length };
}

export function renderReviewList(container: HTMLElement, reviews: Review[]): void {
  container.innerHTML = "";

  if (reviews.length === 0) {
    const empty = document.createElement("p");
    empty.className = "review-panel-empty";
    empty.textContent = "No reviews yet — be the first!";
    container.appendChild(empty);
    return;
  }

  for (const review of reviews) {
    const item = document.createElement("div");
    item.className = "review-panel-review";

    const rating = document.createElement("p");
    rating.className = "review-panel-review-rating";
    rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const author = document.createElement("p");
    author.className = "review-panel-review-author";
    author.textContent = review.reviewerName;

    const text = document.createElement("p");
    text.className = "review-panel-review-text";
    text.textContent = review.text;

    item.append(rating, author, text);
    container.appendChild(item);
  }
}
