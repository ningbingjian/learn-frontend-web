# RE-KP104：eslint-plugin-react-hooks

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `OPS-LAB` + `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | Hook Rules 很容易在重构中被破坏，怎样把人工记忆变成自动化静态检查？ |
| Learning Artifact | 违规代码 → lint 诊断 → 修复 |

## 先制造错误
写一个条件 `useState` 或缺依赖 Effect，观察人工 Review 是否一眼发现。

## 动手实验
### Step 0：接入/确认 React Hooks ESLint 规则
项目使用对应插件规则检查 Hook 调用和依赖。
### Step 1：故意违反 rules-of-hooks
运行 lint，读取具体错误位置，不只看“红线”。
### Step 2：修复代码结构
把条件移入 Hook 内部逻辑或拆组件，再运行验证。
### Step 3：理解 exhaustive-deps 是另一类契约
它帮助检查 Effect 等 Reactive Dependencies；不要把两个规则混成一句“Hook 不能乱写”。

[查看最终源码](./src/main.jsx)

## 理论收束
Lint 把 React 的调用/依赖约束前移到开发阶段，是课程里的 Learning Artifact，也是真实工程质量门禁。

## Wrong Way
- 看到 lint 就 `eslint-disable`。
- 依赖数组为了消警告随便删值。
- 把 lint 通过等同于业务逻辑一定正确。

## Production Boundary
CI 应执行 lint；团队规则要版本化并和 React 版本/Compiler 能力匹配。

## 本课只记住 3 件事
1. Hook Rules 应自动检查。
2. 先理解诊断再修复。
3. 禁用规则不是默认解决方案。

## Challenge
制造一个 conditional Hook 和一个 dependency 错误，分别解释对应规则。

## Mastery Check
- **Must**：会读 Hooks lint 报错。
- **Should**：能结构性修复而非 disable。
- **Expert**：能维护团队 React lint 门禁。
