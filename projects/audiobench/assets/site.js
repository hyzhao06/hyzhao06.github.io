(() => {
  const data = window.AUDIOBENCH_MATRIX_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const form = $('#filters');
  const modelNames = new Map(data.models.map(item => [item.id, item.label]));
  const variantNames = new Map(data.variants.map(item => [item.id, item.label]));
  const datasetNames = new Map(data.datasets.map(item => [item.id, item.label]));
  const cohortNames = { disease: '疾病组', healthy: '健康组' };
  const scopeNames = { overall: '整体', severity: '严重度分组', assistive: '辅助场景' };
  const allRows = {
    overall: data.overall.records,
    severity: data.overall.dataset_records,
    assistive: data.assistive.records,
  };
  const pageSize = 8;
  let rows = [];
  let page = 0;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const integer = value => Number(value || 0).toLocaleString('en-US');
  const formatPercent = value => Number.isFinite(value) ? `${(100 * value).toFixed(2)}%` : '—';
  const formatScore = value => Number.isFinite(value) ? value.toFixed(4) : '—';
  const formatDataset = row => {
    if (row.dimension === 'dataset') {
      const [dataset] = row.group.split('::');
      return datasetNames.get(dataset) || dataset;
    }
    return datasetNames.get(row.dataset) || '辅助性子集';
  };
  const formatGroup = row => row.dimension === 'dataset'
    ? row.group.split('::').slice(1).join(' / ')
    : row.group || '—';

  function setOptions(select, items, includeAll = true) {
    const options = includeAll ? [['all', '全部'], ...items] : items;
    select.innerHTML = options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
  }

  setOptions(form.elements.model, data.models.map(item => [item.id, item.label]));
  setOptions(form.elements.dataset, data.datasets.map(item => [item.id, item.label]));
  setOptions(form.elements.variant, data.variants.map(item => [item.id, item.label]));
  setOptions($('#coverage-model'), data.models.map(item => [item.id, item.label]), false);
  $('#coverage-model').value = data.models[0]?.id || '';
  $('#dataset-count').textContent = `${data.models.length} 个模型 · ${data.variants.length} 种权重 · ${data.datasets.length} 个评测集`;

  function stateFromForm() {
    return Object.fromEntries(new FormData(form));
  }

  function updateConditionalFilters() {
    const state = stateFromForm();
    const assistive = state.scope === 'assistive';
    const detailed = assistive && state.dimension === 'dataset';
    $('#dimension-wrap').hidden = !assistive;
    form.elements.dataset.closest('label').hidden = assistive && !detailed;
    $('#group-wrap').hidden = !(state.scope === 'severity' || (assistive && state.dimension !== 'overall'));
    if (!assistive) form.elements.dimension.value = 'overall';

    if (!$('#group-wrap').hidden) {
      const candidates = allRows[state.scope].filter(row => {
        if (assistive && row.dimension !== state.dimension) return false;
        if (detailed && state.dataset !== 'all' && !row.group.startsWith(`${state.dataset}::`)) return false;
        if (state.cohort !== 'all' && row.cohort !== state.cohort) return false;
        return true;
      });
      const groups = [...new Set(candidates.map(row => row.group))];
      const selected = form.elements.group.value;
      setOptions(form.elements.group, groups.map(group => [group, group]));
      if (groups.includes(selected)) form.elements.group.value = selected;
    } else {
      setOptions(form.elements.group, []);
    }
  }

  function currentRows() {
    const state = stateFromForm();
    return allRows[state.scope].filter(row => {
      if (row.status !== 'complete') return false;
      if (state.scope === 'assistive' && row.dimension !== state.dimension) return false;
      if (state.model !== 'all' && row.model !== state.model) return false;
      if (state.variant !== 'all' && row.variant !== state.variant) return false;
      if (state.cohort !== 'all' && row.cohort !== state.cohort) return false;
      if (state.scope !== 'assistive' && state.dataset !== 'all' && row.dataset !== state.dataset) return false;
      if (state.scope === 'assistive' && state.dimension === 'dataset' && state.dataset !== 'all' && !row.group.startsWith(`${state.dataset}::`)) return false;
      if (state.group !== 'all' && row.group !== state.group) return false;
      return true;
    });
  }

  function renderResults() {
    rows = currentRows();
    const pages = Math.max(1, Math.ceil(rows.length / pageSize));
    page = Math.min(page, pages - 1);
    const shown = rows.slice(page * pageSize, (page + 1) * pageSize);
    const state = stateFromForm();
    const showGroup = state.scope === 'severity' || (state.scope === 'assistive' && state.dimension !== 'overall');
    const showExtendedMetrics = rows.length > 0 && rows.every(row => Number.isFinite(row.cer) && Number.isFinite(row.ser));
    $('#result-count').textContent = `${integer(rows.length)} 条结果`;
    $('#export').disabled = rows.length === 0;
    $('#empty').hidden = rows.length !== 0;
    $('#result-table').hidden = rows.length === 0;
    $('#pagination').hidden = pages <= 1;
    $('#page-indicator').textContent = `${page + 1} / ${pages}`;
    $('#previous').disabled = page === 0;
    $('#next').disabled = page + 1 >= pages;

    const headers = ['模型', '权重', '评测集', '人群'];
    if (showGroup) headers.push('分组');
    headers.push('样本数', 'WER');
    if (showExtendedMetrics) headers.push('CER', 'SER');
    headers.push('SemScore');
    const body = shown.map(row => {
      const cells = [
        modelNames.get(row.model), variantNames.get(row.variant), formatDataset(row), cohortNames[row.cohort],
      ];
      if (showGroup) cells.push(formatGroup(row));
      cells.push(integer(row.n), formatPercent(row.wer));
      if (showExtendedMetrics) cells.push(formatPercent(row.cer), formatPercent(row.ser));
      cells.push(formatScore(row.semscore));
      const numericColumns = showExtendedMetrics ? 5 : 3;
      return `<tr>${cells.map((value, index) => index === 0 ? `<th scope="row">${escapeHtml(value)}</th>` : `<td${index >= cells.length - numericColumns ? ' class="number"' : ''}>${escapeHtml(value)}</td>`).join('')}</tr>`;
    }).join('');
    const numericHeaders = showExtendedMetrics ? 5 : 3;
    $('#result-table').innerHTML = `<thead><tr>${headers.map((header, index) => `<th scope="col"${index >= headers.length - numericHeaders ? ' class="number"' : ''}>${header}</th>`).join('')}</tr></thead><tbody>${body}</tbody>`;
  }

  function statusCell(status, cohort) {
    return `<span class="coverage-status ${status}">${cohort}</span>`;
  }

  function renderCoverage() {
    const model = $('#coverage-model').value;
    const records = data.overall.records.filter(row => row.model === model);
    const index = new Map(records.map(row => [`${row.variant}/${row.dataset}/${row.cohort}`, row]));
    const counts = { complete: 0, not_evaluated: 0, not_applicable: 0 };
    const body = data.variants.map(variant => {
      const cells = data.datasets.map(dataset => {
        const disease = index.get(`${variant.id}/${dataset.id}/disease`)?.status || 'not_evaluated';
        const healthy = index.get(`${variant.id}/${dataset.id}/healthy`)?.status || 'not_evaluated';
        counts[disease]++;
        counts[healthy]++;
        return `<td><div class="cell-status">${statusCell(disease, '疾病')}${statusCell(healthy, '健康')}</div></td>`;
      }).join('');
      return `<tr><th scope="row">${escapeHtml(variant.label)}</th>${cells}</tr>`;
    }).join('');
    $('#coverage-table').innerHTML = `<thead><tr><th scope="col">权重</th>${data.datasets.map(item => `<th scope="col">${escapeHtml(item.label)}</th>`).join('')}</tr></thead><tbody>${body}</tbody>`;
    $('#coverage-count').textContent = `${integer(counts.complete)} 已评测 · ${integer(counts.not_evaluated)} 待评测 · ${integer(counts.not_applicable)} 不适用`;
  }

  function csvCell(value) {
    return `"${String(value ?? '').replaceAll('"', '""')}"`;
  }

  function downloadCsv() {
    const state = stateFromForm();
    const header = ['模型', '权重', '训练数据集', '评测数据集', '人群', '分组', '样本数', 'WER', 'CER', 'SER', 'SemScore', '范围'];
    const content = [header, ...rows.map(row => {
      const variant = data.variants.find(item => item.id === row.variant);
      const trainingSet = variant?.train_dataset ? datasetNames.get(variant.train_dataset) : '原始权重';
      return [
        modelNames.get(row.model), variantNames.get(row.variant), trainingSet,
        formatDataset(row), cohortNames[row.cohort], row.group ? formatGroup(row) : '',
        row.n, row.wer, row.cer, row.ser, row.semscore, scopeNames[state.scope],
      ];
    })].map(line => line.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob([`\ufeff${content}\r\n`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: 'audiobench-filtered-results.csv' });
    link.click();
    URL.revokeObjectURL(url);
  }

  function switchView(tab) {
    const resultsActive = tab.id === 'results-tab';
    $('#results-view').hidden = !resultsActive;
    $('#coverage-view').hidden = resultsActive;
    $('#results-tab').classList.toggle('active', resultsActive);
    $('#coverage-tab').classList.toggle('active', !resultsActive);
    $('#results-tab').setAttribute('aria-selected', String(resultsActive));
    $('#coverage-tab').setAttribute('aria-selected', String(!resultsActive));
  }

  form.addEventListener('change', () => {
    page = 0;
    updateConditionalFilters();
    renderResults();
  });
  $('#export').addEventListener('click', downloadCsv);
  $('#previous').addEventListener('click', () => { page--; renderResults(); });
  $('#next').addEventListener('click', () => { page++; renderResults(); });
  $('#coverage-model').addEventListener('change', renderCoverage);
  $('#results-tab').addEventListener('click', event => switchView(event.currentTarget));
  $('#coverage-tab').addEventListener('click', event => switchView(event.currentTarget));

  updateConditionalFilters();
  renderResults();
  renderCoverage();
})();
