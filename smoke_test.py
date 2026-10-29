import os
import re
import sys
import subprocess

def test_apps():
    print("=== CYBERTOOLS BATCH 14 SMOKE TEST SUITE ===")
    errors = []

    apps = {
        'watermark-video': {
            'required_ids': [
                'hwCores', 'hwMemory', 'hwCodec', 'queueSlotsText', 'pipelineStatusText',
                'fileInput', 'videoDropzone', 'deckTextConfig', 'deckBadgeConfig', 'deckLogoConfig',
                'previewCanvas', 'previewVideo', 'videoScrubber', 'btnPlayPause',
                'btnBatchRender', 'btnAbort', 'queueContainer', 'suiteModal'
            ],
            'required_terms': [
                'hardwareConcurrency', 'captureStream', 'MediaRecorder',
                '120', 'revokeObjectURL', '346689d4f4b0498393005cfe06ff2f5b'
            ]
        },
        'exif-strip': {
            'required_ids': [
                'statIngested', 'statGpsCount', 'statDevicesPurged', 'exifDropzone',
                'fileInput', 'gpsAlertBanner', 'gpsCoordsList', 'auditTableBody',
                'btnZipExport', 'suiteModal'
            ],
            'required_terms': [
                'jszip', '0xFFE1', '0x8825', 'toBlob', '346689d4f4b0498393005cfe06ff2f5b'
            ]
        },
        'pdf-matrix': {
            'required_ids': [
                'tabMerge', 'tabSplit', 'pdfDropzone', 'pdfFileInput',
                'mergeWorkspace', 'splitWorkspace', 'mergeList', 'pagesGrid',
                'pageRangeInput', 'btnCompile', 'suiteModal'
            ],
            'required_terms': [
                'pdf-lib', 'PDFDocument', 'copyPages', '346689d4f4b0498393005cfe06ff2f5b'
            ]
        },
        'svg-clean': {
            'required_ids': [
                'rawSvgInput', 'cleanSvgOutput', 'optComments', 'optDoctype',
                'optNamespaces', 'optHidden', 'optDecimals', 'optCollapse',
                'beforeSvgContainer', 'afterSvgContainer', 'statOrigSize',
                'statOptSize', 'statSavings', 'suiteModal'
            ],
            'required_terms': [
                'DOMParser', 'XMLSerializer', '346689d4f4b0498393005cfe06ff2f5b'
            ]
        }
    }

    # 1. Test each app HTML & DOM IDs
    for app_name, spec in apps.items():
        file_path = os.path.join(app_name, 'index.html')
        if not os.path.exists(file_path):
            errors.append(f"Missing file: {file_path}")
            continue

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for elem_id in spec['required_ids']:
            if f'id="{elem_id}"' not in content:
                errors.append(f"[{app_name}] Missing DOM ID: {elem_id}")

        for term in spec['required_terms']:
            if term.lower() not in content.lower():
                errors.append(f"[{app_name}] Missing required capability / signature: {term}")

        # Check canonical
        expected_canonical = f"https://apps.sarwarfx.cfd/{app_name}/"
        if expected_canonical not in content:
            errors.append(f"[{app_name}] Missing canonical: {expected_canonical}")

        # Check LD+JSON
        if 'application/ld+json' not in content:
            errors.append(f"[{app_name}] Missing application/ld+json")

        print(f"[PASS] {app_name} DOM and architecture verified.")

    # 2. Test Node.js Script Syntax for all 4 apps
    for app_name in apps.keys():
        file_path = f"{app_name}/index.html"
        cmd = [
            'node', '-e',
            f"""
            const fs = require('fs');
            const html = fs.readFileSync('{file_path}', 'utf8');
            const scriptMatches = [...html.matchAll(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi)];
            scriptMatches.forEach((m, idx) => {{
              const attrs = m[1];
              const body = m[2];
              if (attrs.includes('application/ld+json')) {{
                JSON.parse(body);
              }} else if (!attrs.includes('src=')) {{
                new Function(body);
              }}
            }});
            """
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            errors.append(f"[{app_name}] JS syntax error: {res.stderr}")
        else:
            print(f"[PASS] {app_name} JavaScript and JSON-LD syntax validated.")

    # 3. Test sitemap.xml
    with open('sitemap.xml', 'r', encoding='utf-8') as f:
        sitemap = f.read()
    for app_name in apps.keys():
        url = f"https://apps.sarwarfx.cfd/{app_name}/"
        if url not in sitemap:
            errors.append(f"[sitemap.xml] Missing URL: {url}")
    print("[PASS] sitemap.xml contains all 4 Batch 14 URLs.")

    # 4. Test index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
    for app_name in apps.keys():
        if f"id: '{app_name}'" not in index_html:
            errors.append(f"[index.html] Missing tool registration: {app_name}")
    if "92 ACTIVE UTILITY NODES" not in index_html:
        errors.append("[index.html] Missing 92 active utility nodes badge")
    print("[PASS] index.html registered all 4 tools and displays 92 nodes.")

    if errors:
        print("\n=== SMOKE TEST FAILED ===")
        for e in errors:
            print(f"- {e}")
        sys.exit(1)
    else:
        print("\n=== ALL SMOKE CHECKS PASSED (0 ERRORS) ===")

if __name__ == "__main__":
    test_apps()
