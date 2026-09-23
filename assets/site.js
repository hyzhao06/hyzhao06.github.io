const button = document.getElementById("theme");

function render() {
  const light = document.documentElement.dataset.theme === "light";
  button.textContent = light ? "☾" : "☀";
  button.title = light ? "Use dark theme" : "Use light theme";
  button.setAttribute("aria-label", button.title);
}

button.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("personal-theme", next);
  render();
});

render();
