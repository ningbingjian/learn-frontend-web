# RE-KP182：带 key 的 Fragment

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解列表中的一组 sibling 为什么有时需要一个共同 `key`。
2. 知道 `<>...</>` 不能接收 `key`。
3. 使用显式 `<Fragment key={id}>...</Fragment>`。
4. 理解 Fragment 有身份，但不会额外生成 DOM wrapper。
5. 用稳定业务 ID 支撑列表重排。

## 理论讲解

### 1. Fragment Key

列表中的每个 React sibling 都需要稳定身份。如果一条业务记录需要返回多个并列 DOM 节点，可以让一个 Fragment 代表这整组节点：

```jsx
<Fragment key={section.id}>
  <dt>{section.title}</dt>
  <dd>...</dd>
</Fragment>
```

`key` 属于 React 的 reconciliation 身份信息，不会变成浏览器 DOM attribute。

### 2. Explicit Syntax

简写：

```jsx
<>
  ...
</>
```

不能写 `key`。需要 key 时必须导入：

```jsx
import { Fragment } from 'react';
```

并使用显式 `<Fragment>`。

### 3. List

最终实验把术语分组放进 `<dl>`，点击按钮反转分组顺序。每组内部包含 `<dt>` 与 `<dd>`，但 DOM 中没有额外 wrapper。稳定 key 让 React 可以把整组 sibling 当成同一个业务实体移动。

## 动手编码：从 0 到 1

### 第 1 步：准备最小入口

创建 `src/main.jsx`，导入 `Fragment`、`useState` 和 `createRoot`。

**目标**：让本课能直接通过模块 Vite 环境运行。

### 第 2 步：准备带稳定 id 的数据

```jsx
const sections = [
  { id: 'render', title: 'Render', note: '纯计算 UI' },
  { id: 'commit', title: 'Commit', note: '应用必要 DOM 变化' },
];
```

**为什么**：`id` 是业务身份，不能在 render 时随机生成。

### 第 3 步：显式使用 Fragment

```jsx
{visibleSections.map(section => (
  <Fragment key={section.id}>
    <dt>{section.title}</dt>
    <dd>...</dd>
  </Fragment>
))}
```

**观察**：浏览器 Elements 面板中只有 `dt/dd`，没有 Fragment wrapper。

### 第 4 步：加入重排实验

按钮在正序/倒序之间切换。每个 `<dd>` 里放一个非受控 `<input>`，先手动修改内容再反转列表。

**预期**：输入内容跟着对应业务分组移动，说明稳定 key 支撑了分组身份匹配。

### 第 5 步：确认最终源码

[打开本节最终源码](./src/main.jsx)

- **本节核心代码**：`<Fragment key={section.id}>`。
- **实验辅助代码**：反转按钮、非受控 input 和说明文本。

## 运行案例

在 React Module 19 根目录执行：

```bash
npm run dev
```

然后打开本知识点的 `index.html`。

## 效果验证

- 页面可以反转术语分组。
- 修改某组 input 后再反转，内容仍对应原业务组。
- DOM 中没有额外 Fragment wrapper。
- 把显式 Fragment 改成 `<>...</>` 后将无法给这组 sibling 提供 `key`。
