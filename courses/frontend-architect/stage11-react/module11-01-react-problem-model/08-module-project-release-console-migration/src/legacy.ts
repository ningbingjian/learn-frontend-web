interface LegacyState {
  approvedCount: number;
  serviceOnline: boolean;
}

const MAX_APPROVALS = 4;

function requireChild(container: HTMLElement, selector: string): HTMLElement {
  const element = container.querySelector(selector);

  if (!(element instanceof HTMLElement)) {
    throw new Error(`遗留控制台缺少节点：${selector}`);
  }

  return element;
}

function expectedSummary(state: LegacyState): string {
  const remaining = MAX_APPROVALS - state.approvedCount;

  if (!state.serviceOnline) {
    return `服务离线，仍有 ${remaining} 项审批未完成。`;
  }

  return remaining === 0
    ? '审批全部完成，可以发布。'
    : `服务在线，仍有 ${remaining} 项审批未完成。`;
}

export function mountLegacyConsole(container: HTMLElement) {
  container.innerHTML = `
    <article class="console-card console-card--legacy">
      <p class="console-label">Manual DOM ownership</p>
      <div class="status-row">
        <strong data-role="legacy-service">服务在线</strong>
        <span data-role="legacy-progress-label">50%</span>
      </div>
      <div class="progress-track" aria-hidden="true">
        <div class="progress-bar" data-role="legacy-progress"></div>
      </div>
      <p>已完成：<strong data-role="legacy-count">2</strong> / ${MAX_APPROVALS}</p>
      <p class="summary" data-role="legacy-summary">
        服务在线，仍有 2 项审批未完成。
      </p>
      <div class="actions">
        <button type="button" data-action="legacy-approve">通过下一项</button>
        <button type="button" class="secondary" data-action="legacy-toggle">
          切换服务状态
        </button>
        <button type="button" class="secondary" data-action="legacy-check">
          检查一致性
        </button>
      </div>
      <p class="diagnostic" data-role="legacy-diagnostic" aria-live="polite">
        尚未执行一致性检查。
      </p>
      <button type="button" class="release-button" data-role="legacy-release" disabled>
        发布条件未满足
      </button>
    </article>
  `;

  const state: LegacyState = {
    approvedCount: 2,
    serviceOnline: true,
  };

  const count = requireChild(container, '[data-role="legacy-count"]');
  const service = requireChild(container, '[data-role="legacy-service"]');
  const progress = requireChild(container, '[data-role="legacy-progress"]');
  const progressLabel = requireChild(container, '[data-role="legacy-progress-label"]');
  const summary = requireChild(container, '[data-role="legacy-summary"]');
  const diagnostic = requireChild(container, '[data-role="legacy-diagnostic"]');
  const releaseButton = requireChild(container, '[data-role="legacy-release"]');
  const approveButton = requireChild(container, '[data-action="legacy-approve"]');
  const toggleButton = requireChild(container, '[data-action="legacy-toggle"]');
  const checkButton = requireChild(container, '[data-action="legacy-check"]');

  progress.style.width = '50%';

  approveButton.addEventListener('click', () => {
    state.approvedCount = Math.min(state.approvedCount + 1, MAX_APPROVALS);

    const progressValue = Math.round(
      (state.approvedCount / MAX_APPROVALS) * 100,
    );
    const ready = state.serviceOnline && state.approvedCount === MAX_APPROVALS;

    count.textContent = String(state.approvedCount);
    progress.style.width = `${progressValue}%`;
    progressLabel.textContent = `${progressValue}%`;
    approveButton.toggleAttribute('disabled', state.approvedCount >= MAX_APPROVALS);
    releaseButton.toggleAttribute('disabled', !ready);
    releaseButton.textContent = ready ? '开始发布' : '发布条件未满足';

    // 故意遗漏 summary：这是迁移前必须被记录和复现的同步缺陷。
  });

  toggleButton.addEventListener('click', () => {
    state.serviceOnline = !state.serviceOnline;
    const ready = state.serviceOnline && state.approvedCount === MAX_APPROVALS;

    service.textContent = state.serviceOnline ? '服务在线' : '服务离线';
    summary.textContent = expectedSummary(state);
    releaseButton.toggleAttribute('disabled', !ready);
    releaseButton.textContent = ready ? '开始发布' : '发布条件未满足';
  });

  checkButton.addEventListener('click', () => {
    const expected = expectedSummary(state);
    const actual = summary.textContent?.trim() ?? '';

    diagnostic.textContent =
      expected === actual
        ? '检查通过：当前 DOM 与业务状态一致。'
        : `发现迁移前缺陷：摘要应为“${expected}”，实际为“${actual}”。`;
  });
}
