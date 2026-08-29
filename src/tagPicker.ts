export interface TagPicker {
  reset: () => void;
}

export function initTagPicker(root: HTMLElement, suggestions: string[]): TagPicker {
  const hiddenInputEl = root.querySelector<HTMLInputElement>('input[type="hidden"]');
  const optionsContainerEl = root.querySelector<HTMLDivElement>(".tag-picker-options");
  if (!hiddenInputEl || !optionsContainerEl) {
    throw new Error("tag picker markup missing .tag-picker-options or hidden input");
  }
  const hiddenInput = hiddenInputEl;
  const optionsEl = optionsContainerEl;

  const selected = new Set<string>();
  const customChips: HTMLButtonElement[] = [];

  function sync(): void {
    hiddenInput.value = Array.from(selected).join(",");
  }

  const addOtherBtn = document.createElement("button");
  addOtherBtn.type = "button";
  addOtherBtn.className = "tag-picker-option tag-picker-add-other";
  addOtherBtn.textContent = "+ Add other";

  const addOtherInput = document.createElement("input");
  addOtherInput.type = "text";
  addOtherInput.className = "tag-picker-custom-input";
  addOtherInput.placeholder = "New tag";
  addOtherInput.hidden = true;

  function addCustomChip(tag: string): void {
    if (selected.has(tag)) return;
    selected.add(tag);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "tag-picker-option tag-picker-option--selected tag-picker-option--custom";
    chip.textContent = `${tag} ✕`;
    chip.addEventListener("click", () => {
      selected.delete(tag);
      chip.remove();
      customChips.splice(customChips.indexOf(chip), 1);
      sync();
    });

    optionsEl.insertBefore(chip, addOtherBtn);
    customChips.push(chip);
    sync();
  }

  function commitCustomInput(): void {
    const value = addOtherInput.value.trim();
    addOtherInput.value = "";
    addOtherInput.hidden = true;
    addOtherBtn.hidden = false;
    if (value) addCustomChip(value);
  }

  for (const tag of suggestions) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag-picker-option";
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      if (selected.has(tag)) {
        selected.delete(tag);
        btn.classList.remove("tag-picker-option--selected");
      } else {
        selected.add(tag);
        btn.classList.add("tag-picker-option--selected");
      }
      sync();
    });
    optionsEl.appendChild(btn);
  }

  addOtherBtn.addEventListener("click", () => {
    addOtherBtn.hidden = true;
    addOtherInput.hidden = false;
    addOtherInput.focus();
  });

  addOtherInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitCustomInput();
    } else if (event.key === "Escape") {
      addOtherInput.value = "";
      addOtherInput.hidden = true;
      addOtherBtn.hidden = false;
    }
  });

  addOtherInput.addEventListener("blur", commitCustomInput);

  optionsEl.appendChild(addOtherBtn);
  optionsEl.appendChild(addOtherInput);

  function reset(): void {
    selected.clear();
    for (const chip of customChips.splice(0)) chip.remove();
    optionsEl.querySelectorAll<HTMLButtonElement>(".tag-picker-option--selected").forEach((btn) => {
      btn.classList.remove("tag-picker-option--selected");
    });
    addOtherInput.value = "";
    addOtherInput.hidden = true;
    addOtherBtn.hidden = false;
    hiddenInput.value = "";
  }

  return { reset };
}

export function uniqueTags(listings: { tags: string[] }[]): string[] {
  return Array.from(new Set(listings.flatMap((listing) => listing.tags))).sort((a, b) => a.localeCompare(b));
}
