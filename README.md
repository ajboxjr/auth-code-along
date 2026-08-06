# Code Along: Salting & Hashing

A tiny login system for the "Salting & Hashing" lesson. Fork this repo, then:

```
npm install
node server.js
```

Then open http://localhost:3000 in your browser.

## What's already built for you

- `public/index.html`, `public/style.css`, `public/script.js` - the whole
  front end, including a form and an "Under the Hood" panel that shows what
  the server stored after you register.

## What we build together

- `server.js` has two `TODO` routes: `/register` and `/login`. We'll fill
  these in together using `bcryptjs` to salt and hash passwords, and
  `express-session` to remember who's logged in.

## Instructor note

`solution/server-solution.js` has the finished version of `server.js` in
case you want to double check your live-coded version.
