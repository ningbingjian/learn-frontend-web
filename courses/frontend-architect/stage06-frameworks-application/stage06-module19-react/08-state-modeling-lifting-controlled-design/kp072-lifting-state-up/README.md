# RE-KP072：状态提升

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解什么时候两个组件的 State 需要协调。
2. 会找到需要协调组件的最近公共父组件。
3. 掌握状态提升的三个动作：移除子 State、父组件持有 State、通过 Props/回调传回子组件。
4. 理解状态提升不是“把所有 State 都搬到 App”。
5. 能用一个父级 State 保证“两个面板只能打开一个”之类的约束。
6. 为下一节受控组件建立清晰的数据流基础。

> **本节核心代码**：`Accordion` 持有 `activeIndex`，两个 `Panel` 通过 `isActive` 和 `onShow` 接收父级控制。  
> **实验辅助代码**：两个课程面板的静态标题/正文只用于制造协调需求。

## 理论讲解

### 1. 独立局部 State 为什么无法自然协调

如果两个 Panel 各自写：

```jsx
const [isActive, setIsActive] = useState(false);
```

那么：

```text
Panel A 只知道 A 自己是否打开
Panel B 只知道 B 自己是否打开
```

用户可以把两个都打开。

如果需求变成：

```text
任意时刻只能展开一个面板
```

这已经不是单个 Panel 自己能够决定的规则。

### 2. 找最近公共父组件

组件树：

```text
Accordion
├── Panel A
└── Panel B
```

A 与 B 的协调者最自然是：

```text
Accordion
```

因此把：

```text
A 是否打开
B 是否打开
```

重新建模为：

```text
当前 activeIndex 是谁
```

### 3. 状态提升三步法

React 官方示例可以总结成：

#### 第一步：从子组件移除 State

Panel 不再：

```jsx
const [isActive, setIsActive] = useState(false);
```

#### 第二步：父组件保存共享 State

```jsx
const [activeIndex, setActiveIndex] = useState(0);
```

#### 第三步：通过 Props 下发值和事件

```jsx
<Panel
  isActive={activeIndex === 0}
  onShow={() => setActiveIndex(0)}
/>
```

数据流变成：

```text
Accordion State
      ↓ props
Panel UI
      ↑ callback
用户动作
```

### 4. 为什么一个 index 比两个 boolean 更好

两个 boolean：

```text
isFirstOpen
isSecondOpen
```

存在组合：

```text
false false
true  false
false true
true  true  ← 业务不允许
```

而：

```text
activeIndex = 0 | 1 | null
```

更接近真实业务状态。

这是状态建模的价值，不只是“把 useState 搬位置”。

### 5. 状态提升的代价

提升后：

- 父组件知道更多信息。
- Props 与 callback 增加。
- 父子组件耦合边界变得更明确。

所以不要看到 State 就向上搬。

只有当：

```text
多个组件需要共同读取或协调同一事实
```

才需要提升到合适的共同 owner。

### 6. 状态提升后，子组件更接近受控组件

Panel 的关键行为：

```text
是否打开
```

已经不再由自身决定。

它变成：

```jsx
function Panel({ isActive, onShow }) { ... }
```

这就是下一节“受控组件”的核心方向。

## 动手编码：从 0 到 1

### 第 0 步：先写一个只接收 Props 的 Panel

```jsx
function Panel({ title, children, isActive, onShow }) {
  return (
    <section>
      <h3>{title}</h3>
      {isActive ? children : <button onClick={onShow}>显示</button>}
    </section>
  );
}
```

### 第 1 步：父组件创建唯一 State

```jsx
const [activeIndex, setActiveIndex] = useState(0);
```

### 第 2 步：控制第一个 Panel

```jsx
<Panel
  title="组件身份"
  isActive={activeIndex === 0}
  onShow={() => setActiveIndex(0)}
>
  <p>Position + Type + Key</p>
</Panel>
```

### 第 3 步：控制第二个 Panel

```jsx
<Panel
  title="状态建模"
  isActive={activeIndex === 1}
  onShow={() => setActiveIndex(1)}
>
  <p>Single Source of Truth</p>
</Panel>
```

### 第 4 步：验证约束由父级统一保证

点击第二个“显示”：

```text
activeIndex = 1
第一个关闭
第二个打开
```

不需要：

```text
先通知 A 关闭
再通知 B 打开
```

### 第 5 步：画出数据流

```text
用户点击 Panel B
       ↓
onShow()
       ↓
setActiveIndex(1)
       ↓
Accordion Render
       ↓
A isActive=false
B isActive=true
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：最近公共父级 owner + `activeIndex` + Props/callback。
- **实验辅助代码**：Panel 的课程文案。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp072-lifting-state-up --config ./vite.config.js
```

## 效果验证

1. 页面初始只展开一个 Panel。
2. 点击另一个 Panel 的“显示”。
3. 新 Panel 打开，旧 Panel 自动关闭。
4. 两个 Panel 内部都没有 `useState` 管理 `isActive`。
5. 能描述状态提升三步法。
6. 能解释为什么 owner 是最近公共父组件，而不是无脑放到应用根节点。

完成后继续 **RE-KP073：受控组件**。
