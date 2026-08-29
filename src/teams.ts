import { mockTeams } from "./data/teams";
import { renderList } from "./renderList";
import { filterListings } from "./search";
import { appendAddition, loadAdditions } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import { initTagPicker, uniqueTags } from "./tagPicker";
import "./menubar";
import type { Team } from "./types";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-clubs-and-teams");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const addToggle = document.querySelector<HTMLButtonElement>(".add-listing-toggle");
const addOverlay = document.querySelector<HTMLDivElement>(".add-listing-overlay");
const addForm = document.querySelector<HTMLFormElement>(".add-listing-form");
const tagPickerEl = document.querySelector<HTMLDivElement>(".tag-picker");
const addSubmit = document.querySelector<HTMLButtonElement>(".add-listing-submit");

if (addOverlay) bindOverlayDismiss(addOverlay);
const tagPicker = tagPickerEl ? initTagPicker(tagPickerEl, uniqueTags(mockTeams)) : null;

onAuthStateChanged(auth, (user) => {
  if (addSubmit) addSubmit.textContent = user ? "Add team" : "Sign in to add a team";
});

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

    if (!auth.currentUser) {
          location.href = "login.html";
          return;
    }

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
    tagPicker?.reset();
    if (addOverlay) addOverlay.hidden = true;
    render();
  });

  render();
}
