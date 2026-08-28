# RE-KP075：受控与非受控的选择

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 比较受控组件与非受控组件的能力边界。
2. 理解非受控组件通常配置更少，但外部协调能力更弱。
3. 理解受控组件更灵活，但父组件要承担状态和事件回调配置。
4. 能根据“是否需要跨组件协调”选择状态归属。
5. 知道 controlled / uncontrolled 是设计视角，不是绝对二分法。

> **本节核心代码**：同一个页面同时展示 `UncontrolledPanel` 与 `ControlledPanel`。  
> **实验辅助代码**：父级“强制打开/关闭”按钮用于观察两种 API 的差异。

## 理论讲解

### 1. 两种模式的核心差异

非受控：

```text
组件自己保存关键 State
父组件只做有限配置
```

受控：

```text
父组件保存关键 State
子组件接收 value/状态 Prop
子组件通过 callback 报告用户意图
```

### 2. 非受控的优点

调用简单：

```jsx
<UncontrolledPanel title="帮助" />
```

优点：

- Props 少；
- 父组件负担小；
- 局部独立场景接入快。

缺点：

- 父级不容易强制改变当前状态；
- 多个实例很难统一协调。

### 3. 受控的优点

调用形式：

```jsx
<ControlledPanel
  open={panelOpen}
  onOpenChange={setPanelOpen}
/>
```

优点：

- 父级可以决定当前状态；
- 可以和其他组件同步；
- 容易加入业务规则、路由状态、权限约束。

代价：

- API 配置更多；
- 父组件承担更多状态管理责任。

### 4. 什么时候优先非受控

如果状态：

- 只影响这个组件自身；
- 不需要外部同步；
- 父级不关心其当前值；

保留本地 State 往往更自然。

### 5. 什么时候优先受控

如果状态：

- 需要多个组件保持一致；
- 父级需要主动修改；
- 状态和业务流程、URL、权限或其他领域状态绑定；

受控设计通常更合适。

### 6. 不要把两者当成绝对标签

一个组件可以：

```text
选中值由父级控制
+
hover 状态自己保存
+
动画阶段自己保存
```

所以实际设计要逐份 State 判断 owner，而不是给整个组件贴永久标签。

## 动手编码：从 0 到 1

### 第 0 步：建立非受控 Panel

```jsx
function UncontrolledPanel({ title }) {
  const [open, setOpen] = useState(false);
  // ...
}
```

**本步目标**：复习局部 State。  
**为什么这样写**：它不需要父级参与即可工作。  
**运行后观察**：组件自行开关。

### 第 1 步：建立受控 Panel

```jsx
function ControlledPanel({ title, open, onOpenChange }) {
  return (
    <button onClick={() => onOpenChange(!open)}>
      {open ? '关闭' : '打开'}
    </button>
  );
}
```

**本步目标**：让当前值完全由 Props 驱动。  
**为什么这样写**：子组件只表达用户意图，不拥有 `open`。  
**运行后观察**：没有父级传入状态时，它自己无法决定当前值。

### 第 2 步：父组件成为受控状态 owner

```jsx
const [controlledOpen, setControlledOpen] = useState(false);
```

传入：

```jsx
<ControlledPanel
  open={controlledOpen}
  onOpenChange={setControlledOpen}
/>
```

**本步目标**：完成受控闭环。  
**为什么这样写**：唯一事实在父级。  
**运行后观察**：子组件点击后，通过 callback 更新父级，再由新 Props 驱动 UI。

### 第 3 步：增加父级强制控制按钮

```jsx
<button onClick={() => setControlledOpen(true)}>
  父级强制打开受控 Panel
</button>
```

**本步目标**：观察受控模式的协调能力。  
**为什么这样写**：父级拥有 State，就能从任何业务入口改变它。  
**运行后观察**：父级按钮可以直接改变受控 Panel。

### 第 4 步：对比非受控 Panel

尝试用同一个父级按钮控制非受控 Panel。

**本步目标**：理解能力差异不是语法差异。  
**为什么这样写**：非受控 Panel 没有暴露当前 `open` 的控制 API。  
**运行后观察**：父级不能直接指定其当前展开值。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`UncontrolledPanel` 与 `ControlledPanel` 的 State owner 对比。
- **实验辅助代码**：父级强制打开/关闭按钮。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp075-controlled-vs-uncontrolled --config ./vite.config.js
```

## 效果验证

1. 两个 Panel 都可以完成开关交互。
2. 非受控 Panel 自己保存状态。
3. 受控 Panel 的状态保存在父组件。
4. 父级按钮可以直接控制受控 Panel。
5. 能根据“是否需要协调”解释为什么选择不同模式。

完成后继续 **RE-KP076：Props Drilling 的识别**。
