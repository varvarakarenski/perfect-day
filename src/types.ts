export interface Listing {
  id: string;
  name: string;
  description: string;
  location: string;
  tags: string[];
  averageRating: number;
  reviewCount: number;
}

export interface Company extends Listing {
  industry: string;
}

export interface Lab extends Listing {
  institution: string;
}

export interface Team extends Listing {
  kind: "club" | "team";
  affiliation: string;
}

export interface Review {
  id: string;
  listingId: string;
  reviewerName: string;
  rating: number;
  text: string;
  createdAt: string;
}
