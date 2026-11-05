# Country Explorer, Next.js edition (Week 5)

The Week 4 Country Explorer rebuilt with Next.js and the App Router. The country list is fetched on the server, and each country has its own detail page.

## Tech stack
Next.js (App Router), React, TypeScript, Tailwind CSS, ESLint, Prettier

## Routes
- `/` : country list with search and region filter
- `/country/[code]` : country detail, for example `/country/PAK`
- `/api/countries` : JSON endpoint (supports `?region=Europe`)

## Features
- Shared root layout with a navigation header on every page
- List page is a server component that fetches data on the server
- Search and region filter in a client component
- Detail page shows name, capital, population, region, languages and border countries
- Border countries link to their own detail pages with `<Link>`
- `loading.tsx` and `error.tsx` for the detail route
- Invalid codes show a not-found page instead of crashing
- Configuration through environment variables

## Server and client components
| File | Type | Why |
| --- | --- | --- |
| app/layout.tsx | Server | Static shell and header |
| app/page.tsx | Server | Fetches the list with await, no hooks |
| components/CountryExplorer.tsx | Client | Needs state for search and region |
| components/CountryCard.tsx | Display only | Rendered inside the client component |
| app/country/[code]/page.tsx | Server | Reads the route parameter and fetches the country |
| app/country/[code]/loading.tsx | Server | Static loading UI |
| app/country/[code]/error.tsx | Client | Error boundaries must be client components |
| app/country/[code]/not-found.tsx | Server | Static not-found UI |
| lib/countries.ts | Server-side code | Uses the secret API key |

## How to run
1. npm install
2. Get a free API key at https://restcountries.com/sign-up
3. Copy `.env.example` to `.env.local` and set:
   - RESTCOUNTRIES_KEY=your_key_here
   - NEXT_PUBLIC_APP_NAME=Country Explorer
4. npm run dev
5. Open http://localhost:3000

`RESTCOUNTRIES_KEY` has no NEXT_PUBLIC_ prefix, so it stays on the server and is never sent to the browser. `.env.local` is not committed.

## Scripts
- npm run dev : start the dev server
- npm run build : build for production
- npm run lint : run ESLint
- npm run format : run Prettier

## Project structure
```
src/
  app/
    layout.tsx
    page.tsx
    api/countries/route.ts
    country/
      layout.tsx
      [code]/
        page.tsx
        loading.tsx
        error.tsx
        not-found.tsx
  components/
    CountryCard.tsx
    CountryExplorer.tsx
  lib/
    config.ts
    countries.ts
```

## Week 5 plan
| Day | Topic | Branch |
| --- | --- | --- |
| 1 | App Router, page.tsx, layout.tsx, Link | week-5/day-1-app-router |
| 2 | Server vs client components, server-side fetching | week-5/day-2-server-client |
| 3 | Dynamic routes, nested layouts, loading and error files | week-5/day-3-routing |
| 4 | Route handlers and environment variables | week-5/day-4-route-handlers |
| 5 | Country Explorer exercise | week-5/day-5-final |