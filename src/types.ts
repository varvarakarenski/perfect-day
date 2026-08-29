export interface Listing {
  id: string;
  name: string;
  description: string;
  location: string;
  tags: string[];
  logoUrl?: string;
  activities?: string;
}

export interface Company extends Listing {
  industry: string;
}

export interface Lab extends Listing {
  institution: string;
  department: string;
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
