import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "./firebase";

function initials(user: User): string {
  const source = user.displayName || user.email || "?";
  return source.trim().charAt(0).toUpperCase();
}

function renderLoggedOut(container: HTMLElement): void {
  const link = document.createElement("a");
  link.href = "login.html";
  link.className = "menubar-login-link";
  link.textContent = "Log In";
  container.appendChild(link);
}

function renderLoggedIn(container: HTMLElement, user: User): void {
  const account = document.createElement("div");
  account.className = "menubar-account";

  const avatarBtn = document.createElement("button");
  avatarBtn.type = "button";
  avatarBtn.className = "menubar-avatar";
  if (user.photoURL) {
    const img = document.createElement("img");
    img.src = user.photoURL;
    img.alt = "";
    avatarBtn.appendChild(img);
  } else {
    avatarBtn.textContent = initials(user);
  }

  const dropdown = document.createElement("div");
  dropdown.className = "menubar-dropdown";
  dropdown.hidden = true;

  const email = document.createElement("p");
  email.className = "menubar-dropdown-email";
  email.textContent = user.email ?? "";

  const logoutBtn = document.createElement("button");
  logoutBtn.type = "button";
  logoutBtn.className = "menubar-logout-btn";
  logoutBtn.textContent = "Log out";
  logoutBtn.addEventListener("click", () => signOut(auth));

  dropdown.append(email, logoutBtn);

  avatarBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
  });
  document.addEventListener("click", () => {
    dropdown.hidden = true;
  });

  account.append(avatarBtn, dropdown);
  container.appendChild(account);
}

const container = document.querySelector<HTMLDivElement>(".menubar-profile");

if (container) {
  onAuthStateChanged(auth, (user) => {
    container.innerHTML = "";
    if (user) {
      renderLoggedIn(container, user);
    } else {
      renderLoggedOut(container);
    }
  });
}
