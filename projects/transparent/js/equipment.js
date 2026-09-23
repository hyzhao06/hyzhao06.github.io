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

function card(item) {
  const image = item.preview
    ? el("img", { src: siteUrl(item.preview), alt: item.name, loading: "lazy", decoding: "async" })
    : el("div", { class: "equipment-placeholder", text: item.name.slice(0, 1) });
  const details = [dimensions(item), item.mass_kg ? `${item.mass_kg} kg` : null, item.material].filter(Boolean);
  return el("article", { class: "equipment-card" },
    el("div", { class: "equipment-image" }, image),
    el("div", { class: "equipment-card-body" },
      el("p", { class: "equipment-type mono", text: item.category.replace("lab-equipment", "lab equipment").replace("glass-resources", "glass resources") }),
      el("h2", { text: item.name }),
      details.length ? el("p", { class: "equipment-details", text: details.join(" · ") }) : null,
      el("p", { class: "equipment-id mono", text: item.id }),
    ));
}

function render() {
  const needle = query.value.trim().toLowerCase();
  const visible = catalogue.items.filter((item) =>
    (activeCategory === "all" || item.category === activeCategory) && matches(item, needle));
  grid.replaceChildren(...visible.map(card));
  if (!visible.length) grid.append(el("p", { class: "equipment-empty", text: "No matching equipment." }));
}

query.addEventListener("input", render);
renderCategories();
render();
