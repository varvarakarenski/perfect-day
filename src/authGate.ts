import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const googleIconSvg = `<svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
  <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"/>
  <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.27-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"/>
  <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
</svg>`;

/**
 * Intercepts clicks on `trigger` while the user is signed out and shows a
 * "Sign In" / "Sign in with Google" popover instead of running the button's
 * normal action. Google sign-in happens in place; on success `onSignedIn`
 * runs so the original action (open a form, submit it, etc.) can proceed.
 */
export function gateWithAuth(trigger: HTMLButtonElement, onSignedIn: () => void): void {
  let menu: HTMLDivElement | null = null;

  function closeMenu(): void {
    menu?.remove();
    menu = null;
    document.removeEventListener("click", handleOutsideClick);
    window.removeEventListener("scroll", closeMenu, true);
    window.removeEventListener("resize", closeMenu);
  }

  function handleOutsideClick(event: MouseEvent): void {
    if (menu && event.target !== trigger && !menu.contains(event.target as Node)) {
      closeMenu();
    }
  }

  function openMenu(): void {
    if (menu) return;

    menu = document.createElement("div");
    menu.className = "auth-gate-menu";
    const rect = trigger.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 8}px`;
    menu.style.left = `${rect.left}px`;

    const signInLink = document.createElement("a");
    signInLink.href = "login.html";
    signInLink.className = "auth-gate-signin-link";
    signInLink.textContent = "Sign In";

    const googleBtn = document.createElement("button");
    googleBtn.type = "button";
    googleBtn.className = "auth-gate-google-btn";
    googleBtn.innerHTML = `${googleIconSvg}<span>Sign in with Google</span>`;
    googleBtn.addEventListener("click", async (event) => {
      event.stopPropagation();
      try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        closeMenu();
        onSignedIn();
      } catch {
        // user cancelled or the popup failed; leave the menu open to retry
      }
    });

    menu.append(signInLink, googleBtn);
    document.body.appendChild(menu);
    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("resize", closeMenu);
  }

  trigger.addEventListener(
    "click",
    (event) => {
      if (auth.currentUser) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (menu) {
        closeMenu();
      } else {
        openMenu();
      }
    },
    true,
  );
}
