const DATA = window.MAS4HEALTH_RESULTS;

if (!DATA) {
  throw new Error("MAS4Health benchmark data is unavailable");
}

const METRICS = {
  dice: {
    label: "Dice ↑", name: "Dice", unit: "", decimals: 3, higher: true,
    description: "体素重叠质量；越高越好",
    formula: "Dice = 2|P ∩ G| / (|P| + |G|)",
    explanation: "P 为预测区域，G 为真实标注区域。预测与标注均为空时记为 1。",
    aggregation: "数据集行取全部病例的算术平均；总计行直接在 7,251 个病例上重新计算平均值。"
  },
  iou: {
    label: "IoU ↑", name: "IoU", unit: "", decimals: 3, higher: true,
    description: "交并比；越高越好",
    formula: "IoU = |P ∩ G| / |P ∪ G|",
    explanation: "用预测区域与真实区域的交集体素数除以并集体素数；两者均为空时记为 1。",
    aggregation: "数据集行取全部病例的算术平均；总计行直接在 7,251 个病例上重新计算平均值。"
  },
  recall: {
    label: "Recall ↑", name: "Recall", unit: "", decimals: 3, higher: true,
    description: "体素召回率；越高越好",
    formula: "Recall = TP / (TP + FN)",
    explanation: "表示真实肿瘤体素中被模型识别出的比例；真实标注为空时记为 1。",
    aggregation: "数据集行取全部病例的算术平均；总计行直接在 7,251 个病例上重新计算平均值。"
  },
  precision: {
    label: "Precision ↑", name: "Precision", unit: "", decimals: 3, higher: true,
    description: "体素精确率；越高越好",
    formula: "Precision = TP / (TP + FP)",
    explanation: "表示预测区域中真正属于目标的比例；预测为空且标注非空时记为 0。",
    aggregation: "数据集行取全部病例的算术平均；总计行直接在 7,251 个病例上重新计算平均值。"
  },
  hd95: {
    label: "HD95 ↓", name: "HD95", unit: "mm", decimals: 1, higher: false,
    description: "95% Hausdorff 表面距离；越低越好",
    formula: "HD95 = Q₀.₉₅(d(∂P → ∂G) ∪ d(∂G → ∂P))",
    explanation: "合并两个方向的最近表面距离并取第 95 百分位，距离按体素间距换算为毫米。",
    aggregation: "数据集行取病例中位数；总计行在 7,251 个病例上重新取中位数。"
  },
  lesionRecall: {
    label: "Lesion recall ↑", name: "Lesion recall", unit: "", decimals: 3, higher: true,
    description: "病灶级召回率；越高越好",
    formula: "Lesion recall = 检出的真实病灶数 / 真实病灶总数",
    explanation: "以三维 26 邻域连通分量定义病灶；与预测区域有任意体素重叠即视为检出。",
    aggregation: "数据集行取全部病例的算术平均；总计行直接在 7,251 个病例上重新计算平均值。"
  },
  lesionPrecision: {
    label: "Lesion precision ↑", name: "Lesion precision", unit: "", decimals: 3, higher: true,
    description: "病灶级精确率；越高越好",
    formula: "Lesion precision = 命中的预测病灶数 / 预测病灶总数",
    explanation: "以三维 26 邻域连通分量定义病灶；与真实区域有任意体素重叠即视为命中。",
    aggregation: "数据集行取全部病例的算术平均；总计行直接在 7,251 个病例上重新计算平均值。"
  },
  runtime: {
    label: "Runtime ↓", name: "Runtime", unit: "s", decimals: 1, higher: false,
    description: "单病例运行时间；越低越好",
    formula: "Runtime = median(t₁, t₂, …, tₙ)",
    explanation: "tᵢ 为实验记录的单病例端到端推理时间，受影像大小、模型环境与硬件影响。",
    aggregation: "数据集行取病例中位数；总计行在 7,251 个病例上重新取中位数。"
  },
  vram: {
    label: "Peak VRAM ↓", name: "Peak VRAM", unit: "GB", decimals: 1, higher: false,
    description: "实验记录的峰值显存；越低越好",
    formula: "Peak VRAM = max(v₁, v₂, …, vₙ)",
    explanation: "vᵢ 为每个病例记录的峰值显存；该指标展示队列峰值，而不是病例平均显存。",
    aggregation: "数据集行取该队列最大值；总计行取全部 7,251 个病例中的最大值。"
  }
};

const ORACLE = { id: "oracle", name: "逐样本最优", subtitle: "按最高 Dice 选择" };
const COLUMNS = [...DATA.models, ORACLE];

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
    <th scope="col" class="${column.id === "oracle" ? "oracle-column" : ""}">
      ${column.name}<span>${column.subtitle}</span>
    </th>`).join("");
  document.querySelector("#benchmark-head").innerHTML = `<tr><th scope="col" class="dataset-column">数据集 / 任务</th>${modelHeaders}</tr>`;
}

function resultCell(value, score, metric, column) {
  const classes = ["result-cell"];
  if (column.id === "oracle") classes.push("oracle-column");
  if (score > 0.999) classes.push("row-best");
  return `<td class="${classes.join(" ")}" style="--cell-color:${mixColor(score)}">
    <strong>${formatValue(value, metric)}</strong>${metric.unit ? `<span>${metric.unit}</span>` : ""}
  </td>`;
}

function render(metricKey) {
  const metric = METRICS[metricKey];
  document.querySelector("#benchmark-body").innerHTML = DATA.datasets.map(dataset => {
    const values = COLUMNS.map(column => DATA.values[dataset.id][column.id][metricKey]);
    const scores = rowScores(values, metric);
    const cells = COLUMNS.map((column, index) => resultCell(values[index], scores[index], metric, column)).join("");
    return `<tr>
      <th scope="row" class="dataset-label"><strong>${dataset.name}</strong><span>${dataset.modality} · ${dataset.target} · ${dataset.cases.toLocaleString("en-US")} 例</span></th>
      ${cells}
    </tr>`;
  }).join("");

  const totalValues = COLUMNS.map(column => DATA.totals[column.id][metricKey]);
  const totalScores = rowScores(totalValues, metric);
  const totalCells = COLUMNS.map((column, index) => resultCell(totalValues[index], totalScores[index], metric, column)).join("");
  document.querySelector("#benchmark-foot").innerHTML = `<tr>
    <th scope="row" class="dataset-label total-label"><strong>总计</strong><span>全部 ${DATA.totalCases.toLocaleString("en-US")} 个病例</span></th>
    ${totalCells}
  </tr>`;

  document.querySelector("#metric-description").textContent = metric.description;
  document.querySelector("#method-name").textContent = metric.name;
  document.querySelector("#method-direction").textContent = metric.higher ? "越高越好" : "越低越好";
  document.querySelector("#method-formula").textContent = metric.formula;
  document.querySelector("#method-explanation").textContent = metric.explanation;
  document.querySelector("#method-aggregation").textContent = metric.aggregation;
  document.querySelectorAll(".metrics button").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.metric === metricKey));
  });
}

const metricButtons = document.querySelector("#metric-buttons");
Object.entries(METRICS).forEach(([key, metric]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = metric.label;
  button.dataset.metric = key;
  button.setAttribute("aria-controls", "benchmark-table");
  button.addEventListener("click", () => render(key));
  metricButtons.append(button);
});

renderHead();
render("dice");
