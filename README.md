# Outreach — portfolio prototype

Designed and built by [Sean Brown](https://iamseanbrown.com).

**[Try the interactive demo](https://labs.iamseanbrown.com/outreach)**

Outreach explores a focused workflow for a freelance web designer finding their
next client: discover a potential business, prepare a personal introduction,
and continue the conversation. This repository preserves the interface prototype
while the real application is developed separately.

## Explore the prototype

- Search eight sample prospects by business, neighborhood, or industry.
- Open an opportunity and prepare an introduction.
- Review and edit a draft, then simulate sending it.
- Open the sample conversation and save a demo reply.
- Switch between light, dark, and system appearance.
- Reset the sample workspace through Workspace settings.

## Scope and privacy

This is an interactive frontend prototype, not a live prospecting service.
All prospect identities, observations, contacts, and incoming replies are sample
content; any resemblance to real businesses is coincidental. Email addresses use
`.example`. No discovery API, website audit, authentication, server database,
email delivery, tracking, or AI service is connected. Simulated sends do not
transmit messages. Use fictional information only: edits are stored in your
browser until you reset the workspace or clear site data.

## Design decisions

A three-stage workflow makes the next step visible. Prospect details open beside
the list, and every introduction has a review step. Restrained blue accents,
Geist typography, and light/dark themes keep the workspace focused on readable
business information. The layout adapts to mobile, with a horizontally scrollable
prospect table.

## Run locally

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000/outreach.

```sh
npm run typecheck
npm run build
```

The app uses Next.js, React, TypeScript, Tailwind CSS, Lucide icons, and locally
bundled Geist fonts. `next.config.ts` exports a static build with the base path
`/outreach`. Build output goes into `out/`; serve its contents at `/outreach`
with `/outreach` mapped to `index.html`.

## Updating the Labs snapshot

This repository is the editable demo source. Labs hosts only its static export.
After reviewing changes, build and copy `out/` into Labs' `public/outreach/`,
replacing the previous export. Keep Labs' `/outreach` rewrite and homepage link.
Do not copy source history, environment files, or private production data.

This public repository begins with fresh history and contains only the demo.
