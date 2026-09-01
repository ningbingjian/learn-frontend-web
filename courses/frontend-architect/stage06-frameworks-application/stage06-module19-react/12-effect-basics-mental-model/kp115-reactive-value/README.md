# RE-KP115：Reactive Value

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | 哪些变量会随 Render 改变，从而必须被 Effect 视为 reactive dependency？ |
| Learning Artifact | Props/State/局部变量 vs 模块常量分类实验 |

## 先分类
`roomId` Prop、`count` State、由它们计算的 `url`、模块顶层常量 `SERVER_HOST`，哪些是 Reactive？

## 动手推导
### Step 0：标记组件内部输入
Props、State，以及由这些值在 Render 中计算的变量，都可能随 Render 变化。
### Step 1：把真正恒定配置移到组件外
```js
const SERVER_HOST = 'https://example.com';
```
它不再属于某次 Render 的 reactive value。
### Step 2：让 lint 帮你验证模型
依赖不是凭感觉挑选。

[查看最终源码](./src/main.jsx)

## 理论收束
Reactive Value 是参与 React Render 数据流、可能在重新 Render 时变化的值。Effect 使用它，就需要声明依赖；把值移出组件是“证明它不会随 Render 变化”的一种方式。

## Wrong Way
- 把所有局部变量都说成非 reactive。
- 把对象/函数依赖问题用删除依赖解决。
- 模块变量其实会变化却假装常量。

## Production Boundary
正确识别 Reactive Value 是 Effect、useMemo/useCallback 乃至 Custom Hook 设计的共同基础。

## 本课只记住 3 件事
1. Props/State 是核心 Reactive Values。
2. Render 中由它们派生的值也可能 reactive。
3. 想移除依赖要改变数据来源，而不是改数组文字。

## Challenge
给 8 个变量分类 reactive / non-reactive 并说明理由。

## Mastery Check
- **Must**：会识别 Props/State 依赖。
- **Should**：会通过代码位置证明 non-reactive。
- **Expert**：能诊断复杂 Effect 的依赖来源。
