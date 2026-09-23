const ROOT = new URL("../", import.meta.url);
export const BASE = ROOT.pathname.replace(/\/$/, "");
export const siteUrl = (path = "") => `${BASE}/${path.replace(/^\//, "")}`;
export const MEDIA = siteUrl("media");

export const img = (modality, scene, frame, { thumb = false, eye = "l" } = {}) =>
  `${MEDIA}/${modality}/${scene}/${frame}${eye === "r" ? "_r" : ""}${thumb ? "_t" : ""}.webp`;
export const coverImg = (scene) => `${MEDIA}/cover/${scene}.webp`;
export const closeupImg = (scene) => `${MEDIA}/closeup/${scene}.webp`;

let _manifest = null;
export async function manifest() {
  if (!_manifest) _manifest = await (await fetch(siteUrl("data/manifest.json?v=20260923-ui-6"))).json();
  return _manifest;
}
export const sceneData = async (id) => (await fetch(siteUrl(`data/scenes/${id}.json`))).json();

export const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === null || v === undefined) continue;
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) if (c != null) n.append(c);
  return n;
};

export const FULL_TITLE = "Retrieval-Augmented Transparent Object Perception for Autonomous Laboratories";
export const SHORT_TITLE = "Transparent Object Perception";

export const fmt = (n) => n.toLocaleString("en-US");
export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function themeButton() {
  const button = el("button", { class: "theme-toggle", type: "button" });
  const render = () => {
    const light = document.documentElement.dataset.theme === "light";
    button.textContent = light ? "☾" : "☀";
    button.title = light ? "Use dark theme" : "Use light theme";
    button.setAttribute("aria-label", button.title);
  };
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    render();
  });
  render();
  return button;
}

export const mountThemeToggle = (host) => host.prepend(themeButton());

/** Top bar: brand on the left, one line of numbers on the right. */
export function mountTopbar(host, m) {
  host.append(
    el("span", { class: "brand" }, el("a", { href: siteUrl(), title: FULL_TITLE },
      el("b", { class: "long", text: FULL_TITLE }),
      el("b", { class: "short", text: SHORT_TITLE }))),
    el("nav", {},
      el("a", { href: `${siteUrl()}#scenes`, text: "Scenes" }),
      el("a", { href: siteUrl("equipment.html"), text: "Equipment" })),
    themeButton(),
    el("span", { class: "meta mono", text: `${fmt(m.totals.frames)} displayed views` }),
  );
  const onScroll = () => host.classList.toggle("solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function mountFooter(host, m) {
  host.append(
    el("span", { text: FULL_TITLE }),
    el("span", { class: "spacer" }),
    el("span", { class: "mono", text: `${fmt(m.totals.frames)} displayed views · ${m.built.slice(0, 4)}` }),
  );
}

/**
 * Card → stage transition.  The clicked cover is cloned to a fixed layer and
 * grown into the box the stage will draw it in, then the page changes; the
 * stage fades its own image in on top of the same geometry.
 */
export function expandInto(imgNode, href) {
  if (reducedMotion()) { location.href = href; return; }
  const r = imgNode.getBoundingClientRect();
  const ghost = el("img", { src: imgNode.currentSrc || imgNode.src, class: "ghost", alt: "" });
  Object.assign(ghost.style, {
    left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`,
  });
  const veil = el("div", { class: "veil" });
  document.body.append(veil, ghost);
  // target box: same maths as the stage (contain inside the viewport strip)
  const asp = 16 / 9;
  const top = 58, bottom = 150;           // stage-bar and stage-controls heights
  const vw = innerWidth, vh = innerHeight - top - bottom;
  const w = Math.min(vw, vh * asp), h = w / asp;
  requestAnimationFrame(() => {
    veil.classList.add("on");
    Object.assign(ghost.style, {
      left: `${(vw - w) / 2}px`, top: `${top + (vh - h) / 2}px`, width: `${w}px`, height: `${h}px`,
    });
  });
  sessionStorage.setItem("stage-enter", "1");
  setTimeout(() => { location.href = href; }, 330);
}
