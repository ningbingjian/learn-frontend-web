# RE-1101-002：创建第一个 React 应用

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must  
> 类型：最小应用 + 管理边界实验  
> 前置课程：[RE-1101-001：手工 DOM 同步为什么会失控](../01-manual-dom-sync-problem/README.md)

---

## 1. 本课要解决的问题

上一课使用集中 `render()` 降低了 DOM 同步遗漏，但页面拆分、嵌套输出、更新协调和宿主 DOM 提交仍然全部由我们自己负责。

本课第一次真正引入 React，建立四个对象的关系：

```text
DOM Container
  ↓ createRoot(container)
React Root
  ↓ root.render(...)
React Component
  ↓ 执行后得到
Render Output
  ↓ React DOM 提交
Browser DOM
```

本课只建立 React 的入口与管理边界，不提前深入 State、Effect、Fiber 或性能优化。

---

## 2. 学习目标

完成本课后，你应该能够：

- 从空目录创建 React 19 + TypeScript + Vite 项目。
- 解释 `react` 与 `react-dom` 的职责差异。
- 解释 `index.html` 中的 `#root` 只是普通 DOM Container。
- 使用 `createRoot` 建立 React Root。
- 使用 `root.render(<App />)` 提交第一个组件树。
- 区分组件函数、React Render Output 与最终 DOM。
- 说明 React 只管理指定容器内部，而不会自动接管整个 HTML 文档。
- 使用 Elements 与 React DevTools 观察边界。
- 复现 Root 不存在、传错 Render 参数和手工改 DOM 三类问题。

---

## 3. 起始状态

本课是独立 Lesson。最终源码完整保存在当前目录，不依赖上一课的开发服务器或文件。

进入目录：

```bash
cd learn-frontend-web-course/stage11-react/module11-01-react-problem-model/02-first-react-application
```

最终目录：

```text
02-first-react-application/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    └── styles.css
```

环境要求：

```text
Node.js 22.12+
npm 10+
现代浏览器
```

---

## 4. Step 1：创建依赖与运行脚本

创建：

```text
package.json
```

完整内容：

```json
{
  "name": "re-1101-002-first-react-application",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.5",
    "@vitejs/plugin-react": "^6.1.1",
    "typescript": "~6.0.2",
    "vite": "^8.2.2"
  },
  "engines": {
    "node": ">=22.12.0"
  }
}
```

这里第一次出现两个运行时包：

- `react`：提供组件、Hook 和 React 核心模型。
- `react-dom`：把 React 输出提交到浏览器 DOM；本课使用它的客户端入口 `react-dom/client`。

React 并不直接等于浏览器渲染器。将来 React Native 会把同一套 React 模型提交到不同宿主环境。

现在安装依赖：

```bash
npm install
```

此时还不能看到页面，因为入口文件尚未完成。

---

## 5. Step 2：建立 TypeScript 与 Vite 配置

创建：

```text
tsconfig.json
```

完整内容：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src", "vite.config.ts"]
}
```

关键配置：

- `strict`：开启严格类型检查。
- `jsx: react-jsx`：让 TypeScript 使用现代 JSX Runtime。
- `noEmit`：JavaScript 产物交给 Vite，本命令只检查类型。
- `moduleResolution: Bundler`：按现代前端 Bundler 的方式解析模块。

创建：

```text
vite.config.ts
```

完整内容：

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

`@vitejs/plugin-react` 负责 React Fast Refresh 和 JSX 相关开发体验。它不是 React 本身，也不会替你创建 Root。

---

## 6. Step 3：创建宿主 HTML 与 DOM Container

创建：

```text
index.html
```

完整内容：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="建立 DOM Container、React Root、Component 与 Render Output 的关系。"
    />
    <title>RE-1101-002 · 第一个 React 应用</title>
  </head>
  <body>
    <p class="host-banner">这段内容位于 #root 外，不由 React 管理。</p>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

现在页面里有两个重要区域：

```text
.host-banner  → Root 外，仍由宿主 HTML 管理
#root         → React 即将接管的容器
```

`#root` 此时只是一个普通、空的 `HTMLDivElement`。它不是组件，不是 Virtual DOM，也不是 React Root。

---

## 7. Step 4：创建组件与 Render Output

创建：

```text
src/main.tsx
```

先写业务类型和数据：

```tsx
type RiskLevel = 'high' | 'medium' | 'low';

interface ReleaseCheck {
  id: string;
  title: string;
  owner: string;
  level: RiskLevel;
}
```

再建立组件：

```tsx
function App() {
  return (
    <main className="page-shell">
      <h1>发布检查台</h1>
    </main>
  );
}
```

这里要先建立三个区别：

1. `App` 是普通 JavaScript 函数，但 React 会把它作为组件类型处理。
2. `<App />` 描述“希望渲染一个 App”，它不是 `App` 对应的最终 DOM 元素。
3. `App()` 返回的 JSX 会转换成 React Render Output，之后才由 React DOM 处理成真实 DOM。

本课最终 `src/main.tsx` 已包含完整检查列表和样式类名。不要在这里提前学习 Props 和 Key 的全部细节，它们有自己的 Owner Module。

---

## 8. Step 5：建立 React Root

在 `src/main.tsx` 底部加入：

```tsx
const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

const root = createRoot(container);
root.render(<App />);
```

同时在文件顶部导入：

```tsx
import { createRoot } from 'react-dom/client';
```

逐层解释：

### `document.querySelector('#root')`

从宿主文档中取得真实 DOM Container。浏览器创建它，React 不负责创建这一步。

### 容器检查

`querySelector` 可能返回 `null`。显式失败比让应用稍后以难懂错误崩溃更容易诊断。

### `createRoot(container)`

创建 React Root，并把它关联到这个 Container。Root 是 React 的管理入口，不是新的 DOM 节点。

### `root.render(<App />)`

告诉 React：这个 Root 当前希望显示 `App` 描述的 UI。React 会执行组件、计算输出并提交必要 DOM。

---

## 9. Step 6：加入样式并第一次运行

创建：

```text
src/styles.css
```

在 `src/main.tsx` 顶部导入：

```tsx
import './styles.css';
```

启动：

```bash
npm run dev
```

打开终端给出的地址。你应该看到：

- 页面顶部一条灰蓝色宿主提示，它位于 `#root` 外。
- React 输出的“发布检查台”。
- 三条检查项与风险标签。
- 页面底部一条管理边界说明。

如果浏览器只有空白页，先查看 Console，而不是反复刷新。

---

## 10. DevTools 观察证据

### Elements

找到：

```html
<p class="host-banner">...</p>
<div id="root">
  <main class="page-shell">...</main>
</div>
```

这证明：

- `#root` 在 React 启动前就存在。
- `main`、`header`、`section`、`ul` 和 `li` 是 React 提交进去的宿主节点。
- Root 外的提示没有成为 App 的子节点。

### Console

执行：

```js
document.querySelector('#root')
```

它返回真实 DOM Container。React Root 本身不会作为一个新标签出现在 Elements 中。

### React DevTools

安装 React DevTools 后，Components 面板应看到 `App`。Elements 展示 DOM Tree，Components 展示 React Component Tree；两棵树不是同一棵树。

---

## 11. 基础更新时间线

本课没有 State，但初始启动已经发生一条完整链路：

```text
浏览器解析 index.html
→ 加载 /src/main.tsx
→ 查询 #root
→ createRoot(container)
→ root.render(<App />)
→ React 执行 App
→ 得到 Render Output
→ React DOM 创建并插入宿主节点
→ 浏览器绘制页面
```

Fiber、Lane、Reconciliation 的完整机制属于后续 Module。本课只需要能正确描述这一层因果关系。

---

## 12. Failure Lab

### A：Root ID 不匹配

临时把 `index.html` 改为：

```html
<div id="app"></div>
```

保持 `main.tsx` 查询 `#root`。刷新后 Console 应出现我们主动抛出的错误。

结论：React Root 必须绑定到真实存在的宿主节点。

实验后恢复 `id="root"`。

### B：把组件函数传给 `render`

错误写法：

```tsx
root.render(App);
```

正确写法：

```tsx
root.render(<App />);
```

`App` 是组件类型；`<App />` 是要渲染的 React Element 表达。不要把“函数本身”和“描述一个组件实例”混为一谈。

### C：手工修改 Root 内 DOM

页面运行后在 Console 执行：

```js
document.querySelector('#root h1').textContent = '被手工修改的标题';
```

当前页面可能暂时改变，但它绕过了 React 模型。后续 React 再次提交时，这类改动可能被覆盖，代码状态也不知道 DOM 已经变过。

结论：不要把受 React 管理的 DOM 当作另一套独立业务状态来源。必须命令式集成时，使用后续 Ref / Effect 课程规定的边界。

---

## 13. Wrong Way

### 在组件内部调用 `createRoot`

Root 是应用或局部 React 岛的入口，不应该随着组件 Render 反复创建。

### 对同一 Container 反复 `createRoot`

同一管理边界应复用同一个 Root。更新 UI 使用 `root.render(...)` 或组件状态，而不是重新创建 Root。

### 认为 Root 等于全局状态容器

Root 管理渲染工作，不等同于 Redux Store、Context 或业务状态仓库。

### 认为 JSX 就是真实 HTML

JSX 最终会成为 React Element 表达；真实 DOM 由 React DOM 在 Commit 阶段创建或更新。

---

## 14. 构建验证

执行：

```bash
npm run typecheck
npm run build
```

通过标准：

- TypeScript 无错误。
- Vite 构建成功。
- 生成 `dist/`。
- Console 没有 Root 或 Render 错误。

---

## 15. 本课验收

不看文档回答：

1. `#root`、React Root、`App` 和 DOM Tree 分别是什么？
2. `createRoot` 是否会创建一个 `<root>` DOM 标签？
3. 为什么要从 `react-dom/client` 导入 `createRoot`？
4. `App` 与 `<App />` 有什么区别？
5. Root 外的 DOM 是否由 React 自动管理？
6. 为什么不应该随意手工修改 Root 内部 DOM？
7. Components 面板和 Elements 面板分别观察什么？
8. 一次初始 Render 的基础时间线是什么？

实际验收：

- 项目可以独立安装、启动和构建。
- 能在 Elements 中指出 Root 的准确边界。
- 能稳定复现三类 Failure Lab 并恢复代码。
- 能画出 `Container → Root → Component → Render Output → DOM`。

---

## 16. 下一课

下一课加入最小 `useState`，让审批数和服务状态成为唯一可信来源，并让计数、剩余项、进度、摘要和按钮统一由当前状态声明：

- [RE-1101-003：让状态声明 UI](../03-state-declares-ui/README.md)
