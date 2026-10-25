// Ungefärliga butikspriser (kr) för vanliga ingredienser, används för att
// uppskatta vad en rätt kostar. Första träffen vinner, så specifika ord
// (t.ex. "kycklingbuljong", "tomatpuré") står före generella ("kyckling", "tomat").
//   kg  = pris per kilo     l   = pris per liter    st = pris per styck
//   pkg = pris per paket/burk/påse                   def = pris när ingen mängd anges
//   klyfta = pris per klyfta (vitlök)
const P = [
  // Smaksättare och såser först, så att t.ex. "kycklingbuljong" inte blir kyckling.
  [["buljong", "fond"], { st: 3, def: 4 }],
  [["tacosås"], { pkg: 22, def: 22 }],
  [["tacokrydda"], { pkg: 12, def: 12 }],
  [["currypasta"], { pkg: 30, def: 8 }],
  [["gräddsås", "brunsås"], { pkg: 15, def: 15 }],
  [["bearnaise", "remoulad", "dressing", "sweet chili", "chilisås", "aioli", "majonnäs"], { pkg: 25, def: 15 }],
  [["sojasås", "soja", "sambal", "sriracha", "fisksås", "ostronsås"], { def: 5 }],
  [["ketchup", "senap"], { def: 4 }],
  [["sylt", "lingon"], { pkg: 30, def: 8 }],
  [["pesto"], { pkg: 30, def: 30 }],
  [["tzatziki"], { pkg: 25, def: 25 }],
  [["pressgurka", "saltgurka", "inlagd gurka"], { pkg: 25, def: 10 }],
  [["salt", "peppar", "oregano", "timjan", "paprikapulver", "chilipulver", "spiskummin", "kanel", "curry", "krydd", "lagerblad"], { def: 2 }],
  [["olivolja", "rapsolja", "matolja", "olja"], { l: 80, def: 3 }],
  [["vinäger", "ättika"], { def: 3 }],
  [["socker", "honung", "sirap"], { kg: 15, def: 3 }],
  [["bakpulver", "jäst", "maizena"], { def: 3 }],
  [["kokosmjölk"], { pkg: 18, l: 45, def: 18 }],
  [["tomatpuré"], { pkg: 15, def: 4 }],
  [["krossade", "passerade", "tomatsås"], { pkg: 13, kg: 30, def: 13 }],

  // Kött, fisk och chark
  [["kycklingfärs"], { kg: 120, def: 60 }],
  [["fläskfärs"], { kg: 90, def: 45 }],
  [["köttfärs", "nötfärs", "blandfärs", "färs"], { kg: 130, def: 65 }],
  [["köttbullar"], { kg: 100, pkg: 50, def: 50 }],
  [["kycklingklubb", "kycklinglår", "kycklingvingar", "hel kyckling"], { kg: 60, def: 60 }],
  [["kycklingfilé", "kycklingbröst", "kyckling"], { kg: 140, def: 85 }],
  [["fläskfilé"], { kg: 150, def: 90 }],
  [["fläskkarré", "kotlett", "karré", "fläskkött", "sidfläsk"], { kg: 110, def: 60 }],
  [["entrecote", "oxfilé", "ryggbiff", "biff", "högrev", "nötkött", "grytbitar"], { kg: 300, def: 150 }],
  [["lamm"], { kg: 250, def: 120 }],
  [["bacon"], { pkg: 30, kg: 200, def: 30 }],
  [["falukorv"], { st: 40, kg: 50, def: 40 }],
  [["chorizo", "salsiccia", "korv", "prinskorv"], { pkg: 40, kg: 90, def: 40 }],
  [["skinka", "kassler", "salami", "pålägg"], { pkg: 30, kg: 180, def: 30 }],
  [["fiskpinnar"], { pkg: 45, def: 45 }],
  [["lax"], { kg: 250, def: 150 }],
  [["torsk", "sej", "kolja", "fisk"], { kg: 180, def: 100 }],
  [["räkor", "räk"], { kg: 200, def: 60 }],
  [["tonfisk"], { pkg: 20, def: 20 }],

  // Mejeri och ägg
  [["äggnudlar", "nudlar"], { pkg: 15, kg: 60, def: 15 }],
  [["ägg"], { st: 3.5, def: 21 }],
  [["crème fraiche", "creme fraiche", "gräddfil", "turkisk yoghurt", "kvarg"], { l: 60, pkg: 15, def: 15 }],
  [["matlagningsgrädde", "vispgrädde", "grädde"], { l: 50, pkg: 15, def: 15 }],
  [["havredryck", "mjölk"], { l: 16, def: 8 }],
  [["yoghurt", "fil"], { l: 25, def: 12 }],
  [["smör", "bregott"], { kg: 110, def: 5 }],
  [["parmesan", "pecorino"], { kg: 300, def: 30 }],
  [["mozzarella", "burrata"], { st: 15, pkg: 15, def: 15 }],
  [["halloumi"], { st: 32, pkg: 32, def: 32 }],
  [["feta"], { st: 25, pkg: 25, def: 25 }],
  [["färskost", "philadelphia"], { pkg: 25, def: 25 }],
  [["ost"], { kg: 120, def: 25, st: 1.5 }],

  // Skafferi
  [["lasagneplattor"], { pkg: 25, def: 25 }],
  [["spaghetti", "pasta", "makaroner", "penne", "tagliatelle", "fusilli", "gnocchi"], { kg: 25, port: 0.08, def: 12 }],
  [["couscous", "bulgur", "matvete", "quinoa"], { kg: 35, port: 0.07, def: 10 }],
  [["ris"], { kg: 30, port: 0.075, def: 10 }],
  [["vetemjöl", "mjöl"], { kg: 12, def: 2 }],
  [["kidneybönor", "bönor", "kikärtor", "linser"], { pkg: 12, def: 12 }],
  [["majs"], { pkg: 15, def: 15 }],
  [["oliver"], { pkg: 25, def: 15 }],
  [["tortilla", "wraps"], { pkg: 25, st: 3, def: 25 }],
  [["hamburgerbröd", "korvbröd"], { pkg: 30, st: 7, def: 30 }],
  [["pizzadeg"], { st: 25, def: 25 }],
  [["pitabröd", "naanbröd", "bröd", "baguette", "ciabatta"], { pkg: 30, st: 8, def: 25 }],
  [["ströbröd", "panko"], { def: 4 }],

  // Fryst och färdigt
  [["pyttipanna"], { pkg: 40, kg: 50, def: 40 }],
  [["pommes"], { pkg: 30, kg: 30, def: 30 }],
  [["wokgrönsaker", "frysta grönsaker", "grönsaksblandning"], { pkg: 30, def: 30 }],
  [["ärtor", "haricots verts", "sockerärtor", "bönor frysta"], { pkg: 22, def: 22 }],

  // Frukt och grönt
  [["sötpotatis"], { kg: 35, st: 12, def: 25 }],
  [["potatis"], { kg: 15, st: 2, def: 15 }],
  [["vitlök"], { st: 8, klyfta: 1, def: 2 }],
  [["purjolök", "purjo"], { st: 12, def: 12 }],
  [["rödlök", "gul lök", "schalottenlök", "lök"], { st: 3, kg: 18, def: 3 }],
  [["morötter", "morot"], { st: 2, kg: 15, def: 4 }],
  [["paprika"], { st: 12, def: 12 }],
  [["körsbärstomater", "cocktailtomater"], { pkg: 25, def: 25 }],
  [["tomat"], { st: 5, kg: 45, def: 10 }],
  [["gurka"], { st: 15, def: 15 }],
  [["isbergssallad", "sallad", "ruccola", "romansallad"], { st: 20, pkg: 25, def: 20 }],
  [["broccoli"], { st: 20, kg: 45, def: 20 }],
  [["blomkål"], { st: 25, def: 25 }],
  [["vitkål", "spetskål", "kål"], { st: 20, kg: 20, def: 15 }],
  [["spenat", "grönkål"], { pkg: 25, def: 25 }],
  [["champinjon", "svamp"], { kg: 70, pkg: 25, def: 25 }],
  [["zucchini", "squash", "aubergine"], { st: 12, def: 12 }],
  [["avokado"], { st: 12, def: 12 }],
  [["citron", "lime"], { st: 6, def: 6 }],
  [["ingefära"], { st: 10, def: 6 }],
  [["chili"], { st: 4, def: 4 }],
  [["rödbetor"], { pkg: 18, kg: 25, def: 18 }],
  [["dill", "persilja", "basilika", "koriander", "gräslök", "örter", "mynta"], { st: 20, def: 15 }],
  [["selleri", "fänkål", "palsternacka", "rotselleri", "rotfrukter"], { st: 12, kg: 25, def: 12 }],
  [["äpple", "banan", "päron"], { st: 5, kg: 30, def: 10 }],
];

const UNKNOWN = 15; // gissning för ingredienser som inte finns i listan

function findPrice(name) {
  const n = String(name || "").toLowerCase();
  for (const [kws, p] of P) if (kws.some(k => n.includes(k))) return p;
  return null;
}

const UNIT = {
  kg: ["kg", 1], hg: ["kg", 0.1], g: ["kg", 0.001], gram: ["kg", 0.001],
  l: ["l", 1], liter: ["l", 1], dl: ["l", 0.1], cl: ["l", 0.01], ml: ["l", 0.001],
  msk: ["sp", 0.015], tsk: ["sp", 0.005], krm: ["sp", 0.001],
  st: ["st", 1], stk: ["st", 1], skivor: ["st", 1], skiva: ["st", 1], kruka: ["st", 1], knippe: ["st", 1], bit: ["st", 1], bitar: ["st", 1],
  tärning: ["st", 1], tärningar: ["st", 1], huvud: ["st", 1],
  paket: ["pkg", 1], pkt: ["pkg", 1], förp: ["pkg", 1], förpackning: ["pkg", 1], burk: ["pkg", 1], burkar: ["pkg", 1],
  påse: ["pkg", 1], påsar: ["pkg", 1], flaska: ["pkg", 1], ask: ["pkg", 1],
  port: ["port", 1], portion: ["port", 1], portioner: ["port", 1],
  klyfta: ["klyfta", 1], klyftor: ["klyfta", 1],
};

function parseAmount(m) {
  const s = String(m || "").toLowerCase().replace(",", ".").trim();
  if (!s) return null;
  const r = s.match(/^(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?|½|en|ett|ca)?\s*([a-zåäö]+)?/);
  if (!r) return null;
  let q = r[1];
  if (q === "½") q = 0.5; else if (q === "en" || q === "ett") q = 1; else if (q === "ca" || q == null) q = null;
  else if (String(q).includes("-")) { const [a, b] = q.split("-").map(Number); q = (a + b) / 2; } else q = Number(q);
  const u = UNIT[r[2]];
  if (q == null && !u) return null;
  return { q: q ?? 1, unit: u ? u[0] : "st", f: u ? u[1] : 1 };
}

// Uppskattat pris (kr) för en ingrediens. known = false när ordet inte fanns i listan.
export function ingredientCost(ing) {
  const p = findPrice(ing.n);
  if (!p) return { cost: UNKNOWN, known: false };
  const a = parseAmount(ing.m);
  let c = null;
  if (!a) c = p.def ?? p.pkg ?? p.st ?? (p.kg ? p.kg * 0.3 : null);
  else {
    const x = a.q * a.f;
    if (a.unit === "kg") c = p.kg ? x * p.kg : p.l ? x * p.l : p.pkg ?? p.def;
    else if (a.unit === "l") c = p.l ? x * p.l : p.kg ? x * p.kg : p.pkg ?? p.def;
    else if (a.unit === "sp") c = p.l ? x * p.l : p.kg ? x * p.kg : Math.min(p.def ?? 3, 3) * a.q;
    else if (a.unit === "pkg") c = (p.pkg ?? p.st ?? p.def) * x;
    else if (a.unit === "port") c = p.port && p.kg ? x * p.port * p.kg : (p.def ?? 10) * x / 4;
    else if (a.unit === "klyfta") c = (p.klyfta ?? 1) * x;
    else c = p.st ? x * p.st : p.pkg ? x * p.pkg : p.kg ? x * 0.15 * p.kg : (p.def ?? UNKNOWN) * x;
  }
  if (c == null || !Number.isFinite(c)) c = p.def ?? UNKNOWN;
  return { cost: Math.max(1, c), known: true };
}

// Uppskattat pris för hela rätten, avrundat till närmaste 5 kr.
export function estimateDish(ingredients) {
  const rows = (ingredients || []).filter(i => i && i.n).map(i => ({ n: i.n, m: i.m, ...ingredientCost(i) }));
  const total = rows.reduce((a, r) => a + r.cost, 0);
  return { total: rows.length ? Math.max(5, Math.round(total / 5) * 5) : 0, rows, unknown: rows.filter(r => !r.known).length };
}

// ---------- Kalorier ----------
// kc = kcal per 100 g (eller 100 ml), w = gram per styck, wp = gram per paket/burk/påse,
// wd = gram som används när ingen mängd anges, port = kg torrvara per portion,
// d = gram per ml för torrvaror som mäts i dl, e = ätbar andel (t.ex. ben bort),
// cook = hur mycket torrvaran väger efter kokning (pasta, ris).
const K = [
  [["buljong", "fond"], { kc: 200, w: 5, wd: 5 }],
  [["tacosås"], { kc: 40, wp: 230, wd: 230 }],
  [["tacokrydda"], { kc: 300, wp: 28, wd: 28 }],
  [["currypasta"], { kc: 150, wp: 100, wd: 30 }],
  [["gräddsås", "brunsås"], { kc: 120, wp: 250, wd: 250 }],
  [["bearnaise", "aioli", "majonnäs"], { kc: 550, wp: 250, wd: 100 }],
  [["remoulad", "dressing", "sweet chili", "chilisås"], { kc: 350, wp: 250, wd: 80 }],
  [["sojasås", "soja", "sambal", "sriracha", "fisksås", "ostronsås"], { kc: 60, wd: 30 }],
  [["ketchup", "senap"], { kc: 100, wd: 20 }],
  [["sylt", "lingon"], { kc: 180, wp: 400, wd: 60 }],
  [["pesto"], { kc: 450, wp: 190, wd: 190 }],
  [["tzatziki"], { kc: 120, wp: 200, wd: 200 }],
  [["pressgurka", "saltgurka", "inlagd gurka"], { kc: 40, wd: 100 }],
  [["salt", "peppar", "oregano", "timjan", "paprikapulver", "chilipulver", "spiskummin", "kanel", "curry", "krydd", "lagerblad"], { kc: 0, wd: 5 }],
  [["olivolja", "rapsolja", "matolja", "olja"], { kc: 900, wd: 15 }],
  [["vinäger", "ättika"], { kc: 0, wd: 15 }],
  [["socker", "honung", "sirap"], { kc: 400, wd: 10, d: 0.85 }],
  [["bakpulver", "jäst", "maizena"], { kc: 0, wd: 5 }],
  [["kokosmjölk"], { kc: 180, wp: 400, wd: 400 }],
  [["tomatpuré"], { kc: 80, wp: 70, wd: 30 }],
  [["krossade", "passerade", "tomatsås"], { kc: 25, wp: 400, wd: 400 }],

  [["kycklingfärs"], { kc: 150, wd: 500 }],
  [["fläskfärs"], { kc: 250, wd: 500 }],
  [["köttfärs", "nötfärs", "blandfärs", "färs"], { kc: 220, wd: 500 }],
  [["köttbullar"], { kc: 230, wp: 500, wd: 500 }],
  [["kycklingklubb", "kycklinglår", "kycklingvingar", "hel kyckling"], { kc: 170, e: 0.75, wd: 1000 }],
  [["kycklingfilé", "kycklingbröst", "kyckling"], { kc: 110, wd: 600 }],
  [["fläskfilé"], { kc: 120, wd: 600 }],
  [["fläskkarré", "kotlett", "karré", "fläskkött", "sidfläsk"], { kc: 220, wd: 600 }],
  [["entrecote", "oxfilé", "ryggbiff", "biff", "högrev", "nötkött", "grytbitar"], { kc: 180, wd: 500 }],
  [["lamm"], { kc: 250, wd: 500 }],
  [["bacon"], { kc: 400, wp: 140, wd: 140 }],
  [["falukorv"], { kc: 240, w: 800, wd: 800 }],
  [["chorizo", "salsiccia", "korv", "prinskorv"], { kc: 280, wp: 400, wd: 400 }],
  [["skinka", "kassler", "salami", "pålägg"], { kc: 130, wp: 120, wd: 120 }],
  [["fiskpinnar"], { kc: 200, wp: 450, wd: 450 }],
  [["lax"], { kc: 200, wd: 600 }],
  [["torsk", "sej", "kolja", "fisk"], { kc: 80, wd: 600 }],
  [["räkor", "räk"], { kc: 90, wd: 200 }],
  [["tonfisk"], { kc: 110, wp: 120, wd: 120 }],

  [["äggnudlar", "nudlar"], { kc: 360, wp: 250, wd: 250, cook: 2.5 }],
  [["ägg"], { kc: 140, w: 55, wd: 330 }],
  [["crème fraiche", "creme fraiche", "gräddfil", "turkisk yoghurt", "kvarg"], { kc: 250, wp: 200, wd: 200 }],
  [["matlagningsgrädde", "vispgrädde", "grädde"], { kc: 220, wp: 250, wd: 250 }],
  [["havredryck", "mjölk"], { kc: 50, wd: 200 }],
  [["yoghurt", "fil"], { kc: 70, wd: 200 }],
  [["smör", "bregott"], { kc: 740, wd: 15 }],
  [["parmesan", "pecorino"], { kc: 400, wd: 50 }],
  [["mozzarella", "burrata"], { kc: 250, w: 125, wp: 125, wd: 125 }],
  [["halloumi"], { kc: 320, w: 200, wp: 200, wd: 200 }],
  [["feta"], { kc: 270, w: 150, wp: 150, wd: 150 }],
  [["färskost", "philadelphia"], { kc: 250, wp: 200, wd: 200 }],
  [["ost"], { kc: 380, w: 10, wd: 100 }],

  [["lasagneplattor"], { kc: 350, wp: 250, wd: 250, cook: 2 }],
  [["spaghetti", "pasta", "makaroner", "penne", "tagliatelle", "fusilli", "gnocchi"], { kc: 350, port: 0.08, wd: 400, cook: 2.3 }],
  [["couscous", "bulgur", "matvete", "quinoa"], { kc: 350, port: 0.07, wd: 300, d: 0.7, cook: 2.5 }],
  [["ris"], { kc: 350, port: 0.075, wd: 300, d: 0.85, cook: 2.5 }],
  [["vetemjöl", "mjöl"], { kc: 350, wd: 30, d: 0.6 }],
  [["kidneybönor", "bönor", "kikärtor", "linser"], { kc: 100, wp: 250, wd: 250 }],
  [["majs"], { kc: 80, wp: 200, wd: 200 }],
  [["oliver"], { kc: 150, wp: 100, wd: 50 }],
  [["tortilla", "wraps"], { kc: 300, w: 40, wp: 320, wd: 320 }],
  [["hamburgerbröd", "korvbröd"], { kc: 270, w: 70, wp: 280, wd: 280 }],
  [["pizzadeg"], { kc: 270, w: 400, wd: 400 }],
  [["pitabröd", "naanbröd", "bröd", "baguette", "ciabatta"], { kc: 250, w: 50, wp: 400, wd: 200 }],
  [["ströbröd", "panko"], { kc: 370, wd: 30 }],

  [["pyttipanna"], { kc: 150, wp: 1000, wd: 1000 }],
  [["pommes"], { kc: 150, wp: 750, wd: 750 }],
  [["wokgrönsaker", "frysta grönsaker", "grönsaksblandning"], { kc: 30, wp: 500, wd: 500 }],
  [["ärtor", "haricots verts", "sockerärtor", "bönor frysta"], { kc: 60, wp: 400, wd: 300 }],

  [["sötpotatis"], { kc: 85, w: 300, wd: 600 }],
  [["potatis"], { kc: 75, w: 100, wd: 800 }],
  [["vitlök"], { kc: 140, w: 40, wd: 10 }],
  [["purjolök", "purjo"], { kc: 30, w: 200, wd: 200 }],
  [["rödlök", "gul lök", "schalottenlök", "lök"], { kc: 40, w: 120, wd: 120 }],
  [["morötter", "morot"], { kc: 40, w: 80, wd: 160 }],
  [["paprika"], { kc: 30, w: 150, wd: 150 }],
  [["körsbärstomater", "cocktailtomater"], { kc: 20, wp: 250, wd: 250 }],
  [["tomat"], { kc: 20, w: 100, wd: 200 }],
  [["gurka"], { kc: 12, w: 350, wd: 350 }],
  [["isbergssallad", "sallad", "ruccola", "romansallad"], { kc: 15, w: 400, wp: 70, wd: 200 }],
  [["broccoli"], { kc: 35, w: 400, wd: 400 }],
  [["blomkål"], { kc: 25, w: 600, wd: 600 }],
  [["vitkål", "spetskål", "kål"], { kc: 25, w: 800, wd: 300 }],
  [["spenat", "grönkål"], { kc: 25, wp: 200, wd: 200 }],
  [["champinjon", "svamp"], { kc: 25, wp: 250, wd: 250 }],
  [["zucchini", "squash", "aubergine"], { kc: 17, w: 300, wd: 300 }],
  [["avokado"], { kc: 200, w: 150, wd: 150 }],
  [["citron", "lime"], { kc: 30, w: 100, wd: 50 }],
  [["ingefära"], { kc: 80, w: 30, wd: 20 }],
  [["chili"], { kc: 40, w: 15, wd: 15 }],
  [["rödbetor"], { kc: 50, wp: 300, wd: 300 }],
  [["dill", "persilja", "basilika", "koriander", "gräslök", "örter", "mynta"], { kc: 30, w: 20, wd: 15 }],
  [["selleri", "fänkål", "palsternacka", "rotselleri", "rotfrukter"], { kc: 25, w: 300, wd: 200 }],
  [["äpple", "banan", "päron"], { kc: 55, w: 150, wd: 150 }],
];
const UNKNOWN_KCAL = 150; // gissning för ingredienser som inte finns i listan
export const PORTIONS = 4;

function findKcal(name) {
  const n = String(name || "").toLowerCase();
  for (const [kws, k] of K) if (kws.some(x => n.includes(x))) return k;
  return null;
}

export function ingredientKcal(ing) {
  const k = findKcal(ing.n);
  if (!k) return { kcal: UNKNOWN_KCAL, grams: 100, known: false };
  const a = parseAmount(ing.m);
  let g;
  if (!a) g = k.wd;
  else {
    const x = a.q * a.f;
    if (a.unit === "kg") g = x * 1000;
    else if (a.unit === "l" || a.unit === "sp") g = x * 1000 * (k.d ?? 1);
    else if (a.unit === "pkg") g = x * (k.wp ?? k.w ?? k.wd);
    else if (a.unit === "port") g = x * (k.port ? k.port * 1000 : k.wd / PORTIONS);
    else if (a.unit === "klyfta") g = x * 5;
    else g = x * (k.w ?? k.wp ?? 100);
  }
  const eaten = (g || 0) * (k.e ?? 1);
  // grams = vikt på tallriken, används för energitätheten.
  return { kcal: eaten * k.kc / 100, grams: eaten * (k.cook ?? 1), known: true };
}

// Uppskattade kalorier per portion (rätten antas räcka till 4 portioner) och
// energitäthet: kcal per 100 g färdig mat. Tätheten beror inte på hur stort receptet är.
export function estimateKcal(ingredients) {
  const rows = (ingredients || []).filter(i => i && i.n).map(i => ({ n: i.n, m: i.m, ...ingredientKcal(i) }));
  const total = rows.reduce((a, r) => a + r.kcal, 0);
  const grams = rows.reduce((a, r) => a + r.grams, 0);
  return {
    perPortion: rows.length ? Math.round(total / PORTIONS / 10) * 10 : 0,
    density: grams ? Math.round(total / grams * 100) : 0,
    rows, unknown: rows.filter(r => !r.known).length,
  };
}

// Nyttighet 1–5 utifrån energitätheten (kcal per 100 g färdig mat):
// mat med mycket grönsaker, magert protein och vätska får fler stjärnor än
// mat med mycket fett, socker och mjöl, oavsett hur stort receptet är.
export function healthStars(density) {
  if (!density) return 0;
  if (density <= 110) return 5;
  if (density <= 125) return 4;
  if (density <= 140) return 3;
  if (density <= 160) return 2;
  return 1;
}
