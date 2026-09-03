import { useState, type ChangeEvent } from 'react';
import {
  getScenario,
  inspectElement,
  scenarios,
  type ScenarioId,
} from './model';

type AppProps = {
  onResetCommitEvidence: () => void;
};

function InspectionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="inspection-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function App({ onResetCommitEvidence }: AppProps) {
  const [scenarioId, setScenarioId] =
    useState<ScenarioId>('component');
  const [revision, setRevision] = useState(1);
  const [, setRenderRequest] = useState(0);

  const scenario = getScenario(scenarioId);
  const descriptor = scenario.createDescriptor(revision);
  const inspection = inspectElement(descriptor);

  console.log(
    `[Render] Inspector scenario=${scenario.id}, revision=${revision}`,
  );

  function changeScenario(event: ChangeEvent<HTMLSelectElement>) {
    setScenarioId(event.currentTarget.value as ScenarioId);
  }

  function requestRenderOnly() {
    console.log('[Event] request render-only calculation');
    setRenderRequest((value) => value + 1);
  }

  function requestVisibleCommit() {
    console.log('[Event] change visible revision');
    setRevision((value) => value + 1);
  }

  function resetInspector() {
    setScenarioId('component');
    setRevision(1);
    onResetCommitEvidence();
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">RE-1102-008 · Module Project</p>
          <h1>Render Model Inspector</h1>
          <p className="hero-copy">
            从 JSX Source 一直观察到 React Element、Component Render 与
            Browser DOM Commit，不把不同层级混成一个对象。
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={resetInspector}>
          重置 Inspector
        </button>
      </header>

      <section className="control-panel" aria-labelledby="scenario-control-title">
        <div>
          <p className="eyebrow">Scenario Control</p>
          <h2 id="scenario-control-title">选择 Render Model 场景</h2>
        </div>

        <label>
          当前场景
          <select value={scenarioId} onChange={changeScenario}>
            {scenarios.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.title}
              </option>
            ))}
          </select>
        </label>

        <div className="actions">
          <button type="button" onClick={requestRenderOnly}>
            只请求 Render
          </button>
          <button type="button" onClick={requestVisibleCommit}>
            改变可见 Revision
          </button>
          <button type="button" onClick={onResetCommitEvidence}>
            清空 Commit Evidence
          </button>
        </div>
      </section>

      <section className="scenario-summary">
        <div>
          <p className="eyebrow">Current Scenario</p>
          <h2>{scenario.title}</h2>
          <p>{scenario.subtitle}</p>
        </div>
        <div className="revision-badge">
          Visible revision
          <strong>{revision}</strong>
        </div>
      </section>

      <div className="inspector-grid">
        <section className="inspector-card">
          <p className="eyebrow">01 · JSX Source</p>
          <h2>输入语法</h2>
          <pre><code>{scenario.source}</code></pre>
        </section>

        <section className="inspector-card">
          <p className="eyebrow">02 · Course-level Transform</p>
          <h2>Element Factory 模型</h2>
          <pre><code>{scenario.transform}</code></pre>
        </section>

        <section className="inspector-card">
          <p className="eyebrow">03 · Element Inspector</p>
          <h2>当前 Description</h2>
          <dl className="inspection-list">
            <InspectionRow
              label="isValidElement"
              value={String(inspection.validElement)}
            />
            <InspectionRow label="type kind" value={inspection.typeKind} />
            <InspectionRow label="type name" value={inspection.typeName} />
            <InspectionRow label="key" value={inspection.key} />
            <InspectionRow
              label="prop keys"
              value={inspection.propKeys.join(', ') || '(none)'}
            />
            <InspectionRow
              label="children kind"
              value={inspection.childrenKind}
            />
            <InspectionRow
              label="development frozen"
              value={String(inspection.frozen)}
            />
          </dl>
        </section>

        <section className="inspector-card">
          <p className="eyebrow">04 · Render Output Preview</p>
          <h2>React 管理的输出区域</h2>
          <div className="preview-frame">{descriptor}</div>
          <p className="expectation">{scenario.outputExpectation}</p>
        </section>
      </div>

      <section className="evidence-matrix">
        <div>
          <p className="eyebrow">05 · Evidence Matrix</p>
          <h2>每种工具只回答自己的问题</h2>
        </div>

        <div className="evidence-grid">
          <article>
            <strong>Console</strong>
            <p>证明 Component Function 参与 Render。</p>
          </article>
          <article>
            <strong>React DevTools</strong>
            <p>证明 Component Boundary 与 React Tree。</p>
          </article>
          <article>
            <strong>Elements</strong>
            <p>证明最终 Browser Host DOM。</p>
          </article>
          <article>
            <strong>MutationObserver</strong>
            <p>证明 Root 内真实 DOM mutation。</p>
          </article>
        </div>
      </section>

      <section className="timeline-card">
        <p className="eyebrow">06 · Mental Model</p>
        <h2>完整链路</h2>
        <ol>
          <li>JSX 在构建阶段转换为 Element Factory Call。</li>
          <li>Factory Call 产生 React Element Description。</li>
          <li>当 type 指向 Component 时，React 调用 Component Function。</li>
          <li>Component 返回 React Node / Render Output。</li>
          <li>React 继续展开和计算下一份 UI。</li>
          <li>只有必要变化在 Commit 阶段写入 Host DOM。</li>
        </ol>
      </section>
    </main>
  );
}
