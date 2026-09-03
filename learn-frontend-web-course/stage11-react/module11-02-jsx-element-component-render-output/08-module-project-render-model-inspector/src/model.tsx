import {
  Fragment,
  isValidElement,
  type ReactElement,
} from 'react';

export type ScenarioId = 'host' | 'component' | 'fragment' | 'empty';

export type ScenarioDefinition = {
  id: ScenarioId;
  title: string;
  subtitle: string;
  source: string;
  transform: string;
  outputExpectation: string;
  createDescriptor: (revision: number) => ReactElement;
};

export type ElementInspection = {
  validElement: boolean;
  typeKind: string;
  typeName: string;
  key: string;
  propKeys: string[];
  childrenKind: string;
  frozen: boolean;
};

export function ReleaseCard({ revision }: { revision: number }) {
  console.log(`[Render] ReleaseCard revision=${revision}`);

  return (
    <article className="scenario-output release-card" data-revision={revision}>
      <p className="output-label">Component Render Output</p>
      <h3>Release Card</h3>
      <p>Visible revision: {revision}</p>
    </article>
  );
}

export function EmptyDecision({ revision }: { revision: number }) {
  console.log(`[Render] EmptyDecision revision=${revision}`);

  return revision % 2 === 0 ? (
    <p className="scenario-output empty-decision-output">
      Revision {revision} 是偶数，因此产生可见 Host Node。
    </p>
  ) : null;
}

export const scenarios: readonly ScenarioDefinition[] = [
  {
    id: 'host',
    title: 'Host Element',
    subtitle: 'Element.type 是字符串，React 最终创建对应 Host Node。',
    source: `<section data-revision={revision}>\n  <h3>Host Element</h3>\n  <p>Revision: {revision}</p>\n</section>`,
    transform: `jsx("section", {\n  "data-revision": revision,\n  children: [...]\n})`,
    outputExpectation: 'Component 调用：无；最终 Host DOM：section。',
    createDescriptor: (revision) => (
      <section className="scenario-output host-output" data-revision={revision}>
        <p className="output-label">Host Element Description</p>
        <h3>Host Element</h3>
        <p>Visible revision: {revision}</p>
      </section>
    ),
  },
  {
    id: 'component',
    title: 'Component Element',
    subtitle: 'Element.type 指向 ReleaseCard，React 在 Render 中调用组件。',
    source: `<ReleaseCard revision={revision} />`,
    transform: `jsx(ReleaseCard, { revision })`,
    outputExpectation:
      'Component 调用：ReleaseCard；Render Output：article Element；Host DOM：article。',
    createDescriptor: (revision) => <ReleaseCard revision={revision} />,
  },
  {
    id: 'fragment',
    title: 'Fragment',
    subtitle: '有效 React Element，但不创建额外 Host Wrapper。',
    source: `<Fragment>\n  <strong>Fragment Child A</strong>\n  <span>Fragment Child B</span>\n</Fragment>`,
    transform: `jsxs(Fragment, { children: [...] })`,
    outputExpectation:
      '最终 Host DOM：strong 与 span 直接成为 Preview 容器的 children。',
    createDescriptor: (revision) => (
      <Fragment>
        <strong className="fragment-child">Fragment Child A · {revision}</strong>
        <span className="fragment-child">Fragment Child B · {revision}</span>
      </Fragment>
    ),
  },
  {
    id: 'empty',
    title: 'Conditional Empty Node',
    subtitle: 'Component Element 有效，但组件可以返回 null。',
    source: `<EmptyDecision revision={revision} />`,
    transform: `jsx(EmptyDecision, { revision })`,
    outputExpectation:
      '奇数 revision 返回 null；偶数 revision 返回 p Element。',
    createDescriptor: (revision) => <EmptyDecision revision={revision} />,
  },
] as const;

export function getScenario(id: ScenarioId) {
  const scenario = scenarios.find((candidate) => candidate.id === id);

  if (!scenario) {
    throw new Error(`Unknown scenario: ${id}`);
  }

  return scenario;
}

function describeType(type: unknown) {
  if (typeof type === 'string') {
    return { kind: 'string / Host Type', name: type };
  }

  if (typeof type === 'function') {
    return {
      kind: 'function / Component Type',
      name: type.name || '(anonymous component)',
    };
  }

  if (typeof type === 'symbol') {
    return { kind: 'symbol / React Special Type', name: String(type) };
  }

  return { kind: typeof type, name: String(type) };
}

function describeChildren(children: unknown) {
  if (children === null || children === undefined || children === false) {
    return 'empty-like';
  }

  if (Array.isArray(children)) {
    return `array(${children.length})`;
  }

  return typeof children;
}

export function inspectElement(value: unknown): ElementInspection {
  if (!isValidElement(value)) {
    return {
      validElement: false,
      typeKind: 'n/a',
      typeName: 'n/a',
      key: 'n/a',
      propKeys: [],
      childrenKind: 'n/a',
      frozen: false,
    };
  }

  const props = value.props as Record<string, unknown>;
  const typeDescription = describeType(value.type);

  return {
    validElement: true,
    typeKind: typeDescription.kind,
    typeName: typeDescription.name,
    key: value.key === null ? '(none)' : String(value.key),
    propKeys: Object.keys(props).sort(),
    childrenKind: describeChildren(props.children),
    frozen: Object.isFrozen(value),
  };
}
