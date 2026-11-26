(() => {
  const data = window.AUDIOBENCH_MATRIX_DATA;
  if (!data) return;

  const $ = selector => document.querySelector(selector);
  const inventoryForm = $('#inventory-filters');
  const resultsForm = $('#filters');
  const variantsById = new Map(data.variants.map(row => [row.id, row]));
  const modelNames = new Map(data.models.map(row => [row.id, row.label]));
  const variantNames = new Map(data.variants.map(row => [row.id, row.label]));
  const datasetNames = new Map(data.datasets.map(row => [row.id, row.label]));
  const datasetIds = new Map(data.datasets.map(row => [row.label, row.id]));
  const cohortNames = { disease: '疾病组', healthy: '健康组' };
  const scopeNames = { overall: '整体', severity: '严重度分组', assistive: '辅助性场景' };
  const pageSize = 12;
  let filteredRows = [];
  let page = 0;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const integer = value => Number(value || 0).toLocaleString('en-US');
  const percent = value => Number.isFinite(value) ? `${(100 * value).toFixed(2)}%` : '—';
  const score = value => Number.isFinite(value) ? value.toFixed(4) : '—';

  function setOptions(select, entries, allLabel = '') {
    const values = allLabel ? [['all', allLabel], ...entries] : entries;
    select.innerHTML = values.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
  }

  const modelOptions = data.models.map(row => [row.id, row.label]);
  const variantOptions = data.variants.map(row => [row.id, row.label]);
  const datasetOptions = data.datasets.map(row => [row.id, row.label]);
  setOptions(inventoryForm.elements.model, modelOptions);
  setOptions(inventoryForm.elements.variant, variantOptions, '全部权重');
  setOptions(inventoryForm.elements.dataset, datasetOptions, '全部数据集');
  setOptions(resultsForm.elements.model, modelOptions, '全部模型');
  setOptions(resultsForm.elements.variant, variantOptions, '全部权重');
  setOptions(resultsForm.elements.dataset, datasetOptions, '全部数据集');

  const overallIndex = new Map(data.overall.records.map(row => [
    `${row.model}/${row.variant}/${row.dataset}/${row.cohort}`, row.status,
  ]));
  const assistiveIndex = new Map(data.assistive.records
    .filter(row => row.dimension === 'overall')
    .map(row => [`${row.model}/${row.variant}/${row.cohort}`, row.status]));

  function coverageStatus(model, variant, dataset, cohort) {
    if (dataset.id === 'assistive') return assistiveIndex.get(`${model}/${variant}/${cohort}`) || 'not_evaluated';
    return overallIndex.get(`${model}/${variant}/${dataset.id}/${cohort}`) || 'not_evaluated';
  }

  function renderCoverage() {
    const model = inventoryForm.elements.model.value;
    const variant = inventoryForm.elements.variant.value;
    const selectedDataset = inventoryForm.elements.dataset.value;
    const datasets = [...data.datasets, { id: 'assistive', label: '辅助性场景', healthy: true }]
      .filter(row => selectedDataset === 'all' || selectedDataset === row.id);
    const variants = data.variants.filter(row => variant === 'all' || variant === row.id);
    const columnCount = datasets.reduce((count, row) => count + (row.healthy ? 2 : 1), 0);
    const columns = `<colgroup><col class="weight-column">${'<col class="cohort-column">'.repeat(columnCount)}</colgroup>`;
    const top = `<tr><th rowspan="2" scope="col">权重</th>${datasets.map(row => `<th scope="colgroup" colspan="${row.healthy ? 2 : 1}">${escapeHtml(row.label)}</th>`).join('')}</tr>`;
    const sub = `<tr>${datasets.map(row => `<th scope="col">疾病组</th>${row.healthy ? '<th scope="col">健康组</th>' : ''}`).join('')}</tr>`;
    const body = variants.map(variantRow => {
      const cells = datasets.map(dataset => {
        const cohorts = dataset.healthy ? ['disease', 'healthy'] : ['disease'];
        return cohorts.map(cohort => {
          const status = coverageStatus(model, variantRow.id, dataset, cohort);
          const mark = status === 'complete' ? '✓' : status === 'not_applicable' ? '—' : '…';
          const statusText = status === 'complete' ? '已评测' : status === 'not_applicable' ? '不适用' : '待评测';
          const label = `${modelNames.get(model)}，${variantRow.label}，${dataset.label}，${cohortNames[cohort]}：${statusText}`;
          return `<td><span class="matrix-status ${status}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">${mark}</span></td>`;
        }).join('');
      }).join('');
      return `<tr><th scope="row">${escapeHtml(variantRow.label)}</th>${cells}</tr>`;
    }).join('');
    $('#coverage-table').innerHTML = `${columns}<thead>${top}${sub}</thead><tbody>${body}</tbody>`;
    $('#coverage-table').setAttribute('aria-label', `${modelNames.get(model)} 数据覆盖矩阵`);
  }

  function filterState() {
    return Object.fromEntries(new FormData(resultsForm));
  }

  function resultDataset(row, scope) {
    if (scope === 'assistive' && row.dimension === 'dataset') return datasetIds.get(row.group.split('::')[0]) || '';
    return row.dataset || '';
  }

  function refreshGroupOptions() {
    const state = filterState();
    const showDimension = state.scope === 'assistive';
    const detailDimension = showDimension && state.dimension === 'dataset';
    const showGroup = state.scope === 'severity' || (showDimension && state.dimension !== 'overall');
    $('#dimension-wrap').hidden = !showDimension;
    $('#dataset-wrap').hidden = showDimension && !detailDimension;
    $('#group-wrap').hidden = !showGroup;
    if (!showDimension) resultsForm.elements.dimension.value = 'overall';

    if (!showGroup) {
      setOptions(resultsForm.elements.group, [], '全部分组');
      return;
    }
    const source = state.scope === 'severity' ? data.overall.dataset_records : data.assistive.records;
    const groups = [...new Set(source.filter(row => {
      if (showDimension && row.dimension !== state.dimension) return false;
      if (detailDimension && state.dataset !== 'all' && resultDataset(row, 'assistive') !== state.dataset) return false;
      if (state.dataset !== 'all' && !showDimension && row.dataset !== state.dataset) return false;
      if (state.model !== 'all' && row.model !== state.model) return false;
      if (state.variant !== 'all' && row.variant !== state.variant) return false;
      if (state.cohort !== 'all' && row.cohort !== state.cohort) return false;
      return true;
    }).map(row => row.group))];
    const selected = resultsForm.elements.group.value;
    setOptions(resultsForm.elements.group, groups.map(group => [group, group]), '全部分组');
    if (groups.includes(selected)) resultsForm.elements.group.value = selected;
  }

  function selectRows() {
    const state = filterState();
    const source = state.scope === 'overall' ? data.overall.records
      : state.scope === 'severity' ? data.overall.dataset_records : data.assistive.records;
    return source.filter(row => {
      if (row.status !== 'complete') return false;
      if (state.scope === 'assistive' && row.dimension !== state.dimension) return false;
      if (state.model !== 'all' && row.model !== state.model) return false;
      if (state.variant !== 'all' && row.variant !== state.variant) return false;
      if (state.cohort !== 'all' && row.cohort !== state.cohort) return false;
      if (state.dataset !== 'all' && resultDataset(row, state.scope) !== state.dataset) return false;
      if (state.group !== 'all' && row.group !== state.group) return false;
      return true;
    });
  }

  function renderResults() {
    filteredRows = selectRows();
    const pages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    page = Math.min(page, pages - 1);
    const visible = filteredRows.slice(page * pageSize, (page + 1) * pageSize);
    const state = filterState();
    const showGroup = state.scope === 'severity' || (state.scope === 'assistive' && state.dimension !== 'overall');
    const showExtended = filteredRows.length > 0 && filteredRows.every(row => Number.isFinite(row.cer) && Number.isFinite(row.ser));
    $('#result-count').textContent = `${integer(filteredRows.length)} 条数据`;
    $('#export').disabled = filteredRows.length === 0;
    $('#empty').hidden = filteredRows.length !== 0;
    $('#result-table').hidden = filteredRows.length === 0;
    $('#pagination').hidden = pages <= 1;
    $('#page-indicator').textContent = `${page + 1} / ${pages}`;
    $('#previous').disabled = page === 0;
    $('#next').disabled = page + 1 >= pages;

    const headers = ['模型', '权重', '评测集', '人群'];
    if (showGroup) headers.push('分组');
    headers.push('样本数', 'WER');
    if (showExtended) headers.push('CER', 'SER');
    headers.push('SemScore');
    const numericColumns = showExtended ? 5 : 3;
    const body = visible.map(row => {
      const evalDataset = state.scope === 'assistive' && state.dimension !== 'dataset'
        ? '辅助性场景' : datasetNames.get(resultDataset(row, state.scope)) || '—';
      const cells = [modelNames.get(row.model), variantNames.get(row.variant), evalDataset, cohortNames[row.cohort]];
      if (showGroup) cells.push(state.scope === 'assistive' && state.dimension === 'dataset' ? row.group.split('::').slice(1).join(' / ') : row.group || '—');
      cells.push(integer(row.n), percent(row.wer));
      if (showExtended) cells.push(percent(row.cer), percent(row.ser));
      cells.push(score(row.semscore));
      return `<tr>${cells.map((value, index) => index === 0 ? `<th scope="row">${escapeHtml(value)}</th>` : `<td${index >= cells.length - numericColumns ? ' class="number"' : ''}>${escapeHtml(value)}</td>`).join('')}</tr>`;
    }).join('');
    $('#result-table').innerHTML = `<thead><tr>${headers.map((value, index) => `<th scope="col"${index >= headers.length - numericColumns ? ' class="number"' : ''}>${value}</th>`).join('')}</tr></thead><tbody>${body}</tbody>`;
  }

  function csvCell(value) {
    return `"${String(value ?? '').replaceAll('"', '""')}"`;
  }

  function downloadCsv() {
    const state = filterState();
    const header = ['模型', '权重', '训练数据集', '评测集', '人群', '分组', '样本数', 'WER', 'CER', 'SER', 'SemScore', '范围'];
    const rows = filteredRows.map(row => {
      const variant = variantsById.get(row.variant);
      const dataset = resultDataset(row, state.scope);
      const group = state.scope === 'assistive' && state.dimension === 'dataset' ? row.group.split('::').slice(1).join(' / ') : row.group || '';
      return [
        modelNames.get(row.model), variantNames.get(row.variant), variant?.train_dataset ? datasetNames.get(variant.train_dataset) : '原始权重',
        state.scope === 'assistive' && state.dimension !== 'dataset' ? '辅助性场景' : datasetNames.get(dataset) || '',
        cohortNames[row.cohort], group, row.n, row.wer, row.cer, row.ser, row.semscore, scopeNames[state.scope],
      ];
    });
    const csv = [header, ...rows].map(line => line.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob([`\ufeff${csv}\r\n`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: 'audiobench-filtered-data.csv' });
    link.click();
    URL.revokeObjectURL(url);
  }

  function activateTab(tab) {
    const inventory = tab.id === 'inventory-tab';
    $('#inventory-view').hidden = !inventory;
    $('#results-view').hidden = inventory;
    $('#inventory-tab').classList.toggle('active', inventory);
    $('#results-tab').classList.toggle('active', !inventory);
    $('#inventory-tab').setAttribute('aria-selected', String(inventory));
    $('#results-tab').setAttribute('aria-selected', String(!inventory));
  }

  inventoryForm.addEventListener('change', renderCoverage);
  resultsForm.addEventListener('change', () => {
    page = 0;
    refreshGroupOptions();
    renderResults();
  });
  $('#export').addEventListener('click', downloadCsv);
  $('#previous').addEventListener('click', () => { page--; renderResults(); });
  $('#next').addEventListener('click', () => { page++; renderResults(); });
  $('#inventory-tab').addEventListener('click', event => activateTab(event.currentTarget));
  $('#results-tab').addEventListener('click', event => activateTab(event.currentTarget));

  renderCoverage();
  refreshGroupOptions();
  renderResults();
})();
