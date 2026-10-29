# sarwarfx // webtools ⚡

A high-performance, modular multi-tool monorepo containing **10 independent, 100% client-side web utilities**. Each utility resides in its own dedicated subfolder with an independent, zero-build `index.html` configured for instant static hosting on **Cloudflare Pages**.

Every tool adheres strictly to the **Cyber-Minimalist Obsidian Dark Theme** design system:
- **Palette**: Deep Obsidian/Slate (`#030712` / `bg-slate-950`) with translucent glassmorphic cards (`bg-slate-900/60 border-slate-800 backdrop-blur-md`).
- **Accents**: Cyber neon glows with Electric Cyan (`text-cyan-400`, `border-cyan-500/50`, `shadow-cyan-500/20`), indigo, and emerald status indicators.
- **Privacy & Security**: 100% in-browser JavaScript execution. Zero telemetry, zero external trackers, and zero backend server dependencies.
- **Zero Build**: Pure HTML5, modern vanilla JavaScript, and Tailwind CSS via CDN. Deploys directly to static hosting with zero Node compilation.

---

## 🗺️ Subdomain & Directory Matrix

| Folder | Target Subdomain | Utility Name | Core Capabilities |
| :--- | :--- | :--- | :--- |
| [`speed/`](speed/) | `speed.sarwarfx.cfd` | **Broadband Speed & Edge Ping** | OpenSpeedTest HTML5 gauge embed, real-time edge latency & jitter diagnostics (Cloudflare, Google, Fast, AWS), Network Information API telemetry, and quick external benchmark links. |
| [`qr/`](qr/) | `qr.sarwarfx.cfd` | **QR Code Studio & Live Scanner** | High-density QR generator for Wi-Fi join strings, URLs, contact vCards & email, customizable colors/ECC, PNG/SVG downloads, plus live webcam scanner & image decoder. |
| [`json/`](json/) | `json.sarwarfx.cfd` | **JSON Formatter & Tree Viewer** | Prettifier (2/4 space, tabs), single-line minifier, syntax error pointer with exact line & column coordinates, interactive collapsible tree inspector with search, and statistics. |
| [`ip/`](ip/) | `ip.sarwarfx.cfd` | **Public IP & Network Intelligence** | Real-time IPv4/IPv6 detection, ISP & Autonomous System (ASN) lookup, city/region coordinates with an interactive dark Leaflet map, WebRTC leak tester, and DNS ping. |
| [`diff/`](diff/) | `diff.sarwarfx.cfd` | **Code & Text Diff Checker** | Split (side-by-side) and unified difference viewer powered by JSDiff with line numbering, neon green additions (`+`) and red deletions (`-`), word/line granularity, and patch export. |
| [`compress/`](compress/) | `compress.sarwarfx.cfd` | **In-Browser Image Compressor** | 100% client-side HTML5 Canvas compressor & WebP/JPEG converter with quality slider, aspect-ratio scaling, before/after visual comparison stage, and byte savings meter. |
| [`base64/`](base64/) | `base64.sarwarfx.cfd` | **Base64 & Data URI Studio** | Two-way UTF-8 safe text Base64 encoder/decoder with URL-safe mode, file/image to Data URI generator with HTML `<img>` & CSS `background-image` snippets, and Base64-to-file reconstructor. |
| [`clean/`](clean/) | `clean.sarwarfx.cfd` | **Text Cleaner & Case Switcher** | Case switcher (UPPERCASE, lowercase, Title, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE), line deduplication, whitespace stripper, slugifier, and live word/char analytics with undo/redo. |
| [`clock/`](clock/) | `clock.sarwarfx.cfd` | **World Clock & Meeting Planner** | Real-time global clocks across 10 hubs with day/night status and business hours indicator, interactive 24-hour time scrubber slider, precision stopwatch, and countdown timer with audio chime. |
| [`calc/`](calc/) | `calc.sarwarfx.cfd` | **Bandwidth, EMI & Margin Calc** | Bandwidth download time estimator across 10M to 10G broadband tiers, loan/mortgage EMI calculator with amortization table and CSV export, plus gross profit margin, markup & VAT calculator. |
| [`index.html`](index.html) | `apps.sarwarfx.cfd` | **Suite Portal & Directory** | Central dark hub featuring searchable interactive cards linking to all 10 micro-tools. |

---

## 📁 Repository Structure

```text
webtools/
├── index.html           # apps.sarwarfx.cfd (Central suite portal & directory)
├── speed/
│   └── index.html       # speed.sarwarfx.cfd
├── qr/
│   └── index.html       # qr.sarwarfx.cfd
├── json/
│   └── index.html       # json.sarwarfx.cfd
├── ip/
│   └── index.html       # ip.sarwarfx.cfd
├── diff/
│   └── index.html       # diff.sarwarfx.cfd
├── compress/
│   └── index.html       # compress.sarwarfx.cfd
├── base64/
│   └── index.html       # base64.sarwarfx.cfd
├── clean/
│   └── index.html       # clean.sarwarfx.cfd
├── clock/
│   └── index.html       # clock.sarwarfx.cfd
├── calc/
│   └── index.html       # calc.sarwarfx.cfd
└── README.md            # Monorepo architecture & setup guide
```

---

## 🚀 Cloudflare Pages Static Hosting Setup

Because each application is completely standalone and contains zero Node/npm dependencies or build steps, deployment to Cloudflare Pages is immediate and seamless.

### Option A: Monorepo Single Project Deployment (Recommended)
1. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select repository `SARWARFX/webtools` and branch `main`.
3. In **Build Settings**:
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/` (or leave blank)
4. Click **Save and Deploy**.
5. Under **Custom Domains**, add `apps.sarwarfx.cfd` (and optionally `sarwarfx.cfd`).
6. To route subdomains on Cloudflare:
   - Configure a Cloudflare Transform Rule or Worker routing `speed.sarwarfx.cfd` to `/speed/index.html`, etc.
   - Or deploy individual sub-projects via Option B.

### Option B: Dedicated Cloudflare Pages Project per Subdomain
For strict 1:1 mapping where each tool has its own Pages project:
1. Create a new Cloudflare Pages project for each tool (e.g. `sarwarfx-speed`, `sarwarfx-qr`).
2. Point each project to repository `SARWARFX/webtools`.
3. Set the **Root directory** for each project to its folder name (e.g. `speed`, `qr`, `json`).
4. Set **Build command**: *(Blank)*, **Build output directory**: *(Blank)*.
5. In **Custom Domains**, assign the target subdomain (e.g., `speed.sarwarfx.cfd` for `speed`).

---

## 💻 Local Testing & Development

Run a local HTTP server with Python or Node:

```powershell
# Using Python
python -m http.server 8080

# Or using npx serve
npx serve .
```

Open `http://localhost:8080` in your web browser. You can navigate through the central suite directory or open any tool directly:
- `http://localhost:8080/speed/index.html`
- `http://localhost:8080/qr/index.html`
- `http://localhost:8080/json/index.html`
- `http://localhost:8080/ip/index.html`
- `http://localhost:8080/diff/index.html`
- `http://localhost:8080/compress/index.html`
- `http://localhost:8080/base64/index.html`
- `http://localhost:8080/clean/index.html`
- `http://localhost:8080/clock/index.html`
- `http://localhost:8080/calc/index.html`

The built-in Suite Switcher detects whether the site is running on `*.sarwarfx.cfd` or locally, automatically adapting links to relative local paths (`../<tool>/index.html`) or live subdomains (`https://<tool>.sarwarfx.cfd/`).

---

## 🛡️ Privacy & Security Architecture
- **100% Client-Side**: No user data, images, JSON payloads, or text inputs are ever sent to a server.
- **Zero Third-Party Telemetry**: No Google Analytics, no Facebook Pixels, no trackers.
- **Edge CDN Delivery**: Uses high-availability, immutable Cloudflare/cdnjs CDN packages for Tailwind CSS, FontAwesome, Leaflet, and JSDiff.

---

## 📄 License
MIT © [SARWARFX](https://github.com/SARWARFX)
