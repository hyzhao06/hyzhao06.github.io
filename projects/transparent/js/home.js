import { manifest, mountTopbar, mountFooter, el, img, coverImg, closeupImg, fmt, expandInto, reducedMotion, siteUrl } from "./common.js?v=20260923-ui-6";

const m = await manifest();
mountTopbar(document.getElementById("topbar"), m);
mountFooter(document.getElementById("footer"), m);

/* ── hero ─────────────────────────────────────────────────────────────── */
const heroScene = m.scenes.find((s) => s.id === "lab100");
document.getElementById("hero-stats").textContent =
  `${fmt(m.totals.frames)} displayed views · ${m.totals.modalities} modalities`;
document.getElementById("inset-label").textContent = `${heroScene.name} · close-up`;
document.getElementById("inset-badge").textContent = heroScene.closeup.frame;
const inset = document.getElementById("hero-inset");
inset.addEventListener("click", (e) => { e.preventDefault(); expandInto(inset.querySelector("img"), inset.href); });
const hero = document.getElementById("hero");
const track = document.getElementById("hero-track");
const featured = [
  { scene: heroScene, frame: heroScene.cover.frame, inset: heroScene.closeup.frame, src: img("rgb", heroScene.id, heroScene.cover.frame), position: "50% 50%" },
  ...["lab056", "lab088", "lab018", "navigation"].map((id) => {
    const scene = m.scenes.find((s) => s.id === id);
    return { scene, frame: scene.cover.frame, inset: scene.closeup.frame, src: img("rgb", id, scene.cover.frame), position: "50% 50%" };
  }),
];
const slides = featured.map((item, i) => {
  const slide = i === 0 ? track.firstElementChild : el("div", { class: "hero-slide" },
    el("img", { class: "hero-img", src: item.src, alt: `${item.scene.name} laboratory scene, frame ${item.frame}`, decoding: "async" }));
  slide.classList.toggle("is-active", i === 0);
  slide.querySelector("img").style.objectPosition = item.position;
  if (i) track.append(slide);
  return slide;
});
const firstClone = slides[0].cloneNode(true);
const lastClone = slides.at(-1).cloneNode(true);
firstClone.querySelector("[id]")?.removeAttribute("id");
lastClone.querySelector("[id]")?.removeAttribute("id");
firstClone.setAttribute("aria-hidden", "true");
lastClone.setAttribute("aria-hidden", "true");
track.prepend(lastClone);
track.append(firstClone);
const dotsHost = document.getElementById("hero-dots");
let currentSlide = 0;
let userPaused = reducedMotion();
let carouselTimer = null;
let pendingSnap = null;
let transitionBusy = false;
let transitionTimer = null;
const moveQueue = [];
const dots = featured.map((item, i) => el("button", {
  type: "button", "aria-label": `Show ${item.scene.name}`, onclick: () => queueMove({ type: "jump", value: i }, true),
}));
dotsHost.append(...dots);

function paintSlide(index, slot) {
  currentSlide = index;
  const item = featured[currentSlide];
  track.style.transform = `translateX(-${slot * 100}%)`;
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === currentSlide);
    slide.setAttribute("aria-hidden", String(i !== currentSlide));
  });
  dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === currentSlide)));
  document.getElementById("hero-slide-label").textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")} · ${item.scene.name}`;
  inset.href = siteUrl(`scene.html?id=${item.scene.id}&frame=${item.inset}`);
  inset.querySelector("img").src = closeupImg(item.scene.id);
  document.getElementById("inset-label").textContent = `${item.scene.name} · close-up`;
  document.getElementById("inset-badge").textContent = item.inset;
}

function runMove(move) {
  const index = move.type === "step" ? currentSlide + move.value : move.value;
  let slot;
  if (index >= featured.length) {
    slot = featured.length + 1;
    pendingSnap = 1;
    paintSlide(0, slot);
  } else if (index < 0) {
    slot = 0;
    pendingSnap = featured.length;
    paintSlide(featured.length - 1, slot);
  } else {
    slot = index + 1;
    pendingSnap = null;
    if (index === currentSlide) return;
    paintSlide(index, slot);
  }
  transitionBusy = true;
  clearTimeout(transitionTimer);
  transitionTimer = setTimeout(finishMove, 950);
  if (reducedMotion()) finishMove();
}

function queueMove(move, manual = false) {
  if (manual) restartCarousel();
  if (transitionBusy) {
    moveQueue.push(move);
    return;
  }
  runMove(move);
}

function finishMove() {
  if (!transitionBusy) return;
  clearTimeout(transitionTimer);
  if (pendingSnap != null) {
    const snapSlot = pendingSnap;
    pendingSnap = null;
    track.classList.add("no-transition");
    void track.offsetWidth;
    track.style.transform = `translateX(-${snapSlot * 100}%)`;
    void track.offsetWidth;
    track.classList.remove("no-transition");
  }
  transitionBusy = false;
  const next = moveQueue.shift();
  if (next) requestAnimationFrame(() => runMove(next));
}

track.addEventListener("transitionend", (event) => {
  if (event.target === track && event.propertyName === "transform") finishMove();
});
track.addEventListener("transitioncancel", (event) => {
  if (event.target === track && event.propertyName === "transform") finishMove();
});
function startCarousel() {
  if (userPaused || reducedMotion()) return;
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => queueMove({ type: "step", value: 1 }), 6500);
}
function restartCarousel() { clearInterval(carouselTimer); startCarousel(); }
document.getElementById("hero-prev").addEventListener("click", () => queueMove({ type: "step", value: -1 }, true));
document.getElementById("hero-next").addEventListener("click", () => queueMove({ type: "step", value: 1 }, true));
const pause = document.getElementById("hero-pause");
pause.addEventListener("click", () => {
  userPaused = !userPaused;
  pause.textContent = userPaused ? "▶" : "Ⅱ";
  pause.setAttribute("aria-label", userPaused ? "Play carousel" : "Pause carousel");
  restartCarousel();
});
let touchX = null;
hero.addEventListener("pointerdown", (e) => { if (!e.target.closest("a,button")) touchX = e.clientX; });
hero.addEventListener("pointerup", (e) => {
  if (touchX == null) return;
  const delta = e.clientX - touchX; touchX = null;
  if (Math.abs(delta) > 45) queueMove({ type: "step", value: delta < 0 ? 1 : -1 }, true);
});
hero.addEventListener("mouseenter", () => clearInterval(carouselTimer));
hero.addEventListener("mouseleave", startCarousel);
document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(carouselTimer) : startCarousel());
track.classList.add("no-transition");
paintSlide(0, 1);
requestAnimationFrame(() => requestAnimationFrame(() => track.classList.remove("no-transition")));
if (!reducedMotion()) { hero.classList.add("drift"); startCarousel(); }

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
  // Keep the reviewed scene-wide image as the cover. A close-up is shown only
  // when the visitor explicitly presses the peek button.
  cell.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    // the ghost must be the picture the stage will actually open on: a dataset
    // close-up opens on its own frame; a preview close-up is not in the dataset,
    // so the stage opens on the cover and that is what grows
    const altShown = cell.classList.contains("show-alt") && current === "rgb";
    if (altShown && s.closeup.source === "dataset") {
      const target = new URL(cell.href);
      target.searchParams.set("frame", s.closeup.frame);
      expandInto(alt, target.href);
    } else expandInto(base, cell.href);
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
