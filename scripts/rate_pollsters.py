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
    "A / B" in Party (as given) means: the poll files list this party as A or as B (e.g. "TV / TV+UL").
    "X+Y" also matches polls that list X and Y separately (their figures are added up).
    A party is matched to the poll file by its Entity ID (•EE / •ID in the .ropf header), or else
    by "Party (as given)" = the poll file's key or abbreviation (•A).

Rules
  * Per election and pollster, only the pollster's LAST poll with fieldwork ending 1-30 days before
    election day counts. Pollsters without such a poll are left out of that election.
  * Figures are compared as published. Seat projections (•U: S) become seat shares; polls that report a non-choice
    share (•N: undecided, won't vote, refused …) or give figures as a share of all respondents (•VS) are rescaled
    so that parties + others (•O) = 100.
  * Every pollster in an election is compared on the SAME parties: those with at least 5 % of the official
    vote (RESULT_MIN). A pollster whose poll has no figure for one of them is skipped for that election.
  * Error = mean absolute difference (percentage points) between poll and result over those parties.
  * Per pollster and country (a pollster active in several countries is rated separately in each):
      - average error: mean of its per-election errors (absolute measure, lower is better);
      - vs rivals: per election, the other pollsters' average error minus its own (+ = better than the field),
        averaged over its elections; labelled with RIVAL_LABELS; the ranking follows this score;
      - confidence: High (more than 10 elections), Medium (6–10), Low (5 or fewer);
      - house effect: parties it over- or understated in the same direction in 2+ elections, by BIAS_MIN points or
        more on average (poll − result).

Output (written to the ratings Sheet, replacing the tabs' contents)
  * "Ratings": one row per pollster and country.
  * "Detail":  one row per pollster and election.

Usage
  python3 scripts/rate_pollsters.py <path-to-apopod>                       (Sheet via GOOGLE_TOKEN, RATINGS_SHEET_ID)
  python3 scripts/rate_pollsters.py <path-to-apopod> --results results.csv --out <dir>   (local test, CSV in/out)
  add --json <file> to write the data file for the web page (pollster-ratings/data.json) instead of the tabs
"""
import csv, datetime as dt, json, os, re, sys, urllib.parse, urllib.request
from statistics import mean

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_polling import FIELD, RESULT, parse_date, NO_POLLING  # same ROPF reading as the averages
from translit import romanise  # Latin script for Cyrillic, Greek and Armenian names

WINDOW_DAYS = 30
MIN_PARTIES = 2
RESULT_MIN = 5.0   # every pollster is compared on the parties with at least this share of the official vote
API = 'https://sheets.googleapis.com/v4/spreadsheets/'
COUNTRY = {}  # ISO-2 -> country name, from the results tab

# Score against rivals: in each election, the average error of the OTHER pollsters minus this pollster's error
# (positive = better than the field). Labels for a pollster's average score (points):
RIVAL_LABELS = [(0.5, 'Much better than rivals'), (0.2, 'Better than rivals'), (-0.2, 'About average'),
                (-0.5, 'Worse than rivals'), (None, 'Much worse than rivals')]
# Confidence from the number of elections a rating rests on.
CONFIDENCE = [(11, 'High'), (6, 'Medium'), (1, 'Low')]  # more than 10 elections / more than 5 / fewer
BIAS_MIN = 0.5     # house effect: parties over-/understated by at least this much on average (points) ...
BIAS_ELECTIONS = 2  # ... in this many elections or more, always in the same direction


def rival_label(score):
    if score is None:
        return 'No rivals polled'
    return next(lab for lim, lab in RIVAL_LABELS if lim is None or score >= lim)


def confidence(k):
    return next(lab for n, lab in CONFIDENCE if k >= n)


def house_effects(ds):
    """Parties a pollster consistently over- or understated: in at least BIAS_ELECTIONS of its elections, always in the
    same direction, by BIAS_MIN points or more on average. [(party, average poll − result, elections)], largest first."""
    by = {}
    for d in ds:
        for lab, v, r in d['pairs']:
            by.setdefault(lab, []).append(v - r)
    out = [(lab, mean(x), len(x)) for lab, x in by.items()
           if len(x) >= BIAS_ELECTIONS and (all(e > 0 for e in x) or all(e < 0 for e in x)) and abs(mean(x)) >= BIAS_MIN]
    return sorted(out, key=lambda t: -abs(t[1]))


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
            fields = {k: v for k, v in head_fields.items() if k in ('FS', 'FE', 'A', 'SS', 'U', 'VS')}
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
            # Figures are compared as published, except:
            #  * seat projections (•U: S) become seat shares: seats × 100 / total seats (•VS, else the seats listed);
            #  * polls that report a non-choice share (•N: undecided, won't vote, refused …) or whose figures are a share
            #    of all respondents (•VS = their sum, not 100) are rescaled so that the parties plus "others" (•O)
            #    add up to 100, i.e. to valid choices only.
            # (•EX, where given, is reported next to figures that already add up to 100 without it: no change.)
            other = max(num(fields.get('O')) or 0.0, 0.0)
            if fields.get('U') == 'S':
                seats = num(fields.get('VS')) or (sum(values.values()) + other)
                if not seats:
                    continue
                values = {k: v * 100 / seats for k, v in values.items()}
            elif (num(fields.get('N')) or 0) > 0 or fields.get('VS'):
                valid = sum(values.values()) + other
                if valid > 0:
                    values = {k: v * 100 / valid for k, v in values.items()}
            ss = num(fields.get('SS'))
            polls.append({'fe': fe, 'pf': pf, 'c': com, 'a': fields.get('A', ''), 'v': values, 'n': int(ss) if ss else None})
            done = True
        else:
            m = re.match(r'^(\S+):\s+(\S+)\s+(.*)$', line)
            if m and '•A:' in line:
                attrs = {k: v.strip() for k, v in re.findall(r'•([A-Z]+):\s*(.*?)\s*(?=•|$)', m.group(3))}
                parties[m.group(1)] = {'id': attrs.get('EE') or attrs.get('ID', ''), 'abbr': attrs.get('A', m.group(1)),
                                       'r': attrs.get('R', '')}
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
        if str(cell(r, 'Country')).strip():
            COUNTRY.setdefault(iso, str(cell(r, 'Country')).strip())
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

def party_label(key, parties, iso):
    """Display name of a poll-file party key in Latin script: the file's romanised abbreviation (•R) if it has one,
    else its abbreviation (•A) romanised. Joint keys ("ВОЛЯ+НФСБ") are labelled part by part."""
    def one(k):
        p = parties.get(k, {})
        return romanise(p.get('r') or p.get('abbr') or k, iso)
    return one(key) if key in parties or '+' not in key else '+'.join(one(k) for k in key.split('+'))


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
        # The parties every pollster is compared on: those with at least RESULT_MIN % of the official vote.
        units = [x for x in res if x['pct'] >= RESULT_MIN]
        if len(units) < MIN_PARTIES:
            notes.append(f'{where}: fewer than {MIN_PARTIES} parties with {RESULT_MIN:g}%+ in the results tab'); continue

        def poll_value(unit, v):
            """The poll's figure for one results row, or None. A row matches a poll key by Entity ID, by key or
            abbreviation; "A / B" in Party (as given) lists alternative keys; "X+Y" also matches a poll that
            lists X and Y separately (their sum)."""
            idx = {}
            for k, val in v.items():
                ph = parties.get(k, {})
                for n in (k, ph.get('abbr', '')):
                    if n:
                        idx.setdefault(n.casefold(), val)
                if ph.get('id'):
                    idx.setdefault('#' + ph['id'], val)
            if unit['id'] and '#' + unit['id'] in idx:
                return idx['#' + unit['id']], unit['name'].split(' / ')[0].strip()
            for alt in [a.strip() for a in unit['name'].split(' / ') if a.strip()]:
                if alt.casefold() in idx:
                    return idx[alt.casefold()], alt
                parts = [x.strip().casefold() for x in alt.split('+')]
                if len(parts) > 1 and all(x in idx for x in parts):
                    return sum(idx[x] for x in parts), alt
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
        for pf, p in sorted(last.items()):
            pairs, missing = [], []
            for u in units:
                got = poll_value(u, p['v'])
                if got is None:
                    missing.append(u['name'])
                else:
                    pairs.append((got[1], got[0], u['pct']))
            if missing:
                notes.append(f'{where} {pf}: skipped, no figure for {", ".join(missing)}'); continue
            pairs.sort(key=lambda t: -t[2])
            err = mean(abs(v - r) for _, v, r in pairs)
            detail.append({'iso': iso, 'area': area, 'date': eday, 'pf': pf, 'c': p['c'], 'fe': p['fe'], 'days': (eday - p['fe']).days,
                           'n': p['n'], 'err': err, 'k': len(pairs),
                           'pairs': [(party_label(k, parties, iso), v, r) for k, v, r in pairs],
                           'parties': ', '.join(f'{party_label(k, parties, iso)} {v:.1f} ({r:.1f})' for k, v, r in pairs)})
    # Score against rivals, per election
    field = {}
    for d in detail:
        field.setdefault((d['iso'], d['area'], d['date']), []).append(d)
    for ds in field.values():
        for d in ds:
            others = [o['err'] for o in ds if o is not d]
            d['rivals'] = len(others)
            d['rival_err'] = mean(others) if others else None
            d['vs'] = (d['rival_err'] - d['err']) if others else None
    # One rating per pollster AND country: the same pollster in two countries is rated twice, separately.
    ratings = {}
    for d in detail:
        ratings.setdefault((d['pf'], d['iso']), []).append(d)
    summary = []
    for (pf, iso), ds in ratings.items():
        vs = [d['vs'] for d in ds if d['vs'] is not None]
        score = mean(vs) if vs else None
        summary.append({'pf': pf, 'iso': iso, 'k': len(ds), 'err': mean(d['err'] for d in ds), 'vs': score, 'kv': len(vs),
                        'label': rival_label(score), 'conf': confidence(len(ds)), 'bias': house_effects(ds),
                        'best': min(d['err'] for d in ds), 'worst': max(d['err'] for d in ds),
                        'last': max(d['date'] for d in ds), 'ds': ds})
    # Ranked by the score against rivals (best first); ratings without rivals last, by error.
    summary.sort(key=lambda s: (s['vs'] is None, -(s['vs'] or 0), s['err']))
    return summary, detail, notes


def tables(summary, detail):
    r = [['Rank', 'Pollster', 'ISO-2', 'Country', 'Vs rivals (pts, + = better)', 'Rating', 'Average error (pts)',
          'Elections rated', 'Confidence', 'House effect (avg poll − result)', 'Best election', 'Worst election',
          'Latest election rated']]
    for i, s in enumerate(summary, 1):
        r.append([i, romanise(s['pf'], s['iso']), s['iso'], COUNTRY.get(s['iso'], s['iso']),
                  '' if s['vs'] is None else round(s['vs'], 2), s['label'], round(s['err'], 2), s['k'], s['conf'],
                  ', '.join(f'{lab} {b:+.1f}' for lab, b, n in s['bias']),
                  round(s['best'], 2), round(s['worst'], 2), s['last'].isoformat()])
    d = [['ISO-2', 'Area', 'Election date', 'Pollster', 'Commissioner', 'Fieldwork end', 'Days before election',
          'Sample size', 'Parties compared', 'Average error (pts)', 'Rivals', 'Rivals\' average error', 'Vs rivals',
          'Poll (result) per party']]
    for x in sorted(detail, key=lambda x: (x['iso'], x['area'], x['date'], x['err'])):
        d.append([x['iso'], x['area'], x['date'].isoformat(), romanise(x['pf'], x['iso']), romanise(x['c'], x['iso']), x['fe'].isoformat(), x['days'],
                  x['n'] or '', x['k'], round(x['err'], 2), x['rivals'],
                  '' if x['rival_err'] is None else round(x['rival_err'], 2), '' if x['vs'] is None else round(x['vs'], 2),
                  x['parties']])
    stamp = 'Updated ' + dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M UTC') + \
            f' · last poll per pollster with fieldwork ending 1–{WINDOW_DAYS} days before election day' + \
            f' · parties with {RESULT_MIN:g}%+ of the vote · vs rivals = rivals\' average error − own error'
    r.append([]); r.append([stamp])
    return r, d


def write_json(path, summary, detail):
    """Data file for the pollster-ratings web page."""
    data = {
        'updated': dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat(),
        'window': WINDOW_DAYS,
        'countries': {iso: COUNTRY.get(iso, iso) for iso in sorted({d['iso'] for d in detail})},
        'labels': RIVAL_LABELS, 'confidence': CONFIDENCE, 'bias_min': BIAS_MIN, 'bias_elections': BIAS_ELECTIONS, 'result_min': RESULT_MIN,
        'pollsters': [{'name': romanise(s['pf'], s['iso']), **({'orig': s['pf']} if romanise(s['pf'], s['iso']) != s['pf'] else {}),
                       'iso': s['iso'], 'err': round(s['err'], 2),
                       'vs': None if s['vs'] is None else round(s['vs'], 2), 'kv': s['kv'], 'label': s['label'], 'conf': s['conf'],
                       'bias': [[lab, round(b, 1), n] for lab, b, n in s['bias']], 'elections': [
            {'iso': d['iso'], 'area': d['area'], 'date': d['date'].isoformat(), 'fe': d['fe'].isoformat(),
             'days': d['days'], 'n': d['n'], 'c': romanise(d['c'], d['iso']), 'err': round(d['err'], 2),
             'rivals': d['rivals'], 'rival_err': None if d['rival_err'] is None else round(d['rival_err'], 2),
             'parties': [[a, round(v, 1), round(r, 2)] for a, v, r in d['pairs']]}
            for d in sorted(s['ds'], key=lambda d: d['date'], reverse=True)]} for s in summary],
    }
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(',', ':'))
    print(f'{path}: {len(summary)} pollsters')


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
    print(f'{len(summary)} ratings (pollster per country) from {len(detail)} final polls')
    if '--json' in argv:  # web page data only; the Sheet is left alone
        write_json(argv[argv.index('--json') + 1], summary, detail)
    elif local:
        out = argv[argv.index('--out') + 1] if '--out' in argv else '.'
        os.makedirs(out, exist_ok=True)
        for name, rows in (('ratings', r), ('detail', d)):
            with open(os.path.join(out, name + '.csv'), 'w', newline='', encoding='utf-8') as fh:
                csv.writer(fh).writerows(rows)
    else:
        write_sheet(sid, {'Ratings': r, 'Detail': d})


if __name__ == '__main__':
    main(sys.argv[1:])
