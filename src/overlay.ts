export function bindOverlayDismiss(overlay: HTMLElement): void {
  const closeBtn = overlay.querySelector<HTMLButtonElement>(".overlay-close");
  closeBtn?.addEventListener("click", () => {
    overlay.hidden = true;
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.hidden = true;
  });
}
