(() => {
  const data = window.AUDIOBENCH_MATRIX_DATA;
  if (!data) return;

  const $ = selector => document.querySelector(selector);
  const inventoryForm = $('#inventory-filters');
  const resultsForm = $('#filters');
  const models = data.models;
  const variants = data.variants;
  const datasets = data.datasets;
  const modelNames = new Map(models.map(row => [row.id, row.label]));
  const variantNames = new Map(variants.map(row => [row.id, row.label]));
  const variantById = new Map(variants.map(row => [row.id, row]));
  const datasetNames = new Map(datasets.map(row => [row.id, row.label]));
  const datasetIds = new Map(datasets.map(row => [row.label, row.id]));
  datasetNames.set('assistive', '辅助性场景');
  const cohortNames = { disease: '疾病组', healthy: '健康组' };
  const scopeNames = { overall: '整体', severity: '严重度分组', assistive: '辅助性场景' };

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const integer = value => Number(value || 0).toLocaleString('en-US');
  const formatValue = (metric, value) => {
    if (!Number.isFinite(value)) return '—';
    return metric === 'semscore' ? value.toFixed(4) : `${(value * 100).toFixed(2)}%`;
  };
  const csvCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`;

  function setOptions(select, entries, allLabel = '') {
    const options = allLabel ? [['all', allLabel], ...entries] : entries;
    select.innerHTML = options.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
  }

  const modelOptions = models.map(row => [row.id, row.label]);
  const variantOptions = variants.map(row => [row.id, row.label]);
  const datasetOptions = datasets.map(row => [row.id, row.label]);
  setOptions(inventoryForm.elements.model, modelOptions);
  setOptions(inventoryForm.elements.variant, variantOptions, '全部权重');
  setOptions(inventoryForm.elements.dataset, datasetOptions, '全部数据集');
  setOptions(resultsForm.elements.variant, variantOptions, '全部权重');
  setOptions(resultsForm.elements.dataset, datasetOptions, '全部数据集');
  $('#model-options').innerHTML = models.map(row => `<label><input class="model-option" type="checkbox" value="${esc(row.id)}" checked>${esc(row.label)}</label>`).join('');
  $('#all-models').checked = true;

  const matrixStatus = new Map(data.overall.records.map(row => [
    `${row.model}/${row.variant}/${row.dataset}/${row.cohort}`, row.status,
  ]));
  const assistiveStatus = new Map(data.assistive.records.filter(row => row.dimension === 'overall').map(row => [
    `${row.model}/${row.variant}/${row.cohort}`, row.status,
  ]));

  function selectedModels() {
    return [...document.querySelectorAll('.model-option:checked')].map(input => input.value);
  }

  function coverageStatus(model, variant, dataset, cohort) {
    if (dataset.id === 'assistive') return assistiveStatus.get(`${model}/${variant}/${cohort}`) || 'not_evaluated';
    return matrixStatus.get(`${model}/${variant}/${dataset.id}/${cohort}`) || 'not_evaluated';
  }

  function renderCoverage() {
    const model = inventoryForm.elements.model.value;
    const variant = inventoryForm.elements.variant.value;
    const selectedDataset = inventoryForm.elements.dataset.value;
    const allDatasets = [...datasets, { id: 'assistive', label: '辅助性场景', healthy: true }];
    const visibleDatasets = allDatasets.filter(row => selectedDataset === 'all' || row.id === selectedDataset);
    const visibleVariants = variants.filter(row => variant === 'all' || row.id === variant);
    const colCount = visibleDatasets.reduce((sum, row) => sum + (row.healthy ? 2 : 1), 0);
    const cols = `<colgroup><col class="weight-column">${'<col class="cohort-column">'.repeat(colCount)}</colgroup>`;
    const first = `<tr><th rowspan="2" scope="col">权重</th>${visibleDatasets.map(row => `<th scope="colgroup" colspan="${row.healthy ? 2 : 1}">${esc(row.label)}</th>`).join('')}</tr>`;
    const second = `<tr>${visibleDatasets.map(row => `<th scope="col">疾病组</th>${row.healthy ? '<th scope="col">健康组</th>' : ''}`).join('')}</tr>`;
    const body = visibleVariants.map(variantRow => {
      const cells = visibleDatasets.map(dataset => {
        const cohorts = dataset.healthy ? ['disease', 'healthy'] : ['disease'];
        return cohorts.map(cohort => {
          const status = coverageStatus(model, variantRow.id, dataset, cohort);
          const mark = status === 'complete' ? '✓' : status === 'not_applicable' ? '—' : '…';
          const label = `${modelNames.get(model)} · ${variantRow.label} · ${dataset.label} · ${cohortNames[cohort]}`;
          return `<td><span class="matrix-status ${status}" title="${esc(label)}">${mark}</span></td>`;
        }).join('');
      }).join('');
      return `<tr><th scope="row">${esc(variantRow.label)}</th>${cells}</tr>`;
    }).join('');
    $('#coverage-table').innerHTML = `${cols}<thead>${first}${second}</thead><tbody>${body}</tbody>`;
  }

  function state() {
    return { ...Object.fromEntries(new FormData(resultsForm)), models: selectedModels() };
  }

  function assistiveDatasetId(row) {
    return datasetIds.get((row.group || '').split('::')[0]) || '';
  }

  function rowDataset(row, current) {
    return current.scope === 'assistive' && current.dimension === 'dataset'
      ? assistiveDatasetId(row) : row.dataset || '';
  }

  function scopeRows(scope) {
    if (scope === 'overall') return data.overall.records;
    if (scope === 'severity') return data.overall.dataset_records;
    return data.assistive.records;
  }

  function matchingRows(current, includeMetricMissing = true) {
    const source = current.scope === 'overall'
      ? [
        ...data.overall.records.map(row => ({ ...row, matrixDataset: row.dataset })),
        ...data.assistive.records.filter(row => row.dimension === 'overall').map(row => ({ ...row, matrixDataset: 'assistive' })),
      ]
      : scopeRows(current.scope);
    return source.filter(row => {
      if (row.status !== 'complete') return false;
      if (current.scope === 'assistive' && row.dimension !== current.dimension) return false;
      if (current.models.length && !current.models.includes(row.model)) return false;
      if (current.variant !== 'all' && row.variant !== current.variant) return false;
      const dataset = current.scope === 'overall' ? row.matrixDataset : rowDataset(row, current);
      if (current.dataset !== 'all' && dataset !== current.dataset) return false;
      if (current.cohort !== 'all' && row.cohort !== current.cohort) return false;
      if (current.group !== 'all' && row.group !== current.group) return false;
      return includeMetricMissing || Number.isFinite(row[current.metric]);
    });
  }

  function refreshConditionalFilters() {
    let current = state();
    const resultDatasets = current.scope === 'overall'
      ? [...datasetOptions, ['assistive', '辅助性场景']]
      : datasetOptions;
    const previousDataset = resultsForm.elements.dataset.value;
    setOptions(resultsForm.elements.dataset, resultDatasets, '全部数据集');
    if (resultDatasets.some(([value]) => value === previousDataset)) resultsForm.elements.dataset.value = previousDataset;
    current = state();
    const assistive = current.scope === 'assistive';
    const detailed = assistive && current.dimension === 'dataset';
    const showGroup = current.scope === 'severity' || (assistive && current.dimension !== 'overall');
    $('#dimension-wrap').hidden = !assistive;
    $('#dataset-wrap').hidden = assistive && !detailed;
    $('#group-wrap').hidden = !showGroup;
    if (!assistive) resultsForm.elements.dimension.value = 'overall';
    if (!showGroup) {
      setOptions(resultsForm.elements.group, [], '全部分组');
      return;
    }

    const source = current.scope === 'severity' ? data.overall.dataset_records : data.assistive.records;
    const groups = [...new Set(source.filter(row => {
      if (assistive && row.dimension !== current.dimension) return false;
      if (detailed && current.dataset !== 'all' && assistiveDatasetId(row) !== current.dataset) return false;
      if (current.scope === 'severity' && current.dataset !== 'all' && row.dataset !== current.dataset) return false;
      if (current.models.length && !current.models.includes(row.model)) return false;
      if (current.variant !== 'all' && row.variant !== current.variant) return false;
      if (current.cohort !== 'all' && row.cohort !== current.cohort) return false;
      return true;
    }).map(row => row.group))];
    const previous = resultsForm.elements.group.value;
    setOptions(resultsForm.elements.group, groups.map(group => [group, group]), '全部分组');
    if (groups.includes(previous)) resultsForm.elements.group.value = previous;
  }

  function makeLeaves(current) {
    const leaves = [];
    const cohortsFor = healthy => current.cohort === 'all'
      ? (healthy ? ['disease', 'healthy'] : ['disease'])
      : (current.cohort === 'healthy' && !healthy ? [] : [current.cohort]);
    const add = (key, path, values) => leaves.push({ key, path, ...values });

    if (current.scope === 'overall') {
      const overallDatasets = [...datasets, { id: 'assistive', label: '辅助性场景', healthy: true }];
      for (const dataset of overallDatasets.filter(row => current.dataset === 'all' || row.id === current.dataset)) {
        for (const cohort of cohortsFor(dataset.healthy)) {
          add(`${dataset.id}/${cohort}`, [dataset.label, ...(current.cohort === 'all' ? [cohortNames[cohort]] : [])], {
            dataset: dataset.label, group: '', cohort,
          });
        }
      }
    } else if (current.scope === 'severity') {
      const source = data.overall.dataset_records;
      for (const dataset of datasets.filter(row => current.dataset === 'all' || row.id === current.dataset)) {
        const groups = [...new Set(source.filter(row => row.dataset === dataset.id && (current.cohort === 'all' || row.cohort === current.cohort)).map(row => row.group))];
        for (const group of groups.filter(name => current.group === 'all' || name === current.group)) {
          const groupRows = source.filter(row => row.dataset === dataset.id && row.group === group);
          const cohorts = cohortsFor(dataset.healthy).filter(cohort => groupRows.some(row => row.cohort === cohort));
          for (const cohort of cohorts) {
            add(`${dataset.id}/${group}/${cohort}`, [dataset.label, group, ...(current.cohort === 'all' ? [cohortNames[cohort]] : [])], {
              dataset: dataset.label, group, cohort,
            });
          }
        }
      }
    } else if (current.dimension === 'overall') {
      const source = data.assistive.records.filter(row => row.dimension === 'overall');
      for (const cohort of ['disease', 'healthy'].filter(item => current.cohort === 'all' || item === current.cohort)) {
        if (!source.some(row => row.cohort === cohort)) continue;
        add(`assistive/${cohort}`, ['辅助性场景', ...(current.cohort === 'all' ? [cohortNames[cohort]] : [])], {
          dataset: '辅助性场景', group: '全部辅助性场景', cohort,
        });
      }
    } else if (current.dimension === 'scene') {
      const source = data.assistive.records.filter(row => row.dimension === 'scene');
      const groups = [...new Set(source.map(row => row.group))];
      for (const group of groups.filter(name => current.group === 'all' || name === current.group)) {
        for (const cohort of ['disease', 'healthy'].filter(item => current.cohort === 'all' || item === current.cohort)) {
          if (!source.some(row => row.group === group && row.cohort === cohort)) continue;
          add(`scene/${group}/${cohort}`, ['辅助性场景', group, ...(current.cohort === 'all' ? [cohortNames[cohort]] : [])], {
            dataset: '辅助性场景', group, cohort,
          });
        }
      }
    } else {
      const source = data.assistive.records.filter(row => row.dimension === 'dataset');
      const groups = [...new Set(source.map(row => row.group))];
      for (const fullGroup of groups) {
        const datasetId = assistiveDatasetId({ group: fullGroup });
        if (current.dataset !== 'all' && datasetId !== current.dataset) continue;
        const datasetLabel = datasetNames.get(datasetId) || fullGroup.split('::')[0];
        const group = fullGroup.split('::').slice(1).join('::');
        if (current.group !== 'all' && fullGroup !== current.group) continue;
        for (const cohort of ['disease', 'healthy'].filter(item => current.cohort === 'all' || item === current.cohort)) {
          if (!source.some(row => row.group === fullGroup && row.cohort === cohort)) continue;
          add(`assistive/${fullGroup}/${cohort}`, ['辅助性场景', datasetLabel, group, ...(current.cohort === 'all' ? [cohortNames[cohort]] : [])], {
            dataset: datasetLabel, group, cohort,
          });
        }
      }
    }
    return leaves;
  }

  function leafKeyFor(row, current) {
    if (current.scope === 'overall') return `${row.matrixDataset || row.dataset}/${row.cohort}`;
    if (current.scope === 'severity') return `${row.dataset}/${row.group}/${row.cohort}`;
    if (current.dimension === 'overall') return `assistive/${row.cohort}`;
    if (current.dimension === 'scene') return `scene/${row.group}/${row.cohort}`;
    return `assistive/${row.group}/${row.cohort}`;
  }

  function headerRows(leaves, depth) {
    const rows = Array.from({ length: depth }, () => []);
    for (let level = 0; level < depth; level++) {
      let i = 0;
      while (i < leaves.length) {
        const label = leaves[i].path[level];
        let j = i + 1;
        while (j < leaves.length && leaves[j].path.slice(0, level + 1).join('\u0000') === leaves[i].path.slice(0, level + 1).join('\u0000')) j++;
        rows[level].push(`<th scope="colgroup" colspan="${j - i}">${esc(label)}</th>`);
        i = j;
      }
    }
    return rows;
  }

  function renderResultMatrix() {
    const current = state();
    const leaves = makeLeaves(current);
    const rows = matchingRows(current);
    const rowIndex = new Map(rows.map(row => [`${row.model}/${row.variant}/${leafKeyFor(row, current)}`, row]));
    const modelsSelected = current.models;
    const variantsSelected = variants.filter(row => current.variant === 'all' || row.id === current.variant);
    const depth = Math.max(1, ...leaves.map(row => row.path.length));
    $('#empty').hidden = leaves.length > 0 && modelsSelected.length > 0;
    $('#result-table').hidden = leaves.length === 0 || modelsSelected.length === 0;
    $('#export').disabled = leaves.length === 0 || modelsSelected.length === 0;
    $('#result-count').textContent = `${integer(rows.filter(row => Number.isFinite(row[current.metric])).length)} 个数值`;
    if (!leaves.length || !modelsSelected.length) {
      $('#result-table').innerHTML = '';
      return;
    }

    const cols = `<colgroup><col class="model-column"><col class="weight-column">${'<col class="metric-column">'.repeat(leaves.length)}</colgroup>`;
    const headers = headerRows(leaves, depth);
    headers[0].unshift(`<th class="model-head" rowspan="${depth}" scope="col">模型</th><th class="weight-head" rowspan="${depth}" scope="col">权重</th>`);
    const body = [];
    for (const model of models.filter(row => modelsSelected.includes(row.id))) {
      const selectedVariants = variantsSelected;
      selectedVariants.forEach((variant, index) => {
        const cells = leaves.map(leaf => {
          const row = rowIndex.get(`${model.id}/${variant.id}/${leaf.key}`);
          return `<td class="number">${formatValue(current.metric, row?.[current.metric])}</td>`;
        }).join('');
        const modelHeader = index === 0 ? `<th class="model-row" scope="rowgroup" rowspan="${selectedVariants.length}">${esc(model.label)}</th>` : '';
        body.push(`<tr>${modelHeader}<th class="weight-row" scope="row">${esc(variant.label)}</th>${cells}</tr>`);
      });
    }
    $('#result-table').innerHTML = `${cols}<thead>${headers.map(row => `<tr>${row.join('')}</tr>`).join('')}</thead><tbody>${body.join('')}</tbody>`;
  }

  function renderCoverage() {
    const model = inventoryForm.elements.model.value;
    const variant = inventoryForm.elements.variant.value;
    const selectedDataset = inventoryForm.elements.dataset.value;
    const allDatasets = [...datasets, { id: 'assistive', label: '辅助性场景', healthy: true }];
    const visibleDatasets = allDatasets.filter(row => selectedDataset === 'all' || row.id === selectedDataset);
    const visibleVariants = variants.filter(row => variant === 'all' || row.id === variant);
    const colCount = visibleDatasets.reduce((sum, row) => sum + (row.healthy ? 2 : 1), 0);
    const cols = `<colgroup><col class="weight-column">${'<col class="cohort-column">'.repeat(colCount)}</colgroup>`;
    const first = `<tr><th rowspan="2" scope="col">权重</th>${visibleDatasets.map(row => `<th scope="colgroup" colspan="${row.healthy ? 2 : 1}">${esc(row.label)}</th>`).join('')}</tr>`;
    const second = `<tr>${visibleDatasets.map(row => `<th scope="col">疾病组</th>${row.healthy ? '<th scope="col">健康组</th>' : ''}`).join('')}</tr>`;
    const body = visibleVariants.map(variantRow => {
      const cells = visibleDatasets.map(dataset => {
        const cohorts = dataset.healthy ? ['disease', 'healthy'] : ['disease'];
        return cohorts.map(cohort => {
          const status = coverageStatus(model, variantRow.id, dataset, cohort);
          const mark = status === 'complete' ? '✓' : status === 'not_applicable' ? '—' : '…';
          return `<td><span class="matrix-status ${status}">${mark}</span></td>`;
        }).join('');
      }).join('');
      return `<tr><th scope="row">${esc(variantRow.label)}</th>${cells}</tr>`;
    }).join('');
    $('#coverage-table').innerHTML = `${cols}<thead>${first}${second}</thead><tbody>${body}</tbody>`;
  }

  function downloadCsv() {
    const current = state();
    const leaves = makeLeaves(current);
    const matching = matchingRows(current);
    const rowIndex = new Map(matching.map(row => [`${row.model}/${row.variant}/${leafKeyFor(row, current)}`, row]));
    const output = [['模型', '权重', '数据集', '分组', '人群', '样本数', '指标', '数值']];
    for (const model of models.filter(row => current.models.includes(row.id))) {
      for (const variant of variants.filter(row => current.variant === 'all' || row.id === current.variant)) {
        for (const leaf of leaves) {
          const row = rowIndex.get(`${model.id}/${variant.id}/${leaf.key}`);
          output.push([
            model.label, variant.label, leaf.dataset, leaf.group, cohortNames[leaf.cohort], row?.n ?? '',
            current.metric.toUpperCase(), Number.isFinite(row?.[current.metric]) ? row[current.metric] : '',
          ]);
        }
      }
    }
    const csv = output.map(row => row.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob([`\ufeff${csv}\r\n`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: `audiobench-${current.metric}-matrix.csv` });
    link.click();
    URL.revokeObjectURL(url);
  }

  function syncModelSelection() {
    const options = [...document.querySelectorAll('.model-option')];
    const selectedCount = options.filter(input => input.checked).length;
    const all = $('#all-models');
    all.checked = selectedCount === options.length;
    all.indeterminate = selectedCount > 0 && selectedCount < options.length;
    refreshConditionalFilters();
    renderResultMatrix();
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

  $('#all-models').addEventListener('change', event => {
    document.querySelectorAll('.model-option').forEach(input => { input.checked = event.currentTarget.checked; });
    refreshConditionalFilters();
    renderResultMatrix();
  });
  $('#model-options').addEventListener('change', syncModelSelection);
  inventoryForm.addEventListener('change', renderCoverage);
  resultsForm.addEventListener('change', () => { refreshConditionalFilters(); renderResultMatrix(); });
  $('#export').addEventListener('click', downloadCsv);
  $('#inventory-tab').addEventListener('click', event => activateTab(event.currentTarget));
  $('#results-tab').addEventListener('click', event => activateTab(event.currentTarget));

  refreshConditionalFilters();
  renderCoverage();
  renderResultMatrix();
})();
