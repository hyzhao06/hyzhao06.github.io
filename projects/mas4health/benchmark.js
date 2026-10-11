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
  const stops = [[245,160,140], [245,223,156], [120,196,166]];
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
        return `<td class="metric-cell pending"><a class="state-link" href="resources.html#merlinplus" aria-label="查看 MerlinPlus 申请信息">申请 <span aria-hidden="true">→</span></a></td>`;
      }
      if (item.state === "unsupported") {
        return `<td class="metric-cell unsupported"><span class="state-label">不支持</span><div class="cell-meta">checkpoint 仅支持 CT</div></td>`;
      }
      const value = item[metricKey];
      let score = (value - min) / Math.max(max - min, Number.EPSILON);
      if (!metric.higher) score = 1 - score;
      const datasetValues = BENCHMARK.models
        .map(m => ({ id: m.id, v: BENCHMARK.values[dataset.id][m.id][metricKey] }))
        .filter(d => d.v !== undefined)
        .sort((a, b) => metric.higher ? b.v - a.v : a.v - b.v);
      const rank = datasetValues.findIndex(d => d.id === model.id) + 1;
      return `<td class="metric-cell" style="background:${mixColor(score)}">
        <span class="rank">#${rank}</span>
        <span class="metric-value">${value.toFixed(metric.decimals)}</span>${metric.unit ? `<span class="metric-unit">${metric.unit}</span>` : ""}
        <div class="cell-meta">${item.cases.toLocaleString("en-US")} / ${item.cases.toLocaleString("en-US")} cases</div>
      </td>`;
    }).join("");
    return `<tr><th class="row-label" scope="row"><strong>${model.name}</strong><span>${model.subtitle}</span></th>${cells}</tr>`;
  }).join("");

  document.querySelector("#metric-description").textContent = metric.note;
  document.querySelector("#scale").classList.toggle("reverse", !metric.higher);
  document.querySelector("#scale-low").textContent = metric.higher ? "低" : "优";
  document.querySelector("#scale-high").textContent = metric.higher ? "高" : "高耗";
}

const metricSelect = document.querySelector("#metric-select");
Object.entries(METRICS).forEach(([key, item]) => metricSelect.add(new Option(item.label, key)));
metricSelect.addEventListener("change", event => renderTable(event.target.value));
renderTable("dice");
