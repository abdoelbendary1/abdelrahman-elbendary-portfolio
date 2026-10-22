# Abdelrahman Elbendary — Portfolio

A responsive, single-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, and Lucide icons. All content comes from the supplied professional brief. No application screenshots, repositories, store links, or achievements have been invented.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run typecheck
npm run build
```

The production build is exported to `out/`. Preview it with any static HTTP server. Use `npm run dev` for development; Next.js `next start` does not serve static exports.

## Edit content

| File | Content |
| --- | --- |
| `src/data/profile.ts` | Name, introduction, complete summary, contact links, CV URL |
| `src/data/experience.ts` | All four roles, dates, locations, and achievements |
| `src/data/skills.ts` | Six original skill categories and their chips |
| `src/data/projects.ts` | Eight projects, technical contributions, screenshots, optional links |
| `src/data/education.ts` | Degree, diploma, certification, and course |
| `src/app/layout.tsx` | SEO, Open Graph, and Twitter metadata |
| `src/app/globals.css` | Colors, typography, spacing, and responsive layouts |

Projects are rendered in array order. Keep the three featured projects first; `featured: true` gives them larger artwork and a featured badge. AQAR is one project with both mobile and web technologies. StreakUp and AQAR feature lists are explicitly described as scope because individual features' production readiness has not been verified.

## Add real screenshots

Place authorized images in `public/projects/<project-id>/`. Every project has a matching folder. Use optimized WebP/AVIF or compressed PNG/JPEG, ideally under 300 KB each. Reference files using public-root URLs:

```ts
{
  id: "aqar",
  // ...other project fields
  coverImage: "/projects/aqar/mobile-cover.webp",
  coverImageWidth: 1774,
  coverImageHeight: 887,
  screenshots: [
    "/projects/aqar/mobile-listings.webp",
    "/projects/aqar/web-listings.webp",
  ],
}
```

Covers use their original pixel dimensions (`coverImageWidth` and `coverImageHeight`), responsive width, and automatic height so landscape and portrait images retain their natural proportions without cropping. Set these dimensions to match each new source file. Optional galleries appear inside the expandable project details and scroll horizontally on small screens. Selecting a screenshot, project cover, or portrait opens an enlarged image overlay. Close with the close button, Escape, or a click outside the image; focus returns to the trigger. Images use Next.js Image with responsive size hints and lazy loading. Since the site exports statically, its image optimizer is disabled: compress assets before adding them.

Without screenshots, cards display clearly labeled typographic artwork and a Lucide category icon, not a simulated application UI. Company project information is limited to the supplied brief; add images only when authorized for public display.

## Add project links

Set `githubUrl`, `googlePlayUrl`, `appStoreUrl`, and/or `liveDemoUrl` in the project data. Buttons render only for supplied HTTP(S) URLs. Verify that each link is real, correct, and authorized before adding it. Omit unknown links rather than using `#` or placeholder URLs.

## Add the original CV

The supplied original resume is available as `public/resume.pdf`, and `resumeUrl` in `src/data/profile.ts` points to it. Replace that file with an updated original and rebuild when needed. The download button is enabled only when the PDF exists at build time.

## Deploy to Vercel

Import this directory as a Git repository in Vercel and use the Next.js framework preset. Install with `npm ci`, build with `npm run build`; Next.js handles the static export. No environment variables, database, or backend are required. The exported `out/` folder also works on any static hosting service.

After selecting a production domain, optionally set `metadataBase` and `alternates.canonical` in `src/app/layout.tsx` using that actual domain. The metadata deliberately contains no invented domain or screenshot. Social metadata currently uses a text summary rather than an unavailable preview image.

## Accessibility and behavior

- Semantic sections, one primary heading, skip link, and visible keyboard focus.
- Mobile navigation with expanded state, Escape dismissal, and current-section highlighting.
- Native, keyboard-accessible project detail disclosures.
- Email and phone links connect directly; no form or tracking service.
- Smooth anchor navigation respects reduced-motion preferences.
- Montserrat headings, Open Sans body text, and Roboto interface labels are self-hosted through `next/font/google`. Google is contacted during the build to fetch fonts; visitors load the bundled font files from the site.
