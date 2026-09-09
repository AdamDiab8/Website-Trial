# Nokia Homepage Clone — Build Brief (CONTEXT.md)

> Reference document for rebuilding the Nokia.com homepage **from scratch** as a
> personal practice project. This is a clone for learning — not a modification of
> Nokia's live site. All copy/imagery belongs to Nokia and is used here only as a
> visual/content reference.

---

## 0. My stack  *(EDIT THIS — tell Claude Code what you're building with)*

- Framework: **React + Vite**  *(or Next.js — your call)*
- Styling: **Tailwind CSS**
- Icons: **lucide-react**
- Deploy target: _____

---

## 1. Tech reference (from the live site)

| Thing | Value |
|---|---|
| Real CMS | Drupal 10, theme `onenokia_reskin` *(FYI only — you are NOT cloning Drupal)* |
| Logo | SVG, white on blue. Recreate or use a simple wordmark placeholder |
| Meta description | "As a technology leader across mobile, fixed and cloud networks, our solutions enable a more productive, sustainable and inclusive world." |
| Theme color | `#FFFFFF` · Tile color `#124191` |

---

## 2. Brand

- **Name:** Nokia (Nokia Corporation) · HQ Espoo, Finland · Innovation arm: Nokia Bell Labs (100 years)
- **Tagline:** *Advancing connectivity for the AI supercycle*
- **One-liner:** As a technology leader across mobile, fixed and cloud networks, Nokia's solutions enable a more productive, sustainable and inclusive world.
- **Voice:** Authoritative, enterprise/B2B, future-facing, AI-centric, trust- & expertise-driven. Segmented by *customer type*, not product.

---

## 3. Design tokens

### Colors
```
--nokia-blue:   #124191   /* primary — headers, buttons, logo bg, accents */
--white:        #FFFFFF   /* backgrounds */
--dark-gray:    #333333   /* body text, footer icon strokes */
```
Suggested extensions (pick shades while building):
```
--blue-hover:   #0d3271   /* darker blue for button hover */
--gray-light:   #f4f6f9   /* alternating section background */
--gray-border:  #e0e0e0   /* card borders / dividers */
```

### Typography  *(SUBSTITUTION — Nokia's real font "Nokia Pure" is proprietary)*
```
Font family:  "Inter", sans-serif   /* closest free substitute; load from Google Fonts */
Weights:      400 (body) · 600 (subheads/CTAs) · 700 (headlines)
Headline scale (desktop):  h1 ~48–56px · h2 ~32–40px · h3 ~20–24px · body ~16–18px
Letter-spacing: slightly tight on large headings (-0.01em)
```
> Alt substitutes if you want a different feel: **Montserrat** or **Poppins**.

### Layout system
```
Max content width:  ~1440px, centered, with generous side gutters
Grid:               12-col mental model; cards commonly 3-up (desktop) → 1-up (mobile)
Section rhythm:     tall full-width sections stacked vertically, lots of vertical padding (~80–120px)
Corners:            subtle radius on cards (~4–8px), mostly sharp/rectangular imagery
Shadows:            minimal; rely on imagery + whitespace, not heavy shadows
```

### Motion  *(observed behavior — implement to taste)*
- **Hero:** auto-rotating carousel, 4 slides, ~5s per slide, with clickable slide labels underneath acting as tabs. Background is a **looping muted autoplay `<video>`** (or image for slides that use one).
- **Cards:** subtle lift/scale on hover (`translateY(-4px)`, shadow fade-in).
- **CTA links:** arrow or underline animates on hover.
- **Scroll:** sections can fade/slide in on enter (optional — `IntersectionObserver`).

---

## 4. Page structure — 8 sections, top to bottom

### ① Header / Nav (sticky)
- Left: Nokia logo → `📷 [PHOTO 1]` (or recreate as SVG wordmark)
- Center/right: top-level nav with **mega-menu dropdowns**:
  - **Solutions** → 3 featured tiles (AI & cloud providers · Mission-critical enterprises · Telecommunication providers) + long link columns (Data center networking, Automation & security, Defense, Energy, Enterprise campus, Public sector, Transportation, Fixed access, Mobile access, Transport). Solution areas list: Autonomous networks, Broadband access, Core networks, Data center networks, IP networks, Microwave transport, Multimedia technologies, Network APIs, Network security, Optical networks, Radio access networks.
  - **Insights and innovation** → tiles: Nokia Bell Labs · Blog · Standardization. Links: Insights, Blog, Bell Labs, Standardization, Technical Advisory Board.
  - **Partner with us** → tiles: Nokia partners · Innovate with Nokia · Patent licensing. Links: + NGP Capital.
  - **We are Nokia** → tiles: Newsroom · Careers · Events. Links: About Nokia, Careers, Events, Investors, Leadership & governance, Newsroom, Sustainability, Responsible business.
- Utility: **Search** ("Search all of Nokia") · **More from Nokia** · **Country selector** (Worldwide English / Suomi / Offices).
- Mega-menu tile images (optional, if you build out dropdowns): `📷 [PHOTO 2]`

### ② Hero carousel (full-viewport)
4 rotating slides:
| # | Headline | CTA | Background |
|---|---|---|---|
| 1 | Nokia defines the next era of radio with the industry's first AI-native RAN platform | Watch our Summer launch | **video** `📷 [PHOTO 3a]` |
| 2 | Modern data centers that supercharge AI | Discover the critical role of the network | **video** `📷 [PHOTO 3b]` |
| 3 | Autonomous Networks | Explore networks that sense, think, act | **image** `📷 [PHOTO 3c]` |
| 4 | Broadband access networks | See our broadband services | **video** `📷 [PHOTO 3d]` |
Slide tab labels: *AI-RAN Summer launch · Modern data center networks · Autonomous Networks · Broadband access networks*

### ③ Intro band
- Centered heading: **"Advancing connectivity for the AI supercycle"**

### ④ Customer-segment blocks (alternating image ⇄ text)
| Segment | Copy | CTA | Image |
|---|---|---|---|
| AI and cloud providers | Scale faster with advanced optical and IP connectivity. | Discover solutions for AI and cloud providers | `📷 [PHOTO 4a]` |
| Telecommunication providers | Evolving networks to deliver high performance, secure connectivity ready to seize the opportunities of AI. | Discover our mobile, fixed and transport solutions | `📷 [PHOTO 4b]` |
| Mission critical enterprises | Operate securely with high-performance connectivity. | Discover connectivity solutions | `📷 [PHOTO 4c]` |

### ⑤ "Explore innovative ways to transform your business" — card grid (5 cards)
| Card | Blurb | Image |
|---|---|---|
| The future of telecom | Learn from today's telecom leaders shaping next-gen networks and cloud. | `📷 [PHOTO 5a]` |
| Artificial intelligence | Build AI-powered networks that meet the demands of AI applications. | `📷 [PHOTO 5b]` |
| Autonomous Networks Suite | Autonomous networks built for the AI era. | `📷 [PHOTO 5c]` |
| MantaRay SMO | AI-powered Service Management and Orchestration for Autonomous RAN. | `📷 [PHOTO 5d]` |
| anyRAN | The widest choice of strategic options for the RAN evolution of mobile network operators and enterprises. | `📷 [PHOTO 5e]` |
- Section CTA: **See our network solutions**

### ⑥ Bell Labs feature band
- Heading: **"Transforming the future of connectivity and beyond"**
- CTA: **Find more about Nokia Bell Labs**
- Background: color-gradient graphic(s) `📷 [PHOTO 6]`

### ⑦ "Explore the latest from Nokia" — 3-item strip
| Item | Type | Image |
|---|---|---|
| Why Digital Air Traffic Management Depends on the Communications Network Beneath It | article | `📷 [PHOTO 7a]` |
| Why does AI-ready healthcare depend on deterministic, resilient, secure optical network infrastructure? | blog | `📷 [PHOTO 7b]` |
| Faster, safer broadband for Saudi Arabia: Inside ACES's Nokia-powered network | YouTube embed | `📷 [PHOTO 7c]` (thumbnail) |
- Sub-links: More insights · More from our blog · More customer successes

### ⑦b Latest news — dated list
- 3 Sep 2026 — Nokia and BeeHealthy bring network-based verification to digital healthcare
- 1 Sep 2026 — Nokia opens new R&D center in Saudi Arabia for AI-powered network automation
- 18 Aug 2026 — Nokia ranked No. 1 for mobile core portfolio competitiveness (Omdia 2026)
- 6 Aug 2026 — Indosat, Ooredoo, Nokia & NVIDIA launch Zankore
- 23 Jul 2026 — Recast comparative financial information
- 23 Jul 2026 — Nokia Corporation Report for Q2 & H1 2026
- CTA: **More in our newsroom**

### ⑧ Footer
- Logo `📷 [PHOTO 1]` (reuse)
- **Solutions for:** AI and cloud providers · Mission critical enterprises · Telecommunication providers
- **Insights:** Blog · Learning at Nokia · Nokia Bell Labs · Technology explained · Standardization · Webinars
- **We are Nokia:** Newsroom · Careers · Investors · Sustainability · Customer success
- Support: Contact us · Extranet access · Find a partner · Support
- Newsletter: **Subscribe for our latest news**
- Social (icons, `#333333` stroke): Instagram · YouTube · X · Facebook · LinkedIn
- Consumer note: "Looking for Nokia licensed products support?" → Explore consumer devices
- Bottom bar: ©2026 Nokia all rights reserved · Cookies · Privacy notice · Terms of use · Inclusive terminology · Modern slavery statement

---

## 5. Pricing
None. B2B enterprise model — engagement via Contact us / Find a partner / Support. **No pricing section to build.**

---

## 6. Build order (suggested)
1. Scaffold project + drop in tokens (colors, font, layout container)
2. Header + nav (skip mega-menus v1, add later)
3. Hero carousel
4. Segment blocks (④)
5. Card grid (⑤)
6. Bell Labs band (⑥)
7. Insights strip + news list (⑦)
8. Footer (⑧)
9. Responsive pass + motion polish

---

## 7. Photo placeholder index → see the separate PHOTO-GUIDE for exactly what to grab and where each file goes.