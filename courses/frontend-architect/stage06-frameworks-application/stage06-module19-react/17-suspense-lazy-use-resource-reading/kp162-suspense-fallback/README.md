# RE-KP162：fallback

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 `fallback` 是任意可渲染 React Node，不只是 Spinner。
2. 理解子树尚未就绪时，fallback 会临时替代该 Suspense Boundary 的内容区域。
3. 会根据 Boundary 的视觉尺寸设计 Skeleton、占位内容或轻量状态提示。
4. 理解 Boundary 外 Header/Footer 不会被内部 fallback 替换。
5. 知道 fallback 粒度应对应真实 loading sequence，而不是机械包住每个组件。

> **本节核心代码**：`fallback={<AccountSkeleton />}` 与 Boundary 内外 UI 的空间边界。  
> **实验辅助代码**：`createTeachingResource` 仅负责制造约 1.8 秒的 suspension，生产代码不要照搬手工资源协议。

## 理论讲解

### 1. fallback 可以是完整 React UI

```jsx
<Suspense fallback={<AccountSkeleton />}>
  <AccountCard />
</Suspense>
```

`fallback` 可以是：

- 文本；
- Spinner；
- Skeleton；
- 占位卡片；
- 一小段带无障碍语义的加载 UI。

### 2. fallback 替换的是 Boundary 内部内容

结构：

```jsx
<header>...</header>
<Suspense fallback={<AccountSkeleton />}>
  <AccountCard />
</Suspense>
<footer>...</footer>
```

AccountCard suspend 时：

```text
Header              保留
AccountCard 区域     → fallback
Footer              保留
```

### 3. fallback 设计应该减少布局跳动

如果真实卡片最终高度约 200px，但 fallback 只有一行小字，内容完成时页面会突然跳动。

Skeleton 通常可以保持相近结构，减少视觉变化。

### 4. fallback 不是 Error UI

Suspense 处理的是：

```text
内容暂时还没准备好
```

并不等价于：

```text
资源失败
```

Promise reject 通常要交给 Error Boundary 等错误模型处理，后续 Chapter 会专门学习。

### 5. 不要包得过细

官方建议 Boundary 的粒度应该对应设计上的 loading sequence。

不是：

```text
每个 span 一个 Suspense
每个 button 一个 Suspense
```

而是：

> 哪些内容应该一起出现？哪些内容可以独立加载？

## 动手编码：从 0 到 1

### 第 0 步：先准备真实 AccountCard

```jsx
function AccountCard() {
  return <article>...</article>;
}
```

### 第 1 步：准备专用 Skeleton

```jsx
function AccountSkeleton() {
  return <div role="status">账户资料加载中…</div>;
}
```

### 第 2 步：把 Skeleton 交给 fallback

```jsx
<Suspense fallback={<AccountSkeleton />}>
  <AccountCard />
</Suspense>
```

### 第 3 步：把稳定页面骨架放边界外

```jsx
<header>...</header>
<Suspense ...>...</Suspense>
<footer>...</footer>
```

### 第 4 步：用教学资源制造 suspension

```jsx
const accountResource = createTeachingResource(data, 1800);
```

`AccountCard` 读取时暂时 suspend。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：fallback 作为 Boundary 备用 UI 的设计。
- **实验辅助代码**：定时资源仅为了复现实验。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp162-suspense-fallback --config ./vite.config.js
```

## 效果验证

1. Header 立即可见。
2. AccountCard 区域先显示 Skeleton。
3. Footer 同样立即可见。
4. 约 1.8 秒后 AccountCard 替换 Skeleton。
5. 能说明 fallback 与 Error UI 的区别。
6. 能解释为什么 Boundary 应跟 UX loading sequence 对齐。

完成后继续 **RE-KP163：嵌套 Suspense**。
