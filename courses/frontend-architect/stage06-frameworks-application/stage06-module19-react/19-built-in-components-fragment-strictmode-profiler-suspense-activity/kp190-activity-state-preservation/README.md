# RE-KP190：Activity 与状态保留

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

学完本节后，你应该能够：

1. 理解 Activity 最核心的体验价值：隐藏 UI 后恢复内部 State。
2. 区分 Activity hidden 与条件渲染卸载。
3. 使用可交互表单验证 State Preservation。
4. 判断哪些 UI 适合保存状态，哪些 UI 应真正卸载。
5. 理解“状态保留”并不等于“所有副作用继续运行”。

> **本节核心代码**：同一个 `Editor` 分别放进 Activity 与 `{show && <Editor />}` 中进行对照。
>
> **实验辅助代码**：输入框与计数器只用于让 State 是否保留可直接观察。

## 理论讲解

### 1. 条件卸载会销毁组件实例

```jsx
{show && <Editor />}
```

从 `true → false → true` 后，会得到一个新的 `Editor` 实例，本地 State 回到初始值。

### 2. Activity 保存 State

```jsx
<Activity mode={show ? 'visible' : 'hidden'}>
  <Editor />
</Activity>
```

hidden 后再次 visible，React 会恢复此前保存的内部 State。

### 3. 适合 Activity 的场景

- 关闭后很可能马上重新打开的侧边栏；
- Tab 页面间切换；
- 返回上一页时希望保留草稿、滚动上下文等瞬时 UI 状态。

### 4. 不要机械替换所有条件渲染

如果某个页面离开后就应该释放全部内存与状态，普通卸载仍然更合适。Activity 是一种显式的“保留后台 UI”设计选择。

## 动手编码：从 0 到 1

### 第 1 步：创建有本地 State 的 Editor

```jsx
const [text, setText] = useState('');
const [count, setCount] = useState(0);
```

### 第 2 步：Activity 版本

```jsx
<Activity mode={show ? 'visible' : 'hidden'}>
  <Editor title="Activity Editor" />
</Activity>
```

### 第 3 步：普通条件版本

```jsx
{show && <Editor title="Conditional Editor" />}
```

### 第 4 步：一次按钮同时隐藏两者

这样两个实验拥有相同操作时间线，差异只来自隐藏机制。

## 运行案例

```bash
npm run dev
```

打开：

```text
/19-built-in-components-fragment-strictmode-profiler-suspense-activity/kp190-activity-state-preservation/
```

分别在两个 Editor 中输入文字并点击计数器，然后隐藏、再显示。

## 效果验证

预期：

- Activity Editor：文字和 count 都保留。
- Conditional Editor：重新挂载，文字和 count 回到初始值。
- 这说明 Activity 的核心不是“更高级的 CSS display”，而是 React 参与管理的隐藏/恢复生命周期。

最终源码：[`src/main.jsx`](./src/main.jsx)
