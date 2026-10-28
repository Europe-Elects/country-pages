/* Europe Elects home page – built by scripts/build_home.py from homepage.src.html. Do not edit by hand. */
(function () {
  var host = document.getElementById('ee-home-root');
  if (!host) { host = document.createElement('div'); (document.currentScript || document.body.lastChild).insertAdjacentElement('beforebegin', host); }
  if (!document.querySelector('link[href*="family=Advent+Pro"]')) { var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Advent+Pro:wght@400;500;600;700;800&display=swap'; document.head.appendChild(fl); }
  var st = document.createElement('style'); st.textContent = "\n#ee-home{--navy:#1a2b4a;--navy2:#0d1830;--gold:#ffcc00;--ink:#001936;--muted:#5f5e5a;--line:#e4e3de;--soft:#f6f5f1;--sky:#0085ff;\n  font-family:'Advent Pro',system-ui,sans-serif;color:var(--ink);line-height:1.35;max-width:1180px;margin:0 auto;padding:24px 0 32px}\n#ee-home *,#ee-home *::before,#ee-home *::after{box-sizing:border-box}\n#ee-home p{margin:0}\n#ee-home a{color:inherit}\n\n/* ---------- layout ---------- */\n#ee-home .eeh-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(290px,1fr);gap:22px;align-items:stretch;margin-top:26px}\n#ee-home .eeh-row.top{align-items:start}\n\n/* ---------- panels: navy headline bar + white body ---------- */\n#ee-home .eeh-panel{display:flex;flex-direction:column;min-width:0;background:#fff;border:1px solid var(--line);border-radius:6px;overflow:hidden;\n  box-shadow:0 1px 3px rgba(0,25,54,.06)}\n#ee-home .eeh-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--navy);\n  padding:12px 18px;text-decoration:none;border-bottom:2px solid var(--gold);flex:none}\n#ee-home .eeh-bar span{font-family:'Advent Pro',system-ui,sans-serif;font-size:16.5px}\n#ee-home .eeh-bar .t{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#fff}\n#ee-home .eeh-bar.live .t::before{content:\"\";width:8px;height:8px;border-radius:50%;flex:none}\n#ee-home .eeh-bar .m{color:var(--gold);white-space:nowrap;font-weight:700}\n#ee-home a.eeh-bar:hover .m{text-decoration:underline}\n#ee-home .eeh-bar.live .t::before{background:#ff3b30;box-shadow:0 0 0 3px rgba(255,59,48,.25);animation:eeh-pulse 1.4s ease-in-out infinite}\n@keyframes eeh-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}\n#ee-home .eeh-body{padding:16px 18px 18px;flex:1;display:flex;flex-direction:column;min-width:0}\n#ee-home .eeh-body.flush{padding:0}\n#ee-home .eeh-sub{font-size:14.5px;color:var(--muted);margin:0 0 14px}\n#ee-home .eeh-h{font-size:14.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:0 0 12px}\n#ee-home .eeh-status{padding:30px;text-align:center;color:var(--muted);font-size:14.5px}\n#ee-home .eeh-status.err{color:#c00}\n\n/* ---------- featured dashboard ---------- */\n#ee-home .eeh-feat{display:flex;align-items:stretch;min-height:96px;border-radius:6px;overflow:hidden;text-decoration:none;color:#fff;\n  background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 100%);border:1px solid var(--gold);transition:box-shadow .15s}\n#ee-home .eeh-feat:hover{box-shadow:0 6px 18px rgba(26,43,74,.3)}\n#ee-home .eeh-feat-im{flex:0 0 190px;position:relative;background:#f4f1e8;overflow:hidden}\n#ee-home .eeh-feat-im img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left top}\n#ee-home .eeh-feat-tx{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:14px 22px}\n#ee-home .eeh-feat-k{font-family:'Advent Pro',system-ui,sans-serif;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}\n#ee-home .eeh-feat-t{font-size:20px;font-weight:800;letter-spacing:.02em;text-transform:uppercase;line-height:1.15}\n#ee-home .eeh-feat-go{display:flex;align-items:center;padding:0 22px;color:var(--gold);font-size:22px;font-weight:800}\n@media (max-width:600px){#ee-home .eeh-feat-im{flex-basis:110px}#ee-home .eeh-feat-t{font-size:16px}#ee-home .eeh-feat-go{padding:0 14px}}\n\n/* ---------- support band ---------- */\n#ee-home .eeh-support{margin-top:18px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2.1fr);gap:18px 26px;align-items:center;\n  padding:20px 22px;border-radius:6px;background:var(--navy);color:#fff;border-top:2px solid var(--gold)}\n#ee-home .eeh-support .k{font-family:'Advent Pro',system-ui,sans-serif;font-size:14.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}\n#ee-home .eeh-support h2{margin:4px 0 6px;font-size:21px;line-height:1.2;font-weight:700;color:#fff}\n#ee-home .eeh-support p{font-size:15.5px;color:rgba(255,255,255,.78);line-height:1.4}\n#ee-home .eeh-btns{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;position:relative;z-index:1}\n#ee-home .eeh-s{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;text-align:center;padding:14px 8px 12px;background:#fff;border-radius:4px;\n  text-decoration:none;color:var(--ink);border-top:3px solid var(--c);transition:background .15s,box-shadow .15s}\n#ee-home .eeh-s:hover,#ee-home .eeh-s:focus-visible{background:#f6f5f1;box-shadow:0 0 0 2px var(--gold)}\n#ee-home .eeh-s .ic{width:34px;height:34px;border-radius:50%;background:var(--c);color:#fff;display:flex;align-items:center;justify-content:center}\n#ee-home .eeh-s b{font-size:16px;line-height:1.1}\n#ee-home .eeh-s small{font-size:13.5px;color:var(--muted);line-height:1.2}\n\n/* ---------- EP projection ---------- */\n#ee-home .eeh-bars .r{display:grid;grid-template-columns:200px 1fr 44px 48px;align-items:center;gap:10px;margin-bottom:8px;font-size:15px;font-variant-numeric:tabular-nums}\n#ee-home .eeh-bars .r:last-of-type{margin-bottom:0}\n#ee-home .eeh-bars .l{font-weight:700}\n#ee-home .eeh-bars .tr{height:14px;background:#f0f0ec;border-radius:2px;overflow:hidden}\n#ee-home .eeh-bars .f{height:100%;border-radius:2px;transition:width .25s}\n#ee-home .eeh-bars .v{text-align:right;font-weight:700}\n#ee-home .eeh-bars .c{text-align:right;font-weight:700;font-size:13px}\n#ee-home .pos{color:#009900}#ee-home .neg{color:#990000}#ee-home .neu{color:#8a8a86}\n#ee-home .eeh-maj{font-size:13px;color:var(--muted);margin-top:10px}\n#ee-home .eeh-trend{position:relative;margin-top:16px;padding-top:14px;border-top:1px solid #efeee9}\n#ee-home .eeh-trend svg{display:block;width:100%;height:auto;touch-action:pan-y}\n#ee-home .eeh-trend-h{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:13px;color:var(--muted);margin-bottom:4px}\n#ee-home .eeh-trend-h b{color:var(--ink);font-size:14.5px}\n#ee-home .eeh-map{position:relative;margin-top:16px;padding-top:6px;border-top:1px solid #efeee9}\n#ee-home .eeh-map svg{width:100%;display:block}\n#ee-home .eeh-maplegend{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:14.5px;color:var(--muted);margin-top:6px}\n#ee-home .eeh-maplegend span{display:inline-flex;align-items:center;gap:6px}\n#ee-home .eeh-maplegend i{width:9px;height:9px;border-radius:50%;display:inline-block}\n#ee-home .eeh-maplegend .note{margin-left:auto;font-style:italic}\n#ee-home .eeh-map .country{cursor:pointer;stroke:#fff;stroke-width:.5;transition:opacity .15s}\n#ee-home .eeh-map .country:hover{opacity:.75;stroke:#001936;stroke-width:1.5}\n#ee-home .eeh-map .none{fill:#e6e4dc;stroke:#fff;stroke-width:.5}\n#ee-home .eeh-tip{position:absolute;pointer-events:none;display:none;background:var(--ink);color:#fff;border-radius:8px;padding:10px 14px;font-size:14.5px;min-width:190px;line-height:1.6;z-index:9;box-shadow:0 4px 16px rgba(0,0,0,.25)}\n#ee-home .eeh-tip strong{display:block;font-size:16.5px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,.2)}\n#ee-home .eeh-tip i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:7px;vertical-align:-1px}\n#ee-home .eeh-tip .tot{margin-top:4px;padding-top:4px;border-top:1px solid rgba(255,255,255,.15);font-size:13px;opacity:.75}\n\n/* ---------- live feed (Bluesky) ---------- */\n#ee-home .eeh-live{position:relative;flex:1;min-height:460px;background:#f0f7ff;border-top:3px solid var(--sky)}\n#ee-home .eeh-live-scroll{position:absolute;inset:0;overflow:auto;padding:12px;font-size:14.5px}\n#ee-home .eeh-follow{display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;font-size:15.5px;font-weight:700;color:var(--sky);text-decoration:none;border-top:1px solid #d9e9fb;background:#fff;flex:none}\n#ee-home .eeh-follow:hover{text-decoration:underline}\n\n/* ---------- polling ---------- */\n#ee-home .eeh-poll iframe{display:block;width:0;min-width:100%;border:0}\n\n/* ---------- electoral calendar ---------- */\n#ee-home .eeh-cal{list-style:none;margin:0;padding:0}\n#ee-home .eeh-cal li{display:grid;grid-template-columns:56px 1fr;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #efeee9}\n#ee-home .eeh-cal li:first-child{padding-top:0}\n#ee-home .eeh-cal li:last-child{border-bottom:0}\n#ee-home .eeh-date{border-radius:4px;text-align:center;padding:6px 0 7px;color:#fff;line-height:1}\n#ee-home .eeh-date b{display:block;font-size:21px}\n#ee-home .eeh-date small{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.06em;margin-top:3px}\n#ee-home .eeh-date.tbc{background:#fff!important;border:1.5px dashed currentColor}\n#ee-home .eeh-cal .n{font-weight:700;font-size:16px}\n#ee-home .eeh-cal .d{font-size:14.5px;color:var(--muted)}\n#ee-home .eeh-key{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:13px;color:var(--muted);margin-top:auto;padding-top:12px;border-top:1px solid #efeee9}\n#ee-home .eeh-key span{display:inline-flex;align-items:center;gap:5px}\n#ee-home .eeh-key i{width:9px;height:9px;border-radius:2px;display:inline-block}\n\n/* ---------- podcast ---------- */\n#ee-home .eeh-pod{display:block;border:0;width:100%;border-radius:6px}\n\n@media (max-width:900px){\n  #ee-home .eeh-support{grid-template-columns:1fr}\n}\n@media (max-width:860px){\n  #ee-home .eeh-row{grid-template-columns:1fr;margin-top:20px}\n  #ee-home .eeh-live{min-height:0}\n  #ee-home .eeh-live-scroll{position:static;max-height:560px}\n}\n@media (max-width:600px){\n  #ee-home .eeh-btns{grid-template-columns:repeat(2,minmax(0,1fr))}\n  #ee-home .eeh-support{padding:18px 16px}\n  #ee-home .eeh-body{padding:14px}\n  #ee-home .eeh-bars .r{grid-template-columns:1fr 40px 44px;gap:4px 8px}\n  #ee-home .eeh-bars .l{grid-column:1/-1}\n  #ee-home .eeh-bars .tr{grid-column:1/2}\n}\n/* ---------- hero ---------- */\n#ee-home .eeh-sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}\n#ee-home .eeh-hero{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px 28px;padding:4px 0 18px;margin-bottom:18px;border-bottom:1px solid var(--line)}\n#ee-home .eeh-hero .k{font-family:'Advent Pro',system-ui,sans-serif;font-size:14.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a6d00}\n#ee-home .eeh-hero h1{margin:4px 0 6px;font-size:32px;line-height:1.1;font-weight:800;color:var(--ink);letter-spacing:-.01em}\n#ee-home .eeh-hero p{font-size:16px;color:var(--muted);max-width:620px}\n#ee-home .eeh-quick{display:flex;flex-wrap:wrap;gap:8px}\n#ee-home .eeh-quick a{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border:1px solid var(--line);border-radius:4px;background:#fff;font-size:15.5px;font-weight:700;text-decoration:none;color:var(--navy)}\n#ee-home .eeh-quick a:hover{border-color:var(--navy);background:var(--soft)}\n#ee-home .eeh-quick a.pri{background:var(--navy);border-color:var(--navy);color:#fff}\n#ee-home .eeh-quick a.pri:hover{background:var(--navy2)}\n\n/* ---------- full-width panels ---------- */\n#ee-home .eeh-wide{margin-top:26px}\n#ee-home .eeh-col-stack{display:flex;flex-direction:column;gap:22px;min-width:0}\n\n/* ---------- latest analysis ---------- */\n#ee-home .eeh-posts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}\n#ee-home .eeh-post{display:flex;flex-direction:column;text-decoration:none;color:var(--ink);min-width:0}\n#ee-home .eeh-post .im{aspect-ratio:16/9;background:#eceae4 center/cover no-repeat;border-radius:4px;margin-bottom:10px}\n#ee-home .eeh-post .dt{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8a6d00}\n#ee-home .eeh-post h3{margin:3px 0 5px;font-size:17px;line-height:1.25;font-weight:700}\n#ee-home .eeh-post:hover h3{text-decoration:underline}\n#ee-home .eeh-post p{font-size:15.5px;color:var(--muted);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}\n\n/* ---------- countries ---------- */\n#ee-home .eeh-find{width:100%;max-width:none;padding:9px 12px;border:1px solid var(--line);border-radius:4px;font:inherit;font-size:16.5px;margin-bottom:14px}\n#ee-home .eeh-find:focus{outline:2px solid var(--gold);outline-offset:0;border-color:var(--navy)}\n#ee-home .eeh-countries{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px 14px;list-style:none;margin:0;padding:0}\n#ee-home .eeh-countries a{display:flex;align-items:center;gap:8px;padding:6px 4px;font-size:16.5px;text-decoration:none;color:var(--ink);border-bottom:1px solid #f0efea}\n#ee-home .eeh-countries a:hover{color:#1E4C99}\n#ee-home .eeh-countries .iso{font-size:12px;font-weight:700;color:#fff;background:var(--navy);border-radius:3px;padding:2px 5px;min-width:26px;text-align:center}\n#ee-home .eeh-countries a.eu .iso{background:#003399;color:var(--gold)}\n\n/* ---------- newsletter / follow ---------- */\n#ee-home .eeh-social{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}\n#ee-home .eeh-social a{display:flex;align-items:center;gap:8px;padding:9px 10px;border:1px solid var(--line);border-radius:4px;font-size:15.5px;font-weight:700;text-decoration:none;color:var(--navy)}\n#ee-home .eeh-social a:hover{border-color:var(--navy);background:var(--soft)}\n#ee-home .eeh-sub-frame{display:block;width:100%;height:150px;border:1px solid var(--line);border-radius:4px;background:#fff}\n\n/* ---------- data access form ---------- */\n#ee-home .eeh-data{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:26px}\n#ee-home .eeh-data h3{margin:0 0 8px;font-size:20px;line-height:1.2}\n#ee-home .eeh-path{margin-top:14px;padding:12px 14px;background:var(--soft);border-left:3px solid var(--gold);border-radius:3px;display:flex;flex-direction:column;gap:4px}\n#ee-home .eeh-path b{font-size:17px;color:var(--navy)}\n#ee-home .eeh-path span{font-size:16px;color:var(--muted);line-height:1.4}\n#ee-home .eeh-path a{font-weight:700;color:#1E4C99}\n#ee-home .eeh-hint{margin:0;padding:9px 12px;background:#fff8d6;border-radius:3px;font-size:15.5px;color:var(--ink)}\n#ee-home .eeh-data ul{margin:12px 0 0;padding:0;list-style:none;font-size:16px}\n#ee-home .eeh-data li{padding:7px 0 7px 22px;border-bottom:1px solid #f0efea;position:relative}\n#ee-home .eeh-data li::before{content:\"\";position:absolute;left:4px;top:13px;width:8px;height:8px;border-radius:2px;background:var(--gold)}\n#ee-home .eeh-form{display:grid;grid-template-columns:1fr 1fr;gap:12px 14px}\n#ee-home .eeh-form label{display:flex;flex-direction:column;gap:4px;font-size:14.5px;font-weight:700;color:var(--navy)}\n#ee-home .eeh-form .full{grid-column:1/-1}\n#ee-home .eeh-form input,#ee-home .eeh-form select,#ee-home .eeh-form textarea{font:inherit;font-size:16.5px;font-weight:400;color:var(--ink);padding:9px 11px;border:1px solid #d5d3cc;border-radius:4px;background:#fff;width:100%}\n#ee-home .eeh-form textarea{min-height:96px;resize:vertical}\n#ee-home .eeh-form input:focus,#ee-home .eeh-form select:focus,#ee-home .eeh-form textarea:focus{outline:2px solid var(--gold);outline-offset:0;border-color:var(--navy)}\n#ee-home .eeh-form .chk{flex-direction:row;align-items:flex-start;gap:8px;font-weight:400;color:var(--muted)}\n#ee-home .eeh-form .chk input{width:auto;margin-top:3px}\n#ee-home .eeh-form button{justify-self:start;padding:11px 22px;border:0;border-radius:4px;background:var(--navy);color:#fff;font:inherit;font-size:16.5px;font-weight:700;cursor:pointer;border-bottom:2px solid var(--gold)}\n#ee-home .eeh-form button:hover{background:var(--navy2)}\n#ee-home .eeh-form .msg{font-size:15.5px;align-self:center}\n#ee-home .eeh-hp{position:absolute;left:-9999px}\n\n/* ---------- footer ---------- */\n#ee-home .eeh-foot{margin-top:30px;padding:18px 0 0;border-top:2px solid var(--navy);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;font-size:15.5px;color:var(--muted)}\n#ee-home .eeh-foot nav{display:flex;flex-wrap:wrap;gap:6px 18px}\n#ee-home .eeh-foot a{color:var(--navy);text-decoration:none;font-weight:700}\n#ee-home .eeh-foot a:hover{text-decoration:underline}\n@media (max-width:860px){\n  #ee-home .eeh-posts{grid-template-columns:1fr 1fr}\n  #ee-home .eeh-data{grid-template-columns:1fr}\n}\n@media (max-width:600px){\n  #ee-home .eeh-hero h1{font-size:26px}\n  #ee-home .eeh-posts{grid-template-columns:1fr}\n  #ee-home .eeh-form{grid-template-columns:1fr}\n  #ee-home .eeh-countries{grid-template-columns:repeat(2,minmax(0,1fr))}\n}\n/* ---------- party database ---------- */\n#ee-home .eeh-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:16px}\n#ee-home .eeh-stat{background:var(--soft);border-radius:4px;padding:10px 12px;border-left:3px solid var(--gold)}\n#ee-home .eeh-stat b{display:block;font-size:28px;line-height:1;font-weight:700;color:var(--navy);font-variant-numeric:tabular-nums}\n#ee-home .eeh-stat span{display:block;font-size:14.5px;color:var(--muted);margin-top:4px;line-height:1.2}\n#ee-home .eeh-db-list{list-style:none;margin:0;padding:0}\n#ee-home .eeh-db-list li > a{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid #f0efea;text-decoration:none;color:var(--ink)}\n#ee-home .eeh-db-list li > a:hover .nm{text-decoration:underline}\n#ee-home .eeh-db-list .iso{font-size:12px;font-weight:700;color:#fff;background:var(--navy);border-radius:3px;padding:3px 0;text-align:center}\n#ee-home .eeh-db-list .nm{font-size:17px;font-weight:700;line-height:1.15}\n#ee-home .eeh-db-list .ab{font-weight:600;color:var(--muted)}\n#ee-home .eeh-db-list .meta{display:block;font-size:14.5px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#ee-home .eeh-pill{padding:3px 10px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:.03em;white-space:nowrap}\n#ee-home .eeh-db-eu{margin-top:18px;padding-top:14px;border-top:1px solid #efeee9}\n#ee-home .eeh-eubar{display:flex;height:22px;border-radius:3px;overflow:hidden;margin:8px 0}\n#ee-home .eeh-eubar i{display:block;height:100%}\n#ee-home .eeh-eukey{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:14.5px;color:var(--muted)}\n#ee-home .eeh-eukey span{display:inline-flex;align-items:center;gap:6px}\n#ee-home .eeh-eukey i{width:10px;height:10px;border-radius:2px;display:inline-block}\n#ee-home .eeh-more{margin-top:10px;align-self:flex-start;padding:8px 14px;border:1px solid var(--line);border-radius:4px;background:#fff;font:inherit;font-size:15.5px;font-weight:700;color:var(--navy);cursor:pointer}\n#ee-home .eeh-more:hover{border-color:var(--navy);background:var(--soft)}\n@media (max-width:600px){#ee-home .eeh-stats{grid-template-columns:1fr 1fr}#ee-home .eeh-db-list li > a{grid-template-columns:30px minmax(0,1fr)}#ee-home .eeh-db-list .eeh-pill{grid-column:2;justify-self:start}}\n"; document.head.appendChild(st);
  host.innerHTML = "<div id=\"ee-home\">\n\n  <h1 class=\"eeh-sr\">Europe Elects \u2013 polls, elections and parties across Europe</h1>\n\n  <!-- ===== Featured dashboard ===== -->\n  <div class=\"eeh-feature\">\n<a class=\"eeh-feat\" href=\"https://europeelects.eu/2026/06/02/presidential-election-in-france-2027/\">\n    <span class=\"eeh-feat-im\"><img src=\"https://europe-elects.github.io/country-pages/home/featured.png\" alt=\"\"></span>\n    <span class=\"eeh-feat-tx\"><span class=\"eeh-feat-k\">Featured</span><span class=\"eeh-feat-t\">Election Dashboard: France 2027</span></span>\n    <span class=\"eeh-feat-go\" aria-hidden=\"true\">\u2192</span></a>\n  </div>\n\n  <!-- ===== Support ===== -->\n  <section class=\"eeh-support\" aria-label=\"Support Europe Elects\">\n    <div>\n      <span class=\"k\">Support us</span>\n      <h2>Back independent election coverage</h2>\n      <p>Your support funds our polling averages, seat projections and databases.</p>\n    </div>\n    <div class=\"eeh-btns\">\n      <a class=\"eeh-s\" style=\"--c:#FF424D\" href=\"https://www.patreon.com/c/EuropeElects\" target=\"_blank\" rel=\"noopener\">\n        <span class=\"ic\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"15\" cy=\"9.5\" r=\"6.5\" fill=\"currentColor\"/><rect x=\"3\" y=\"3\" width=\"3.6\" height=\"18\" fill=\"currentColor\"/></svg></span>\n        <b>Patreon</b><small>Monthly support</small></a>\n      <a class=\"eeh-s\" style=\"--c:#29ABE0\" href=\"https://ko-fi.com/europeelects\" target=\"_blank\" rel=\"noopener\">\n        <span class=\"ic\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 7h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z\" fill=\"currentColor\"/><path d=\"M16 9h1.5a2.5 2.5 0 0 1 0 5H16\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/></svg></span>\n        <b>Ko-fi</b><small>Buy us a coffee</small></a>\n      <a class=\"eeh-s\" style=\"--c:#00B964\" href=\"https://www.gofundme.com/f/europe-elects-empowering-european-citizens\" target=\"_blank\" rel=\"noopener\">\n        <span class=\"ic\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z\" fill=\"currentColor\"/></svg></span>\n        <b>GoFundMe</b><small>One-off donation</small></a>\n      <a class=\"eeh-s\" style=\"--c:#E41321\" href=\"https://www.redbubble.com/people/EuropeElects/shop\" target=\"_blank\" rel=\"noopener\">\n        <span class=\"ic\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M8 3l-5 3 2 4 2-1v12h10V9l2 1 2-4-5-3a4 4 0 0 1-8 0z\" fill=\"currentColor\"/></svg></span>\n        <b>Shop</b><small>Merch on Redbubble</small></a>\n    </div>\n  </section>\n\n  <!-- ===== EP projection + live feed ===== -->\n  <div class=\"eeh-row\">\n    <section class=\"eeh-panel\">\n      <a class=\"eeh-bar\" href=\"https://europeelects.eu/ep2029\"><span class=\"t\">European Parliament Projection</span><span class=\"m\">More \u2192</span></a>\n      <div class=\"eeh-body\">\n        <p class=\"eeh-sub\">Projected seats per European Parliament group \u00b7 Hover over the trend for earlier months, or over a country for its breakdown</p>\n        <div id=\"eeh-bars\" class=\"eeh-bars\"><div class=\"eeh-status\">Loading the projection\u2026</div></div>\n        <div id=\"eeh-trend\" class=\"eeh-trend\" hidden></div>\n        <div id=\"eeh-map\" class=\"eeh-map\" hidden><div id=\"eeh-tip\" class=\"eeh-tip\"></div></div>\n      </div>\n    </section>\n    <aside class=\"eeh-panel\">\n      <a class=\"eeh-bar live\" href=\"https://europeelects.eu/latest/\"><span class=\"t\">Live</span><span class=\"m\">Latest \u2192</span></a>\n      <div class=\"eeh-live\"><div class=\"eeh-live-scroll\"><bsky-embed username=\"europeelects.bsky.social\" limit=\"8\"></bsky-embed></div></div>\n      <a class=\"eeh-follow\" href=\"https://bsky.app/profile/europeelects.bsky.social\" target=\"_blank\" rel=\"noopener\">\n        <svg width=\"16\" height=\"14\" viewBox=\"0 0 600 530\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M136 44c66 50 138 151 164 205 26-54 98-155 164-205 48-36 126-63 126 25 0 17-10 147-16 168-20 73-95 92-162 80 117 20 147 86 82 152-122 126-176-32-189-72l-5-15-5 15c-13 40-67 198-189 72-65-66-35-132 82-152-67 12-142-7-162-80C20 216 10 86 10 69c0-88 78-61 126-25z\"/></svg>\n        Follow @europeelects.bsky.social</a>\n    </aside>\n  </div>\n\n  <!-- ===== Latest analysis (WordPress posts) ===== -->\n  <section class=\"eeh-panel eeh-wide\" id=\"eeh-posts-panel\" hidden>\n    <a class=\"eeh-bar\" href=\"https://europeelects.eu/posts/\"><span class=\"t\">Latest Analysis</span><span class=\"m\">All articles \u2192</span></a>\n    <div class=\"eeh-body\"><div class=\"eeh-posts\" id=\"eeh-posts\"></div></div>\n  </section>\n\n  <!-- ===== Polling for the next election + calendar ===== -->\n  <div class=\"eeh-row\">\n    <section class=\"eeh-panel eeh-poll\">\n      <div class=\"eeh-bar\"><span class=\"t\">Polling in Upcoming Elections</span></div>\n      <div class=\"eeh-body\">\n        <iframe id=\"eeh-poll-frame\" title=\"Polling average for the next national parliament election\" aria-label=\"Line chart\" scrolling=\"no\" height=\"760\" data-external=\"1\"></iframe>\n      </div>\n    </section>\n    <aside class=\"eeh-panel\">\n      <a class=\"eeh-bar\" href=\"https://europeelects.eu/calendar/\"><span class=\"t\">Electoral Calendar</span><span class=\"m\">Full Calendar \u2192</span></a>\n      <div class=\"eeh-body\">\n        <ul id=\"eeh-cal\" class=\"eeh-cal\"><li class=\"eeh-status\" style=\"display:block\">Loading the calendar\u2026</li></ul>\n        <button type=\"button\" class=\"eeh-more\" id=\"eeh-cal-more\" hidden></button>\n        <div class=\"eeh-key\" id=\"eeh-cal-key\"></div>\n      </div>\n    </aside>\n  </div>\n\n\n  <!-- ===== Party registrations + podcast ===== -->\n  <div class=\"eeh-row top\">\n    <section class=\"eeh-panel\">\n      <a class=\"eeh-bar\" href=\"https://europeelects.eu/parties/\"><span class=\"t\">Party Database</span><span class=\"m\">Full Party Database \u2192</span></a>\n      <div class=\"eeh-body\">\n        <div class=\"eeh-stats\" id=\"eeh-db-stats\"></div>\n        <input class=\"eeh-find\" id=\"eeh-db-find\" type=\"search\" placeholder=\"Search parties by name or abbreviation\u2026\" aria-label=\"Search the party database\">\n        <p class=\"eeh-h\" id=\"eeh-db-h\">New in the database</p>\n        <ul class=\"eeh-db-list\" id=\"eeh-db-list\"><li class=\"eeh-status\">Loading the party database\u2026</li></ul>\n        <div class=\"eeh-db-eu\" id=\"eeh-db-eu\"></div>\n      </div>\n    </section>\n    <div class=\"eeh-col-stack\">\n    <aside class=\"eeh-panel\">\n      <div class=\"eeh-bar\"><span class=\"t\">Podcast</span></div>\n      <div class=\"eeh-body\">\n        <iframe class=\"eeh-pod\" title=\"Europe Elects podcast on Spotify\" src=\"https://open.spotify.com/embed/show/68qAw4ymY4qHHzTl4UondG?utm_source=generator\" height=\"352\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>\n      </div>\n    </aside>\n    <aside class=\"eeh-panel\">\n      <a class=\"eeh-bar\" href=\"https://europeelects.substack.com/\"><span class=\"t\">Newsletter</span><span class=\"m\">Archive \u2192</span></a>\n      <div class=\"eeh-body\">\n        <p class=\"eeh-sub\" style=\"margin-bottom:10px\">The week's polls and elections in your inbox.</p>\n        <iframe class=\"eeh-sub-frame\" title=\"Subscribe to the Europe Elects newsletter\" src=\"https://europeelects.substack.com/embed\" frameborder=\"0\" scrolling=\"no\" loading=\"lazy\"></iframe>\n        <div class=\"eeh-social\">\n          <a href=\"https://bsky.app/profile/europeelects.bsky.social\" target=\"_blank\" rel=\"noopener\">Bluesky</a>\n          <a href=\"https://x.com/EuropeElects\" target=\"_blank\" rel=\"noopener\">X / Twitter</a>\n          <a href=\"https://open.spotify.com/show/68qAw4ymY4qHHzTl4UondG\" target=\"_blank\" rel=\"noopener\">Spotify</a>\n          <a href=\"https://www.patreon.com/c/EuropeElects\" target=\"_blank\" rel=\"noopener\">Patreon</a>\n        </div>\n      </div>\n    </aside>\n    </div>\n  </div>\n\n  <!-- ===== Data access ===== -->\n  <section class=\"eeh-panel eeh-wide\" id=\"eeh-data-access\">\n    <a class=\"eeh-bar\" href=\"https://europeelects.eu/data/\"><span class=\"t\">Data Access</span><span class=\"m\">Terms &amp; details \u2192</span></a>\n    <div class=\"eeh-body\">\n      <div class=\"eeh-data\">\n        <div>\n          <h3>Need our data?</h3>\n          <p style=\"font-size:16px;color:var(--muted)\">Our polling database covers national polls since January 2018, with pollster, commissioner, fieldwork dates, sample size and results for every poll.</p>\n          <div class=\"eeh-path\">\n            <b>Students and academic researchers</b>\n            <span>Polling data as a CSV file per country, for non-commercial academic use. A processing fee per country applies, and any use must credit Europe Elects.</span>\n            <a href=\"https://europeelects.eu/data/\">How to request academic access \u2192</a>\n          </div>\n          <div class=\"eeh-path\">\n            <b>Commercial users, media and bulk access</b>\n            <span>For commercial use, bulk access or recurring data deliveries, contact us with the form or at <a href=\"mailto:contact@europeelects.eu\">contact@europeelects.eu</a>.</span>\n          </div>\n        </div>\n        <form class=\"eeh-form\" id=\"eeh-form\" novalidate>\n          <label>Name<input name=\"name\" autocomplete=\"name\" required></label>\n          <label>Email<input name=\"email\" type=\"email\" autocomplete=\"email\" required></label>\n          <label>Organisation<input name=\"organisation\" autocomplete=\"organization\"></label>\n          <label>Type of use<select name=\"use\"><option>Commercial</option><option>Media / journalism</option><option>Non-profit</option><option>Academic / student</option></select></label>\n          <p class=\"full eeh-hint\" id=\"eeh-acad\" hidden>Academic requests are handled through the processing fee. The steps are on our <a href=\"https://europeelects.eu/data/\">data page</a>; use this form only if you have a question.</p>\n          <label>Data needed<select name=\"dataset\">\n            <option>Polling data</option><option>Bulk access / recurring deliveries</option><option>Other data</option></select></label>\n          <label>Countries and time period<input name=\"scope\" placeholder=\"e.g. Germany and Austria, 2020\u2013today\"></label>\n          <label class=\"full\">What will you use the data for?<textarea name=\"purpose\" required></textarea></label>\n          <input class=\"eeh-hp\" name=\"website\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\">\n          <label class=\"full chk\"><input type=\"checkbox\" name=\"consent\" required> I agree that Europe Elects may use these details to answer my request (see the <a href=\"https://europeelects.eu/wpautoterms/gdpr-privacy-policy/\" target=\"_blank\" rel=\"noopener\">privacy policy</a>).</label>\n          <button type=\"submit\">Send enquiry</button><span class=\"msg\" id=\"eeh-form-msg\" role=\"status\"></span>\n        </form>\n      </div>\n    </div>\n  </section>\n\n\n</div>";
  var bs = document.createElement('script'); bs.type = 'module'; bs.async = true; bs.src = 'https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js'; document.head.appendChild(bs);
  function load(src) { return new Promise(function (ok) { if (src.test()) return ok(); var s = document.createElement('script'); s.src = src.url; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  load({ url: 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js', test: function () { return !!window.d3; } })
    .then(function () { return load({ url: 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js', test: function () { return !!window.topojson; } }); })
    .then(run);
  // Inside an iframe (home.html embedded elsewhere): report the height so the frame can resize.
  if (window.parent !== window && 'ResizeObserver' in window) new ResizeObserver(function () { window.parent.postMessage({ 'datawrapper-height': { 'ee-home': document.documentElement.scrollHeight } }, '*'); }).observe(document.body);
  function run() {

(function () {
/* ================= Settings ================= */
// Country pages on GitHub Pages: ?country=next picks the next national parliament election that has a recent polling average.
const POLL_FRAME_URL = 'https://europe-elects.github.io/country-pages/?country=next&view=polling';
// Electoral calendar (Google Sheet, shared "Anyone with the link can view"). Columns: Country, Specification, Type, Mode, Sequence, (Expected) Date, Date Status
const CALENDAR = { sheetId: '1Wdx_eDbVv2XaMlSoYnzauLch_47xWHjP181iVV8QIrM', gid: '0' };
const CALENDAR_ROWS = 12;         // upcoming elections listed at first; "Show more" adds this many each time
const CALENDAR_SKIP_BY_ELECTIONS = true;
// EP projection: per-country sheet (one column per month, e.g. "Sep-26") and the headline sheet (group, 2024 result, current).
const PROJ_URL = 'https://opensheet.elk.sh/1MJY1jUwtom8aNadqYkYp3iH2jhWc1RU43HbtKu2-KQQ/1';
const HEADLINE_URL = 'https://opensheet.elk.sh/1sO807T0QFc9Lp4u-m2ZdZSu7dAuWjh1Xa1j0DAIdI6Q/1';
const EP_SEATS = 720;
// Latest articles: WordPress REST API of the site (hidden if it can't be reached).
const POSTS_API = 'https://europeelects.eu/wp-json/wp/v2/posts?per_page=3&_embed=wp:featuredmedia';
// Country links. {iso} = ISO-2 code, {slug} = country name in lower case with dashes (e.g. bosnia-and-herzegovina).
const COUNTRY_URL = 'https://europe-elects.github.io/country-pages/?country={iso}';
const COUNTRIES = [["Albania", "AL"], ["Andorra", "AD"], ["Armenia", "AM"], ["Austria", "AT"], ["Azerbaijan", "AZ"], ["Belarus", "BY"], ["Belgium", "BE"], ["Bosnia and Herzegovina", "BA"], ["Bulgaria", "BG"], ["Croatia", "HR"], ["Cyprus", "CY"], ["Czechia", "CZ"], ["Denmark", "DK"], ["Estonia", "EE"], ["Faroe Islands", "FO"], ["Finland", "FI"], ["France", "FR"], ["Georgia", "GE"], ["Germany", "DE"], ["Greece", "GR"], ["Greenland", "GL"], ["Guernsey", "GG"], ["Hungary", "HU"], ["Iceland", "IS"], ["Ireland", "IE"], ["Isle of Man", "IM"], ["Italy", "IT"], ["Jersey", "JE"], ["Kosovo", "XK"], ["Latvia", "LV"], ["Liechtenstein", "LI"], ["Lithuania", "LT"], ["Luxembourg", "LU"], ["Malta", "MT"], ["Moldova", "MD"], ["Monaco", "MC"], ["Montenegro", "ME"], ["Netherlands", "NL"], ["North Macedonia", "MK"], ["Norway", "NO"], ["Poland", "PL"], ["Portugal", "PT"], ["Romania", "RO"], ["Russian Federation", "RU"], ["San Marino", "SM"], ["Serbia", "RS"], ["Slovakia", "SK"], ["Slovenia", "SI"], ["Spain", "ES"], ["Sweden", "SE"], ["Switzerland", "CH"], ["Turkey", "TR"], ["Ukraine", "UA"], ["United Kingdom", "GB"], ["Åland Islands", "AX"]];
// Data access form. Set ONE of these: endpoint = a form service URL (e.g. Formspree) that accepts POST,
// or email = address the visitor's mail program opens a pre-filled message to. With neither, the form opens DATA_ACCESS_URL.
const DATA_FORM = { endpoint: '', email: 'contact@europeelects.eu' };
const DATA_ACCESS_URL = 'https://europeelects.eu/data/';
// Party database (full sheet). Falls back to the published CSV if the sheet can't be read directly.
const PARTY_DB = { sheetId: '1MAdqaO7SU4uhjjbaDoTGdj7DPZ_NuWvjTnAcrUnTHY8', gid: '959052694',
  publishedCsv: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR35PF-ZwAVgUSBPpOKPyBNXyGBzFIl0g5zBiGKqBHA5y8Fqu15fb-5YNy43fmcbVlI4A0-VulJOU29/pub?gid=0&single=true&output=csv' };
const PARTY_NEW_ROWS = 8; // newest parties listed

/* ================= Shared ================= */
const root = document.getElementById('ee-home');
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/* ================= Polling iframe ================= */
document.getElementById('eeh-poll-frame').src = POLL_FRAME_URL;
// Resize embedded frames (country pages and Datawrapper both send "datawrapper-height").
window.addEventListener('message', (e) => {
  const d = e.data && e.data['datawrapper-height']; if (!d) return;
  document.querySelectorAll('iframe').forEach((f) => { if (f.contentWindow === e.source) for (const k in d) f.style.height = d[k] + 'px'; });
});

/* ================= Electoral calendar ================= */
const KIND_COLORS = { parliament: '#0F7591', president: '#B35600', european: '#2A5DB0', regional: '#4E7A2A', local: '#A8459A', referendum: '#5B6170', other: '#8A9099' };
const KIND_LABELS = { parliament: 'National parliament', president: 'Presidential', european: 'European', regional: 'Regional', local: 'Local', referendum: 'Referendum' };
function kindOf(type) {
  const t = String(type || '').toLowerCase();
  if (/europ/.test(t)) return 'european';
  if (/region|provinc|subnational|state (parliament|assembly|election)/.test(t)) return 'regional';
  if (/referend/.test(t)) return 'referendum';
  if (/local|municipal/.test(t)) return 'local';
  if (/presiden|head of state/.test(t)) return 'president';
  if (/parliament|legislat|national/.test(t)) return 'parliament';
  return 'other';
}
function parseDate(raw) {
  const t = String(raw || '').trim(); let m;
  const mi = (w) => MON.indexOf(String(w).slice(0, 3).toLowerCase());
  if ((m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return { d: new Date(+m[1], +m[2] - 1, +m[3]), p: 'day' };
  if ((m = t.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/))) return { d: new Date(+m[3], +m[2] - 1, +m[1]), p: 'day' };
  if ((m = t.match(/^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/)) && mi(m[1]) >= 0) return { d: new Date(+m[3], mi(m[1]), +m[2]), p: 'day' };
  if ((m = t.match(/^(\d{1,2})\.?\s+([A-Za-z]+)\.?,?\s+(\d{4})$/)) && mi(m[2]) >= 0) return { d: new Date(+m[3], mi(m[2]), +m[1]), p: 'day' };
  if ((m = t.match(/^([A-Za-z]+)\.?\s+(\d{4})$/)) && mi(m[1]) >= 0) return { d: new Date(+m[2], mi(m[1]) + 1, 0), p: 'month' };
  if ((m = t.match(/^(\d{4})$/))) return { d: new Date(+m[1], 11, 31), p: 'year' };
  return null;
}
function parseCSV(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
    else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const head = (rows.shift() || []).map((h) => h.trim().toLowerCase());
  return rows.filter((r) => r.some((x) => x.trim())).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()])));
}
async function loadCalendar() {
  const list = document.getElementById('eeh-cal');
  try {
    const res = await fetch(`https://docs.google.com/spreadsheets/d/${CALENDAR.sheetId}/gviz/tq?tqx=out:csv&headers=1&gid=${CALENDAR.gid}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const rows = parseCSV(await res.text()).map((o) => ({ o, when: parseDate(o['(expected) date'] || o['expected date'] || o['date']) }))
      .filter((x) => x.when && x.when.d >= today && x.o['country'])
      .filter((x) => !CALENDAR_SKIP_BY_ELECTIONS || !/by[\s-]?election|partial|supplementary/i.test([x.o['type'], x.o['specification'], x.o['sequence']].join(' ')))
      .sort((a, b) => a.when.d - b.when.d);
    // Same country, type and date (e.g. several regions voting together) -> one line.
    const merged = [];
    rows.forEach((x) => {
      const k = [x.o['country'], kindOf(x.o['type']), x.when.d.getTime()].join('|');
      const hit = merged.find((m) => m.k === k);
      if (hit) { if (x.o['specification']) hit.specs.push(x.o['specification']); return; }
      merged.push({ k, ...x, specs: x.o['specification'] ? [x.o['specification']] : [] });
    });
    let shown = CALENDAR_ROWS;
    const render = () => {
    const show = merged.slice(0, shown);
    if (!show.length) { list.innerHTML = '<li class="eeh-status" style="display:block">No upcoming elections listed.</li>'; return; }
    list.innerHTML = show.map((x) => {
      const kind = kindOf(x.o['type']), col = KIND_COLORS[kind];
      const confirmed = /^confirmed/i.test(x.o['date status'] || '');
      const d = x.when.d;
      const big = x.when.p === 'day' ? d.getDate() : x.when.p === 'month' ? d.toLocaleDateString('en-GB', { month: 'short' }) : d.getFullYear();
      const small = x.when.p === 'day' ? d.toLocaleDateString('en-GB', { month: 'short' }) + ' ' + String(d.getFullYear()).slice(2) : x.when.p === 'month' ? d.getFullYear() : 'tbc';
      const type = x.o['type'] ? x.o['type'].replace(/\s*\((bicameral|unicameral)\)/i, '').replace(/^./, (c) => c.toUpperCase()) : (KIND_LABELS[kind] || 'Election');
      const spec = x.specs.length > 2 ? `${x.specs.length} ${kind === 'regional' ? 'regions' : 'votes'}` : x.specs.join(', ');
      const detail = [type + (spec ? ` (${spec})` : ''), x.o['sequence'] && !/single/i.test(x.o['sequence']) ? x.o['sequence'] : '', confirmed ? '' : 'date not confirmed'].filter(Boolean).join(' · ');
      return `<li><span class="eeh-date${confirmed ? '' : ' tbc'}" style="background:${col};color:${col}" title="${confirmed ? 'Date confirmed' : 'Expected date, not confirmed'}"><b style="color:${confirmed ? '#fff' : col}">${esc(big)}</b><small style="color:${confirmed ? '#fff' : col}">${esc(small)}</small></span>
        <span><span class="n">${esc(x.o['country'])}</span><br><span class="d">${esc(detail)}</span></span></li>`;
    }).join('');
    const kinds = [...new Set(show.map((x) => kindOf(x.o['type'])))].filter((k) => KIND_LABELS[k]);
    document.getElementById('eeh-cal-key').innerHTML = kinds.map((k) => `<span><i style="background:${KIND_COLORS[k]}"></i>${KIND_LABELS[k]}</span>`).join('')
      + '<span><i style="border:1.5px dashed #5f5e5a"></i>Expected date</span>';
    const more = document.getElementById('eeh-cal-more');
    more.hidden = shown >= merged.length;
    more.textContent = `Show more elections (${merged.length - shown} more)`;
    };
    document.getElementById('eeh-cal-more').onclick = () => { shown += CALENDAR_ROWS; render(); };
    render();
  } catch (e) {
    list.innerHTML = `<li class="eeh-status err" style="display:block">Couldn't load the calendar (${esc(e.message)}).</li>`;
  }
}

/* ================= EP projection ================= */
const GROUP_COLORS = { 'EPP': '#3399FF', 'S&D': '#FF0000', 'PfE': '#000000', 'ECR': '#0000FF', 'RE': '#FFD700', 'G/EFA': '#009900', 'LEFT': '#990000', 'ESN': '#70463A', 'NI': '#888780', 'unaffiliated': '#c4c4c4' };
const GROUP_LABELS = { 'EPP': 'Centre-right EPP', 'S&D': 'Centre-left S&D', 'PfE': 'Right-wing PfE', 'ECR': 'National-conservative ECR', 'RE': 'Liberal RE', 'LEFT': 'Left', 'G/EFA': 'Greens/EFA', 'ESN': 'Far-right ESN', 'NI': 'Non-Inscrits', 'unaffiliated': 'Unaffiliated' };
const GROUP_ORDER = ['EPP', 'S&D', 'PfE', 'ECR', 'RE', 'LEFT', 'G/EFA', 'ESN', 'NI', 'unaffiliated'];
const GROUP_ALIASES = { 'renew': 'RE', 'renew europe': 'RE', 'greens/efa': 'G/EFA', 'greens': 'G/EFA', 'the left': 'LEFT', 'left': 'LEFT', 'patriots': 'PfE', 'pfe': 'PfE', 'ni': 'NI', 'non-inscrits': 'NI', 'unaffiliated': 'unaffiliated', 'new': 'unaffiliated' };
const normGroup = (g) => { const t = String(g || '').trim(); return GROUP_COLORS[t] ? t : (GROUP_ALIASES[t.toLowerCase()] || t); };
const HEADLINE_RULES = [[/centre-?right/i, 'EPP'], [/centre-?left/i, 'S&D'], [/right-?wing/i, 'PfE'], [/national-?conse/i, 'ECR'], [/liberal/i, 'RE'], [/greens/i, 'G/EFA'], [/far-?right/i, 'ESN'], [/non-?inscrits/i, 'NI'], [/unaffiliated/i, 'unaffiliated'], [/left/i, 'LEFT']];
const NAME_TO_ISO = { 'Austria': '040', 'Belgium': '056', 'Bulgaria': '100', 'Croatia': '191', 'Cyprus': '196', 'Czechia': '203', 'Czech Republic': '203', 'Denmark': '208', 'Estonia': '233', 'Finland': '246', 'France': '250', 'Germany': '276', 'Greece': '300', 'Hungary': '348', 'Ireland': '372', 'Italy': '380', 'Latvia': '428', 'Lithuania': '440', 'Luxembourg': '442', 'Malta': '470', 'Netherlands': '528', 'Poland': '616', 'Portugal': '620', 'Romania': '642', 'Slovakia': '703', 'Slovenia': '705', 'Spain': '724', 'Sweden': '752' };
const ISO_TO_NAME = {}; Object.entries(NAME_TO_ISO).forEach(([n, i]) => { if (!ISO_TO_NAME[i]) ISO_TO_NAME[i] = n; });

// Month columns such as "Sep-26", "February-26", "Sept 2026".
function monthOf(h) {
  const m = String(h).trim().match(/^([A-Za-z]+)\.?[\s-]*(\d{2}|\d{4})$/); if (!m) return null;
  const i = MON.indexOf(m[1].slice(0, 3).toLowerCase()); if (i < 0) return null;
  return new Date(m[2].length === 2 ? 2000 + +m[2] : +m[2], i, 1);
}
let P = null; // { months:[Date], data:[{country:{group:seats}}], totals:[{group:seats}], r2024, sel }
async function loadProjection() {
  const bars = document.getElementById('eeh-bars');
  try {
    const [rows, head] = await Promise.all([fetch(PROJ_URL).then((r) => { if (!r.ok) throw new Error('projection sheet HTTP ' + r.status); return r.json(); }),
      fetch(HEADLINE_URL).then((r) => (r.ok ? r.json() : [])).catch(() => [])]);
    if (!rows.length) throw new Error('no rows in the projection sheet');
    const cols = Object.keys(rows[0]).map((k) => ({ k, d: monthOf(k) })).filter((x) => x.d).sort((a, b) => a.d - b.d);
    if (!cols.length) throw new Error('no month columns found');
    const data = cols.map(() => ({})), totals = cols.map(() => ({}));
    rows.forEach((r) => {
      const c = String(r['Country'] || '').trim(), g = normGroup(r['EU Parliament group']); if (!c || !g) return;
      cols.forEach(({ k }, i) => {
        const v = parseFloat(String(r[k] || '').replace(',', '.')); if (!isFinite(v)) return;
        (data[i][c] = data[i][c] || {})[g] = (data[i][c][g] || 0) + v;
        totals[i][g] = (totals[i][g] || 0) + v;
      });
    });
    // Drop months without any data (e.g. an empty column for the coming month).
    for (let i = cols.length - 1; i >= 0; i--) if (!Object.keys(totals[i]).length) { cols.splice(i, 1); data.splice(i, 1); totals.splice(i, 1); }
    const r2024 = {}, headNow = {};
    head.forEach((r) => {
      // Label = the text column; "2024" column = the 2024 result; the other number = current projection.
      const ent = Object.entries(r), lab = ent.find(([, v]) => !isFinite(parseFloat(v))), nums = ent.filter(([, v]) => isFinite(parseFloat(v)));
      const n24 = nums.find(([k]) => /2024/.test(k)) || nums[0], nCur = nums.find((x) => x !== n24);
      const label = lab ? lab[1] : '', a = n24 ? n24[1] : '', b = nCur ? nCur[1] : ''; const rule = HEADLINE_RULES.find(([re]) => re.test(String(label || '').trim())); if (!rule) return;
      const v24 = parseFloat(a), cur = parseFloat(b);
      if (isFinite(v24)) r2024[rule[1]] = v24;
      if (isFinite(cur)) headNow[rule[1]] = cur; // headline sheet is authoritative for the latest month's bars
    });
    P = { months: cols.map((c) => c.d), data, totals, r2024, headNow, sel: cols.length - 1 };
    drawBars(); drawTrend(); drawMap();
  } catch (e) {
    bars.innerHTML = `<div class="eeh-status err">Couldn't load the projection (${esc(e.message)}). Check that the sheets are shared as “Anyone with the link can view”.</div>`;
  }
}
const monthTxt = (d) => d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
function drawBars() {
  const t = P.sel === P.totals.length - 1 && Object.keys(P.headNow).length ? { ...P.totals[P.sel], ...P.headNow } : P.totals[P.sel], groups = GROUP_ORDER.filter((g) => t[g] != null);
  const max = Math.max(1, ...groups.map((g) => t[g]));
  const hasBase = Object.keys(P.r2024).length > 0;
  document.getElementById('eeh-bars').innerHTML = `<p class="eeh-h">Projected seats, ${esc(monthTxt(P.months[P.sel]))}${hasBase ? ' <span style="font-weight:400;text-transform:none;letter-spacing:0;color:#8a8a86">(change vs. 2024 election)</span>' : ''}</p>`
    + groups.map((g) => {
      const ch = hasBase ? Math.round(t[g] - (P.r2024[g] || 0)) : null;
      return `<div class="r"><div class="l">${esc(GROUP_LABELS[g] || g)}</div><div class="tr"><div class="f" style="width:${t[g] / max * 100}%;background:${GROUP_COLORS[g] || '#888'}"></div></div>
        <div class="v">${Math.round(t[g])}</div><div class="c ${ch > 0 ? 'pos' : ch < 0 ? 'neg' : 'neu'}">${ch == null ? '' : (ch > 0 ? '+' : '') + ch}</div></div>`;
    }).join('') + `<p class="eeh-maj">${EP_SEATS} seats · majority ${Math.floor(EP_SEATS / 2) + 1}</p>`;
}
function drawTrend() {
  const host = document.getElementById('eeh-trend'); if (P.months.length < 2) return; host.hidden = false;
  const W = 640, H = 190, m = { l: 30, r: 44, t: 8, b: 22 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const groups = GROUP_ORDER.filter((g) => P.totals.some((t) => t[g] != null) && g !== 'unaffiliated');
  const ymax = Math.ceil(Math.max(...P.totals.flatMap((t) => groups.map((g) => t[g] || 0))) / 50) * 50;
  const x = (i) => m.l + i / (P.months.length - 1) * iw, y = (v) => m.t + ih - v / ymax * ih;
  let s = '';
  for (let v = 0; v <= ymax; v += 50) s += `<line x1="${m.l}" x2="${m.l + iw}" y1="${y(v)}" y2="${y(v)}" stroke="#ecebe6"/><text x="${m.l - 6}" y="${y(v) + 4}" text-anchor="end" font-size="12.5" fill="#8a8a86">${v}</text>`;
  P.months.forEach((d, i) => { if (d.getMonth() === 0 || i === 0) s += `<text x="${x(i)}" y="${H - 6}" text-anchor="${i === 0 ? 'start' : 'middle'}" font-size="12.5" fill="#8a8a86">${d.getMonth() === 0 ? d.getFullYear() : d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</text>`; });
  groups.forEach((g) => {
    const pts = P.totals.map((t, i) => (t[g] == null ? null : [x(i), y(t[g])])).filter(Boolean);
    s += `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${GROUP_COLORS[g]}" stroke-width="2" stroke-linejoin="round"/>`;
  });
  // End labels (nudged apart)
  const last = P.totals.length - 1, labs = groups.map((g) => ({ g, y: y(P.totals[last][g] || 0) })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < labs.length; i++) if (labs[i].y - labs[i - 1].y < 11) labs[i].y = labs[i - 1].y + 11;
  labs.forEach((l) => { s += `<text x="${m.l + iw + 5}" y="${l.y + 4}" font-size="12" font-weight="700" fill="${GROUP_COLORS[l.g] === '#FFD700' ? '#9a8000' : GROUP_COLORS[l.g]}">${esc(l.g)}</text>`; });
  s += `<line id="eeh-cur" y1="${m.t}" y2="${m.t + ih}" stroke="#001936" stroke-dasharray="3 3" x1="${x(P.sel)}" x2="${x(P.sel)}"/>`;
  s += `<rect id="eeh-hit" x="${m.l}" y="0" width="${iw}" height="${H}" fill="transparent" style="cursor:crosshair"/>`;
  host.innerHTML = `<div class="eeh-trend-h"><span>Seats per group over time</span><b id="eeh-trend-m">${esc(monthTxt(P.months[P.sel]))}</b></div>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Projected seats per European Parliament group, ${esc(monthTxt(P.months[0]))} to ${esc(monthTxt(P.months[last]))}">${s}</svg>`;
  const svg = host.querySelector('svg'), hit = host.querySelector('#eeh-hit');
  const pick = (ev) => {
    const r = svg.getBoundingClientRect(), px = ((ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left) / r.width * W;
    const i = Math.max(0, Math.min(P.months.length - 1, Math.round((px - m.l) / iw * (P.months.length - 1))));
    if (i !== P.sel) select(i);
  };
  hit.addEventListener('mousemove', pick); hit.addEventListener('touchstart', pick, { passive: true }); hit.addEventListener('touchmove', pick, { passive: true });
  hit.addEventListener('mouseleave', () => select(P.months.length - 1));
  function select(i) {
    P.sel = i; const l = host.querySelector('#eeh-cur'); l.setAttribute('x1', x(i)); l.setAttribute('x2', x(i));
    host.querySelector('#eeh-trend-m').textContent = monthTxt(P.months[i]); drawBars(); colourMap();
  }
}
let colourMap = () => {};
// Dot map: one dot per projected seat, clustered on each country and split into group wedges (left to right).
const SPECTRUM = ['LEFT', 'G/EFA', 'S&D', 'RE', 'EPP', 'ECR', 'PfE', 'ESN', 'NI', 'unaffiliated'];
const SMALL_STATES = { 'Malta': [14.4, 35.9], 'Luxembourg': [6.1, 49.8], 'Cyprus': [33.2, 35.0] };
const DOT_R = 3.3, DOT_GAP = 7.6; // dot radius and spacing in map units (map is 960 wide)
// The base map (Natural Earth) draws Crimea as part of Russia. Move it to Ukraine and dissolve the border.
function ukraineWithCrimea(world) {
  try {
    const geos = world.objects.countries.geometries;
    const ru = geos.find((g) => String(g.id) === '643'), ua = geos.find((g) => String(g.id) === '804');
    if (!ru || !ua || ru.type !== 'MultiPolygon') return;
    const point = [34.1, 45.3]; // central Crimea
    const i = ru.arcs.findIndex((poly) => d3.geoContains(topojson.feature(world, { type: 'Polygon', arcs: poly }), point));
    if (i < 0) return;
    const crimea = { type: 'Polygon', arcs: ru.arcs[i] };
    ru.arcs.splice(i, 1);
    const merged = topojson.mergeArcs(world, [ua, crimea]);
    ua.type = merged.type; ua.arcs = merged.arcs;
  } catch (e) { /* keep the map as it is */ }
}
function drawMap() {
  if (!window.d3 || !window.topojson) return;
  const wrap = document.getElementById('eeh-map'); wrap.hidden = false;
  const W = 960, H = 640;
  const svg = d3.select(wrap).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('role', 'img').attr('aria-label', 'Map: projected European Parliament seats per country, one dot per seat');
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json').then((r) => r.json()).then((world) => {
    ukraineWithCrimea(world);
    const feats = topojson.feature(world, world.objects.countries).features;
    // Mainland polygon only (no overseas territories or remote islands) for centring.
    const mainland = (f) => {
      if (f.geometry.type !== 'MultiPolygon') return f;
      const polys = f.geometry.coordinates.map((c) => ({ type: 'Feature', geometry: { type: 'Polygon', coordinates: c } }));
      return { ...polys.sort((a, b) => d3.geoArea(b) - d3.geoArea(a))[0], id: f.id };
    };
    const eu = feats.filter((f) => ISO_TO_NAME[String(f.id)]).map(mainland);
    const proj = d3.geoConicConformal().rotate([-12, 0]).fitExtent([[40, 30], [W - 40, H - 20]], { type: 'FeatureCollection', features: eu });
    const path = d3.geoPath(proj);
    svg.append('g').selectAll('path').data(feats).join('path').attr('d', path)
      .attr('fill', (d) => (ISO_TO_NAME[String(d.id)] ? '#e3e1d8' : '#f1f0eb')).attr('stroke', '#fff').attr('stroke-width', 0.7);
    // Cluster centres: fixed for all months (sized by the largest seat count), pushed apart where they would overlap.
    const sizeOf = (name) => Math.max(...P.data.map((m) => Object.values(m[name] || {}).reduce((a, v) => a + v, 0)));
    const nodes = eu.map((f) => { const name = ISO_TO_NAME[String(f.id)], c = path.centroid(f), n = sizeOf(name);
      return { name, x: c[0], y: c[1], ax: c[0], ay: c[1], r: DOT_GAP * 0.55 * Math.sqrt(n) + DOT_R + 2 }; });
    // Countries too small for the base map (e.g. Malta) are placed by coordinates.
    Object.entries(SMALL_STATES).forEach(([name, ll]) => { if (nodes.some((d) => d.name === name)) return; const c = proj(ll), n = sizeOf(name);
      nodes.push({ name, x: c[0], y: c[1], ax: c[0], ay: c[1], r: DOT_GAP * 0.55 * Math.sqrt(n) + DOT_R + 2 }); });
    for (let i = nodes.length - 1; i >= 0; i--) if (!isFinite(nodes[i].x) || !(nodes[i].r > DOT_R + 2)) nodes.splice(i, 1);
    const sim = d3.forceSimulation(nodes).force('x', d3.forceX((d) => d.ax).strength(0.25)).force('y', d3.forceY((d) => d.ay).strength(0.25))
      .force('c', d3.forceCollide((d) => d.r + 1.5).strength(1).iterations(3)).stop();
    for (let i = 0; i < 300; i++) sim.tick();
    const lines = svg.append('g'), dots = svg.append('g'), hits = svg.append('g');
    lines.selectAll('line').data(nodes.filter((d) => Math.hypot(d.x - d.ax, d.y - d.ay) > d.r * 0.6)).join('line')
      .attr('x1', (d) => d.ax).attr('y1', (d) => d.ay).attr('x2', (d) => d.x).attr('y2', (d) => d.y).attr('stroke', '#b9b7ae').attr('stroke-width', 1);
    lines.selectAll('circle').data(nodes.filter((d) => Math.hypot(d.x - d.ax, d.y - d.ay) > d.r * 0.6)).join('circle')
      .attr('cx', (d) => d.ax).attr('cy', (d) => d.ay).attr('r', 2).attr('fill', '#b9b7ae');
    const tip = document.getElementById('eeh-tip');
    hits.selectAll('circle').data(nodes).join('circle').attr('cx', (d) => d.x).attr('cy', (d) => d.y).attr('r', (d) => d.r).attr('fill', 'transparent').style('cursor', 'pointer')
      .on('mousemove', function (ev, d) {
        const g = P.data[P.sel][d.name]; if (!g) { tip.style.display = 'none'; return; }
        const sorted = Object.entries(g).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]), tot = sorted.reduce((a, [, v]) => a + v, 0);
        tip.innerHTML = `<strong>${esc(d.name)}</strong>` + sorted.map(([k, v]) => `<div><i style="background:${GROUP_COLORS[k] || '#888'}"></i>${esc(GROUP_LABELS[k] || k)}: <b>${v}</b></div>`).join('') + `<div class="tot">${tot} seats · ${esc(monthTxt(P.months[P.sel]))}</div>`;
        tip.style.display = 'block';
        const r = wrap.getBoundingClientRect(); let x = ev.clientX - r.left + 14; if (x + 230 > r.width) x -= 250;
        tip.style.left = x + 'px'; tip.style.top = (ev.clientY - r.top - 10) + 'px';
        d3.select(this).attr('stroke', '#001936').attr('stroke-width', 1.2);
      })
      .on('mouseleave', function () { tip.style.display = 'none'; d3.select(this).attr('stroke', null); });
    // Sunflower layout; dots sorted by angle so each group forms a wedge.
    const layout = (d) => {
      const g = P.data[P.sel][d.name] || {}, n = Math.round(Object.values(g).reduce((a, v) => a + v, 0)); if (!n) return [];
      const c = DOT_GAP * 0.55, pts = [];
      for (let i = 0; i < n; i++) { const rr = c * Math.sqrt(i + 0.5), a = i * 2.39996323; pts.push({ x: d.x + rr * Math.cos(a), y: d.y + rr * Math.sin(a), a: Math.atan2(rr * Math.sin(a), rr * Math.cos(a)) }); }
      pts.sort((p, q) => ((p.a + 5 * Math.PI / 2) % (2 * Math.PI)) - ((q.a + 5 * Math.PI / 2) % (2 * Math.PI)));
      const cols = []; SPECTRUM.concat(Object.keys(g).filter((k) => !SPECTRUM.includes(k))).forEach((k) => { for (let i = 0; i < Math.round(g[k] || 0); i++) cols.push(GROUP_COLORS[k] || '#888780'); });
      return pts.map((p, i) => ({ x: p.x, y: p.y, c: cols[i] || '#c4c4c4' }));
    };
    colourMap = () => {
      dots.selectAll('circle').data(nodes.flatMap(layout)).join('circle').attr('r', DOT_R).attr('cx', (p) => p.x).attr('cy', (p) => p.y).attr('fill', (p) => p.c)
        .attr('stroke', (p) => (p.c === '#FFD700' ? '#d9b600' : 'none')).attr('stroke-width', 0.6);
    };
    colourMap();
    // Legend
    const used = SPECTRUM.filter((k) => P.data.some((m) => Object.values(m).some((g) => g[k])));
    wrap.insertAdjacentHTML('beforeend', `<div class="eeh-maplegend">${used.map((k) => `<span><i style="background:${GROUP_COLORS[k]}"></i>${esc(k === 'unaffiliated' ? 'Unaffiliated' : k)}</span>`).join('')}<span class="note">1 dot = 1 seat</span></div>`);
  }).catch((e) => { wrap.insertAdjacentHTML('beforeend', `<div class="eeh-status err">Couldn't load the map (${esc(e.message)}).</div>`); });
}

/* ================= Party database ================= */
const EUROPARTY_COLORS = { 'PES': '#FF0000', 'EPP': '#3399FF', 'EDP': '#fa8c00', 'ECPP': '#a16585', 'ELA': '#fb1d79', 'Volt': '#502379', 'ECL': '#7c0000', 'ESN': '#70463A', 'EGP': '#009900', 'PEL': '#990000', 'ALDE': '#FFD700', 'ECR': '#0000FF', 'PPEU': '#9c36b8', 'EFA': '#008080', 'Patriots.eu': '#000000', 'Animal Politics EU': '#009076' };
const epName = (x) => String(x || '').replace(/Patriots\.eu/g, 'PfE');
const textOn = (hex) => { const h = hex.replace('#', ''); const l = [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2] > 0.25 ? '#1A1D23' : '#FFFFFF'; };
const fold = (x) => String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
async function loadPartyDb() {
  const list = document.getElementById('eeh-db-list');
  let rows = null;
  for (const url of [`https://docs.google.com/spreadsheets/d/${PARTY_DB.sheetId}/gviz/tq?tqx=out:csv&headers=1&gid=${PARTY_DB.gid}`, PARTY_DB.publishedCsv]) {
    try { const r = await fetch(url); if (!r.ok) continue; const t = parseCSV(await r.text()); if (t.length && 'europe elects entity id' in t[0]) { rows = t; break; } } catch (e) { /* try the next source */ }
  }
  if (!rows) { list.innerHTML = '<li class="eeh-status err">Couldn\'t load the party database.</li>'; return; }
  const year = (v) => { const m = String(v || '').match(/(\d{4})/); return m ? +m[1] : 0; };
  // One row per party: the newest version (column "Latest" = Yes, else the highest version number).
  const byId = {};
  rows.forEach((o) => { const id = o['europe elects entity id']; if (!id) return;
    const v = parseFloat(o['europe elects entity version']) || 0, cur = byId[id];
    if (!cur || /^yes$/i.test(o['latest']) || (!/^yes$/i.test(cur.o['latest']) && v > cur.v)) byId[id] = { o, v }; });
  const all = Object.values(byId).map(({ o }) => {
    const eu = String(o['europarty affiliation'] || '').split(/[|;,]/)[0].trim();
    return { id: o['europe elects entity id'], iso: (o['iso-2'] || '').toUpperCase(), country: o['country'], native: o['name (native)'], english: o['name (english)'] || o['name (native)'],
      abbr: o['abbreviation'], ideo: o['ideological orientation'], status: (o['status'] || '').toLowerCase(),
      eu: /^(unaffiliated|none|)$/i.test(eu) ? '' : eu,
      since: Math.max(year(o['political activity started']), year(o['legal entity registration'])),
      seq: parseInt(String(o['europe elects entity id']).replace(/^\D+/, ''), 10) || 0,
      key: fold([o['name (native)'], o['name (english)'], o['abbreviation']].join(' ')) };
  });
  const active = all.filter((p) => p.status === 'active');
  const countries = new Set(active.map((p) => p.iso).filter(Boolean));
  const members = active.filter((p) => p.eu);
  const thisYear = new Date().getFullYear();
  const fresh = active.filter((p) => p.since >= thisYear - 1);
  document.getElementById('eeh-db-stats').innerHTML = [[active.length, 'active parties'], [countries.size, 'countries'], [members.length, 'Europarty members'], [fresh.length, `new since ${thisYear - 1}`]]
    .map(([n, l]) => `<div class="eeh-stat"><b>${n.toLocaleString('en-GB')}</b><span>${esc(l)}</span></div>`).join('');
  document.getElementById('eeh-db-find').placeholder = `Search ${active.length.toLocaleString('en-GB')} parties by name or abbreviation…`;
  const url = (p) => COUNTRY_URL.replace('{iso}', p.iso).replace('{slug}', fold(p.country).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  const pill = (eu) => { if (!eu) return '<span class="eeh-pill" style="background:#ECEAE4;color:#5f5e5a">No Europarty</span>'; const c = EUROPARTY_COLORS[eu] || '#5B6170'; return `<span class="eeh-pill" style="background:${c};color:${textOn(c)}">${esc(epName(eu))}</span>`; };
  const item = (p) => `<li><a href="${esc(url(p))}"><span class="iso" title="${esc(p.country)}">${esc(p.iso)}</span>
    <span><span class="nm">${esc(p.english)}</span>${p.abbr ? ` <span class="ab">${esc(p.abbr)}</span>` : ''}
    <span class="meta">${esc([p.native !== p.english ? p.native : '', p.ideo, p.since ? 'since ' + p.since : ''].filter(Boolean).join(' · '))}</span></span>${pill(p.eu)}</a></li>`;
  const newest = [...active].sort((a, b) => b.since - a.since || b.seq - a.seq).slice(0, PARTY_NEW_ROWS);
  const head = document.getElementById('eeh-db-h');
  const showNewest = () => { head.textContent = 'New in the database'; list.innerHTML = newest.map(item).join(''); };
  showNewest();
  document.getElementById('eeh-db-find').addEventListener('input', (e) => {
    const q = fold(e.target.value.trim()); if (q.length < 2) return showNewest();
    const hits = all.filter((p) => p.key.includes(q)).sort((a, b) => (fold(b.abbr) === q) - (fold(a.abbr) === q) || (a.status === 'active' ? 0 : 1) - (b.status === 'active' ? 0 : 1) || a.english.localeCompare(b.english));
    head.textContent = hits.length ? `${hits.length} ${hits.length === 1 ? 'party' : 'parties'} found` + (hits.length > 10 ? ' · showing 10' : '') : 'No party found';
    list.innerHTML = hits.slice(0, 10).map(item).join('');
  });
  // Europarty membership among active parties
  const cnt = {}; members.forEach((p) => { cnt[p.eu] = (cnt[p.eu] || 0) + 1; });
  const eus = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
  document.getElementById('eeh-db-eu').innerHTML = `<p class="eeh-h" style="margin:0">Europarty members in our database</p>
    <div class="eeh-eubar" role="img" aria-label="${esc(eus.map(([k, n]) => `${epName(k)} ${n}`).join(', '))}">${eus.map(([k, n]) => `<i title="${esc(epName(k))}: ${n}" style="width:${n / members.length * 100}%;background:${EUROPARTY_COLORS[k] || '#5B6170'}"></i>`).join('')}</div>
    <div class="eeh-eukey">${eus.map(([k, n]) => `<span><i style="background:${EUROPARTY_COLORS[k] || '#5B6170'}"></i>${esc(epName(k))} <b>${n}</b></span>`).join('')}</div>`;
}

/* ================= Latest analysis ================= */
async function loadPosts() {
  try {
    const res = await fetch(POSTS_API); if (!res.ok) return;
    const posts = await res.json(); if (!Array.isArray(posts) || !posts.length) return;
    const txt = (h) => { const d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent.trim(); };
    document.getElementById('eeh-posts').innerHTML = posts.map((p) => {
      const m = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0];
      const img = m && ((m.media_details && m.media_details.sizes && (m.media_details.sizes.medium_large || m.media_details.sizes.large || {}).source_url) || m.source_url);
      return `<a class="eeh-post" href="${esc(p.link)}"><span class="im" style="${img ? `background-image:url('${esc(img)}')` : ''}"></span>
        <span class="dt">${esc(new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))}</span>
        <h3>${esc(txt(p.title && p.title.rendered))}</h3><p>${esc(txt(p.excerpt && p.excerpt.rendered))}</p></a>`;
    }).join('');
    document.getElementById('eeh-posts-panel').hidden = false;
  } catch (e) { /* section stays hidden */ }
}

/* ================= Countries ================= */
function renderCountries() {
  const ul = document.getElementById('eeh-countries');
  const url = (name, iso) => COUNTRY_URL.replace('{iso}', iso).replace('{slug}', name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  ul.innerHTML = COUNTRIES.map(([n, iso]) => `<li data-n="${esc(n.toLowerCase())}"><a href="${esc(url(n, iso))}"><span class="iso">${esc(iso)}</span>${esc(n)}</a></li>`).join('');
  document.getElementById('eeh-find').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    ul.querySelectorAll('li').forEach((li) => { li.hidden = !!q && !li.dataset.n.includes(q); });
  });
}

/* ================= Data access form ================= */
function bindForm() {
  const f = document.getElementById('eeh-form'), msg = document.getElementById('eeh-form-msg');
  const acad = document.getElementById('eeh-acad');
  f.use.addEventListener('change', () => { acad.hidden = !/academic/i.test(f.use.value); });
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (f.website.value) return; // spam trap
    if (!f.reportValidity()) return;
    const data = Object.fromEntries(new FormData(f)); delete data.website;
    if (DATA_FORM.endpoint) {
      msg.textContent = 'Sending…'; msg.style.color = '';
      try {
        const r = await fetch(DATA_FORM.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        f.reset(); msg.textContent = 'Thank you – we will get back to you.'; msg.style.color = '#009900';
      } catch (err) { msg.textContent = 'Sorry, that didn\'t work. Please try again later.'; msg.style.color = '#c00'; }
      return;
    }
    if (DATA_FORM.email) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nOrganisation: ${data.organisation || '–'}\nType of use: ${data.use}\nData needed: ${data.dataset}\nCountries / period: ${data.scope || '–'}\n\nPurpose:\n${data.purpose}`;
      location.href = `mailto:${DATA_FORM.email}?subject=${encodeURIComponent('Data enquiry (' + data.use + '): ' + data.dataset)}&body=${encodeURIComponent(body)}`;
      msg.textContent = 'Your email program should open with the request.'; return;
    }
    window.open(DATA_ACCESS_URL, '_blank', 'noopener');
  });
}

bindForm();
loadPosts();
loadPartyDb();
loadCalendar();
loadProjection();
})();

  }
})();
