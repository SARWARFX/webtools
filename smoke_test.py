import os
import re
import sys
import subprocess

def test_apps():
    print("=== CYBERTOOLS BATCH 15 SMOKE TEST SUITE ===")
    errors = []

    apps = {
        'jwt': {
            'required_ids': [
                'jwtInput', 'headerJson', 'payloadJson', 'signatureRaw',
                'secretKeyInput', 'sigVerifyBadge', 'expiryStatusBadge',
                'expDateDisplay', 'suiteModal'
            ],
            'required_terms': [
                'subtle', 'HMAC', 'sign', 'importKey', 'SHA-256', '346689d4f4b0498393005cfe06ff2f5b'
            ]
        },
        'cron': {
            'required_ids': [
                'cronInput', 'cronFormatBadge', 'englishTranslation',
                'immediateNextRunText', 'immediateDeltaBadge', 'tzIndicator',
                'executionFeed', 'suiteModal'
            ],
            'required_terms': [
                'UTC', 'minute', 'hour', '346689d4f4b0498393005cfe06ff2f5b'
            ]
        },
        'curl-convert': {
            'required_ids': [
                'curlInput', 'outputCode', 'tabFetch', 'tabAxios',
                'tabPython', 'tabGo', 'tabPhp', 'parsedMethodBadge',
                'outputLinesBadge', 'suiteModal'
            ],
            'required_terms': [
                'requests', 'fetch', 'axios', 'http.NewRequest', 'curl_setopt',
                '346689d4f4b0498393005cfe06ff2f5b'
            ]
        },
        'cidr': {
            'required_ids': [
                'ipInput', 'cidrNumInput', 'cidrSlider', 'sliderValueBadge',
                'octetVisualizerGrid', 'resNetIp', 'resBroadcastIp', 'resSubnetMask',
                'resWildcardMask', 'resUsableRange', 'resUsableHosts', 'resScope', 'suiteModal'
            ],
            'required_terms': [
                'RFC 1918', 'wildcard', 'prefix', '346689d4f4b0498393005cfe06ff2f5b'
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
    print("[PASS] sitemap.xml contains all 4 Batch 15 URLs.")

    # 4. Test index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
    for app_name in apps.keys():
        if f"id: '{app_name}'" not in index_html:
            errors.append(f"[index.html] Missing tool registration: {app_name}")
    if "94 ACTIVE UTILITY NODES" not in index_html:
        errors.append("[index.html] Missing 94 active utility nodes badge")
    print("[PASS] index.html registered all Batch 15 tools and displays 94 nodes.")

    if errors:
        print("\n=== SMOKE TEST FAILED ===")
        for e in errors:
            print(f"- {e}")
        sys.exit(1)
    else:
        print("\n=== ALL SMOKE CHECKS PASSED (0 ERRORS) ===")

if __name__ == "__main__":
    test_apps()
