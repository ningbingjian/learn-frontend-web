# RE-KP005：React Compiler 1.0 已稳定的版本认知

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 React Compiler 1.0 已经是 Stable，而不是 Beta 或实验功能。
2. 说明 React Compiler 是 **构建期优化工具**，不是新的 React 运行时。
3. 建立“自动 memoization”第一层直觉，知道它想减少哪些人工性能优化负担。
4. 知道 React Compiler 的稳定并不等于所有项目都应该无脑开启。
5. 知道本节只学习 Compiler 的定位和版本状态，真正的安装、Vite 集成、调试和增量采用会在后续专章展开。

> **本节核心知识**：React Compiler 1.0 已稳定、它工作在构建期、核心目标是通过编译分析自动进行 memoization 优化。
>
> **实验辅助代码**：本节 React 页面只是把 Compiler 的位置、输入输出和版本状态可视化；`createRoot`、JSX、CSS、Vite 都不是本节新知识。

## 理论讲解

### 1. React Compiler 解决什么问题

React 组件会因为状态、Props 或上下文变化而重新执行。业务代码中经常出现性能优化手段：

```text
memo
useMemo
useCallback
```

这些 API 都有自己的适用场景，但如果开发者过早、过度地手写 memoization，会带来额外复杂度：

```text
需要判断哪里真的昂贵
需要维护依赖
需要理解引用稳定性
需要避免“为了优化而优化”
```

React Compiler 的目标之一，就是让编译器分析 React 代码，在能够证明安全的地方自动做 memoization 优化。

先建立下面的直觉：

```text
你写正常、符合 Rules of React 的组件
                ↓
        React Compiler 分析
                ↓
     生成带优化信息的代码
                ↓
           React 运行时执行
```

所以它不是：

```text
浏览器里又多了一个 React Compiler Runtime
```

而更接近：

```text
源代码
  ↓
构建阶段
  ↓
Compiler 优化
  ↓
JavaScript 产物
  ↓
React Runtime
```

### 2. React Compiler 1.0 已经 Stable

React 团队在 **2025-10-07** 发布 React Compiler 1.0，并明确将它称为第一个稳定版本、production-ready。

这意味着课程不能再把它描述为：

```text
未来趋势
实验能力
Beta 尝鲜功能
```

正确的课程定位应该是：

```text
React Compiler 1.0
        ↓
稳定的现代 React 能力
        ↓
可以进入正式学习路线
```

但“稳定”只说明：

```text
版本状态允许生产采用
```

不等于：

```text
每个现有项目都应该今天立刻打开
```

### 3. Compiler 是构建期工具，不是 React API

这点非常重要。

普通 React API 往往出现在业务代码里：

```jsx
useState(...)
useEffect(...)
useTransition(...)
```

React Compiler 不一样。

你通常不会在组件里写：

```js
ReactCompiler.optimize(component)
```

Compiler 主要被接入构建链，例如 Babel、Vite、Metro、Rsbuild 等工具链。

所以可以区分：

```text
React API
组件运行时调用

React Compiler
构建时分析和转换源码
```

### 4. “自动 memoization”应该怎么理解

初学阶段不要把它理解成：

> 有了 Compiler，以后 `memo`、`useMemo`、`useCallback` 全部失效。

更准确的第一层认识是：

> React Compiler 可以在很多场景里自动完成过去需要开发者手动表达的 memoization 优化，从而减少不必要的人工优化代码。

后面性能章节会继续学习：

```text
Profiler
memo
useMemo
useCallback
React Compiler
```

并建立正确顺序：

```text
先写正确、纯净的组件
        ↓
用 Profiler 找真实问题
        ↓
理解 Compiler 自动优化
        ↓
仍有必要时再做针对性优化
```

### 5. Compiler 为什么强调 Rules of React

Compiler 需要分析组件的数据流、可变性和依赖关系。

如果代码违反 React 规则，例如在渲染过程中制造不可预测副作用、破坏纯渲染等，编译器很难安全地进行优化。

因此 Compiler 稳定之后，React 的规则反而更重要：

```text
Rules of React
      ↓
代码更容易被静态分析
      ↓
Compiler 更容易安全优化
```

React 团队也把 Compiler 相关 lint 规则整合进 `eslint-plugin-react-hooks` 的推荐规则体系。

### 6. React 17 / 18 / 19 的兼容认知

React Compiler 1.0 最适合 React 19，但也支持 React 17 和 React 18。

对于低于 React 19 的项目，需要额外考虑 target 和 `react-compiler-runtime` 等兼容配置。

本课程当前 React 主线已经固定在 React 19.2.x，因此早期学习不需要先处理这些兼容细节。

这里只记住：

```text
React 19
Compiler 使用路径最直接

React 17 / 18
可以使用，但需要额外兼容配置
```

### 7. 为什么本节不直接开启 Compiler

这是课程边界设计。

RE-KP005 位于 Chapter 01，它承担的是：

```text
先知道这个能力已经稳定
先知道它是什么
先知道它不是什么
```

而不是一次性学习：

```text
安装 babel-plugin-react-compiler
Vite 集成
ESLint Compiler Rules
compilationMode
target
Bailout
'use memo'
'use no memo'
调试编译结果
```

这些内容已经在 **Chapter 25：性能分析、Memoization 与 React Compiler** 中规划为 RE-KP250～RE-KP257。

所以本节不会为了“看起来高级”而提前把后面的知识塞进来。

## 动手编码：从 0 到 1

本节不真正启用 Compiler，而是做一个“Compiler 位于 React 工程哪一层”的认知实验。

最终页面会把下面链路展示出来：

```text
React Source
    ↓
React Compiler（Build Time）
    ↓
Optimized JavaScript
    ↓
React Runtime
```

### 第 0 步：明确实验目标

我们验证三个问题：

1. Compiler 是否属于构建期。
2. Compiler 的核心优化方向是什么。
3. Stable 与“必须立即启用”是不是同一回事。

### 第 1 步：准备课程共享环境

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次运行：

```bash
npm install
```

本知识点复用已有 React + Vite 环境。

> 本节不会新增 `babel-plugin-react-compiler`，因为真正的 Compiler 安装和配置属于 Chapter 25。

### 第 2 步：创建页面入口

创建：

```text
kp005-react-compiler-version/
├── index.html
└── src/
    └── main.jsx
```

`index.html` 继续只提供 `root`：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 3 步：先定义 Compiler 的事实数据

在 `src/main.jsx` 中先写：

```jsx
const compilerFacts = [
  ['Release', 'React Compiler 1.0'],
  ['Status', 'Stable / Production-ready'],
  ['Stage', 'Build time'],
  ['Goal', 'Automatic memoization'],
];
```

为什么先写数据？

因为本节不是练复杂交互，而是把四个最重要的认知做成可以一眼核对的页面。

### 第 4 步：描述构建链路

继续准备：

```jsx
const pipeline = [
  'React Source',
  'React Compiler',
  'Optimized JavaScript',
  'React Runtime',
];
```

这里最重要的是位置：

```text
Source
 ↓
Compiler
 ↓
JavaScript
 ↓
Runtime
```

不要把 Compiler 放在 Runtime 后面。

### 第 5 步：渲染认知卡片

创建组件：

```jsx
function App() {
  return (
    <main>
      <h1>React Compiler 1.0</h1>
      <p>Stable build-time optimizer</p>

      <ul>
        {compilerFacts.map(([label, value]) => (
          <li key={label}>
            <strong>{label}:</strong> {value}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

这里 JSX 只是展示工具。

### 第 6 步：把 Pipeline 展示出来

增加：

```jsx
<ol>
  {pipeline.map((stage) => (
    <li key={stage}>{stage}</li>
  ))}
</ol>
```

运行以后，检查顺序是否为：

```text
React Source
React Compiler
Optimized JavaScript
React Runtime
```

### 第 7 步：补上课程边界提示

页面最后加入：

```jsx
<p>
  本课只建立版本和职责认知；安装、Vite 集成、lint、调试将在 React Compiler 专章学习。
</p>
```

这一步很重要，因为学习者不应该误以为：

```text
“我看完这一课，就已经把 Compiler 用起来了。”
```

### 第 8 步：运行案例

在模块根目录执行：

```bash
npm run dev -- ./01-react-foundations/kp005-react-compiler-version --config ./vite.config.js
```

浏览器中应能看到 Compiler 1.0 状态卡片和完整 Pipeline。

### 第 9 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)

本节最后只需要分清：

- **核心知识**：Compiler 1.0 已稳定；它属于构建期；核心目标是自动 memoization；稳定不等于所有项目无脑开启。
- **实验辅助代码**：React 页面、JSX、`createRoot`、Vite 命令只是为了展示这些认知。

## 运行案例

进入模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

安装依赖：

```bash
npm install
```

运行：

```bash
npm run dev -- ./01-react-foundations/kp005-react-compiler-version --config ./vite.config.js
```

## 效果验证

完成后请确认自己能够回答：

1. React Compiler 1.0 是 Stable、Beta 还是 Experimental？
2. Compiler 在源码运行前还是运行后工作？
3. “自动 memoization”解决的是什么方向的问题？
4. Compiler 是否等于新的 React Runtime？
5. 为什么课程没有在 RE-KP005 就直接开启 Compiler？
6. React 17/18 能不能使用 React Compiler？

如果你只能背一句：

```text
React Compiler = 自动优化
```

还不够。

你应该能够画出：

```text
React Source
    ↓
Compiler（Build Time）
    ↓
Optimized JavaScript
    ↓
React Runtime
```

并解释每一层的职责。
