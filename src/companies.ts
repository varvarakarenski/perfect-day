import { mockCompanies } from "./data/companies";
import { renderList } from "./renderList";
import { filterListings } from "./search";
import { openReviewPanel } from "./reviewPanel";
import { appendAddition, loadAdditions } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import type { Company } from "./types";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-companies");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const addToggle = document.querySelector<HTMLButtonElement>(".add-listing-toggle");
const addOverlay = document.querySelector<HTMLDivElement>(".add-listing-overlay");
const addForm = document.querySelector<HTMLFormElement>(".add-listing-form");

if (addOverlay) bindOverlayDismiss(addOverlay);

if (listContainer) {
  const companies: Company[] = [...mockCompanies, ...loadAdditions<Company>("companies")];
  let query = "";

  function render(): void {
    renderList(listContainer!, filterListings(companies, query), "company", (company) => company.industry, (company) => {
      openReviewPanel(company, () => render());
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

    const company: Company = {
      id: crypto.randomUUID(),
      name: String(data.get("name") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      tags: String(data.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      industry: String(data.get("industry") ?? "").trim(),
      logoUrl: String(data.get("logoUrl") ?? "").trim() || undefined,
    };

    appendAddition("companies", company);
    companies.push(company);
    addForm.reset();
    if (addOverlay) addOverlay.hidden = true;
    render();
  });

  render();
}
