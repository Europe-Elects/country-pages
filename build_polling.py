#!/usr/bin/env python3
"""
Build polling-average files for the Europe Elects country pages.

Reads every <iso>.ropf file in the poll repository (ROPF, Rich Opinion Poll File Format),
keeps national polls (•SC: N), fits a LOESS curve per party and writes polling/<ISO>.json.

Usage:  python3 scripts/build_polling.py <path-to-apopod> <output-dir>
No third-party packages needed.
"""
import json, os, re, sys, datetime as dt

SPAN_DAYS = 90          # LOESS window half-width cap: polls further away than this get no weight
NEIGHBOURS = 0.06       # fraction of a party's polls used for each local fit (adaptive span) ...
MIN_NEIGHBOURS = 8      # ... but at least this many
GAP_DAYS = 150          # break a party's line where it went unpolled for longer than this
MIN_POLLS = 4           # parties with fewer national polls get dots only, no line
GRID_DAYS = 7           # spacing of the published curve points
NO_POLLING = {'RU', 'BY', 'AZ', 'FR'}  # countries that never get a polling average

FIELD = re.compile(r'•([A-Z]+):\s*(\S+)')
RESULT = re.compile(r'(?<![•\w])([^\s•:][^\s:]*):\s*([<>]?\d+(?:[.,]\d+)?)')


def parse_date(s, end=False):
    """ROPF dates: YYYY-MM-DD, YYYY-MM or YYYY. Partial dates take the middle of the period."""
    p = s.split('-')
    try:
        if len(p) == 3:
            return dt.date(int(p[0]), int(p[1]), int(p[2]))
        if len(p) == 2:
            return dt.date(int(p[0]), int(p[1]), 15)
        return dt.date(int(p[0]), 7, 1)
    except ValueError:
        return None


def parse_ropf(text):
    polls, parties = [], {}
    for line in text.splitlines():
        if not line.strip() or line.startswith('&'):
            continue  # '&' = alternative response scenario of the previous poll: use the first one only
        if line.startswith('•PF:'):
            fields = {}
            for k, v in FIELD.findall(line):
                fields.setdefault(k, v)
            # pollster / commissioner can contain spaces: read them up to the next bullet
            m = re.search(r'•PF:\s*(.*?)\s*(?=•|$)', line); pf = m.group(1) if m else ''
            if fields.get('SC', 'N') != 'N':
                continue
            if 'A' in fields:
                continue  # poll for one area/region only (e.g. Flanders): not part of the national average
            fs, fe = parse_date(fields.get('FS', '')), parse_date(fields.get('FE', ''), True)
            if not fs and not fe:
                continue
            fs, fe = fs or fe, fe or fs
            mid = fs + (fe - fs) / 2
            # drop metadata: pollster/commissioner run up to the next bullet, other fields are one token
            body = re.sub(r'•(PF|C):\s*[^•]*', ' ', line)
            body = re.sub(r'•[A-Z]+:\s*\S+', ' ', body)
            values = {}
            for key, val in RESULT.findall(body):
                val = val.replace(',', '.')
                num = float(val.strip('<>')) / (2 if val.startswith('<') else 1)
                values[key] = num
            if values:
                # Normalise to decided valid votes = 100%:
                # - •O (others) given: parties + others are the decided vote -> divide by that sum
                #   (•EX is then not used: many files give party shares that already exclude •EX);
                # - only •EX given (undecided, won't vote, …) and the parties add up to about 100 - EX
                #   (shares of all respondents) -> divide by (100 - EX);
                # - otherwise (partial lists without •O/•EX) the figures are left as published.
                def num(x):
                    try: return float(str(x).replace(',', '.'))
                    except (TypeError, ValueError): return None
                ex, other = num(fields.get('EX')), num(fields.get('O'))
                parties_sum = sum(values.values())
                total = None
                if other is not None:
                    total = parties_sum + other
                elif ex is not None and 0 <= ex < 100 and parties_sum <= 100 - ex + 3:
                    total = 100 - ex
                if total and total > 0 and abs(total - 100) > 0.01:
                    values = {k: round(v * 100 / total, 2) for k, v in values.items()}
                polls.append({'d': mid, 'pf': pf, 'v': values})
        else:
            m = re.match(r'^(\S+):\s+(\S+)\s+(.*)$', line)
            if m and '•A:' in line:
                key = m.group(1)
                attrs = {k: v.strip() for k, v in re.findall(r'•([A-Z]+):\s*(.*?)\s*(?=•|$)', m.group(3))}
                abbr = attrs.pop('A', key)
                en = attrs.pop('EN', '')
                native = next(iter(attrs.values()), '')
                parties[key] = {'key': key, 'id': m.group(2), 'abbr': abbr, 'native': native, 'english': en}
    return polls, parties


def loess(xs, ys, x0, k, span=SPAN_DAYS):
    """Local linear regression at x0 with tricube weights over the k nearest points (within SPAN_DAYS)."""
    dist = sorted(((abs(x - x0), x, y) for x, y in zip(xs, ys)))[:k]
    h = max(dist[-1][0], 1.0) * 1.0001
    h = min(h, span) if dist[0][0] < span else h
    sw = swx = swy = swxx = swxy = 0.0
    for d, x, y in dist:
        if d >= h:
            continue
        w = (1 - (d / h) ** 3) ** 3
        sw += w; swx += w * x; swy += w * y; swxx += w * x * x; swxy += w * x * y
    if sw == 0:
        return None
    den = sw * swxx - swx * swx
    if abs(den) < 1e-9:
        return swy / sw
    b = (sw * swxy - swx * swy) / den
    a = (swy - b * swx) / sw
    return a + b * x0


def build_country(polls, parties):
    polls.sort(key=lambda p: p['d'])
    day0 = polls[0]['d']
    out_parties = []
    keys = sorted({k for p in polls for k in p['v']}, key=lambda k: -max(p['v'].get(k, 0) for p in polls))
    for key in keys:
        pts = [((p['d'] - day0).days, p['v'][key]) for p in polls if key in p['v']]
        info = parties.get(key, {'key': key, 'abbr': key, 'native': '', 'english': '', 'id': ''})
        curve = []
        if len(pts) >= MIN_POLLS:
            xs, ys = [x for x, _ in pts], [y for _, y in pts]
            k = max(MIN_NEIGHBOURS, round(NEIGHBOURS * len(pts)))
            # split into segments where the party went unpolled for a long time
            segs, start = [], 0
            for i in range(1, len(xs)):
                if xs[i] - xs[i - 1] > GAP_DAYS:
                    segs.append((start, i)); start = i
            segs.append((start, len(xs)))
            for a, b in segs:
                if b - a < MIN_POLLS:
                    continue
                sx, sy = xs[a:b], ys[a:b]
                seg = []
                x = sx[0]
                while x <= sx[-1]:
                    v = loess(sx, sy, x, min(k, len(sx)))
                    if v is not None:
                        seg.append([(day0 + dt.timedelta(days=x)).isoformat(), round(max(v, 0), 1)])
                    x += GRID_DAYS
                v = loess(sx, sy, sx[-1], min(k, len(sx)))
                if v is not None:
                    seg.append([(day0 + dt.timedelta(days=sx[-1])).isoformat(), round(max(v, 0), 1)])
                curve.append(seg)
        out_parties.append({**info, 'key': key, 'n': len(pts), 'curve': curve})
    return {
        'updated': dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat(),
        'parties': out_parties,
        'polls': [{'d': p['d'].isoformat(), 'pf': p['pf'], 'v': p['v']} for p in polls],
    }


def main(src, dst):
    os.makedirs(dst, exist_ok=True)
    if not os.path.isdir(src):
        print(f'Poll database not found at {src}; no polling files built (pages fall back to Datawrapper charts).')
        return
    done = []
    for name in sorted(os.listdir(src)):
        m = re.fullmatch(r'([a-z]{2})\.ropf', name)  # one file per country; variants like fi_p20.ropf are skipped
        if not m or m.group(1).upper() in NO_POLLING:
            continue
        with open(os.path.join(src, name), encoding='utf-8') as fh:
            polls, parties = parse_ropf(fh.read())
        if not polls:
            continue
        data = build_country(polls, parties)
        iso = m.group(1).upper()
        with open(os.path.join(dst, iso + '.json'), 'w', encoding='utf-8') as fh:
            json.dump(data, fh, ensure_ascii=False, separators=(',', ':'))
        done.append(f'{iso}:{len(data["polls"])}')
    print('Built', len(done), 'countries:', ' '.join(done))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'polling')
