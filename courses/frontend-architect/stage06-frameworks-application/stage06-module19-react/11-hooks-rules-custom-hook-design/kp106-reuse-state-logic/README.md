# RE-KP106：复用状态逻辑，而不是共享 State

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | 两个组件调用同一个 Custom Hook，会自动共享同一份 State 吗？ |
| Learning Artifact | 两个 `useCounter()` 实例独立变化实验 |

## 先预测
```jsx
const a = useCounter();
const b = useCounter();
```
点击 A 后，B 是否一起变化？

## 动手实验
### Step 0：把重复逻辑提取
```jsx
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(c => c + 1) };
}
```
### Step 1：两个组件分别调用
观察各自拥有独立 count。
### Step 2：只操作其中一个
另一个不会同步改变。
### Step 3：解释真正复用的东西
复用的是“如何创建/更新 State 的逻辑”；每个 Hook 调用仍属于自己的组件实例/Hook 位置。

[查看最终源码](./src/main.jsx)

## 理论收束
Custom Hook 共享逻辑，不共享 State 实例。真正共享事实仍需要提升 State、Context 或外部 Store。

## Wrong Way
- 以为抽成 Hook 就实现全局状态。
- 在 Hook 模块顶层放可变变量来“共享”。
- 为共享数据重复调用同一 Hook 后期待自动同步。

## Production Boundary
复用网络订阅、表单行为、设备状态读取逻辑很适合 Hook；共享业务 Source 仍要明确 Owner。

## 本课只记住 3 件事
1. Hook 复用逻辑。
2. 每次调用拥有自己的 Hook State。
3. 共享 State 需要共享 Owner/Store。

## Challenge
渲染 3 个 `useCounter` 消费者，验证彼此独立。

## Mastery Check
- **Must**：能解释逻辑复用与 State 共享区别。
- **Should**：能选择 Hook vs Context。
- **Expert**：能避免模块级可变单例伪装 Custom Hook。
