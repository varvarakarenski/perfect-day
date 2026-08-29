export function mountSearchBar(
  container: HTMLElement,
  placeholder: string,
  onChange: (query: string) => void,
): void {
  container.classList.add("search-bar");
  container.innerHTML = "";

  const input = document.createElement("input");
  input.type = "search";
  input.className = "search-input";
  input.placeholder = placeholder;
  input.addEventListener("input", () => onChange(input.value));

  container.appendChild(input);
}
