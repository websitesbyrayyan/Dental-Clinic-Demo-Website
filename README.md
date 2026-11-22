# Sagewood Dental Studio

A premium, responsive, single-page dental clinic website concept built with React, TypeScript, Vite, Tailwind CSS v3, Framer Motion and Lucide React. Typography uses Fraunces Variable and DM Sans Variable.

No additional runtime packages have been added.

## Run locally

From Windows PowerShell in the project directory:

```powershell
npm.cmd install
npm.cmd run dev
```

The development start attempts to download missing Pexels photographs into `public/images/`. If the network is unavailable, the development server still starts and the image component displays its built-in fallback. Once downloaded, photographs are served from local files; the website does not hotlink Pexels at runtime.

To download or retry the photographs manually:

```powershell
npm.cmd run images:download
```

To run the checks and create a production build:

```powershell
npm.cmd run lint
npm.cmd run build
```

The production build checks that the local photographs are present, preventing a deployment with missing image files.

## Sample content and launch requirements

This is a design concept, not a verified dental practice. The clinic contact details, address, hours, clinician names and biographies, testimonials, statistics and editorial content are illustrative. Replace them with approved, accurate information before publishing.

The site remains `noindex, nofollow` and suppresses local-business structured data while `clinic.isSample` is `true`. For a real launch:

1. Replace the sample clinic information in `src/data/clinic.ts`.
2. Replace stock portraits and illustrative clinic images with approved clinic photography where appropriate.
3. Replace sample reviews, team profiles, statistics and article content with verified material.
4. Set `clinic.isSample` to `false` only after all sample content has been replaced.
5. Remove the `noindex, nofollow` directive in `index.html` only when the domain and content are ready to be indexed.
6. Connect a real booking system or approved backend if server-side appointment handling is required.

The appointment form validates the details and opens a pre-filled WhatsApp message. It does not store submissions on a server or confirm an appointment; a time is confirmed only after the clinic replies.

## Project structure

```text
src/
  components/
    graphics/
    sections/
    ui/
  data/clinic.ts
  hooks/
  lib/
  types/clinic.ts
  App.tsx
  index.css
  main.tsx
public/
  images/
scripts/
  download-images.mjs
index.html
package.json
package-lock.json
tailwind.config.js
README.md
IMAGES.md
```

See [IMAGES.md](./IMAGES.md) for the selected Pexels assets, photographer credits, and image-use notes.
