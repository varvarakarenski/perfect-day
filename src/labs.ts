import { mockLabs } from "./data/labs";
import { renderList } from "./renderList";
import { mountSearchBar } from "./searchBar";
import { filterListings } from "./search";
import { mountAddListingForm } from "./forms/addListingForm";
import { openReviewModal } from "./reviewModal";
import { applyNewRating } from "./ratings";
import { appendAddition, loadAdditions } from "./storage";
import type { Lab } from "./types";

const listContainer = document.querySelector<HTMLDivElement>(".perfect-labs");
const searchContainer = document.querySelector<HTMLDivElement>(".labs-search");
const formContainer = document.querySelector<HTMLDivElement>(".labs-add-form");

if (listContainer) {
  const labs: Lab[] = [...mockLabs, ...loadAdditions<Lab>("labs")];
  let query = "";

  function render(): void {
    renderList(listContainer!, filterListings(labs, query), (lab) => lab.institution, (lab) => {
      openReviewModal(lab, (review) => {
        applyNewRating(lab, review.rating);
        render();
      });
    });
  }

  if (searchContainer) {
    mountSearchBar(searchContainer, "Search labs by name, description, or tag...", (value) => {
      query = value;
      render();
    });
  }

  if (formContainer) {
    mountAddListingForm<{ institution: string }>(formContainer, {
      noun: "lab",
      extraFields: [{ key: "institution", label: "Institution" }],
      onAdd: (base, extra) => {
        const lab: Lab = {
          ...base,
          id: crypto.randomUUID(),
          institution: extra.institution,
          averageRating: 0,
          reviewCount: 0,
        };
        appendAddition("labs", lab);
        labs.push(lab);
        render();
      },
    });
  }

  render();
}
