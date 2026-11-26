(() => {
  const data = window.AUDIOBENCH_MATRIX_DATA;
  if (!data) return;

  const $ = selector => document.querySelector(selector);
  const form = $('#filters');
  const models = data.models;
  const variants = data.variants;
  const datasets = [...data.datasets, { id: 'assistive', label: '辅助性场景', healthy: true }];
  const modelNames = new Map(models.map(item => [item.id, item.label]));
  const variantNames = new Map(variants.map(item => [item.id, item.label]));
  const statusNames = { complete: '已评测', not_evaluated: '待评测', not_applicable: '不适用' };
  const rowLabels = { disease: '疾病组', healthy: '健康组' };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const statusMark = status => status === 'complete' ? '✓' : status === 'not_applicable' ? '—' : '…';

  function setOptions(select, entries, allLabel = '') {
    const options = allLabel ? [['all', allLabel], ...entries] : entries;
    select.innerHTML = options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
  }

  setOptions(form.elements.model, models.map(item => [item.id, item.label]));
  form.elements.model.value = models[0]?.id || '';
  setOptions(form.elements.variant, variants.map(item => [item.id, item.label]), '全部权重');
  setOptions(form.elements.dataset, datasets.map(item => [item.id, item.label]), '全部数据集');

  const matrix = new Map(data.overall.records.map(row => [
    `${row.model}/${row.variant}/${row.dataset}/${row.cohort}`, row.status,
  ]));
  const assistive = new Map(data.assistive.records
    .filter(row => row.dimension === 'overall')
    .map(row => [`${row.model}/${row.variant}/${row.cohort}`, row.status]));

  function getStatus(model, variant, dataset, cohort) {
    if (dataset.id === 'assistive') return assistive.get(`${model}/${variant}/${cohort}`) || 'not_evaluated';
    return matrix.get(`${model}/${variant}/${dataset.id}/${cohort}`) || 'not_evaluated';
  }

  function render() {
    const model = form.elements.model.value;
    const variant = form.elements.variant.value;
    const dataset = form.elements.dataset.value;
    const visibleDatasets = datasets.filter(item => dataset === 'all' || item.id === dataset);
    const visibleVariants = variants.filter(item => variant === 'all' || item.id === variant);
    const firstHead = `<tr><th rowspan="2" scope="col">权重</th>${visibleDatasets.map(item => `<th scope="colgroup" colspan="${item.healthy ? 2 : 1}">${escapeHtml(item.label)}</th>`).join('')}</tr>`;
    const secondHead = `<tr>${visibleDatasets.map(item => `<th scope="col">${rowLabels.disease}</th>${item.healthy ? `<th scope="col">${rowLabels.healthy}</th>` : ''}`).join('')}</tr>`;
    const body = visibleVariants.map(item => {
      const cells = visibleDatasets.map(current => {
        const cohorts = current.healthy ? ['disease', 'healthy'] : ['disease'];
        return cohorts.map(cohort => {
          const status = getStatus(model, item.id, current, cohort);
          const label = `${modelNames.get(model)}，${item.label}，${current.label}，${rowLabels[cohort]}：${statusNames[status] || statusNames.not_evaluated}`;
          return `<td><span class="cell-mark ${status}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">${statusMark(status)}</span></td>`;
        }).join('');
      }).join('');
      return `<tr><th scope="row">${escapeHtml(item.label)}</th>${cells}</tr>`;
    }).join('');
    $('#coverage-table').innerHTML = `<thead>${firstHead}${secondHead}</thead><tbody>${body}</tbody>`;
    $('#coverage-table').setAttribute('aria-label', `${modelNames.get(model)}模型的数据集覆盖表`);
  }

  function csvCell(value) {
    return `"${String(value ?? '').replaceAll('"', '""')}"`;
  }

  function downloadCsv() {
    const model = form.elements.model.value;
    const variant = form.elements.variant.value;
    const dataset = form.elements.dataset.value;
    const visibleDatasets = datasets.filter(item => dataset === 'all' || item.id === dataset);
    const visibleVariants = variants.filter(item => variant === 'all' || item.id === variant);
    const rows = [['模型', '权重', '数据集', '人群', '状态']];
    for (const item of visibleVariants) {
      for (const current of visibleDatasets) {
        const cohorts = current.healthy ? ['disease', 'healthy'] : ['disease'];
        for (const cohort of cohorts) {
          const status = getStatus(model, item.id, current, cohort);
          rows.push([modelNames.get(model), item.label, current.label, rowLabels[cohort], statusNames[status] || statusNames.not_evaluated]);
        }
      }
    }
    const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob([`\ufeff${csv}\r\n`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: 'audiobench-coverage.csv' });
    link.click();
    URL.revokeObjectURL(url);
  }

  form.addEventListener('change', render);
  $('#export').addEventListener('click', downloadCsv);
  render();
})();
