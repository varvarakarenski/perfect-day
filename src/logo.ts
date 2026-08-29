import type { Listing } from "./types";

function hashHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}

function initials(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "");
  return letters.join("") || "?";
}

export function logoFor(item: Listing): string {
  if (item.logoUrl) return item.logoUrl;

  const hue = hashHue(item.id);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`,
    `<rect width="80" height="80" rx="12" fill="hsl(${hue},55%,55%)"/>`,
    `<text x="40" y="42" font-family="sans-serif" font-size="30" fill="white" text-anchor="middle" dominant-baseline="middle">${initials(item.name)}</text>`,
    `</svg>`,
  ].join("");

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
