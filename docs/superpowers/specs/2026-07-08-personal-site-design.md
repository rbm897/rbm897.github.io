# Personal GitHub Pages Profile Site — Design

## Goal
A single-page personal profile site for Ram Bhajan Mishra, hosted on GitHub Pages
at `https://rbm897.github.io/`, with an About/Hero section, a Skills section, a
Resume section (HTML content transcribed from the resume PDF, plus a PDF
download), and a Contact section.

## Repo location & identity
- GitHub account: `rbm897`
- Repo: `rbm897.github.io` (must match account name exactly for GitHub Pages
  user-site behavior — serves at the domain root, no `/repo-name/` path prefix)
- Local path: `/Users/rbm/codebase/rbm897/rbm897.github.io/` — `rbm897/` is the
  account-level parent folder on this machine; each GitHub repo for this account
  gets its own subfolder. `rbm897.github.io/` is itself a standalone git repo.

## Tech stack
Plain HTML/CSS/JS. No framework, no static site generator, no build step.
GitHub Pages serves `index.html` directly from the `main` branch root.

## Repo structure
```
rbm897.github.io/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── resume.pdf        # original PDF, uploaded as-is (includes phone number)
└── README.md
```

## Page sections (single scrolling page, sticky anchor nav: About · Skills · Resume · Contact)

- **Hero/About**: Name, title ("Senior DevOps Engineer"), one-line tagline,
  current role (Commonwealth Bank of Australia).
- **Skills**: Grid of skill categories transcribed from the resume's Technical
  Skills table (Languages, Databases, Cloud, CI/CD & Orchestration, IaC tools,
  Frameworks/Tools).
- **Resume**: Work experience transcribed as styled HTML (company, title,
  dates, bullet highlights) for all four roles (Commonwealth Bank, Standard
  Chartered Nexus, Mach-X, TCS), plus Education and Certifications. Condensed
  for web readability but preserves full bullet detail. "Download PDF" button
  linking to `assets/resume.pdf` at the top of this section.
- **Contact**: Email (mailto:), LinkedIn, GitHub. **No phone number** in the
  HTML — note the downloadable PDF itself still contains the phone number
  (user's explicit choice: upload PDF as-is, accept the inconsistency between
  page content and PDF content).
- **Footer**: Copyright + GitHub link.

## Styling
- Clean minimal aesthetic, single accent color, system sans-serif font stack
  (no external font loading).
- Light theme by default, with a `prefers-color-scheme: dark` CSS variant for
  native dark-mode rendering.
- Responsive via flexbox/grid, max content width ~800–900px centered, nav
  collapses under ~640px.
- Vanilla JS only for mobile nav toggle and smooth-scroll to anchors.

## Deployment
1. `git init` inside `rbm897.github.io/` (this repo folder).
2. Build `index.html`, `style.css`, `script.js`; copy `resume.pdf` into `assets/`.
3. Create GitHub repo `rbm897.github.io` (public — required for free GitHub Pages).
4. Push `main` branch.
5. Enable Pages: repo Settings → Pages → Source: `main` branch, `/ (root)`.
6. Verify at `https://rbm897.github.io/`.

No CI/CD workflow needed — no build step exists to run.

## Testing / verification
Open the built page in a browser (local file or via a simple local server) and
visually verify: layout at desktop and mobile widths, dark mode rendering,
anchor nav scrolling, PDF download link works, all resume content renders
correctly and matches the source PDF.

## Out of scope
- Custom domain (using default `rbm897.github.io` URL).
- Projects section (kept to About/Skills/Resume/Contact only).
- Any backend, contact form, or analytics.
- Redacting the phone number from the downloadable PDF.
