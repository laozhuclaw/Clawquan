#!/usr/bin/env bash
set -euo pipefail

# Publish the exported ClawQuan/AICN frontend under the nested Aliyun path:
#   http://47.102.216.22/aicn/suzhou/
#
# Run on the server after `npm run build` has produced /opt/clawquan/web/dist.
# Usage:
#   scripts/deploy-aicn-suzhou-static.sh
#   scripts/deploy-aicn-suzhou-static.sh /opt/clawquan/web/dist /var/www/html/aicn/suzhou

SRC="${1:-/opt/clawquan/web/dist}"
TARGET="${2:-/var/www/html/aicn/suzhou}"
OWNER="${OWNER:-aicn:aicn}"

if [[ ! -d "${SRC}" ]]; then
  echo "Source dist directory does not exist: ${SRC}" >&2
  exit 1
fi

mkdir -p "${TARGET}"
rsync -a --delete "${SRC}/" "${TARGET}/"

python3 - "${TARGET}" <<'PY'
from pathlib import Path
import sys

root = Path(sys.argv[1])
text_suffixes = {'.html', '.txt', '.js', '.css', '.json', '.svg', '.map', '.xml', '.webmanifest'}
routes = [
    'organizations', 'agents', 'opportunities', 'community', 'login', 'register', 'me',
    'dashboard', 'profile', 'settings', 'admin', 'auth', 'forgot-password', 'reset-password',
    'agent', 'organization'
]
assets = [
    'logo-color.png', 'logo-nav.png', 'logo.jpg', 'favicon.ico', 'apple-touch-icon.png',
    'icon.png', 'manifest.json', 'site.webmanifest', 'robots.txt'
]
repls = []
for q in ['"', "'"]:
    repls.extend([
        (q + '/_next/', q + '/aicn/suzhou/_next/'),
        (q + '/api/', q + '/aicn/suzhou/api/'),
        (q + '/demo-images/', q + '/aicn/suzhou/demo-images/'),
        ('\\' + q + '/_next/', '\\' + q + '/aicn/suzhou/_next/'),
        ('\\' + q + '/api/', '\\' + q + '/aicn/suzhou/api/'),
        ('\\' + q + '/demo-images/', '\\' + q + '/aicn/suzhou/demo-images/'),
        (f'href:{q}/{q}', f'href:{q}/aicn/suzhou/{q}'),
        (f'"href":{q}/{q}', f'"href":{q}/aicn/suzhou/{q}'),
        (f'\\{q}href\\{q}:\\{q}/\\{q}', f'\\{q}href\\{q}:\\{q}/aicn/suzhou/\\{q}'),
        (f'push({q}/{q})', f'push({q}/aicn/suzhou/{q})'),
        (f'replace({q}/{q})', f'replace({q}/aicn/suzhou/{q})'),
        (f'assign({q}/{q})', f'assign({q}/aicn/suzhou/{q})'),
    ])
for attr in ['href', 'src', 'action']:
    repls.append((f'{attr}="/"', f'{attr}="/aicn/suzhou/"'))
    for route in routes:
        repls.append((f'{attr}="/{route}', f'{attr}="/aicn/suzhou/{route}'))
    for asset in assets:
        repls.append((f'{attr}="/{asset}', f'{attr}="/aicn/suzhou/{asset}'))
for route in routes:
    repls.extend([
        (f'"/{route}"', f'"/aicn/suzhou/{route}"'),
        (f"'/{route}'", f"'/aicn/suzhou/{route}'"),
        (f'`/{route}`', f'`/aicn/suzhou/{route}`'),
        (f'\\"/{route}\\"', f'\\"/aicn/suzhou/{route}\\"'),
        (f"\\'/{route}\\'", f"\\'/aicn/suzhou/{route}\\'"),
        (f'"/{route}#', f'"/aicn/suzhou/{route}#'),
        (f"'/{route}#", f"'/aicn/suzhou/{route}#"),
        (f'`/{route}#', f'`/aicn/suzhou/{route}#'),
        (f'\\"/{route}#', f'\\"/aicn/suzhou/{route}#'),
        (f"\\'/{route}#", f"\\'/aicn/suzhou/{route}#"),
        (f'"/{route}?', f'"/aicn/suzhou/{route}?'),
        (f"'/{route}?", f"'/aicn/suzhou/{route}?"),
        (f'`/{route}?', f'`/aicn/suzhou/{route}?'),
        (f'\\"/{route}?', f'\\"/aicn/suzhou/{route}?'),
        (f"\\'/{route}?", f"\\'/aicn/suzhou/{route}?"),
        (f'"/{route}/', f'"/aicn/suzhou/{route}/'),
        (f"'/{route}/", f"'/aicn/suzhou/{route}/"),
        (f'\\"/{route}/', f'\\"/aicn/suzhou/{route}/'),
        (f"\\'/{route}/", f"\\'/aicn/suzhou/{route}/"),
    ])
for asset in assets:
    repls.extend([
        (f'"/{asset}"', f'"/aicn/suzhou/{asset}"'),
        (f"'/{asset}'", f"'/aicn/suzhou/{asset}'"),
        (f'\\"/{asset}\\"', f'\\"/aicn/suzhou/{asset}\\"'),
        (f"\\'/{asset}\\'", f"\\'/aicn/suzhou/{asset}\\'"),
        (f'url(/{asset}', f'url(/aicn/suzhou/{asset}'),
        (f'url("/{asset}', f'url("/aicn/suzhou/{asset}'),
        (f"url('/{asset}", f"url('/aicn/suzhou/{asset}"),
    ])
repls.extend([
    ('href="/"', 'href="/aicn/suzhou/"'),
    ("href='/'", "href='/aicn/suzhou/'"),
    ('window.location.href="/"', 'window.location.href="/aicn/suzhou/"'),
    ("window.location.href='/'", "window.location.href='/aicn/suzhou/'"),
])

changed = []
for path in root.rglob('*'):
    if not path.is_file() or path.suffix not in text_suffixes:
        continue
    try:
        data = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    new = data
    for old, repl in repls:
        new = new.replace(old, repl)
    if new != data:
        path.write_text(new, encoding='utf-8')
        changed.append(str(path.relative_to(root)))

print(f'rewritten_files={len(changed)}')
PY

if [[ "$(id -u)" == "0" ]]; then
  chown -R "${OWNER}" "${TARGET}"
fi

printf 'Deployed nested static site: http://47.102.216.22/aicn/suzhou/\n'
