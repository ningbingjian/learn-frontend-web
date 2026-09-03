import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Environment = 'staging' | 'production';
type Density = 'comfortable' | 'compact';

interface ReleaseOwner {
  readonly name: string;
  readonly team: string;
}

interface ReleaseSnapshot {
  readonly id: string;
  readonly version: string;
  readonly environment: Environment;
  readonly owner: ReleaseOwner;
  readonly riskCount: number;
  readonly approved: boolean;
}

interface ReleaseCardProps {
  readonly release: ReleaseSnapshot;
  readonly density?: Density;
  readonly showOwner?: boolean;
}

function ReleaseCard({
  release,
  density = 'comfortable',
  showOwner = true,
}: ReleaseCardProps) {
  console.log('[Render] ReleaseCard received props', {
    release,
    density,
    showOwner,
  });

  const decision = release.approved && release.riskCount === 0
    ? '可以进入发布窗口'
    : '仍需完成风险处置';

  return (
    <article
      className={`release-card release-card--${density}`}
      data-environment={release.environment}
    >
      <div className="release-card__heading">
        <div>
          <p className="eyebrow">{release.environment}</p>
          <h2>{release.id}</h2>
        </div>
        <span className={release.approved ? 'status status--ready' : 'status'}>
          {release.approved ? '已审批' : '待审批'}
        </span>
      </div>

      <dl className="facts">
        <div>
          <dt>版本</dt>
          <dd>{release.version}</dd>
        </div>
        <div>
          <dt>风险项</dt>
          <dd>{release.riskCount}</dd>
        </div>
        {showOwner ? (
          <div>
            <dt>负责人</dt>
            <dd>{release.owner.name} · {release.owner.team}</dd>
          </div>
        ) : null}
      </dl>

      <p className="decision">{decision}</p>
    </article>
  );
}

function App() {
  const [environment, setEnvironment] = useState<Environment>('staging');
  const [riskCount, setRiskCount] = useState(2);
  const [approved, setApproved] = useState(false);

  const currentRelease: ReleaseSnapshot = {
    id: 'REL-2026-0903',
    version: 'v3.8.0',
    environment,
    owner: {
      name: '宁炳剑',
      team: 'Delivery Platform',
    },
    riskCount,
    approved,
  };

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1103-001 · Props Contract</p>
        <h1>Props 是组件的只读输入，不是组件自己的可变数据仓库</h1>
        <p>
          父组件创建当前输入，子组件读取并据此计算 UI。要改变输入，应该由父组件生成并传入下一份 props。
        </p>
      </header>

      <section className="workspace" aria-labelledby="controls-title">
        <div className="control-panel">
          <div>
            <p className="eyebrow">Parent controls</p>
            <h2 id="controls-title">父组件负责产生下一份输入</h2>
          </div>

          <label>
            环境
            <select
              value={environment}
              onChange={(event) => {
                setEnvironment(event.target.value as Environment);
              }}
            >
              <option value="staging">staging</option>
              <option value="production">production</option>
            </select>
          </label>

          <label>
            风险项
            <input
              type="range"
              min="0"
              max="5"
              value={riskCount}
              onChange={(event) => {
                setRiskCount(Number(event.target.value));
              }}
            />
            <output>{riskCount}</output>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={approved}
              onChange={(event) => {
                setApproved(event.target.checked);
              }}
            />
            审批已完成
          </label>
        </div>

        <div className="preview-stack">
          <ReleaseCard release={currentRelease} />

          <ReleaseCard
            release={{
              ...currentRelease,
              id: 'REL-2026-0903-COMPACT',
              version: 'v3.8.0-rc.2',
            }}
            density="compact"
            showOwner={false}
          />
        </div>
      </section>

      <section className="evidence-grid" aria-label="Props evidence">
        <article>
          <p className="eyebrow">Input contract</p>
          <h2>同一个组件，不同 props</h2>
          <p>
            两张卡片复用同一个 ReleaseCard 实现，但由不同输入决定密度和可见信息。
          </p>
        </article>
        <article>
          <p className="eyebrow">Default values</p>
          <h2>缺省参数属于 API</h2>
          <p>
            第一张卡片省略 density 与 showOwner，组件使用 comfortable 和 true。
          </p>
        </article>
        <article>
          <p className="eyebrow">Ownership</p>
          <h2>子组件只读取</h2>
          <p>
            ReleaseCard 不修改 release；交互发生在父组件，随后传入下一份输入。
          </p>
        </article>
      </section>

      <aside className="note">
        打开 React DevTools，选择两个 ReleaseCard，比较它们的 Props。再操作左侧控件，观察同一组件收到的新输入。
      </aside>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('缺少 #root 容器。');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
