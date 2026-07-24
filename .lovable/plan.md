## Goal
Turn the Shop page into the new Main Dashboard, simplify navigation, redesign the Open Menu as secondary-only, and fix the 8 security findings.

## 1. Main Dashboard (was `/shop` → becomes `/`)
Rebuild `src/pages/Shop.tsx` into a real dashboard and route it at `/`. Move the current portfolio page to `/profile`.

Sections (card grid, dark theme with blue/purple accents):
- **Quick Access** row: Profile, ChatGPT Pro, Shop items, Admin
- **Featured Apps**: Abby's Tools (buy flow preserved)
- **APK Downloads**: CapCut Premium, GameBase (from current DownloadApps page)
- **Tools & Downloaders**: cards for the tools/downloaders lists currently in the Open Menu
- **Anime/Manga**: AnimeHaven, GlobalComix
- **Latest Updates**: pulled from `notes` table (fallback static)

Responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), lazy `<img loading="lazy">`, framer-style CSS transitions already in `index.css`.

## 2. Navigation
Simplify `TopNav`:
- Buttons: **Dashboard** (/) , **Profile** (/profile), **Menu**, theme toggle
- Remove duplicate Shop button (Shop lives inside dashboard now)

## 3. Open Menu (secondary only)
Reduce the sidebar in the new dashboard + profile page to:
- Settings (theme toggle info)
- About
- Contact
- Feedback (mailto)
- Privacy Policy (new `/privacy` route, simple static)
- Terms of Service (new `/terms` route, simple static)
- Admin login link

Remove Tools/Downloaders/Anime blocks from the menu (they now live on the dashboard).

## 4. Security — fix 8 findings
Run `security--get_scan_results`, then address each:
- Tighten RLS/GRANTs on public tables where over-permissive
- Add zod validation on `BuyApp` form and any user-input surfaces
- Remove any client-exposed secrets/logs
- Sanitize note/highlight text render (no `dangerouslySetInnerHTML`)
- Add email HIBP if flagged
- Any linter warnings from `supabase--linter`

Report each finding + fix; call `manage_security_finding` mark_as_fixed with explanation.

## 5. UI/UX polish
- Dark theme tokens already exist; add blue/purple accent gradient utility in `index.css`
- Cards use `smooth-card` with hover lift
- Consistent lucide icons
- `loading="lazy"` on all images
- Keep animations subtle (existing `ScrollReveal`)

## Technical notes
- New routes: `/` (Dashboard), `/profile` (current Index), `/privacy`, `/terms`
- Files touched: `src/App.tsx`, `src/pages/Shop.tsx` (→ Dashboard), `src/pages/Index.tsx` (→ Profile), `src/components/TopNav.tsx`, new `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/pages/BuyApp.tsx` (add zod), `src/index.css` (accent gradient)
- DB migrations only if security scan requires

Ready to build on approval.