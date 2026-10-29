# sarwarfx // webtools ⚡

A high-performance, modular multi-tool monorepo containing **13 independent, 100% client-side web utilities**. Each utility resides in its own dedicated subfolder with an independent, zero-build `index.html` configured for instant static hosting on **Cloudflare Pages**.

Every tool is built upon the **Cyber-HUD / High-Tech Cyberpunk Terminal Design System**:
- **Typography**: Google Font `JetBrains Mono` (weights 300, 400, 500, 600, 700, 800) with micro-typography and wide tracking for tactical terminal aesthetics.
- **Canvas & Grids**: Deep Obsidian/Slate (`#020617` / `#000000`) with lightweight CRT scanlines and 4px/6px micro-grid overlay gradients.
- **HUD Framing**: Angular cyan target brackets (`.hud-card::before` and `::after`), neon glows (`#06b6d4`), and tactical corner reticles.
- **Micro-Telemetry**: Hex system node stamps (`[SYS_NODE: 0x01]` to `0x0A`), cipher stamps (`[CIPHER: AES_256]`), and pulsing airgap privacy status: `● OPERATIONAL // AIRGAP_ZERO_LOGS`.
- **Zero Build & Zero Backend**: 100% in-browser JavaScript execution. Zero telemetry, zero external trackers, and zero backend server dependencies. Deploys directly to static hosting with zero Node compilation.

---

## 🗺️ Subdomain & Directory Matrix

| Node | Folder | Target Subdomain | Utility Name | Core Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `0x01` | [`speed/`](speed/) | `speed.sarwarfx.cfd` | **Telemetry Network Benchmark HUD** | OpenSpeedTest HTML5 gauge embed, real-time edge latency & jitter diagnostics (Cloudflare, Google, Fast, AWS), Network Information API telemetry, and quick external benchmark links. |
| `0x02` | [`qr/`](qr/) | `qr.sarwarfx.cfd` | **Optical Matrix Encoder & Scanner HUD** | High-density QR generator for Wi-Fi join strings, URLs, contact vCards & email, customizable colors/ECC, PNG/SVG downloads, plus live webcam scanner & image decoder. |
| `0x03` | [`json/`](json/) | `json.sarwarfx.cfd` | **Data Payload Debugger & Tree Inspector** | Prettifier (2/4 space, tabs), single-line minifier, syntax error pointer with exact line & column coordinates, interactive collapsible tree inspector with search, and AST statistics. |
| `0x04` | [`ip/`](ip/) | `ip.sarwarfx.cfd` | **Signal Intelligence & IP Recon Radar** | Real-time IPv4/IPv6 detection, ISP & Autonomous System (ASN) lookup, city/region coordinates with an interactive dark high-contrast Leaflet map, WebRTC leak tester, and DNS ping. |
| `0x05` | [`diff/`](diff/) | `diff.sarwarfx.cfd` | **Checksum & Difference Analyzer HUD** | Split (side-by-side) and unified difference viewer powered by JSDiff with line numbering, neon green additions (`+`) and red deletions (`-`), word/line granularity, and patch export. |
| `0x06` | [`compress/`](compress/) | `compress.sarwarfx.cfd` | **Pixel Matrix Optimizer & WebP Console** | 100% client-side HTML5 Canvas compressor & WebP/JPEG converter with quality slider, aspect-ratio scaling, before/after visual comparison stage, and byte savings meter. |
| `0x07` | [`base64/`](base64/) | `base64.sarwarfx.cfd` | **Binary Cryptographic Cipher Studio** | Two-way UTF-8 safe text Base64 encoder/decoder with URL-safe mode, file/image to Data URI generator with HTML `<img>` & CSS `background-image` snippets, and Base64-to-file reconstructor. |
| `0x08` | [`clean/`](clean/) | `clean.sarwarfx.cfd` | **Text Sanitization & Stream Purifier** | Case switcher (10 presets), line deduplication, whitespace stripper, slugifier, and live word/char analytics with multi-level undo/redo history. |
| `0x09` | [`clock/`](clock/) | `clock.sarwarfx.cfd` | **Global UTC Orbital Chronograph** | Real-time global clocks across 10 hubs with day/night status and business hours indicator, interactive 24-hour timeline scrubber, precision stopwatch, and countdown timer with audio chime. |
| `0x0A` | [`calc/`](calc/) | `calc.sarwarfx.cfd` | **Bandwidth Telemetry & Computation ALU** | Bandwidth download time estimator across 10M to 10G broadband tiers, loan/mortgage EMI calculator with amortization table and CSV export, plus gross profit margin, markup & VAT calculator. |
| `0x0B` | [`pack/`](pack/) | `pack.sarwarfx.cfd` | **Codebase to LLM Context Packer** | Drag-and-drop codebase directory flattener for Claude 3.5, GPT-4o, and Gemini. Recursive file ingestion, junk exclusions, ASCII tree outline, and token telemetry. |
| `0x0C` | [`redact/`](redact/) | `redact.sarwarfx.cfd` | **Privacy Redactor & EXIF Sanitizer** | In-browser document & image sanitization. Solid blackout and raster pixelation brush with multi-level undo stack. Canvas export inherently purges 100% of EXIF and GPS metadata. |
| `0x0D` | [`invoice/`](invoice/) | `invoice.sarwarfx.cfd` | **Zero-Login Invoice Studio** | Client-side billing generator with dynamic line items, multi-currency support, tax/discount calculation, localStorage auto-save, and vector print-to-PDF output. |
| `ROOT` | [`index.html`](index.html) | `apps.sarwarfx.cfd` | **Central Suite Command Portal** | Central cyber-HUD terminal directory featuring searchable interactive module cards linking to all 13 micro-utilities. |

---

## 📁 Repository Structure

```text
webtools/
├── index.html           # apps.sarwarfx.cfd (Central suite portal & directory - Command Hub)
├── speed/
│   └── index.html       # speed.sarwarfx.cfd (Node 0x01: Broadband & Edge Latency)
├── qr/
│   └── index.html       # qr.sarwarfx.cfd (Node 0x02: Optical Matrix & Scanner)
├── json/
│   └── index.html       # json.sarwarfx.cfd (Node 0x03: Data Payload Debugger)
├── ip/
│   └── index.html       # ip.sarwarfx.cfd (Node 0x04: Signal Intelligence Radar)
├── diff/
│   └── index.html       # diff.sarwarfx.cfd (Node 0x05: Binary & Code Diff Analyzer)
├── compress/
│   └── index.html       # compress.sarwarfx.cfd (Node 0x06: Pixel Matrix Optimizer)
├── base64/
│   └── index.html       # base64.sarwarfx.cfd (Node 0x07: Binary Cipher Studio)
├── clean/
│   └── index.html       # clean.sarwarfx.cfd (Node 0x08: Stream Purifier)
├── clock/
│   └── index.html       # clock.sarwarfx.cfd (Node 0x09: Orbital Chronograph)
├── calc/
│   └── index.html       # calc.sarwarfx.cfd (Node 0x0A: Bandwidth & Finance ALU)
├── pack/
│   └── index.html       # pack.sarwarfx.cfd (Node 0x0B: LLM Context Packer)
├── redact/
│   └── index.html       # redact.sarwarfx.cfd (Node 0x0C: Privacy Redactor & EXIF Sanitizer)
├── invoice/
│   └── index.html       # invoice.sarwarfx.cfd (Node 0x0D: Zero-Login Invoice Studio)
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
