// Generates the placeholder invitation artwork used by the seed templates.
// Each template gets a printed-card style cover (<slug>.svg) and a phone-screen
// website preview (<slug>-screen.svg). Run with: node scripts/generate-previews.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "templates");
mkdirSync(OUT, { recursive: true });

const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";

const designs = [
  { slug: "ayodhya", style: "royal", a: "Aditi", b: "Raghav", date: "12 . 02 . 2027", city: "Ayodhya", p: { bg: "#5b1a1f", ink: "#f6e6c8", accent: "#d8a94c", soft: "#7a2a2f" } },
  { slug: "rajwada", style: "royal", a: "Meera", b: "Vikram", date: "21 . 11 . 2026", city: "Udaipur", p: { bg: "#13294b", ink: "#f3e7cf", accent: "#c9a24a", soft: "#1d3a66" } },
  { slug: "mehfil", style: "editorial", a: "Zoya", b: "Imran", date: "08 . 01 . 2027", city: "Lucknow", p: { bg: "#0f3b33", ink: "#f2ead8", accent: "#cfae6b", soft: "#174d43" } },
  { slug: "utsav", style: "colorful", a: "Riya", b: "Kunal", date: "14 . 12 . 2026", city: "Ahmedabad", p: { bg: "#fff4e0", ink: "#3a1b10", accent: "#e2572b", soft: "#f2b134", extra: "#2f7a5a" } },
  { slug: "jaipur", style: "contemporary", a: "Ananya", b: "Arjun", date: "02 . 03 . 2027", city: "Jaipur", p: { bg: "#f6d9cf", ink: "#3b1f1a", accent: "#c4553b", soft: "#eab7a6" } },
  { slug: "kashi", style: "traditional", a: "Gauri", b: "Shiv", date: "19 . 02 . 2027", city: "Varanasi", p: { bg: "#f7ecd6", ink: "#5a1e12", accent: "#b8441f", soft: "#e8c98f" } },
  { slug: "mogra", style: "floral", a: "Lakshmi", b: "Karthik", date: "27 . 01 . 2027", city: "Chennai", p: { bg: "#fbfaf4", ink: "#1f3a2c", accent: "#2f6b4a", soft: "#e9efe3", extra: "#f4f1e6" } },
  { slug: "saanjh", style: "minimal", a: "Tara", b: "Neel", date: "05 . 04 . 2027", city: "Goa", p: { bg: "#f1ece4", ink: "#1b1b1b", accent: "#b46a4a", soft: "#e3dbcf" } },
  { slug: "aangan", style: "contemporary", a: "Sayali", b: "Omkar", date: "09 . 12 . 2026", city: "Pune", p: { bg: "#e9e4f5", ink: "#2a2140", accent: "#6d55a8", soft: "#d3c9ec" } },
  { slug: "paithani", style: "traditional", a: "Mrunal", b: "Siddharth", date: "16 . 01 . 2027", city: "Nashik", p: { bg: "#3d1a4a", ink: "#f6e8c9", accent: "#2fa07a", soft: "#55285f" } },
  { slug: "anand", style: "minimal", a: "Simran", b: "Harjot", date: "30 . 11 . 2026", city: "Amritsar", p: { bg: "#fbf3e4", ink: "#2b2014", accent: "#d08a1e", soft: "#f1e2c4" } },
  { slug: "noor", style: "editorial", a: "Ayesha", b: "Faraz", date: "22 . 02 . 2027", city: "Hyderabad", p: { bg: "#f4efe6", ink: "#1d1a17", accent: "#8a6a2f", soft: "#e6dccb" } },
  { slug: "konkan", style: "floral", a: "Natasha", b: "Joel", date: "18 . 12 . 2026", city: "Goa", p: { bg: "#eef3f6", ink: "#1b2e3d", accent: "#3f6e8c", soft: "#d6e3eb", extra: "#ffffff" } },
  { slug: "kaveri", style: "royal", a: "Divya", b: "Pranav", date: "11 . 02 . 2027", city: "Mysuru", p: { bg: "#7d2a12", ink: "#fbe9c6", accent: "#e8b34a", soft: "#933a1d" } },
  { slug: "ruh", style: "colorful", a: "Ishita", b: "Rohan", date: "25 . 03 . 2027", city: "Delhi", p: { bg: "#ffe9e4", ink: "#2d1424", accent: "#c2366b", soft: "#f6a64a", extra: "#7a4fb0" } },
];

const W = 600;
const H = 840;

function text(x, y, value, { size = 20, family = SERIF, fill, weight = 400, ls = 0, anchor = "middle", style = "normal", opacity = 1 } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${family}" font-size="${size}" font-weight="${weight}" font-style="${style}" letter-spacing="${ls}" fill="${fill}" opacity="${opacity}">${value}</text>`;
}

function archPath(x, y, w, h) {
  const r = w / 2;
  return `M${x} ${y + h} L${x} ${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} L${x + w} ${y + h} Z`;
}

function mandala(cx, cy, r, color, petals = 16) {
  let out = `<g fill="none" stroke="${color}" stroke-width="1.2">`;
  out += `<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.62}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.22}"/>`;
  for (let i = 0; i < petals; i++) {
    const ang = (i / petals) * Math.PI * 2;
    const px = cx + Math.cos(ang) * r * 0.8;
    const py = cy + Math.sin(ang) * r * 0.8;
    out += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r * 0.2).toFixed(1)}" ry="${(r * 0.08).toFixed(1)}" transform="rotate(${((ang * 180) / Math.PI).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  out += `</g>`;
  return out;
}

function flower(cx, cy, r, petal, center, rot = 0) {
  let out = `<g transform="rotate(${rot} ${cx} ${cy})">`;
  for (let i = 0; i < 5; i++) {
    const ang = (i / 5) * 360;
    out += `<ellipse cx="${cx}" cy="${cy - r * 0.55}" rx="${r * 0.32}" ry="${r * 0.55}" fill="${petal}" transform="rotate(${ang} ${cx} ${cy})"/>`;
  }
  out += `<circle cx="${cx}" cy="${cy}" r="${r * 0.2}" fill="${center}"/></g>`;
  return out;
}

function leaf(x, y, len, rot, color) {
  return `<path d="M${x} ${y} q ${len * 0.35} ${-len * 0.25} ${len} 0 q ${-len * 0.35} ${len * 0.25} ${-len} 0z" fill="${color}" transform="rotate(${rot} ${x} ${y})"/>`;
}

function names(d, y, color, size = 64, family = SERIF, style = "italic") {
  return (
    text(W / 2, y, d.a, { size, fill: color, style, family }) +
    text(W / 2, y + size * 0.85, "&amp;", { size: size * 0.5, fill: color, style: "italic", opacity: 0.8 }) +
    text(W / 2, y + size * 1.75, d.b, { size, fill: color, style, family })
  );
}

const styles = {
  royal(d) {
    const { bg, ink, accent, soft } = d.p;
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      <path d="${archPath(70, 120, 460, 660)}" fill="${soft}"/>
      <path d="${archPath(90, 140, 420, 630)}" fill="none" stroke="${accent}" stroke-width="1.5"/>
      <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${accent}" stroke-width="2"/>
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${accent}" stroke-width="0.8"/>
      ${[[40, 40], [W - 40, 40], [40, H - 40], [W - 40, H - 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${accent}"/>`).join("")}
      ${mandala(W / 2, 270, 70, accent)}
      ${text(W / 2, 400, "TOGETHER WITH THEIR FAMILIES", { size: 13, family: SANS, fill: ink, ls: 4, opacity: 0.8 })}
      ${names(d, 470, ink, 58)}
      ${text(W / 2, 640, "REQUEST THE PLEASURE OF YOUR COMPANY", { size: 11, family: SANS, fill: ink, ls: 3, opacity: 0.75 })}
      <line x1="220" y1="668" x2="380" y2="668" stroke="${accent}" stroke-width="1"/>
      ${text(W / 2, 705, d.date, { size: 26, fill: accent, ls: 2 })}
      ${text(W / 2, 735, d.city.toUpperCase(), { size: 12, family: SANS, fill: ink, ls: 5, opacity: 0.8 })}`;
  },
  editorial(d) {
    const { bg, ink, accent, soft } = d.p;
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      <rect x="0" y="0" width="${W}" height="300" fill="${soft}"/>
      ${text(48, 80, "THE WEDDING OF", { size: 13, family: SANS, fill: ink, ls: 5, anchor: "start" })}
      ${text(W - 48, 80, d.city.toUpperCase(), { size: 13, family: SANS, fill: ink, ls: 5, anchor: "end" })}
      <line x1="48" y1="100" x2="${W - 48}" y2="100" stroke="${ink}" stroke-width="1"/>
      ${text(44, 250, d.a, { size: 120, fill: ink, anchor: "start", weight: 500 })}
      ${text(W / 2, 380, "&amp;", { size: 90, fill: accent, style: "italic" })}
      ${text(W - 44, 520, d.b, { size: 120, fill: ink, anchor: "end", weight: 500 })}
      <line x1="48" y1="600" x2="${W - 48}" y2="600" stroke="${ink}" stroke-width="1"/>
      ${text(48, 650, "SAVE THE DATE", { size: 13, family: SANS, fill: ink, ls: 5, anchor: "start" })}
      ${text(48, 720, d.date, { size: 40, fill: ink, anchor: "start" })}
      <circle cx="${W - 110}" cy="700" r="56" fill="none" stroke="${accent}" stroke-width="1.5"/>
      ${text(W - 110, 696, "RSVP", { size: 14, family: SANS, fill: accent, ls: 4 })}
      ${text(W - 110, 716, "inside", { size: 15, fill: accent, style: "italic" })}
      <line x1="48" y1="790" x2="${W - 48}" y2="790" stroke="${ink}" stroke-width="0.6" opacity="0.5"/>`;
  },
  colorful(d) {
    const { bg, ink, accent, soft, extra } = d.p;
    const flags = Array.from({ length: 12 }, (_, i) => {
      const x = i * 50;
      const c = [accent, soft, extra][i % 3];
      return `<path d="M${x} 0 L${x + 50} 0 L${x + 25} 70 Z" fill="${c}"/>`;
    }).join("");
    const dots = Array.from({ length: 22 }, (_, i) => `<circle cx="${30 + i * 25.7}" cy="${H - 40}" r="7" fill="${[accent, soft, extra][i % 3]}"/>`).join("");
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      ${flags}
      <circle cx="${W / 2}" cy="300" r="150" fill="${soft}" opacity="0.35"/>
      ${flower(W / 2, 220, 60, accent, soft)}
      ${flower(140, 170, 30, extra, soft, 20)}
      ${flower(460, 170, 30, extra, soft, -20)}
      ${text(W / 2, 360, "LET'S CELEBRATE", { size: 15, family: SANS, fill: accent, ls: 6, weight: 700 })}
      ${names(d, 440, ink, 66)}
      <rect x="150" y="620" width="300" height="56" rx="28" fill="${accent}"/>
      ${text(W / 2, 656, d.date, { size: 24, fill: bg, ls: 2 })}
      ${text(W / 2, 720, d.city.toUpperCase(), { size: 13, family: SANS, fill: ink, ls: 6 })}
      ${dots}`;
  },
  contemporary(d) {
    const { bg, ink, accent, soft } = d.p;
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      <path d="${archPath(110, 90, 380, 420)}" fill="${soft}"/>
      <circle cx="${W / 2}" cy="330" r="92" fill="${accent}"/>
      <path d="M110 510 L490 510" stroke="${ink}" stroke-width="1"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M${150 + i * 75} 510 q 37 -60 75 0" fill="none" stroke="${ink}" stroke-width="0.8" opacity="0.5"/>`).join("")}
      ${text(W / 2, 580, `${d.a} <tspan fill="${accent}" font-style="italic">&amp;</tspan> ${d.b}`, { size: 54, fill: ink })}
      ${text(W / 2, 625, "ARE GETTING MARRIED", { size: 13, family: SANS, fill: ink, ls: 6 })}
      <line x1="270" y1="660" x2="330" y2="660" stroke="${accent}" stroke-width="2"/>
      ${text(W / 2, 710, d.date, { size: 30, fill: ink, ls: 3 })}
      ${text(W / 2, 745, d.city.toUpperCase(), { size: 12, family: SANS, fill: ink, ls: 6, opacity: 0.7 })}`;
  },
  traditional(d) {
    const { bg, ink, accent, soft } = d.p;
    const border = Array.from({ length: 24 }, (_, i) => {
      const x = 12 + i * 24.5;
      return `<path d="M${x} 24 q 12 -16 24 0 q -12 16 -24 0z" fill="${accent}" opacity="0.85"/><path d="M${x} ${H - 24} q 12 -16 24 0 q -12 16 -24 0z" fill="${accent}" opacity="0.85"/>`;
    }).join("");
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      ${border}
      <rect x="40" y="56" width="${W - 80}" height="${H - 112}" fill="none" stroke="${accent}" stroke-width="1.2"/>
      <rect x="52" y="68" width="${W - 104}" height="${H - 136}" fill="none" stroke="${soft}" stroke-width="6"/>
      ${mandala(W / 2, 200, 80, accent, 20)}
      <circle cx="${W / 2}" cy="200" r="12" fill="${accent}"/>
      ${text(W / 2, 340, "SHUBH VIVAH", { size: 16, family: SANS, fill: accent, ls: 8, weight: 700 })}
      ${names(d, 420, ink, 60)}
      ${text(W / 2, 590, "with the blessings of our elders", { size: 20, fill: ink, style: "italic", opacity: 0.85 })}
      ${leaf(200, 640, 60, 0, accent)}${leaf(400, 640, 60, 180, accent)}
      ${text(W / 2, 646, "✦", { size: 16, fill: accent, family: SANS })}
      ${text(W / 2, 700, d.date, { size: 30, fill: ink, ls: 2 })}
      ${text(W / 2, 735, d.city.toUpperCase(), { size: 12, family: SANS, fill: ink, ls: 6 })}`;
  },
  floral(d) {
    const { bg, ink, accent, soft, extra } = d.p;
    const cluster = (cx, cy, flip) => `
      ${leaf(cx, cy, 90, flip ? 200 : -20, accent)}
      ${leaf(cx, cy, 70, flip ? 240 : 30, accent)}
      ${leaf(cx, cy, 60, flip ? 160 : 70, accent)}
      ${flower(cx + (flip ? -10 : 10), cy, 34, extra ?? "#fff", "#e7c86a", 10)}
      ${flower(cx + (flip ? -60 : 60), cy + 30, 22, extra ?? "#fff", "#e7c86a", -15)}
      ${flower(cx + (flip ? -30 : 30), cy + 70, 16, extra ?? "#fff", "#e7c86a", 30)}`;
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      <rect x="36" y="36" width="${W - 72}" height="${H - 72}" rx="20" fill="${soft}"/>
      ${cluster(70, 80, false)}
      ${cluster(W - 70, H - 160, true)}
      ${text(W / 2, 270, "you are warmly invited to", { size: 22, fill: ink, style: "italic", opacity: 0.8 })}
      ${text(W / 2, 300, "THE WEDDING CELEBRATION OF", { size: 12, family: SANS, fill: ink, ls: 5 })}
      ${names(d, 390, ink, 66)}
      <line x1="230" y1="570" x2="370" y2="570" stroke="${accent}" stroke-width="1"/>
      ${text(W / 2, 620, d.date, { size: 30, fill: accent, ls: 2 })}
      ${text(W / 2, 655, d.city.toUpperCase(), { size: 12, family: SANS, fill: ink, ls: 6 })}`;
  },
  minimal(d) {
    const { bg, ink, accent, soft } = d.p;
    return `
      <rect width="${W}" height="${H}" fill="${bg}"/>
      <rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="none" stroke="${ink}" stroke-width="0.6" opacity="0.4"/>
      <circle cx="${W / 2}" cy="230" r="70" fill="${soft}"/>
      <circle cx="${W / 2 + 26}" cy="230" r="70" fill="none" stroke="${accent}" stroke-width="1.2"/>
      ${text(W / 2, 380, "SAVE THE DATE", { size: 13, family: SANS, fill: ink, ls: 8 })}
      ${text(W / 2, 470, d.a, { size: 70, fill: ink, weight: 300 })}
      ${text(W / 2, 520, "and", { size: 24, fill: accent, style: "italic" })}
      ${text(W / 2, 600, d.b, { size: 70, fill: ink, weight: 300 })}
      ${text(W / 2, 690, d.date, { size: 20, family: SANS, fill: ink, ls: 6 })}
      ${text(W / 2, 722, d.city.toUpperCase(), { size: 11, family: SANS, fill: ink, ls: 6, opacity: 0.6 })}`;
  },
};

// Phone-sized website preview: hero, countdown, events and RSVP.
function screen(d) {
  const SW = 390;
  const SH = 844;
  const { bg, ink, accent, soft } = d.p;
  const light = ["#f", "#e"].some((s) => bg.toLowerCase().startsWith(s));
  const card = light ? "#ffffff" : soft;
  const events = [
    ["Haldi", "Morning · 10:00 AM"],
    ["Sangeet", "Evening · 7:30 PM"],
    ["Wedding", "Muhurat · 8:15 PM"],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}">
    <rect width="${SW}" height="${SH}" fill="${bg}"/>
    ${text(24, 44, `${d.a[0]} &amp; ${d.b[0]}`, { size: 18, fill: ink, anchor: "start", style: "italic" })}
    ${[0, 1, 2].map((i) => `<rect x="${SW - 46}" y="${32 + i * 6}" width="22" height="1.6" fill="${ink}"/>`).join("")}
    <path d="${archPath(45, 80, 300, 300)}" fill="${soft}"/>
    <path d="${archPath(60, 95, 270, 285)}" fill="none" stroke="${accent}" stroke-width="1"/>
    ${text(SW / 2, 200, "WE'RE GETTING MARRIED", { size: 10, family: SANS, fill: ink, ls: 3 })}
    ${text(SW / 2, 255, d.a, { size: 42, fill: ink, style: "italic" })}
    ${text(SW / 2, 290, "&amp;", { size: 22, fill: accent, style: "italic" })}
    ${text(SW / 2, 335, d.b, { size: 42, fill: ink, style: "italic" })}
    ${text(SW / 2, 420, d.date, { size: 18, fill: ink, ls: 3 })}
    ${text(SW / 2, 442, d.city.toUpperCase(), { size: 9, family: SANS, fill: ink, ls: 4, opacity: 0.7 })}
    ${["42", "08", "16", "35"].map((n, i) => `
      <rect x="${33 + i * 84}" y="470" width="72" height="66" rx="12" fill="${card}" stroke="${accent}" stroke-opacity="0.35"/>
      ${text(69 + i * 84, 504, n, { size: 24, fill: ink })}
      ${text(69 + i * 84, 524, ["DAYS", "HRS", "MIN", "SEC"][i], { size: 8, family: SANS, fill: ink, ls: 2, opacity: 0.7 })}`).join("")}
    ${text(24, 582, "The Celebrations", { size: 22, fill: ink, anchor: "start", style: "italic" })}
    ${events.map(([t, s], i) => `
      <rect x="24" y="${600 + i * 62}" width="${SW - 48}" height="52" rx="14" fill="${card}" stroke="${accent}" stroke-opacity="0.3"/>
      <circle cx="50" cy="${626 + i * 62}" r="10" fill="${accent}"/>
      ${text(72, 622 + i * 62, t, { size: 15, fill: ink, anchor: "start" })}
      ${text(72, 638 + i * 62, s, { size: 9, family: SANS, fill: ink, anchor: "start", opacity: 0.7 })}
      ${text(SW - 40, 630 + i * 62, "MAP →", { size: 9, family: SANS, fill: accent, anchor: "end", ls: 2, weight: 700 })}`).join("")}
    <rect x="24" y="${SH - 60}" width="${SW - 48}" height="44" rx="22" fill="${accent}"/>
    ${text(SW / 2, SH - 33, "RSVP NOW", { size: 12, family: SANS, fill: light ? "#ffffff" : bg, ls: 4, weight: 700 })}
  </svg>`;
}

for (const d of designs) {
  const card = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${styles[d.style](d)}</svg>`;
  writeFileSync(join(OUT, `${d.slug}.svg`), card.replace(/\n\s+/g, "\n"));
  writeFileSync(join(OUT, `${d.slug}-screen.svg`), screen(d).replace(/\n\s+/g, "\n"));
}
console.log(`Generated ${designs.length * 2} previews in ${OUT}`);
