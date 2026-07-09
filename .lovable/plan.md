
# Portfolio Upgrade Plan

## 1. New Navigation (replaces hamburger)
Add a top navigation with **3 buttons**: `Home` · `Profile` · `Menu`.
- Home → scrolls to top / hero
- Profile → scrolls to profile card + map + contact area
- Menu → opens the slide-out (same content as current hamburger: Shop, Downloads, ChatGPT, Admin, Tools, Downloader, Anime/Manga)
- Remove the 3-line hamburger icon; keep dark/light toggle
- Move "Tools / Downloader / Anime/Manga" sections into this Menu drawer only (already there — just ensure they stay).

## 2. Status Strip (top of home)
A single sleek bar under the nav showing live info:
- 🕐 Digital time (PHT)
- 🔋 Battery %
- 📶 Network speed (ping in ms, using a lightweight fetch-timing ping every ~10s)
- ✍️ "Developed by JM Cruz"

Replace the separate LiveClock + BatteryIndicator cards further down with this unified strip.

## 3. Profile Section Reorg
- Move the **LocationMap** up next to the profile (right under ProfileCard / social links area)
- Add a **Contact / About** panel near the profile buttons (About text + Messenger + email/contact link)
- Remove the standalone "My Websites" section from the homepage
- Social buttons stay; the Menu button sits **below the social buttons** as requested

## 4. Verified Badge Upgrade
Redesign the blue check into a **realistic Meta/Facebook-style badge**:
- Layered gradient blue (#1877F2 → #0866FF)
- Scalloped/star outline shape (SVG path) instead of a plain circle
- Soft inner highlight + drop shadow
- White stroked check

## 5. Visual Style: "smoother, less liquid glass"
- Reduce heavy backdrop-blur / glass borders on home buttons
- Use softer solid surfaces with subtle shadow + smooth hover transitions
- Keep dark/light theme toggle working
- Applies to: nav buttons, status strip, section cards

## 6. Bio Cleanup
- Remove any AI-related text/mentions from the public bio area (keep AI only inside admin dashboard)

## Technical Notes
- New components: `TopNav.tsx` (Home/Profile/Menu), `StatusStrip.tsx` (time/battery/ping/credit), updated `ProfileCard` badge SVG
- Ping: `performance.now()` around a `fetch('/favicon.ico?_=' + Date.now(), {cache:'no-store'})` every 10s
- Section anchors: `#home`, `#profile` with smooth-scroll
- Delete `<WebsitesSection />` usage from `Index.tsx` (component file kept for admin)
- Remove `LiveClock` + `BatteryIndicator` usages from Index (folded into StatusStrip)
- Move `LocationMap` up in the flow; add new `ContactCard.tsx` for About/Contact
- Keep all existing menu drawer contents intact under the new "Menu" button

## Out of Scope (confirm if wanted)
- Actual internet speed test (Mbps) — using ping (ms) instead since real speed test needs a large download
- Changing admin editor
