# RE-KP101：Hooks 要在 React 函数顶层调用

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | React 为什么要求 Hooks 从组件/Custom Hook 顶层稳定调用，而不能当普通函数随便执行？ |
| Learning Artifact | 稳定 Hook 顺序模型 + lint 观察 |

## 先预测
组件每次 Render 都调用 `useState → useEffect → useRef`。React 如何知道“第二个 Hook”属于哪份状态？

## 动手建模
### Step 0：写稳定顺序
```jsx
const [count, setCount] = useState(0);
useEffect(...);
const ref = useRef(null);
```
### Step 1：连续 Render
Props/State 改变后调用顺序保持一致。
### Step 2：用序号理解
```text
Render #1: Hook1 / Hook2 / Hook3
Render #2: Hook1 / Hook2 / Hook3
```
React 可以把对应 Hook 状态关联起来。

[查看最终源码](./src/main.jsx)

## 理论收束
普通 Hooks 应在 React Function Component 或 Custom Hook 顶层调用。稳定调用顺序是 React 能正确关联 Hook State 的基础心智模型。

## Wrong Way
- 普通事件函数里调用 useState。
- class method / 普通 util 调 Hook。
- 提前 return 让后续 Hook 某些 Render 不执行。

## Production Boundary
不要“记语法位置”而已；Code Review 时要检查所有 Render 路径是否保持 Hook 结构稳定。

## 本课只记住 3 件事
1. Hook 属于 React 函数执行模型。
2. 普通 Hook 调用顺序必须稳定。
3. 顶层规则让状态关联可预测。

## Challenge
画出包含 3 个 Hook 的两次 Render 顺序表。

## Mastery Check
- **Must**：知道 Hook 合法调用位置。
- **Should**：能识别 early return 隐患。
- **Expert**：能用调用顺序模型解释规则。
