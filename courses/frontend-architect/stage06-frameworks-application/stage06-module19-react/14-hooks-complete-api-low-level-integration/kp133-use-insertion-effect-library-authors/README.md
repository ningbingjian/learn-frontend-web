# RE-KP133：useInsertionEffect 的库作者场景

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `useInsertionEffect` 主要面向 CSS-in-JS 库作者，而不是普通业务组件。
2. 理解它的目标是让运行时样式在布局类 Effect 读取布局之前插入。
3. 知道 `useInsertionEffect` 中不能更新 State。
4. 知道执行时 Ref 还不可依赖，也不应读取组件 DOM 布局。
5. 能解释为什么普通应用代码大多数时候应使用 CSS 文件、inline style、`useEffect` 或 `useLayoutEffect`，而不是 Insertion Effect。

> **本节核心代码**：一个最小 `useRuntimeClass` 库式 Hook 使用 `useInsertionEffect` 向 `document.head` 注入动态规则。  
> **实验辅助代码**：tone 切换用于模拟 CSS-in-JS 库收到不同样式规则；本示例不是推荐业务项目采用运行时 CSS 注入。

## 理论讲解

### 1. 这是一个非常专门的 Hook

React 官方直接把 `useInsertionEffect` 定位为：

```text
CSS-in-JS library authors
```

如果你只是在开发普通业务页面，通常不需要它。

### 2. 为什么 CSS-in-JS 库需要更早插入样式

假设组件的 Layout Effect 要测量真实宽高。

如果 runtime style 到 Layout Effect 之后才插入：

```text
measure old style
→ insert new CSS
→ layout changes
```

测量结果就可能基于过期样式。

Insertion Effect 的目标是让需要运行时注入的样式更早准备好，使后续布局读取看到正确 CSS。

### 3. 它不是“比 useLayoutEffect 更强”

它有严格限制：

- 不能在里面更新 State；
- Ref 尚不能作为可靠输入；
- 不应该依赖 DOM 已经更新到某个特定阶段；
- 主要用途就是样式插入这类库级工作。

### 4. 普通业务应用优先什么

优先考虑：

1. 构建期静态 CSS；
2. CSS Modules / 原生 CSS；
3. 动态值使用 inline style；
4. 成熟 CSS-in-JS 库内部封装实现。

不要让每个业务组件自己写：

```jsx
useInsertionEffect(() => {
  // ordinary business logic
});
```

### 5. Library Hook 应隐藏底层时序

业务消费者最好只看到：

```jsx
const className = useRuntimeClass(tone);
```

而不是知道内部使用哪种 Effect。

这符合库抽象原则：**底层时序属于实现细节，调用方只消费样式 API。**

## 动手编码：从 0 到 1

### 第 0 步：定义样式表

```jsx
const styleMap = {
  success: {
    className: 'runtime-success',
    cssText: '.runtime-success { ... }',
  },
};
```

### 第 1 步：创建 library-style Hook

```jsx
function useRuntimeClass(tone) {
  const definition = styleMap[tone];
  // ...
  return definition.className;
}
```

### 第 2 步：在 Insertion Effect 中注入 style

```jsx
useInsertionEffect(() => {
  const style = document.createElement('style');
  style.textContent = definition.cssText;
  document.head.appendChild(style);
  return () => style.remove();
}, [definition.className, definition.cssText]);
```

### 第 3 步：不要 setState

Insertion Effect 中只操作样式注入资源，不做：

```jsx
setSomething(...)
```

### 第 4 步：业务组件只使用 className

```jsx
const className = useRuntimeClass(tone);
return <div className={className}>...</div>;
```

### 第 5 步：切换 tone

切换 success / warning，观察注入规则随依赖进行 cleanup / setup。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useInsertionEffect` 的库作者样式注入边界。
- **实验辅助代码**：简单 tone map 只用于模拟 CSS-in-JS library API。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp133-use-insertion-effect-library-authors --config ./vite.config.js
```

## 效果验证

1. 页面初始会使用 runtime class 样式。
2. 切换 tone 后对应样式规则发生变化。
3. 源码中 Insertion Effect 不更新 State。
4. 源码中不依赖组件 Ref 做布局测量。
5. 能明确回答：这个 Hook 主要是库作者工具，不是普通业务 Effect 替代品。

完成后继续 **RE-KP134：useId**。
