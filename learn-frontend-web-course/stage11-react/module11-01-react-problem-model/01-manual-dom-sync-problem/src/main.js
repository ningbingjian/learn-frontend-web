import './styles.css';

const MAX_APPROVALS = 5;

function createInitialState() {
  return {
    approvedCount: 2,
    serviceOnline: true,
  };
}

function deriveView(state) {
  const remaining = Math.max(MAX_APPROVALS - state.approvedCount, 0);
  const progress = Math.round((state.approvedCount / MAX_APPROVALS) * 100);
  const ready = state.serviceOnline && remaining === 0;
  const serviceLabel = state.serviceOnline ? '在线' : '离线';
  const summary = state.serviceOnline
    ? remaining === 0
      ? '全部审批完成，可以开始发布。'
      : `服务在线，仍有 ${remaining} 项审批未完成。`
    : `服务离线，当前还有 ${remaining} 项审批未完成。`;

  return {
    ...state,
    remaining,
    progress,
    ready,
    serviceLabel,
    summary,
  };
}

function getPanelRefs(panelName) {
  const panel = document.querySelector(`[data-panel="${panelName}"]`);

  if (!(panel instanceof HTMLElement)) {
    throw new Error(`找不到面板：${panelName}`);
  }

  const get = (selector) => {
    const element = panel.querySelector(selector);
    if (!(element instanceof HTMLElement)) {
      throw new Error(`面板 ${panelName} 缺少元素：${selector}`);
    }
    return element;
  };

  return {
    panel,
    count: get('[data-role="count"]'),
    status: get('[data-role="status"]'),
    progress: get('[data-role="progress"]'),
    progressLabel: get('[data-role="progress-label"]'),
    summary: get('[data-role="summary"]'),
    diagnostic: get('[data-role="diagnostic"]'),
    releaseButton: get('[data-role="release"]'),
    approveButton: get('[data-action="approve"]'),
    toggleButton: get('[data-action="toggle-service"]'),
    checkButton: get('[data-action="check"]'),
  };
}

function updateStatusAppearance(refs, online) {
  refs.status.textContent = online ? '在线' : '离线';
  refs.status.dataset.online = String(online);
  refs.panel.dataset.online = String(online);
}

function checkConsistency(refs, state) {
  const view = deriveView(state);
  const actualCount = Number(refs.count.textContent);
  const actualSummary = refs.summary.textContent?.trim() ?? '';
  const actualProgress = Number.parseInt(refs.progressLabel.textContent ?? '', 10);
  const actualDisabled = refs.releaseButton.hasAttribute('disabled');

  const problems = [];

  if (actualCount !== view.approvedCount) {
    problems.push(`数字卡片应为 ${view.approvedCount}，实际为 ${actualCount}`);
  }

  if (actualSummary !== view.summary) {
    problems.push(`摘要应为“${view.summary}”，实际为“${actualSummary}”`);
  }

  if (actualProgress !== view.progress) {
    problems.push(`进度应为 ${view.progress}%，实际为 ${actualProgress}%`);
  }

  if (actualDisabled === view.ready) {
    problems.push(`发布按钮 disabled 状态与 ready=${view.ready} 不一致`);
  }

  if (problems.length === 0) {
    refs.diagnostic.textContent = '检查通过：业务状态与全部界面输出一致。';
    refs.diagnostic.dataset.result = 'success';
    return;
  }

  refs.diagnostic.textContent = `发现 ${problems.length} 个问题：${problems.join('；')}`;
  refs.diagnostic.dataset.result = 'error';
}

function bindImperativePanel() {
  const state = createInitialState();
  const refs = getPanelRefs('imperative');
  const initialView = deriveView(state);

  refs.progress.style.width = `${initialView.progress}%`;

  refs.approveButton.addEventListener('click', () => {
    if (state.approvedCount >= MAX_APPROVALS) {
      return;
    }

    state.approvedCount += 1;

    // 分散命令式更新：当前事件只记得更新数字、进度和按钮。
    // 摘要被故意遗漏，用于复现状态与 DOM 不一致。
    const progress = Math.round((state.approvedCount / MAX_APPROVALS) * 100);
    refs.count.textContent = String(state.approvedCount);
    refs.progress.style.width = `${progress}%`;
    refs.progressLabel.textContent = `${progress}%`;
    refs.approveButton.toggleAttribute('disabled', state.approvedCount >= MAX_APPROVALS);
    refs.releaseButton.toggleAttribute(
      'disabled',
      !(state.serviceOnline && state.approvedCount === MAX_APPROVALS),
    );
  });

  refs.toggleButton.addEventListener('click', () => {
    state.serviceOnline = !state.serviceOnline;
    updateStatusAppearance(refs, state.serviceOnline);

    // 这个事件更新了摘要，但它依赖当前审批数再次拼装文本。
    // 业务规则开始复制到多个事件路径。
    const remaining = Math.max(MAX_APPROVALS - state.approvedCount, 0);
    refs.summary.textContent = state.serviceOnline
      ? remaining === 0
        ? '全部审批完成，可以开始发布。'
        : `服务在线，仍有 ${remaining} 项审批未完成。`
      : `服务离线，当前还有 ${remaining} 项审批未完成。`;
    refs.releaseButton.toggleAttribute(
      'disabled',
      !(state.serviceOnline && state.approvedCount === MAX_APPROVALS),
    );
  });

  refs.checkButton.addEventListener('click', () => {
    checkConsistency(refs, state);
  });
}

function bindDeclarativePanel() {
  const state = createInitialState();
  const refs = getPanelRefs('declarative');

  function render() {
    const view = deriveView(state);

    refs.count.textContent = String(view.approvedCount);
    updateStatusAppearance(refs, view.serviceOnline);
    refs.progress.style.width = `${view.progress}%`;
    refs.progressLabel.textContent = `${view.progress}%`;
    refs.summary.textContent = view.summary;
    refs.approveButton.toggleAttribute('disabled', view.approvedCount >= MAX_APPROVALS);
    refs.releaseButton.toggleAttribute('disabled', !view.ready);
  }

  refs.approveButton.addEventListener('click', () => {
    state.approvedCount = Math.min(state.approvedCount + 1, MAX_APPROVALS);
    render();
  });

  refs.toggleButton.addEventListener('click', () => {
    state.serviceOnline = !state.serviceOnline;
    render();
  });

  refs.checkButton.addEventListener('click', () => {
    checkConsistency(refs, state);
  });

  render();
}

bindImperativePanel();
bindDeclarativePanel();
