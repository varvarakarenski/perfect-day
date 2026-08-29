import type { Listing } from "./types";

export function applyNewRating<T extends Listing>(item: T, rating: number): void {
  const totalScore = item.averageRating * item.reviewCount + rating;
  item.reviewCount += 1;
  item.averageRating = totalScore / item.reviewCount;
}
