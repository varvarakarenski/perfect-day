import type { Listing } from "./types";
import { ratingStats } from "./reviews";
import { logoFor } from "./logo";

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderCard<T extends Listing>(item: T, detailType: string, subtitle: (item: T) => string): HTMLElement {
  const card = el("div", "listing-card");

  const header = el("div", "listing-card-header");

  const logo = document.createElement("img");
  logo.className = "listing-logo";
  logo.src = logoFor(item);
  logo.alt = "";
  header.appendChild(logo);

  const nameBlock = el("div", "listing-name-block");
  const name = el("h3", "listing-name");
  const nameLink = document.createElement("a");
  nameLink.className = "listing-name-link";
  nameLink.href = `detail.html?type=${detailType}&id=${encodeURIComponent(item.id)}`;
  nameLink.textContent = item.name;
  name.appendChild(nameLink);
  nameBlock.appendChild(name);
  nameBlock.appendChild(el("p", "listing-subtitle", `${subtitle(item)} · ${item.location}`));
  header.appendChild(nameBlock);

  card.appendChild(header);

  card.appendChild(el("p", "listing-description", item.description));

  const tagList = el("div", "listing-tags");
  for (const tag of item.tags) {
    tagList.appendChild(el("span", "listing-tag", tag));
  }
  card.appendChild(tagList);

  const rating = el("p", "listing-rating", "");
  card.appendChild(rating);
  ratingStats(item.id).then(({ averageRating, reviewCount }) => {
    const rounded = Math.round(averageRating);
    const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);
    rating.textContent = `${stars} ${averageRating.toFixed(1)} (${reviewCount} reviews)`;
  });

  return card;
}

export function renderList<T extends Listing>(
  container: HTMLElement,
  items: T[],
  detailType: string,
  subtitle: (item: T) => string,
): void {
  container.classList.add("listing-grid");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p class="listing-empty">No matches — try a different search.</p>`;
    return;
  }

  for (const item of items) {
    container.appendChild(renderCard(item, detailType, subtitle));
  }
}
