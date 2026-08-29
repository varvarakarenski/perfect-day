import type { Listing } from "../types";

export interface ExtraField {
  key: string;
  label: string;
  options?: string[];
}

export function mountAddListingForm<TExtra extends Record<string, string>>(
  container: HTMLElement,
  config: {
    noun: string;
    extraFields: ExtraField[];
    onAdd: (base: Omit<Listing, "id" | "averageRating" | "reviewCount">, extra: TExtra) => void;
  },
): void {
  container.classList.add("add-listing");
  container.innerHTML = "";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "add-listing-toggle";
  toggle.textContent = `+ Add a ${config.noun}`;

  const form = document.createElement("form");
  form.className = "add-listing-form";
  form.hidden = true;

  const extraFieldsMarkup = config.extraFields
    .map((field) =>
      field.options
        ? `<label>${field.label}
            <select name="${field.key}">
              ${field.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
            </select>
          </label>`
        : `<label>${field.label} <input name="${field.key}" required /></label>`,
    )
    .join("");

  form.innerHTML = `
    <label>Name <input name="name" required /></label>
    <label>Description <textarea name="description" required></textarea></label>
    <label>Location <input name="location" required /></label>
    <label>Tags <input name="tags" placeholder="comma-separated" /></label>
    ${extraFieldsMarkup}
    <button type="submit">Add ${config.noun}</button>
  `;

  toggle.addEventListener("click", () => {
    form.hidden = !form.hidden;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const base = {
      name: String(data.get("name") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      tags: String(data.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const extra = Object.fromEntries(
      config.extraFields.map((field) => [field.key, String(data.get(field.key) ?? "").trim()]),
    ) as TExtra;

    config.onAdd(base, extra);
    form.reset();
    form.hidden = true;
  });

  container.appendChild(toggle);
  container.appendChild(form);
}
