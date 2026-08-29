import { mockCompanies } from "./data/companies";
import { mockLabs } from "./data/labs";
import { mockTeams } from "./data/teams";
import { loadAdditions, appendAddition } from "./storage";
import { ratingStats, reviewsFor, renderReviewList } from "./reviews";
import type { Company, Lab, Team, Listing, Review } from "./types";

type DetailType = "company" | "lab" | "team";

function subtitleFor(type: DetailType, listing: Listing): string {
  if (type === "company") return (listing as Company).industry;
  if (type === "lab") return (listing as Lab).institution;
  return (listing as Team).affiliation;
}

function findListing(type: DetailType, id: string): Listing | undefined {
  if (type === "company") {
    return [...mockCompanies, ...loadAdditions<Company>("companies")].find((item) => item.id === id);
  }
  if (type === "lab") {
    return [...mockLabs, ...loadAdditions<Lab>("labs")].find((item) => item.id === id);
  }
  return [...mockTeams, ...loadAdditions<Team>("teams")].find((item) => item.id === id);
}

const params = new URLSearchParams(location.search);
const typeParam = params.get("type");
const id = params.get("id");
const type: DetailType | null =
  typeParam === "company" || typeParam === "lab" || typeParam === "team" ? typeParam : null;

const contentEl = document.querySelector<HTMLElement>(".detail-content");
const notFoundEl = document.querySelector<HTMLElement>(".detail-not-found");
const backLink = document.querySelector<HTMLAnchorElement>(".detail-back");
const nameEl = document.querySelector<HTMLElement>(".detail-name");
const subtitleEl = document.querySelector<HTMLElement>(".detail-subtitle");
const descriptionEl = document.querySelector<HTMLElement>(".detail-description");
const tagsEl = document.querySelector<HTMLElement>(".detail-tags");
const ratingEl = document.querySelector<HTMLElement>(".detail-rating");
const reviewsEl = document.querySelector<HTMLElement>(".detail-reviews");
const formEl = document.querySelector<HTMLFormElement>(".detail-review-form");

backLink?.addEventListener("click", (event) => {
  event.preventDefault();
  history.back();
});

const listing = type && id ? findListing(type, id) : undefined;

if (!listing || !type) {
  if (contentEl) contentEl.hidden = true;
  if (notFoundEl) notFoundEl.hidden = false;
} else {
  if (contentEl) contentEl.hidden = false;
  if (notFoundEl) notFoundEl.hidden = true;

  if (nameEl) nameEl.textContent = listing.name;
  if (subtitleEl) subtitleEl.textContent = `${subtitleFor(type, listing)} · ${listing.location}`;
  if (descriptionEl) descriptionEl.textContent = listing.description;

  if (tagsEl) {
    tagsEl.innerHTML = "";
    for (const tag of listing.tags) {
      const span = document.createElement("span");
      span.className = "listing-tag";
      span.textContent = tag;
      tagsEl.appendChild(span);
    }
  }

  function renderRating(): void {
    if (!ratingEl || !listing) return;
    const { averageRating, reviewCount } = ratingStats(listing.id);
    const rounded = Math.round(averageRating);
    const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);
    ratingEl.textContent = `${stars} ${averageRating.toFixed(1)} (${reviewCount} reviews)`;
  }

  renderRating();
  if (reviewsEl) renderReviewList(reviewsEl, reviewsFor(listing.id));

  formEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formEl || !listing) return;

    const data = new FormData(formEl);
    const review: Review = {
      id: crypto.randomUUID(),
      listingId: listing.id,
      reviewerName: String(data.get("reviewerName") ?? "").trim(),
      rating: Number(data.get("rating")),
      text: String(data.get("text") ?? "").trim(),
      createdAt: new Date().toISOString(),
    };

    appendAddition("reviews", review);
    formEl.reset();
    if (reviewsEl) renderReviewList(reviewsEl, reviewsFor(listing.id));
    renderRating();
  });
}
