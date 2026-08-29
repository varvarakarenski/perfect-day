import type { Listing, Review } from "./types";
import { appendAddition } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import { reviewsFor, renderReviewList } from "./reviews";

const overlay = document.querySelector<HTMLDivElement>(".review-overlay");
const heading = overlay?.querySelector<HTMLHeadingElement>(".review-panel-heading");
const reviewsList = overlay?.querySelector<HTMLDivElement>(".review-panel-reviews");
const form = overlay?.querySelector<HTMLFormElement>(".review-panel-form");

let currentListing: Listing | null = null;
let currentOnSubmitted: ((review: Review) => void) | null = null;

if (overlay) bindOverlayDismiss(overlay);

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!currentListing) return;

  const data = new FormData(form);
  const review: Review = {
    id: crypto.randomUUID(),
    listingId: currentListing.id,
    reviewerName: String(data.get("reviewerName") ?? "").trim(),
    rating: Number(data.get("rating")),
    text: String(data.get("text") ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  appendAddition("reviews", review);
  form.reset();
  if (reviewsList) renderReviewList(reviewsList, reviewsFor(currentListing.id));
  currentOnSubmitted?.(review);
});

export function openReviewPanel(listing: Listing, onSubmitted: (review: Review) => void): void {
  if (!overlay || !heading || !reviewsList) return;
  currentListing = listing;
  currentOnSubmitted = onSubmitted;
  heading.textContent = listing.name;
  renderReviewList(reviewsList, reviewsFor(listing.id));
  overlay.hidden = false;
}
