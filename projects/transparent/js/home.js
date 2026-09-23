import { manifest, mountTopbar, mountFooter, el, img, coverImg, closeupImg, fmt, expandInto, reducedMotion, siteUrl } from "./common.js";

const m = await manifest();
mountTopbar(document.getElementById("topbar"), m);
mountFooter(document.getElementById("footer"), m);

/* ── hero ─────────────────────────────────────────────────────────────── */
const heroScene = m.scenes.find((s) => s.id === m.hero.scene);
document.getElementById("hero-stats").textContent =
  `${m.totals.scenes} scenes · ${fmt(m.totals.frames)} views · ${m.totals.modalities} modalities`;
document.getElementById("inset-label").textContent = `${heroScene.name} · close-up`;
document.getElementById("inset-badge").textContent = m.hero.inset_source === "preview" ? "preview" : m.hero.inset_frame;
const inset = document.getElementById("hero-inset");
inset.href = siteUrl(`scene.html?id=${m.hero.scene}&frame=${m.hero.inset_frame}`);
inset.addEventListener("click", (e) => { e.preventDefault(); expandInto(inset.querySelector("img"), inset.href); });
if (!reducedMotion()) document.getElementById("hero").classList.add("drift");

/* ── the 3×3 index ────────────────────────────────────────────────────── */
const grid = document.getElementById("grid");
const cells = new Map();
let current = "rgb";

for (const s of m.scenes) {
  const base = el("img", { class: "base", src: coverImg(s.id), alt: `${s.name} (${s.id})`, loading: "lazy", decoding: "async" });
  const alt = el("img", { class: "alt", src: closeupImg(s.id), alt: "", loading: "lazy", decoding: "async", "aria-hidden": "true" });
  const badge = el("span", { class: "badge mono", text: "preview", hidden: s.closeup.source !== "preview" });
  const cell = el("a", { class: "cell", href: siteUrl(`scene.html?id=${s.id}`), "aria-label": `${s.name}, ${s.frames} views` },
    base, alt, badge,
    el("button", { class: "peek", text: "◑", "aria-label": "Vessel close-up",
      onclick: (e) => { e.preventDefault(); e.stopPropagation(); cell.classList.toggle("show-alt"); } }),
    el("span", { class: "cap" },
      el("span", { class: "name", text: s.name }),
      el("span", { class: "id mono", text: s.id })),
  );
  // hover trades the wide cover for the close-up and back.  it never cycles
  // modalities - the first job here is telling the nine labs apart.
  cell.addEventListener("pointerenter", () => {
    if (current === "rgb" && matchMedia("(hover:hover)").matches) cell.classList.add("show-alt");
  });
  cell.addEventListener("pointerleave", () => cell.classList.remove("show-alt"));
  cell.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    // the ghost must be the picture the stage will actually open on: a dataset
    // close-up opens on its own frame; a preview close-up is not in the dataset,
    // so the stage opens on the cover and that is what grows
    const altShown = cell.classList.contains("show-alt") && current === "rgb";
    if (altShown && s.closeup.source === "dataset") expandInto(alt, `${cell.href}?frame=${s.closeup.frame}`);
    else expandInto(base, cell.href);
  });
  grid.append(cell);
  cells.set(s.id, { cell, base, alt, badge, scene: s });
}

/* ── one switch, all nine covers ──────────────────────────────────────── */
const bar = document.getElementById("global-modality");
const colorbar = document.getElementById("colorbar");
const buttons = m.primary_modalities.map((key) => {
  const mod = m.modalities.find((x) => x.key === key);
  return el("button", { type: "button", text: mod.label, "aria-pressed": String(key === "rgb"), title: mod.note, onclick: () => setModality(key) });
});
bar.append(...buttons);

function setModality(key) {
  current = key;
  buttons.forEach((b, i) => b.setAttribute("aria-pressed", String(m.primary_modalities[i] === key)));
  grid.classList.add("swap");
  setTimeout(() => grid.classList.remove("swap"), 160);
  for (const { cell, base, alt, badge, scene } of cells.values()) {
    cell.classList.remove("show-alt");
    if (key === "rgb") {
      base.src = coverImg(scene.id); alt.src = closeupImg(scene.id); alt.hidden = false;
      badge.hidden = scene.closeup.source !== "preview";
    } else {
      // every card keeps the frame it already showed, only in another modality
      base.src = img(key, scene.id, scene.cover.frame); alt.hidden = true; badge.hidden = true;
    }
  }
  colorbar.replaceChildren();
  colorbar.hidden = key !== "depth";
  if (key === "depth") {
    colorbar.append(
      el("span", { class: "ramp ramp-turbo" }),
      el("span", { text: "Near → far, log scale" }),
      el("span", { class: "inv", html: `<i></i>Invalid` }),
      el("span", { class: "ranges mono", html: m.scenes.map((s) => `<b>${s.id}</b> ${s.depth.lo_m}–${s.depth.hi_m} m`).join("") }),
      el("span", { class: "warn", text: "Each scene uses its own range; colors are not comparable across scenes" }),
    );
  }
}
