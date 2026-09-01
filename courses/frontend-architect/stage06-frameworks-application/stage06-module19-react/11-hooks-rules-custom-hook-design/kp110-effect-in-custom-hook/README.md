# RE-KP110：Custom Hook 中的 Effect

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Should |
| 本课主问题 | 把 Effect 封装进 Custom Hook 后，外部系统的 setup/cleanup 生命周期去了哪里？ |
| Learning Artifact | 组件内订阅 Effect → `useOnlineStatus/useChatRoom` 封装 |

## 先观察重复代码
多个组件都写 `addEventListener/removeEventListener` 或 connect/disconnect，真正重复的是 UI 还是同步逻辑？

## 动手重构
### Step 0：先让 Effect 在组件中正确工作
必须先有 setup/cleanup 对称的可验证版本。
### Step 1：提取到 Custom Hook
```jsx
function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    // subscribe
    return () => { /* unsubscribe */ };
  }, []);
  return online;
}
```
### Step 2：两个组件分别调用
每个调用实例拥有自己的 Hook 生命周期，但复用了同步逻辑。
### Step 3：参数变化
若 Hook 接收 `roomId`，Effect 依赖仍必须正确表达 reactive input。

[查看最终源码](./src/main.jsx)

## 理论收束
Custom Hook 可以组合 Effect，从而把“如何同步某个外部系统”封装为领域能力。封装不会取消 Effect 的 dependency/cleanup 规则。

## Wrong Way
- 把 Effect 藏进 Hook 后忽略依赖。
- 一个 Hook 混合多个无关外部系统。
- 通过自定义 Hook 名称掩盖副作用语义。

## Production Boundary
适合订阅、媒体查询、连接、浏览器 API 同步；下一 Chapter 会系统学习 Effect 的真实职责。

## 本课只记住 3 件事
1. Custom Hook 能封装同步逻辑。
2. Effect 生命周期规则仍完整存在。
3. Hook 应表达单一领域能力。

## Challenge
把 window resize 订阅抽成 `useWindowSize`，确保 cleanup 正确。

## Mastery Check
- **Must**：会在 Custom Hook 中使用 Effect。
- **Should**：能保留 dependency/cleanup 契约。
- **Expert**：能设计可组合外部同步 Hook。
