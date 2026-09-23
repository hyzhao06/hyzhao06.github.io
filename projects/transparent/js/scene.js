import { manifest, sceneData, el, img, reducedMotion, SHORT_TITLE, siteUrl, mountThemeToggle } from "./common.js";

const params = new URLSearchParams(location.search);
const id = params.get("id") || "lab060";
const m = await manifest();
const scene = m.scenes.find((s) => s.id === id);
if (!scene) location.replace(siteUrl());
const data = await sceneData(id);
const frames = new Map(data.frames.map((f) => [f.frame, f]));
const idx = m.scenes.findIndex((s) => s.id === id);
const prevScene = m.scenes[(idx + m.scenes.length - 1) % m.scenes.length];
const nextScene = m.scenes[(idx + 1) % m.scenes.length];
mountThemeToggle(document.querySelector(".stage-bar .tools"));

let frame = frames.has(params.get("frame")) ? params.get("frame")
          : (scene.cover.frame ?? scene.featured[0]?.frame ?? data.frames[0].frame);
let modality = "rgb";
let eye = "l";
let zoom = null;                 // {x,y,w,h} normalised
let compare = null;              // second modality key, or null
let split = 0.5;                 // divider position 0..1
let activeSide = "left";         // side changed by the modality buttons while comparing

const ASPECT = scene.resolution[0] / scene.resolution[1];
const MOD = Object.fromEntries(m.modalities.map((x) => [x.key, x]));
const PRIMARY = scene.modalities.filter((k) => m.primary_modalities.includes(k) || k === "gtdepth");

document.getElementById("scene-name").textContent = scene.name;
document.getElementById("scene-id").textContent = scene.id;
document.title = `${scene.name} · ${scene.id} · ${SHORT_TITLE}`;
document.getElementById("prev-scene").href = siteUrl(`scene.html?id=${prevScene.id}`);
document.getElementById("next-scene").href = siteUrl(`scene.html?id=${nextScene.id}`);
document.getElementById("prev-scene").title = `${prevScene.name} ([)`;
document.getElementById("next-scene").title = `${nextScene.name} (])`;

/* ── layers ───────────────────────────────────────────────────────────── */
const canvas = document.getElementById("canvas");
const viewport = document.getElementById("viewport");
const divider = document.getElementById("divider");
const layers = new Map();        // "modality|eye" -> <img>

function layer(mod, e = eye) {
  const key = `${mod}|${e}`;
  let node = layers.get(key);
  if (!node) {
    node = el("img", { alt: "", decoding: "async" });
    node.addEventListener("load", () => node.classList.add("ready"));
    layers.set(key, node);
    canvas.insertBefore(node, divider);
  }
  if (node.dataset.frame !== frame || node.dataset.eye !== e) {
    node.classList.remove("ready");
    node.src = img(mod, id, frame, { eye: e });
    node.dataset.frame = frame; node.dataset.eye = e;
  }
  return node;
}

function showLayers() {
  const a = layer(modality);
  const b = compare ? layer(compare) : null;
  for (const [key, node] of layers) {
    const isA = key === `${modality}|${eye}`, isB = b && key === `${compare}|${eye}`;
    node.classList.toggle("on", isA || isB);
    node.classList.toggle("b", !!isB);
    node.style.clipPath = isB ? `inset(0 0 0 ${split * 100}%)` : "";
    node.style.zIndex = isB ? 2 : isA ? 1 : 0;
  }
  a.classList.add("on");
  divider.hidden = !compare;
  divider.style.left = `${split * 100}%`;
  const tags = document.getElementById("compare-tags");
  tags.hidden = !compare;
  if (compare) {
    const tagA = document.getElementById("tag-a");
    const tagB = document.getElementById("tag-b");
    tagA.textContent = `◧ Left · ${MOD[modality].label}`;
    tagB.textContent = `${MOD[compare].label} · Right ◨`;
    tagA.classList.toggle("active", activeSide === "left");
    tagB.classList.toggle("active", activeSide === "right");
  }
  renderLegend();
}
const prefetch = () => PRIMARY.forEach((k) => layer(k));

/* ── layout & zoom ────────────────────────────────────────────────────── */
let box = { w: 0, h: 0 };
function layout() {
  const vw = viewport.clientWidth, vh = viewport.clientHeight;
  const w = Math.min(vw, vh * ASPECT), h = w / ASPECT;
  box = { w, h };
  canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
  applyZoom(true);
}
new ResizeObserver(layout).observe(viewport);

function applyZoom(instant = false) {
  canvas.classList.toggle("no-anim", instant || reducedMotion());
  let k = 1;
  if (!zoom) canvas.style.transform = "none";
  else {
    const pad = 0.35;
    const w = Math.min(1, zoom.w * (1 + pad * 2)), h = Math.min(1, zoom.h * (1 + pad * 2));
    k = Math.min(1 / w, 1 / h, 6);
    const cx = zoom.x + zoom.w / 2, cy = zoom.y + zoom.h / 2;
    let dx = (0.5 - cx) * box.w, dy = (0.5 - cy) * box.h;
    const limX = Math.max(0, (box.w * k - viewport.clientWidth) / 2) / k;
    const limY = Math.max(0, (box.h * k - viewport.clientHeight) / 2) / k;
    dx = Math.max(-limX, Math.min(limX, dx)); dy = Math.max(-limY, Math.min(limY, dy));
    canvas.style.transform = `scale(${k}) translate(${dx}px, ${dy}px)`;
  }
  canvas.style.setProperty("--k", String(k));
  document.getElementById("zoom-exit").classList.toggle("on", !!zoom);
  if (instant) requestAnimationFrame(() => canvas.classList.remove("no-anim"));
}

/* ── hotspots ─────────────────────────────────────────────────────────── */
const coarse = matchMedia("(hover:none)").matches;
function renderHotspots() {
  canvas.querySelectorAll(".hot").forEach((n) => n.remove());
  // big boxes first so the small vessel standing inside a big one is on top
  const hots = [...(frames.get(frame).hotspots ?? [])].sort((a, b) => b.w * b.h - a.w * a.h);
  for (const h of hots) {
    const node = el("button", {
      class: "hot" + (coarse ? " dot" : ""),
      style: coarse
        ? `left:${(h.x + h.w / 2) * 100}%;top:${(h.y + h.h / 2) * 100}%`
        : `left:${h.x * 100}%;top:${h.y * 100}%;width:${h.w * 100}%;height:${h.h * 100}%`,
      "aria-label": `Zoom into ${h.label}`,
      onclick: (e) => { e.stopPropagation(); zoom = { ...h }; applyZoom(); note(); },
    }, el("span", { class: "tag", text: `${h.label} · ${(h.share * 100).toFixed(2)}%` }));
    canvas.append(node);
  }
}
const unzoom = () => { zoom = null; applyZoom(); note(); };
document.getElementById("zoom-exit").addEventListener("click", unzoom);
viewport.addEventListener("click", (e) => { if (zoom && e.target === viewport) unzoom(); });

function note() {
  const f = frames.get(frame);
  const i = scene.featured.findIndex((x) => x.frame === frame);
  const bits = [`${id} · ${frame} · ${eye === "l" ? "L" : "R"}`];
  if (!ONE_GROUP) bits.push(f.view_label);
  if (i >= 0) bits.push(`${i + 1}/${scene.featured.length}`);
  if (zoom) bits.push("zoomed");
  document.getElementById("stage-note").textContent = bits.join("  ·  ");
}

/* ── legend inside the stage ──────────────────────────────────────────── */
function renderLegend() {
  const lg = document.getElementById("legend");
  const keys = [modality, compare].filter(Boolean);
  const want = keys.find((k) => k === "depth");
  lg.hidden = !want;
  if (!want) return;
  lg.replaceChildren(
    el("span", { class: "ramp ramp-turbo" }),
    el("span", { class: "mono", text: `${scene.depth.lo_m} – ${scene.depth.hi_m} m · log` }),
    el("span", { class: "inv", html: "<i></i>Invalid" }),
  );
}

/* ── modality switch: same frame, same eye, same zoom ─────────────────── */
const modalBar = document.getElementById("modality");
function renderModalities() {
  modalBar.replaceChildren();
  modalBar.dataset.activeSide = activeSide;
  modalBar.setAttribute("aria-label", compare
    ? `Modality for the ${activeSide} side of the comparison`
    : "Modality");
  const selected = activeSide === "right" && compare ? compare : modality;
  for (const key of PRIMARY) {
    modalBar.append(el("button", { type: "button", text: MOD[key].label, title: MOD[key].note,
      "aria-pressed": String(key === selected), onclick: () => setModality(key) }));
  }
}
function setModality(key) {
  if (!compare) {
    modality = key;
  } else if (activeSide === "left") {
    // Keep the two layers distinct: choosing the current right modality on
    // the left swaps the two sides, which is the useful comparison behavior.
    if (key === compare) [modality, compare] = [compare, modality];
    else modality = key;
  } else {
    if (key === modality) [modality, compare] = [compare, modality];
    else compare = key;
  }
  showLayers(); renderModalities(); renderExt(); note(); renderDrawer();
}

/* ── compare divider ──────────────────────────────────────────────────── */
const btnCompare = document.getElementById("btn-compare");
function setCompare(on) {
  compare = on ? (modality === "rgb" ? "depth" : "rgb") : null;
  activeSide = "left";
  btnCompare.setAttribute("aria-pressed", String(!!compare));
  showLayers(); renderModalities(); renderExt();
}
btnCompare.addEventListener("click", () => setCompare(!compare));
let dragging = false;
const setSplit = (clientX) => {
  const r = canvas.getBoundingClientRect();
  split = Math.max(0.02, Math.min(0.98, (clientX - r.left) / r.width));
  showLayers();
};
divider.addEventListener("pointerdown", (e) => { dragging = true; divider.setPointerCapture(e.pointerId); e.stopPropagation(); });
divider.addEventListener("pointermove", (e) => { if (dragging) setSplit(e.clientX); });
divider.addEventListener("pointerup", () => { dragging = false; });
divider.addEventListener("click", (e) => e.stopPropagation());

function selectSide(side) {
  if (!compare || side === activeSide) return;
  activeSide = side;
  showLayers(); renderModalities(); renderExt(); renderDrawer();
}

// Images ignore pointer events so the canvas receives clicks on either half.
// Hotspots and the divider stop propagation, leaving their own interactions intact.
canvas.addEventListener("pointerdown", (e) => {
  if (!compare || e.target.closest("#divider")) return;
  const r = canvas.getBoundingClientRect();
  selectSide((e.clientX - r.left) / r.width < split ? "left" : "right");
});
canvas.addEventListener("click", (e) => {
  if (!compare || e.target !== canvas) return;
  const r = canvas.getBoundingClientRect();
  selectSide((e.clientX - r.left) / r.width < split ? "left" : "right");
});
document.getElementById("tag-a").addEventListener("click", () => selectSide("left"));
document.getElementById("tag-b").addEventListener("click", () => selectSide("right"));

/* ── extended controls ────────────────────────────────────────────────── */
const extBar = document.getElementById("ext");
function renderExt() {
  extBar.replaceChildren();
  const hasRight = frames.get(frame).has_right;
  const rightOk = hasRight;
  const selected = activeSide === "right" && compare ? compare : modality;
  const extra = el("div", { class: "modal-switch" });
  for (const key of scene.modalities.filter((key) => MOD[key].extended)) {
    extra.append(el("button", { type: "button", text: MOD[key].label, title: MOD[key].note,
      "aria-pressed": String(selected === key), onclick: () => setModality(key) }));
  }
  extBar.append(
    extra,
    el("div", { class: "modal-switch" },
        el("button", { type: "button", text: "L", "aria-pressed": String(eye === "l"), title: "Left eye",
        onclick: () => { eye = "l"; showLayers(); renderExt(); note(); } }),
      el("button", { type: "button", text: "R", "aria-pressed": String(eye === "r"), disabled: !rightOk,
        title: hasRight ? "Right eye" : "Right eye is available for featured views only",
        onclick: () => { eye = "r"; showLayers(); renderExt(); note(); } })),
  );
  if (compare) {
    const sw = el("div", { class: "modal-switch" });
    for (const key of scene.modalities) {
      sw.append(el("button", { type: "button", text: MOD[key].label, "aria-pressed": String(key === selected),
        onclick: () => setModality(key) }));
    }
    extBar.append(el("span", { class: "ext-label", text: `Change ${activeSide} side` }), sw);
  }
}
document.getElementById("btn-ext").addEventListener("click", (e) => {
  const open = !extBar.classList.toggle("hidden");
  e.currentTarget.setAttribute("aria-pressed", String(open));
});

/* ── filmstrip ────────────────────────────────────────────────────────── */
const strip = document.getElementById("filmstrip");
const TIER_ICON = { space: "◰", bench: "▭", cluster: "⁝", detail: "◎" };
const ONE_GROUP = scene.view_groups.length === 1;   // a fixed-camera scene: the group label says nothing
function renderStrip() {
  strip.replaceChildren();
  for (const f of scene.featured) {
    strip.append(el("button", { class: "shot", "aria-current": String(f.frame === frame),
      title: `${f.tier_label} · ${f.view_label} · ${f.frame}`, onclick: () => setFrame(f.frame) },
      el("img", { src: img("rgb", id, f.frame, { thumb: true }), alt: "", loading: "lazy" }),
      el("span", { class: "lab" }, el("i", { text: TIER_ICON[f.tier] }), el("b", { text: f.tier_label }),
        ONE_GROUP ? el("s", { class: "mono", text: f.frame }) : el("s", { text: f.view_label }))));
  }
  const cur = strip.querySelector('[aria-current="true"]');
  cur?.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" });
}
document.getElementById("btn-all").append(el("b", { text: String(scene.frames) }), el("span", { text: "All views" }));

function step(d) {
  const list = scene.featured.map((f) => f.frame);
  const i = list.indexOf(frame);
  setFrame(list[i < 0 ? (d > 0 ? 0 : list.length - 1) : (i + d + list.length) % list.length]);
}
document.getElementById("frame-prev").addEventListener("click", () => step(-1));
document.getElementById("frame-next").addEventListener("click", () => step(1));

function setFrame(f) {
  frame = f; zoom = null;
  if (!scene.featured.some((x) => x.frame === f)) eye = "l";
  for (const node of layers.values()) node.classList.remove("on");
  showLayers(); prefetch(); renderHotspots(); renderStrip(); renderExt();
  applyZoom(true); note(); renderDrawer();
  history.replaceState(null, "", siteUrl(`scene.html?id=${id}&frame=${f}`));
  const list = scene.featured.map((item) => item.frame);
  const i = list.indexOf(f);
  if (i >= 0) {
    for (const adjacent of [list[(i - 1 + list.length) % list.length], list[(i + 1) % list.length]]) {
      const preload = new Image();
      preload.src = img(modality, id, adjacent);
    }
  }
}

/* ── all views ────────────────────────────────────────────────────────── */
const all = document.getElementById("allviews");
const allGrid = document.getElementById("all-grid");
document.getElementById("all-title").textContent = `${scene.name} · ${scene.frames} views`;
let allBuilt = false, allGroup = "*";
function buildAll() {
  if (allBuilt) return;
  allBuilt = true;
  const groups = document.getElementById("all-groups");
  const opts = [["*", "All"], ...scene.view_groups.map((g) => [g.key, `${g.label} ${g.count}`])];
  for (const [key, label] of opts) {
    groups.append(el("button", { type: "button", text: label, "aria-pressed": String(key === allGroup),
      onclick: () => { allGroup = key; [...groups.children].forEach((b) => b.setAttribute("aria-pressed", String(b.textContent === label))); filterAll(); } }));
  }
  for (const f of data.frames) {
    allGrid.append(el("button", { "data-group": f.view_group, title: `${f.frame} · ${f.view_label}`,
      onclick: () => { setFrame(f.frame); closeAll(); } },
      el("img", { src: img("rgb", id, f.frame, { thumb: true }), alt: "", loading: "lazy" }),
      el("span", {}, el("b", { class: "mono", text: f.frame }), el("s", { text: f.view_label }))));
  }
}
function filterAll() {
  for (const b of allGrid.children) b.hidden = allGroup !== "*" && b.dataset.group !== allGroup;
}
document.getElementById("btn-all").addEventListener("click", () => {
  buildAll(); all.classList.add("open"); all.setAttribute("aria-hidden", "false");
});
const closeAll = () => { all.classList.remove("open"); all.setAttribute("aria-hidden", "true"); };
document.getElementById("all-close").addEventListener("click", closeAll);

/* ── info drawer ──────────────────────────────────────────────────────── */
const drawer = document.getElementById("drawer");
const drawerBody = document.getElementById("drawer-body");
const btnInfo = document.getElementById("btn-info");
function setDrawer(open) {
  drawer.classList.toggle("open", open); drawer.setAttribute("aria-hidden", String(!open));
  btnInfo.setAttribute("aria-pressed", String(open));
}
btnInfo.addEventListener("click", () => setDrawer(!drawer.classList.contains("open")));
document.getElementById("drawer-close").addEventListener("click", () => setDrawer(false));

const RAW = {
  rgb: () => "rgb/left.png",
  depth: (f) => `gt/l_depth_gt_m_${f}.npy`,
  seg: (f) => `gt/l_seg_${f}.png`,
  normal: (f) => `gt/l_normal_xyz_${f}.npy`,
  transparent: (f) => `gt/l_transparent_mask_${f}.png`,
  liquid: (f) => `gt/l_liquid_mask_${f}.png`,
  material: (f) => `gt/l_vessel_material_unverified_mask_${f}.png`,
};
const dl = (...pairs) => el("dl", {}, ...pairs.flatMap(([k, v, cls]) => [el("dt", { text: k }), el("dd", { class: cls || "", text: v })]));

function renderDrawer() {
  if (!drawer.classList.contains("open") && drawerBody.childElementCount) return;
  const f = frames.get(frame);
  const mod = MOD[modality];
  const range = modality === "depth" ? `${scene.depth.lo_m} – ${scene.depth.hi_m} m · turbo · log scale` : null;
  drawerBody.replaceChildren(
    dl(["Scene", `${scene.name} · ${scene.id}`], ["Frame", frame, "mono"], ["View", `${f.view_label} · ${f.view_name}`],
       ["Size", scene.resolution.join(" × "), "mono"], ["Renderer", scene.renderer], ["Modality", mod.label],
       ["File", RAW[modality](frame), "mono"], ...(range ? [["Color scale", range], ["Invalid", `${scene.depth.invalid} · raw value 0`, "mono"]] : []),
       ["Vessel pixels", `${(f.glass_share * 100).toFixed(2)} %`], ["Vessel hotspots", `${(f.hotspots ?? []).length}`],
       ["Valid GT depth", `${(f.depth_valid * 100).toFixed(1)} %`],
       ["Depth p1–p99", `${(f.depth_p1_mm / 1000).toFixed(2)} – ${(f.depth_p99_mm / 1000).toFixed(2)} m`],
       ...(f.primary_target ? [["Primary target", f.primary_target, "mono"]] : []),
       ["Ground-truth depth", scene.has_gt_depth ? `${scene.gt_depth_frames} frames available` : "Not available for this scene"]),
  );
}

/* ── keys ─────────────────────────────────────────────────────────────── */
addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  switch (e.key) {
    case "Escape": if (all.classList.contains("open")) closeAll(); else if (drawer.classList.contains("open")) setDrawer(false); else if (zoom) unzoom(); break;
    case "ArrowRight": step(1); break;
    case "ArrowLeft": step(-1); break;
    case "[": location.href = siteUrl(`scene.html?id=${prevScene.id}`); break;
    case "]": location.href = siteUrl(`scene.html?id=${nextScene.id}`); break;
    case "c": case "C": setCompare(!compare); break;
    case "i": case "I": setDrawer(!drawer.classList.contains("open")); break;
    case "f": case "F": toggleFull(); break;
    default: {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= PRIMARY.length) setModality(PRIMARY[n - 1]);
    }
  }
});
const toggleFull = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
document.getElementById("btn-full").addEventListener("click", toggleFull);

/* ── go ───────────────────────────────────────────────────────────────── */
if (sessionStorage.getItem("stage-enter")) { sessionStorage.removeItem("stage-enter"); document.body.classList.add("enter"); }
renderModalities(); renderStrip(); renderExt(); layout(); setFrame(frame);
