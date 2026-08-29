import type { Lab } from "../types";

export const mockLabs: Lab[] = [
  {
    id: "l1",
    name: "Applied Perception Lab",
    description: "Computer vision research for assistive robotics.",
    location: "Berkeley, CA",
    institution: "UC Berkeley",
    department: "Electrical Engineering & Computer Sciences",
    tags: ["supportive PI", "conference funding"],
    activities:
      "Weekly lab meetings rotate presenting duties across every student. The PI actively pushes lab members to submit to conferences and covers travel funding, and the group partners with local hospitals to pilot assistive hardware in the field.",
  },
  {
    id: "l2",
    name: "Quantum Materials Group",
    description: "Experimental condensed matter physics lab.",
    location: "Pittsburgh, PA",
    institution: "Carnegie Mellon University",
    department: "Physics",
    tags: ["heavy workload", "good mentorship"],
    activities:
      "Expect long hours in the cleanroom running crystal growth and characterization experiments. The lab holds biweekly group meetings, and incoming grad students are paired one-on-one with a postdoc for their first year.",
  },
  {
    id: "l3",
    name: "Marine Genomics Lab",
    description: "Studies coral reef adaptation using genomic sequencing.",
    location: "Honolulu, HI",
    institution: "University of Hawaii",
    department: "Oceanography",
    tags: ["fieldwork heavy", "flexible schedule"],
    activities:
      "Members spend several weeks a year on fieldwork expeditions collecting coral samples, followed by sequencing runs in the shared genomics core back on campus. Schedules stay flexible outside of fieldwork season to accommodate the travel.",
  },
  {
    id: "l4",
    name: "Neural Systems Lab",
    description: "Computational neuroscience research on motor control.",
    location: "Boston, MA",
    institution: "MIT",
    department: "Brain and Cognitive Sciences",
    tags: ["competitive", "well-funded"],
    activities:
      "Well-funded through several active NIH grants, with a weekly seminar series bringing in outside speakers. Senior students mentor first-years through their rotation project, though the pace and internal competition for authorship can run high.",
  },
];
