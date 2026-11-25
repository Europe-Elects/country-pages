"""Romanisation of pollster and party names for the pollster ratings (Cyrillic, Greek, Armenian).
Standard systems per country: Bulgarian Streamlined System (BG), Russian simplified BGN/PCGN (RU, LV),
Serbian/Montenegrin Latin alphabet (RS, ME, XK), Macedonian official romanisation (MK), ELOT 743 (GR, CY),
Armenian BGN/PCGN without apostrophes (AM)."""
import re, unicodedata

_BG = dict(zip('абвгдежзийклмнопрстуфхцчшщъьюя', ['a','b','v','g','d','e','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','ts','ch','sh','sht','a','y','yu','ya']))
_RU = dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','shch','','y','','e','yu','ya']))
_SR = dict(zip('абвгдђежзијклљмнњопрстћуфхцчџш', ['a','b','v','g','d','đ','e','ž','z','i','j','k','l','lj','m','n','nj','o','p','r','s','t','ć','u','f','h','c','č','dž','š']))
_MK = dict(zip('абвгдѓежзѕијклљмнњопрстќуфхцчџш', ['a','b','v','g','d','gj','e','zh','z','dz','i','j','k','l','lj','m','n','nj','o','p','r','s','t','kj','u','f','h','c','ch','dž','sh']))
_EL = dict(zip('αβγδεζηθικλμνξοπρσςτυφχψω', ['a','v','g','d','e','z','i','th','i','k','l','m','n','x','o','p','r','s','s','t','y','f','ch','ps','o']))
_EL2 = {'ου': 'ou', 'αυ': 'av', 'ευ': 'ev', 'γγ': 'ng', 'γκ': 'gk', 'μπ': 'mp', 'ντ': 'nt'}
_HY = dict(zip('աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ', ['a','b','g','d','e','z','e','y','t','zh','i','l','kh','ts','k','h','dz','gh','ch','m','y','n','sh','o','ch','p','j','r','s','v','t','r','ts','v','p','k','o','f']))
_HY2 = {'ու': 'u', 'և': 'ev'}

SYSTEM = {'BG': (_BG, {}), 'RU': (_RU, {}), 'LV': (_RU, {}), 'UA': (_RU, {}), 'RS': (_SR, {}), 'ME': (_SR, {}), 'XK': (_SR, {}),
          'BA': (_SR, {}), 'MK': (_MK, {}), 'GR': (_EL, _EL2), 'CY': (_EL, _EL2), 'AM': (_HY, _HY2)}
_NONLATIN = re.compile(r'[Ͱ-ϿЀ-ӿ԰-֏ἀ-῿]')


def needs(s):
    return bool(_NONLATIN.search(s or ''))


def _script_default(s):
    if re.search(r'[Ͱ-Ͽἀ-῿]', s): return _EL, _EL2
    if re.search(r'[԰-֏]', s): return _HY, _HY2
    return _RU, {}


def romanise(s, iso=''):
    """Latin version of s; text that is already Latin is returned unchanged."""
    if not needs(s):
        return s
    one, two = SYSTEM.get(iso.upper(), None) or _script_default(s)
    # drop Greek accents (tonos, dialytika); Cyrillic letters such as й and ё stay as they are
    s = ''.join(unicodedata.normalize('NFD', c)[0] if '\u0370' <= c <= '\u03FF' or '\u1F00' <= c <= '\u1FFF' else c for c in s)
    out = []
    for word in re.split(r'(\W+)', s):
        caps = len([c for c in word if c.isalpha()]) > 1 and word.isupper()
        i, w = 0, []
        while i < len(word):
            pair, c = word[i:i + 2], word[i]
            if pair.lower() in two:
                m, src, i = two[pair.lower()], pair, i + 2
            elif c.lower() in one:
                m, src, i = one[c.lower()], c, i + 1
            else:
                w.append(c); i += 1; continue
            if caps:
                m = m.upper()
            elif src[0].isupper():
                m = m[:1].upper() + m[1:]
            w.append(m)
        out.append(''.join(w))
    return ''.join(out)


if __name__ == '__main__':
    for iso, s in [('BG', 'Алфа рисърч'), ('BG', 'Маркет ЛИНКС'), ('BG', 'Център за анализи и маркетинг'), ('BG', 'Мяра'),
                   ('GR', 'Κάπα Research'), ('RS', 'НСПМ'), ('MK', 'Димитрија Чуповски'), ('RU', 'ЦИПКР'), ('RU', 'Зелёные'),
                   ('BG', 'ГЕРБ-СДС'), ('GR', 'ΣΥΡΙΖΑ'), ('GR', 'Νίκη'), ('GR', 'ΜέΡΑ25'), ('AM', 'Ժառանգություն'), ('ME', 'ЗбЦГ'), ('BG', 'Тренд')]:
        print(iso, s, '->', romanise(s, iso))
