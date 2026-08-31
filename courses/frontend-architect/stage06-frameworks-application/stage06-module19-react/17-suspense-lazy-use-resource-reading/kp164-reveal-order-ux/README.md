# RE-KP164：Reveal 顺序与 UX

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解同一个 Suspense Boundary 内的多个挂起子节点会被协调为一次 Reveal。
2. 理解嵌套 Suspense Boundary 如何形成 Progressive Reveal。
3. 根据页面信息层级设计 Boundary，而不是给每个组件机械包一层 Suspense。
4. 知道 Reveal 顺序是 UX 决策，不只是技术实现细节。
5. 能区分“重要内容一起出现”和“先显示主内容、次要内容继续加载”两种体验。

> **本节核心代码**：一组内容共享同一个 Boundary 与嵌套 Boundary 的结构差异。  
> **实验辅助代码**：`createResource()` 和延时 Promise 只用于稳定制造 suspension，不是生产数据层实现。

## 理论讲解

### 1. 一个 Boundary 会协调它内部的 Reveal

如果 `Biography` 和 `Albums` 使用同一个最近父 Suspense：

```jsx
<Suspense fallback={<Loading />}>
  <Biography />
  <Albums />
</Suspense>
```

那么只要其中任意一个仍然没有准备好，这一整个 Boundary 继续显示 `fallback`。

它表达的是：

```text
Biography + Albums
作为一个 UI 单元一起出现
```

这适合两个区域在视觉和语义上强绑定的场景。

### 2. 嵌套 Boundary 可以设计渐进 Reveal

如果简介更重要、专辑列表可以稍后出现：

```jsx
<Suspense fallback={<BiographyFallback />}>
  <Biography />
  <Suspense fallback={<AlbumsFallback />}>
    <Albums />
  </Suspense>
</Suspense>
```

加载顺序可以变成：

```text
外层 fallback
→ Biography + 内层 fallback
→ Biography + Albums
```

这就是 Progressive Reveal。

### 3. Boundary 的位置本身就是 UX 设计

Boundary 太大：

```text
一个慢区域可能让整块页面都继续显示 loading
```

Boundary 太碎：

```text
页面到处闪烁小 spinner，视觉节奏破碎
```

因此合理的问题不是：

> “一个组件要不要加 Suspense？”

而是：

> “哪些内容应该作为同一个 loading / reveal 单元？”

### 4. Reveal Together 与 Progressive Reveal 的选择

可以用三个问题判断：

1. 这些内容是否必须一起理解？
2. 主内容先出现是否已经有价值？
3. 次要内容晚一点出现是否会破坏布局和阅读节奏？

如果答案偏向“一起理解”，Boundary 可以更大。

如果主次层级明显，可以使用嵌套 Boundary。

### 5. 不要把 Suspense Boundary 当成业务状态机

Suspense 描述的是：

```text
这一片 React UI 当前能不能完成 Render
```

它不应该替代所有：

- `isSaving`
- `isSubmitting`
- 表单校验状态
- 普通 Event Handler pending 状态

Boundary 的职责应保持清晰。

## 动手编码：从 0 到 1

### 第 1 步：准备一个可挂起的教学资源

本课为了稳定复现实验，定义：

```jsx
function createResource(value, delay) {
  let status = 'pending';
  let result;

  const promise = new Promise(resolve => {
    setTimeout(() => resolve(value), delay);
  }).then(value => {
    status = 'success';
    result = value;
  });

  return {
    read() {
      if (status === 'pending') {
        throw promise;
      }
      return result;
    },
  };
}
```

**为什么这样写：** Suspense 需要遇到真正会挂起 Render 的资源。这里手写 resource 只为了课程观察，不推荐作为生产数据方案。

### 第 2 步：准备两个不同速度的资源

```jsx
function createSession() {
  return {
    biography: createResource('人物简介已完成', 900),
    albums: createResource('专辑列表已完成', 2400),
  };
}
```

这样可以稳定观察两个 Reveal 时间点。

### 第 3 步：实现 Reveal Together

```jsx
<Suspense fallback={<p>一起等待中…</p>}>
  <Biography resource={session.biography} />
  <Albums resource={session.albums} />
</Suspense>
```

虽然 `Biography` 先准备好，但因为 `Albums` 仍挂起，所以整块内容继续等待。

### 第 4 步：实现 Progressive Reveal

```jsx
<Suspense fallback={<p>简介加载中…</p>}>
  <Biography resource={session.biography} />
  <Suspense fallback={<p>专辑仍在加载…</p>}>
    <Albums resource={session.albums} />
  </Suspense>
</Suspense>
```

这时简介准备好后可以先出现，专辑区域继续显示自己的 fallback。

### 第 5 步：加入 Restart 便于重复观察

```jsx
<button onClick={() => setSession(createSession())}>
  Restart Demo
</button>
```

每次点击都会创建一组新的教学资源，从头观察 Reveal 顺序。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同层 Boundary 与嵌套 Boundary 的组织方式。
- **实验辅助代码**：延时资源、Restart 按钮、展示文字。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp164-reveal-order-ux --config ./vite.config.js
```

## 效果验证

1. Restart 后，“一起 Reveal”区域会等待较慢的 Albums，之后整块一起出现。
2. “渐进 Reveal”区域会先出现 Biography，再保留 Albums fallback。
3. 最终两个区域都会显示完整内容。
4. 能解释 Boundary 位置为什么属于 UX 设计。
5. 能说明什么时候应该一起 Reveal，什么时候更适合 Progressive Reveal。

完成后继续 **RE-KP165：lazy**。
