import os
import glob
import re

def audit_html_file(file_path):
    issues = []
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    rel_dir = os.path.dirname(file_path).replace("\\", "/")
    expected_url = "https://apps.sarwarfx.cfd/" if rel_dir in ("", ".") else f"https://apps.sarwarfx.cfd/{rel_dir.strip('/')}/"

    # Title check
    title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
    if not title_match or not title_match.group(1).strip():
        issues.append("MISSING_TITLE")

    # Meta description check
    desc_match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', content, re.IGNORECASE) or \
                 re.search(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']', content, re.IGNORECASE)
    if not desc_match or not desc_match.group(1).strip():
        issues.append("MISSING_DESCRIPTION")

    # Canonical check
    canon_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', content, re.IGNORECASE)
    if not canon_match:
        issues.append("MISSING_CANONICAL")
    elif canon_match.group(1).strip() != expected_url:
        issues.append(f"MISMATCHED_CANONICAL:{expected_url}")

    # Schema check
    if 'application/ld+json' not in content:
        issues.append("MISSING_SCHEMA")

    # Cloudflare Web Analytics beacon check
    token = "346689d4f4b0498393005cfe06ff2f5b"
    if token not in content:
        issues.append("MISSING_CF_TOKEN")
    if "type='module'" in content and "beacon.min.js" in content:
        issues.append("FIX_BEACON_DEFER")

    # Hidden article anti-pattern check
    if re.search(r'<article[^>]+style=["\'][^"\']*display\s*:\s*none', content, re.IGNORECASE):
        issues.append("HIDDEN_ARTICLE_DISPLAY_NONE")

    return issues

def main():
    files = sorted(glob.glob("*/index.html") + glob.glob("index.html"))
    failed_files = {}
    for path in files:
        issues = audit_html_file(path)
        if issues:
            failed_files[path] = issues
            print(f"[FAIL] {path} -> {', '.join(issues)}")
        else:
            print(f"[PASS] {path}")

    print(f"\nTotal: {len(files)} | Passed: {len(files) - len(failed_files)} | Failed: {len(failed_files)}")
    return failed_files

if __name__ == "__main__":
    main()
