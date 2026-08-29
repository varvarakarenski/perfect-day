import type { Listing } from "./types";
import companyIconSvg from "../company.svg?raw";
import labIconSvg from "../lab.svg?raw";
import teamIconSvg from "../club.svg?raw";

function hashHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}

// Strip the outer <svg> wrapper so the path data can be re-embedded with our own fill.
function svgBody(markup: string): string {
  return markup.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

const ICON_BODIES: Record<string, string> = {
  company: svgBody(companyIconSvg),
  lab: svgBody(labIconSvg),
  team: svgBody(teamIconSvg),
};

export function logoFor(item: Listing, accentColor?: string, category?: string): string {
  if (item.logoUrl) return item.logoUrl;

  const fill = accentColor ?? `hsl(${hashHue(item.id)},55%,55%)`;
  const iconBody = category ? ICON_BODIES[category] : undefined;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`,
    `<rect width="80" height="80" rx="12" fill="${fill}"/>`,
    iconBody
      ? `<svg x="18" y="18" width="44" height="44" viewBox="0 -960 960 960" fill="white">${iconBody}</svg>`
      : "",
    `</svg>`,
  ].join("");

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
