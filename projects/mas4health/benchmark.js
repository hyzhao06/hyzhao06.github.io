const DATA = window.MAS4HEALTH_RESULTS;

if (!DATA) throw new Error("MAS4Health benchmark data is unavailable");

const METRICS = {
  dice: { label: "Dice ↑", unit: "", decimals: 3, higher: true },
  iou: { label: "IoU ↑", unit: "", decimals: 3, higher: true },
  recall: { label: "Recall ↑", unit: "", decimals: 3, higher: true },
  precision: { label: "Precision ↑", unit: "", decimals: 3, higher: true },
  hd95: { label: "HD95 ↓", unit: "mm", decimals: 1, higher: false },
  lesionRecall: { label: "Lesion recall ↑", unit: "", decimals: 3, higher: true },
  lesionPrecision: { label: "Lesion precision ↑", unit: "", decimals: 3, higher: true },
  runtime: { label: "Runtime ↓", unit: "s", decimals: 1, higher: false },
  vram: { label: "Peak VRAM ↓", unit: "GB", decimals: 1, higher: false }
};

const ORACLE = { id: "oracle", name: "逐样本最优" };
const COLUMNS = [...DATA.models, ORACLE];
const CHART_COLORS = {
  voxtell: "#17676c",
  biomedparse: "#cf7040",
  segvol: "#8064a2",
  medsam3: "#3979b8",
  merlin: "#6d777b"
};

function mixColor(score) {
  const stops = [[249, 251, 251], [219, 237, 237], [143, 204, 201]];
  const value = Math.max(0, Math.min(1, score));
  const segment = value < 0.5 ? 0 : 1;
  const local = segment === 0 ? value * 2 : (value - 0.5) * 2;
  const start = stops[segment];
  const end = stops[segment + 1];
  return `rgb(${start.map((channel, index) => Math.round(channel + (end[index] - channel) * local)).join(",")})`;
}

function formatValue(value, metric) {
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "−∞";
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(metric.decimals);
}

function rowScores(values, metric) {
  const finite = values.filter(Number.isFinite);
  const minimum = Math.min(...finite);
  const maximum = Math.max(...finite);
  const distance = Math.max(maximum - minimum, Number.EPSILON);
  return values.map(value => {
    if (!Number.isFinite(value)) return 0;
    const normalized = (value - minimum) / distance;
    return metric.higher ? normalized : 1 - normalized;
  });
}

function renderHead() {
  const modelHeaders = COLUMNS.map(column => `
    <th scope="col" class="${column.id === "oracle" ? "oracle-column" : ""}">${column.name}</th>`).join("");
  document.querySelector("#benchmark-head").innerHTML = `<tr><th scope="col" class="dataset-column">数据集</th>${modelHeaders}</tr>`;
}

function resultCell(value, score, metric, column) {
  const classes = ["result-cell"];
  if (column.id === "oracle") classes.push("oracle-column");
  if (score > 0.999) classes.push("row-best");
  return `<td class="${classes.join(" ")}" style="--cell-color:${mixColor(score)}">
    <strong>${formatValue(value, metric)}</strong>${metric.unit ? `<span>${metric.unit}</span>` : ""}
  </td>`;
}

function renderTable(metricKey) {
  const metric = METRICS[metricKey];
  document.querySelector("#benchmark-body").innerHTML = DATA.datasets.map(dataset => {
    const values = COLUMNS.map(column => DATA.values[dataset.id][column.id][metricKey]);
    const scores = rowScores(values, metric);
    const cells = COLUMNS.map((column, index) => resultCell(values[index], scores[index], metric, column)).join("");
    return `<tr><th scope="row" class="dataset-label">${dataset.name}</th>${cells}</tr>`;
  }).join("");

  const totalValues = COLUMNS.map(column => DATA.totals[column.id][metricKey]);
  const totalScores = rowScores(totalValues, metric);
  const totalCells = COLUMNS.map((column, index) => resultCell(totalValues[index], totalScores[index], metric, column)).join("");
  document.querySelector("#benchmark-foot").innerHTML = `<tr><th scope="row" class="dataset-label total-label">总计</th>${totalCells}</tr>`;

  document.querySelectorAll(".metrics button").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.metric === metricKey));
  });
}

function renderChart(metricKey) {
  const metric = METRICS[metricKey];
  const canvas = document.querySelector("#performance-chart");
  const context = canvas.getContext("2d");
  if (!context) return;

  const ratio = Math.max(1, window.devicePixelRatio || 1);
  const cssWidth = Math.max(1050, canvas.getBoundingClientRect().width || 1050);
  const cssHeight = 250;
  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, cssWidth, cssHeight);

  const margin = { top: 10, right: 16, bottom: 62, left: 42 };
  const width = cssWidth - margin.left - margin.right;
  const height = cssHeight - margin.top - margin.bottom;
  const x = index => margin.left + (width * index) / (DATA.datasets.length - 1);
  const allValues = DATA.models.flatMap(model => DATA.datasets.map(dataset => DATA.values[dataset.id][model.id][metricKey]));
  const finiteValues = allValues.filter(Number.isFinite);
  const boundedRatio = ["dice", "iou", "recall", "precision", "lesionRecall", "lesionPrecision"].includes(metricKey);
  const minimum = boundedRatio ? 0 : Math.min(...finiteValues);
  const maximum = boundedRatio ? 1 : Math.max(...finiteValues);
  const distance = Math.max(maximum - minimum, Number.EPSILON);
  const normalize = value => Number.isFinite(value) ? (value - minimum) / distance : 1;
  const y = value => margin.top + height * (metric.higher ? 1 - normalize(value) : normalize(value));
  const axisValue = tick => metric.higher
    ? maximum - (distance * tick) / 5
    : minimum + (distance * tick) / 5;
  const axisDecimals = boundedRatio ? 1 : 0;
  canvas.setAttribute("aria-label", `横轴为数据集，纵轴为${metric.label.replace(/[↑↓]/g, "").trim()}，每条折线表示一个模型`);

  context.font = "10px Inter, sans-serif";
  context.lineWidth = 1;
  for (let tick = 0; tick <= 5; tick += 1) {
    const py = margin.top + (height * tick) / 5;
    context.beginPath();
    context.strokeStyle = tick === 5 ? "#aebabc" : "#e5e9e9";
    context.moveTo(margin.left, py);
    context.lineTo(cssWidth - margin.right, py);
    context.stroke();
    context.fillStyle = "#718084";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillText(axisValue(tick).toFixed(axisDecimals), margin.left - 7, py);
  }

  context.fillStyle = "#647377";
  context.textAlign = "right";
  context.textBaseline = "middle";
  DATA.datasets.forEach((dataset, index) => {
    context.save();
    context.translate(x(index) + 2, margin.top + height + 10);
    context.rotate(-Math.PI / 4);
    context.fillText(dataset.name, 0, 0);
    context.restore();
  });

  DATA.models.forEach(model => {
    const values = DATA.datasets.map(dataset => DATA.values[dataset.id][model.id][metricKey]);
    context.beginPath();
    context.strokeStyle = CHART_COLORS[model.id];
    context.lineWidth = 2;
    context.lineJoin = "round";
    context.lineCap = "round";
    values.forEach((value, index) => {
      if (index === 0) context.moveTo(x(index), y(value));
      else context.lineTo(x(index), y(value));
    });
    context.stroke();
    values.forEach((value, index) => {
      context.beginPath();
      context.fillStyle = CHART_COLORS[model.id];
      context.arc(x(index), y(value), 2.6, 0, Math.PI * 2);
      context.fill();
    });
  });

  document.querySelector("#chart-legend").innerHTML = DATA.models.map(model => `
    <span><i style="--series-color:${CHART_COLORS[model.id]}"></i>${model.name}</span>`).join("");
}

const metricButtons = document.querySelector("#metric-buttons");
Object.entries(METRICS).forEach(([key, metric]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = metric.label;
  button.dataset.metric = key;
  button.setAttribute("aria-controls", "benchmark-table");
  button.addEventListener("click", () => {
    renderChart(key);
    renderTable(key);
  });
  metricButtons.append(button);
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  const active = document.querySelector(".metrics button[aria-pressed='true']");
  resizeTimer = setTimeout(() => renderChart(active ? active.dataset.metric : "dice"), 120);
});

renderHead();
renderChart("dice");
renderTable("dice");
