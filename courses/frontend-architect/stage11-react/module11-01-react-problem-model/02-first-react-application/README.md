# RE-1101-002：创建第一个 React 应用

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must  
> 技术基线：React 19.2.x + TypeScript + Vite 8  
> 本课目标不是学习脚手架，而是看清 React 如何进入浏览器页面。

---

## 1. 本课要解决的问题

上一课已经看到：分散维护 DOM 同步点很容易让界面不一致。

现在要回答：

> React 到底从哪里进入页面？组件函数、React Root 和浏览器 DOM 之间是什么关系？

本课从一个空目录建立最小 React 应用，并把运行链路拆成四层：

```text
index.html 中的 DOM Container
  ↓
main.tsx 创建 React Root
  ↓
root.render(<App />)
  ↓
App 组件声明 Render Output
```

你会得到一个没有状态、没有路由、没有数据请求的最小应用。项目故意保持小，因为当前要证明的只有“React 如何接管一个 DOM 子树”。

---

## 2. 学习目标

完成本课后，你应该能够：

- 从空目录建立 React + TypeScript + Vite 项目。
- 解释 `react` 和 `react-dom` 的职责差异。
- 解释 `#root` 为什么只是普通 DOM Container。
- 解释 `createRoot(container)` 创建了什么边界。
- 解释 `<App />`、组件函数和最终 DOM 不是同一个对象。
- 说明 `StrictMode` 的开发期作用和边界。
- 使用浏览器 Elements、Console 和 React DevTools 观察应用。
- 执行开发启动和生产构建。

---

## 3. 起始状态

本课是独立 Lesson，不依赖上一课目录。

进入当前目录：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/02-first-react-application
```

最终目录：

```text
02-first-react-application/
├── README.md
├── package.json
├── index.html
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    └── styles.css
```

安装与运行：

```bash
npm install
npm run dev
```

打开终端输出的本地地址，应看到“Architect Workbench / React 已经接管这个区域”的页面。

构建验证：

```bash
npm run build
```

`build` 会先执行 TypeScript 静态检查，再执行 Vite 生产构建。

---

## 4. 先看依赖关系

打开：

```text
package.json
```

### `react`

提供组件、Hook、Fragment、StrictMode 等与 UI 描述和状态模型有关的核心 API。

### `react-dom`

提供 React 与浏览器 DOM 之间的宿主集成。本课使用：

```ts
import { createRoot } from 'react-dom/client';
```

React 不只可以面向浏览器 DOM，因此核心包和具体宿主 Renderer 分开。

### `@vitejs/plugin-react`

让 Vite 正确处理 React JSX/TSX、开发期 React Refresh 等能力。它是工具链集成，不是 React 运行时本身。

### `typescript`

负责静态类型检查。本课开启 strict mode。

### `vite`

负责开发服务器、模块转换和生产构建。本 Stage 先使用它，不在这里展开 Bundler 内核；完整工程化原理归 Stage 16。

---

## 5. Step 1：建立浏览器宿主容器

打开：

```text
index.html
```

核心节点：

```html
<div id="root"></div>
```

这是浏览器真实 DOM 节点，创建它时 React 还没有运行。

随后加载：

```html
<script type="module" src="/src/main.tsx"></script>
```

浏览器通过 Vite 加载应用入口模块。

### 关键结论

`#root` 不是 React 组件，不是虚拟 DOM，也不是 Fiber。它只是 React 将要接管的宿主 DOM Container。

React 默认只管理这个 Container 内部的内容，不会自动控制页面其他节点。

---

## 6. Step 2：查找 Container

打开：

```text
src/main.tsx
```

代码先查找真实 DOM：

```ts
const container = document.getElementById('root');
```

然后显式检查：

```ts
if (!container) {
  throw new Error('React 根容器 #root 不存在，请检查 index.html。');
}
```

为什么不直接使用非空断言：

```ts
const container = document.getElementById('root')!;
```

因为非空断言只是在类型层告诉 TypeScript“相信我”，不会让运行时不存在的节点凭空出现。当前写法在 HTML 被误改时会给出更明确的错误。

---

## 7. Step 3：创建 React Root

核心代码：

```ts
const root = createRoot(container);
```

可以先用第一层模型理解：

- `container` 是浏览器中的真实 DOM 边界。
- `root` 是 React 在该边界上的客户端根。
- React 会在根上维护组件树、更新和宿主提交。

不要把 `root` 理解成页面顶层 DOM 节点。它是 React 管理这个子树的运行入口对象。

一个完全由 React 构建的单页应用通常只有一个 Root；在遗留页面中，也可以为多个局部区域创建多个 Root。局部接入会在 RE-1101-005 深入。

---

## 8. Step 4：渲染根组件

```tsx
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

当前只建立以下认识：

### `<App />`

这是 JSX 语法，用于描述一个组件节点。JSX 的转换过程、React Element 结构和组件调用时机归 Module 11.02。

### `App`

是一个 JavaScript/TypeScript 函数：

```tsx
export function App() {
  return <main>...</main>;
}
```

React 会在渲染过程中调用组件，并使用它返回的描述继续计算界面。

### `root.render(...)`

告诉 React：这个 Root 当前应该显示给定的 React Node。

它不是把字符串直接塞进 `innerHTML`，也不是承诺每次都重新创建整个 DOM。具体协调和提交过程会在后续 Module 深入。

---

## 9. Step 5：理解 Strict Mode

本课把应用包在：

```tsx
<StrictMode>
  <App />
</StrictMode>
```

Strict Mode 是开发期检查边界，用于帮助暴露：

- 不纯渲染。
- 缺少清理的 Effect。
- 废弃 API。
- 某些无法安全重复执行的逻辑。

它不会在生产构建中给用户增加同样的开发检查行为。

### 当前阶段不要误解

- Strict Mode 不是错误边界。
- Strict Mode 不是权限模式。
- Strict Mode 不是 TypeScript strict mode。
- 开发期看到某些逻辑重复执行，不代表生产一定执行两次。

完整实验归 RE-1101-006。

---

## 10. Step 6：阅读 App 组件

打开：

```text
src/App.tsx
```

页面由一个 `App` 组件和一组静态概念卡片构成。

```tsx
const concepts = [
  { title: 'DOM Container', ... },
  { title: 'React Root', ... },
  { title: 'Component', ... },
];
```

组件通过 `map` 描述重复 UI：

```tsx
{concepts.map((concept) => (
  <article key={concept.title}>...</article>
))}
```

本课只观察结果：一个数组可以描述多个界面块。List 与 Key 的完整身份模型归 11.06。

---

## 11. 完整运行链路

刷新页面时，可以按下面顺序理解：

```text
1. 浏览器解析 index.html
2. 浏览器创建 <div id="root">
3. Vite 加载 src/main.tsx
4. main.tsx 找到真实 DOM Container
5. createRoot(container) 创建 React Root
6. root.render(...) 提交根 React Node
7. React 调用 App 组件计算 Render Output
8. React DOM 把必要结果提交到 Container 内部
9. 浏览器完成样式、布局、绘制与合成
```

第 7～8 步内部远比这里复杂。本课只建立边界，不提前展开 Fiber。

---

## 12. 浏览器观察实验

### 实验 A：观察宿主 DOM

打开 DevTools → Elements。

找到：

```html
<div id="root">...</div>
```

你会看到 React 最终创建的真实 HTML 元素位于其中。

注意：Elements 面板展示的是宿主 DOM 结果，不会直接展示完整 React 组件树。

### 实验 B：观察组件树

安装 React Developer Tools 后打开 Components 面板，应看到：

```text
StrictMode
└── App
```

开发工具版本不同，显示细节可能略有差异。

### 实验 C：观察模块入口

在 `src/main.tsx` 的 `createRoot` 行设置断点，刷新页面。

观察：

- `container` 的真实类型。
- `container.childNodes` 在首次渲染前后的差异。
- `root` 并不是 HTMLElement。

---

## 13. Failure Lab

每个实验结束后恢复源码。

### 故障 1：Container ID 不一致

把 `index.html` 改为：

```html
<div id="app"></div>
```

但不修改 `main.tsx`。

刷新后 Console 应出现我们主动抛出的错误：

```text
React 根容器 #root 不存在，请检查 index.html。
```

这证明 TypeScript 无法替代运行时边界检查。

### 故障 2：把组件函数当普通值传入

临时把：

```tsx
<App />
```

改成：

```tsx
App
```

这不是调用组件，也不是创建组件节点，而是传入函数对象。React 会报告它不是合法的可渲染子节点。

### 故障 3：直接调用组件

临时写成：

```tsx
root.render(App());
```

对于当前无 Hook 组件可能暂时显示，但这绕过了 React 正确管理组件身份和 Hook 调用的方式。以后组件加入 Hook 时会制造严重问题。

正确做法是：

```tsx
root.render(<App />);
```

---

## 14. Wrong Way

### 把脚手架生成结果当成 React 原理

Vite 负责加载和构建，React 负责 UI 运行模型。两者需要分开理解。

### 在 `index.html` 中手写应用内部 UI，再让 React 覆盖

如果 React 接管一个 Container，就应该明确谁拥有其内部 DOM。混合所有权会造成 Hydration、事件和状态问题。

### 在模块顶层直接修改应用 DOM

```ts
document.querySelector('.card')?.remove();
```

React 并不知道这次外部修改，后续更新可能产生冲突。命令式 DOM 边界归 11.08。

### 认为 App 只会执行一次

组件函数可能因为更新、父组件渲染或开发检查而执行多次。Render 代码必须保持纯净，这会在 11.02 深入。

---

## 15. 本课验收

口头或书面回答：

1. `#root` 属于浏览器还是 React？
2. `react` 与 `react-dom` 为什么分包？
3. `createRoot(container)` 的输入和输出分别是什么？
4. `<App />` 与 `App()` 有什么关键区别？
5. App 返回的 JSX 是真实 DOM 吗？
6. Strict Mode 与 TypeScript strict mode 有什么区别？
7. React 默认会不会接管 `#root` 外面的 DOM？
8. Vite 在本课中解决什么问题，React 又解决什么问题？

实际验收：

- `npm install` 成功。
- `npm run dev` 可以启动。
- 页面无 Console Error。
- 能在 Elements 中找到 `#root` 及其子树。
- 能复现 Container 缺失错误。
- `npm run build` 成功。

---

## 16. 下一课

当前页面是静态的。下一课加入最小 State，让审批数字、进度、摘要、状态和按钮从同一份状态自动得到一致输出。

进入：[RE-1101-003：让状态声明 UI](../03-state-declares-ui/README.md)
