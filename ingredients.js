// Gör om ingrediensnamn till en gemensam vara och summerar mängder,
// så att t.ex. "Köttfärs, 400 g" + "Nötfärs, 400 g" blir "Nötfärs 800 g".

// Namn som räknas som samma vara. Det första namnet är det som visas.
const SAME = [
  ["Nötfärs", "köttfärs", "nötfärs", "nötköttfärs"],
  ["Gul lök", "gul lök", "gula lökar", "lök", "lökar"],
  ["Rödlök", "rödlök", "rödlökar"],
  ["Vitlök", "vitlök", "vitlöksklyfta", "vitlöksklyftor"],
  ["Riven ost", "riven ost", "ost", "hushållsost", "präst", "grevé"],
  ["Matlagningsgrädde", "matlagningsgrädde", "grädde", "vispgrädde"],
  ["Crème fraiche", "crème fraiche", "creme fraiche", "crème fraîche"],
  ["Krossade tomater", "krossade tomater", "krossad tomat", "tomater krossade"],
  ["Kycklingfilé", "kycklingfilé", "kycklingfiléer", "kycklingbröst"],
  ["Potatis", "potatis", "fast potatis", "mjölig potatis"],
  ["Morötter", "morot", "morötter"],
  ["Tomater", "tomat", "tomater"],
  ["Spaghetti", "spaghetti", "spagetti"],
  ["Ris", "ris", "jasminris", "basmatiris"],
  ["Isbergssallad", "isbergssallad", "sallad", "isbergsallad"],
  ["Citron", "citron", "citroner"],
  ["Lime", "lime", "limefrukt"],
  ["Ägg", "ägg"],
  ["Mjölk", "mjölk", "standardmjölk", "mellanmjölk"],
  ["Vetemjöl", "vetemjöl", "mjöl"],
  ["Paprika", "paprika", "röd paprika", "paprikor"],
  ["Champinjoner", "champinjoner", "champinjon", "svamp"],
  ["Purjolök", "purjolök", "purjo"],
  ["Gurka", "gurka", "gurkor"],
  ["Broccoli", "broccoli"],
  ["Laxfilé", "laxfilé", "lax", "laxfiléer"],
  ["Tortillabröd", "tortillabröd", "tortilla", "tortillas", "wraps"],
  ["Gräddfil", "gräddfil"],
  ["Smör", "smör"],
  ["Bacon", "bacon"],
];
const ALIAS = new Map();
for (const [shown, ...names] of SAME) for (const n of names) ALIAS.set(n, shown);

const clean = s => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");

// Nyckel och visningsnamn för en ingrediens.
export function canonical(name) {
  const n = clean(name);
  const shown = ALIAS.get(n);
  if (shown) return { key: clean(shown), name: shown };
  const s = String(name || "").trim();
  return { key: n, name: s ? s[0].toUpperCase() + s.slice(1) : s };
}

// Varor som finns i nästan alla rätter räknas inte när vi letar rätter som passar ihop.
const TRIVIAL = new Set(["salt", "peppar", "svartpeppar", "olja", "olivolja", "rapsolja", "matolja", "smör", "vatten",
  "socker", "vetemjöl", "gul lök", "vitlök", "kryddor", "oregano", "curry", "chilipulver", "paprikapulver"]);
export const isTrivial = key => TRIVIAL.has(key);

// Varor som de flesta alltid har hemma. De räknas inte när appen letar rätter som
// passar ihop, eftersom det är varor man ändå inte köper extra av.
const PANTRY = ["pasta", "spaghetti", "makaroner", "penne", "ris", "ägg", "mjölk", "potatis", "krossade tomater",
  "tomatpuré", "buljong", "fond", "soja", "ketchup", "senap", "kryddor", "riven ost", "sylt", "lingonsylt",
  "sirap", "vinäger", "ströbröd", "honung", "sambal oelek", "curry", "bröd"];
export const isPantry = key => isTrivial(key) || PANTRY.some(p => key === p || key.endsWith(p) && p.length > 4);

const UNITS = {
  kg: ["g", 1000], hg: ["g", 100], g: ["g", 1], gram: ["g", 1],
  l: ["ml", 1000], liter: ["ml", 1000], dl: ["ml", 100], cl: ["ml", 10], ml: ["ml", 1],
  msk: ["ml", 15], tsk: ["ml", 5], krm: ["ml", 1],
  st: ["st", 1], stk: ["st", 1], styck: ["st", 1],
  paket: ["paket", 1], pkt: ["paket", 1], förp: ["paket", 1], förpackning: ["paket", 1], förpackningar: ["paket", 1],
  burk: ["burk", 1], burkar: ["burk", 1], påse: ["påse", 1], påsar: ["påse", 1],
  klyfta: ["klyfta", 1], klyftor: ["klyfta", 1], tärning: ["tärning", 1], tärningar: ["tärning", 1],
  port: ["port", 1], portion: ["port", 1], portioner: ["port", 1],
  kruka: ["kruka", 1], krukor: ["kruka", 1], skiva: ["skiva", 1], skivor: ["skiva", 1],
  bit: ["bit", 1], bitar: ["bit", 1], knippe: ["knippe", 1], knippen: ["knippe", 1], flaska: ["flaska", 1], flaskor: ["flaska", 1],
};
const PLURAL = { burk: "burkar", påse: "påsar", klyfta: "klyftor", tärning: "tärningar", kruka: "krukor", skiva: "skivor", bit: "bitar", knippe: "knippen", flaska: "flaskor" };

function parse(m) {
  const s = clean(m).replace(",", ".");
  const r = s.match(/^(\d+(?:\.\d+)?|½)\s*([a-zåäö]*)\.?$/);
  if (!r) return null;
  const q = r[1] === "½" ? 0.5 : Number(r[1]);
  if (!r[2]) return { unit: "st", q };
  const u = UNITS[r[2]];
  return u ? { unit: u[0], q: q * u[1] } : null;
}

const num = n => (Math.round(n * 10) / 10).toLocaleString("sv-SE");

function format(unit, q) {
  if (unit === "g") return q >= 1000 ? `${num(q / 1000)} kg` : `${Math.round(q)} g`;
  if (unit === "ml") {
    if (q >= 1000) return `${num(q / 1000)} l`;
    if (q >= 100) return `${num(q / 100)} dl`;
    if (q % 15 === 0) return `${q / 15} msk`;
    return `${num(q / 5)} tsk`;
  }
  if (unit === "st") return `${num(q)} st`;
  return `${num(q)} ${q > 1 && PLURAL[unit] ? PLURAL[unit] : unit}`;
}

// Summerar en lista mängder, t.ex. ["400 g", "0,5 kg", "1 burk"] -> "900 g + 1 burk".
export function sumAmounts(list) {
  const totals = new Map(), rest = [];
  for (const m of list) {
    if (!clean(m)) continue;
    const p = parse(m);
    if (p) totals.set(p.unit, (totals.get(p.unit) || 0) + p.q);
    else if (!rest.includes(m.trim())) rest.push(m.trim());
  }
  return [...[...totals].map(([u, q]) => format(u, q)), ...rest].join(" + ");
}
