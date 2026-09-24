(() => {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const fmtInt = (value) => (value === null || value === undefined ? "—" : new Intl.NumberFormat("zh-CN").format(value));
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

  const splitLabels = {
    train: "训练",
    dev: "验证",
    test: "疾病测试",
    control_eval: "健康测试",
    excluded_train: "排除"
  };
  const splitOrder = ["train", "dev", "test", "control_eval", "excluded_train"];
  const nativeOrder = { train: 0, validation: 1, dev: 1, test: 2, "无原始划分": 3 };
  const cohortLabels = { disease: "疾病组", control: "健康组" };
  const metricMeta = {
    wer: { label: "WER", direction: "lower", format: "percent" },
    cer: { label: "CER", direction: "lower", format: "percent" },
    ser: { label: "SER", direction: "lower", format: "percent" },
    semscore: { label: "SemScore", direction: "higher", format: "score" },
    exact_match_rate: { label: "完全匹配率", direction: "higher", format: "percent" },
    repetition_rate: { label: "重复率", direction: "lower", format: "percent3" },
    empty_output_rate: { label: "空输出率", direction: "lower", format: "percent3" },
    deviation_rate: { label: "任务偏移率", direction: "lower", format: "percent3" }
  };
  const metricOrder = ["wer", "cer", "ser", "semscore", "exact_match_rate", "repetition_rate", "empty_output_rate", "deviation_rate"];
  const editLabels = { substitutions: "替换 S", deletions: "删除 D", insertions: "插入 I" };

  // Standard, high-contrast semantic colors: blue = baseline, orange = adapted.
  // The edit composition uses a color-blind-friendly blue / vermillion / purple set.
  const RAMP_PHASE = { before: "#2563eb", after: "#f97316" };
  const SHORT_MODEL_LABELS = { phi4: "Phi-4", qwen25: "Qwen2.5", whisper: "Whisper" };
  const RAMP_EDITS = { substitutions: "#2563eb", deletions: "#dc2626", insertions: "#7c3aed" };

  const state = {
    page: "data",
    dataView: "overall",
    analysisView: "combined",
    cohortView: "all",
    singleMetric: "wer",
    singleModel: "qwen25",
    dataset: "ALL",
    selectedSpeaker: null,
    foldModel: "phi4",
    model: "phi4"
  };

  function metricValue(value, format) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
    if (format === "score") return Number(value).toFixed(3);
    if (format === "percent3") return `${(Number(value) * 100).toFixed(3)}%`;
    return `${(Number(value) * 100).toFixed(2)}%`;
  }

  function deltaText(record, meta) {
    if (!record || record.before === null || record.after === null) return "—";
    const delta = record.after - record.before;
    const sign = delta > 0 ? "+" : delta < 0 ? "−" : "±";
    const amount = Math.abs(delta);
    return meta.format === "score"
      ? `${sign}${amount.toFixed(3)}`
      : `${sign}${(amount * 100).toFixed(meta.format === "percent3" ? 3 : 2)} pp`;
  }

  function pair(record, meta) {
    return `${metricValue(record.before, meta.format)} → ${metricValue(record.after, meta.format)}`;
  }

  /* ---------- navigation ---------- */

  function setPage(page) {
    const valid = ["data", "analysis"].includes(page) ? page : "data";
    state.page = valid;
    $$("[data-page]").forEach((section) => {
      const pageMatch = section.dataset.page === valid;
      const viewMatch = valid !== "data" || !section.dataset.dataView || section.dataset.dataView === state.dataView;
      const analysisMatch = valid !== "analysis" || !section.dataset.analysisView || section.dataset.analysisView === state.analysisView;
      section.hidden = !(pageMatch && viewMatch && analysisMatch);
    });
    $$('[data-shell]').forEach((shell) => { shell.hidden = shell.dataset.shell !== valid; });
    $$("[data-page-link]").forEach((link) => {
      const active = link.dataset.pageLink === valid;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    const pageTitles = { data: "数据结果", analysis: "方法与分析" };
    document.title = `AudioBench · ${pageTitles[valid]}`;
  }

  function setDataView(view) {
    state.dataView = ["overall", "strata", "single", "layout"].includes(view) ? view : "overall";
    $$('[data-data-view]', $("#data-view-switcher")).forEach((button) => button.classList.toggle("active", button.dataset.dataView === state.dataView));
    setPage("data");
  }

  function setAnalysisView(view) {
    state.analysisView = ["combined", "single", "references", "deletion"].includes(view) ? view : "combined";
    $$('[data-analysis-view]', $("#analysis-view-switcher")).forEach((button) => button.classList.toggle("active", button.dataset.analysisView === state.analysisView));
    setPage("analysis");
  }

  function setCohortView(view) {
    state.cohortView = ["all", "disease", "health"].includes(view) ? view : "all";
    $$('[data-cohort-view]').forEach((button) => button.classList.toggle("active", button.dataset.cohortView === state.cohortView));
    $("#health-block").hidden = !["all", "health"].includes(state.cohortView);
    $("#disease-block").hidden = !["all", "disease"].includes(state.cohortView);
  }

  function initNavigation() {
    window.addEventListener("hashchange", () => setPage(location.hash.slice(1)));
    $$('[data-data-view]', $("#data-view-switcher")).forEach((button) => { button.onclick = () => setDataView(button.dataset.dataView); });
    $$('[data-analysis-view]', $("#analysis-view-switcher")).forEach((button) => { button.onclick = () => setAnalysisView(button.dataset.analysisView); });
    $$('[data-cohort-view]').forEach((button) => { button.onclick = () => setCohortView(button.dataset.cohortView); });
    setPage(location.hash.slice(1) || "data");
    setCohortView("disease");
  }

  /* ---------- method page ---------- */

  function renderHeadline() {
    $("#heading-speakers").textContent = fmtInt(data.meta.speaker_count);
    $("#heading-rows").textContent = fmtInt(data.meta.annotated_rows);
    $("#heading-train").textContent = fmtInt(data.meta.final_train_rows);
    $("#heading-test").textContent = fmtInt(data.meta.final_test_rows);
    $("#heading-control").textContent = fmtInt(data.meta.control_rows);
    $("#heading-paired").textContent = fmtInt(data.meta.control_paired_rows);
  }

  function dotClass(speaker) {
    return `sev-${String(speaker.severity_key || "unknown").replace(/[^a-z0-9-]/g, "-")}`;
  }

  function renderSeverityKey() {
    $("#severity-key").innerHTML = data.severity_scale.map((item) =>
      `<li><i class="dot sev-${item.key}"></i>${escapeHtml(item.label)}</li>`
    ).join("");
  }

  function renderDatasetFilter() {
    const items = [{ id: "ALL", label: "全部" }, ...data.datasets];
    $("#dataset-filter").innerHTML = items.map((item) =>
      `<button type="button" data-dataset="${item.id}" class="${state.dataset === item.id ? "active" : ""}">${escapeHtml(item.label)}</button>`
    ).join("");
    $$("[data-dataset]", $("#dataset-filter")).forEach((button) => {
      button.onclick = () => {
        state.dataset = button.dataset.dataset;
        state.selectedSpeaker = null;
        renderDatasetFilter();
        renderSpeakerMatrices();
        renderSpeakerDetail();
      };
    });
  }

  function speakerTitle(speaker) {
    return [
      `${speaker.dataset_label} ${speaker.speaker_id}`,
      `严重程度：${speaker.severity_label}`,
      `原始划分：${speaker.original_group}`,
      `本次划分：${splitLabels[speaker.primary_assignment] || speaker.primary_assignment}`,
      `${fmtInt(speaker.rows)} 条音频`
    ].join("\n");
  }

  function renderSpeakerDot(speaker) {
    const selected = state.selectedSpeaker
      && state.selectedSpeaker.dataset === speaker.dataset
      && state.selectedSpeaker.speaker_id === speaker.speaker_id;
    const title = speakerTitle(speaker);
    return `<button type="button" class="dot dot-button ${dotClass(speaker)}${selected ? " active" : ""}"`
      + ` data-speaker="${escapeHtml(`${speaker.dataset}::${speaker.speaker_id}`)}"`
      + ` title="${escapeHtml(title)}" aria-label="${escapeHtml(title.replaceAll("\n", "，"))}"></button>`;
  }

  // Every dataset draws the same split columns so the vertical rules line up
  // across the four matrices, even where a dataset contributes no speakers.
  function matrixSplits() {
    return splitOrder.filter((split) => data.speakers.some((speaker) => speaker.primary_assignment === split));
  }

  function renderSpeakerMatrices() {
    const datasets = state.dataset === "ALL" ? data.datasets : data.datasets.filter((item) => item.id === state.dataset);
    $("#speaker-matrices").innerHTML = datasets.map((dataset) => {
      const speakers = data.speakers.filter((speaker) => speaker.dataset === dataset.id);
      const groups = Array.from(new Set(speakers.map((speaker) => speaker.original_group)))
        .sort((a, b) => (nativeOrder[a] ?? 8) - (nativeOrder[b] ?? 8) || a.localeCompare(b));
      const usedSplits = matrixSplits();
      const header = ["原始划分", ...usedSplits.map((key) => splitLabels[key])]
        .map((label, index) => `<div class="matrix-cell matrix-head${index ? "" : " matrix-corner"}">${label}</div>`).join("");
      const rows = groups.map((group) => {
        const inRow = speakers.filter((speaker) => speaker.original_group === group);
        const label = `<div class="matrix-cell matrix-row-label">${escapeHtml(group)} <span>${inRow.length}</span></div>`;
        const cells = usedSplits.map((split) => {
          const members = inRow.filter((speaker) => speaker.primary_assignment === split)
            .sort((a, b) => (b.severity_rank ?? -1) - (a.severity_rank ?? -1) || a.speaker_id.localeCompare(b.speaker_id));
          return `<div class="matrix-cell matrix-dots">${members.map(renderSpeakerDot).join("")}</div>`;
        }).join("");
        return label + cells;
      }).join("");
      return `<section class="matrix-wrap">`
        + `<h3>${escapeHtml(dataset.label)} <span>${speakers.length} 人 · ${fmtInt(dataset.row_count)} 条</span></h3>`
        + `<div class="speaker-matrix" style="--cols:${usedSplits.length}">${header}${rows}</div></section>`;
    }).join("");
    $$("[data-speaker]", $("#speaker-matrices")).forEach((button) => {
      button.onclick = () => {
        const [dataset, speakerId] = button.dataset.speaker.split("::");
        state.selectedSpeaker = data.speakers.find((speaker) => speaker.dataset === dataset && speaker.speaker_id === speakerId);
        renderSpeakerMatrices();
        renderSpeakerDetail();
      };
    });
  }

  function listValues(values, labels = {}) {
    const entries = Object.entries(values).filter(([key]) => key !== "—");
    if (!entries.length) return "—";
    return entries.map(([key, count]) => `${escapeHtml(labels[key] || key)} ${fmtInt(count)}`).join("、");
  }

  function renderSpeakerDetail() {
    const speaker = state.selectedSpeaker;
    if (!speaker) {
      $("#speaker-detail").innerHTML = "";
      return;
    }
    $("#speaker-detail").innerHTML = `
      <h3><i class="dot ${dotClass(speaker)}"></i>${escapeHtml(speaker.dataset_label)} ${escapeHtml(speaker.speaker_id)}</h3>
      <table class="data-table key-value"><tbody>
        <tr><th>音频</th><td>${fmtInt(speaker.rows)}</td></tr>
        <tr><th>语言</th><td>${escapeHtml(speaker.language.toUpperCase())}</td></tr>
        <tr><th>严重程度</th><td>${escapeHtml(speaker.severity_label)}（${escapeHtml(speaker.severity_raw)}）</td></tr>
        <tr><th>原始划分</th><td>${listValues(speaker.native_splits)}</td></tr>
        <tr><th>block / part</th><td>${listValues(speaker.source_parts)}</td></tr>
        <tr><th>本次划分</th><td>${listValues(speaker.research_splits, splitLabels)}</td></tr>
        <tr><th>五折</th><td>${listValues(speaker.folds)}</td></tr>
      </tbody></table>`;
  }

  function renderDatasetTable() {
    const totals = { speaker_count: 0, row_count: 0, train: 0, dev: 0, test: 0, control_eval: 0, excluded_train: 0 };
    $("#dataset-table tbody").innerHTML = data.datasets.map((dataset) => {
      const s = dataset.research_splits;
      totals.speaker_count += dataset.speaker_count;
      totals.row_count += dataset.row_count;
      splitOrder.forEach((key) => { totals[key] += s[key] || 0; });
      return `<tr><td>${dataset.label}</td><td>${fmtInt(dataset.speaker_count)}</td><td>${fmtInt(dataset.row_count)}</td>`
        + splitOrder.map((key) => `<td>${fmtInt(s[key] || 0)}</td>`).join("") + "</tr>";
    }).join("");
    $("#dataset-table tfoot tr").innerHTML = `<th>合计</th><th>${fmtInt(totals.speaker_count)}</th><th>${fmtInt(totals.row_count)}</th>`
      + splitOrder.map((key) => `<th>${fmtInt(totals[key])}</th>`).join("");
  }

  function renderSeverityTable() {
    const scale = data.severity_scale;
    $("#severity-table thead tr").innerHTML = "<th>数据集</th>" + scale.map((item) =>
      `<th><i class="dot sev-${item.key}"></i>${escapeHtml(item.label)}</th>`).join("");
    $("#severity-table tbody").innerHTML = data.datasets.map((dataset) =>
      `<tr><td>${dataset.label}</td>` + scale.map((item) =>
        `<td>${dataset.severity_speakers[item.key] ? fmtInt(dataset.severity_speakers[item.key]) : "—"}</td>`).join("") + "</tr>"
    ).join("");
  }

  function renderSampling() {
    const total = data.method.draw_rows;
    $("#sampling-table tbody").innerHTML = data.datasets.map((dataset) => {
      const count = data.method.draws_by_dataset[dataset.id] || 0;
      return `<tr><td>${dataset.label}</td><td>${fmtInt(count)}</td><td>${(count / total * 100).toFixed(1)}%</td></tr>`;
    }).join("");
    $("#sampling-total").textContent = fmtInt(total);
  }

  function renderFoldTabs() {
    $$("[data-fold-model]", $("#fold-model-tabs")).forEach((button) => {
      button.classList.toggle("active", button.dataset.foldModel === state.foldModel);
      button.onclick = () => {
        state.foldModel = button.dataset.foldModel;
        renderFoldTabs();
        renderFolds();
      };
    });
  }

  function renderFolds() {
    $("#fold-table tbody").innerHTML = data.method.folds.map((fold) => {
      const run = fold.models[state.foldModel];
      return `<tr><td>${fold.fold}</td><td>${fmtInt(fold.train_rows)}</td><td>${fmtInt(fold.dev_rows)}</td>`
        + `<td>${fmtInt(fold.draw_rows)}</td><td>${fmtInt(run.global_step)}</td>`
        + `<td>${run.best_checkpoint_step ? fmtInt(run.best_checkpoint_step) : "—"}</td><td>${run.status}</td></tr>`;
    }).join("");
  }

  function renderRecipe() {
    const h = data.method.hyperparameters;
    const items = [
      ["峰值学习率", h.learning_rate.toExponential(0)],
      ["LoRA rank / alpha", `${h.lora_rank} / ${h.lora_alpha}`],
      ["LoRA dropout", h.lora_dropout.toFixed(2)],
      ["Weight decay", h.weight_decay.toFixed(2)],
      ["有效 batch", fmtInt(h.effective_batch_size)],
      ["Warmup", `${(h.warmup_ratio * 100).toFixed(0)}%`],
      ["学习率调度", h.lr_scheduler],
      ["精度 / attention", `${h.precision} / ${h.attention}`]
    ];
    $("#recipe-table tbody").innerHTML = items.map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`).join("");
    $("#final-table tbody").innerHTML = data.performance.map((model) => {
      const receipt = data.method.final_receipts[model.id];
      return `<tr><td>${model.label}</td><td>${fmtInt(receipt.global_step)}</td><td>${receipt.status}</td></tr>`;
    }).join("");
  }

  function initMethod() {
    renderHeadline();
    renderSeverityKey();
    renderDatasetFilter();
    renderSpeakerMatrices();
    renderSpeakerDetail();
    renderDatasetTable();
    renderSeverityTable();
    renderSampling();
    renderFoldTabs();
    renderFolds();
    renderRecipe();
  }

  /* ---------- performance page ---------- */

  function currentModel() {
    return data.performance.find((model) => model.id === state.model);
  }

  function cohortKeys(model) {
    return ["disease", "control"].filter((key) => model.cohorts[key]);
  }

  function orderedScopes(cohort) {
    return ["ALL", "cdsd", "easycall", "torgo", "uaspeech"].filter((key) => cohort.scopes[key]);
  }

  /* ---------- charts ---------- */

  // Square at the baseline, 4px rounded at the data end (the cap).
  function columnPath(x, baseline, width, height, radius = 4) {
    const h = Math.max(0, height);
    if (h <= radius) return `M${x},${baseline} v${-h} h${width} v${h} z`;
    return `M${x},${baseline} v${-(h - radius)}`
      + ` a${radius},${radius} 0 0 1 ${radius},${-radius}`
      + ` h${width - radius * 2}`
      + ` a${radius},${radius} 0 0 1 ${radius},${radius}`
      + ` v${h - radius} z`;
  }

  // Long category names ride two lines rather than overlapping their neighbours.
  function axisLabel(label, x, y) {
    const parts = String(label).split(" ");
    if (parts.length < 2) return `<text class="chart-label" x="${x}" y="${y}" text-anchor="middle">${escapeHtml(label)}</text>`;
    const head = parts.slice(0, -1).join(" ");
    return `<text class="chart-label" x="${x}" y="${y}" text-anchor="middle">${escapeHtml(head)}</text>`
      + `<text class="chart-label" x="${x}" y="${y + 12}" text-anchor="middle">${escapeHtml(parts[parts.length - 1])}</text>`;
  }

  function niceTicks(max) {
    const raw = max / 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((value) => value >= raw) || magnitude * 10;
    const ticks = [];
    for (let value = 0; value <= max + step / 2; value += step) ticks.push(value);
    return ticks;
  }

  // Axis ticks stay coarse; the exact values live on the bar tip and the table.
  function tickLabel(value, format) {
    if (format === "score") return Number(value).toFixed(2);
    return `${Math.round(Number(value) * 100)}%`;
  }

  function legend(items) {
    return `<ul class="chart-legend">` + items.map((item) =>
      `<li><i style="background:${item.color}"></i>${escapeHtml(item.label)}</li>`).join("") + `</ul>`;
  }

  const AXIS_WIDTH = 46;
  const PLOT_HEIGHT = 180;
  const TOP_PAD = 16;

  function yAxis(ticks, format, plotWidth) {
    const top = ticks[ticks.length - 1];
    return ticks.map((tick) => {
      const y = TOP_PAD + PLOT_HEIGHT - (tick / top) * PLOT_HEIGHT;
      return `<line class="chart-grid" x1="${AXIS_WIDTH}" y1="${y}" x2="${AXIS_WIDTH + plotWidth}" y2="${y}"></line>`
        + `<text class="chart-tick" x="${AXIS_WIDTH - 7}" y="${y + 3}" text-anchor="end">${tickLabel(tick, format)}</text>`;
    }).join("");
  }

  // Grouped columns: one measure, one axis, two phases per category.
  function groupedColumnChart(title, rows, format) {
    const usable = rows.filter((row) => row.before !== null || row.after !== null);
    if (!usable.length) return "";
    // Wider slots once there are many categories, so the axis labels never touch.
    const slot = usable.length > 5 ? 74 : 62;
    const columnWidth = 22;
    const twoLine = usable.some((row) => row.label.includes(" "));
    const labelBand = twoLine ? 34 : 22;
    const plotWidth = usable.length * slot;
    const width = AXIS_WIDTH + plotWidth + 10;
    const height = TOP_PAD + PLOT_HEIGHT + labelBand;
    const baseline = TOP_PAD + PLOT_HEIGHT;
    const max = Math.max(...usable.flatMap((row) => [row.before || 0, row.after || 0])) || 1;
    const ticks = niceTicks(max);
    const scale = (value) => (value / ticks[ticks.length - 1]) * PLOT_HEIGHT;

    const columns = usable.map((row, index) => {
      const centre = AXIS_WIDTH + index * slot + slot / 2;
      // 2px surface gap keeps the touching pair apart without a stroke.
      const left = centre - columnWidth - 1;
      const phases = [["before", "微调前", row.before, left], ["after", "微调后", row.after, centre + 1]];
      const marks = phases.map(([key, phaseLabel, value, x]) => {
        if (value === null || value === undefined) return "";
        return `<path d="${columnPath(x, baseline, columnWidth, scale(value))}" fill="${RAMP_PHASE[key]}">`
          + `<title>${escapeHtml(row.label)} ${phaseLabel} ${metricValue(value, format)}</title></path>`;
      }).join("");
      // A value label is wider than a 22px column and would sit over its
      // neighbour, so the grouped charts let the axis, the tooltip and the
      // table carry the numbers instead.
      return marks + axisLabel(row.label, centre, baseline + 14);
    }).join("");

    return `<figure class="chart"><figcaption>${escapeHtml(title)}</figcaption>`
      + legend([{ color: RAMP_PHASE.before, label: "微调前" }, { color: RAMP_PHASE.after, label: "微调后" }])
      + `<svg viewBox="0 0 ${width} ${height}" style="max-width:${width}px" role="img" aria-label="${escapeHtml(title)}">`
      + yAxis(ticks, format, plotWidth)
      + `<line class="chart-axis" x1="${AXIS_WIDTH}" y1="${baseline}" x2="${AXIS_WIDTH + plotWidth}" y2="${baseline}"></line>`
      + `${columns}</svg></figure>`;
  }

  // Stacked columns: S/D/I as a share of the reference words, before vs after.
  function editCompositionChart(scope) {
    const edits = scope.edits;
    if (!edits) return "";
    const keys = ["substitutions", "deletions", "insertions"];
    const phases = [["before", "微调前"], ["after", "微调后"]];
    if (phases.every(([phase]) => keys.every((key) => edits[key]?.[`${phase}_rate`] == null))) return "";
    const slot = 92;
    const columnWidth = 34;
    const plotWidth = phases.length * slot;
    const width = AXIS_WIDTH + plotWidth + 10;
    const labelBand = 22;
    const height = TOP_PAD + PLOT_HEIGHT + labelBand;
    const baseline = TOP_PAD + PLOT_HEIGHT;
    const totals = phases.map(([phase]) => keys.reduce((sum, key) => sum + (edits[key]?.[`${phase}_rate`] || 0), 0));
    const ticks = niceTicks(Math.max(...totals) || 1);
    const scale = (value) => (value / ticks[ticks.length - 1]) * PLOT_HEIGHT;

    const columns = phases.map(([phase, phaseLabel], index) => {
      const centre = AXIS_WIDTH + index * slot + slot / 2;
      const x = centre - columnWidth / 2;
      let cursor = 0;
      const segments = keys.map((key, segmentIndex) => {
        const value = edits[key]?.[`${phase}_rate`];
        if (value === null || value === undefined) return "";
        const bottom = baseline - scale(cursor);
        cursor += value;
        // 2px surface gap between touching segments; only the top keeps the cap.
        const rawHeight = scale(value) - (segmentIndex < keys.length - 1 ? 2 : 0);
        const shape = segmentIndex === keys.length - 1
          ? columnPath(x, bottom, columnWidth, rawHeight)
          : `M${x},${bottom} v${-Math.max(0, rawHeight)} h${columnWidth} v${Math.max(0, rawHeight)} z`;
        return `<path d="${shape}" fill="${RAMP_EDITS[key]}">`
          + `<title>${phaseLabel} ${editLabels[key]} ${metricValue(value, "percent")}</title></path>`;
      }).join("");
      return segments
        + `<text class="chart-value" x="${centre}" y="${baseline - scale(totals[index]) - 5}" text-anchor="middle">${metricValue(totals[index], "percent")}</text>`
        + `<text class="chart-label" x="${centre}" y="${baseline + 14}" text-anchor="middle">${phaseLabel}</text>`;
    }).join("");

    return `<figure class="chart"><figcaption>WER 编辑构成（占参考词）</figcaption>`
      + legend(keys.map((key) => ({ color: RAMP_EDITS[key], label: editLabels[key] })))
      + `<svg viewBox="0 0 ${width} ${height}" style="max-width:${width}px" role="img" aria-label="WER 编辑构成">`
      + yAxis(ticks, "percent", plotWidth)
      + `<line class="chart-axis" x1="${AXIS_WIDTH}" y1="${baseline}" x2="${AXIS_WIDTH + plotWidth}" y2="${baseline}"></line>`
      + `${columns}</svg></figure>`;
  }

  function metricTable(scope) {
    const rows = metricOrder.map((key) => {
      const meta = metricMeta[key];
      const record = scope[key];
      return `<tr><td>${meta.label}</td><td>${metricValue(record.before, meta.format)}</td>`
        + `<td>${metricValue(record.after, meta.format)}</td><td>${deltaText(record, meta)}</td></tr>`;
    }).join("");
    return `<table class="data-table"><thead><tr><th>指标</th><th>微调前</th><th>微调后</th><th>变化</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function editsTable(scope) {
    const edits = scope.edits || {};
    const reference = edits.reference_tokens || {};
    const rows = Object.entries(editLabels).map(([key, label]) => {
      const item = edits[key] || {};
      const delta = item.delta === null || item.delta === undefined
        ? "—"
        : `${item.delta > 0 ? "+" : item.delta < 0 ? "−" : "±"}${fmtInt(Math.abs(item.delta))}`;
      return `<tr><td>${label}</td><td>${fmtInt(item.before)}</td><td>${metricValue(item.before_rate, "percent")}</td>`
        + `<td>${fmtInt(item.after)}</td><td>${metricValue(item.after_rate, "percent")}</td><td>${delta}</td></tr>`;
    }).join("");
    return `<table class="data-table">`
      + `<thead><tr><th rowspan="2">WER 编辑</th><th colspan="2">微调前</th><th colspan="2">微调后</th><th rowspan="2">计数变化</th></tr>`
      + `<tr><th>计数</th><th>占参考词</th><th>计数</th><th>占参考词</th></tr></thead>`
      + `<tbody>${rows}</tbody>`
      + `<tfoot><tr><th>参考词</th><th colspan="2">${fmtInt(reference.before)}</th><th colspan="2">${fmtInt(reference.after)}</th><th></th></tr></tfoot>`
      + `</table>`;
  }

  function scopeRowsTable(cohort, caption) {
    const rows = orderedScopes(cohort).map((key) => {
      const row = cohort.scopes[key];
      return `<tr><td>${escapeHtml(row.label)}</td><td>${fmtInt(row.n)}</td>`
        + ["wer", "cer", "ser", "semscore", "exact_match_rate"].map((metric) =>
          `<td>${pair(row[metric], metricMeta[metric])}</td>`).join("")
        + ["substitutions", "deletions", "insertions"].map((key2) => {
          const item = row.edits?.[key2] || {};
          return `<td>${metricValue(item.before_rate, "percent")} → ${metricValue(item.after_rate, "percent")}</td>`;
        }).join("") + "</tr>";
    }).join("");
    return `<table class="data-table"><caption>${caption}</caption>`
      + `<thead><tr><th>数据集</th><th>N</th><th>WER</th><th>CER</th><th>SER</th><th>SemScore</th><th>完全匹配率</th><th>S 率</th><th>D 率</th><th>I 率</th></tr></thead>`
      + `<tbody>${rows}</tbody></table>`;
  }

  function severityTable(cohort, caption) {
    const rows = orderedScopes(cohort)
      .filter((key) => key !== "ALL" && (cohort.scopes[key].severities || []).length > 1)
      .flatMap((key) => cohort.scopes[key].severities.map((item) =>
        `<tr><td>${escapeHtml(cohort.scopes[key].label)}</td>`
        + `<td><i class="dot sev-${item.key}"></i>${escapeHtml(item.label)}</td><td>${escapeHtml(item.raw)}</td><td>${fmtInt(item.n)}</td>`
        + ["wer", "cer", "ser", "semscore", "exact_match_rate"].map((metric) =>
          `<td>${pair(item[metric], metricMeta[metric])}</td>`).join("")
        + ["substitutions", "deletions", "insertions"].map((edit) => {
          const record = item.edits?.[edit] || {};
          return `<td>${metricValue(record.before_rate, "percent")} → ${metricValue(record.after_rate, "percent")}</td>`;
        }).join("") + "</tr>"))
      .join("");
    if (!rows) return "";
    return `<table class="data-table"><caption>${caption}</caption>`
      + `<thead><tr><th>数据集</th><th>严重程度</th><th>原始标签</th><th>N</th><th>WER</th><th>CER</th><th>SER</th><th>SemScore</th><th>完全匹配率</th><th>S 率</th><th>D 率</th><th>I 率</th></tr></thead>`
      + `<tbody>${rows}</tbody></table>`;
  }

  // Only cohorts with landed inference are rendered; the healthy cohort appears
  // by itself once control_baseline_vs_finetuned.csv exists.
  function renderCohortSections() {
    const model = currentModel();
    $("#cohort-sections").innerHTML = ["disease", "control"].filter((key) => model.cohorts[key]).map((key) => {
      const cohort = model.cohorts[key];
      const scope = cohort.scopes.ALL;
      const datasetRows = orderedScopes(cohort).filter((name) => name !== "ALL").map((name) => ({
        label: cohort.scopes[name].label,
        before: cohort.scopes[name].wer.before,
        after: cohort.scopes[name].wer.after
      }));
      const severityRows = orderedScopes(cohort)
        .filter((name) => name !== "ALL" && (cohort.scopes[name].severities || []).length > 1)
        .flatMap((name) => cohort.scopes[name].severities.map((item) => ({
          label: `${cohort.scopes[name].label} ${item.label}`,
          before: item.wer.before,
          after: item.wer.after
        })));
      return `<section class="cohort" aria-label="${cohortLabels[key]}">`
        + `<div class="section-title"><h3>${cohortLabels[key]} · ${escapeHtml(currentModel().label)}</h3><span>N = ${fmtInt(scope.n)}</span></div>`
        + `<div class="columns"><div class="table-scroll">${metricTable(scope)}</div>`
        + `${editCompositionChart(scope)}</div>`
        + `<div class="table-scroll">${editsTable(scope)}</div>`
        + groupedColumnChart("按数据集 WER", datasetRows, "percent")
        + `<div class="table-scroll">${scopeRowsTable(cohort, "按数据集（微调前 → 微调后）")}</div>`
        + groupedColumnChart("按严重程度 WER", severityRows, "percent")
        + `<div class="table-scroll">${severityTable(cohort, "按严重程度（微调前 → 微调后）")}</div>`
        + `</section>`;
    }).join("");
  }

  function renderAllModels() {
    const keys = ["disease", "control"].filter((key) => data.performance.some((model) => model.cohorts[key]));
    $("#all-models").innerHTML = keys.map((key) => {
      const present = data.performance.filter((model) => model.cohorts[key]);
      const rows = present.map((model) => {
        const row = model.cohorts[key].scopes.ALL;
        return `<tr><td>${model.label}</td><td>${fmtInt(row.n)}</td>`
          + ["wer", "cer", "ser", "semscore", "exact_match_rate"].map((metric) =>
            `<td>${pair(row[metric], metricMeta[metric])}</td>`).join("")
          + ["substitutions", "deletions", "insertions"].map((edit) => {
            const item = row.edits?.[edit] || {};
            return `<td>${metricValue(item.before_rate, "percent")} → ${metricValue(item.after_rate, "percent")}</td>`;
          }).join("") + "</tr>";
      }).join("");
      const chartRows = present.map((model) => ({
        label: SHORT_MODEL_LABELS[model.id] || model.label,
        before: model.cohorts[key].scopes.ALL.wer.before,
        after: model.cohorts[key].scopes.ALL.wer.after
      }));
      return `<div class="table-scroll"><table class="data-table"><caption>${cohortLabels[key]}（全部测试集，微调前 → 微调后）</caption>`
        + `<thead><tr><th>模型</th><th>N</th><th>WER</th><th>CER</th><th>SER</th><th>SemScore</th><th>完全匹配率</th><th>S 率</th><th>D 率</th><th>I 率</th></tr></thead>`
        + `<tbody>${rows}</tbody></table></div>`
        + groupedColumnChart(`${cohortLabels[key]} 全部测试集 WER`, chartRows, "percent");
    }).join("");
  }

  function renderModelSelector() {
    $("#model-selector").innerHTML = data.performance.map((model) =>
      `<button type="button" data-model="${model.id}" class="${model.id === state.model ? "active" : ""}">${escapeHtml(model.label)}</button>`
    ).join("");
    $$("[data-model]", $("#model-selector")).forEach((button) => {
      button.onclick = () => {
        state.model = button.dataset.model;
        renderPerformance();
      };
    });
  }

  function downloadCsv() {
    const header = ["model", "cohort", "scope", "group", "n"];
    metricOrder.forEach((metric) => header.push(`${metric}_before`, `${metric}_after`));
    ["substitutions", "deletions", "insertions"].forEach((edit) => header.push(`${edit}_before`, `${edit}_after`));
    header.push("reference_tokens_before", "reference_tokens_after");
    const rows = [];
    data.performance.forEach((model) => {
      cohortKeys(model).forEach((cohortKey) => {
        const cohort = model.cohorts[cohortKey];
        orderedScopes(cohort).forEach((scopeKey) => {
          const scope = cohort.scopes[scopeKey];
          const emit = (group, record) => {
            const line = [model.label, cohortKey, scopeKey, group, record.n];
            metricOrder.forEach((metric) => line.push(record[metric].before, record[metric].after));
            ["substitutions", "deletions", "insertions"].forEach((edit) => {
              line.push(record.edits?.[edit]?.before, record.edits?.[edit]?.after);
            });
            line.push(record.edits?.reference_tokens?.before, record.edits?.reference_tokens?.after);
            rows.push(line);
          };
          emit("overall", scope);
          (scope.severities || []).forEach((item) => emit(`severity=${item.raw}`, item));
        });
      });
    });
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "audiobench-finetune-metrics.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function renderPerformance() {
    renderModelSelector();
    renderCohortSections();
    renderAllModels();
  }

  function renderBaselineOnlyModels() {
    const root = $("#baseline-only-models");
    if (!root || !window.SUPPLEMENT_DATA?.baseline) return;
    const modelNames = { qwen25: "Qwen2.5", qwen3: "Qwen3", phi4: "Phi-4", whisper: "Whisper", step_audio: "Step-Audio" };
    const datasets = ["CDSD", "EasyCall", "TORGO", "UASpeech"];
    const rows = ["qwen25", "qwen3", "phi4", "whisper", "step_audio"].map((model) => {
      const cells = datasets.map((dataset) => {
        const item = window.SUPPLEMENT_DATA.baseline.find((row) => row.model === model && row.dataset === dataset);
        const hasCombined = ["qwen25", "phi4", "whisper"].includes(model);
        return `<td><b>${metricValue(item?.wer, "percent")}</b><small>基线</small><em>${hasCombined ? "组合微调后见下方" : "组合微调后：待补"}</em></td>`;
      }).join("");
      return `<tr><th>${modelNames[model]}</th>${cells}</tr>`;
    }).join("");
    root.innerHTML = `<div class="table-scroll"><table class="data-table baseline-matrix"><thead><tr><th>模型 \\ 数据集</th>${datasets.map((dataset) => `<th>${dataset}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function initPerformance() {
    $("#download-csv").onclick = downloadCsv;
    renderBaselineOnlyModels();
    renderPerformance();
  }

  /* ---------- supplemental result pages ---------- */

  const supplement = window.SUPPLEMENT_DATA;
  const supModelLabels = { phi4: "Phi-4", qwen25: "Qwen2.5", whisper: "Whisper", step_audio: "Step-Audio" };
  const supDatasetLabels = { cdsd: "CDSD", easycall: "EasyCall", torgo: "TORGO", uaspeech: "UA-Speech", ALL: "全部" };
  const supFmt = (v, kind = "percent") => v == null || Number.isNaN(Number(v)) ? "—" : kind === "score" ? Number(v).toFixed(3) : `${(Number(v) * 100).toFixed(2)}%`;
  const supInt = (v) => v == null ? "—" : new Intl.NumberFormat("zh-CN").format(v);
  const supBar = (value, max, cls = "after") => value == null ? "<span class=\"empty-bar\">待补</span>" : `<span class="sup-bar ${cls}" style="width:${Math.max(1, Math.min(100, Number(value) / max * 100))}%"></span>`;
  const supCompareChart = (title, rows, key, format = "percent") => {
    return groupedColumnChart(title, rows, format);
  };

  const supMetricTable = (rows, names = ["WER", "CER", "SER", "SemScore", "完全匹配率"]) => `<div class="table-scroll"><table class="data-table compact"><thead><tr><th>标签 / 范围</th><th>N</th>${names.map((n) => `<th>${n}（前 → 后）</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr><td>${escapeHtml(r.label)}</td><td>${supInt(r.n)}</td><td>${supFmt(r.wer_before)} → ${supFmt(r.wer_after)}</td><td>${supFmt(r.cer_before)} → ${supFmt(r.cer_after)}</td><td>${supFmt(r.ser_before)} → ${supFmt(r.ser_after)}</td><td>${supFmt(r.sem_before, "score")} → ${supFmt(r.sem_after, "score")}</td>${r.exact_before === undefined ? "" : `<td>${supFmt(r.exact_before)} → ${supFmt(r.exact_after)}</td>`}</tr>`).join("")}</tbody></table></div>`;

  function supTabs(id, items, selected, onClick) {
    const root = $(`#${id}`); if (!root) return;
    root.innerHTML = items.map((item) => `<button type="button" class="${item.id === selected ? "active" : ""}" data-sup-tab="${item.id}">${escapeHtml(item.label)}</button>`).join("");
    $$(`[data-sup-tab]`, root).forEach((button) => { button.onclick = () => onClick(button.dataset.supTab); });
  }

  const supState = { model: "qwen25", healthDimension: "language" };
  function renderHealthSupplement() {
    const h = supplement.health;
    supTabs("health-model-tabs", Object.keys(supModelLabels).filter((id) => id !== "step_audio").map((id) => ({ id, label: supModelLabels[id] })), supState.model, (id) => { supState.model = id; renderSupplements(); });
    const full = h.full[supState.model], aligned = h.aligned[supState.model];
    const summaryRows = [{ label: "健康组 · 完整队列", n: full?.result_count, wer_before: aligned?.baseline_wer, wer_after: full?.wer, cer_before: aligned?.baseline_cer, cer_after: full?.cer, ser_before: aligned?.baseline_ser, ser_after: full?.ser, sem_before: aligned?.baseline_semscore, sem_after: full?.semscore, exact_before: aligned?.baseline_exact_match_rate, exact_after: full?.exact_match_rate }];
    $("#health-summary").innerHTML = `<div class="callout"><b>${supModelLabels[supState.model]}</b>：完整健康队列 N=${supInt(full?.result_count)}；前后可对齐子集 N=${supInt(aligned?.result_count)}。完整队列的微调后指标与对齐子集的前后变化分开标注。</div>` + supMetricTable(summaryRows, ["WER", "CER", "SER", "SemScore"]);
    const datasetRows = h.by_dataset.filter((r) => r.model === supState.model).map((r) => ({ label: supDatasetLabels[r.dataset], before: null, after: r.wer }));
    $("#health-dataset-chart").innerHTML = supCompareChart("健康组：按数据集微调后 WER（完整队列）", datasetRows, "wer") + `<div class="table-scroll"><table class="data-table compact"><thead><tr><th>数据集</th><th>N</th><th>WER</th><th>CER</th><th>SER</th><th>SemScore</th></tr></thead><tbody>${h.by_dataset.filter((r) => r.model === supState.model).map((r) => `<tr><td>${supDatasetLabels[r.dataset]}</td><td>${supInt(r.n)}</td><td>${supFmt(r.wer)}</td><td>${supFmt(r.cer)}</td><td>${supFmt(r.ser)}</td><td>${supFmt(r.semscore, "score")}</td></tr>`).join("")}</tbody></table></div>`;
    const dimensions = ["language", "microphone", "gender", "native_split", "severity", "session"];
    const selected = h.labels.filter((r) => r.model === supState.model && r.dimension === supState.healthDimension && r.scope === "ALL");
    $("#health-label-section").innerHTML = `<div class="text-tabs label-tabs">${dimensions.map((d) => `<button type="button" class="${d === supState.healthDimension ? "active" : ""}" data-health-dimension="${d}">${d}</button>`).join("")}</div>`
      + `<p class="note">健康组标签维度：${supState.healthDimension}；前后比较均为 N=13,474 可对齐健康样本，标签缺失不填 0。</p>`
      + supMetricTable(selected.map((r) => ({ ...r, label: r.label })))
      + supCompareChart(`健康组 ${supState.healthDimension}：WER`, selected.map((r) => ({ label: r.label, before: r.wer_before, after: r.wer_after })), "wer")
      + supCompareChart(`健康组 ${supState.healthDimension}：CER`, selected.map((r) => ({ label: r.label, before: r.cer_before, after: r.cer_after })), "cer")
      + supCompareChart(`健康组 ${supState.healthDimension}：SER`, selected.map((r) => ({ label: r.label, before: r.ser_before, after: r.ser_after })), "ser")
      + supCompareChart(`健康组 ${supState.healthDimension}：SemScore`, selected.map((r) => ({ label: r.label, before: r.sem_before, after: r.sem_after })), "sem", "score")
      + supCompareChart(`健康组 ${supState.healthDimension}：完全匹配率`, selected.map((r) => ({ label: r.label, before: r.exact_before, after: r.exact_after })), "exact");
    $$('[data-health-dimension]').forEach((b) => { b.onclick = () => { supState.healthDimension = b.dataset.healthDimension; renderSupplements(); }; });
  }

  function renderDiseaseSupplement() {
    supTabs("disease-model-tabs", ["qwen25", "phi4", "whisper"].map((id) => ({ id, label: supModelLabels[id] })), supState.model, (id) => { supState.model = id; renderSupplements(); });
    const rows = supplement.labels.filter((r) => r.model === supState.model).map((r) => ({ ...r, label: `${supDatasetLabels[r.dataset]} · ${r.label}` }));
    $("#disease-label-section").innerHTML = supMetricTable(rows) + supCompareChart("疾病组按标签 WER", rows.map((r) => ({ label: r.label, before: r.wer_before, after: r.wer_after })), "wer") + supCompareChart("疾病组按标签 CER", rows.map((r) => ({ label: r.label, before: r.cer_before, after: r.cer_after })), "cer") + supCompareChart("疾病组按标签 SER", rows.map((r) => ({ label: r.label, before: r.ser_before, after: r.ser_after })), "ser") + supCompareChart("疾病组按标签 SemScore", rows.map((r) => ({ label: r.label, before: r.sem_before, after: r.sem_after })), "sem", "score") + supCompareChart("疾病组按标签 完全匹配率", rows.map((r) => ({ label: r.label, before: r.exact_before, after: r.exact_after })), "exact");
  }

  function renderDeletionSupplement() {
    const overall = supplement.deletion.summary.filter((r) => r.scope === "ALL");
    $("#deletion-section").innerHTML = supCompareChart("D/总错误占比", overall.map((r) => ({ label: r.model_name, before: r.before.d_share, after: r.after.d_share })), "share") + `<div class="table-scroll"><table class="data-table compact"><thead><tr><th>模型</th><th>D 绝对数（前 → 后）</th><th>D/参考词（前 → 后）</th><th>D/总错误（前 → 后）</th><th>字符 D 变化</th></tr></thead><tbody>${overall.map((r) => `<tr><td>${r.model_name}</td><td>${supInt(r.before.d)} → ${supInt(r.after.d)}</td><td>${supFmt(r.before.d / (r.n || 1))} → ${supFmt(r.after.d / (r.n || 1))}</td><td>${supFmt(r.before.d_share)} → ${supFmt(r.after.d_share)}</td><td>${r.char_d_delta > 0 ? "+" : ""}${supInt(r.char_d_delta)}</td></tr>`).join("")}</tbody></table></div>` + supCompareChart("D 增加样本中：输出变短的正增量占比", supplement.deletion.mechanisms.map((r) => ({ label: r.model_name, before: 0, after: r.shorter_share })), "share");
  }

  function renderSingleDatasetSupplement() {
    const s = supplement.single_dataset; $("#single-dataset-note").textContent = `${s.note} 当前 adapter ${s.adapter_complete}/${s.expected}，完整预测 ${s.prediction_complete}/${s.expected}，指标 ${s.metric_complete}/${s.expected}。`;
    supTabs("single-model-filter", ["qwen25", "whisper", "phi4", "step_audio"].map((id) => ({ id, label: supModelLabels[id] })), state.singleModel, (id) => { state.singleModel = id; renderSingleDatasetSupplement(); });
    $$('[data-single-metric]').forEach((button) => { button.classList.toggle("active", button.dataset.singleMetric === state.singleMetric); button.onclick = () => { state.singleMetric = button.dataset.singleMetric; renderSingleDatasetSupplement(); }; });
    const metric = state.singleMetric;
    const format = metric === "semscore" ? "score" : "percent";
    const metricLabel = { wer: "WER", cer: "CER", ser: "SER", semscore: "SemScore", s_rate: "S / 参考词", d_rate: "D / 参考词", i_rate: "I / 参考词" }[metric];
    const chartRows = ["cdsd", "easycall", "torgo", "uaspeech"].map((ds) => { const c = s.cells.find((x) => x.model === state.singleModel && x.train_dataset === ds); return { label: supDatasetLabels[ds], before: null, after: c?.[metric] }; });
    $("#single-dataset-chart").innerHTML = groupedColumnChart(`${supModelLabels[state.singleModel]}：按训练数据集比较 ${metricLabel}`, chartRows, format) || `<div class="empty-state"><b>${supModelLabels[state.singleModel]} 的该指标尚未完成</b><span>矩阵中的待补位置会在结果产出后直接更新。</span></div>`;
    const byModel = ["qwen25", "whisper", "phi4", "step_audio"].map((model) => `<tr><th>${supModelLabels[model]}</th>${["cdsd", "easycall", "torgo", "uaspeech"].map((ds) => { const c = s.cells.find((x) => x.model === model && x.train_dataset === ds); return `<td class="status-cell ${c.metric_status}"><b>${c.metric_status === "complete" ? metricValue(c[metric], format) : "待补"}</b><small>${c.status}</small></td>`; }).join("")}</tr>`).join("");
    $("#single-dataset-section").innerHTML = `<div class="matrix-key"><span class="complete">指标已完成</span><span class="pending">占位</span></div><div class="table-scroll"><table class="data-table single-matrix"><thead><tr><th>模型 \\ 训练集</th><th>CDSD</th><th>EasyCall</th><th>TORGO</th><th>UA-Speech</th></tr></thead><tbody>${byModel}</tbody></table></div>`;
  }

  function renderSupplements() { renderHealthSupplement(); renderDiseaseSupplement(); renderDeletionSupplement(); renderSingleDatasetSupplement(); }

  renderSupplements();

  initNavigation();
  initMethod();
  initPerformance();
})();
