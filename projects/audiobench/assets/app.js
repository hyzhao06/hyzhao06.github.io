(function () {
  "use strict";

  var data = window.RESULT_BROWSER_DATA;
  if (!data) {
    document.body.innerHTML = "<main><p>结果数据未加载，请先生成 data/result-browser-data.js。</p></main>";
    return;
  }

  var $ = function (selector, scope) { return (scope || document).querySelector(selector); };
  var $$ = function (selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); };
  var numberFormat = new Intl.NumberFormat("zh-CN");
  var metricMeta = {
    wer: { label: "WER", direction: "lower", digits: 2, unit: "percent" },
    cer: { label: "CER", direction: "lower", digits: 2, unit: "percent" },
    ser: { label: "SER", direction: "lower", digits: 2, unit: "percent" },
    semscore: { label: "SemScore", direction: "higher", digits: 3, unit: "score" },
    s_rate: { label: "替换率 S", direction: "lower", digits: 2, unit: "percent" },
    d_rate: { label: "删除率 D", direction: "lower", digits: 2, unit: "percent" },
    i_rate: { label: "插入率 I", direction: "lower", digits: 2, unit: "percent" }
  };
  var groupLabels = {
    cohort: "疾病 / 健康",
    label: "标签",
    model: "模型",
    dataset: "数据集",
    severity: "严重程度"
  };
  var modelLabels = Object.fromEntries(data.models.map(function (item) { return [item.id, item.label]; }));
  var datasetLabels = Object.fromEntries(data.datasets.map(function (item) { return [item.id, item.label]; }));
  var state = {
    page: "results",
    experiment: "combined",
    combinedModel: "qwen25",
    singleModel: "qwen25",
    singleDataset: "easycall",
    group: "cohort",
    metric: "wer",
    method: "combined",
    currentRows: []
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>\"]/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char];
    });
  }

  function fmtInt(value) {
    return value == null ? "待补" : numberFormat.format(Number(value));
  }

  function fmtMetric(value, metric) {
    if (value == null || Number.isNaN(Number(value))) return "待补";
    var meta = metricMeta[metric];
    if (meta.unit === "score") return Number(value).toFixed(meta.digits);
    return (Number(value) * 100).toFixed(meta.digits) + "%";
  }

  function fmtDelta(value, metric) {
    if (value == null || Number.isNaN(Number(value))) return "待补";
    var meta = metricMeta[metric];
    var numeric = Number(value);
    var sign = numeric > 0 ? "+" : numeric < 0 ? "−" : "±";
    var amount = Math.abs(numeric);
    return meta.unit === "score"
      ? sign + amount.toFixed(meta.digits)
      : sign + (amount * 100).toFixed(meta.digits) + " pp";
  }

  function deltaClass(value, metric) {
    if (value == null || Number(value) === 0) return "";
    var better = metricMeta[metric].direction === "lower" ? Number(value) < 0 : Number(value) > 0;
    return better ? "good" : "bad";
  }

  function populateSelect(select, items, preferred) {
    select.innerHTML = items.map(function (item) {
      return "<option value=\"" + escapeHtml(item.id) + "\">" + escapeHtml(item.label) + "</option>";
    }).join("");
    select.value = preferred;
  }

  function setPressed(container, key, value) {
    $$('[data-' + key + ']', container).forEach(function (button) {
      var active = button.dataset[key] === value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  function setPage(page) {
    state.page = page === "methods" ? "methods" : "results";
    $$('[data-page]').forEach(function (section) { section.hidden = section.dataset.page !== state.page; });
    $$('[data-page-link]').forEach(function (link) {
      var active = link.dataset.pageLink === state.page;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    document.title = "AudioBench · " + (state.page === "results" ? "结果" : "方法");
  }

  function currentResult() {
    if (state.experiment === "combined") {
      var combinedKey = state.group === "model" ? "all" : state.combinedModel;
      return {
        rows: (data.combined[state.group] && data.combined[state.group][combinedKey]) || [],
        title: "联合微调 · 按" + groupLabels[state.group] + "分组",
        detail: state.group === "model"
          ? "比较全部模型。已有微调结果的模型显示前后值，没有微调结果的模型只显示基线。"
          : "当前模型：" + modelLabels[state.combinedModel] + "。前后值均按同一批可配对样本汇总。"
      };
    }
    var key = state.singleModel + "/" + state.singleDataset;
    var entry = data.single[key];
    return {
      rows: entry && entry.groups[state.group] ? entry.groups[state.group] : [],
      title: modelLabels[state.singleModel] + " × " + datasetLabels[state.singleDataset] + " · 按" + groupLabels[state.group] + "分组",
      detail: "该 adapter 只使用 " + datasetLabels[state.singleDataset] + " 训练，随后在统一测试集上按当前方式汇总。"
    };
  }

  function renderContext(view) {
    var paired = view.rows.filter(function (row) { return row.after && row.after[state.metric] != null; }).length;
    var baselineOnly = view.rows.filter(function (row) {
      return row.before && row.before[state.metric] != null && (!row.after || row.after[state.metric] == null);
    }).length;
    var samples = view.rows.reduce(function (sum, row) { return sum + (Number(row.n) || 0); }, 0);
    $("#result-context").innerHTML = [
      "<div><h2>" + escapeHtml(view.title) + "</h2><p>" + escapeHtml(view.detail) + "</p></div>",
      "<div class=\"context-stats\"><span>" + escapeHtml(metricMeta[state.metric].label) + "</span><span>" + paired + " 组有前后值</span><span>" + baselineOnly + " 组仅基线</span><span>N 合计 " + fmtInt(samples) + "</span></div>"
    ].join("");
  }

  function renderChart(rows) {
    var metric = state.metric;
    var values = [];
    rows.forEach(function (row) {
      if (row.before && row.before[metric] != null) values.push(Number(row.before[metric]));
      if (row.after && row.after[metric] != null) values.push(Number(row.after[metric]));
    });
    var max = values.length ? Math.max.apply(Math, values) : 1;
    if (metric === "semscore") max = Math.max(1, max);
    if (max <= 0) max = 1;

    var body = rows.length ? rows.map(function (row) {
      var before = row.before ? row.before[metric] : null;
      var after = row.after ? row.after[metric] : null;
      var beforeWidth = before == null ? 0 : Math.max(0, Math.min(100, Number(before) / max * 100));
      var afterWidth = after == null ? 0 : Math.max(0, Math.min(100, Number(after) / max * 100));
      var afterBar = after == null
        ? "<div class=\"bar-missing\">微调后待补</div>"
        : "<div class=\"bar-track\"><div class=\"bar-fill after\" style=\"width:" + afterWidth.toFixed(2) + "%\"></div></div>";
      return [
        "<div class=\"bar-item\">",
        "<div class=\"bar-label\"><strong title=\"" + escapeHtml(row.category) + "\">" + escapeHtml(row.category) + "</strong><small>N = " + fmtInt(row.n) + "</small></div>",
        "<div class=\"bar-pair\">",
        "<div class=\"bar-line\"><span>微调前</span><div class=\"bar-track\"><div class=\"bar-fill before\" style=\"width:" + beforeWidth.toFixed(2) + "%\"></div></div><span class=\"bar-value\">" + fmtMetric(before, metric) + "</span></div>",
        "<div class=\"bar-line\"><span>微调后</span>" + afterBar + "<span class=\"bar-value\">" + fmtMetric(after, metric) + "</span></div>",
        "</div></div>"
      ].join("");
    }).join("") : "<div class=\"empty-state\">当前组合暂无可展示数据。</div>";

    $("#result-chart").innerHTML = [
      "<div class=\"chart-head\"><div><h2>" + escapeHtml(metricMeta[metric].label) + " 柱状图</h2><p>每组使用同一横轴；待完成结果保留空位。</p></div>",
      "<ul class=\"chart-legend\"><li><i class=\"before\"></i>微调前</li><li><i class=\"after\"></i>微调后</li></ul></div>",
      "<div class=\"bar-chart\">" + body + "</div>"
    ].join("");
  }

  function renderTable(rows) {
    var metric = state.metric;
    var body = rows.length ? rows.map(function (row) {
      var before = row.before ? row.before[metric] : null;
      var after = row.after ? row.after[metric] : null;
      var delta = row.delta ? row.delta[metric] : null;
      var note = row.note || (after == null ? "微调后待补" : "已配对");
      return [
        "<tr>",
        "<td>" + escapeHtml(row.category) + "</td>",
        "<td class=\"numeric\">" + fmtInt(row.n) + "</td>",
        "<td class=\"numeric\">" + fmtMetric(before, metric) + "</td>",
        "<td class=\"numeric\">" + fmtMetric(after, metric) + "</td>",
        "<td class=\"numeric delta " + deltaClass(delta, metric) + "\">" + fmtDelta(delta, metric) + "</td>",
        "<td class=\"status-note\">" + escapeHtml(note) + "</td>",
        "</tr>"
      ].join("");
    }).join("") : "<tr><td colspan=\"6\" class=\"empty-state\">当前组合暂无可展示数据。</td></tr>";
    $("#result-table").innerHTML = [
      "<table class=\"data-table\"><thead><tr><th>分组</th><th>N</th><th>微调前</th><th>微调后</th><th>差值</th><th>说明</th></tr></thead>",
      "<tbody>" + body + "</tbody></table>"
    ].join("");
  }

  function renderResults() {
    setPressed($("#experiment-tabs"), "experiment", state.experiment);
    setPressed($("#group-tabs"), "group", state.group);
    setPressed($("#metric-tabs"), "metric", state.metric);
    $("#combined-controls").hidden = state.experiment !== "combined";
    $("#single-controls").hidden = state.experiment !== "single";
    $("#combined-model").disabled = state.group === "model";

    var singleEntry = data.single[state.singleModel + "/" + state.singleDataset];
    var status = $("#single-run-status");
    var complete = singleEntry && singleEntry.status === "complete";
    status.textContent = complete ? "指标已完成" : "微调后待补";
    status.classList.toggle("complete", complete);

    var view = currentResult();
    state.currentRows = view.rows;
    renderContext(view);
    renderChart(view.rows);
    renderTable(view.rows);
    $("#result-note").textContent = "统计口径：微调前和微调后按相同的有效 sample_id 交集聚合；缺少微调后结果时不填 0，也不计算差值。";
  }

  function csvCell(value) {
    var text = String(value == null ? "" : value);
    return /[\",\n]/.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
  }

  function downloadCsv() {
    var metric = state.metric;
    var rows = [["group", "n", "metric", "before", "after", "delta", "status", "note"]];
    state.currentRows.forEach(function (row) {
      rows.push([
        row.category,
        row.n,
        metric,
        row.before ? row.before[metric] : "",
        row.after ? row.after[metric] : "",
        row.delta ? row.delta[metric] : "",
        row.status || "",
        row.note || ""
      ]);
    });
    var content = "\ufeff" + rows.map(function (row) { return row.map(csvCell).join(","); }).join("\n");
    var blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "audiobench-" + state.experiment + "-" + state.group + "-" + metric + ".csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function configRows(config) {
    var labels = {
      lora_rank: "LoRA rank",
      lora_alpha: "LoRA alpha",
      lora_dropout: "LoRA dropout",
      learning_rate: "学习率",
      weight_decay: "权重衰减",
      warmup_ratio: "warmup 比例",
      lr_scheduler: "学习率调度",
      effective_batch_size: "有效 batch",
      precision: "训练精度",
      attention: "attention 实现",
      max_grad_norm: "梯度裁剪",
      selection: "模型保存策略"
    };
    return Object.entries(config).map(function (entry) {
      return "<tr><td>" + escapeHtml(labels[entry[0]] || entry[0]) + "</td><td>" + escapeHtml(entry[1]) + "</td></tr>";
    }).join("");
  }

  function renderCombinedMethod() {
    var method = data.methods.combined;
    var totalRows = method.datasets.reduce(function (sum, item) { return sum + Number(item.rows || 0); }, 0);
    var totalSpeakers = method.datasets.reduce(function (sum, item) { return sum + Number(item.speakers || 0); }, 0);
    var trainRows = method.datasets.reduce(function (sum, item) {
      return sum + Number(item.splits.train || 0) + Number(item.splits.dev || 0);
    }, 0);
    var draws = Object.values(method.sampling).reduce(function (sum, value) { return sum + Number(value || 0); }, 0);
    var datasetRows = method.datasets.map(function (item) {
      return "<tr><td>" + escapeHtml(item.label) + "</td><td class=\"numeric\">" + fmtInt(item.speakers) + "</td><td class=\"numeric\">" + fmtInt(item.rows) + "</td><td class=\"numeric\">" + fmtInt(item.splits.train || 0) + "</td><td class=\"numeric\">" + fmtInt(item.splits.dev || 0) + "</td><td class=\"numeric\">" + fmtInt(item.splits.test || 0) + "</td><td class=\"numeric\">" + fmtInt(item.splits.control_eval || 0) + "</td></tr>";
    }).join("");
    var sampling = Object.entries(method.sampling).map(function (entry) {
      var share = draws ? Number(entry[1]) / draws * 100 : 0;
      return "<div class=\"sampling-row\"><strong>" + escapeHtml(datasetLabels[entry[0]] || entry[0]) + "</strong><div class=\"sampling-track\"><div class=\"sampling-fill\" style=\"width:" + share.toFixed(2) + "%\"></div></div><span>" + fmtInt(entry[1]) + "</span></div>";
    }).join("");
    $("#method-content").innerHTML = [
      "<section class=\"method-section\"><h2>联合数据组织</h2><p>四个语料先按各自原生边界整理，再进入统一的说话人和录音组审计。最终模型使用预先固定的数据计划独立训练，五折结果不参与 final 配置或 checkpoint 选择。</p>",
      "<div class=\"method-grid\"><div class=\"stat-card\"><span>数据集</span><strong>4</strong></div><div class=\"stat-card\"><span>说话人</span><strong>" + fmtInt(totalSpeakers) + "</strong></div><div class=\"stat-card\"><span>清单音频</span><strong>" + fmtInt(totalRows) + "</strong></div><div class=\"stat-card\"><span>训练抽取</span><strong>" + fmtInt(draws) + "</strong></div></div>",
      "<div class=\"table-scroll\"><table class=\"data-table\"><thead><tr><th>数据集</th><th>说话人</th><th>总条目</th><th>训练</th><th>验证</th><th>疾病测试</th><th>健康测试</th></tr></thead><tbody>" + datasetRows + "</tbody></table></div></section>",
      "<section class=\"method-section\"><div class=\"method-columns\"><div><h2>固定抽样计划</h2><p>抽样权重按独立 recording group 数量的平方根计算，并在语料内再次按说话人平衡。三个模型消费同一份固定序列。</p><div class=\"sampling-bars\">" + sampling + "</div><p>合法训练池共 " + fmtInt(trainRows) + " 条；抽样计划展开为 " + fmtInt(draws) + " 次训练抽取。</p></div><div><h2>统一训练配置</h2><div class=\"table-scroll\"><table class=\"data-table config-table\"><tbody>" + configRows(method.hyperparameters) + "</tbody></table></div></div></div></section>",
      "<section class=\"method-section\"><h2>不同骨干的 LoRA 位置</h2><p>三个模型共用一套训练尺度，但目标层按架构分别设置，不能把它们写成完全相同。</p><div class=\"model-recipes\"><article class=\"model-recipe\"><h3>Qwen2.5-Omni-7B</h3><p>训练 Thinker 的 q/k/v/o 与 gate/up/down LoRA；音频、视觉编码塔和 aligner 冻结，不训练 Talker。</p></article><article class=\"model-recipe\"><h3>Phi-4 Multimodal</h3><p>在语言骨干的 qkv/o 与 gate_up/down 注入 LoRA；原始基座冻结，原生 speech adapter 保留在前向路径中。</p></article><article class=\"model-recipe\"><h3>Whisper large-v3 turbo</h3><p>只在 encoder 和 decoder attention 的 q/v 投影加入 LoRA；原始 encoder 和 decoder 权重保持冻结。</p></article></div></section>"
    ].join("");
  }

  function renderSingleMethod() {
    var method = data.methods.single;
    var jobs = method.jobs.map(function (job) {
      var entry = data.single[job.model + "/" + job.dataset];
      var status = entry && entry.status === "complete" ? "指标已完成" : "待完成";
      return "<tr><td>" + escapeHtml(modelLabels[job.model] || job.model) + "</td><td>" + escapeHtml(datasetLabels[job.dataset] || job.dataset) + "</td><td class=\"numeric\">" + fmtInt(job.draw_count) + "</td><td class=\"numeric\">" + fmtInt(job.expected_global_steps) + "</td><td>" + status + "</td></tr>";
    }).join("");
    var complete = Object.values(data.single).filter(function (entry) { return entry.status === "complete"; }).length;
    $("#method-content").innerHTML = [
      "<section class=\"method-section\"><h2>单数据集实验设计</h2><p>每个 adapter 只使用一个训练数据集，训练后仍在同一份冻结测试清单上评测四个数据集。这样可以区分同域收益与跨数据集迁移，不会把训练数据量差异混进联合微调结果。</p>",
      "<div class=\"method-grid\"><div class=\"stat-card\"><span>模型 × 训练集</span><strong>16</strong></div><div class=\"stat-card\"><span>指标已完成</span><strong>" + complete + "/16</strong></div><div class=\"stat-card\"><span>训练数据集</span><strong>4</strong></div><div class=\"stat-card\"><span>统一评测集</span><strong>52,073</strong></div></div>",
      "<ul class=\"plain-list\"><li>每个训练集生成独立的三轮固定抽样计划，模型保存训练终点 adapter。</li><li>不使用开发集或测试集结果选择单数据集 adapter。</li><li>未完成组合仍保留原始模型基线，结果页的微调后和差值留空。</li></ul></section>",
      "<section class=\"method-section\"><div class=\"method-columns\"><div><h2>统一配方</h2><div class=\"table-scroll\"><table class=\"data-table config-table\"><tbody>" + configRows(method.recipe) + "</tbody></table></div></div><div><h2>比较口径</h2><p>微调前与微调后只在两边都有有效评分的同一批 sample_id 上聚合。单数据集 adapter 尚未完成健康组评测时，健康组只展示基线，不计算差值。</p><p>最终横向比较同时保留训练数据集和评测数据集两个维度。结果页可先选模型和训练数据集，再切换疾病 / 健康、标签、模型、评测数据集和严重程度分组。</p></div></div></section>",
      "<section class=\"method-section\"><h2>训练任务</h2><div class=\"table-scroll\"><table class=\"data-table\"><thead><tr><th>模型</th><th>训练数据集</th><th>抽取次数</th><th>预计 steps</th><th>结果状态</th></tr></thead><tbody>" + jobs + "</tbody></table></div></section>"
    ].join("");
  }

  function renderReferences() {
    $("#reference-count").textContent = data.methods.references.length + " 篇核心精读";
    $("#reference-list").innerHTML = data.methods.references.map(function (item, index) {
      return [
        "<article class=\"reference-item\"><h3>" + (index + 1) + ". " + escapeHtml(item.title) + "</h3>",
        "<p>" + escapeHtml(item.authors) + " · " + escapeHtml(item.venue) + " · " + escapeHtml(item.year) + "</p>",
        "<p>本项目使用：" + escapeHtml(item.decision_reason) + "</p>",
        "<a href=\"" + escapeHtml(item.stable_url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">查看原文</a></article>"
      ].join("");
    }).join("");
  }

  function renderMethods() {
    setPressed($("#method-tabs"), "method", state.method);
    if (state.method === "single") renderSingleMethod(); else renderCombinedMethod();
  }

  function bindButtons(container, attribute, callback) {
    $$('[data-' + attribute + ']', container).forEach(function (button) {
      button.addEventListener("click", function () { callback(button.dataset[attribute]); });
    });
  }

  function init() {
    populateSelect($("#combined-model"), data.models, state.combinedModel);
    populateSelect($("#single-model"), data.models.filter(function (model) {
      return data.datasets.some(function (dataset) { return Boolean(data.single[model.id + "/" + dataset.id]); });
    }), state.singleModel);
    populateSelect($("#single-train-dataset"), data.datasets, state.singleDataset);

    bindButtons($("#experiment-tabs"), "experiment", function (value) { state.experiment = value; renderResults(); });
    bindButtons($("#group-tabs"), "group", function (value) { state.group = value; renderResults(); });
    bindButtons($("#metric-tabs"), "metric", function (value) { state.metric = value; renderResults(); });
    bindButtons($("#method-tabs"), "method", function (value) { state.method = value; renderMethods(); });

    $("#combined-model").addEventListener("change", function (event) { state.combinedModel = event.target.value; renderResults(); });
    $("#single-model").addEventListener("change", function (event) { state.singleModel = event.target.value; renderResults(); });
    $("#single-train-dataset").addEventListener("change", function (event) { state.singleDataset = event.target.value; renderResults(); });
    $("#open-single").addEventListener("click", function () {
      renderResults();
      $("#result-context").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $("#download-current").addEventListener("click", downloadCsv);

    window.addEventListener("hashchange", function () { setPage(location.hash.slice(1)); });
    setPage(location.hash.slice(1) || "results");
    renderResults();
    renderMethods();
    renderReferences();
  }

  init();
}());
