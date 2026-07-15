# PROJECT CONTEXT — Mavicer Travel Website

> Handoff for new Claude Code sessions. Read this first.

---

## 1. Project Overview

**Mavicer** (formerly "Wanderful") — a premium, cinematic travel website for young Chinese travelers. Dark editorial design, glassmorphism UI, AI-powered trip planning. Apple-quality feel.

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 + inline styles |
| Animation | GSAP 3 (`power2.out`/`power2.in`) |
| Icons | lucide-react |
| Fonts | Inter (headings/UI), Barlow (body), Instrument Serif (editorial accent) |
| Map | MapLibre GL via react-map-gl 8 |
| AI | Pluggable provider architecture (Anthropic/OpenAI/Gemini/Demo) |
| Deploy | Vercel (auto-deploys on push to main) |

**Live:** `https://003-travel-website.vercel.app`
**Repo:** `https://github.com/Mavicer/003-travel-website`

---

## 2. Completed Features (Phases 1–4)

### Phase 1: Landing Page
- Full-viewport cinematic hero with mouse parallax (GSAP)
- Liquid-glass navigation (desktop) / hamburger (mobile)
- Hero CTA smooth-scrolls to `#destinations`
- Responsive typography: `clamp()` scaling

### Phase 2: Glass Panel + Interactive Map
- Floating glassmorphism destination detail panel (680px max-width, `backdrop-blur(48px)`)
- GSAP entrance (scale + fade, 0.55s) / exit (0.28s synchronized)
- Centered modal scrollable card with close button + Escape key
- MapLibre dark-themed interactive map with CartoDB tiles
- 6 enriched destinations with full data (attractions, experiences, itinerary, seasons, practical info)
- Custom raster map styling with Retina tile support

### Phase 3: Content Experience
- **3.1** — Destination Hero: editorial title, Instrument Serif italic tagline, metadata pills, staggered GSAP
- **3.2** — Overview Polish: drop cap (CJK detection), staggered reveal, CSS hover on highlight cards
- **3.3** — Content Sections: all 5 inline sections polished with staggered animations + CSS hover states
  - AttractionsSection, ExperiencesSection, ItinerarySection, SeasonsSection, PracticalSection
  - ItinerarySection extracted to shared component
- Backdrop blur separated from dark tint (static blur on enter, animated out on exit)

### Phase 4: AI Trip Planner
- **Provider Layer** (`src/lib/ai-provider.ts`): pluggable AI abstraction
  - `AIProvider` interface → `AIClient` wrapper (timeout, retry, AbortSignal, validation)
  - Demo mode, Anthropic/OpenAI/Gemini stubs ready
  - Typed errors: `AIAbortError`, `AITimeoutError`, `AIValidationError`, `AIProviderError`
- **Demo Data** (`src/data/demo-itineraries.ts`): 8 destinations × 2 personas = 16 pre-generated itineraries
  - Code-split via dynamic `import()`, loaded only on first AI use
- **AITripPlanner** (`src/components/AI/AITripPlanner.tsx`): state machine `idle → preferences → generating → result → error`
  - Preference form: days, styles (from `aiTags`), budget, companions, special requests
  - AI thinking animation with indexed progress bar
  - Result display reuses `ItinerarySection` component
- **Integration**: PanelFooter AI button activated, DestinationPanel manages planner visibility

### Extensibility Test
- 8 destinations total: Kyoto, Santorini, Banff, Amalfi Coast, Bali, Patagonia, Shanghai, Jiuzhaigou
- Zero component changes needed to add new destinations — pure data layer

### Assets
- All 8 destination images local (`public/destinations/{id}.jpg`, 1.9 MB total)
- Hero background local (`public/hero-fallback.jpg`, 317 KB)
- 26 MB unused `.mov` deleted
- No Unsplash dependency

---

## 3. File Structure

```
src/
├── main.tsx
├── App.tsx                     # State: selectedDestinationId + isPanelOpen
├── Hero.tsx                    # Hero with parallax, brand "Mavicer"
├── index.css                   # Tailwind, @font-face, .liquid-glass
│
├── data/
│   ├── destinations.ts         # Types + DESTINATIONS[] (8 destinations, ~1500 lines)
│   └── demo-itineraries.ts     # Pre-generated AI demo itineraries (16 entries)
│
├── lib/
│   └── ai-provider.ts          # AIProvider interface, AIClient, demo provider, validation
│
└── components/
    ├── DestinationCard.tsx       # 4:5 portrait card, GSAP hover
    ├── PopularDestinations.tsx   # Section grid, IntersectionObserver
    │
    ├── DestinationPanel/
    │   ├── DestinationPanel.tsx      # Overlay shell, GSAP enter/exit, scroll container
    │   ├── PanelDestinationHero.tsx  # Editorial hero (title, tagline, metadata)
    │   ├── PanelOverview.tsx         # Introduction + highlights (drop cap, hover)
    │   ├── PanelMap.tsx              # MapLibre dark map + markers
    │   ├── ItinerarySection.tsx      # Timeline itinerary (shared, used by AI results)
    │   ├── PanelFooter.tsx           # AI CTA button (active) + back button
    │   ├── PanelHero.tsx             # Dead code (Phase 1 hero, not used)
    │   └── PanelHeader.tsx           # Dead code (Phase 1 header, not used)
    │
    └── AI/
        └── AITripPlanner.tsx     # Preference form + generating + result display

public/
├── hero-fallback.jpg            # Hero background (1920×1280, 317 KB)
├── favicon.svg
└── destinations/                # 8 destination images (1200px JPEG)
    ├── kyoto.jpg (268K)
    ├── santorini.jpg (466K)
    ├── banff.jpg (142K)
    ├── amalfi-coast.jpg (197K)
    ├── bali.jpg (295K)
    ├── patagonia.jpg (321K)
    ├── shanghai.jpg (76K)
    └── jiuzhaigou.jpg (104K)

api/                            # Vercel serverless functions (to be created)
```

---

## 4. Design System Constants

| Attribute | Value |
|---|---|
| Background | `#000` |
| Card bg | `rgba(10,10,12,0.82)` |
| Accent | `#C8884B` (amber-450) |
| Text | white → white/90 → white/85 → white/70 → white/55 → white/45 → white/40 |
| Card max-width | 680px |
| Card border-radius | 28px |
| Backdrop blur | 28px (overlay), 48px (card) |
| GSAP enter | `power2.out`, 0.45-0.55s |
| GSAP exit | `power2.in`, 0.25-0.28s |

---

## 5. Known Issues & Unfinished Work

### Dead Code
- `PanelHero.tsx` — Phase 1 hero (not imported)
- `PanelHeader.tsx` — Phase 1 header (not imported)
- `App.css` — empty legacy file
- Dirtyline font — loaded but unused

### Not Yet Implemented
- **Real AI API integration** — provider stubs exist, only demo mode works
- **AI itinerary optimization** — refine/edit generated itineraries
- **AI destination recommendation** — on homepage
- **AI travel Q&A** — contextual questions about destinations
- **Share/bookmark buttons** — visual placeholders
- **Itinerary export** — save as image/PDF
- **User accounts / preferences storage**

---

## 6. Commands

```sh
npm install          # Install dependencies
npm run dev          # Dev server (localhost:5173)
npm run build        # tsc -b && vite build (same as Vercel)
npx tsc --noEmit     # Type check only (less strict than build)
npx tsc -b           # Full strict type check
```

## 7. Next Steps

Priority order for next phase:

1. **AI API Integration** — implement `createAnthropicProvider()` in `ai-provider.ts`, add `VITE_ANTHROPIC_API_KEY` env var, test real itinerary generation
2. **AI Destination Recommendation** — "AI 帮我推荐" entry on homepage, match user preferences to best destination
3. **Itinerary Optimization** — refine generated itineraries through conversation
4. **Deploy to Production** — verify Vercel build, test all 8 destinations
