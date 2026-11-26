(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const data = window.AUDIOBENCH_MATRIX_DATA;
  if (!data || data.schema_version !== 'audiobench.matrix_site.v1') {
    $('#error').hidden = false;
    return;
  }

  const models = new Map(data.models.map(item => [item.id, item.label]));
  const datasets = new Map(data.datasets.map(item => [item.id, item.label]));
  const variants = new Map(data.variants.map(item => [item.id, item]));
  const variantLabel = id => {
    const variant = variants.get(id);
    if (!variant.train_dataset) return variant.label;
    const dataset = datasets.get(variant.train_dataset);
    if (variant.method === 'full_recording') return `${dataset} · 整段微调`;
    return ['germanpd', 'pc_gita'].includes(id) ? `${dataset} · 切段微调` : variant.label;
  };
  const cohorts = { disease: '疾病组', healthy: '健康组' };
  const statuses = { complete: '已评测', not_evaluated: '未评测', not_applicable: '不适用', running: '进行中' };
  const metrics = { wer: 'WER', semscore: 'SemScore' };
  const stages = [
    { id: 'baseline', label: '原始', name: '原始权重' },
    { id: 'segmented', label: '切段', name: '切段微调' },
    { id: 'full', label: '整段', name: '整段微调' },
  ];
  const form = $('#filters');
  const focusForm = $('#focus-form');
  const defaults = { scope: 'overall', model: 'all', dataset: 'all', variant: 'all', cohort: 'disease', dimension: 'overall', group: 'all', domain: 'all', change: 'all', status: 'complete' };
  const sortDefault = { field: '', direction: 1 };
  const pageSize = 20;
  let page = 0;
  let sort = { ...sortDefault };
  let filtered = [];
  let visible = [];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, token => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[token]);
  const integer = n => Number.isFinite(n) ? n.toLocaleString('zh-CN') : '—';
  const valueText = (metric, value) => Number.isFinite(value) ? (metric === 'wer' ? `${(100 * value).toFixed(2)}%` : value.toFixed(4)) : '—';
  const relativeText = value => Number.isFinite(value) ? `${value > 0 ? '+' : value < 0 ? '−' : ''}${(100 * Math.abs(value)).toFixed(2)}%` : '—';
  const key = (...values) => values.join('/');
  const overall = data.overall.records;
  const overallIndex = new Map(overall.map(row => [key(row.model, row.variant, row.dataset, row.cohort), row]));
  const severity = data.overall.dataset_records;
  const assistive = data.assistive.records.map(row => {
    if (row.dimension !== 'dataset') return row;
    const [dataset, group] = row.group.split('::');
    const datasetId = data.datasets.find(item => item.label === dataset)?.id;
    return { ...row, dataset: datasetId, group };
  });
  const fullMatched = overall.filter(row => row.comparison_protocol === '261117_matched');
  const matched = fullMatched.flatMap(row => stages.map(stage => {
    if (stage.id === 'full') return { ...row, stage: stage.id };
    const pair = row[`comparison_${stage.id}`];
    const baseline = row.comparison_baseline;
    return {
      ...row, ...pair, stage: stage.id,
      variant: stage.id === 'baseline' ? 'original' : variants.get(row.variant).train_dataset,
      relative: {
        wer: baseline.wer ? (baseline.wer - pair.wer) / baseline.wer : null,
        semscore: baseline.semscore ? (pair.semscore - baseline.semscore) / baseline.semscore : null,
      },
    };
  }));
  const rowsByScope = { overall, severity, assistive, matched };

  function options(select, items, fallback) {
    const value = select.value;
    select.replaceChildren(...items.map(([id, label]) => new Option(label, id)));
    select.value = items.some(([id]) => id === value) ? value : fallback;
  }

  const variantOptions = data.variants.map(item => [item.id, variantLabel(item.id)]);
  options(form.elements.model, [['all', '全部模型'], ...models], 'all');
  options(form.elements.dataset, [['all', '全部数据集'], ...datasets], 'all');
  options(form.elements.variant, [['all', '全部权重'], ...variantOptions], 'all');
  form.elements.scope.add(new Option('261117 整段对照', 'matched'));
  options($('#coverage-model'), [['all', '全部模型'], ...models], 'all');
  const focusDatasetIds = [...new Set(fullMatched.map(row => row.dataset))];
  options(focusForm.elements.dataset, focusDatasetIds.map(id => [id, datasets.get(id)]), focusDatasetIds[0]);

  function renderStats() {
    const complete = overall.filter(row => row.status === 'complete').length;
    const stats = [
      [models.size, '模型', '原始与微调均可筛选'],
      [datasets.size, '评测数据集', `${data.datasets.filter(item => item.healthy).length} 个带健康对照`],
      [variants.size, '权重设置', '含原始、切段与整段微调'],
      [complete, '已评测组合', `整体矩阵共 ${integer(overall.length)} 格`],
    ];
    $('#stats').innerHTML = stats.map(([value, label, detail]) => `<div class="stat"><div><strong>${integer(value)}</strong> <span>${esc(label)}</span></div><small>${esc(detail)}</small></div>`).join('');
  }

  function renderFocus() {
    const { dataset, cohort, metric } = Object.fromEntries(new FormData(focusForm));
    const comparison = fullMatched.filter(row => row.dataset === dataset && row.cohort === cohort);
    const byModel = new Map(comparison.map(row => [row.model, row]));
    const maxValue = Math.max(1, ...comparison.flatMap(row => [row[metric], row.comparison_baseline[metric], row.comparison_segmented[metric]]));
    const step = metric === 'wer' ? Math.ceil(maxValue) / 4 : 0.25;
    const axis = Array.from({ length: 5 }, (_, index) => metric === 'wer' ? `${Math.round(index * step * 100)}%` : (index * step).toFixed(2));
    $('#chart').innerHTML = `<div class="chart-axis" aria-hidden="true"><span></span><div>${axis.map(tick => `<span>${tick}</span>`).join('')}</div><span></span></div>` + data.models.map(({ id, label }) => {
      const row = byModel.get(id);
      if (!row) return `<div class="chart-row"><strong>${esc(label)}</strong><p>暂无同口径结果</p></div>`;
      const series = [row.comparison_baseline[metric], row.comparison_segmented[metric], row[metric]];
      return `<div class="chart-row"><strong>${esc(label)}</strong><div class="chart-bars">${series.map((value, index) => {
        const stage = stages[index];
        return `<div class="bar-line"><div class="bar-track" aria-hidden="true"><i class="${stage.id}" style="--bar-width:${Math.max(0, value) / (4 * step) * 100}%"></i></div><span class="bar-value"><span class="visually-hidden">${stage.label} ${metrics[metric]} </span>${valueText(metric, value)}</span></div>`;
      }).join('')}</div></div>`;
    }).join('');
    const n = comparison[0]?.n;
    const lowerWer = comparison.filter(row => row.wer < row.comparison_segmented.wer).length;
    const higherSem = comparison.filter(row => row.semscore > row.comparison_segmented.semscore).length;
    const conflict = comparison.filter(row => row.wer < row.comparison_segmented.wer && row.semscore < row.comparison_segmented.semscore);
    $('#focus-cohort').textContent = `${datasets.get(dataset)} / ${cohorts[cohort]}`;
    $('#focus-summary').innerHTML = `<p class="sample-count">每个模型评测 ${integer(n)} 条完整录音</p>
      <dl><div><dt>WER 降低</dt><dd>${lowerWer}<small> / ${comparison.length}</small></dd></div><div><dt>SemScore 提高</dt><dd>${higherSem}<small> / ${comparison.length}</small></dd></div></dl>
      <p class="discordance">${conflict.length ? `WER 下降且 SemScore 下降 · ${conflict.map(row => esc(models.get(row.model))).join('、')}` : '本组没有同时出现 WER 和 SemScore 下降的模型。'}</p>`;
  }

  function readFilters() {
    const params = new URLSearchParams(location.search);
    for (const name of Object.keys(defaults)) {
      if (name === 'group') continue;
      const select = form.elements[name];
      const value = params.get(name);
      if (Array.from(select.options).some(option => option.value === value)) select.value = value;
      else select.value = defaults[name];
    }
    updateFilterControls(params.get('group') || 'all');
    const field = params.get('sort');
    if (['wer', 'semscore', 'wer_delta', 'semscore_delta', 'n'].includes(field)) {
      sort = { field, direction: params.get('order') === 'desc' ? -1 : 1 };
    } else {
      sort = { ...sortDefault };
    }
  }

  function updateFilterControls(group = form.elements.group.value) {
    const { scope, dimension, dataset, cohort } = Object.fromEntries(new FormData(form));
    const detailedAssistive = scope === 'assistive' && dimension === 'dataset';
    const hideDataset = scope === 'assistive' && !detailedAssistive;
    form.elements.dataset.closest('label').hidden = hideDataset;
    if (hideDataset) form.elements.dataset.value = 'all';
    $('#dimension-filter').hidden = scope !== 'assistive';
    if (scope !== 'assistive') form.elements.dimension.value = 'overall';
    $('#domain-filter').hidden = hideDataset;
    if (hideDataset) form.elements.domain.value = 'all';
    $('#status-filter').hidden = scope !== 'overall';
    if (scope !== 'overall') form.elements.status.value = 'complete';
    const showGroup = scope === 'severity' || (scope === 'assistive' && dimension !== 'overall');
    $('#group-filter').hidden = !showGroup;
    if (showGroup) {
      $('#group-label').textContent = scope === 'severity' ? '严重度' : '场景';
      const groupRows = rowsByScope[scope].filter(row => (hideDataset || dataset === 'all' || row.dataset === dataset) && (cohort === 'all' || row.cohort === cohort) && (scope !== 'assistive' || row.dimension === dimension));
      const groups = [...new Set(groupRows.map(row => row.group))];
      options(form.elements.group, [['all', '全部分组'], ...groups.map(item => [item, item])], 'all');
      form.elements.group.value = groups.includes(group) ? group : 'all';
    } else {
      options(form.elements.group, [['all', '全部分组']], 'all');
    }
  }

  function writeFilters(anchor) {
    const url = new URL(location.href);
    if (anchor) url.hash = anchor;
    for (const [name, value] of new FormData(form)) {
      if (defaults[name] === value) url.searchParams.delete(name);
      else url.searchParams.set(name, value);
    }
    if (sort.field) {
      url.searchParams.set('sort', sort.field);
      url.searchParams.set('order', sort.direction === 1 ? 'asc' : 'desc');
    } else {
      url.searchParams.delete('sort');
      url.searchParams.delete('order');
    }
    try { history.replaceState(null, '', url); } catch { /* file URLs can restrict history changes */ }
  }

  function goToResults(changes) {
    const state = { ...defaults, ...changes };
    for (const [name, value] of Object.entries(state)) form.elements[name].value = value;
    page = 0;
    sort = { ...sortDefault };
    updateFilterControls();
    writeFilters('results');
    renderResults();
    $('#results-title').setAttribute('tabindex', '-1');
    $('#results-title').focus({ preventScroll: true });
    $('#results').scrollIntoView({ block: 'start' });
  }

  function belongsToDomain(row, domain) {
    if (domain === 'all') return true;
    const train = variants.get(row.variant).train_dataset;
    if (domain === 'base') return !train;
    return Boolean(train && row.dataset && (domain === 'in' ? train === row.dataset : train !== row.dataset));
  }

  function matchesDirection(row, change) {
    if (change === 'all') return true;
    if (!Number.isFinite(row.relative?.wer) || !Number.isFinite(row.relative?.semscore)) return false;
    const { wer, semscore } = row.relative;
    return {
      both: wer > 0 && semscore > 0,
      conflict: wer > 0 && semscore < 0,
      reverse: wer < 0 && semscore > 0,
      worse: wer < 0 && semscore < 0,
    }[change];
  }

  const sortValue = (row, field) => field.endsWith('_delta') ? row.relative?.[field.split('_')[0]] : row[field];
  function sortedRows(rows) {
    const { field, direction } = sort;
    if (!field) return rows;
    return rows.slice().sort((a, b) => {
      const x = sortValue(a, field), y = sortValue(b, field);
      if (!Number.isFinite(x)) return Number.isFinite(y) ? 1 : 0;
      if (!Number.isFinite(y)) return -1;
      return (x - y) * direction;
    });
  }

  function sortHeader(field, label) {
    const current = sort.field === field;
    return `<th scope="col" class="number" ${current ? `aria-sort="${sort.direction === 1 ? 'ascending' : 'descending'}"` : ''}><button type="button" data-sort="${field}">${label} <span aria-hidden="true">${current ? (sort.direction === 1 ? '↑' : '↓') : '↕'}</span></button></th>`;
  }

  const weightText = row => row.stage ? stages.find(stage => stage.id === row.stage).name : variantLabel(row.variant);
  function resultRow(row, index, showGroup) {
    const complete = row.status === 'complete';
    const button = (metric, text) => `<button type="button" class="metric-button" data-row="${index}" aria-label="查看 ${esc(models.get(row.model))} ${esc(weightText(row))} ${metrics[metric]} ${text} 的评测详情">${text}</button>`;
    const delta = value => `<span class="${value > 0 ? 'positive' : value < 0 ? 'negative' : ''}">${relativeText(value)}</span>`;
    const baseline = row.variant === 'original';
    return `<tr><th scope="row">${esc(models.get(row.model))}</th><td>${esc(weightText(row))}</td><td>${esc(datasets.get(row.dataset) || '—')}</td>
      <td>${cohorts[row.cohort]}</td>${showGroup ? `<td>${esc(row.group || '—')}</td>` : ''}
      <td class="number">${integer(row.n)}</td><td class="number">${complete ? button('wer', valueText('wer', row.wer)) : '—'}</td>
      <td class="number">${complete ? button('semscore', valueText('semscore', row.semscore)) : '—'}</td>
      <td class="number">${baseline ? '基准' : delta(row.relative?.wer)}</td><td class="number">${baseline ? '基准' : delta(row.relative?.semscore)}</td>
      <td><span class="status ${row.status}">${statuses[row.status]}</span></td></tr>`;
  }

  function renderResults() {
    const state = Object.fromEntries(new FormData(form));
    const rows = rowsByScope[state.scope].filter(row => {
      if (state.scope === 'assistive' && row.dimension !== state.dimension) return false;
      for (const field of ['model', 'dataset', 'variant', 'cohort', 'group', 'status']) {
        if (state[field] !== 'all' && state[field] !== row[field]) return false;
      }
      return belongsToDomain(row, state.domain) && matchesDirection(row, state.change);
    });
    filtered = sortedRows(rows);
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, pages - 1);
    visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
    const showGroup = state.scope === 'severity' || state.scope === 'assistive';
    const table = $('#result-table');
    table.hidden = !visible.length;
    table.innerHTML = visible.length ? `<caption class="visually-hidden">符合筛选的评测结果</caption><thead><tr><th scope="col">模型</th><th scope="col">权重</th><th scope="col">评测数据集</th><th scope="col">人群</th>${showGroup ? '<th scope="col">分组</th>' : ''}${sortHeader('n', 'N')}${sortHeader('wer', 'WER')}${sortHeader('semscore', 'SemScore')}${sortHeader('wer_delta', 'WER 改善')}${sortHeader('semscore_delta', '语义改善')}<th scope="col">状态</th></tr></thead><tbody>${visible.map((row, index) => resultRow(row, index, showGroup)).join('')}</tbody>` : '';
    $('#empty').hidden = Boolean(visible.length);
    $('#export').disabled = !filtered.length;
    $('#result-count').textContent = filtered.length ? `${integer(filtered.length)} 条结果 · 当前 ${integer(page * pageSize + 1)}–${integer(page * pageSize + visible.length)}` : '0 条结果';
    $('#pagination').hidden = pages === 1;
    $('#page-indicator').textContent = `第 ${page + 1} / ${pages} 页`;
    $('#previous').disabled = page === 0;
    $('#next').disabled = page === pages - 1;
    const notes = {
      overall: '改善为相对各行基准的百分比，正值表示改善。261117 整段行使用本轮匹配原始权重。',
      severity: '仅列有原生分层结果的组合。改善为相对该分层基准的百分比。',
      assistive: `严格辅助性子集 · ${integer(data.assistive.strict_samples)} 条共同样本。${data.assistive.note}`,
      matched: '261117 同口径原始、切段、整段对照。改善使用本轮原始权重作为基准。',
    };
    $('#scope-note').textContent = notes[state.scope];
    $('#scope-note').hidden = false;
  }

  function renderInventory() {
    const selected = $('#coverage-model').value;
    const subtitle = (id, label) => `<th scope="col">${esc(label)}<small>${data.datasets.find(item => item.id === id).healthy ? '疾病 / 健康' : '疾病'}</small></th>`;
    const counts = {};
    const displayed = data.models.filter(model => selected === 'all' || selected === model.id);
    const tbody = displayed.map(model => `<tbody>${data.variants.map((variant, index) => {
      const cells = data.datasets.map(dataset => {
        const disease = overallIndex.get(key(model.id, variant.id, dataset.id, 'disease'))?.status ?? 'not_evaluated';
        const healthy = overallIndex.get(key(model.id, variant.id, dataset.id, 'healthy'))?.status ?? 'not_evaluated';
        const label = `${model.label} ${variantLabel(variant.id)} ${dataset.label}，疾病组${statuses[disease]}，健康组${statuses[healthy]}`;
        for (const status of [disease, healthy]) counts[status] = (counts[status] || 0) + 1;
        return `<td><button type="button" class="coverage-cell" data-model="${model.id}" data-variant="${variant.id}" data-dataset="${dataset.id}" aria-label="${esc(label)}"><span aria-hidden="true" class="coverage-dot ${disease}"></span><span aria-hidden="true" class="coverage-dot ${healthy}"></span></button></td>`;
      }).join('');
      const modelHeader = index ? '' : `<th class="inventory-model" scope="rowgroup" rowspan="${data.variants.length}">${esc(model.label)}</th>`;
      return `<tr>${modelHeader}<th scope="row">${esc(variantLabel(variant.id))}</th>${cells}</tr>`;
    }).join('')}</tbody>`).join('');
    $('#coverage-table').innerHTML = `<caption class="visually-hidden">模型、权重、数据集和人群的评测覆盖</caption><thead><tr><th scope="col">模型</th><th scope="col">权重</th>${data.datasets.map(item => subtitle(item.id, item.label)).join('')}</tr></thead>${tbody}`;
    $('#inventory-summary').innerHTML = Object.entries(statuses).map(([id, label]) => `<span><i class="coverage-dot ${id}" aria-hidden="true"></i>${label} <strong>${integer(counts[id] || 0)}</strong></span>`).join('') + '<small>每格左点为疾病组，右点为健康组。</small>';
  }

  function showDetail(row) {
    const scope = form.elements.scope.value;
    $('#detail-title').textContent = `${models.get(row.model)} · ${weightText(row)}`;
    const group = [datasets.get(row.dataset), cohorts[row.cohort], row.group].filter(Boolean).join(' / ');
    const source = sourceFor(row, scope);
    const ood = row.comparison_protocol === '261125_ood' ? '<p class="provenance">跨数据集评测提供绝对分数。该行的匹配基准尚未发布。</p>' : '';
    const compare = row.comparison_protocol === '261117_matched' ? `<h3>261117 同口径对照</h3><table class="comparison-table"><thead><tr><th scope="col">权重</th><th scope="col">WER</th><th scope="col">SemScore</th></tr></thead><tbody>${stages.map(stage => {
      const record = stage.id === 'full' ? fullMatched.find(item => item.model === row.model && item.dataset === row.dataset && item.cohort === row.cohort) : row[`comparison_${stage.id}`];
      const full = stage.id === 'full' && scope === 'severity' ? row : record;
      return `<tr><th scope="row">${stage.name}</th><td>${valueText('wer', full?.wer)}</td><td>${valueText('semscore', full?.semscore)}</td></tr>`;
    }).join('')}</tbody></table>` : '';
    $('#detail-content').innerHTML = `<p>${esc(group)}</p><dl class="detail-metrics"><div><dt>样本数</dt><dd>${integer(row.n)}</dd></div><div><dt>WER</dt><dd>${valueText('wer', row.wer)}</dd></div><div><dt>SemScore</dt><dd>${valueText('semscore', row.semscore)}</dd></div></dl>${compare}${ood}<p class="provenance">来源 <code>${esc(source)}</code></p>${row.comparison_protocol === '261117_matched' ? '<p><a href="data/261117-summary.csv" class="link" download>下载 261117 对照 CSV ↓</a></p>' : ''}`;
    $('#details').showModal();
  }

  function sourceFor(row, scope) {
    return row.source || {
      overall: data.sources[0], severity: data.sources[2], assistive: data.sources[5], matched: '261117结果/summary.csv',
    }[scope];
  }

  const csvCell = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  function exportCsv() {
    const header = ['model', 'weight', 'train_dataset', 'evaluation_dataset', 'cohort', 'group', 'sample_count', 'wer', 'semscore', 'relative_wer_improvement', 'relative_semscore_improvement', 'status', 'scope', 'comparison_protocol', 'source'];
    const scope = form.elements.scope.value;
    const rows = filtered.map(row => [row.model, row.variant, variants.get(row.variant).train_dataset, row.dataset, row.cohort, row.group, row.n, row.wer, row.semscore, row.relative?.wer, row.relative?.semscore, row.status, scope, row.comparison_protocol, row.status === 'complete' ? sourceFor(row, scope) : row.source]);
    const file = new Blob([[header, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' });
    const href = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = href;
    link.download = `audiobench-${scope}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(href), 5000);
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', () => {
    page = 0;
    updateFilterControls();
    writeFilters();
    renderResults();
  });
  focusForm.addEventListener('submit', event => event.preventDefault());
  focusForm.addEventListener('change', renderFocus);
  $('#view-focus').addEventListener('click', () => goToResults({ scope: 'matched', dataset: focusForm.elements.dataset.value, cohort: focusForm.elements.cohort.value }));
  $('#reset').addEventListener('click', () => goToResults({}));
  $('#export').addEventListener('click', exportCsv);
  $('#coverage-model').addEventListener('change', renderInventory);
  $('#coverage-table').addEventListener('click', event => {
    const target = event.target.closest('button[data-model]');
    if (target) goToResults({ ...target.dataset, status: 'all', cohort: 'all' });
  });
  $('#result-table').addEventListener('click', event => {
    const control = event.target.closest('button');
    if (!control) return;
    if ('row' in control.dataset) {
      showDetail(visible[Number(control.dataset.row)]);
    } else if (control.dataset.sort) {
      const field = control.dataset.sort;
      sort = { field, direction: sort.field === field ? -sort.direction : ['wer', 'n'].includes(field) ? 1 : -1 };
      page = 0;
      writeFilters();
      renderResults();
      $(`[data-sort="${field}"]`).focus({ preventScroll: true });
    }
  });
  $('#previous').addEventListener('click', () => { page--; renderResults(); });
  $('#next').addEventListener('click', () => { page++; renderResults(); });
  window.addEventListener('popstate', () => { page = 0; readFilters(); renderResults(); });
  if (navigator.clipboard) {
    $('#share').hidden = false;
    $('#share').addEventListener('click', async () => {
      const url = new URL(location.href);
      url.hash = 'results';
      try {
        await navigator.clipboard.writeText(url.href);
        $('#share').textContent = '链接已复制';
        $('#feedback').textContent = '筛选链接已复制';
      } catch {
        $('#share').textContent = '请从地址栏复制';
        $('#feedback').textContent = '无法访问剪贴板，请从地址栏复制筛选链接';
      }
      setTimeout(() => { $('#share').textContent = '复制筛选链接'; }, 2500);
    });
  }

  readFilters();
  renderStats();
  renderFocus();
  renderResults();
  renderInventory();
  const ood = data.ood_update;
  $('#snapshot').textContent = `历史矩阵快照 ${data.built_at.slice(0, 10)}` + (ood ? ` · OOD 验证结果 ${ood.complete_cells} / ${ood.expected_cells} 个组合（${ood.date}）` : '');
  if (ood) {
    const link = Object.assign(document.createElement('a'), { className: 'link', href: ood.summary, textContent: '261125 OOD 汇总 CSV ↓', download: '' });
    $('.downloads').append(link);
  }
  $('#dashboard').hidden = false;
  if (location.hash && document.getElementById(location.hash.slice(1))) {
    requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
  }
})();
