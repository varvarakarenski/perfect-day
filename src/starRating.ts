export function bindStarRating(form: HTMLFormElement): void {
  const widget = form.querySelector<HTMLElement>(".star-rating");
  const input = form.querySelector<HTMLInputElement>('input[name="rating"]');
  if (!widget || !input) return;

  const stars = widget.querySelectorAll<HTMLButtonElement>(".star");

  function setRating(value: number): void {
    input!.value = String(value);
    stars.forEach((star, index) => {
      star.classList.toggle("filled", index < value);
    });
  }

  stars.forEach((star, index) => {
    star.addEventListener("click", () => setRating(index + 1));
  });
}
