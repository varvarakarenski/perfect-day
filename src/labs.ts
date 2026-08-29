import { mockLabs } from "./data/labs";
import { renderList } from "./renderList";
import { filterListings } from "./search";
import { openReviewPanel } from "./reviewPanel";
import { appendAddition, loadAdditions } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import type { Lab } from "./types";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-labs");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const addToggle = document.querySelector<HTMLButtonElement>(".add-listing-toggle");
const addOverlay = document.querySelector<HTMLDivElement>(".add-listing-overlay");
const addForm = document.querySelector<HTMLFormElement>(".add-listing-form");

if (addOverlay) bindOverlayDismiss(addOverlay);

if (listContainer) {
  const labs: Lab[] = [...mockLabs, ...loadAdditions<Lab>("labs")];
  let query = "";

  function render(): void {
    renderList(listContainer!, filterListings(labs, query), "lab", (lab) => `${lab.department}, ${lab.institution}`, (lab) => {
      openReviewPanel(lab, () => render());
    });
  }

  searchInput?.addEventListener("input", () => {
    query = searchInput.value;
    render();
  });

  addToggle?.addEventListener("click", () => {
    if (addOverlay) addOverlay.hidden = false;
  });

  addForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(addForm);

    const lab: Lab = {
      id: crypto.randomUUID(),
      name: String(data.get("name") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      tags: String(data.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      institution: String(data.get("institution") ?? "").trim(),
      department: String(data.get("department") ?? "").trim(),
      logoUrl: String(data.get("logoUrl") ?? "").trim() || undefined,
    };

    appendAddition("labs", lab);
    labs.push(lab);
    addForm.reset();
    if (addOverlay) addOverlay.hidden = true;
    render();
  });

  render();
}
