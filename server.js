// ============================================================
// CODE ALONG: Salting & Hashing
//
// This is a tiny login server. The HTML/CSS/client-JS in /public
// are already done for you so we can focus on the security part:
// how the SERVER stores passwords and checks logins.
//
// Follow the "Code Along: Salting & Hashing" doc - it walks
// through each TODO below in order.
// ============================================================

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

// Our "database". In a real app this would be a real database,
// but an array is perfect for learning - and it resets every
// time you restart the server, so it's easy to experiment.
const users = [];
// Example of what one entry will look like once we're done:
// { username: "ash", salt: "$2a$10$...", hash: "$2a$10$..." }

app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "this-is-a-demo-secret-change-me",
    resave: false,
    saveUninitialized: false,
  })
);

// ------------------------------------------------------------
// TODO 1: REGISTER ROUTE
// ------------------------------------------------------------
// A student submits { username, password } from the register form.
// We should NEVER save req.body.password directly. Instead:
//   1. Generate a salt with bcrypt.genSaltSync(10)
//   2. Hash the password with that salt: bcrypt.hashSync(password, salt)
//   3. Save { username, salt, hash } to the users array
//   4. Send back the salt + hash (ONLY for this demo, so students
//      can see them on the page - a real app would never do this!)
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // TODO: check if the username already exists in `users`
  // TODO: create the salt and hash with bcrypt
  // TODO: push { username, salt, hash } into `users`
  // TODO: res.json({ username, salt, hash })

  res.status(501).json({ error: "TODO: finish the /register route" });
});

// ------------------------------------------------------------
// TODO 2: LOGIN ROUTE
// ------------------------------------------------------------
// A student submits { username, password } from the login form.
// We look up the user, then use bcrypt.compareSync(password, user.hash)
// to check the password WITHOUT ever un-hashing anything.
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // TODO: find the matching user in `users`
  // TODO: if no user, res.status(401).json({ error: "Invalid username or password" })
  // TODO: use bcrypt.compareSync(password, user.hash) to check the password
  // TODO: if it matches, save req.session.username = username and res.json({ success: true })
  // TODO: if it does not match, res.status(401).json({ error: "Invalid username or password" })

  res.status(501).json({ error: "TODO: finish the /login route" });
});

// ------------------------------------------------------------
// Already done for you: session check + logout
// ------------------------------------------------------------
app.get("/me", (req, res) => {
  res.json({ username: req.session.username || null });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.listen(PORT, () => {
  console.log(`Auth code along running at http://localhost:${PORT}`);
});
