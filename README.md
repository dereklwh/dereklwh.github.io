# dereklwh.github.io

Personal website and blog built with React and Vite.

## Stack
- React
- Vite
- Tailwind CSS
- React Router

## Development
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` start local dev server
- `npm run build` build production output to `dist/`
- `npm run preview` preview production build locally
- `npm run lint` run ESLint
- `npm run deploy` deploy `dist/` with `gh-pages`

## Project Layout
- `src/pages/` route-level pages
- `src/components/` reusable UI components
- `src/hooks/` shared hooks
- `src/blog/` markdown blog posts
- `public/blog/` blog images served as static assets
- `public/` static files like resume and audio
- `archive/` legacy site files

## Deploy
GitHub Pages deployment is configured in `.github/workflows/github-pages.yaml`.
