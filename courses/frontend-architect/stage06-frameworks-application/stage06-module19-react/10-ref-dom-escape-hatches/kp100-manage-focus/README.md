# RE-KP100：管理焦点

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 DOM Ref 调用 `focus()`。
2. 理解焦点管理是 Ref 最典型的 Escape Hatch 之一。
3. 在表单校验失败时把焦点移动到需要用户处理的位置。
4. 区分“程序化 focus”与“视觉状态变化”。
5. 在焦点交互中保留 label、状态提示等基本可访问性结构。

> **本节核心代码**：`nameRef.current?.focus()` / `emailRef.current?.focus()`。
>
> **实验辅助代码**：表单校验只用于提供一个合理的焦点移动场景，不是本节表单体系教学。

## 理论讲解

### 1. 为什么 focus 是命令式行为

Props 更适合表达：

```text
这个组件应该显示什么
```

而 focus 描述的是：

```text
浏览器现在把键盘输入目标切换到哪个 DOM Node
```

它依赖真实浏览器 DOM，因此自然属于 Ref 场景。

### 2. 常见合理焦点场景

- 打开搜索后聚焦输入框。
- 表单提交失败时聚焦第一个错误字段。
- 对话框打开时进入合理焦点位置。
- 删除条目后恢复焦点到邻近控制。

焦点本身直接影响键盘用户体验，因此不应只把它当作“方便鼠标用户”的细节。

### 3. 不要无理由抢焦点

组件 Render 后立刻到处 `focus()` 会：

- 打断用户当前输入。
- 让键盘导航位置突然改变。
- 让屏幕阅读器上下文发生跳跃。

所以应有清晰交互原因。

### 4. 本节为什么使用非受控输入

这里通过：

```js
nameRef.current?.value
```

读取输入值，只是为了让案例集中在 DOM Ref 和 focus。

在真实复杂表单中，值管理可以有其他模型；不要从这个案例推导出“所有表单都必须通过 Ref 读取”。

### 5. 状态提示与焦点可以同时存在

校验失败时：

```jsx
setMessage('请输入姓名');
nameRef.current?.focus();
```

两件事职责不同：

```text
State → 页面展示反馈
Ref → 浏览器焦点移动
```

## 动手编码：从 0 到 1

### 第 1 步：创建两个 DOM Ref

```jsx
const nameRef = useRef(null);
const emailRef = useRef(null);
```

### 第 2 步：绑定输入框

```jsx
<input ref={nameRef} name="name" />
<input ref={emailRef} name="email" type="email" />
```

### 第 3 步：提交时检查姓名

```jsx
if (!nameRef.current?.value.trim()) {
  setMessage('请输入姓名');
  nameRef.current?.focus();
  return;
}
```

### 第 4 步：再检查邮箱

```jsx
if (!emailRef.current?.value.trim()) {
  setMessage('请输入邮箱');
  emailRef.current?.focus();
  return;
}
```

### 第 5 步：提供可感知的状态提示

```jsx
<p role="status" aria-live="polite">{message}</p>
```

最终源码：[`src/main.jsx`](./src/main.jsx)

### 本节核心代码

- DOM Ref
- `.focus()`
- 事件驱动的焦点移动

### 实验辅助代码

- 简化的空值校验
- `message` State

## 运行案例

执行：

```bash
pnpm dev
```

验证：

1. 保持两个输入框为空，点击提交。
2. 姓名框应获得焦点。
3. 填写姓名，再提交。
4. 邮箱框应获得焦点。
5. 两项都填写后出现“校验通过”。

## 效果验证

你应该能够解释：

1. 为什么 focus 适合通过 DOM Ref 完成？
2. 为什么不应该在每次 Render 后无条件抢焦点？
3. State 与 Ref 在本案例中分别承担什么职责？
4. 可访问性为什么是焦点管理的一部分？
