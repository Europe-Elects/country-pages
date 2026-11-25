#!/usr/bin/env python3
"""
Pollster ratings: how close each pollster's final poll came to the official result of past elections.

Input
  * apopod/<iso>.ropf            national-parliament polls (•SC: N, first such row of each poll), as for the
                                 polling averages. Polls for one area (•A, e.g. GBN = Great Britain) are
                                 compared with results rows for that area.
  * "Results" tab of the ratings Sheet, filled in by the team, one row per party:
        ISO-2 | Country | Area | Party (as given) | Europe Elects Entity ID | 2023-07-23 | 2019-11-10 | ...
    Area is left blank for national results; otherwise it is the poll file's area code (•A).
    Each date column is one election (election day) holding the official vote shares in %.
    A party is matched to the poll file by its Entity ID (•EE / •ID in the .ropf header), or else
    by "Party (as given)" = the poll file's key or abbreviation (•A).

Rules
  * Per election and pollster, only the pollster's LAST poll with fieldwork ending 1-30 days before
    election day counts. Pollsters without such a poll are left out of that election.
  * The poll is scaled to 100 % across its listed parties plus "others" (as for the polling averages).
  * Error = mean absolute difference (percentage points) between poll and result, over the parties
    that are both in the poll and in the results tab (at least 2).
  * A pollster's rating = the mean of its per-election errors. Lower is better.

Output (written to the ratings Sheet, replacing the tabs' contents)
  * "Ratings": one row per pollster.
  * "Detail":  one row per pollster and election.

Usage
  python3 scripts/rate_pollsters.py <path-to-apopod>                       (Sheet via GOOGLE_TOKEN, RATINGS_SHEET_ID)
  python3 scripts/rate_pollsters.py <path-to-apopod> --results results.csv --out <dir>   (local test, CSV in/out)
"""
import csv, datetime as dt, json, os, re, sys, urllib.parse, urllib.request
from statistics import mean

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_polling import FIELD, RESULT, parse_date, NO_POLLING  # same ROPF reading as the averages

WINDOW_DAYS = 30
MIN_PARTIES = 2
API = 'https://sheets.googleapis.com/v4/spreadsheets/'


# ---------------------------------------------------------------- polls

def read_polls(text):
    """Like build_polling.parse_ropf, but keeps the fieldwork end date, commissioner and sample size."""
    polls, parties = [], {}
    head, head_fields, done = None, {}, True
    for line in text.splitlines():
        if not line.strip():
            continue
        body_src = None
        if line.startswith('&'):
            if head is None or done:
                continue
            own = {}
            for k, v in FIELD.findall(line):
                own.setdefault(k, v)
            fields = {k: v for k, v in head_fields.items() if k in ('FS', 'FE', 'A', 'SS')}
            fields.update(own)
            if 'O' not in own:
                fields.pop('O', None)
            line = head + ' ' + line[1:]
            body_src = line[len(head):]
        if line.startswith('•PF:'):
            if body_src is None:
                fields = {}
                for k, v in FIELD.findall(line):
                    fields.setdefault(k, v)
                head, head_fields, done = re.match(r'^(•PF:[^•]*(?:•C:[^•]*)*)', line).group(1), dict(fields), False
            m = re.search(r'•PF:\s*(.*?)\s*(?=•|$)', line); pf = m.group(1) if m else ''
            m = re.search(r'•C:\s*(.*?)\s*(?=•|$)', line); com = m.group(1) if m else ''
            if fields.get('SC', 'N') != 'N':
                continue
            fe_s = fields.get('FE', '') or fields.get('FS', '')
            if len(fe_s.split('-')) != 3:
                continue  # month-only fieldwork: the 30-day rule can't be checked
            fe = parse_date(fe_s)
            if not fe:
                continue
            body = re.sub(r'•(PF|C):\s*[^•]*', ' ', body_src if body_src is not None else line)
            body = re.sub(r'•[A-Z]+:\s*\S+', ' ', body)
            values = {}
            for key, val in RESULT.findall(body):
                val = val.replace(',', '.')
                values[key] = float(val.strip('<>')) / (2 if val.startswith('<') else 1)
            if not values:
                continue
            def num(x):
                try: return float(str(x).replace(',', '.'))
                except (TypeError, ValueError): return None
            total = sum(values.values()) + max(num(fields.get('O')) or 0.0, 0.0)
            if total > 0:
                values = {k: v * 100 / total for k, v in values.items()}
            ss = num(fields.get('SS'))
            polls.append({'fe': fe, 'pf': pf, 'c': com, 'a': fields.get('A', ''), 'v': values, 'n': int(ss) if ss else None})
            done = True
        else:
            m = re.match(r'^(\S+):\s+(\S+)\s+(.*)$', line)
            if m and '•A:' in line:
                attrs = {k: v.strip() for k, v in re.findall(r'•([A-Z]+):\s*(.*?)\s*(?=•|$)', m.group(3))}
                parties[m.group(1)] = {'id': attrs.get('EE') or attrs.get('ID', ''), 'abbr': attrs.get('A', m.group(1))}
    return polls, parties


# ---------------------------------------------------------------- results tab

def sheet_get(url):
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + os.environ['GOOGLE_TOKEN']})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def sheet_send(url, body, method='POST'):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method=method, headers={
        'Authorization': 'Bearer ' + os.environ['GOOGLE_TOKEN'], 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def election_date(h):
    """Header cell -> election day. Accepts a sheet date (serial number), 2023-07-23, 23.07.2023 or 23/07/2023."""
    if isinstance(h, (int, float)) and 20000 < h < 80000:
        return dt.date(1899, 12, 30) + dt.timedelta(days=int(h))
    s = str(h).strip()
    for fmt in ('%Y-%m-%d', '%d.%m.%Y', '%d/%m/%Y'):
        try:
            return dt.datetime.strptime(s, fmt).date()
        except ValueError:
            pass
    return None


def read_results(rows):
    """Rows of the results tab -> {(ISO, area, election day): [{'id','name','pct'}]}
    Area is blank for national results, or the poll file's area code (•A, e.g. GBN = Great Britain)."""
    head = rows[0]
    col = {str(h).strip(): i for i, h in enumerate(head)}
    def cell(r, name):
        i = col.get(name)
        return r[i] if i is not None and i < len(r) else ''
    dates = {i: election_date(h) for i, h in enumerate(head)}
    dates = {i: d for i, d in dates.items() if d}
    out = {}
    for r in rows[1:]:
        iso = str(cell(r, 'ISO-2')).strip().upper()
        if not iso:
            continue
        for i, d in dates.items():
            v = r[i] if i < len(r) else ''
            try:
                pct = float(str(v).replace('%', '').replace(',', '.'))
            except ValueError:
                continue
            area = str(cell(r, 'Area')).strip()
            out.setdefault((iso, area, d), []).append({'id': str(cell(r, 'Europe Elects Entity ID')).strip(),
                                                 'name': str(cell(r, 'Party (as given)')).strip(), 'pct': pct})
    for k, lst in out.items():  # cells formatted as % arrive as fractions (0.331)
        if sum(x['pct'] for x in lst) <= 1.5:
            for x in lst:
                x['pct'] *= 100
    return out


# ---------------------------------------------------------------- rating

def rate(apopod, results):
    detail, notes = [], []
    cache = {}
    for (iso, area, eday), res in sorted(results.items()):
        where = f'{iso}{"/" + area if area else ""} {eday}'
        if iso not in cache:
            path = os.path.join(apopod, iso.lower() + '.ropf')
            if not os.path.exists(path):
                cache[iso] = None
            else:
                with open(path, encoding='utf-8') as fh:
                    cache[iso] = read_polls(fh.read())
        if not cache[iso]:
            notes.append(f'{where}: no poll file {iso.lower()}.ropf'); continue
        polls, parties = cache[iso]
        # poll key -> result share
        by_id = {x['id']: x['pct'] for x in res if x['id']}
        by_name = {x['name'].casefold(): x['pct'] for x in res if x['name']}
        def result_for(key):
            p = parties.get(key, {})
            if p.get('id') and p['id'] in by_id:
                return by_id[p['id']]
            for n in (key, p.get('abbr', '')):
                if n and n.casefold() in by_name:
                    return by_name[n.casefold()]
            return None
        last = {}
        for p in polls:  # file order: the first of two polls with the same end date wins
            if p['a'] != area:
                continue
            days = (eday - p['fe']).days
            if 1 <= days <= WINDOW_DAYS and (p['pf'] not in last or p['fe'] > last[p['pf']]['fe']):
                last[p['pf']] = p
        if not last:
            notes.append(f'{where}: no poll in the {WINDOW_DAYS} days before the election'); continue
        unmatched = set()
        for pf, p in sorted(last.items()):
            pairs = []
            for key, v in p['v'].items():
                r = result_for(key)
                if r is None:
                    unmatched.add(key)
                else:
                    pairs.append((key, v, r))
            if len(pairs) < MIN_PARTIES:
                notes.append(f'{where} {pf}: fewer than {MIN_PARTIES} parties matched the results tab'); continue
            pairs.sort(key=lambda t: -t[2])
            err = mean(abs(v - r) for _, v, r in pairs)
            detail.append({'iso': iso, 'area': area, 'date': eday, 'pf': pf, 'c': p['c'], 'fe': p['fe'], 'days': (eday - p['fe']).days,
                           'n': p['n'], 'err': err, 'k': len(pairs),
                           'parties': ', '.join(f'{k} {v:.1f} ({r:.1f})' for k, v, r in pairs)})
        if unmatched:
            notes.append(f'{where}: poll parties without a results row (not compared): {", ".join(sorted(unmatched))}')
    ratings = {}
    for d in detail:
        ratings.setdefault(d['pf'], []).append(d)
    summary = sorted(({'pf': pf, 'k': len(ds), 'err': mean(d['err'] for d in ds),
                       'best': min(d['err'] for d in ds), 'worst': max(d['err'] for d in ds),
                       'countries': ', '.join(sorted({d['iso'] for d in ds})),
                       'last': max(d['date'] for d in ds)} for pf, ds in ratings.items()),
                     key=lambda s: (s['err'], -s['k']))
    return summary, detail, notes


def tables(summary, detail):
    r = [['Rank', 'Pollster', 'Elections rated', 'Average error (pts)', 'Best election', 'Worst election',
          'Countries', 'Latest election rated']]
    for i, s in enumerate(summary, 1):
        r.append([i, s['pf'], s['k'], round(s['err'], 2), round(s['best'], 2), round(s['worst'], 2), s['countries'], s['last'].isoformat()])
    d = [['ISO-2', 'Area', 'Election date', 'Pollster', 'Commissioner', 'Fieldwork end', 'Days before election',
          'Sample size', 'Parties compared', 'Average error (pts)', 'Poll (result) per party']]
    for x in sorted(detail, key=lambda x: (x['iso'], x['area'], x['date'], x['err'])):
        d.append([x['iso'], x['area'], x['date'].isoformat(), x['pf'], x['c'], x['fe'].isoformat(), x['days'],
                  x['n'] or '', x['k'], round(x['err'], 2), x['parties']])
    stamp = 'Updated ' + dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M UTC') + \
            f' · last poll per pollster with fieldwork ending 1–{WINDOW_DAYS} days before election day'
    r.append([]); r.append([stamp])
    return r, d


def write_sheet(sheet_id, tabs):
    meta = sheet_get(API + sheet_id + '?fields=sheets.properties(title)')
    have = {s['properties']['title'] for s in meta['sheets']}
    add = [{'addSheet': {'properties': {'title': t}}} for t in tabs if t not in have]
    if add:
        sheet_send(API + sheet_id + ':batchUpdate', {'requests': add})
    for title, rows in tabs.items():
        rng = urllib.parse.quote("'" + title + "'", safe='')
        sheet_send(API + sheet_id + '/values/' + rng + ':clear', {})
        sheet_send(API + sheet_id + '/values/' + rng + '?valueInputOption=RAW', {'values': rows}, 'PUT')
        print(f'{title}: {len(rows) - 1} rows written')


def main(argv):
    apopod = argv[0]
    local = '--results' in argv
    if local:
        with open(argv[argv.index('--results') + 1], encoding='utf-8') as fh:
            rows = list(csv.reader(fh))
    else:
        sid = os.environ['RATINGS_SHEET_ID'].strip()
        rows = sheet_get(API + sid + '/values/' + urllib.parse.quote("'Results'", safe='') +
                         '?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER').get('values', [])
    if len(rows) < 2:
        sys.exit('The Results tab is empty.')
    results = read_results(rows)
    print(f'Results tab: {len(results)} elections')
    summary, detail, notes = rate(apopod, results)
    for n in notes:
        print('  note:', n)
    r, d = tables(summary, detail)
    print(f'{len(summary)} pollsters rated from {len(detail)} final polls')
    if local:
        out = argv[argv.index('--out') + 1] if '--out' in argv else '.'
        os.makedirs(out, exist_ok=True)
        for name, rows in (('ratings', r), ('detail', d)):
            with open(os.path.join(out, name + '.csv'), 'w', newline='', encoding='utf-8') as fh:
                csv.writer(fh).writerows(rows)
    else:
        write_sheet(sid, {'Ratings': r, 'Detail': d})


if __name__ == '__main__':
    main(sys.argv[1:])
