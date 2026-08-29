# PerfectDay

> Imagine if Elle Woods could see metrics about women at Harvard Law before she applied.

PerfectDay is a Rate My Professor inspired  platform for women in STEM - real reviews of companies, research labs, and clubs/teams, written by the women who've actually been in the room. Instead of finding out after you sign the offer letter whether a lab is actually a place you'll thrive, you find out before.

Built for HackClub Sunbeam.

## What it does

- **Browse & search** companies, labs, and clubs/teams with tag-based filtering
- **Read and submit reviews** with star ratings on categories that actually matter — culture, mentorship, inclusivity
- **Detail pages** for every organization showing aggregated ratings and individual reviews
- **Accounts** via Firebase Auth, so reviews are tied to real (verified) people, not anonymous noise

## Stack

- [Vite](https://vitejs.dev/) + TypeScript
- [Firebase](https://firebase.google.com/) (Auth + Firestore)
- Plain HTML/CSS, no framework

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints.

## Project structure

```
├── index.html              # Landing page
├── companies.html           # Companies directory
├── labs.html                 # Research labs directory
├── clubs-and-teams.html      # Clubs & teams directory
├── detail.html                # Shared detail/review page
├── login.html                  # Auth
└── src/
    ├── data/                    # Seed/reference data
    ├── companies.ts, labs.ts, teams.ts   # Directory page logic
    ├── detail.ts                  # Detail page logic
    ├── auth.ts, firebase.ts       # Firebase wiring
    ├── reviews.ts, reviewPanel.ts # Review submission/display
    ├── tagPicker.ts, search.ts    # Filtering & search UI
    └── renderList.ts, starRating.ts, logo.ts, menubar.ts, sparkle.ts  # Shared UI pieces
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
