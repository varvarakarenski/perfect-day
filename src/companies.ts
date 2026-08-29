import { mockCompanies } from "./data/companies";
import { renderList } from "./renderList";
import { mountSearchBar } from "./searchBar";
import { filterListings } from "./search";
import { mountAddListingForm } from "./forms/addListingForm";
import { openReviewModal } from "./reviewModal";
import { applyNewRating } from "./ratings";
import { appendAddition, loadAdditions } from "./storage";
import type { Company } from "./types";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-companies");
const searchContainer = document.querySelector<HTMLDivElement>(".companies-search");
const formContainer = document.querySelector<HTMLDivElement>(".companies-add-form");

if (listContainer) {
  const companies: Company[] = [...mockCompanies, ...loadAdditions<Company>("companies")];
  let query = "";

  function render(): void {
    renderList(listContainer!, filterListings(companies, query), (company) => company.industry, (company) => {
      openReviewModal(company, (review) => {
        applyNewRating(company, review.rating);
        render();
      });
    });
  }

  if (searchContainer) {
    mountSearchBar(searchContainer, "Search companies by name, description, or tag...", (value) => {
      query = value;
      render();
    });
  }

  if (formContainer) {
    mountAddListingForm<{ industry: string }>(formContainer, {
      noun: "company",
      extraFields: [{ key: "industry", label: "Industry" }],
      onAdd: (base, extra) => {
        const company: Company = {
          ...base,
          id: crypto.randomUUID(),
          industry: extra.industry,
          averageRating: 0,
          reviewCount: 0,
        };
        appendAddition("companies", company);
        companies.push(company);
        render();
      },
    });
  }

  render();
}
