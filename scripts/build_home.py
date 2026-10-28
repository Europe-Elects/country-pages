"""Builds the home page from homepage.src.html.

Outputs (repo root):
  home.js        – the loader WordPress uses: <div id="ee-home-root"></div><script src=".../home.js" defer></script>
  home.html      – preview page on GitHub Pages (loads home.js)
  homepage.html  – the same page as one block to paste into WordPress (fallback, no GitHub needed)
Featured dashboard: edit FEATURED below (image file in home/).
"""
import json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://europe-elects.github.io/country-pages/'
FEATURED = {
    'url': 'https://europeelects.eu/2026/06/02/presidential-election-in-france-2027/',
    'title': 'Election Dashboard: France 2027',
    'image': 'home/featured.png',
}
PARTY_DB_URL = 'https://europeelects.eu/parties/'

def feature_html(img_src):
    f = FEATURED
    return f'''<a class="eeh-feat" href="{f['url']}">
    <span class="eeh-feat-im"><img src="{img_src}" alt=""></span>
    <span class="eeh-feat-tx"><span class="eeh-feat-k">Featured</span><span class="eeh-feat-t">{f['title']}</span></span>
    <span class="eeh-feat-go" aria-hidden="true">→</span></a>'''

src = open(os.path.join(ROOT, 'homepage.src.html'), encoding='utf-8').read()
src = src.replace('__PARTY_DB_URL__', PARTY_DB_URL)
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
body = re.search(r'(<div id="ee-home">.*?\n</div>)\n', src, re.S).group(1)
app = src[src.rindex('<script>') + len('<script>'):src.rindex('</script>')]

# 1) loader for WordPress
js_body = body.replace('__FEATURE__', feature_html(BASE + FEATURED['image']))
loader = f"""/* Europe Elects home page – built by scripts/build_home.py from homepage.src.html. Do not edit by hand. */
(function () {{
  var host = document.getElementById('ee-home-root');
  if (!host) {{ host = document.createElement('div'); (document.currentScript || document.body.lastChild).insertAdjacentElement('beforebegin', host); }}
  if (!document.querySelector('link[href*="family=Advent+Pro"]')) {{ var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Advent+Pro:wght@400;500;600;700;800&display=swap'; document.head.appendChild(fl); }}
  // Shadow root: the WordPress theme's styles can't reach in, so the page looks the same as on GitHub.
  var root = host.attachShadow ? host.attachShadow({{ mode: 'open' }}) : host;
  root.innerHTML = '<style>' + {json.dumps(css)} + '</style>' + {json.dumps(js_body)};
  var bs = document.createElement('script'); bs.type = 'module'; bs.async = true; bs.src = 'https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js'; document.head.appendChild(bs);
  function load(src) {{ return new Promise(function (ok) {{ if (src.test()) return ok(); var s = document.createElement('script'); s.src = src.url; s.onload = s.onerror = function () {{ ok(); }}; document.head.appendChild(s); }}); }}
  load({{ url: 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js', test: function () {{ return !!window.d3; }} }})
    .then(function () {{ return load({{ url: 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js', test: function () {{ return !!window.topojson; }} }}); }})
    .then(run);
  // Inside an iframe (home.html embedded elsewhere): report the height so the frame can resize.
  if (window.parent !== window && 'ResizeObserver' in window) new ResizeObserver(function () {{ window.parent.postMessage({{ 'datawrapper-height': {{ 'ee-home': document.documentElement.scrollHeight }} }}, '*'); }}).observe(document.body);
  function run() {{
    // The page code looks elements up through "document"; point those lookups at the shadow root.
    var D = window.document;
    var document = root === host ? D : {{
      getElementById: function (id) {{ return root.getElementById(id); }},
      querySelector: function (s) {{ return root.querySelector(s); }},
      querySelectorAll: function (s) {{ return root.querySelectorAll(s); }},
      createElement: function (t) {{ return D.createElement(t); }},
      get documentElement() {{ return D.documentElement; }}, get body() {{ return D.body; }}, get head() {{ return D.head; }}
    }};
{app}
    // Links such as europeelects.eu/#eeh-data-access: scroll to the section inside the shadow root.
    function jump() {{ var id = (location.hash || '').slice(1); var el = id && root.getElementById && root.getElementById(id); if (el) el.scrollIntoView({{ behavior: 'smooth', block: 'start' }}); }}
    window.addEventListener('hashchange', jump); setTimeout(jump, 600);
    root.addEventListener('click', function (e) {{ var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return; e.preventDefault(); history.pushState(null, '', a.getAttribute('href')); jump(); }});
  }}
}})();
"""
open(os.path.join(ROOT, 'home.js'), 'w', encoding='utf-8').write(loader)

# 2) preview page
open(os.path.join(ROOT, 'home.html'), 'w', encoding='utf-8').write('''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Europe Elects – Home</title>
<base target="_top">
<style>html,body{margin:0;background:transparent}body{padding:0 2px}</style></head>
<body><div id="ee-home-root"></div><script src="home.js"></script></body></html>
''')

# 3) single paste block (fallback)
paste = src.replace('__FEATURE__', feature_html(BASE + FEATURED['image']))
open(os.path.join(ROOT, 'homepage.html'), 'w', encoding='utf-8').write(paste)
print('built home.js (%d KB), home.html, homepage.html' % (len(loader) // 1024))
