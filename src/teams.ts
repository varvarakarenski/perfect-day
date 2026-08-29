import { mockTeams } from "./data/teams";
import { renderList } from "./renderList";
import { mountSearchBar } from "./searchBar";
import { filterListings } from "./search";
import { mountAddListingForm } from "./forms/addListingForm";
import { openReviewModal } from "./reviewModal";
import { applyNewRating } from "./ratings";
import { appendAddition, loadAdditions } from "./storage";
import type { Team } from "./types";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-clubs-and-teams");
const searchContainer = document.querySelector<HTMLDivElement>(".teams-search");
const formContainer = document.querySelector<HTMLDivElement>(".teams-add-form");

if (listContainer) {
  const teams: Team[] = [...mockTeams, ...loadAdditions<Team>("teams")];
  let query = "";

  function render(): void {
    renderList(
      listContainer!,
      filterListings(teams, query),
      (team) => (team.kind === "club" ? "Club" : "Team"),
      (team) => {
        openReviewModal(team, (review) => {
          applyNewRating(team, review.rating);
          render();
        });
      },
    );
  }

  if (searchContainer) {
    mountSearchBar(searchContainer, "Search clubs & teams by name, description, or tag...", (value) => {
      query = value;
      render();
    });
  }

  if (formContainer) {
    mountAddListingForm<{ affiliation: string; kind: string }>(formContainer, {
      noun: "club or team",
      extraFields: [
        { key: "affiliation", label: "Affiliation (school, organization)" },
        { key: "kind", label: "Type", options: ["club", "team"] },
      ],
      onAdd: (base, extra) => {
        const team: Team = {
          ...base,
          id: crypto.randomUUID(),
          affiliation: extra.affiliation,
          kind: extra.kind === "team" ? "team" : "club",
          averageRating: 0,
          reviewCount: 0,
        };
        appendAddition("teams", team);
        teams.push(team);
        render();
      },
    });
  }

  render();
}
