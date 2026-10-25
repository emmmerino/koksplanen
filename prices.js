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
