"""Reads the French presidential polling-average Sheet for the fr-2027 special page and writes
fr-2027/averages.json. Every tab is copied as-is (header row + rows); the page draws the tabs whose
name starts with "R_" (one candidate scenario each, e.g. R_lepen_philippe) as polling-average charts.

Usage: python3 scripts/fetch_fr2027.py <output.json>
Environment:
  GOOGLE_TOKEN       short-lived token from google-github-actions/auth (keyless login)
  FR_PRES_SHEET_ID   repository secret: the polling-average Sheet
The Sheet must be shared with ee-sheets-reader@project-6c08a079-4a01-46eb-aaf.iam.gserviceaccount.com (Viewer).
"""
import datetime as dt
import json
import os
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fetch_sheets import API, get  # same keyless login and retry logic as the other Sheets


def main(dst):
    sheet_id = os.environ.get('FR_PRES_SHEET_ID', '').strip()
    if not sheet_id:
        print('FR_PRES_SHEET_ID not set; fr-2027 averages not built.')
        return
    meta = get(API + sheet_id + '?fields=sheets.properties(sheetId,title,index)')
    tabs = sorted((s['properties'] for s in meta['sheets']), key=lambda p: p.get('index', 0))
    out = []
    for p in tabs:
        rng = urllib.parse.quote("'" + p['title'].replace("'", "''") + "'", safe='')
        rows = get(API + sheet_id + '/values/' + rng + '?valueRenderOption=UNFORMATTED_VALUE'
                   '&dateTimeRenderOption=FORMATTED_STRING').get('values', [])
        out.append({'tab': p['title'], 'rows': rows})
        print(f"fr-2027 tab {p['title']}: {max(len(rows) - 1, 0)} rows")
    os.makedirs(os.path.dirname(dst) or '.', exist_ok=True)
    with open(dst, 'w', encoding='utf-8') as fh:
        json.dump({'updated': dt.date.today().isoformat(), 'tabs': out}, fh, ensure_ascii=False, separators=(',', ':'))


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'fr-2027/averages.json')
