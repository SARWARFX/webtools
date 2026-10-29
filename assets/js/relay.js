/**
 * SarwarFX CyberTools — Relay Promotion Engine & Contextual Workflow Chain
 * Automatically mounts:
 * 1. Horizontal Workflow Chain Ribbon above <article> or <footer>
 * 2. Floating Tactical Side Rail dock on the right edge
 * 3. Recent Nodes Activity Logger in localStorage['sarwarfx_recent_tools']
 * 4. Offline Service Worker (/sw.js) auto-registration
 */

(function () {
  'use strict';

  // 1. Tool Directory & Contextual Workflows Database
  const WORKFLOW_CHAINS = {
    // Media & Assets
    'exif-strip': ['watermark-img', 'compress', 'b64img'],
    'watermark-img': ['compress', 'exif-strip', 'watermark-video'],
    'watermark-video': ['screen-cap', 'audio-trim', 'exif-strip'],
    'screen-cap': ['audio-trim', 'watermark-video', 'camera'],
    'audio-trim': ['screen-cap', 'tone', 'mic'],
    'svg-clean': ['svg', 'clippath', 'minify'],
    'svg': ['svg-clean', 'clippath', 'draw'],
    'compress': ['watermark-img', 'exif-strip', 'b64img'],
    'b64img': ['compress', 'palette', 'imgpalette'],
    'imgpalette': ['palette', 'b64img', 'draw'],
    'palette': ['imgpalette', 'glass', 'shadow'],
    'draw': ['palette', 'svg', 'clippath'],
    'favicon': ['svg-clean', 'b64img', 'qr'],
    'camera': ['screen-cap', 'mic', 'watermark-video'],
    'mic': ['audio-trim', 'tone', 'camera'],
    'clippath': ['svg', 'flexgrid', 'draw'],
    'qr': ['short', 'url', 'favicon'],

    // Developer & Tokens
    'jwt': ['curl-convert', 'pass-gen', 'token'],
    'curl-convert': ['jwt', 'webhook', 'httpcode'],
    'curl': ['curl-convert', 'headers', 'webhook'],
    'cron': ['epoch', 'clock', 'time'],
    'regex': ['regexclean', 'slug', 'unescape'],
    'regexclean': ['regex', 'slug', 'clean'],
    'json': ['jsondiff', 'schema', 'yaml'],
    'jsondiff': ['json', 'diff', 'yaml'],
    'schema': ['json', 'sql', 'xml'],
    'sql': ['table', 'csv', 'json'],
    'minify': ['clean', 'svg-clean', 'unescape'],
    'token': ['jwt', 'pass-gen', 'hash'],
    'doc': ['markdown', 'table', 'json'],
    'table': ['csv', 'sql', 'doc'],
    'xml': ['yaml', 'json', 'schema'],
    'yaml': ['json', 'xml', 'doc'],
    'slug': ['clean', 'regex', 'url'],
    'unescape': ['clean', 'base64', 'regexclean'],

    // Crypto & Security
    'pass-gen': ['checksum', 'bcrypt', 'hash'],
    'pass': ['pass-gen', 'bcrypt', 'hash'],
    'checksum': ['hash', 'pass-gen', 'diff'],
    'hash': ['checksum', 'bcrypt', 'pass-gen'],
    'bcrypt': ['hash', 'pass-gen', 'cert'],
    'tempmail': ['pass-gen', 'checksum', 'webhook'],
    'webhook': ['curl-convert', 'headers', 'httpcode'],
    'cert': ['bcrypt', 'uuid', 'headers'],
    'caesar': ['morse', 'rot13', 'base64'],
    'morse': ['caesar', 'tone', 'bintext'],
    'uuid': ['rand', 'token', 'cert'],
    'redact': ['clean', 'exif-strip', 'pdf-matrix'],
    'robots': ['meta', 'sitemap', 'headers'],
    'hexview': ['bintext', 'checksum', 'basecodec'],

    // Networking & Infra
    'cidr': ['subnet', 'ip', 'whoisip'],
    'subnet': ['cidr', 'ip', 'whoisip'],
    'ip': ['whoisip', 'cidr', 'dns'],
    'whoisip': ['ip', 'dns', 'ports'],
    'dns': ['whoisip', 'ip', 'ports'],
    'ports': ['whoisip', 'httpcode', 'headers'],
    'headers': ['httpcode', 'webhook', 'curl-convert'],
    'httpcode': ['headers', 'webhook', 'curl-convert'],
    'short': ['qr', 'url', 'slug'],
    'url': ['short', 'slug', 'unescape'],
    'speed': ['network', 'ports', 'device'],
    'network': ['speed', 'device', 'battery'],

    // Docs & Text
    'pdf-matrix': ['redact', 'compress', 'clean'],
    'diff': ['jsondiff', 'clean', 'newlines'],
    'markdown': ['doc', 'table', 'clean'],
    'clean': ['newlines', 'diff', 'textstat'],
    'newlines': ['clean', 'textstat', 'list'],
    'textstat': ['clean', 'lorem', 'doc'],
    'lorem': ['textstat', 'doc', 'markdown'],
    'csv': ['table', 'sql', 'json'],
    'invoice': ['pdf-matrix', 'calc', 'table'],
    'base64': ['basecodec', 'b64img', 'bintext'],
    'basecodec': ['base64', 'hexview', 'bintext'],
    'bintext': ['basecodec', 'ascii', 'morse'],
    'ascii': ['bintext', 'basecodec', 'hexview'],
    'pack': ['compress', 'pdf-matrix', 'list'],
    'list': ['pack', 'newlines', 'clean'],

    // Math & Science
    'calc': ['matrix', 'percent', 'aspect'],
    'matrix': ['calc', 'percent', 'aspect'],
    'percent': ['calc', 'matrix', 'fx'],
    'aspect': ['calc', 'screen', 'crop'],
    'roman': ['calc', 'rand', 'base'],
    'rand': ['uuid', 'pass-gen', 'calc'],
    'units': ['calc', 'fx', 'matrix'],
    'base': ['calc', 'bintext', 'hexview'],
    'fx': ['calc', 'percent', 'units'],
    'easing': ['draw', 'tone', 'screen'],
    'clock': ['epoch', 'cron', 'speed'],
    'epoch': ['clock', 'cron', 'diff'],

    // System & Hardware
    'device': ['battery', 'screen', 'speed'],
    'battery': ['device', 'screen', 'storage'],
    'screen': ['device', 'aspect', 'screen-cap'],
    'keys': ['screen', 'tone', 'device'],
    'chmod': ['doc', 'clean', 'device'],
    'storage': ['device', 'battery', 'cookie'],
    'ua': ['device', 'headers', 'screen'],
    'tone': ['mic', 'audio-trim', 'morse'],
    'flexgrid': ['clippath', 'draw', 'glass'],
    'glass': ['shadow', 'palette', 'flexgrid'],
    'shadow': ['glass', 'palette', 'draw'],
    'meta': ['robots', 'headers', 'schema']
  };

  const TOOL_NAMES = {
    'exif-strip': 'EXIF & Geo Purge',
    'watermark-img': 'Watermark Studio',
    'watermark-video': 'Video Watermark',
    'screen-cap': 'Display Stream',
    'audio-trim': 'Sonic Slice',
    'svg-clean': 'Vector Optimizer',
    'svg': 'SVG Canvas',
    'compress': 'Image Compressor',
    'b64img': 'Base64 Image Hub',
    'imgpalette': 'Image Palette Extractor',
    'palette': 'Palette Synth',
    'draw': 'Cyber Draw Canvas',
    'favicon': 'Favicon Generator',
    'camera': 'Optic Stream',
    'mic': 'Decibel Spectrum',
    'clippath': 'Clip-Path Maker',
    'qr': 'QR Code Matrix',
    'jwt': 'JWT Radar',
    'curl-convert': 'cURL Synth',
    'curl': 'cURL Builder',
    'cron': 'Cron Matrix',
    'regex': 'Regex Scanner',
    'regexclean': 'Regex Shield',
    'json': 'JSON Formatter',
    'jsondiff': 'JSON Diff Matrix',
    'schema': 'Schema Generator',
    'sql': 'SQL Formatter',
    'minify': 'Code Minifier',
    'token': 'Token Generator',
    'doc': 'Document Studio',
    'table': 'Markdown Table',
    'xml': 'XML Formatter',
    'yaml': 'YAML Converter',
    'slug': 'Slug Generator',
    'unescape': 'String Unescape',
    'pass-gen': 'Cipher Vault',
    'pass': 'Entropy Vault',
    'checksum': 'Hash Verifier',
    'hash': 'Crypto Hash',
    'bcrypt': 'Bcrypt Generator',
    'tempmail': 'Temp Mail Radar',
    'webhook': 'Webhook Dispatcher',
    'cert': 'SSL Cert Inspector',
    'caesar': 'Caesar Cipher',
    'morse': 'Morse Code Matrix',
    'uuid': 'UUID Generator',
    'redact': 'Data Redactor',
    'robots': 'Robots.txt Generator',
    'hexview': 'Hex Viewer',
    'cidr': 'Net Mask CIDR',
    'subnet': 'IPv4 Subnet',
    'ip': 'IP Recon',
    'whoisip': 'WHOIS IP Radar',
    'dns': 'DNS Lookup',
    'ports': 'Port Scanner',
    'headers': 'HTTP Headers',
    'httpcode': 'HTTP Status Radar',
    'short': 'Link Compactor',
    'url': 'URL Encoder',
    'speed': 'Bandwidth Speed',
    'network': 'Network Telemetry',
    'pdf-matrix': 'PDF Matrix',
    'diff': 'Text Diff Matrix',
    'markdown': 'Markdown Preview',
    'clean': 'Text Cleaner',
    'newlines': 'Newline Normalizer',
    'textstat': 'Text Statistics',
    'lorem': 'Lorem Generator',
    'csv': 'CSV / JSON Matrix',
    'invoice': 'Tactical Invoice',
    'base64': 'Base64 Codec',
    'basecodec': 'Multi-Base Codec',
    'bintext': 'Binary Text',
    'ascii': 'ASCII Art Table',
    'pack': 'Data Packer',
    'list': 'List Sorter',
    'calc': 'Cyber Calculator',
    'matrix': 'Matrix Operator',
    'percent': 'Percentage Calc',
    'aspect': 'Aspect Ratio Matrix',
    'roman': 'Roman Numerals',
    'rand': 'Random Generator',
    'units': 'Unit Converter',
    'base': 'Radix Base Converter',
    'fx': 'FX Rate Matrix',
    'easing': 'Easing Visualizer',
    'clock': 'Atomic HUD Clock',
    'epoch': 'Epoch Converter',
    'device': 'Device Telemetry',
    'battery': 'Battery Telemetry',
    'screen': 'Display Matrix',
    'keys': 'Keycode Radar',
    'chmod': 'Chmod Calculator',
    'storage': 'Storage HUD',
    'ua': 'User-Agent Inspector',
    'tone': 'Audio Tone Generator',
    'flexgrid': 'Flexbox & Grid',
    'glass': 'Glassmorphism Studio',
    'shadow': 'Box Shadow Studio',
    'meta': 'Meta Tags Generator'
  };

  // Determine current active tool slug
  const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
  const activeSlug = currentPath.split('/')[0] || '';
  const isHomepage = !activeSlug || activeSlug === 'index.html';

  // 2. Recent Activity Logger (Skip on root index)
  if (!isHomepage && activeSlug) {
    try {
      const STORAGE_KEY = 'sarwarfx_recent_tools';
      let recents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const currentName = TOOL_NAMES[activeSlug] || document.title.split('//')[0].trim() || activeSlug;
      // Remove existing occurrence
      recents = recents.filter(item => item.slug !== activeSlug);
      // Prepend current
      recents.unshift({
        slug: activeSlug,
        name: currentName,
        url: `/${activeSlug}/`,
        time: Date.now()
      });
      // Cap at 5
      if (recents.length > 5) recents = recents.slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recents));
    } catch (e) {
      console.warn('Recent activity logger skipped:', e);
    }
  }

  // 3. Service Worker Auto-Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        // Registered
      }).catch((err) => {
        console.warn('SW registration failed:', err);
      });
    });
  }

  // If on homepage, skip mounting the in-app side rail and ribbon
  if (isHomepage) return;

  // 4. Inject Shared Relay CSS Styles
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* Workflow Chain Ribbon */
    .workflow-chain {
      background: linear-gradient(135deg, rgba(9, 13, 22, 0.95), rgba(5, 7, 13, 0.98));
      border: 1px solid rgba(0, 245, 255, 0.25);
      box-shadow: 0 0 20px rgba(0, 245, 255, 0.05);
      border-radius: 8px;
      padding: 1rem 1.25rem;
      margin: 2rem 0;
      font-family: 'Rajdhani', sans-serif;
    }
    .workflow-chain-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 245, 255, 0.15);
      padding-bottom: 0.5rem;
      margin-bottom: 0.75rem;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      color: #00f5ff;
      letter-spacing: 0.05em;
    }
    .workflow-chain-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
      align-items: center;
    }
    .workflow-step {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      border: 1px solid #1e293b;
      background: rgba(15, 23, 42, 0.6);
      text-decoration: none;
      color: #cbd5e1;
      transition: all 0.2s ease;
    }
    .workflow-step:hover {
      border-color: #00f5ff;
      background: rgba(0, 245, 255, 0.08);
      color: #ffffff;
      transform: translateY(-1px);
    }
    .workflow-step.active {
      border-color: #ff2bd6;
      background: rgba(255, 43, 214, 0.1);
      color: #ff2bd6;
    }

    /* Floating Tactical Side Rail */
    .tactical-rail {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: 50;
      display: flex;
      font-family: 'Rajdhani', sans-serif;
    }
    .tactical-rail-tab {
      width: 44px;
      background: rgba(5, 7, 13, 0.95);
      border: 1px solid #00f5ff;
      border-right: none;
      border-radius: 8px 0 0 8px;
      padding: 1rem 0.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: -4px 0 15px rgba(0, 245, 255, 0.2);
      transition: all 0.2s ease;
    }
    .tactical-rail-tab:hover {
      background: rgba(0, 245, 255, 0.15);
      box-shadow: -4px 0 20px rgba(0, 245, 255, 0.4);
    }
    .tactical-rail-tab span {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #00f5ff;
      margin-top: 0.5rem;
    }
    .tactical-rail-panel {
      width: 280px;
      max-width: 85vw;
      background: #090d16;
      border: 1px solid rgba(0, 245, 255, 0.3);
      border-right: none;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
      padding: 1.25rem;
      display: none;
      flex-direction: column;
      gap: 1rem;
      backdrop-blur: 8px;
    }
    .tactical-rail.expanded .tactical-rail-panel {
      display: flex;
    }

    @media (max-width: 768px) {
      .tactical-rail {
        display: none !important; /* Non-intrusive on mobile screens */
      }
    }
  `;
  document.head.appendChild(styleEl);

  // 5. Build Workflow Ribbon DOM
  const relatedSlugs = WORKFLOW_CHAINS[activeSlug] || ['pass-gen', 'checksum', 'regex'];
  const chainEl = document.createElement('nav');
  chainEl.className = 'workflow-chain';
  chainEl.setAttribute('aria-label', 'Recommended Tactical Workflows');

  const currentToolTitle = TOOL_NAMES[activeSlug] || activeSlug.toUpperCase();
  const step2Title = TOOL_NAMES[relatedSlugs[0]] || relatedSlugs[0].toUpperCase();
  const step3Title = TOOL_NAMES[relatedSlugs[1]] || relatedSlugs[1].toUpperCase();

  chainEl.innerHTML = `
    <div class="workflow-chain-header">
      <div class="flex items-center space-x-2">
        <i class="fa-solid fa-route"></i>
        <span>WORKFLOW CONTINUUM // NEXT RECOMMENDED STEPS</span>
      </div>
      <span class="text-[10px] font-mono text-cyan-400">CHAIN 3-STEP</span>
    </div>
    <div class="workflow-chain-grid">
      <div class="workflow-step active">
        <div class="flex items-center space-x-2">
          <span class="w-5 h-5 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center text-[10px] font-mono font-bold">1</span>
          <span class="text-xs font-mono font-bold truncate">${currentToolTitle}</span>
        </div>
        <span class="text-[10px] font-mono opacity-80">(ACTIVE)</span>
      </div>

      <a href="/${relatedSlugs[0]}/" class="workflow-step">
        <div class="flex items-center space-x-2">
          <span class="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-300">2</span>
          <span class="text-xs font-mono truncate">${step2Title}</span>
        </div>
        <span class="text-xs font-mono text-cyan-400">&rarr;</span>
      </a>

      <a href="/${relatedSlugs[1]}/" class="workflow-step">
        <div class="flex items-center space-x-2">
          <span class="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-300">3</span>
          <span class="text-xs font-mono truncate">${step3Title}</span>
        </div>
        <span class="text-xs font-mono text-cyan-400">&rarr;</span>
      </a>
    </div>
  `;

  // Insert Ribbon: before <article> or before <footer>
  const articleEl = document.querySelector('article');
  const footerEl = document.querySelector('footer');
  if (articleEl) {
    articleEl.parentNode.insertBefore(chainEl, articleEl);
  } else if (footerEl) {
    footerEl.parentNode.insertBefore(chainEl, footerEl);
  } else {
    document.body.appendChild(chainEl);
  }

  // 6. Build Floating Tactical Side Rail Dock
  const railEl = document.createElement('aside');
  railEl.className = 'tactical-rail';
  railEl.innerHTML = `
    <div class="tactical-rail-tab" onclick="this.parentElement.classList.toggle('expanded')" title="Toggle Relay Nodes Dock">
      <i class="fa-solid fa-network-wired text-xs text-cyan-400"></i>
      <span>RELAY NODES</span>
    </div>
    <div class="tactical-rail-panel">
      <div class="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <span class="font-orbitron font-bold text-xs text-cyan-400 flex items-center gap-1.5">
          <i class="fa-solid fa-satellite-dish"></i> RELAY DOCK
        </span>
        <button onclick="this.closest('.tactical-rail').classList.remove('expanded')" class="text-slate-500 hover:text-white text-xs">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Contextual Related Nodes -->
      <div class="space-y-2">
        <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">RELATED NODES</span>
        ${relatedSlugs.slice(0, 3).map(slug => `
          <a href="/${slug}/" class="p-2 rounded border border-slate-800 bg-slate-950/80 hover:border-cyan-400 flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white transition-all">
            <span class="truncate">${TOOL_NAMES[slug] || slug}</span>
            <span class="text-cyan-400 text-[11px]">&rarr;</span>
          </a>
        `).join('')}
      </div>

      <!-- Daily Spotlight Node -->
      <div class="p-2.5 rounded border border-pink-500/30 bg-pink-950/20 space-y-1">
        <div class="flex items-center justify-between text-[10px] font-mono text-pink-400 font-bold">
          <span>DAILY SPOTLIGHT</span>
          <i class="fa-solid fa-bolt"></i>
        </div>
        <div class="font-orbitron text-xs font-bold text-white">SCREEN CAPTURE // 60 FPS</div>
        <div class="text-[11px] font-mono text-slate-400">Record screens, tabs, and mics in WebM.</div>
        <a href="/screen-cap/" class="inline-block mt-1 text-[10px] font-mono text-pink-400 font-bold hover:underline">LAUNCH NODE &rarr;</a>
      </div>

      <!-- Link to All 100 Apps -->
      <a href="/" class="p-2.5 rounded bg-cyan-950/60 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-900/60 text-center font-orbitron font-bold text-xs flex items-center justify-center space-x-2 transition-all">
        <i class="fa-solid fa-table-cells-large"></i>
        <span>COMMAND CENTER (100)</span>
      </a>
    </div>
  `;
  document.body.appendChild(railEl);

  // Close rail on click outside
  document.addEventListener('click', (e) => {
    if (!railEl.contains(e.target) && railEl.classList.contains('expanded')) {
      railEl.classList.remove('expanded');
    }
  });

})();
