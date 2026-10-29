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
  var variantColors = {
    original: "#94a3b8", cdsd: "#2563eb", easycall: "#10b981", torgo: "#f59e0b",
    uaspeech: "#8b5cf6", germanpd: "#0891b2", pc_gita: "#e11d48"
  };

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
    var opacity = Math.min(0.30, 0.045 + Math.min(Math.abs(value), 1) * 0.255);
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
          rowKind: "modelVariant",
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
            rowKind: "variant",
            fixedModel: model,
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
        rowKind: "group",
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
          rowKind: "modelVariant",
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
            rowKind: "variant",
            fixedModel: model,
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
        rowKind: "modelVariant",
        rows: modelVariantRows(),
        columns: data.assistive.group_order.dataset.map(function (group) { return { id: group, label: group }; }),
        cell: function (row, column) { return assistiveRecord(cohort, "dataset", column.id, row.model, row.variant); }
      });
    });
    return tables;
  }

  function chartGroups(table) {
    if (table.rowKind === "modelVariant") {
      return modelOrder.map(function (model) {
        var series = table.rows.filter(function (row) { return row.model === model; });
        return { model: model, categories: table.columns, series: series, record: function (seriesItem, category) { return table.cell(seriesItem, category); } };
      });
    }
    if (table.rowKind === "variant") {
      return [{ model: table.fixedModel, categories: table.columns, series: table.rows, record: function (seriesItem, category) { return table.cell(seriesItem, category); } }];
    }
    return modelOrder.map(function (model) {
      var series = table.columns.filter(function (column) { return column.model === model; });
      return { model: model, categories: table.rows, series: series, record: function (seriesItem, category) { return table.cell(category, seriesItem); } };
    });
  }

  function axisText(value) {
    return state.metric === "wer" ? (value * 100).toFixed(0) + "%" : value.toFixed(2);
  }

  function groupedBarChart(group) {
    var values = [];
    group.categories.forEach(function (category) {
      group.series.forEach(function (series) {
        var value = metricValue(group.record(series, category));
        if (value != null) values.push(value);
      });
    });
    if (!values.length) return "";
    var maximum = state.metric === "semscore" ? 1 : Math.max.apply(Math, values) * 1.08;
    var width = Math.max(680, group.categories.length * 112);
    var height = 330, left = 56, right = 18, top = 16, bottom = 74;
    var plotWidth = width - left - right, plotHeight = height - top - bottom;
    var slot = plotWidth / group.categories.length;
    var barWidth = Math.max(3, Math.min(14, slot / (group.series.length + 1)));
    var svg = ["<svg class='grouped-bar-svg' viewBox='0 0 " + width + " " + height + "' role='img' aria-label='" + esc(modelLabels[group.model] + " " + (state.metric === "wer" ? "WER" : "SemScore")) + "'>"];
    for (var tick = 0; tick <= 4; tick += 1) {
      var ratio = tick / 4, y = top + plotHeight - ratio * plotHeight, tickValue = ratio * maximum;
      svg.push("<line x1='" + left + "' y1='" + y + "' x2='" + (width - right) + "' y2='" + y + "' class='chart-gridline'/>");
      svg.push("<text x='" + (left - 8) + "' y='" + (y + 4) + "' text-anchor='end' class='chart-axis-text'>" + axisText(tickValue) + "</text>");
    }
    group.categories.forEach(function (category, categoryIndex) {
      var center = left + slot * categoryIndex + slot / 2;
      var totalBars = group.series.length * barWidth;
      group.series.forEach(function (series, seriesIndex) {
        var record = group.record(series, category), value = metricValue(record);
        if (value == null) return;
        var barHeight = Math.max(1, value / maximum * plotHeight);
        var x = center - totalBars / 2 + seriesIndex * barWidth;
        var y = top + plotHeight - barHeight;
        svg.push("<rect x='" + x.toFixed(2) + "' y='" + y.toFixed(2) + "' width='" + Math.max(2, barWidth - 1).toFixed(2) + "' height='" + barHeight.toFixed(2) + "' rx='1.5' fill='" + variantColors[series.variant] + "'><title>" + esc(category.label + " · " + variantLabels[series.variant] + " · " + valueText(value)) + "</title></rect>");
      });
      svg.push("<text x='" + center.toFixed(2) + "' y='" + (top + plotHeight + 20) + "' text-anchor='end' transform='rotate(-25 " + center.toFixed(2) + " " + (top + plotHeight + 20) + ")' class='chart-category-text'>" + esc(category.label) + "</text>");
    });
    svg.push("</svg>");
    var legend = group.series.map(function (series) {
      return "<span><i style='background:" + variantColors[series.variant] + "'></i>" + esc(variantLabels[series.variant]) + "</span>";
    }).join("");
    return "<div class='standard-chart'><h3>" + esc(modelLabels[group.model]) + "</h3><div class='chart-scroll'>" + svg.join("") + "</div><div class='chart-series-legend'>" + legend + "</div></div>";
  }

  function chartHtml(table) {
    var charts = chartGroups(table).map(groupedBarChart).filter(Boolean).join("");
    return charts ? "<div class='chart-panel'><div class='standard-chart-grid'>" + charts + "</div></div>" : "";
  }

  function columnHeader(column) {
    if (!column.model) return esc(column.label);
    return "<span class='column-model'>" + esc(modelLabels[column.model]) + "</span><span class='column-variant'>" + esc(variantLabels[column.variant]) + "</span>";
  }

  function rowPrefix(table, row, index) {
    if (table.rowKind === "modelVariant") {
      var previous = index > 0 ? table.rows[index - 1] : null;
      var modelCell = "";
      if (!previous || previous.model !== row.model) {
        var span = table.rows.filter(function (item) { return item.model === row.model; }).length;
        modelCell = "<th class='model-group-cell' scope='rowgroup' rowspan='" + span + "'>" + esc(modelLabels[row.model]) + "</th>";
      }
      return modelCell + "<th class='variant-cell' scope='row'>" + esc(variantLabels[row.variant]) + "</th>";
    }
    return "<th class='row-label-cell' scope='row'>" + esc(row.label) + "</th>";
  }

  function tableHtml(table) {
    var body = table.rows.map(function (row, index) {
      return "<tr>" + rowPrefix(table, row, index) + table.columns.map(function (column) { return cellHtml(table.cell(row, column)); }).join("") + "</tr>";
    }).join("");
    var leftHeader = table.rowKind === "modelVariant" ? "<th>模型</th><th>权重</th>" : "<th>" + (table.rowKind === "group" ? "严重度" : "权重") + "</th>";
    var header = "<tr>" + leftHeader + table.columns.map(function (column) { return "<th>" + columnHeader(column) + "</th>"; }).join("") + "</tr>";
    var leftWidth = table.rowKind === "modelVariant" ? 230 : 150;
    var minWidth = leftWidth + table.columns.length * 124;
    return "<article class='result-block' id='" + esc(table.id) + "'><div class='section-heading'><h2>" + esc(table.title) + "</h2><button type='button' data-download-table='" + esc(table.id) + "'>下载 CSV</button></div><div class='table-scroll'><table class='data-table matrix-table " + esc(table.rowKind) + "-table' style='min-width:" + minWidth + "px'><thead>" + header + "</thead><tbody>" + body + "</tbody></table></div>" + chartHtml(table) + "</article>";
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
    var scopeLabel = state.scope === "overall" ? "整体" : "辅助性";
    var groupLabel = { none: "不分组", model: "按模型", dataset: "按数据集" }[state.group];
    $("#result-head").innerHTML = "<h1>" + scopeLabel + " · " + groupLabel + "</h1>";
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
