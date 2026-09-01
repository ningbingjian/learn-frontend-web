# RE-KP099：测量 DOM

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Should |
| 本课主问题 | 组件需要知道真实像素尺寸时，怎样在 DOM 已提交之后测量，而不是在 Render 阶段猜？ |
| Learning Artifact | `getBoundingClientRect()` 测量实验 |

## 先预测
Render 期间 JSX 只描述 UI。浏览器真正完成 DOM 后，什么时候才可能获得可靠 `width/height`？

## 动手实验
### Step 0：给目标节点绑定 Ref
```jsx
const boxRef = useRef(null);
<div ref={boxRef}>...</div>
```
### Step 1：用户动作后读取
```jsx
const rect = boxRef.current.getBoundingClientRect();
```
观察 width/height/top/left。
### Step 2：改变内容或窗口
再次测量，证明尺寸是 DOM/布局的运行时事实，不是 React State 自动知道的值。
### Step 3：需要首屏布局前同步测量时再考虑 `useLayoutEffect`
本课先建立 DOM Ref + measure 的行为模型，下一阶段再讨论 Effect 时机。

[查看最终源码](./src/main.jsx)

## 理论收束
DOM 测量依赖浏览器 Layout 结果。Ref 让 React 世界连接真实节点，`getBoundingClientRect` 返回当前几何信息。只有 UI 真需要这个外部事实时才把结果放入 State。

## Wrong Way
- Render 中直接读 DOM。
- 每个 Render 都无条件测量并 setState，形成循环。
- 用 JS 测量解决纯 CSS 能处理的响应式布局。

## Production Boundary
Tooltip、Popover、虚拟列表、拖拽、Canvas overlay 常需要测量；优先 CSS，必要时再测量。

## 本课只记住 3 件事
1. 测量对象是已 Commit 的 DOM。
2. Ref 是桥梁，Layout 是浏览器事实。
3. 只有影响 UI 的测量结果才需要 State。

## Challenge
改变容器宽度后重新测量，并解释为何结果变化不需要修改 Ref 对象。

## Mastery Check
- **Must**：会用 Ref 测量 DOM。
- **Should**：能判断测量时机。
- **Expert**：能避免 Layout Thrashing。
