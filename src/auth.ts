import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

type Mode = "login" | "signup";

const card = document.querySelector<HTMLDivElement>(".auth-card");
const tabs = document.querySelectorAll<HTMLButtonElement>(".auth-tab");
const form = document.querySelector<HTMLFormElement>(".auth-form");
const submitBtn = form?.querySelector<HTMLButtonElement>(".auth-submit");
const passwordInput = form?.querySelector<HTMLInputElement>("input[name='password']");
const errorEl = document.querySelector<HTMLParagraphElement>(".auth-error");
const googleBtn = document.querySelector<HTMLButtonElement>(".auth-google-btn");
const switchCopies = document.querySelectorAll<HTMLElement>(".auth-switch-copy");

let mode: Mode = "login";

function setMode(next: Mode): void {
  mode = next;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  if (submitBtn) submitBtn.textContent = mode === "login" ? "Log In" : "Sign Up";
  if (passwordInput) passwordInput.autocomplete = mode === "login" ? "current-password" : "new-password";
  switchCopies.forEach((copy) => {
    copy.hidden = copy.dataset.mode !== mode;
  });
  hideError();
}

function showError(error: unknown): void {
  if (!errorEl) return;
  errorEl.textContent = friendlyMessage(error);
  errorEl.hidden = false;
}

function hideError(): void {
  if (errorEl) errorEl.hidden = true;
}

function friendlyMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";
    default:
      return "Something went wrong. Please try again.";
  }
}

card?.querySelectorAll<HTMLButtonElement>(".auth-tab, .auth-switch-link").forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode as Mode));
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideError();

  const data = new FormData(form);
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");
  if (!email || !password) return;

  submitBtn?.setAttribute("disabled", "true");
  try {
    if (mode === "signup") {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    window.location.href = "index.html";
  } catch (error) {
    showError(error);
  } finally {
    submitBtn?.removeAttribute("disabled");
  }
});

googleBtn?.addEventListener("click", async () => {
  hideError();
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    window.location.href = "index.html";
  } catch (error) {
    showError(error);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "index.html";
});
