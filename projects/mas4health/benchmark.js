const BENCHMARK = {
  datasets: [
    { id: "kits23", name: "KiTS23", subtitle: "CT · kidney tumor" },
    { id: "lits17", name: "LiTS17", subtitle: "CT · liver tumor" },
    { id: "brats21", name: "BraTS 2021", subtitle: "FLAIR · whole tumor" },
    { id: "merlinplus", name: "MerlinPlus", subtitle: "CT · abdominal tumor" }
  ],
  models: [
    { id: "voxtell", name: "VoxTell", subtitle: "3D open-vocabulary" },
    { id: "biomedparse", name: "BiomedParse v2", subtitle: "2D biomedical parser" },
    { id: "segvol", name: "SegVol", subtitle: "3D CT foundation model" }
  ],
  values: {
    kits23: {
      voxtell: { cases: 489, dice: .7492675359, iou: .6571940124, recall: .7932667555, precision: .7673097006, hd95: 5.845358235, lesionRecall: .8677044553, lesionPrecision: .7153343742, runtime: 12.35611666, vram: 7.672064304 },
      biomedparse: { cases: 489, dice: .3656103544, iou: .2718388926, recall: .9046361815, precision: .2864226302, hd95: 150.5743576, lesionRecall: .9458117036, lesionPrecision: .09130969885, runtime: 11.37839212, vram: 14.97343206 },
      segvol: { cases: 489, dice: .06074672667, iou: .04544066594, recall: .05743719562, precision: .08425664525, hd95: 167.8269985, lesionRecall: .1538382885, lesionPrecision: .07792721108, runtime: 10.74540402, vram: 2.204029083 }
    },
    lits17: {
      voxtell: { cases: 131, dice: .7592221904, iou: .6527957297, recall: .7949771400, precision: .7736726119, hd95: 4.434952135, lesionRecall: .7830581684, lesionPrecision: .8128866881, runtime: 151.3897352, vram: 21.30997229 },
      biomedparse: { cases: 131, dice: .4840194855, iou: .3935065347, recall: .8955345570, precision: .4214589099, hd95: 208.0109944, lesionRecall: .8688271043, lesionPrecision: .1006010717, runtime: 41.80911860, vram: 10.19511127 },
      segvol: { cases: 131, dice: .2747169162, iou: .1957764828, recall: .4422422918, precision: .2769403588, hd95: 67.63239976, lesionRecall: .4808616187, lesionPrecision: .2665143021, runtime: 35.07603531, vram: 2.133716583 }
    },
    brats21: {
      voxtell: { cases: 1251, dice: .5217918189, iou: .3802616721, recall: .3841925028, precision: .9709262917, hd95: 20.02747972, lesionRecall: .6069983934, lesionPrecision: .9786037836, runtime: 1.855217444, vram: 20.90911627 },
      biomedparse: { cases: 1251, dice: .6650504173, iou: .5168246770, recall: .5477854547, precision: .9147257788, hd95: 10.24695077, lesionRecall: .6714827981, lesionPrecision: .5386301156, runtime: 7.990025355, vram: 2.983836174 },
      segvol: { state: "unsupported" }
    },
    merlinplus: {
      voxtell: { state: "pending" },
      biomedparse: { state: "pending" },
      segvol: { state: "pending" }
    }
  }
};

const METRICS = {
  dice: { label: "Dice ↑", unit: "", decimals: 3, higher: true, note: "重叠质量；越高越好" },
  iou: { label: "IoU ↑", unit: "", decimals: 3, higher: true, note: "交并比；越高越好" },
  recall: { label: "Recall ↑", unit: "", decimals: 3, higher: true, note: "体素召回率；越高越好" },
  precision: { label: "Precision ↑", unit: "", decimals: 3, higher: true, note: "体素精确率；越高越好" },
  hd95: { label: "HD95 ↓", unit: "mm", decimals: 1, higher: false, note: "95% Hausdorff 距离；越低越好" },
  lesionRecall: { label: "Lesion recall ↑", unit: "", decimals: 3, higher: true, note: "病灶级召回；越高越好" },
  lesionPrecision: { label: "Lesion precision ↑", unit: "", decimals: 3, higher: true, note: "病灶级精确率；越高越好" },
  runtime: { label: "Runtime ↓", unit: "s", decimals: 1, higher: false, note: "单病例运行时间中位数；越低越好" },
  vram: { label: "Peak VRAM ↓", unit: "GB", decimals: 1, higher: false, note: "峰值显存；越低越好" }
};

function mixColor(t) {
  const stops = [[248,250,251], [223,237,241], [192,220,227]];
  const p = Math.max(0, Math.min(1, t));
  const segment = p < .5 ? 0 : 1;
  const local = segment === 0 ? p * 2 : (p - .5) * 2;
  const a = stops[segment], b = stops[segment + 1];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * local)).join(",")})`;
}

function renderTable(metricKey) {
  const metric = METRICS[metricKey];
  const body = document.querySelector("#heatmap-body");
  const completed = [];
  Object.values(BENCHMARK.values).forEach(dataset => Object.values(dataset).forEach(value => {
    if (value[metricKey] !== undefined) completed.push(value[metricKey]);
  }));
  const min = Math.min(...completed), max = Math.max(...completed);

  body.innerHTML = BENCHMARK.models.map(model => {
    const cells = BENCHMARK.datasets.map(dataset => {
      const item = BENCHMARK.values[dataset.id][model.id];
      if (item.state === "pending") {
        return `<td class="metric-cell pending">申请</td>`;
      }
      if (item.state === "unsupported") {
        return `<td class="metric-cell unsupported"><span class="state-label">不支持</span></td>`;
      }
      const value = item[metricKey];
      let score = (value - min) / Math.max(max - min, Number.EPSILON);
      if (!metric.higher) score = 1 - score;
      return `<td class="metric-cell" style="background:${mixColor(score)}">
        <span class="metric-value">${value.toFixed(metric.decimals)}</span>${metric.unit ? `<span class="metric-unit">${metric.unit}</span>` : ""}
      </td>`;
    }).join("");
    return `<tr><th class="row-label" scope="row">${model.name}</th>${cells}</tr>`;
  }).join("");

  document.querySelector("#metric-description").textContent = metric.note;
  const method = METHODS[metricKey];
  document.querySelector("#method-name").textContent = metric.label.replace(/[↑↓]/g, "").trim();
  document.querySelector("#method-formula").textContent = method.formula;
  document.querySelector("#method-explanation").textContent = method.explanation;
  document.querySelector("#method-aggregation").textContent = method.aggregation;
  document.querySelectorAll(".metrics button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.metric === metricKey)));
}

const mean = "逐病例计算后取算术平均，每个病例权重相同。颜色在当前指标的已完成组合内归一化，越深表示越优。";
const METHODS = {
  dice: { formula: "Dice = 2|P ∩ G| / (|P| + |G|)", explanation: "P 为预测肿瘤区域，G 为真实标注区域，|·| 表示体素数。衡量两个区域的重叠程度；预测和标注均为空时记为 1。", aggregation: mean },
  iou: { formula: "IoU = |P ∩ G| / |P ∪ G|", explanation: "P 为预测区域，G 为真实标注区域。用交集体素数除以并集体素数；两者均为空时记为 1。", aggregation: mean },
  recall: { formula: "Recall = TP / (TP + FN)", explanation: "TP 是正确预测的肿瘤体素数，FN 是漏检的肿瘤体素数。该值表示真实肿瘤中被识别出的比例；真实标注为空时记为 1。", aggregation: mean },
  precision: { formula: "Precision = TP / (TP + FP)", explanation: "TP 是正确预测的肿瘤体素数，FP 是误报的体素数。该值表示预测区域中真正属于肿瘤的比例；预测为空且标注非空时记为 0，两者均为空时记为 1。", aggregation: mean },
  hd95: { formula: "HD95 = Q₀.₉₅(d(∂P → ∂G) ∪ d(∂G → ∂P))", explanation: "分别计算预测表面到标注表面、标注表面到预测表面的最近点距离，合并后取第 95 百分位。距离按体素间距换算为毫米；两者均为空时为 0，仅一方为空时为 ∞。", aggregation: "表格取各病例 HD95 的中位数，保留无穷值。颜色越深表示距离越小。" },
  lesionRecall: { formula: "Lesion recall = 检出的真实病灶数 / 真实病灶总数", explanation: "以三维 26 邻域连通分量划分病灶。真实病灶只要与预测区域有体素重叠，就计为检出；不要求一对一匹配。没有真实病灶时记为 1。", aggregation: mean },
  lesionPrecision: { formula: "Lesion precision = 命中的预测病灶数 / 预测病灶总数", explanation: "以三维 26 邻域连通分量划分病灶。预测病灶只要与真实区域有体素重叠，就计为命中；不要求一对一匹配。预测为空且标注非空时记为 0，两者均为空时记为 1。", aggregation: mean },
  runtime: { formula: "Runtime = median(t₁, t₂, …, tₙ)", explanation: "tᵢ 为 baseline 记录的第 i 个病例运行时间，单位为秒。对完整队列取中位数。", aggregation: "运行时间受影像大小、模型环境和硬件影响。颜色越深表示时间越短。" },
  vram: { formula: "Peak VRAM = max(v₁, v₂, …, vₙ)", explanation: "vᵢ 为 baseline 记录的第 i 个病例峰值显存，单位沿用结果文件中的 GB。表格取整个队列的最大值。", aggregation: "该指标不是病例平均显存。颜色越深表示显存占用越小。" }
};
const metricButtons = document.querySelector("#metric-buttons");
Object.entries(METRICS).forEach(([key, item]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = item.label;
  button.dataset.metric = key;
  button.setAttribute("aria-controls", "heatmap-body");
  button.addEventListener("click", () => renderTable(key));
  metricButtons.append(button);
});
renderTable("dice");
