import type { Team } from "../types";

export const mockTeams: Team[] = [
  {
    id: "t1",
    name: "Women in Engineering Society",
    description: "Campus-wide club for women and non-binary engineering students.",
    location: "Purdue University",
    kind: "club",
    affiliation: "Purdue University",
    tags: ["welcoming to freshmen", "industry networking"],
  },
  {
    id: "t2",
    name: "FIRST Robotics Team 118",
    description: "Competitive robotics team competing in FRC.",
    location: "Detroit, MI",
    kind: "team",
    affiliation: "Detroit Public Schools",
    tags: ["competitive", "high time commitment"],
  },
  {
    id: "t3",
    name: "Girls Who Code Chapter",
    description: "After-school coding club for high schoolers.",
    location: "Chicago, IL",
    kind: "club",
    affiliation: "Lane Tech High School",
    tags: ["beginner-friendly", "free snacks"],
  },
  {
    id: "t4",
    name: "Solar Car Racing Team",
    description: "Designs and races a solar-powered vehicle annually.",
    location: "Ann Arbor, MI",
    kind: "team",
    affiliation: "University of Michigan",
    tags: ["intense during race season", "hands-on"],
  },
];
