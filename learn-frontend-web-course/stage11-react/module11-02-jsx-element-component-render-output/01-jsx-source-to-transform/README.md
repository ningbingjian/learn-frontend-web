# RE-1102-001：JSX 不是 HTML——从源码看到转换结果

> Module：11.02 JSX、Element、Component 与 Render Output  
> 深度：Must  
> 类型：JSX 语法 + 编译转换观察实验  
> 前置课程：[RE-1101-008：Release Console Migration](../../module11-01-react-problem-model/08-module-project-release-console-migration/README.md)

---

## 1. 本课要解决的问题

前一个 Module 已经大量使用：

```tsx
<App />
<section className="card">...</section>
```

但还没有回答：

> 浏览器认识 JSX 吗？`<App />` 到底是不是 HTML？为什么有些 React 文件不用 `import React` 也能写 JSX？

先拆开第一层：

```text
JSX Source
≠ HTML Source
≠ DOM
```

JSX 是 JavaScript 的语法扩展。它需要先经过编译 / 转换，得到浏览器可执行的 JavaScript，再由 React 继续处理转换产生的 Element 描述。

---

## 2. 学习目标

完成本课后，应能够：

- 解释 JSX 与 React 是两个独立概念。
- 解释为什么浏览器不能把 `.tsx` 中 JSX 当普通 JavaScript 直接执行。
- 理解 `jsx: react-jsx` 的作用。
- 使用 TypeScript Compiler API 直接观察 JSX 转换结果。
- 解释 automatic JSX runtime。
- 区分 JSX tag、JavaScript expression 与最终 DOM。
- 说明 `className`、驼峰属性和单根表达式等 JSX 约束为什么存在。
- 识别“JSX 就是 HTML 模板”的错误心智模型。

---

## 3. 起始状态

进入：

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/01-jsx-source-to-transform
```

目录：

```text
01-jsx-source-to-transform/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── scripts/
│   └── inspect-jsx.mjs
└── src/
    ├── main.tsx
    └── styles.css
```

安装：

```bash
npm install
```

先不要启动页面，先执行：

```bash
npm run inspect:jsx
```

---

## 4. Step 1：直接观察转换前后

`scripts/inspect-jsx.mjs` 使用当前 Lesson 已安装的 `typescript`：

```js
const result = ts.transpileModule(source, {
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
```

输入大致是：

```tsx
const element = (
  <section className="release-card">
    <h2>{title}</h2>
  </section>
);
```

输出会出现类似：

```js
import { jsx as _jsx } from "react/jsx-runtime";
```

嵌套或多个 children 时也可能出现其他 runtime helper。

**不要死记 helper 名称。**

真正需要建立的是：

```text
JSX syntax
↓ compiler
JavaScript calls
↓
React Element descriptions
```

编译器版本、开发/生产模式和优化器都可能影响最终代码形态。

---

## 5. JSX 与 React 为什么是两个概念

React 官方把 JSX 描述为 JavaScript 的语法扩展。

因此：

```text
JSX
负责“源码怎么写”

React
负责“如何解释这些 UI 描述并协调渲染”
```

理论上：

- React 可以不用 JSX，使用 Element 创建 API。
- JSX 也可以被配置给其他 UI runtime 使用。

所以：

```text
JSX !== React
```

它们在日常 React 项目中经常一起出现，但不是同一个东西。

---

## 6. automatic JSX runtime

旧教程经常出现：

```tsx
import React from 'react';

function App() {
  return <h1>Hello</h1>;
}
```

现代工具链使用 automatic JSX runtime 时，写 JSX 不再因为“JSX 本身”要求默认导入 `React`。

当前 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

TypeScript 会生成针对 JSX Runtime 的导入。

注意：

- 需要 `useState` 时仍然要导入 `useState`。
- 需要 `createElement` 时仍然要导入 `createElement`。
- “不用 import React”不表示 React 消失了，而是 JSX runtime 导入方式变化。

---

## 7. JSX 中为什么可以写 JavaScript

源码：

```tsx
const environment = 'staging';

return (
  <p>
    当前环境：{environment}
  </p>
);
```

`{environment}` 表示：

```text
当前在 JSX markup 表达中
→ 遇到 {}
→ 回到 JavaScript expression
→ 计算 environment
→ 把结果作为 child / prop 值
```

因此 JSX 不是一门独立模板语言，它直接嵌在 JavaScript 表达式模型中。

---

## 8. JSX 为什么比 HTML 更严格

### 8.1 标签需要正确闭合

```tsx
<img src="/logo.svg" />
```

而不是依赖 HTML Parser 帮你修复。

### 8.2 JavaScript 属性命名

```tsx
className="card"
```

不是：

```html
class="card"
```

很多 DOM 属性使用 JavaScript 风格命名。

### 8.3 一个 JSX 表达式需要一个整体结果

可以使用：

```tsx
<>
  <Header />
  <Main />
</>
```

Fragment 的完整 Render Output 语义后面再展开。

---

## 9. 运行页面

执行：

```bash
npm run dev
```

页面把当前模型直接画出来：

```text
TSX source
↓ TypeScript / Vite transform
react/jsx-runtime calls
↓
React Element descriptions
↓
React render work
↓
DOM commit
```

再执行：

```bash
npm run typecheck
npm run build
```

---

## 10. Failure Lab

### A：把 JSX 文件当普通 JavaScript 交给浏览器

思考：

```html
<script>
  const element = <h1>Hello</h1>;
</script>
```

普通浏览器 JavaScript Parser 不会把 `<h1>` 当 React JSX。

这说明 JSX 需要工具链转换。

### B：使用 HTML 属性心智模型

临时写：

```tsx
<div class="card">...</div>
```

TypeScript / React 类型检查会指出问题。

恢复：

```tsx
<div className="card">...</div>
```

### C：认为转换后就已经创建 DOM

执行 `npm run inspect:jsx` 只会输出 JavaScript 文本。

它没有打开浏览器，也没有创建页面 DOM。

因此：

```text
JSX transform
≠ DOM Commit
```

---

## 11. Wrong Way

### 把 JSX 称为“React HTML”

这样会让后续概念全部混在一起。

更准确：

> JSX 是用于描述 UI 的 JavaScript 语法扩展，React 工具链把它转换为 Element 创建调用。

### 背编译后的 helper 名称

课程目标不是背 `_jsx`、`_jsxs`。

应该掌握稳定层：

```text
source syntax
→ transform
→ element description
```

### 把 JSX 编译和 React Compiler 混为一谈

普通 JSX transform 的目标是把 JSX 变成 JavaScript。

React Compiler 属于更高层的优化体系，不是“JSX 能运行”的前提。

---

## 12. Debug 证据

使用三种证据：

```text
scripts/inspect-jsx.mjs
→ 观察编译结果

Browser Sources
→ 观察 Vite 提供给浏览器的模块

Elements
→ 观察最终 DOM
```

三者不是同一层。

---

## 13. 本课验收

不看文档回答：

1. JSX 是 HTML 吗？
2. JSX 是 React 本身吗？
3. 浏览器为什么不能直接执行 TSX？
4. `jsx: react-jsx` 做什么？
5. automatic JSX runtime 解决了什么？
6. `{value}` 在 JSX 中表示什么？
7. `npm run inspect:jsx` 是否会创建 DOM？
8. 为什么不应该死记 `_jsx` helper？

实际验收：

```bash
npm run inspect:jsx
npm run typecheck
npm run build
```

---

## 14. 官方参考

- React：Writing Markup with JSX  
  <https://react.dev/learn/writing-markup-with-jsx>
- React：createElement  
  <https://react.dev/reference/react/createElement>

---

## 15. 下一课

下一课不再只看编译文本，而是直接把 JSX 产生的值当作 JavaScript 对象观察：

[RE-1102-002：React Element——UI 描述对象不是 DOM](../02-react-element-description/README.md)
