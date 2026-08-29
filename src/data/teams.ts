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
    activities:
      "Weekly general meetings mix guest speakers with skills workshops. A peer-mentor buddy program pairs every incoming freshman with an upperclassman, and the club runs networking nights each semester with alumnae from local industry partners.",
  },
  {
    id: "t2",
    name: "FIRST Robotics Team 118",
    description: "Competitive robotics team competing in FRC.",
    location: "Detroit, MI",
    kind: "team",
    affiliation: "Detroit Public Schools",
    tags: ["competitive", "high time commitment"],
    activities:
      "Build season runs January through February with after-school and weekend sessions to design, machine, and program the competition robot. The team travels to regional and national FRC events each spring and stays a tight-knit group year-round.",
  },
  {
    id: "t3",
    name: "Girls Who Code Chapter",
    description: "After-school coding club for high schoolers.",
    location: "Chicago, IL",
    kind: "club",
    affiliation: "Lane Tech High School",
    tags: ["beginner-friendly", "free snacks"],
    activities:
      "No prior coding experience needed — weekly meetings walk through a beginner-friendly curriculum with plenty of one-on-one help and free snacks. The semester builds toward a project showcase where members demo what they built to friends and family.",
  },
  {
    id: "t4",
    name: "Solar Car Racing Team",
    description: "Designs and races a solar-powered vehicle annually.",
    location: "Ann Arbor, MI",
    kind: "team",
    affiliation: "University of Michigan",
    tags: ["intense during race season", "hands-on"],
    activities:
      "The team designs, builds, and races a new solar-powered vehicle every year, with hands-on build sessions running year-round across the electrical, aero, and strategy sub-teams. Hours ramp up sharply in the months leading into race season.",
  },
];
