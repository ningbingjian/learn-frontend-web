# RE-KP074：非受控组件

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解“非受控组件”在组件设计语境中的含义。
2. 知道非受控组件的关键状态主要保存在组件自己的 State 中。
3. 理解非受控组件仍然可以接收 Props，例如标题、初始值和样式配置。
4. 区分“初始值”与“父组件持续控制当前值”。
5. 能判断非受控组件为什么更容易直接复用，但更难由父组件精确协调。

> **本节核心代码**：`Disclosure` 内部使用 `useState(initiallyOpen)` 保存展开状态。  
> **实验辅助代码**：父级 render 次数和 `initiallyOpen` 切换按钮用于观察“初始值不是持续控制值”。

## 理论讲解

### 1. 非受控组件不是“没有 Props”

一个组件可以同时：

```text
接收 Props
+
拥有自己的 State
```

当某个重要行为主要由自己的 State 驱动，而父组件不能直接指定它当前应该是什么值时，我们通常把它称为“非受控”。

例如：

```jsx
function Disclosure({ title }) {
  const [open, setOpen] = useState(false);
  // ...
}
```

父组件可以给 `title`，但展开/收起状态由 `Disclosure` 自己管理。

### 2. 为什么它容易使用

调用者只需要：

```jsx
<Disclosure title="订单详情" />
```

不需要额外准备：

```text
open
setOpen
onOpenChange
```

因此非受控组件通常配置更少、接入更快。

### 3. 初始值不是当前值

一个常见 API 是：

```jsx
<Disclosure initiallyOpen={true} />
```

组件内部：

```jsx
const [open, setOpen] = useState(initiallyOpen);
```

这里的 `initiallyOpen` 只参与该组件 State 的初始化。

后续父组件即使重新传入不同的 `initiallyOpen`，也不等于父组件正在持续控制 `open`。

更准确的理解是：

```text
initiallyOpen
    ↓
首次初始化 open
    ↓
之后 open 由 Disclosure 自己维护
```

### 4. 非受控的能力边界

当父组件需要：

- 同时关闭多个 Panel；
- 强制打开某一个 Panel；
- 让多个组件保持同步；
- 根据路由或业务状态决定当前值；

内部私有 State 会让协调变难。

这时更适合考虑受控设计。

### 5. 非受控不是“低级方案”

局部、独立、不需要外部协调的状态，本来就应该尽量靠近使用它的组件。

比如：

- 一个局部折叠区；
- 单独使用的 Tooltip 开关；
- 与其他区域没有同步要求的临时 UI 状态。

把这些状态强行全部提升到父组件，反而会让 API 变重。

## 动手编码：从 0 到 1

### 第 0 步：从一个展示组件开始

先准备：

```jsx
function Disclosure({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

**本步目标**：先只有展示结构。  
**为什么这样写**：先把“内容”和“状态”分开理解。  
**运行后观察**：内容始终显示。

### 第 1 步：加入本地 State

```jsx
const [open, setOpen] = useState(false);
```

然后：

```jsx
<button onClick={() => setOpen(!open)}>
  {open ? '收起' : '展开'}
</button>
```

**本步目标**：让组件自己拥有交互状态。  
**为什么这样写**：`open` 只属于这个组件实例。  
**运行后观察**：点击按钮可以独立展开/收起。

### 第 2 步：加入初始值 Prop

把签名改成：

```jsx
function Disclosure({ title, initiallyOpen = false, children }) {
  const [open, setOpen] = useState(initiallyOpen);
}
```

**本步目标**：允许调用方决定首次状态。  
**为什么这样写**：初始值是一种轻量配置，不代表持续受控。  
**运行后观察**：首次进入页面时可以默认展开。

### 第 3 步：父级修改初始值 Prop

父组件保存：

```jsx
const [preferredInitialOpen, setPreferredInitialOpen] = useState(true);
```

传入：

```jsx
<Disclosure initiallyOpen={preferredInitialOpen} />
```

再增加按钮切换 `preferredInitialOpen`。

**本步目标**：验证 initial prop 与 controlled prop 的区别。  
**为什么这样写**：`useState` 的初始值只用于初始化这份 State。  
**运行后观察**：父级改变 `preferredInitialOpen` 后，已存在的 Disclosure 不会自动跟着改当前 `open`。

### 第 4 步：增加父级无关重渲染

```jsx
const [parentRenders, setParentRenders] = useState(0);
```

点击：

```jsx
setParentRenders(parentRenders + 1)
```

**本步目标**：证明父级 Render 不等于子组件 State 重置。  
**为什么这样写**：组件身份未变化时，本地 State 会继续保存。  
**运行后观察**：父级计数变化，Disclosure 当前展开状态保持不变。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：组件内部 `useState(initiallyOpen)` 与本地 `setOpen`。
- **实验辅助代码**：父级计数、初始值切换按钮。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp074-uncontrolled-component --config ./vite.config.js
```

## 效果验证

1. Disclosure 可以自行展开/收起。
2. 父组件不保存 Disclosure 当前 `open` 值。
3. 修改父级 `preferredInitialOpen` 不会持续控制已经存在的 Disclosure。
4. 父级无关重渲染不会重置 Disclosure State。
5. 能解释“非受控组件仍然可以接收 Props”。

完成后继续 **RE-KP075：受控与非受控的选择**。
