# RE-KP181：Fragment

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Fragment 用来组合多个 React children。
2. 理解 Fragment 不会额外创建 DOM wrapper。
3. 掌握 `<>...</>` shorthand。
4. 知道何时不应该为了满足“单一父元素”而乱加 `<div>`。
5. 知道带 `key` 的 Fragment 需要显式 `<Fragment>`，但把细节留到 RE-KP182。

## 理论讲解

### 1. Fragment 是 React 分组，不是 DOM 元素

```jsx
return (
  <>
    <h2>Title</h2>
    <p>Body</p>
  </>
);
```

浏览器最终不会得到一个“Fragment 标签”。

### 2. 为什么不总是用 div

多余 wrapper 可能影响：

- CSS Grid / Flex 的直接子节点关系。
- Table / List 等 DOM 结构语义。
- 样式选择器。
- 无意义的 DOM 深度。

Fragment 可以表达“React 需要把这些 children 当成一组”，同时不改变 DOM 结构。

### 3. Shorthand

大多数场景直接写：

```jsx
<>
  ...
</>
```

它等价于普通 Fragment 分组。

如果下一课需要给 Fragment 添加 `key`，则要显式导入 `Fragment`。

## 动手编码：从 0 到 1

### 第 1 步：创建返回多个 sibling 的组件

```jsx
function ProfileSummary() {
  return (
    <>
      <h2>Ada Lovelace</h2>
      <p>数学家与早期计算思想先驱。</p>
    </>
  );
}
```

### 第 2 步：把 Fragment 放进真实 DOM 容器

```jsx
<section ref={hostRef}>
  <ProfileSummary />
</section>
```

### 第 3 步：检查真实 DOM children

点击按钮时读取：

```jsx
const tags = Array.from(hostRef.current.children)
  .map(element => element.tagName)
  .join(' → ');
```

如果 Fragment 不创建 wrapper，应该看到：

```text
H2 → P
```

而不是：

```text
DIV → ...
```

最终源码：[src/main.jsx](./src/main.jsx)

**本节核心代码**：`<>...</>` Fragment 与“无额外 DOM wrapper”。

**实验辅助代码**：DOM Ref 与“检查 DOM children”按钮仅用于验证浏览器最终结构。

## 运行案例

点击“检查真实 DOM children”。页面会显示 Section 的直接子节点标签。

## 效果验证

- React 组件可以返回一组 sibling。
- DOM 中没有 Fragment wrapper。
- Section 的直接 children 就是 `H2` 和 `P`。
