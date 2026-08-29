import type { Listing, Review } from "./types";
import { appendAddition } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import { bindStarRating } from "./starRating";
import { reviewsFor, renderReviewList } from "./reviews";

const overlay = document.querySelector<HTMLDivElement>(".review-overlay");
const heading = overlay?.querySelector<HTMLHeadingElement>(".review-panel-heading");
const reviewsList = overlay?.querySelector<HTMLDivElement>(".review-panel-reviews");
const form = overlay?.querySelector<HTMLFormElement>(".review-panel-form");

let currentListing: Listing | null = null;
let currentOnSubmitted: ((review: Review) => void) | null = null;

if (overlay) bindOverlayDismiss(overlay);
if (form) bindStarRating(form);

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentListing) return;

  const data = new FormData(form);
  if (!data.get("rating")) return;

  const review: Review = {
    id: crypto.randomUUID(),
    listingId: currentListing.id,
    reviewerName: String(data.get("reviewerName") ?? "").trim(),
    rating: Number(data.get("rating")),
    text: String(data.get("text") ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  await appendAddition("reviews", review);
  form.reset();
  form.querySelectorAll(".star.filled").forEach((star) => star.classList.remove("filled"));
  if (reviewsList) renderReviewList(reviewsList, await reviewsFor(currentListing.id));
  currentOnSubmitted?.(review);
});

export function openReviewPanel(listing: Listing, onSubmitted: (review: Review) => void): void {
  if (!overlay || !heading || !reviewsList) return;
  currentListing = listing;
  currentOnSubmitted = onSubmitted;
  heading.textContent = listing.name;
  overlay.hidden = false;
  reviewsFor(listing.id).then((reviews) => {
    if (reviewsList) renderReviewList(reviewsList, reviews);
  });
}
