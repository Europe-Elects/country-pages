"""Reads the Google Sheets the country pages and the home page need, and writes them as files
that are published with the site (sheets/<name>.csv / .json). Visitors only ever get these files:
the page code contains no Sheet links, and the Sheets themselves can stay private.

Usage: python3 scripts/fetch_sheets.py <output folder>
Environment:
  GOOGLE_TOKEN          short-lived token from google-github-actions/auth (keyless login)
  PARTY_DB_SHEET_ID, CALENDAR_SHEET_ID, PROJECTION_SHEET_ID, HEADLINE_SHEET_ID   (repository secrets)
Each Sheet must be shared with ee-sheets-reader@project-6c08a079-4a01-46eb-aaf.iam.gserviceaccount.com (Viewer).
"""
import csv, json, os, sys, time, urllib.error, urllib.parse, urllib.request

API = 'https://sheets.googleapis.com/v4/spreadsheets/'

# name, Sheet (secret name), tab (gid, or '#1' = first tab), format, fallback gid
TABS = [
    ('parties',    'PARTY_DB_SHEET_ID',   '0',         'csv',  None),
    ('alliances',  'PARTY_DB_SHEET_ID',   '860650586', 'csv',  None),
    ('government', 'PARTY_DB_SHEET_ID',   '124081312', 'csv',  None),
    ('seats',      'PARTY_DB_SHEET_ID',   '902537041', 'csv',  None),
    ('party-db',   'PARTY_DB_SHEET_ID',   '959052694', 'csv',  '0'),    # home page list
    ('calendar',   'CALENDAR_SHEET_ID',   '0',         'csv',  None),
    ('projection', 'PROJECTION_SHEET_ID', '0',         'csv',  None),   # country pages
    ('projection', 'PROJECTION_SHEET_ID', '#1',        'json', None),   # home page
    ('headline',   'HEADLINE_SHEET_ID',   '#1',        'json', None),   # home page
]

def get(url):
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + os.environ['GOOGLE_TOKEN']})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (400, 403, 404):
                raise RuntimeError(f'Sheets API {e.code} (is the Sheet shared with the service account?) {e.read()[:300]!r}')
            if attempt == 3: raise
        except urllib.error.URLError:
            if attempt == 3: raise
        time.sleep(5 * (attempt + 1))

_tabs = {}
def tab_title(sheet_id, tab):
    if sheet_id not in _tabs:
        meta = get(API + sheet_id + '?fields=sheets.properties(sheetId,title,index)')
        _tabs[sheet_id] = sorted((s['properties'] for s in meta['sheets']), key=lambda p: p.get('index', 0))
    props = _tabs[sheet_id]
    if tab.startswith('#'):
        return props[int(tab[1:]) - 1]['title']
    for p in props:
        if str(p['sheetId']) == tab:
            return p['title']
    raise RuntimeError(f'no tab with gid {tab}')

def rows_of(sheet_id, tab):
    rng = urllib.parse.quote("'" + tab_title(sheet_id, tab).replace("'", "''") + "'", safe='')
    return get(API + sheet_id + '/values/' + rng + '?valueRenderOption=FORMATTED_VALUE').get('values', [])

def write(out, name, fmt, rows):
    path = os.path.join(out, f'{name}.{fmt}')
    if fmt == 'csv':
        width = max((len(r) for r in rows), default=0)
        with open(path, 'w', newline='', encoding='utf-8') as f:
            csv.writer(f).writerows([r + [''] * (width - len(r)) for r in rows])
    else:  # same shape as opensheet.elk.sh: one object per row, keyed by the header row
        head = rows[0] if rows else []
        # projection: every column on every row (the month columns are read from the first row);
        # other tabs: empty trailing cells left out, exactly like opensheet.
        full = name == 'projection'
        objs = [{head[i]: (r[i] if i < len(r) else '') for i in range(len(head) if full else min(len(head), len(r))) if head[i]}
                for r in rows[1:] if any(str(c).strip() for c in r)]
        with open(path, 'w', encoding='utf-8') as f:
            json.dump([o for o in objs if o], f, ensure_ascii=False, separators=(',', ':'))
    print(f'{path}: {max(len(rows) - 1, 0)} rows')

def main(out):
    os.makedirs(out, exist_ok=True)
    failed = []
    for name, secret, tab, fmt, fallback in TABS:
        sheet_id = os.environ.get(secret, '').strip()
        if not sheet_id:
            failed.append(f'{name}: secret {secret} is missing'); continue
        try:
            try:
                rows = rows_of(sheet_id, tab)
            except RuntimeError:
                if not fallback: raise
                rows = rows_of(sheet_id, fallback)
            if len(rows) < 2:
                raise RuntimeError('tab is empty')
            write(out, name, fmt, rows)
        except Exception as e:
            failed.append(f'{name}.{fmt}: {e}')
    if failed:
        sys.exit('Could not read:\n  ' + '\n  '.join(failed))

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'site/sheets')
