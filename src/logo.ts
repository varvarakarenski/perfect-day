import type { Listing } from "./types";

function hashHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}

const ICON_PATHS: Record<string, string> = {
  company: `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  lab: `<path d="M9 3h6"/><path d="M10 3v6.5a1 1 0 0 1-.2.6L5 17a2 2 0 0 0 1.6 3.2h10.8A2 2 0 0 0 19 17l-4.8-6.9a1 1 0 0 1-.2-.6V3"/><path d="M6.5 14h11"/>`,
  team: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
};

export function logoFor(item: Listing, accentColor?: string, category?: string): string {
  if (item.logoUrl) return item.logoUrl;

  const fill = accentColor ?? `hsl(${hashHue(item.id)},55%,55%)`;
  const icon = category ? ICON_PATHS[category] : undefined;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`,
    `<rect width="80" height="80" rx="12" fill="${fill}"/>`,
    icon
      ? `<svg x="20" y="20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`
      : "",
    `</svg>`,
  ].join("");

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
