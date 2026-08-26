# Dignify CRM v2 — Design Doc

Date: 2026-08-26
Status: Approved (user confirmed in chat)

## Goal

Restyle the CRM to match the approved reference (dark sidebar, light content, rounded cards, pastel accent panels, orange brand accent) and rebuild the core tracking flows so a small team can track work from first contact to delivery without confusion.

**Primary UX rule (user requirement):** every screen must be self-explanatory. Clear page titles, obvious primary actions, flat navigation, no hidden features. If a feature needs explanation, the design is wrong.

## Business Flows Being Tracked

### Work types (1 module, stage template per type)

1. **Paid — Outbound** (we initiate):
   Analisis → Riset Bisnis → Approval Team → Development → Penawaran → Deal
2. **Paid — Inbound** (business requests):
   Request → Brief → Development → Deploy
3. **Collab** (partnership with orgs/businesses for engagement):
   Cari Potensi → Ajakan Kerja Sama → Brief & Meeting → Agreement → Production

A Work item: id, name, type, partner/business name, PIC, team members, value (paid) or benefit notes (collab), start date, deadline, current stage, drive link, notes. A Won lead can be converted into a Paid–Inbound work item.

### Content / social media management

- Rolling design PIC every 3 months
- Rolling editor PIC weekly
- Minimum 1 content published per week
- Copywriting always by Ignas
- Live schedule tracking

Content item: title, platform, design PIC, editor PIC, copywriter (Ignas), status (Draft/Designing/Review/Scheduled/Published), publish date, live flag.
Rotation config: design PIC per quarter, editor PIC per week.

## Scope

### In scope

1. **Theme overhaul** — light content area, white cards (rounded, subtle border), dark sidebar, orange primary, pastel accent panels. All hardcoded colors in components replaced with theme tokens.
2. **Collapsible sidebar** — collapsed (72px icons + tooltips) ↔ expanded (240px icons + labels); toggle persisted in localStorage.
3. **Work module** — replaces Pipeline + Projects pages. Kanban board (columns = stages of selected type) + list view. Work detail with stage progression, dates, team, notes.
4. **Content module rework** — content list + rotation panel (current design PIC, current editor, weekly quota status) + publish schedule.
5. **Calendar page** — month grid + agenda list aggregating: work deadlines, work start dates, content publish dates, follow-ups due, live sessions.
6. **Dashboard rework** — summary cards (Follow-up hari ini, Terlambat, Urgen, Deadline minggu ini), unified todo list (follow-ups + urgent tasks, checkable), 7-day calendar strip, work count per type, weekly content status.
7. **Nav restructure** — Dashboard, Leads, Work, Clients, Tasks, Content, Calendar | Payments, Services, Team | Settings, Logout.
8. **Data layer** — extend mock data + types for Work, ContentItem, Rotation, CalendarEvent. Keep hook pattern so a backend can replace mocks later.

### Out of scope (this iteration)

- Real backend / persistence (mock data only, structured for later swap)
- Auth / multi-user
- Chat/inbox features from the reference image (visual style only is adopted)
- Reporting/analytics charts

## Page Inventory

| Page | Action |
|---|---|
| Dashboard | Rework (summary + todo + strip) |
| Leads | Keep, restyle to new theme |
| Work | New (replaces Pipeline + Projects) |
| Work detail | New |
| Clients | Keep, restyle |
| Tasks | Keep, restyle |
| Content | Rework (rotation + weekly tracking) |
| Calendar | New |
| Payments | Keep, restyle |
| Services | Keep, restyle |
| Team | Keep, restyle |
| Settings | Keep, restyle |

## Architecture

- React + Vite + Tailwind v4 + shadcn (base-mira) — unchanged.
- Theme via CSS variables in `src/index.css` (`:root` light values, `.dark` kept for future). Components use token classes only (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`...).
- Custom component-layer CSS (`.card`, `.input`, `.badge-*`, etc.) rewritten once to token-based light theme; component files keep class names to avoid mass refactor.
- Sidebar collapse state: `localStorage['sidebar-collapsed']`, default collapsed on first load (matches reference).
- Routes: `/work`, `/work/:id` new; `/pipeline`, `/projects`, `/projects/:id` removed (redirect to `/work`).
- Data hooks extended: `useWorks`, `useContent`, `useRotations`; existing hooks stay.

## UX Rules (enforced across all pages)

1. Every page: title + one-sentence description + one obvious primary action (top-right).
2. Filters and views are visible controls, never hidden behind icons.
3. Empty states say what to do next ("Belum ada work — klik Work Baru").
4. Destructive actions confirm via dialog.
5. Forms: label above field, submit/cancel bottom-right.
6. Status always shown as colored badge with text (never color-only).

## Milestones (implementation order)

1. Theme tokens → light content, restyled shared CSS
2. Sidebar collapse/expand
3. Work module (types, stages, board, list, detail, convert-from-lead)
4. Content module rework
5. Calendar page
6. Dashboard rework
7. Restyle remaining pages (Leads, Clients, Tasks, Payments, Services, Team, Settings)
