# RE-KP163：嵌套 Suspense

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解多个 Suspense Boundary 可以形成加载层级。
2. 理解子组件 suspend 时优先由最近的父 Boundary 接住。
3. 会设计 Outer Fallback 与 Inner Fallback 不同的 loading sequence。
4. 理解嵌套 Boundary 可以让已经准备好的上层内容先显示，而不必等待更慢的下层内容。
5. 能从 UX 角度判断哪里值得独立设置 Boundary。

> **本节核心代码**：Outer Suspense + Inner Suspense 的树结构和“最近 Boundary”规则。  
> **实验辅助代码**：Biography 900ms、Albums 2400ms 的两个教学资源只用于稳定制造渐进 Reveal。

## 理论讲解

### 1. 单一 Boundary 会把内部内容作为一个 Reveal 单元

如果写成：

```jsx
<Suspense fallback={<BigLoading />}>
  <Biography />
  <Albums />
</Suspense>
```

只要 Albums 还在 suspend，整个 Boundary 都可能继续显示 BigLoading。

### 2. 嵌套 Boundary 可以拆出加载阶段

```jsx
<Suspense fallback={<BigLoading />}>
  <Biography />
  <Suspense fallback={<AlbumsLoading />}>
    <Albums />
  </Suspense>
</Suspense>
```

现在 Biography 和 Albums 不再必须同时完成才看到第一批内容。

### 3. 本课的稳定时间线

实验资源：

```text
Biography：900ms
Albums：2400ms
```

因此刷新后大致会看到：

```text
0 ~ 900ms
人物主资料加载中…

900 ~ 2400ms
Biography 已显示
作品列表继续加载中…

2400ms+
Biography + Albums 都显示
```

### 4. 最近 Boundary 决定 fallback

Albums 位于 Inner Suspense 内：

```text
Outer Suspense
├─ Biography
└─ Inner Suspense
   └─ Albums
```

当只有 Albums suspend，而 Biography 已准备好时，Inner Suspense 就可以只替换 Albums 那片区域。

### 5. Boundary 是 UX 设计工具

不要只从代码组件数量决定 Boundary。

应该问：

- 页面最重要的内容是什么？
- 哪些内容应该一起出现？
- 哪些次要内容可以稍后补上？
- fallback 是否会造成布局跳动？

下一课会继续专门讨论 Reveal 顺序与 UX。

## 动手编码：从 0 到 1

### 第 0 步：先准备两个内容组件

```jsx
function Biography() { ... }
function Albums() { ... }
```

### 第 1 步：先用一个 Outer Suspense

```jsx
<Suspense fallback={<p>人物主资料加载中…</p>}>
  <Biography />
  <Albums />
</Suspense>
```

此时二者是一组 Reveal 单元。

### 第 2 步：给慢 Albums 单独加 Inner Suspense

```jsx
<Suspense fallback={<p>人物主资料加载中…</p>}>
  <Biography />
  <Suspense fallback={<p>作品列表继续加载中…</p>}>
    <Albums />
  </Suspense>
</Suspense>
```

### 第 3 步：让 Biography 更快完成

```jsx
const biographyResource = createTeachingResource(..., 900);
```

### 第 4 步：让 Albums 更慢

```jsx
const albumsResource = createTeachingResource(..., 2400);
```

刷新页面即可稳定看到两段 loading sequence。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：嵌套 Boundary 与最近 Boundary 规则。
- **实验辅助代码**：两个不同延迟的教学资源。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp163-nested-suspense --config ./vite.config.js
```

## 效果验证

1. 初始先显示外层 fallback。
2. Biography 约 900ms 后先显示。
3. Albums 未完成时，只显示内层 fallback。
4. 约 2.4 秒后 Albums 也显示。
5. 能画出 Outer / Inner Suspense 树并指出 Albums 的最近 Boundary。
6. 能解释嵌套 Boundary 的核心价值是设计渐进 Reveal，而不是“Suspense 越多越好”。

完成后继续 **RE-KP164：Reveal 顺序与 UX**。
