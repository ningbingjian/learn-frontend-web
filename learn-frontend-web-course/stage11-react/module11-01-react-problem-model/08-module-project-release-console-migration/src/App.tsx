import { useState } from 'react';

type Environment = 'staging' | 'production';

interface ApprovalItem {
  id: string;
  label: string;
  completed: boolean;
}

const initialApprovals: ApprovalItem[] = [
  { id: 'schema', label: '数据库变更已预演', completed: true },
  { id: 'load', label: '核心接口压测通过', completed: true },
  { id: 'rollback', label: '灰度与回滚方案已确认', completed: false },
  { id: 'owner', label: '值班负责人已确认', completed: false },
];

interface EnvironmentSelectorProps {
  environment: Environment;
  onChange: (environment: Environment) => void;
}

function EnvironmentSelector({
  environment,
  onChange,
}: EnvironmentSelectorProps) {
  return (
    <fieldset className="environment-selector">
      <legend>发布环境</legend>
      <label>
        <input
          type="radio"
          name="environment"
          value="staging"
          checked={environment === 'staging'}
          onChange={() => onChange('staging')}
        />
        Staging
      </label>
      <label>
        <input
          type="radio"
          name="environment"
          value="production"
          checked={environment === 'production'}
          onChange={() => onChange('production')}
        />
        Production
      </label>
    </fieldset>
  );
}

interface ApprovalChecklistProps {
  approvals: ApprovalItem[];
  onToggle: (id: string) => void;
}

function ApprovalChecklist({
  approvals,
  onToggle,
}: ApprovalChecklistProps) {
  return (
    <section aria-labelledby="approval-list-title">
      <div className="section-heading">
        <div>
          <p className="console-label">Component: ApprovalChecklist</p>
          <h3 id="approval-list-title">上线检查项</h3>
        </div>
        <span>{approvals.length} 项</span>
      </div>

      <ul className="approval-list">
        {approvals.map((approval) => (
          <li key={approval.id}>
            <label>
              <input
                type="checkbox"
                checked={approval.completed}
                onChange={() => onToggle(approval.id)}
              />
              <span>{approval.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface ReleaseDecisionProps {
  environment: Environment;
  serviceOnline: boolean;
  completedCount: number;
  totalCount: number;
  ready: boolean;
  releaseMessage: string;
  onRelease: () => void;
}

function ReleaseDecision({
  environment,
  serviceOnline,
  completedCount,
  totalCount,
  ready,
  releaseMessage,
  onRelease,
}: ReleaseDecisionProps) {
  const remaining = totalCount - completedCount;
  const summary = ready
    ? `${environment} 环境满足发布条件。`
    : `${environment} 环境仍有 ${remaining} 项未完成，服务${
        serviceOnline ? '在线' : '离线'
      }。`;

  return (
    <section className="decision" aria-labelledby="decision-title">
      <p className="console-label">Component: ReleaseDecision</p>
      <h3 id="decision-title">发布决策</h3>
      <p className="summary" aria-live="polite">
        {summary}
      </p>
      <button
        type="button"
        className="release-button"
        disabled={!ready}
        onClick={onRelease}
      >
        {ready ? '执行发布' : '发布条件未满足'}
      </button>
      <p className="release-message" aria-live="polite">
        {releaseMessage}
      </p>
    </section>
  );
}

export function App() {
  const [environment, setEnvironment] = useState<Environment>('staging');
  const [serviceOnline, setServiceOnline] = useState(true);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [releaseMessage, setReleaseMessage] = useState('尚未执行发布。');

  const completedCount = approvals.filter((approval) => approval.completed).length;
  const remaining = approvals.length - completedCount;
  const progress = Math.round((completedCount / approvals.length) * 100);
  const ready = serviceOnline && remaining === 0;

  function toggleApproval(id: string) {
    setApprovals((current) =>
      current.map((approval) =>
        approval.id === id
          ? { ...approval, completed: !approval.completed }
          : approval,
      ),
    );
    setReleaseMessage('检查项发生变化，请重新确认发布条件。');
  }

  function reset() {
    setEnvironment('staging');
    setServiceOnline(true);
    setApprovals(initialApprovals.map((approval) => ({ ...approval })));
    setReleaseMessage('已恢复迁移项目初始状态。');
  }

  return (
    <article className="console-card console-card--react">
      <p className="console-label">React State Owner: App</p>

      <div className="status-row">
        <strong>{serviceOnline ? '服务在线' : '服务离线'}</strong>
        <span>{progress}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="React 发布准备度"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <EnvironmentSelector
        environment={environment}
        onChange={(nextEnvironment) => {
          setEnvironment(nextEnvironment);
          setReleaseMessage('环境发生变化，请重新确认发布条件。');
        }}
      />

      <label className="service-toggle">
        <input
          type="checkbox"
          checked={serviceOnline}
          onChange={() => {
            setServiceOnline((online) => !online);
            setReleaseMessage('服务状态发生变化，请重新确认发布条件。');
          }}
        />
        发布服务在线
      </label>

      <ApprovalChecklist approvals={approvals} onToggle={toggleApproval} />

      <ReleaseDecision
        environment={environment}
        serviceOnline={serviceOnline}
        completedCount={completedCount}
        totalCount={approvals.length}
        ready={ready}
        releaseMessage={releaseMessage}
        onRelease={() =>
          setReleaseMessage(
            `${environment} 发布请求已提交；本课程只模拟前端决策，不调用真实服务。`,
          )
        }
      />

      <button type="button" className="reset-button" onClick={reset}>
        重置 React 控制台
      </button>

      <aside className="architecture-note">
        <strong>迁移结果：</strong>
        App 保存 environment、serviceOnline、approvals 和 releaseMessage；
        remaining、progress、ready 与 summary 均在 Render 中派生。
      </aside>
    </article>
  );
}
