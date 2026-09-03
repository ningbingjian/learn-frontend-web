import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface ReleaseWidgetProps {
  initialEnvironment: string;
}

function ReleaseWidget({ initialEnvironment }: ReleaseWidgetProps) {
  const [approvedCount, setApprovedCount] = useState(1);

  return (
    <article className="react-card">
      <p className="react-label">React Root A</p>
      <h2>发布审批组件</h2>
      <p>宿主通过 data-environment 提供初始参数：{initialEnvironment}</p>
      <strong className="widget-value">{approvedCount} / 3</strong>
      <button
        type="button"
        onClick={() => setApprovedCount((count) => Math.min(count + 1, 3))}
        disabled={approvedCount >= 3}
      >
        通过下一项审批
      </button>
    </article>
  );
}

function HealthWidget() {
  const [checkCount, setCheckCount] = useState(0);
  const healthy = checkCount > 0;

  return (
    <article className="react-card react-card--health">
      <p className="react-label">React Root B</p>
      <h3>{healthy ? '最近一次检查正常' : '尚未执行检查'}</h3>
      <p>检查次数：{checkCount}</p>
      <button type="button" onClick={() => setCheckCount((count) => count + 1)}>
        执行健康检查
      </button>
    </article>
  );
}

function requireElement(selector: string): HTMLElement {
  const element = document.querySelector(selector);

  if (!(element instanceof HTMLElement)) {
    throw new Error(`页面缺少必要节点：${selector}`);
  }

  return element;
}

const releaseContainer = requireElement('#release-widget-root');
const healthContainer = requireElement('#health-widget-root');
const legacyCounter = requireElement('#legacy-counter');
const hostLog = requireElement('#host-log');
const removeHealthButton = requireElement('#remove-health-widget');
const healthRootStatus = requireElement('#health-root-status');

const releaseRoot = createRoot(releaseContainer);
releaseRoot.render(
  <ReleaseWidget
    initialEnvironment={releaseContainer.dataset.environment ?? 'unknown'}
  />,
);

const healthRoot = createRoot(healthContainer);
healthRoot.render(<HealthWidget />);

let legacyClicks = 0;

legacyCounter.addEventListener('click', () => {
  legacyClicks += 1;
  legacyCounter.textContent = `宿主点击次数：${legacyClicks}`;
  hostLog.textContent = '宿主按钮只修改 React Root 之外的 DOM。';
});

removeHealthButton.addEventListener('click', () => {
  healthRoot.unmount();
  removeHealthButton.setAttribute('disabled', '');
  healthRootStatus.textContent =
    'Health Root 已卸载，React 已从该容器分离；Release Root 仍然正常运行。';
});
