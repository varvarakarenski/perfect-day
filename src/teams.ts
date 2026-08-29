import { mockTeams } from "./data/teams";
import { renderList } from "./renderList";
import { filterListings } from "./search";
import { appendAddition, loadAdditions } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import "./menubar";
import type { Team } from "./types";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-clubs-and-teams");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const addToggle = document.querySelector<HTMLButtonElement>(".add-listing-toggle");
const addOverlay = document.querySelector<HTMLDivElement>(".add-listing-overlay");
const addForm = document.querySelector<HTMLFormElement>(".add-listing-form");

if (addOverlay) bindOverlayDismiss(addOverlay);

if (listContainer) {
  let teams: Team[] = [...mockTeams];
  let query = "";

  function render(): void {
    renderList(listContainer!, filterListings(teams, query), "team", (team) => (team.kind === "club" ? "Club" : "Team"));
  }

  loadAdditions<Team>("teams").then((additions) => {
    teams = [...mockTeams, ...additions];
    render();
  });

  searchInput?.addEventListener("input", () => {
    query = searchInput.value;
    render();
  });

  addToggle?.addEventListener("click", () => {
    if (addOverlay) addOverlay.hidden = false;
  });

  addForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(addForm);

    const team: Team = {
      id: crypto.randomUUID(),
      name: String(data.get("name") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      tags: String(data.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      affiliation: String(data.get("affiliation") ?? "").trim(),
      kind: data.get("kind") === "team" ? "team" : "club",
      logoUrl: String(data.get("logoUrl") ?? "").trim() || undefined,
    };

    await appendAddition("teams", team);
    teams.push(team);
    addForm.reset();
    if (addOverlay) addOverlay.hidden = true;
    render();
  });

  render();
}
