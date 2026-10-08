(function () {
  "use strict";
  var data = window.RESULT_BROWSER_DATA;
  var site = window.SITE_DATA;
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
  var groupLabels = { cohort: "疾病 / 健康", label: "标签", model: "模型", dataset: "数据集", severity: "严重程度" };
  var state = { page: "results", experiment: "combined", combinedSelected: ["qwen25"], selected: ["qwen25/easycall"], group: "cohort", metric: "wer", method: "combined", comparisonCohort: "disease", comparisonGroup: "dataset", comparisonMetric: "wer", comparisonDelta: "absolute", comparisonHeat: "table" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function int(value) { return value == null ? "—" : nf.format(Number(value)); }
  function val(value, metric) {
    if (value == null || Number.isNaN(Number(value))) return "—";
    return metricMeta[metric].score ? Number(value).toFixed(metricMeta[metric].digits) : (Number(value) * 100).toFixed(metricMeta[metric].digits) + "%";
  }
  function resultValue(row, kind, metric) {
    var value = row[kind] && row[kind][metric];
    if (value != null && !Number.isNaN(Number(value))) return val(value, metric);
    if (kind === "before" && row.status === "after_only") return "不可直接比较";
    if (kind === "after" && row.status === "baseline_only") return "待完成";
    return "—";
  }
  function deltaText(value, metric) {
    if (value == null || Number.isNaN(Number(value))) return "—";
    var n = Number(value), sign = n > 0 ? "+" : n < 0 ? "−" : "±";
    return metricMeta[metric].score ? sign + Math.abs(n).toFixed(metricMeta[metric].digits) : sign + (Math.abs(n) * 100).toFixed(metricMeta[metric].digits) + " pp";
  }
  function deltaClass(value, metric) {
    if (value == null || Number(value) === 0) return "";
    return (metricMeta[metric].direction === "lower" ? Number(value) < 0 : Number(value) > 0) ? "good" : "bad";
  }
  function pressed(root, key, value) {
    $$("[data-" + key + "]", root).forEach(function (button) { button.classList.toggle("active", button.getAttribute("data-" + key) === value); });
  }
  function setPage() {
    state.page = "comparison";
    $$("[data-page]").forEach(function (p) { p.hidden = p.dataset.page !== state.page; });
    $$("[data-page-link]").forEach(function (a) { a.classList.toggle("active", a.dataset.pageLink === state.page); });
  }
  function renderCombinedModels() {
    $("#combined-models").innerHTML = data.models.map(function (m) {
      return "<button type='button' class='model-chip" + (state.combinedSelected.indexOf(m.id) >= 0 ? " selected" : "") + "' data-combined-model='" + m.id + "'>" + esc(m.label) + "</button>";
    }).join("");
    $$("[data-combined-model]").forEach(function (button) {
      button.onclick = function () {
        var key = button.dataset.combinedModel, index = state.combinedSelected.indexOf(key);
        if (index >= 0 && state.combinedSelected.length > 1) state.combinedSelected.splice(index, 1);
        else if (index < 0) state.combinedSelected.push(key);
        renderCombinedModels(); renderResults();
      };
    });
    $("#combined-selection-count").textContent = state.combinedSelected.length + " 个模型";
  }
  function renderMatrix() {
    var models = data.models.filter(function (m) { return data.datasets.some(function (d) { return data.single[m.id + "/" + d.id]; }); });
    $("#single-matrix").innerHTML = "<div></div>" + data.datasets.map(function (d) { return "<div class='matrix-head'>" + esc(d.label) + "</div>"; }).join("") +
      models.map(function (m) {
        return "<div class='matrix-model'>" + esc(m.label) + "</div>" + data.datasets.map(function (d) {
          var key = m.id + "/" + d.id, item = data.single[key], complete = item && item.status === "complete", selected = state.selected.indexOf(key) >= 0;
          return "<button type='button' class='matrix-cell " + (complete ? "complete" : "pending") + (selected ? " selected" : "") + "' data-single-key='" + key + "' " + (complete ? "" : "disabled") + ">" + (complete ? "✓" : "—") + "</button>";
        }).join("");
      }).join("");
    $$("[data-single-key]").forEach(function (button) {
      button.onclick = function () {
        var key = button.dataset.singleKey, index = state.selected.indexOf(key);
        if (index >= 0 && state.selected.length > 1) state.selected.splice(index, 1);
        else if (index < 0) state.selected.push(key);
        renderMatrix(); renderResults();
      };
    });
    $("#selection-count").textContent = state.selected.length + " 个组合";
  }
  function selectedSections() {
    if (state.experiment === "combined") {
      return state.combinedSelected.map(function (model) {
        return { id: model, title: modelLabels[model], rows: (data.combined[state.group] || {})[model] || [], health: ((data.combined.cohort || {})[model] || []).find(function (r) { return r.category === "健康组"; }) };
      });
    }
    return state.selected.map(function (key) {
      var item = data.single[key];
      return { id: key, title: item ? modelLabels[item.model] + " × " + datasetLabels[item.train_dataset] : key, rows: item && item.groups[state.group] ? item.groups[state.group] : [], health: item && item.groups.cohort ? item.groups.cohort.find(function (r) { return r.category === "健康组"; }) : null };
    });
  }
  function splitSections(sections) {
    if (state.group === "cohort") return sections;
    var result = [];
    sections.forEach(function (section) {
      var disease = section.rows.filter(function (row) { return row.cohort ? row.cohort === "disease" : row.category.indexOf("健康") < 0; });
      var health = section.rows.filter(function (row) { return row.cohort ? row.cohort === "healthy" : row.category.indexOf("健康") >= 0; });
      if (disease.length) result.push({ id: section.id + "-disease", title: section.title + " · 疾病组", rows: disease });
      if (health.length) result.push({ id: section.id + "-health", title: section.title + " · 健康组", rows: health });
      if (!health.length && section.health) result.push({ id: section.id + "-health", title: section.title + " · 健康组", rows: [section.health] });
    });
    return result;
  }
  function renderChart(sections) {
    var metric = state.metric;
    $("#result-chart").innerHTML = splitSections(sections).map(function (section) {
      var chartRows = section.rows.filter(function (row) { return row.status !== "after_only"; });
      var all = [];
      chartRows.forEach(function (r) { if (r.before && r.before[metric] != null) all.push(Number(r.before[metric])); if (r.after && r.after[metric] != null) all.push(Number(r.after[metric])); });
      var max = Math.max.apply(Math, all.length ? all : [1]); if (metric === "semscore") max = Math.max(1, max);
      var groups = chartRows.map(function (row) {
        var bars = ["before", "after"].map(function (kind) {
          var x = row[kind] && row[kind][metric], height = x == null ? 0 : Math.max(3, Number(x) / max * 100);
          return "<div class='vbar-wrap'><div class='vbar-value'>" + resultValue(row, kind, metric) + "</div><div class='vbar " + kind + "' style='height:" + height.toFixed(2) + "%'>" + (x == null ? "<i></i>" : "") + "</div></div>";
        }).join("");
        return "<div class='vbar-group'>" + bars + "<span class='x-label'>" + esc(row.category) + "</span></div>";
      }).join("");
      return "<div class='chart-block'><div class='chart-title'><h2>" + esc(section.title) + " · " + esc(metricMeta[metric].label) + "</h2><div><i class='legend-before'></i>微调前 <i class='legend-after'></i>微调后</div></div><div class='vchart'><div class='vbars'>" + groups + "</div></div></div>";
    }).join("");
  }
  function renderTable(sections) {
    var metric = state.metric;
    $("#result-table").innerHTML = splitSections(sections).map(function (section) {
      var comparisonRows = section.rows.filter(function (row) { return row.status !== "after_only"; });
      var fullRows = section.rows.filter(function (row) { return row.status === "after_only"; });
      var body = comparisonRows.length ? comparisonRows.map(function (row) {
        var before = row.before && row.before[metric], after = row.after && row.after[metric], change = row.delta && row.delta[metric];
        var count = int(row.n) + (row.after_evaluated_n && row.after_evaluated_n > row.n ? "（配对；全量 " + int(row.after_evaluated_n) + "）" : "");
        var changeText = change == null && row.status !== "paired" ? "不计算" : deltaText(change, metric);
        return "<tr><td>" + esc(row.category) + "</td><td class='numeric'>" + count + "</td><td class='numeric'>" + resultValue(row, "before", metric) + "</td><td class='numeric'>" + resultValue(row, "after", metric) + "</td><td class='numeric delta " + deltaClass(change, metric) + "'>" + changeText + "</td></tr>";
      }).join("") : "<tr><td colspan='5'>暂无数据</td></tr>";
      var comparison = "<div class='data-table-block'><h3>" + esc(section.title) + "</h3><table class='data-table'><thead><tr><th>分组</th><th>N</th><th>微调前</th><th>微调后</th><th>差值</th></tr></thead><tbody>" + body + "</tbody></table></div>";
      var full = fullRows.length ? "<div class='data-table-block'><h3>" + esc(section.title) + " · 全量微调后</h3><table class='data-table'><thead><tr><th>分组</th><th>N</th><th>微调后</th></tr></thead><tbody>" + fullRows.map(function (row) { return "<tr><td>" + esc(row.label || row.category.replace(" · 全量微调后", "")) + "</td><td class='numeric'>" + int(row.n) + "</td><td class='numeric'>" + resultValue(row, "after", metric) + "</td></tr>"; }).join("") + "</tbody></table></div>" : "";
      return comparison + full;
    }).join("");
  }
  function renderResults() {
    pressed($("#experiment-tabs"), "experiment", state.experiment); pressed($("#group-tabs"), "group", state.group); pressed($("#metric-tabs"), "metric", state.metric);
    $("#combined-controls").hidden = state.experiment !== "combined"; $("#single-controls").hidden = state.experiment !== "single";
    var completion = data.completion || {};
    var jointDiseaseComplete = Object.values(data.combined_status || {}).filter(function (item) { return item.disease === "complete"; }).length;
    var progress = [
      "联合训练 " + int(completion.joint_training_complete) + "/" + int(completion.joint_training_total),
      "联合疾病 " + int(jointDiseaseComplete) + "/" + data.models.length,
      "单数据集 " + int(completion.single_disease_complete) + "/" + int(completion.single_disease_total),
      "健康 " + int(completion.healthy_complete) + "/" + int(completion.healthy_total)
    ].join(" · ");
    var sections = selectedSections(); $("#result-head").innerHTML = "<h1>" + esc((state.experiment === "combined" ? "联合微调" : "单数据集微调") + " · " + groupLabels[state.group]) + "</h1><span>" + esc(metricMeta[state.metric].label + " · " + progress) + "</span>";
    renderChart(sections); renderTable(sections);
  }
  function csvCell(value) { return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"'; }
  function downloadCurrent() {
    var metric = state.metric, sections = splitSections(selectedSections());
    var lines = [["section", "cohort", "category", "n", "after_evaluated_n", "metric", "before", "after", "delta", "status", "note"]];
    sections.forEach(function (section) {
      section.rows.forEach(function (row) {
        lines.push([
          section.title, row.cohort || "", row.category, row.n, row.after_evaluated_n || "", metric,
          row.before && row.before[metric], row.after && row.after[metric], row.delta && row.delta[metric],
          row.status, row.note
        ]);
      });
    });
    var blob = new Blob(["\ufeff" + lines.map(function (line) { return line.map(csvCell).join(","); }).join("\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "audiobench-" + state.experiment + "-" + state.group + "-" + metric + ".csv";
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }
  var comparisonMethods = [
    { id: "before", label: "微调前" },
    { id: "joint", label: "联合微调后" },
    { id: "cdsd", label: "仅 CDSD 微调后" },
    { id: "easycall", label: "仅 EasyCall 微调后" },
    { id: "torgo", label: "仅 TORGO 微调后" },
    { id: "uaspeech", label: "仅 UA-Speech 微调后" }
  ];
  function comparisonSource(model, method, category, requestedGroup) {
    var selectedGroup = requestedGroup || state.comparisonGroup;
    var grouping = selectedGroup === "overall" ? "cohort" : selectedGroup;
    var rows;
    if (method.id === "before" || method.id === "joint") rows = ((data.combined[grouping] || {})[model] || []);
    else {
      var item = data.single[model + "/" + method.id];
      rows = item && item.groups[grouping] ? item.groups[grouping] : [];
    }
    return rows.find(function (row) {
      if (row.status !== "paired" || row.cohort !== state.comparisonCohort) return false;
      return selectedGroup === "overall" ? true : row.category === category;
    }) || null;
  }
  function comparisonCategories(model) {
    if (state.comparisonGroup === "overall") return [{ id: "overall", label: "整体" }];
    var rows = ((data.combined[state.comparisonGroup] || {})[model] || []).filter(function (row) {
      return row.status === "paired" && row.cohort === state.comparisonCohort;
    });
    return [{ id: "overall", label: "整体" }].concat(rows.map(function (row) {
      return { id: row.category, label: row.category };
    }));
  }
  function comparisonChange(row, baseline, method) {
    if (method.id === "before") return 0;
    var absolute = row.delta && Number(row.delta[state.comparisonMetric]);
    if (!Number.isFinite(absolute)) return null;
    if (state.comparisonDelta === "absolute") return absolute;
    var before = baseline.before && Number(baseline.before[state.comparisonMetric]);
    var after = row.after && Number(row.after[state.comparisonMetric]);
    if (!Number.isFinite(before) || !Number.isFinite(after) || before === 0) return null;
    var relative = (after - before) / Math.abs(before);
    return metricMeta[state.comparisonMetric].direction === "lower" ? -relative : relative;
  }
  function comparisonDeltaText(value) {
    if (value == null || Number.isNaN(Number(value))) return state.comparisonDelta === "relative" ? "不可计算" : "—";
    if (state.comparisonDelta === "absolute") return deltaText(value, state.comparisonMetric);
    var n = Number(value), sign = n > 0 ? "+" : n < 0 ? "−" : "±";
    return sign + (Math.abs(n) * 100).toFixed(2) + "%";
  }
  function comparisonCell(model, method, category) {
    var selectedGroup = category.id === "overall" ? "overall" : state.comparisonGroup;
    var row = comparisonSource(model, method, category.id, selectedGroup);
    if (!row) return "—";
    var baseline = comparisonSource(model, comparisonMethods[0], category.id, selectedGroup);
    if (!baseline || row.n !== baseline.n || row.sample_ids_sha256 !== baseline.sample_ids_sha256) return "口径不一致";
    var kind = method.id === "before" ? "before" : "after";
    var change = comparisonChange(row, baseline, method);
    return resultValue(row, kind, state.comparisonMetric) + "（" + comparisonDeltaText(change) + "）";
  }
  function comparisonCellData(model, method, category) {
    var selectedGroup = category.id === "overall" ? "overall" : state.comparisonGroup;
    var row = comparisonSource(model, method, category.id, selectedGroup);
    var baseline = comparisonSource(model, comparisonMethods[0], category.id, selectedGroup);
    var comparable = !!(row && baseline && row.n === baseline.n && row.sample_ids_sha256 === baseline.sample_ids_sha256);
    var kind = method.id === "before" ? "before" : "after";
    var value = comparable && row[kind] ? Number(row[kind][state.comparisonMetric]) : null;
    var change = comparable ? comparisonChange(row, baseline, method) : null;
    return {
      text: comparisonCell(model, method, category),
      comparable: comparable,
      value: Number.isFinite(value) ? value : null,
      change: Number.isFinite(change) ? change : null
    };
  }
  function comparisonCellDataForGroup(model, method, category, grouping) {
    var selectedGroup = category.id === "overall" ? "overall" : grouping;
    var row = comparisonSource(model, method, category.id, selectedGroup);
    var baseline = comparisonSource(model, comparisonMethods[0], category.id, selectedGroup);
    var comparable = !!(row && baseline && row.n === baseline.n && row.sample_ids_sha256 === baseline.sample_ids_sha256);
    var kind = method.id === "before" ? "before" : "after";
    var value = comparable && row[kind] ? Number(row[kind][state.comparisonMetric]) : null;
    var change = comparable ? comparisonChange(row, baseline, method) : null;
    var text = !row ? "—" : !comparable ? "口径不一致" : resultValue(row, kind, state.comparisonMetric) + "（" + comparisonDeltaText(change) + "）";
    return {
      text: text,
      comparable: comparable,
      value: Number.isFinite(value) ? value : null,
      change: Number.isFinite(change) ? change : null
    };
  }
  function comparisonHeat(item, maximumChange) {
    if (!item.comparable) return { className: "heat-unavailable", style: "", opacity: "" };
    if (item.change == null) return { className: "heat-unavailable", style: "", opacity: "" };
    if (!item.change) return { className: "heat-neutral", style: "", opacity: "" };
    var magnitude = maximumChange ? Math.min(1, Math.abs(item.change) / maximumChange) : 0;
    var opacity = (0.14 + 0.50 * Math.sqrt(magnitude)).toFixed(3);
    var className = state.comparisonDelta === "relative" ? (item.change > 0 ? "good" : "bad") : deltaClass(item.change, state.comparisonMetric);
    return { className: "heat-" + className, style: " style='--heat-opacity:" + opacity + "'", opacity: opacity };
  }
  function comparisonMaximumChange(matrix) {
    return Math.max.apply(Math, matrix.flat().map(function (item) { return Math.abs(item.change || 0); }).concat([0]));
  }
  function comparisonPageMaximumChange() {
    var all = [];
    if (state.comparisonGroup === "model") {
      modelComparisonCategories().forEach(function (datasetCategory) {
        comparisonMethods.forEach(function (method) {
          data.models.forEach(function (model) { all.push(comparisonCellDataForGroup(model.id, method, datasetCategory, "dataset")); });
        });
      });
    } else {
      data.models.forEach(function (model) {
        comparisonCategories(model.id).forEach(function (category) {
          comparisonMethods.forEach(function (method) { all.push(comparisonCellData(model.id, method, category)); });
        });
      });
    }
    return Math.max.apply(Math, all.map(function (item) { return Math.abs(item.change || 0); }).concat([0]));
  }
  function comparisonChart(model, categories, matrix) {
    var values = matrix.flat().map(function (item) { return item.value; }).filter(function (value) { return value != null; });
    var maximumValue = Math.max.apply(Math, values.length ? values : [1]);
    if (metricMeta[state.comparisonMetric].score) maximumValue = Math.max(1, maximumValue);
    var groups = categories.map(function (category, categoryIndex) {
      var bars = comparisonMethods.map(function (method, methodIndex) {
        var item = matrix[methodIndex][categoryIndex];
        var height = item.value == null ? 0 : Math.max(2, item.value / maximumValue * 100);
        var chartStyle = " style='height:" + height.toFixed(2) + "%'";
        return "<i class='comparison-vbar series-" + methodIndex + "'" + chartStyle + " title='" + esc(method.label + " · " + category.label + "：" + item.text) + "' data-comparison-cell='" + esc(item.text) + "'></i>";
      }).join("");
      return "<div class='comparison-vbar-category'><div class='comparison-vbar-area'>" + bars + "</div><span class='comparison-vbar-label'>" + esc(category.label) + "</span></div>";
    }).join("");
    var legend = comparisonMethods.map(function (method, index) { return "<span><i class='series-" + index + "'></i>" + esc(method.label) + "</span>"; }).join("");
    return "<section class='comparison-chart' aria-label='" + esc(model.label + " " + metricMeta[state.comparisonMetric].label + " 柱状图") + "'><div class='comparison-chart-heading'><h4>" + esc(metricMeta[state.comparisonMetric].label) + " 柱状图</h4><div class='comparison-chart-legend'>" + legend + "</div></div><div class='comparison-vbar-groups' style='--category-count:" + categories.length + "'>" + groups + "</div></section>";
  }
  function modelComparisonCategories() {
    var rows = ((data.combined.dataset || {})[data.models[0].id] || []).filter(function (row) {
      return row.status === "paired" && row.cohort === state.comparisonCohort;
    });
    return [{ id: "overall", label: "整体" }].concat(rows.map(function (row) { return { id: row.category, label: row.category }; }));
  }
  function renderModelComparisonTable(datasetCategory) {
    var categories = data.models.map(function (model) { return { id: model.id, label: model.label }; });
    var matrix = comparisonMethods.map(function (method) {
      return data.models.map(function (model) { return comparisonCellDataForGroup(model.id, method, datasetCategory, "dataset"); });
    });
    var maximumChange = state.comparisonHeat === "page" ? comparisonPageMaximumChange() : comparisonMaximumChange(matrix);
    var head = "<tr><th>训练口径</th>" + categories.map(function (category) { return "<th>" + esc(category.label) + "</th>"; }).join("") + "</tr>";
    var body = comparisonMethods.map(function (method, methodIndex) {
      return "<tr><td>" + esc(method.label) + "</td>" + categories.map(function (category, categoryIndex) {
        var item = matrix[methodIndex][categoryIndex], heat = comparisonHeat(item, maximumChange);
        return "<td class='numeric comparison-heat " + heat.className + "'" + heat.style + ">" + item.text + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return "<section class='comparison-table-block' data-comparison-model='all-models' data-comparison-category='" + esc(datasetCategory.id) + "' data-comparison-cohort='" + esc(state.comparisonCohort) + "'><h3>模型对照 · " + esc(datasetCategory.label) + "</h3><div class='table-scroll'><table class='data-table comparison-table'><thead>" + head + "</thead><tbody>" + body + "</tbody></table></div>" + comparisonChart({ label: "模型对照 · " + datasetCategory.label }, categories, matrix) + "</section>";
  }
  function renderModelComparison() {
    return modelComparisonCategories().map(renderModelComparisonTable).join("");
  }
  function renderComparison() {
    pressed($("#comparison-cohort-tabs"), "comparison-cohort", state.comparisonCohort);
    pressed($("#comparison-group-tabs"), "comparison-group", state.comparisonGroup);
    pressed($("#comparison-metric-tabs"), "comparison-metric", state.comparisonMetric);
    pressed($("#comparison-delta-tabs"), "comparison-delta", state.comparisonDelta);
    pressed($("#comparison-heat-tabs"), "comparison-heat", state.comparisonHeat);
    var cohortLabel = state.comparisonCohort === "disease" ? "疾病组" : "健康组";
    var groupingLabel = state.comparisonGroup === "overall" ? "整体" : state.comparisonGroup === "model" ? "模型" : groupLabels[state.comparisonGroup];
    $("#comparison-head").innerHTML = "<h1>统一对照 · " + esc(cohortLabel) + " · " + esc(groupingLabel) + "</h1>";
    if (state.comparisonGroup === "model") {
      $("#comparison-tables").innerHTML = renderModelComparison();
      return;
    }
    $("#comparison-tables").innerHTML = data.models.map(function (model) {
      var categories = comparisonCategories(model.id);
      var head = "<tr><th>训练口径</th>" + categories.map(function (category) { return "<th>" + esc(category.label) + "</th>"; }).join("") + "</tr>";
      var matrix = comparisonMethods.map(function (method) { return categories.map(function (category) { return comparisonCellData(model.id, method, category); }); });
      var maximumChange = state.comparisonHeat === "page" ? comparisonPageMaximumChange() : comparisonMaximumChange(matrix);
      var body = comparisonMethods.map(function (method) {
        var methodIndex = comparisonMethods.indexOf(method);
        return "<tr><td>" + esc(method.label) + "</td>" + categories.map(function (category, categoryIndex) {
          var item = matrix[methodIndex][categoryIndex], heat = comparisonHeat(item, maximumChange);
          return "<td class='numeric comparison-heat " + heat.className + "'" + heat.style + ">" + item.text + "</td>";
        }).join("") + "</tr>";
      }).join("");
      return "<section class='comparison-table-block' data-comparison-model='" + esc(model.id) + "' data-comparison-cohort='" + esc(state.comparisonCohort) + "'><h3>" + esc(model.label) + "</h3><div class='table-scroll'><table class='data-table comparison-table'><thead>" + head + "</thead><tbody>" + body + "</tbody></table></div>" + comparisonChart(model, categories, matrix) + "</section>";
    }).join("");
  }
  function downloadComparison() {
    var lines = [["cohort", "grouping", "model", "category", "method", "metric", "delta_mode", "n", "sample_ids_sha256", "before", "value", "delta"]];
    if (state.comparisonGroup === "model") {
      modelComparisonCategories().forEach(function (category) {
        data.models.forEach(function (model) {
          comparisonMethods.forEach(function (method) {
            var selectedGroup = category.id === "overall" ? "overall" : "dataset";
            var row = comparisonSource(model.id, method, category.id, selectedGroup);
            var baseline = comparisonSource(model.id, comparisonMethods[0], category.id, selectedGroup);
            var kind = method.id === "before" ? "before" : "after";
            var comparable = row && baseline && row.n === baseline.n && row.sample_ids_sha256 === baseline.sample_ids_sha256;
            lines.push([state.comparisonCohort, state.comparisonGroup, model.id, category.label, method.id, state.comparisonMetric, state.comparisonDelta, comparable ? row.n : "", comparable ? row.sample_ids_sha256 : "", comparable ? baseline.before[state.comparisonMetric] : "", comparable ? row[kind][state.comparisonMetric] : "", comparable ? comparisonChange(row, baseline, method) : ""]);
          });
        });
      });
    } else {
    data.models.forEach(function (model) {
      comparisonCategories(model.id).forEach(function (category) {
        comparisonMethods.forEach(function (method) {
          var selectedGroup = category.id === "overall" ? "overall" : state.comparisonGroup;
          var row = comparisonSource(model.id, method, category.id, selectedGroup);
          var baseline = comparisonSource(model.id, comparisonMethods[0], category.id, selectedGroup);
          var kind = method.id === "before" ? "before" : "after";
          var comparable = row && baseline && row.n === baseline.n && row.sample_ids_sha256 === baseline.sample_ids_sha256;
          lines.push([state.comparisonCohort, state.comparisonGroup, model.id, category.label, method.id, state.comparisonMetric, state.comparisonDelta, comparable ? row.n : "", comparable ? row.sample_ids_sha256 : "", comparable ? baseline.before[state.comparisonMetric] : "", comparable ? row[kind][state.comparisonMetric] : "", comparable ? comparisonChange(row, baseline, method) : ""]);
        });
      });
    });
    }
    var blob = new Blob(["\ufeff" + lines.map(function (line) { return line.map(csvCell).join(","); }).join("\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "audiobench-comparison-" + state.comparisonCohort + "-" + state.comparisonGroup + "-" + state.comparisonMetric + ".csv";
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }
  function configRows(config) {
    var labels = { lora_rank: "LoRA rank", lora_alpha: "LoRA alpha", lora_dropout: "LoRA dropout", learning_rate: "学习率", weight_decay: "权重衰减", warmup_ratio: "warmup", lr_scheduler: "调度", effective_batch_size: "有效 batch", precision: "精度", attention: "Attention", max_grad_norm: "梯度裁剪", selection: "保存" };
    return Object.entries(config).map(function (entry) { return "<tr><td>" + esc(labels[entry[0]] || entry[0]) + "</td><td class='numeric'>" + esc(entry[1]) + "</td></tr>"; }).join("");
  }
  function methodData() {
    var method = data.methods.combined, datasets = method.datasets;
    var rows = datasets.map(function (d) { return "<tr><td>" + esc(d.label) + "</td><td class='numeric'>" + int(d.speakers) + "</td><td class='numeric'>" + int(d.rows) + "</td><td class='numeric'>" + int(d.splits.train || 0) + "</td><td class='numeric'>" + int(d.splits.dev || 0) + "</td><td class='numeric'>" + int(d.splits.test || 0) + "</td><td class='numeric'>" + int(d.splits.control_eval || 0) + "</td></tr>"; }).join("");
    var balls = site.datasets.map(function (dataset) {
      var speakers = site.speakers.filter(function (speaker) { return speaker.dataset === dataset.id; });
      return "<section class='speaker-group'><h3>" + esc(dataset.label) + " <small>" + speakers.length + " 人</small></h3><div class='speaker-dots'>" + speakers.map(function (speaker) { return "<span class='speaker-dot sev-" + esc(speaker.severity_key) + "' title='" + esc(speaker.dataset_label + " " + speaker.speaker_id + " · " + speaker.severity_label + " · " + speaker.primary_assignment) + "'></span>"; }).join("") + "</div></section>";
    }).join("");
    rows = datasets.map(function (d) { return "<tr><td>" + esc(d.label) + "</td><td class='numeric'>" + int(d.speakers) + "</td><td class='numeric'>" + int(d.rows) + "</td><td class='numeric'>" + int(d.splits.train || 0) + "</td><td class='numeric'>" + int(d.splits.dev || 0) + "</td><td class='numeric'>" + int(d.splits.test || 0) + "</td><td class='numeric'>" + int(d.splits.control_eval || 0) + "</td><td class='numeric'>" + int(d.splits.excluded_train || 0) + "</td></tr>"; }).join("");
    return "<section class='method-block'><h2>数据集与划分</h2><div class='table-scroll'><table class='data-table'><thead><tr><th>数据集</th><th>说话人</th><th>音频</th><th>训练</th><th>验证</th><th>疾病测试</th><th>健康测试</th><th>排除</th></tr></thead><tbody>" + rows + "</tbody></table></div></section><section class='method-block'><h2>说话人</h2><div class='speaker-board'>" + balls + "</div></section><section class='method-block'><div class='method-two'><div><h2>抽样</h2><div class='sampling-list'>" + Object.entries(method.sampling).map(function (entry) { return "<div><b>" + esc(datasetLabels[entry[0]]) + "</b><span>" + int(entry[1]) + "</span></div>"; }).join("") + "</div></div><div><h2>配置</h2><table class='data-table config-table'><tbody>" + configRows(method.hyperparameters) + "</tbody></table></div></div></section>";
  }
  function singleMethod() {
    var recipe = data.methods.single.recipe, jobs = data.methods.single.jobs.map(function (job) { return "<tr><td>" + esc(modelLabels[job.model]) + "</td><td>" + esc(datasetLabels[job.dataset]) + "</td><td class='numeric'>" + int(job.draw_count) + "</td><td class='numeric'>" + int(job.expected_global_steps) + "</td></tr>"; }).join("");
    return "<section class='method-block'><h2>配置</h2><table class='data-table config-table'><tbody>" + configRows(recipe) + "</tbody></table></section><section class='method-block'><h2>任务</h2><div class='table-scroll'><table class='data-table'><thead><tr><th>模型</th><th>训练集</th><th>抽样</th><th>steps</th></tr></thead><tbody>" + jobs + "</tbody></table></div></section>";
  }
  function renderMethods() { pressed($("#method-tabs"), "method", state.method); $("#method-content").innerHTML = state.method === "combined" ? methodData() : singleMethod(); }
  function renderReferences() {
    var notes = [
      ["Residual Adapters", "非典型语音上比较 residual adapter 与全量微调；冻结大部分 ASR，只训练小型残差模块。相同：参数高效适配。不同：不是 LoRA，模型和划分不同。"],
      ["Adapter Fusion", "构音障碍 ASR 比较 target adapter、adapter fusion 和全量微调。相同：冻结基座、少量参数适配。不同：使用 adapter fusion，不是本项目的 LoRA。"],
      ["Perceiver-Prompt", "中文言语障碍识别中对 Whisper 做 LoRA，并加入感知提示。相同：Whisper、病理语音、注意力投影适配。不同：目标层和提示模块更宽。"],
      ["Self-Supervised Pre-Trained", "在 UA-Speech、TORGO 上微调 HuBERT/wav2vec 等预训练 ASR。相同：预训练模型领域适配和说话人隔离。不同：不是语言模型 LoRA。"],
      ["Data-Centric Strategies", "比较混合病理语料、疾病子集和个性化训练。相同：多来源病理语音训练。不同：没有使用本项目的三模型统一 LoRA 配方。"],
      ["LoRA-Whisper", "研究 Whisper 的 attention 与 FFN LoRA，以及不同 rank。相同：低秩适配和目标层比较。不同：主要面向通用多语 ASR。"],
      ["Fine-tuning Strategies", "在自闭症谱系障碍语音上比较 full、selective、adapter、LoRA 和 AdaLoRA。相同：比较参数高效与全量微调。不同：说话人规模和任务划分不同。"],
      ["Personalized Fine-Tuning", "用 Whisper large-v3 比较 LoRA/AdaLoRA 与个性化表示。相同：Whisper q/v LoRA、rank 搜索。不同：重点是个性化和合成语音。"],
      ["CBA-Whisper", "在 SAP、UA-Speech、TORGO 上做 curriculum-based AdaLoRA。相同：多病理语料与参数高效适配。不同：包含课程学习和额外后处理。"],
      ["Enhancing Whisper", "在 UA-Speech、TORGO 上微调 Whisper-Turbo，并用 TORGO 五折评估。相同：Whisper-Turbo、warmup、weight decay。不同：本项目 final 不由五折选模型。"],
      ["Speech Accessibility Project Challenge", "汇总病理语音 foundation model 适配系统。相同：预训练模型、说话人独立评测。不同：不是单一训练配方。"],
      ["XLS-R", "研究多语种预训练中的温度采样。相同：平方根权重用于缓解数据规模失衡。不同：原文是多语种预训练，不是病理语音微调。"],
      ["Transferable Speech", "冻结 Whisper encoder，训练 speech-to-text 对齐模块和语言模型 LoRA。相同：冻结基座、rank 16、alpha 32、学习率 1e-4。不同：任务是跨模块对齐。"],
      ["Phi-4-Mini", "介绍 Phi-4 Multimodal 的 speech LoRA 和冻结音频编码器设计。相同：attention/MLP LoRA、冻结音频前端。不同：本项目是独立病理语音适配。"],
      ["Qwen2.5-Omni", "介绍 Qwen2.5-Omni 的 Thinker-Talker 和多模态训练阶段。相同：转写时只适配 Thinker。不同：本项目没有复现厂商预训练流程。"],
      ["Adapting Foundation ASR", "单说话人病理语音中比较 full fine-tuning 与 LoRA。相同：直接讨论病理语音 PEFT。不同：结果提示全量微调可能更强，规模也不同。"],
      ["Parameter-Efficient Fine-Tuning for Dysarthric", "单说话人构音障碍 ASR 中比较 attention LoRA、FFN LoRA 和全量微调。相同：rank 16、alpha 32、学习率 1e-4。不同：不是多语料未见说话人设置。"],
      ["Bridging ASR and LLMs", "比较 TORGO 与 UA-Speech 间的跨数据集迁移。相同：关注跨语料泛化。不同：重点不是统一 LoRA 配方。"],
      ["Investigating Adapters", "比较低资源 ASR 中 adapter 的数据规模效应。相同：说明少量参数适配受数据量影响。不同：不是病理语音三模型实验。"]
    ];
    function note(item) {
      var hit = notes.find(function (pair) { return item.title.indexOf(pair[0]) >= 0; });
      return hit ? hit[1] : item.decision_reason;
    }
    $("#reference-count").textContent = data.methods.references.length + " 篇";
    $("#reference-list").innerHTML = data.methods.references.map(function (reference) { return "<article class='reference-item'><h3>" + esc(reference.title) + "</h3><p>" + esc(reference.authors) + " · " + esc(reference.venue) + " · " + reference.year + "</p><p>" + esc(note(reference)) + "</p><a href='" + esc(reference.stable_url) + "' target='_blank' rel='noopener'>原文</a></article>"; }).join("");
  }
  function bind(root, key, callback) { $$("[data-" + key + "]", root).forEach(function (button) { button.onclick = function () { callback(button.getAttribute("data-" + key)); }; }); }
  function init() {
    bind($("#comparison-cohort-tabs"), "comparison-cohort", function (value) { state.comparisonCohort = value; renderComparison(); });
    bind($("#comparison-group-tabs"), "comparison-group", function (value) { state.comparisonGroup = value; renderComparison(); });
    bind($("#comparison-metric-tabs"), "comparison-metric", function (value) { state.comparisonMetric = value; renderComparison(); });
    bind($("#comparison-delta-tabs"), "comparison-delta", function (value) { state.comparisonDelta = value; renderComparison(); });
    bind($("#comparison-heat-tabs"), "comparison-heat", function (value) { state.comparisonHeat = value; renderComparison(); });
    window.onhashchange = setPage;
    $("#download-comparison").onclick = downloadComparison;
    setPage(); renderComparison();
  }
  init();
}());
