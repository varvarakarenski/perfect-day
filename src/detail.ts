import { mockCompanies } from "./data/companies";
import { mockLabs } from "./data/labs";
import { mockTeams } from "./data/teams";
import { loadAdditions } from "./storage";
import { ratingStats, reviewsFor, renderReviewList } from "./reviews";
import { openReviewPanel } from "./reviewPanel";
import { logoFor } from "./logo";
import "./menubar";
import type { Company, Lab, Team, Listing } from "./types";

type DetailType = "company" | "lab" | "team";

function subtitleFor(type: DetailType, listing: Listing): string {
  if (type === "company") return (listing as Company).industry;
  if (type === "lab") {
    const lab = listing as Lab;
    return `${lab.department}, ${lab.institution}`;
  }
  return (listing as Team).affiliation;
}

async function findListing(type: DetailType, id: string): Promise<Listing | undefined> {
  if (type === "company") {
    return [...mockCompanies, ...(await loadAdditions<Company>("companies"))].find((item) => item.id === id);
  }
  if (type === "lab") {
    return [...mockLabs, ...(await loadAdditions<Lab>("labs"))].find((item) => item.id === id);
  }
  return [...mockTeams, ...(await loadAdditions<Team>("teams"))].find((item) => item.id === id);
}

const params = new URLSearchParams(location.search);
const typeParam = params.get("type");
const id = params.get("id");
const type: DetailType | null =
  typeParam === "company" || typeParam === "lab" || typeParam === "team" ? typeParam : null;

const contentEl = document.querySelector<HTMLElement>(".detail-content");
const notFoundEl = document.querySelector<HTMLElement>(".detail-not-found");
const backLink = document.querySelector<HTMLAnchorElement>(".detail-back");
const logoEl = document.querySelector<HTMLImageElement>(".detail-logo");
const nameEl = document.querySelector<HTMLElement>(".detail-name");
const subtitleEl = document.querySelector<HTMLElement>(".detail-subtitle");
const descriptionEl = document.querySelector<HTMLElement>(".detail-description");
const tagsEl = document.querySelector<HTMLElement>(".detail-tags");
const ratingEl = document.querySelector<HTMLElement>(".detail-rating");
const reviewsEl = document.querySelector<HTMLElement>(".detail-reviews");
const reviewBtn = document.querySelector<HTMLButtonElement>(".detail-review-btn");

backLink?.addEventListener("click", (event) => {
  event.preventDefault();
  history.back();
});

async function main(): Promise<void> {
  const listing = type && id ? await findListing(type, id) : undefined;

  if (!listing || !type) {
    if (contentEl) contentEl.hidden = true;
    if (notFoundEl) notFoundEl.hidden = false;
    return;
  }

  if (contentEl) contentEl.hidden = false;
  if (notFoundEl) notFoundEl.hidden = true;

  if (logoEl) logoEl.src = logoFor(listing);
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

  async function renderRating(): Promise<void> {
    if (!ratingEl) return;
    const { averageRating, reviewCount } = await ratingStats(listing!.id);
    const rounded = Math.round(averageRating);
    const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);
    ratingEl.textContent = `${stars} ${averageRating.toFixed(1)} (${reviewCount} reviews)`;
  }

  reviewBtn?.addEventListener("click", () => {
    openReviewPanel(listing, async () => {
      if (reviewsEl) renderReviewList(reviewsEl, await reviewsFor(listing.id));
      await renderRating();
    });
  });

  await renderRating();
  if (reviewsEl) renderReviewList(reviewsEl, await reviewsFor(listing.id));
}

main();
