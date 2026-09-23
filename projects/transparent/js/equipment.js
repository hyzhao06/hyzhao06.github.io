import { manifest, mountTopbar, mountFooter, el, fmt, siteUrl } from "./common.js";

const m = await manifest();
mountTopbar(document.getElementById("topbar"), m);
mountFooter(document.getElementById("footer"), m);
const catalogue = await (await fetch(siteUrl("data/equipment.json"))).json();
const grid = document.getElementById("equipment-grid");
const summary = document.getElementById("equipment-summary");
const categories = document.getElementById("equipment-categories");
const query = document.getElementById("equipment-query");
let activeCategory = "all";
let visibleItems = [];
let lightboxIndex = -1;
let lightboxTrigger = null;

summary.textContent = `${fmt(catalogue.items.length)} records · dimensions, mass and source paths where available`;

function renderCategories() {
  categories.replaceChildren(...catalogue.categories.map((category) =>
    el("button", {
      type: "button",
      text: `${category.label} ${fmt(category.count)}`,
      "aria-pressed": String(category.key === activeCategory),
      onclick: () => { activeCategory = category.key; renderCategories(); render(); },
    })));
}

function matches(item, needle) {
  if (!needle) return true;
  return [item.name, item.category, item.material, item.source_path, item.geometry_path]
    .filter(Boolean).join(" ").toLowerCase().includes(needle);
}

function dimensions(item) {
  const d = item.dimensions_cm;
  if (!d || !d.length || !d.width || !d.height) return null;
  return `${d.length} × ${d.width} × ${d.height} cm`;
}

const lightboxImage = el("img", { class: "equipment-lightbox-image", alt: "" });
const lightboxTitle = el("strong");
const lightboxMeta = el("span");
const lightboxCounter = el("span", { class: "mono" });
const lightboxClose = el("button", { class: "equipment-lightbox-close", type: "button", text: "×", "aria-label": "Close enlarged image" });
const lightboxPrev = el("button", { class: "equipment-lightbox-nav equipment-lightbox-prev", type: "button", text: "‹", "aria-label": "Previous equipment" });
const lightboxNext = el("button", { class: "equipment-lightbox-nav equipment-lightbox-next", type: "button", text: "›", "aria-label": "Next equipment" });
const lightbox = el("div", { class: "equipment-lightbox", hidden: true, "aria-hidden": "true" },
  el("div", { class: "equipment-lightbox-panel", role: "dialog", "aria-modal": "true", "aria-label": "Equipment image viewer" },
    lightboxClose, lightboxPrev, lightboxNext,
    el("figure", {}, lightboxImage,
      el("figcaption", {}, lightboxTitle, lightboxMeta, el("span", { class: "spacer" }), lightboxCounter))));
document.body.append(lightbox);

function updateLightbox() {
  if (!visibleItems.length || lightboxIndex < 0) return;
  const item = visibleItems[lightboxIndex];
  lightboxImage.src = siteUrl(item.full || item.preview);
  lightboxImage.alt = item.name;
  lightboxTitle.textContent = item.name;
  lightboxMeta.textContent = [dimensions(item), item.mass_kg ? `${item.mass_kg} kg` : null, item.material].filter(Boolean).join(" · ");
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${visibleItems.length} · ${item.id}`;
}
function openLightbox(item, trigger) {
  lightboxIndex = visibleItems.indexOf(item);
  if (lightboxIndex < 0 || !item.preview) return;
  lightboxTrigger = trigger;
  updateLightbox();
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxTrigger?.focus();
}
function stepLightbox(delta) {
  if (!visibleItems.length) return;
  lightboxIndex = (lightboxIndex + delta + visibleItems.length) % visibleItems.length;
  updateLightbox();
}
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => stepLightbox(-1));
lightboxNext.addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

function card(item) {
  const image = item.preview
    ? el("img", { src: siteUrl(item.preview), alt: item.name, loading: "lazy", decoding: "async" })
    : el("div", { class: "equipment-placeholder", text: item.name.slice(0, 1) });
  const media = item.preview
    ? el("button", { class: "equipment-image", type: "button", "aria-label": `Enlarge ${item.name}`,
      onclick: (event) => openLightbox(item, event.currentTarget) }, image, el("span", { class: "zoom-cue", text: "⤢", "aria-hidden": "true" }))
    : el("div", { class: "equipment-image" }, image);
  const details = [dimensions(item), item.mass_kg ? `${item.mass_kg} kg` : null, item.material].filter(Boolean);
  return el("article", { class: "equipment-card" },
    media,
    el("div", { class: "equipment-card-body" },
      el("p", { class: "equipment-type mono", text: item.category.replace("lab-equipment", "lab equipment").replace("glass-resources", "glass resources") }),
      el("h2", { text: item.name }),
      details.length ? el("p", { class: "equipment-details", text: details.join(" · ") }) : null,
      el("p", { class: "equipment-id mono", text: item.id }),
    ));
}

function render() {
  const needle = query.value.trim().toLowerCase();
  visibleItems = catalogue.items.filter((item) =>
    (activeCategory === "all" || item.category === activeCategory) && matches(item, needle));
  grid.replaceChildren(...visibleItems.map(card));
  if (!visibleItems.length) grid.append(el("p", { class: "equipment-empty", text: "No matching equipment." }));
}

addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  else if (event.key === "ArrowLeft") stepLightbox(-1);
  else if (event.key === "ArrowRight") stepLightbox(1);
  else return;
  event.preventDefault();
});

query.addEventListener("input", render);
renderCategories();
render();
