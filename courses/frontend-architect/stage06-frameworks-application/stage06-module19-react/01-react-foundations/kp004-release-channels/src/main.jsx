import React from 'react';
import { createRoot } from 'react-dom/client';

function detectChannel(version) {
  if (version.includes('experimental')) {
    return 'Experimental';
  }

  if (version.includes('canary')) {
    return 'Canary';
  }

  return 'Latest / Stable';
}

const samples = [
  {
    version: React.version,
    note: '当前项目实际安装并运行的 React 版本',
  },
  {
    version: '19.3.0-canary-example-20260801',
    note: 'Canary 版本字符串示例',
  },
  {
    version: '0.0.0-experimental-example-20260801',
    note: 'Experimental 版本字符串示例',
  },
];

const policies = {
  'Latest / Stable': '普通业务应用默认选择，遵循 SemVer。',
  Canary: '用于受控、固定版本并经过集成测试的提前采用场景。',
  Experimental: '仅用于实验验证，不作为普通生产业务默认依赖。',
};

function App() {
  return (
    <main>
      <p>课程稳定主线：React 19.2.x</p>
      <h1>React 发布渠道不是“功能等级”，而是稳定性承诺</h1>
      <ul>
        {samples.map((sample) => {
          const channel = detectChannel(sample.version);

          return (
            <li key={sample.version}>
              <strong>{sample.version}</strong>
              <br />
              渠道：{channel}
              <br />
              说明：{policies[channel]}
              <br />
              <small>{sample.note}</small>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
