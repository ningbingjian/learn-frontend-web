import { createRoot } from 'react-dom/client';
import './styles.css';

type RiskLevel = 'high' | 'medium' | 'low';

interface ReleaseCheck {
  id: string;
  title: string;
  owner: string;
  level: RiskLevel;
}

const checks: ReleaseCheck[] = [
  {
    id: 'CHECK-001',
    title: '数据库变更已经完成预演',
    owner: '数据平台组',
    level: 'high',
  },
  {
    id: 'CHECK-002',
    title: '核心接口压测结果符合预算',
    owner: '交易平台组',
    level: 'medium',
  },
  {
    id: 'CHECK-003',
    title: '灰度与回滚步骤已确认',
    owner: 'SRE',
    level: 'low',
  },
];

const levelLabel: Record<RiskLevel, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险',
};

function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1101-002 · React Root</p>
        <h1>发布检查台</h1>
        <p className="lead">
          现在看到的 main、section、ul 和 li 都来自 App 的 Render Output，
          React 只管理 #root 内部的 DOM 子树。
        </p>
      </header>

      <section className="workspace" aria-labelledby="check-title">
        <div className="workspace__heading">
          <div>
            <p className="section-label">Release Gate</p>
            <h2 id="check-title">上线前检查项</h2>
          </div>
          <span className="total">{checks.length} 项</span>
        </div>

        <ul className="check-list">
          {checks.map((check) => (
            <li className="check-card" key={check.id}>
              <div>
                <p className="check-id">{check.id}</p>
                <h3>{check.title}</h3>
                <p className="owner">负责人：{check.owner}</p>
              </div>
              <span className={`risk risk--${check.level}`}>
                {levelLabel[check.level]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <aside className="boundary-note">
        <strong>管理边界：</strong>
        <span>Host Document → #root → React Root → App Render Output</span>
      </aside>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

const root = createRoot(container);
root.render(<App />);
