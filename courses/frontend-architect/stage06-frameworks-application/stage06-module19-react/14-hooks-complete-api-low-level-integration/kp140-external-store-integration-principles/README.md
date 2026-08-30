# RE-KP140：外部 Store 集成原则

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 判断什么时候应该继续使用 React 内置 State，什么时候才需要接入外部 Store。
2. 理解 external store 的职责是“在 React 之外持有状态”，而 `useSyncExternalStore` 只是安全订阅桥梁。
3. 会把 `subscribe`、`getSnapshot` 和 mutation API 放在稳定的 Store 边界中。
4. 理解 snapshot 必须稳定且可比较，避免每次读取都创建新对象。
5. 会把外部 Store 包装进 Custom Hook，让业务组件不直接耦合订阅协议。

> **本节核心代码**：`preferencesStore` + `usePreferences()`，展示外部 Store 的稳定订阅边界。  
> **实验辅助代码**：组件里的 `draftName` 故意继续使用 `useState`，用于说明“不是所有状态都应该搬进 Store”。

## 理论讲解

### 1. 默认优先 React 内置 State

React 官方对 `useSyncExternalStore` 的定位很明确：大多数组件只需要 props、state、context；只有在需要订阅 React 之外会变化的数据时，才需要 external store bridge。

典型外部数据源包括：

- 已存在的第三方状态管理库；
- 浏览器 API，例如 `navigator.onLine`；
- React 之外维护的 legacy store；
- 微前端或跨运行时共享的数据源。

如果只是当前组件的输入框草稿：

```jsx
const [draftName, setDraftName] = useState('');
```

没有必要为了“统一状态管理”强行放进外部 Store。

### 2. Store 与 React Adapter 分层

推荐把职责拆成两层：

```text
External Store
├─ current snapshot
├─ subscribe(listener)
└─ mutations

React Adapter
└─ useSyncExternalStore(subscribe, getSnapshot)
```

业务组件只调用：

```jsx
const preferences = usePreferences();
```

而不是到处重复写订阅细节。

### 3. snapshot 必须稳定

如果 Store 没变化：

```js
getSnapshot() === getSnapshot()
```

应该成立，或者至少返回 `Object.is` 认为相同的值。

错误做法：

```js
function getSnapshot() {
  return { ...state };
}
```

这会让每一次读取都出现新对象。

更合适的是 mutation 时创建新 snapshot：

```js
snapshot = { ...snapshot, theme: nextTheme };
```

`getSnapshot()` 只是返回缓存结果。

### 4. subscribe 应返回 unsubscribe

Store 必须具备对称资源管理：

```js
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
```

React 负责调用订阅与取消订阅，Store 负责正确维护 listener 集合。

### 5. mutation 仍然属于 Store API

`useSyncExternalStore` 解决的是：

```text
React 怎样安全读取并订阅外部数据
```

它不规定：

```text
Store 必须怎样更新数据
```

因此 mutation 可以是：

```js
preferencesStore.setTheme('dark');
```

或者由状态管理库自己定义。

### 6. SSR 需要额外考虑 getServerSnapshot

如果组件需要 SSR，需要保证：

```text
服务端 snapshot
=
hydration 初始 snapshot
```

这时通常提供第三个参数 `getServerSnapshot`，并确保服务端数据能被客户端复用。

## 动手编码：从 0 到 1

### 第 0 步：先保留局部 State

```jsx
function ProfileEditor() {
  const [draftName, setDraftName] = useState('Ada');
  return <input value={draftName} onChange={event => setDraftName(event.target.value)} />;
}
```

这类输入草稿属于组件自身生命周期，留在 React State 即可。

### 第 1 步：创建真正的外部 Store

```js
let snapshot = {
  theme: 'light',
  compact: false,
};

const listeners = new Set();
```

这些数据存在于 React 之外。

### 第 2 步：实现 subscribe / getSnapshot

```js
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}
```

### 第 3 步：mutation 时创建新 snapshot

```js
function setTheme(theme) {
  snapshot = { ...snapshot, theme };
  listeners.forEach(listener => listener());
}
```

Store 没变化时，`getSnapshot()` 不会凭空创建新对象。

### 第 4 步：封装 Custom Hook

```jsx
function usePreferences() {
  return useSyncExternalStore(
    preferencesStore.subscribe,
    preferencesStore.getSnapshot,
  );
}
```

业务组件只面对语义化 Hook。

### 第 5 步：让两个组件读取同一 Store

`PreferencesPanel` 修改外部 Store；`PreferencesSummary` 读取同一个 snapshot。

与此同时 `draftName` 继续是本地 State，用于证明：

```text
Local UI State 和 External Store 可以并存
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`preferencesStore`、稳定 snapshot、`usePreferences()`。
- **实验辅助代码**：`draftName` 与展示按钮只用于比较 State 边界。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp140-external-store-integration-principles --config ./vite.config.js
```

## 效果验证

1. 修改姓名草稿，只改变当前组件的 React State。
2. 切换 Theme / Compact，所有 external-store Consumer 同步更新。
3. Store 没变化时，多次 `getSnapshot()` 返回同一个对象引用。
4. 能解释 `useSyncExternalStore` 为什么不是“新的 Redux”。
5. 能说明为什么业务组件最好通过 Custom Hook 使用 external store。

完成后继续 **RE-KP141：Render Phase**。
