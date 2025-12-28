# halfdigit-web ✅

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A small Next.js web app that includes pages for speech-to-text, a Titanic demo, and contact information. Built with Next.js (App Router), React, and Tailwind CSS.

---

## 🚀 Quick start

Prerequisites:
- Node.js (16+ recommended)
- npm or yarn

Install dependencies:

```bash
npm install
# or
# yarn
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Linting:

```bash
npm run lint
```

---

## 🗂 Project structure

- `app/` — Next.js App Router files and pages
  - `page.jsx` — Home page
  - `components/` — Shared UI components (e.g., `Navbar.jsx`, `Footer.jsx`)
  - `contact/`, `speech-to-text/`, `titanic/` — Feature pages
- `public/` — Static assets
- `next.config.ts`, `postcss.config.mjs` — Build and styling configuration
- `package.json` — Scripts and dependencies

---

## 🔧 Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- lucide-react (icons)

---

## 📁 Ignored files

This project respects the entries in `.gitignore`. Files and folders intentionally ignored include (but are not limited to):

- `/node_modules`
- `/.pnp`, `.pnp.*`
- `.yarn/*` (with some exceptions kept)
- `/coverage`
- `/.next/`, `/out/`
- `/build`
- `.DS_Store`, `*.pem`
- `npm-debug.log*`, `yarn-debug.log*`, `yarn-error.log*`, `.pnpm-debug.log*`
- `.env*` (env files)
- `.vercel`
- `*.tsbuildinfo`, `next-env.d.ts`
- `.vscode/`, `.idea`

If you need to see or change ignored patterns, open `.gitignore`.

---

## ✅ Deployment

This app is compatible with Vercel and other Node.js static/SSR hosts. For Vercel: connect the repository and set the build command to `npm run build` and the output directory will be handled automatically by Next.js.

---

## 🤝 Contributing

- Feel free to open issues or PRs.
- Add a `LICENSE` file if you intend to change the licensing.

---

If you'd like, I can add a short project description inside the `app/page.jsx` homepage or add a `LICENSE` file — just tell me which license to use.
