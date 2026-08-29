import type { Lab } from "../types";

export const mockLabs: Lab[] = [
  {
    id: "l1",
    name: "Applied Perception Lab",
    description: "Computer vision research for assistive robotics.",
    location: "Berkeley, CA",
    institution: "UC Berkeley",
    tags: ["supportive PI", "conference funding"],
  },
  {
    id: "l2",
    name: "Quantum Materials Group",
    description: "Experimental condensed matter physics lab.",
    location: "Pittsburgh, PA",
    institution: "Carnegie Mellon University",
    tags: ["heavy workload", "good mentorship"],
  },
  {
    id: "l3",
    name: "Marine Genomics Lab",
    description: "Studies coral reef adaptation using genomic sequencing.",
    location: "Honolulu, HI",
    institution: "University of Hawaii",
    tags: ["fieldwork heavy", "flexible schedule"],
  },
  {
    id: "l4",
    name: "Neural Systems Lab",
    description: "Computational neuroscience research on motor control.",
    location: "Boston, MA",
    institution: "MIT",
    tags: ["competitive", "well-funded"],
  },
];
