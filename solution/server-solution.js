// ============================================================
// INSTRUCTOR ANSWER KEY - Salting & Hashing Code Along
// This is server.js with every TODO filled in. Students should
// NOT get this file ahead of time - it's here so instructors
// can double check their live-coded version, or copy/paste if
// they get stuck mid-lesson.
// ============================================================

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

const users = [];

app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "this-is-a-demo-secret-change-me",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  users.push({ username, salt, hash });

  res.json({ username, salt, hash });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const matches = bcrypt.compareSync(password, user.hash);
  if (!matches) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  req.session.username = username;
  res.json({ success: true });
});

app.get("/me", (req, res) => {
  res.json({ username: req.session.username || null });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.listen(PORT, () => {
  console.log(`Auth code along running at http://localhost:${PORT}`);
});
