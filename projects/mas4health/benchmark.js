const BENCHMARK = {
  datasets: [
    { id: "kits23", name: "KiTS23", prompt: "kidney tumor" },
    { id: "lits17", name: "LiTS17", prompt: "liver tumor" },
    { id: "brats21", name: "BraTS 2021", prompt: "brain tumor" }
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
    }
  }
};

const METRIC_KEYS = ["dice", "iou", "recall", "precision", "hd95", "lesionRecall", "lesionPrecision", "runtime", "vram"];
const result = values => Object.fromEntries(METRIC_KEYS.map((key, index) => [key, values[index]]));
const TUMORSEG = [
  { name: "膀胱肿瘤", modality: "MR", prompt: "bladder tumor", cases: 221,
    voxtell: result([.8197074813,.7127269487,.8365040010,.8211587824,2.576941098,.9195862961,.7126150810,3.380441438,6.260527134]),
    biomedparse: result([.1696619249,.1121469189,.3419911151,.1598884030,47.68241890,.6188213747,.2248744676,2.731364351,2.591257572]) },
  { name: "乳腺肿瘤", modality: "MR", prompt: "primary breast tumor", cases: 1506,
    voxtell: result([.7482217110,.6379456712,.8158739416,.7512416543,6.326407941,.7344413154,.4991119821,3.786862198,6.482573032]),
    biomedparse: result([.0821787206,.0553998499,.0870615026,.1288840559,111.7211038,.2971076662,.0898692164,7.116745947,3.681070328]) },
  { name: "宫颈肿瘤", modality: "MR", prompt: "primary cervical tumor", cases: 67,
    voxtell: result([.7069369782,.5654789167,.6638856220,.7892131081,5.138701198,.9850746269,.8616263510,3.425671142,6.205839634]),
    biomedparse: result([.4488946078,.3365638447,.5087088185,.4773478510,35.24306536,.8656716418,.3461690465,3.061757632,2.352495670]) },
  { name: "结肠肿瘤", modality: "CT", prompt: "colon primary tumor", cases: 126,
    voxtell: result([.6077714923,.4705799905,.7742822407,.5397866107,125.6267990,.9682539683,.2334763572,21.28142331,7.024893284]),
    biomedparse: result([.3825127855,.2591836901,.9124541296,.2663510514,219.5502445,.9841269841,.0196507602,10.18297849,7.898967743]) },
  { name: "肾肿瘤", modality: "CT", prompt: "kidney tumor", cases: 485,
    voxtell: result([.0566756277,.0465325754,.5494500162,.0610333252,246.1045047,.5862491835,.1252795801,26.91984513,7.671087742]),
    biomedparse: result([.0720160803,.0489117059,.8682372732,.0507494812,237.2048240,.9085840311,.0728711899,13.46146932,14.96708441]) },
  { name: "肝肿瘤", modality: "CT", prompt: "liver tumor", cases: 201,
    voxtell: result([.5097255338,.4403582803,.8663614252,.5191430662,20.62161253,.8586100500,.5443223570,104.5806561,8.056211948]),
    biomedparse: result([.3150325610,.2561586081,.9321351426,.2744039312,292.9157848,.9133219945,.0662223777,48.17463478,14.54411077]) },
  { name: "肺肿瘤（MSD）", modality: "CT", prompt: "lung tumor", cases: 63,
    voxtell: result([.8330228759,.7282395177,.8407827299,.8361461174,2.423153576,.7435868364,.7098301309,66.51583004,6.755644321]),
    biomedparse: result([.0908765153,.0640565968,.0847871502,.1460069028,188.9106232,.4554610733,.0550564041,35.08849203,7.060954571]) },
  { name: "肺肿瘤（NSCLC）", modality: "CT", prompt: "lung tumor", cases: 421,
    voxtell: result([.6270997305,.5105387753,.5997504331,.7807448902,35.51694622,.6698682770,.7464135263,23.87344697,21.30997229]),
    biomedparse: result([.1334540808,.0856060373,.1099709399,.2587199449,155.4127600,.4644075589,.0937887676,16.42289496,4.040079594]) },
  { name: "胰腺肿瘤", modality: "CT", prompt: "pancreatic tumor", cases: 500,
    voxtell: result([.5586055278,.4861288493,.8592672960,.5700980118,5,.982,.6727857143,18.75496431,21.30997229]),
    biomedparse: result([.4287780273,.3576627133,.9448862183,.3758060104,72.39724843,.996,.3751412698,13.41388764,8.085735321]) },
  { name: "前列腺肿瘤", modality: "MR", prompt: "prostate tumor", cases: 316,
    voxtell: result([.2050941120,.1580338902,.8746079906,.2128007052,Infinity,.9683544304,.2006931887,1.634776913,21.01309729]),
    biomedparse: result([.0235599287,.0131354356,.8685319242,.0139148511,Infinity,.9823312236,.0323285232,3.451197561,2.286081791]) },
  { name: "子宫肿瘤", modality: "MR", prompt: "tumor", cases: 300,
    voxtell: result([.1874541983,.1261619177,.2117807117,.2238708269,31.83123508,.4797813934,.3117026094,7.019573759,21.41769934]),
    biomedparse: result([.1212334215,.0787971970,.1265291658,.2156890664,49.89115268,.3037406643,.1673530726,4.658794195,2.238222599]) }
];

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
    if (Number.isFinite(value[metricKey])) completed.push(value[metricKey]);
  }));
  TUMORSEG.forEach(dataset => [dataset.voxtell, dataset.biomedparse].forEach(value => {
    if (Number.isFinite(value[metricKey])) completed.push(value[metricKey]);
  }));
  const min = Math.min(...completed), max = Math.max(...completed);
  const scoreFor = value => {
    if (!Number.isFinite(value)) return 0;
    const normalized = (value - min) / Math.max(max - min, Number.EPSILON);
    return metric.higher ? normalized : 1 - normalized;
  };
  const format = value => Number.isFinite(value) ? value.toFixed(metric.decimals) : "∞";

  body.innerHTML = BENCHMARK.models.map(model => {
    const cells = BENCHMARK.datasets.map(dataset => {
      const item = BENCHMARK.values[dataset.id][model.id];
      if (item.state === "unsupported") {
        return `<td class="metric-cell unsupported"><span class="state-label">未运行</span></td>`;
      }
      const value = item[metricKey];
      return `<td class="metric-cell" style="background:${mixColor(scoreFor(value))}">
        <span class="metric-value">${format(value)}</span>${metric.unit ? `<span class="metric-unit">${metric.unit}</span>` : ""}
      </td>`;
    }).join("");
    return `<tr><th class="row-label" scope="row">${model.name}</th>${cells}</tr>`;
  }).join("");

  document.querySelector("#extension-body").innerHTML = TUMORSEG.map(dataset => {
    const cell = model => {
      const value = dataset[model][metricKey];
      return `<td class="extension-value" style="background:${mixColor(scoreFor(value))}"><strong>${format(value)}</strong>${metric.unit ? `<span>${metric.unit}</span>` : ""}</td>`;
    };
    return `<tr><th scope="row">${dataset.name}</th><td><span class="modality">${dataset.modality}</span><code>${dataset.prompt}</code></td><td>${dataset.cases.toLocaleString("en-US")}</td>${cell("voxtell")}${cell("biomedparse")}<td class="untested">未测试</td></tr>`;
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
  button.setAttribute("aria-controls", "heatmap-body extension-body");
  button.addEventListener("click", () => renderTable(key));
  metricButtons.append(button);
});
renderTable("dice");
