// This file is already done for you! It just talks to the server
// routes we're building in server.js and updates the page.

const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");
const logoutBtn = document.querySelector("#logout-btn");
const statusEl = document.querySelector("#status");

const hoodPassword = document.querySelector("#hood-password");
const hoodSalt = document.querySelector("#hood-salt");
const hoodHash = document.querySelector("#hood-hash");

async function refreshStatus() {
  const res = await fetch("/me");
  const data = await res.json();
  if (data.username) {
    statusEl.textContent = `Logged in as ${data.username}`;
    logoutBtn.hidden = false;
  } else {
    statusEl.textContent = "Not logged in.";
    logoutBtn.hidden = true;
  }
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#register-username").value;
  const password = document.querySelector("#register-password").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    statusEl.textContent = data.error || "Something went wrong.";
    statusEl.className = "error";
    return;
  }

  statusEl.className = "";
  statusEl.textContent = `Account "${data.username}" created! Try logging in.`;

  // Show what the server actually stored, so we can SEE the salt and hash.
  hoodPassword.textContent = password;
  hoodSalt.textContent = data.salt;
  hoodHash.textContent = data.hash;

  registerForm.reset();
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    statusEl.className = "error";
    statusEl.textContent = data.error || "Invalid username or password.";
    return;
  }

  statusEl.className = "";
  loginForm.reset();
  refreshStatus();
});

logoutBtn.addEventListener("click", async () => {
  await fetch("/logout", { method: "POST" });
  refreshStatus();
});

refreshStatus();
