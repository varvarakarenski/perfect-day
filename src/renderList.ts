import type { Listing } from "./types";

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

function renderCard<T extends Listing>(
  item: T,
  subtitle: (item: T) => string,
  onReview: (item: T) => void,
): HTMLElement {
  const card = el("div", "listing-card");

  card.appendChild(el("h3", "listing-name", item.name));
  card.appendChild(el("p", "listing-subtitle", `${subtitle(item)} · ${item.location}`));
  card.appendChild(el("p", "listing-description", item.description));

  const tagList = el("div", "listing-tags");
  for (const tag of item.tags) {
    tagList.appendChild(el("span", "listing-tag", tag));
  }
  card.appendChild(tagList);

  const rounded = Math.round(item.averageRating);
  const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);
  card.appendChild(
    el("p", "listing-rating", `${stars} ${item.averageRating.toFixed(1)} (${item.reviewCount} reviews)`),
  );

  const reviewBtn = el("button", "listing-review-btn", "Write a review");
  reviewBtn.type = "button";
  reviewBtn.addEventListener("click", () => onReview(item));
  card.appendChild(reviewBtn);

  return card;
}

export function renderList<T extends Listing>(
  container: HTMLElement,
  items: T[],
  subtitle: (item: T) => string,
  onReview: (item: T) => void,
): void {
  container.classList.add("listing-grid");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p class="listing-empty">No matches — try a different search.</p>`;
    return;
  }

  for (const item of items) {
    container.appendChild(renderCard(item, subtitle, onReview));
  }
}
