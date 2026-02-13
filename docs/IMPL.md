# Tag Filtering for Blog Posts & Projects

## Overview

Added a tag/category filtering system to the blog listing page and projects section, allowing visitors to quickly find content by topic.

## Files Changed

### Created

- **`src/components/FilterBar.jsx`** — Reusable filter pill component. Renders an "All" button plus one pill per unique tag. Accepts `tags`, `activeTag`, and `onTagChange` props. Active pill uses `bg-[#92ACA0] text-white`; inactive pills use a subtle border style. Wraps responsively on mobile via `flex-wrap`.

### Modified

- **`src/blog/books-2025.md`** — Tags updated from `books, growth` to `books, personal growth`
- **`src/blog/failures.md`** — Tags updated from `failure, growth` to `reflection, personal growth`
- **`src/blog/hello-world.md`** — Tags updated from `hey` to `intro`
- **`src/blog/things-recently.md`** — Tags updated from `random` to `life`
- **`src/pages/blog-page.jsx`** — Added `activeTag` state, `FilterBar` component between header and post list, tag pills on each blog card, and pagination now operates on filtered posts with page reset on filter change.
- **`src/components/projects-section.jsx`** — Added `tags` array to all 14 project objects, `activeTag` state, `FilterBar` above the project grid, tag pills on each project card below name/year, and pagination now operates on filtered projects with page reset on filter change.

## Tag Taxonomy

### Blog Tags

| Post | Tags |
|------|------|
| books-2025.md | `books`, `personal growth` |
| failures.md | `reflection`, `personal growth` |
| hello-world.md | `intro` |
| sports-review.md | `sports` |
| things-recently.md | `life` |

### Project Tags

| Project | Tags |
|---------|------|
| jdanalytics | `full-stack`, `data` |
| StudyType | `ai`, `web` |
| Socket Programming Projects | `systems` |
| Pomi | `full-stack`, `hackathon` |
| Personal Website | `web` |
| MOSAIC Admin Portal | `full-stack` |
| AI Assistive Keyboard | `ai`, `web` |
| NHL Travel Analysis | `data` |
| Canucks Wrapped | `data` |
| MOSAIC Chatbot | `ai`, `full-stack` |
| CrossWatch | `full-stack`, `hackathon` |
| FluentU | `mobile` |
| Dead City Chronicles | `games` |
| Hospital Bot | `web`, `ai` |

## Behavior

- "All" is selected by default (`activeTag = null`), showing all content
- Clicking a tag pill filters to only items containing that tag
- Pagination resets to page 1 when the active filter changes
- Tag pills are displayed on each blog post card and project card
- Dark mode compatible using existing color tokens
- Filter pills wrap on mobile via `flex-wrap`
