import { mockCompanies } from "./data/companies";
import { renderList } from "./renderList";
import { filterListings } from "./search";
import { appendAddition, loadAdditions } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import { initTagPicker, uniqueTags } from "./tagPicker";
import { gateWithAuth } from "./authGate";
import "./menubar";
import type { Company } from "./types";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";

const addSubmit = document.querySelector<HTMLButtonElement>(".add-listing-submit");
const listContainer = document.querySelector<HTMLDivElement>(".perfect-companies");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const addToggle = document.querySelector<HTMLButtonElement>(".add-listing-toggle");
const addOverlay = document.querySelector<HTMLDivElement>(".add-listing-overlay");
const addForm = document.querySelector<HTMLFormElement>(".add-listing-form");
const tagPickerEl = document.querySelector<HTMLDivElement>(".tag-picker");

if (addOverlay) bindOverlayDismiss(addOverlay);
const tagPicker = tagPickerEl ? initTagPicker(tagPickerEl, uniqueTags(mockCompanies)) : null;

onAuthStateChanged(auth, (user) => {
  if (addSubmit) addSubmit.textContent = user ? "Add company" : "Sign in to add a company";
});

if (listContainer) {
  let companies: Company[] = [...mockCompanies];
  let query = "";

  function render(): void {
    renderList(listContainer!, filterListings(companies, query), "company", (company) => company.industry);
  }

  loadAdditions<Company>("companies").then((additions) => {
    companies = [...mockCompanies, ...additions];
    render();
  });

  searchInput?.addEventListener("input", () => {
    query = searchInput.value;
    render();
  });

  if (addToggle) {
    gateWithAuth(addToggle, () => {
      if (addOverlay) addOverlay.hidden = false;
    });
  }

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

    await appendAddition("companies", company);
    companies.push(company);
    addForm.reset();
    tagPicker?.reset();
    if (addOverlay) addOverlay.hidden = true;
    render();
  });

  render();
}
