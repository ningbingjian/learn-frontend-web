# RE-KP188：Activity

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

学完本节后，你应该能够：

1. 理解 React 19.2 `<Activity>` 解决的核心问题。
2. 区分“隐藏 UI”与“卸载 UI”。
3. 使用 `mode="visible" | "hidden"` 控制 Activity Boundary。
4. 理解 hidden Activity 仍然保留内部 UI/State，并可低优先级继续渲染。
5. 知道 Activity 适合可能很快再次显示的后台 UI，而不是所有条件渲染的替代品。

> **本节核心代码**：`<Activity mode={isVisible ? 'visible' : 'hidden'}>`。
>
> **实验辅助代码**：编辑框只用于证明 Activity 中的 UI 可以先存在、后隐藏/恢复。

## 理论讲解

### 1. 普通条件渲染会卸载

常见写法：

```jsx
{isVisible && <Panel />}
```

当 `isVisible` 变成 `false`，`Panel` 会从 React Tree 中移除。它的本地 State 会随卸载而丢失。

### 2. Activity 是“隐藏并保留”

React 19.2 提供：

```jsx
<Activity mode={isVisible ? 'visible' : 'hidden'}>
  <Panel />
</Activity>
```

`hidden` 时，React 会把可隐藏的 DOM 视觉上设为 `display: none`，同时保存这棵子树的内部 State，以便以后恢复。

### 3. hidden 不等于什么都不做

隐藏树仍可能因为新 Props 发生 Render，但优先级低于当前可见内容。它可以承担“后台 UI”角色，例如：

- 用户很可能马上打开的侧边栏；
- Tab 切换后可能返回的页面；
- 提前准备下一屏所需代码/数据的 UI。

### 4. Effects 是另一个维度

Activity 保存 State，不代表 hidden 时 Effect 继续运行。hidden 时 Effects 会被清理；再次 visible 时重新建立。这个行为放在 RE-KP189 单独验证。

## 动手编码：从 0 到 1

### 第 1 步：准备可切换的可见状态

```jsx
const [isVisible, setIsVisible] = useState(true);
```

目标：让用户主动切换 Activity mode。

### 第 2 步：创建内部编辑器

```jsx
function DraftPanel() {
  const [draft, setDraft] = useState('Activity keeps me');
  // ...
}
```

为什么：State 放在 Activity 子树内部，才能观察隐藏/恢复语义。

### 第 3 步：使用 Activity Boundary

```jsx
<Activity mode={isVisible ? 'visible' : 'hidden'}>
  <DraftPanel />
</Activity>
```

预期：切换到 hidden 后面板消失，但并不是普通条件卸载。

## 运行案例

在 React Module 19 根目录运行：

```bash
npm install
npm run dev
```

打开：

```text
/19-built-in-components-fragment-strictmode-profiler-suspense-activity/kp188-activity/
```

操作：

1. 修改输入框文字。
2. 点击“隐藏 Activity”。
3. 再点击“显示 Activity”。
4. 观察输入内容仍然存在。

## 效果验证

你应该得到以下结论：

- `Activity` 是 React 内置组件，不产生一个“Activity DOM 标签”。
- `mode="hidden"` 用于隐藏并保存子树，而非彻底丢弃子树。
- hidden UI 的更新属于后台工作，优先级低于可见 UI。
- State 保留与 Effect 生命周期是两个不同问题。

最终源码：[`src/main.jsx`](./src/main.jsx)
