(function () {
  "use strict";

  var data = window.AUDIOBENCH_MATRIX_DATA;
  if (!data) return;

  var state = { scope: "overall", group: "none", metric: "wer" };
  var modelLabels = Object.fromEntries(data.models.map(function (item) { return [item.id, item.label]; }));
  var variantLabels = Object.fromEntries(data.variants.map(function (item) { return [item.id, item.label]; }));
  var datasetLabels = Object.fromEntries(data.datasets.map(function (item) { return [item.id, item.label]; }));
  var datasetOrder = data.datasets.map(function (item) { return item.id; });
  var modelOrder = data.models.map(function (item) { return item.id; });
  var variantOrder = data.variants.map(function (item) { return item.id; });
  var currentTables = [];

  function $(selector, root) { return (root || document).querySelector(selector); }
  function $$(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character];
    });
  }
  function key(parts) { return parts.join("\u001f"); }

  var overallIndex = new Map(data.overall.records.map(function (record) {
    return [key([record.cohort, record.model, record.variant, record.dataset]), record];
  }));
  var datasetIndex = new Map(data.overall.dataset_records.map(function (record) {
    return [key([record.dataset, record.cohort, record.group, record.model, record.variant]), record];
  }));
  var assistiveIndex = new Map(data.assistive.records.map(function (record) {
    return [key([record.cohort, record.dimension, record.group, record.model, record.variant]), record];
  }));

  function overallRecord(cohort, model, variant, dataset) {
    return overallIndex.get(key([cohort, model, variant, dataset])) || { status: "running" };
  }
  function datasetRecord(dataset, cohort, group, model, variant) {
    return datasetIndex.get(key([dataset, cohort, group, model, variant])) || { status: "running" };
  }
  function assistiveRecord(cohort, dimension, group, model, variant) {
    return assistiveIndex.get(key([cohort, dimension, group, model, variant])) || { status: "running" };
  }

  function metricValue(record) {
    return record && record.status === "complete" ? Number(record[state.metric]) : null;
  }
  function valueText(value) {
    if (value == null || !Number.isFinite(value)) return "—";
    return state.metric === "wer" ? (value * 100).toFixed(2) + "%" : value.toFixed(4);
  }
  function relativeValue(record) {
    var value = record && record.relative && record.relative[state.metric];
    return value == null || !Number.isFinite(Number(value)) ? null : Number(value);
  }
  function relativeText(record) {
    if (!record || record.status !== "complete") return "";
    if (record.variant === "original") return "（基准）";
    var value = relativeValue(record);
    if (value == null) return "（—）";
    var sign = value > 0 ? "+" : value < 0 ? "−" : "±";
    return "（" + sign + (Math.abs(value) * 100).toFixed(2) + "%）";
  }
  function heatStyle(record) {
    if (!record || record.status !== "complete") return "";
    if (record.variant === "original") return "background:rgba(100,116,139,.13)";
    var value = relativeValue(record);
    if (value == null || value === 0) return "background:rgba(100,116,139,.08)";
    var opacity = Math.min(0.56, 0.10 + Math.min(Math.abs(value), 1) * 0.46);
    return value > 0
      ? "background:rgba(16,185,129," + opacity.toFixed(3) + ")"
      : "background:rgba(239,68,68," + opacity.toFixed(3) + ")";
  }
  function cellHtml(record) {
    if (!record || record.status === "running") return "<td class='metric-cell pending'>进行中</td>";
    if (record.status === "not_applicable") return "<td class='metric-cell not-applicable'>不适用</td>";
    var title = "N=" + (record.n == null ? "—" : record.n) + "；相对原始权重改善=" + (relativeValue(record) == null ? "—" : (relativeValue(record) * 100).toFixed(2) + "%");
    return "<td class='metric-cell' style='" + heatStyle(record) + "' title='" + esc(title) + "'><strong>" + valueText(metricValue(record)) + "</strong><small>" + relativeText(record) + "</small></td>";
  }

  function modelVariantRows(models) {
    var rows = [];
    (models || modelOrder).forEach(function (model) {
      variantOrder.forEach(function (variant) {
        rows.push({ id: model + "/" + variant, label: modelLabels[model] + " · " + variantLabels[variant], model: model, variant: variant });
      });
    });
    return rows;
  }
  function variantRows(model) {
    return variantOrder.map(function (variant) { return { id: variant, label: variantLabels[variant], model: model, variant: variant }; });
  }
  function datasetColumns() {
    return datasetOrder.map(function (dataset) { return { id: dataset, label: datasetLabels[dataset] }; });
  }

  function overallTables() {
    var tables = [];
    if (state.group === "none") {
      ["disease", "healthy"].forEach(function (cohort) {
        tables.push({
          id: "overall-" + cohort,
          title: cohort === "disease" ? "疾病组 · 全部模型与权重变式" : "健康组 · 全部模型与权重变式",
          note: cohort === "healthy" ? "CDSD 与 UA-Speech 没有健康对照队列。" : "疾病测试队列按数据集冻结。",
          rows: modelVariantRows(),
          columns: datasetColumns(),
          cell: function (row, column) { return overallRecord(cohort, row.model, row.variant, column.id); }
        });
      });
      return tables;
    }
    if (state.group === "model") {
      modelOrder.forEach(function (model) {
        ["disease", "healthy"].forEach(function (cohort) {
          tables.push({
            id: "model-" + model + "-" + cohort,
            title: modelLabels[model] + " · " + (cohort === "disease" ? "疾病组" : "健康组"),
            note: "行表示原始权重及六种单数据集微调权重。",
            rows: variantRows(model),
            columns: datasetColumns(),
            cell: function (row, column) { return overallRecord(cohort, model, row.variant, column.id); }
          });
        });
      });
      return tables;
    }
    datasetOrder.forEach(function (dataset) {
      var groups = data.overall.dataset_group_order[dataset] || [];
      var rows = groups.map(function (group) {
        return { id: group, label: group, cohort: group === "健康" ? "healthy" : "disease", group: group };
      });
      var columns = modelVariantRows().map(function (item) {
        return { id: item.id, label: item.label, model: item.model, variant: item.variant };
      });
      tables.push({
        id: "dataset-" + dataset,
        title: datasetLabels[dataset] + " · 原生严重度",
        note: "健康作为一个严重度分组；未提供原生等级时使用疾病/健康分组。",
        rows: rows,
        columns: columns,
        cell: function (row, column) { return datasetRecord(dataset, row.cohort, row.group, column.model, column.variant); }
      });
    });
    return tables;
  }

  function assistiveTables() {
    var tables = [];
    if (state.group === "none") {
      ["disease", "healthy"].forEach(function (cohort) {
        tables.push({
          id: "assistive-all-" + cohort,
          title: "辅助性场景 · " + (cohort === "disease" ? "疾病组" : "健康组"),
          note: data.assistive.note,
          rows: modelVariantRows(),
          columns: [{ id: "全部辅助性场景", label: "全部辅助性场景" }],
          cell: function (row, column) { return assistiveRecord(cohort, "overall", column.id, row.model, row.variant); }
        });
      });
      return tables;
    }
    if (state.group === "model") {
      modelOrder.forEach(function (model) {
        ["disease", "healthy"].forEach(function (cohort) {
          tables.push({
            id: "assistive-model-" + model + "-" + cohort,
            title: modelLabels[model] + " · 辅助性场景 · " + (cohort === "disease" ? "疾病组" : "健康组"),
            note: "三类严格辅助性场景；GermanPD 与 PC-GITA 在该口径下均为 0 条。",
            rows: variantRows(model),
            columns: data.assistive.group_order.scene.map(function (group) { return { id: group, label: group }; }),
            cell: function (row, column) { return assistiveRecord(cohort, "scene", column.id, model, row.variant); }
          });
        });
      });
      return tables;
    }
    ["disease", "healthy"].forEach(function (cohort) {
      tables.push({
        id: "assistive-dataset-" + cohort,
        title: "辅助性场景 · 来源数据集 × 标签 · " + (cohort === "disease" ? "疾病组" : "健康组"),
        note: "列为来源数据集与辅助性标签的组合；没有样本的组合不显示。",
        rows: modelVariantRows(),
        columns: data.assistive.group_order.dataset.map(function (group) { return { id: group, label: group }; }),
        cell: function (row, column) { return assistiveRecord(cohort, "dataset", column.id, row.model, row.variant); }
      });
    });
    return tables;
  }

  function chartHtml(table) {
    var values = [];
    table.rows.forEach(function (row) {
      table.columns.forEach(function (column) {
        var value = metricValue(table.cell(row, column));
        if (value != null) values.push(value);
      });
    });
    var maximum = state.metric === "semscore" ? 1 : Math.max.apply(Math, values.length ? values : [1]);
    var style = "grid-template-columns:minmax(170px,240px) repeat(" + table.columns.length + ",minmax(74px,1fr))";
    var output = "<div class='chart-panel'><div class='section-heading'><h3>配套图表</h3><span>条长表示" + (state.metric === "wer" ? "WER" : "SemScore") + "，颜色表示相对原始权重改善</span></div><div class='bar-matrix-scroll'><div class='bar-matrix' style='" + style + "'>";
    output += "<div class='bar-corner'></div>" + table.columns.map(function (column) { return "<div class='bar-head'>" + esc(column.label) + "</div>"; }).join("");
    table.rows.forEach(function (row) {
      output += "<div class='bar-row-label'>" + esc(row.label) + "</div>";
      table.columns.forEach(function (column) {
        var record = table.cell(row, column), value = metricValue(record);
        if (value == null) {
          output += "<div class='bar-cell empty'>—</div>";
          return;
        }
        var width = Math.max(2, Math.min(100, value / maximum * 100));
        output += "<div class='bar-cell' title='" + esc(column.label + " · " + valueText(value)) + "'><span class='bar-fill' style='width:" + width.toFixed(2) + "%;" + heatStyle(record) + "'></span><em>" + valueText(value) + "</em></div>";
      });
    });
    return output + "</div></div></div>";
  }

  function tableHtml(table) {
    var body = table.rows.map(function (row) {
      return "<tr><th scope='row'>" + esc(row.label) + "</th>" + table.columns.map(function (column) { return cellHtml(table.cell(row, column)); }).join("") + "</tr>";
    }).join("");
    var header = "<tr><th>" + (state.group === "dataset" && state.scope === "overall" ? "严重度" : "模型 / 权重变式") + "</th>" + table.columns.map(function (column) { return "<th>" + esc(column.label) + "</th>"; }).join("") + "</tr>";
    return "<article class='result-block' id='" + esc(table.id) + "'><div class='section-heading'><div><h2>" + esc(table.title) + "</h2><p>" + esc(table.note || "") + "</p></div><button type='button' data-download-table='" + esc(table.id) + "'>下载 CSV</button></div><div class='table-scroll'><table class='data-table matrix-table'><thead>" + header + "</thead><tbody>" + body + "</tbody></table></div>" + chartHtml(table) + "</article>";
  }

  function csvCell(value) { return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"'; }
  function downloadTable(table) {
    var rows = [["table", "row", "column", "metric", "value", "relative_improvement", "status"]];
    table.rows.forEach(function (row) {
      table.columns.forEach(function (column) {
        var record = table.cell(row, column);
        rows.push([table.title, row.label, column.label, state.metric, metricValue(record), relativeValue(record), record.status || "running"]);
      });
    });
    var blob = new Blob(["\ufeff" + rows.map(function (row) { return row.map(csvCell).join(","); }).join("\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "audiobench-" + table.id + "-" + state.metric + ".csv";
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }

  function pressed(attribute, value) {
    $$('[data-' + attribute + ']').forEach(function (button) {
      button.classList.toggle("active", button.getAttribute('data-' + attribute) === value);
    });
  }
  function render() {
    pressed("scope", state.scope); pressed("group", state.group); pressed("metric", state.metric);
    currentTables = state.scope === "overall" ? overallTables() : assistiveTables();
    var complete = 0, running = 0;
    currentTables.forEach(function (table) {
      table.rows.forEach(function (row) { table.columns.forEach(function (column) {
        var status = (table.cell(row, column) || {}).status;
        if (status === "complete") complete += 1;
        else if (status === "running") running += 1;
      }); });
    });
    var scopeLabel = state.scope === "overall" ? "整体" : "辅助性";
    var groupLabel = { none: "不分组", model: "按模型", dataset: "按数据集" }[state.group];
    $("#result-head").innerHTML = "<div><h1>" + scopeLabel + " · " + groupLabel + "</h1><p>" + (state.scope === "overall" ? "5 个模型 × 7 种权重变式 × 6 个数据集；联合微调暂不纳入。" : "严格辅助性场景共 " + data.assistive.strict_samples + " 条；新数据集严格口径样本为 0。") + "</p></div><span>" + (state.metric === "wer" ? "WER" : "SemScore") + " · 已完成格 " + complete + " · 进行中 " + running + " · 数据构建 " + esc(data.built_at) + "</span>";
    $("#result-content").innerHTML = currentTables.map(tableHtml).join("");
    $$('[data-download-table]').forEach(function (button) {
      button.onclick = function () {
        var table = currentTables.find(function (item) { return item.id === button.dataset.downloadTable; });
        if (table) downloadTable(table);
      };
    });
  }

  $$('[data-scope]').forEach(function (button) { button.onclick = function () { state.scope = button.dataset.scope; render(); }; });
  $$('[data-group]').forEach(function (button) { button.onclick = function () { state.group = button.dataset.group; render(); }; });
  $$('[data-metric]').forEach(function (button) { button.onclick = function () { state.metric = button.dataset.metric; render(); }; });
  render();
})();
