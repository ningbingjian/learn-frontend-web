# RE-KP102：普通 Hook 不能放条件和循环

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | `if (enabled) useEffect(...)` 看起来很自然，为什么会破坏 Hook 对应关系？ |
| Learning Artifact | 条件 Hook 顺序变化故障 + 正确重构 |

## 先制造问题
```jsx
if (enabled) {
  useEffect(...);
}
const [count] = useState(0);
```
当 enabled 从 true 变 false，后面的 Hook 序号发生什么？

## 动手修复
### Step 0：把 Hook 保持在顶层
```jsx
useEffect(() => {
  if (!enabled) return;
  // effect logic
}, [enabled]);
```
### Step 1：循环同理
不要按数据项循环调用 Hook；改为子组件，让每个组件实例拥有自己稳定的 Hook 顺序。
### Step 2：验证 lint
观察规则错误消失。

[查看最终源码](./src/main.jsx)

## 理论收束
条件应进入 Hook callback/返回逻辑，而不是控制 Hook 是否被调用。动态列表的 Hook 状态应通过组件实例身份扩展，而非动态改变单个组件的 Hook 数量。

## Wrong Way
- `if`、`for`、`while` 内普通 Hook。
- `try/catch` 中普通 Hook。
- 条件 early return 放在部分 Hook 之后。

## Production Boundary
结构复杂时优先拆组件/Custom Hook，而不是对 lint disable。

## 本课只记住 3 件事
1. 条件控制逻辑，不控制普通 Hook 调用。
2. 循环项用组件实例表达。
3. 不要通过 disable 绕过规则。

## Challenge
把循环 `items.map(() => useState())` 重构为 `<Item />`。

## Mastery Check
- **Must**：能修复条件 Hook。
- **Should**：会通过组件拆分解决动态数量。
- **Expert**：能诊断复杂控制流中的 Hook 顺序风险。
