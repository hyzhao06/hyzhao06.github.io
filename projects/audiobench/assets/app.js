(function () {
  "use strict";
  var data = window.RESULT_BROWSER_DATA;
  var layout = window.SITE_DATA;
  if (!data) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var nf = new Intl.NumberFormat("zh-CN");
  var metricMeta = {
    wer: { label: "WER", direction: "lower", digits: 2 },
    cer: { label: "CER", direction: "lower", digits: 2 },
    ser: { label: "SER", direction: "lower", digits: 2 },
    semscore: { label: "SemScore", direction: "higher", digits: 3, score: true },
    s_rate: { label: "替换 S", direction: "lower", digits: 2 },
    d_rate: { label: "删除 D", direction: "lower", digits: 2 },
    i_rate: { label: "插入 I", direction: "lower", digits: 2 }
  };
  var modelLabels = Object.fromEntries(data.models.map(function (x) { return [x.id, x.label]; }));
  var datasetLabels = Object.fromEntries(data.datasets.map(function (x) { return [x.id, x.label]; }));
  var groups = { cohort: "疾病 / 健康", label: "标签", model: "模型", dataset: "数据集", severity: "严重程度" };
  var state = {
    page: "results", experiment: "combined", combinedModel: "qwen25",
    group: "cohort", metric: "wer", method: "combined",
    selected: ["qwen25/easycall"]
  };
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>\"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c];
    });
  }
  function int(v) { return v == null ? "待补" : nf.format(Number(v)); }
  function val(v, metric) {
    if (v == null || Number.isNaN(Number(v))) return "待补";
    var m = metricMeta[metric];
    return m.score ? Number(v).toFixed(m.digits) : (Number(v) * 100).toFixed(m.digits) + "%";
  }
  function delta(v, metric) {
    if (v == null || Number.isNaN(Number(v))) return "待补";
    var m = metricMeta[metric], n = Number(v), sign = n > 0 ? "+" : n < 0 ? "−" : "±";
    return m.score ? sign + Math.abs(n).toFixed(m.digits) : sign + (Math.abs(n) * 100).toFixed(m.digits) + " pp";
  }
  function good(v, metric) {
    if (v == null || Number(v) === 0) return "";
    return (metricMeta[metric].direction === "lower" ? Number(v) < 0 : Number(v) > 0) ? "good" : "bad";
  }
  function buttons(root, key, value) {
    $$("[data-" + key + "]", root).forEach(function (b) { b.classList.toggle("active", b.dataset[key] === value); });
  }
  function setPage(page) {
    state.page = page === "methods" ? "methods" : "results";
    $$("[data-page]").forEach(function (p) { p.hidden = p.dataset.page !== state.page; });
    $$("[data-page-link]").forEach(function (a) { a.classList.toggle("active", a.dataset.pageLink === state.page); });
  }
  function entryRows() {
    if (state.experiment === "combined") {
      var key = state.group === "model" ? "all" : state.combinedModel;
      return { rows: (data.combined[state.group] || {})[key] || [], title: "联合微调 · " + groups[state.group] };
    }
    var rows = [];
    state.selected.forEach(function (key) {
      var item = data.single[key];
      if (!item || !item.groups[state.group]) return;
      item.groups[state.group].forEach(function (row) {
        rows.push(Object.assign({}, row, { category: modelLabels[item.model] + " × " + datasetLabels[item.train_dataset] + " · " + row.category }));
      });
    });
    return { rows: rows, title: "单数据集微调 · " + groups[state.group] };
  }
  function renderMatrix() {
    var models = data.models.filter(function (m) { return data.datasets.some(function (d) { return data.single[m.id + "/" + d.id]; }); });
    $("#single-matrix").innerHTML = "<div></div>" + data.datasets.map(function (d) { return "<div class=\"matrix-head\">" + esc(d.label) + "</div>"; }).join("") +
      models.map(function (m) {
        return "<div class=\"matrix-model\">" + esc(m.label) + "</div>" + data.datasets.map(function (d) {
          var key = m.id + "/" + d.id, item = data.single[key], complete = item && item.status === "complete", selected = state.selected.indexOf(key) >= 0;
          return "<button type=\"button\" class=\"matrix-cell " + (complete ? "complete" : "pending") + (selected ? " selected" : "") + "\" data-single-key=\"" + key + "\" " + (complete ? "" : "disabled") + ">" + (complete ? "✓" : "—") + "</button>";
        }).join("");
      }).join("");
    $$("[data-single-key]").forEach(function (b) {
      b.onclick = function () {
        var key = b.dataset.singleKey, i = state.selected.indexOf(key);
        if (i >= 0) state.selected.splice(i, 1); else state.selected.push(key);
        if (!state.selected.length) state.selected = [key];
        renderMatrix(); renderResults();
      };
    });
    $("#selection-count").textContent = state.selected.length + " 个组合";
  }
  function renderResults() {
    buttons($("#experiment-tabs"), "experiment", state.experiment);
    buttons($("#group-tabs"), "group", state.group);
    buttons($("#metric-tabs"), "metric", state.metric);
    $("#combined-controls").hidden = state.experiment !== "combined";
    $("#single-controls").hidden = state.experiment !== "single";
    var view = entryRows(), metric = state.metric, rows = view.rows;
    $("#result-head").innerHTML = "<h1>" + esc(view.title) + "</h1><span>" + esc(metricMeta[metric].label) + "</span>";
    renderChart(rows); renderTable(rows);
  }
  function renderChart(rows) {
    var metric = state.metric, all = [];
    rows.forEach(function (r) { if (r.before && r.before[metric] != null) all.push(Number(r.before[metric])); if (r.after && r.after[metric] != null) all.push(Number(r.after[metric])); });
    var max = Math.max.apply(Math, all.length ? all : [1]); if (metric === "semscore") max = Math.max(1, max);
    var groups = rows.map(function (r) {
      var bars = ["before", "after"].map(function (kind) {
        var x = r[kind] && r[kind][metric], h = x == null ? 0 : Math.max(3, Number(x) / max * 100);
        return "<div class=\"vbar-wrap\"><div class=\"vbar-value\">" + val(x, metric) + "</div><div class=\"vbar " + kind + "\" style=\"height:" + h.toFixed(2) + "%\">" + (x == null ? "<i></i>" : "") + "</div></div>";
      }).join("");
      return "<div class=\"vbar-group\">" + bars + "<span class=\"x-label\">" + esc(r.category) + "</span></div>";
    }).join("");
    $("#result-chart").innerHTML = "<div class=\"chart-title\"><h2>" + esc(metricMeta[metric].label) + "</h2><div><i class=\"legend-before\"></i>微调前 <i class=\"legend-after\"></i>微调后</div></div><div class=\"vchart\"><div class=\"vbars\">" + groups + "</div></div>";
  }
  function renderTable(rows) {
    var metric = state.metric;
    $("#result-table").innerHTML = "<table class=\"data-table\"><thead><tr><th>分组</th><th>N</th><th>微调前</th><th>微调后</th><th>差值</th></tr></thead><tbody>" + (rows.length ? rows.map(function (r) {
      var b = r.before && r.before[metric], a = r.after && r.after[metric], d = r.delta && r.delta[metric];
      return "<tr><td>" + esc(r.category) + "</td><td class=\"numeric\">" + int(r.n) + "</td><td class=\"numeric\">" + val(b, metric) + "</td><td class=\"numeric\">" + val(a, metric) + "</td><td class=\"numeric delta " + good(d, metric) + "\">" + delta(d, metric) + "</td></tr>";
    }).join("") : "<tr><td colspan=\"5\">暂无数据</td></tr>") + "</tbody></table>";
  }
  function configRows(config) {
    var labels = { lora_rank: "LoRA rank", lora_alpha: "LoRA alpha", lora_dropout: "LoRA dropout", learning_rate: "学习率", weight_decay: "权重衰减", warmup_ratio: "warmup", lr_scheduler: "调度", effective_batch_size: "有效 batch", precision: "精度", attention: "Attention", max_grad_norm: "梯度裁剪", selection: "保存" };
    return Object.entries(config).map(function (e) { return "<tr><td>" + esc(labels[e[0]] || e[0]) + "</td><td class=\"numeric\">" + esc(e[1]) + "</td></tr>"; }).join("");
  }
  function methodData() {
    var m = data.methods.combined, site = layout || {}, ds = m.datasets, splits = ds.map(function (d) {
      return "<tr><td>" + esc(d.label) + "</td><td class=\"numeric\">" + int(d.speakers) + "</td><td class=\"numeric\">" + int(d.rows) + "</td><td class=\"numeric\">" + int(d.splits.train || 0) + "</td><td class=\"numeric\">" + int(d.splits.dev || 0) + "</td><td class=\"numeric\">" + int(d.splits.test || 0) + "</td><td class=\"numeric\">" + int(d.splits.control_eval || 0) + "</td></tr>";
    }).join("");
    var balls = site && site.speakers ? site.datasets.map(function (d) {
      var people = site.speakers.filter(function (s) { return s.dataset === d.id; });
      return "<section class=\"speaker-group\"><h3>" + esc(d.label) + " <small>" + people.length + " 人</small></h3><div class=\"speaker-dots\">" + people.map(function (s) {
        return "<span class=\"speaker-dot sev-" + esc(s.severity_key) + "\" title=\"" + esc(s.dataset_label + " " + s.speaker_id + " · " + s.severity_label + " · " + s.primary_assignment) + "\"></span>";
      }).join("") + "</div></section>";
    }).join("") : "";
    return "<section class=\"method-block\"><h2>数据集</h2><div class=\"table-scroll\"><table class=\"data-table\"><thead><tr><th>数据集</th><th>说话人</th><th>音频</th><th>训练</th><th>验证</th><th>疾病测试</th><th>健康测试</th></tr></thead><tbody>" + splits + "</tbody></table></div></section><section class=\"method-block\"><h2>说话人</h2><div class=\"speaker-board\">" + balls + "</div></section><section class=\"method-block\"><div class=\"method-two\"><div><h2>抽样</h2><div class=\"sampling-list\">" + Object.entries(m.sampling).map(function (e) { return "<div><b>" + esc(datasetLabels[e[0]]) + "</b><span>" + int(e[1]) + "</span></div>"; }).join("") + "</div></div><div><h2>配置</h2><table class=\"data-table config-table\"><tbody>" + configRows(m.hyperparameters) + "</tbody></table></div></div></section>";
  }
  function singleMethod() {
    var m = data.methods.single, jobs = m.jobs.map(function (j) { return "<tr><td>" + esc(modelLabels[j.model]) + "</td><td>" + esc(datasetLabels[j.dataset]) + "</td><td class=\"numeric\">" + int(j.draw_count) + "</td><td class=\"numeric\">" + int(j.expected_global_steps) + "</td></tr>"; }).join("");
    return "<section class=\"method-block\"><h2>配置</h2><table class=\"data-table config-table\"><tbody>" + configRows(m.recipe) + "</tbody></table></section><section class=\"method-block\"><h2>任务</h2><div class=\"table-scroll\"><table class=\"data-table\"><thead><tr><th>模型</th><th>训练集</th><th>抽样</th><th>steps</th></tr></thead><tbody>" + jobs + "</tbody></table></div></section>";
  }
  function renderMethods() {
    buttons($("#method-tabs"), "method", state.method);
    $("#method-content").innerHTML = state.method === "combined" ? methodData() : singleMethod();
  }
  function renderReferences() {
    $("#reference-count").textContent = data.methods.references.length + " 篇";
    $("#reference-list").innerHTML = data.methods.references.map(function (r) {
      return "<article class=\"reference-item\"><h3>" + esc(r.title) + "</h3><p>" + esc(r.authors) + " · " + esc(r.venue) + " · " + r.year + "</p><p>" + esc(r.decision_reason) + "</p><a href=\"" + esc(r.stable_url) + "\" target=\"_blank\" rel=\"noopener\">原文</a></article>";
    }).join("");
  }
  function bind(root, key, fn) {
    $$("[data-" + key + "]", root).forEach(function (b) { b.onclick = function () { fn(b.dataset[key]); }; });
  }
  function init() {
    $("#combined-model").innerHTML = data.models.map(function (m) { return "<option value=\"" + m.id + "\">" + esc(m.label) + "</option>"; }).join("");
    $("#combined-model").value = state.combinedModel;
    bind($("#experiment-tabs"), "experiment", function (v) { state.experiment = v; renderMatrix(); renderResults(); });
    bind($("#group-tabs"), "group", function (v) { state.group = v; renderResults(); });
    bind($("#metric-tabs"), "metric", function (v) { state.metric = v; renderResults(); });
    bind($("#method-tabs"), "method", function (v) { state.method = v; renderMethods(); });
    $("#combined-model").onchange = function (e) { state.combinedModel = e.target.value; renderResults(); };
    window.onhashchange = function () { setPage(location.hash.slice(1)); };
    setPage(location.hash.slice(1) || "results"); renderMatrix(); renderResults(); renderMethods(); renderReferences();
  }
  init();
}());
