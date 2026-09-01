# RE-KP112：Effect vs Render

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | 能在 Render 中算出的值为什么不该再用 Effect + State 算一次？ |
| Learning Artifact | 派生 State 双 Render → Render 直接计算对照 |

## 先制造冗余
```jsx
const [fullName, setFullName] = useState('');
useEffect(() => setFullName(first + ' ' + last), [first, last]);
```
Props 已经有 first/last，为什么还要等一次 Effect？

## 动手重构
### Step 0：运行 Effect 版本
观察一次输入变化会先 Render 旧 fullName，再 Effect setState，再 Render 新 fullName。
### Step 1：删除派生 State/Effect
```jsx
const fullName = first + ' ' + last;
```
### Step 2：再次观察
同一次 Render 直接得到正确值，没有额外同步链。

[查看最终源码](./src/main.jsx)

## 理论收束
Render 应是 Props/State → JSX 的纯计算阶段。可由现有输入直接计算的数据应在 Render 中计算；Effect 留给 Render 之外的外部同步。

## Wrong Way
- 用 Effect 保持两个 React State 互相同步。
- 因“计算发生在 render”就担心所有计算都必须 memo。
- 用 Effect 修复自己制造的重复 Source of Truth。

## Production Boundary
昂贵纯计算可在有数据证据时 memoize，但它仍属于 Render 模型，不因此变成 Effect。

## 本课只记住 3 件事
1. Render 负责派生 UI 数据。
2. Effect 不应复制 React 内部事实。
3. 少一个 Effect 常常少一条错误路径。

## Challenge
找一个 `useEffect(setState(...))`，判断是否能改成 Render 派生。

## Mastery Check
- **Must**：会识别派生 State。
- **Should**：能解释额外 Render 链。
- **Expert**：能区分纯计算优化与外部同步。
