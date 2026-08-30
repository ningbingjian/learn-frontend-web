# RE-KP095：Ref Callback

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `ref` 除了接收 Ref Object，也可以接收函数。
2. 知道 Callback Ref 会在节点 attach / detach 时被 React 调用。
3. 能使用 Callback Ref 管理一组动态 DOM 节点。
4. 能使用 `Map` 建立业务 ID 到 DOM Node 的映射。
5. 理解 Callback Ref 比单个 `useRef(null)` 更适合动态节点集合。
6. 知道 React 19 cleanup function 将在下一节单独学习，本节先使用兼容的 `node === null` 清理认知。

> **本节核心代码**：`ref={node => { if (node) map.set(id, node); else map.delete(id); }}`。
>
> **实验辅助代码**：三个课程按钮与“聚焦指定课程”按钮用于验证 DOM 集合已经建立。

## 理论讲解

### 1. Object Ref

此前写法：

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
```

React 自动维护：

```js
inputRef.current
```

### 2. Callback Ref

`ref` 也可以传一个函数：

```jsx
<input ref={node => {
  console.log(node);
}} />
```

React 会在节点建立关联时把 DOM Node 传入。

### 3. 为什么需要 Callback Ref

如果只有一个 Input：

```text
useRef(null)
```

通常足够。

但如果是动态列表：

```text
course-a -> DOM Node A
course-b -> DOM Node B
course-c -> DOM Node C
```

单个 `ref.current` 就不够表达这组映射。

### 4. 使用 Map 保存节点集合

```jsx
const itemRefs = useRef(new Map());
```

Attach 时：

```js
itemRefs.current.set(id, node);
```

Detach 时：

```js
itemRefs.current.delete(id);
```

### 5. 为什么 Map 自己也放进 Ref

因为 Map：

- 需要跨 Render 保留。
- 修改 Map 不应该驱动 UI。
- 它只是 DOM 节点索引。

所以：

```jsx
useRef(new Map())
```

很合适。

### 6. Callback Ref 的生命周期

概念上：

```text
DOM attached
    ↓
callback(node)

DOM detached
    ↓
cleanup / callback(null)
```

React 19 新增“callback 返回 cleanup function”的正式能力，RE-KP096 再深入。

### 7. 不要在 Ref Callback 里做业务 State 管理

Callback Ref 更适合：

```text
记录 DOM Node
挂接与 DOM 节点直接相关的命令式资源
```

而不是：

```text
把业务数据流搬到 DOM 生命周期里
```

## 动手编码：从 0 到 1

### 第 1 步：准备业务列表

```jsx
const courses = [
  { id: 'react', name: 'React' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'html', name: 'HTML' },
];
```

### 第 2 步：创建 DOM Map Ref

```jsx
const itemRefs = useRef(new Map());
```

### 第 3 步：为每个列表项写 Callback Ref

```jsx
ref={node => {
  if (node) {
    itemRefs.current.set(course.id, node);
  } else {
    itemRefs.current.delete(course.id);
  }
}}
```

### 第 4 步：按业务 ID 查 DOM

```jsx
function focusCourse(id) {
  itemRefs.current.get(id)?.focus();
}
```

这里没有依赖 DOM 顺序，也没有 `querySelector`。

### 第 5 步：验证映射

点击：

```text
Focus TypeScript
```

React 找到业务 ID 为 `typescript` 的 Button DOM 并聚焦。

最终源码：

- [src/main.jsx](./src/main.jsx)

## 运行案例

```bash
npm run dev -- --host 0.0.0.0
```

操作：

1. 点击“Focus React”。
2. 点击“Focus TypeScript”。
3. 点击“Focus HTML”。
4. 观察对应课程按钮获得焦点。

## 效果验证

你应该能够解释：

```text
Object Ref -> 一个 current
Callback Ref -> 可以自定义节点登记逻辑
Map + Callback Ref -> 动态 DOM 集合
```

并知道下一步 React 19 可以进一步用 Callback Ref 返回 cleanup function 来管理 detach 生命周期。
