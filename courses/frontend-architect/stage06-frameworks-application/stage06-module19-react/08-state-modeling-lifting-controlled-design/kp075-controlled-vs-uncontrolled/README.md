# RE-KP075：受控与非受控的选择

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 什么时候值得把组件变成受控，什么时候让它自己管理 State 更简单？ |
| Learning Artifact | 同一组件 Controlled / Uncontrolled API Trade-off 对照 |

## 先判断，不先背结论

给你三个需求：父级一键重置、两个实例联动、组件完全独立使用。哪几个更需要 Controlled？先写判断。

## 动手对照

### Step 0：先运行 Uncontrolled 版本

组件自己拥有当前值，父级只提供初始配置。观察它的优点：接入简单、局部自治。

### Step 1：加入跨组件协调需求

一旦父级需要统一重置/同步，Local State 让协调变困难。

### Step 2：切成 Controlled API

```jsx
<Widget value={value} onChange={setValue} />
```

观察父级获得控制能力，同时承担更多 State 管理责任。

### Step 3：形成 Trade-off 表

```text
Uncontrolled → 接口简单 / 局部自治 / 外部协调弱
Controlled   → 外部协调强 / 可组合 / 父级责任更大
```

[查看最终源码](./src/main.jsx)

## 理论收束

Controlled / Uncontrolled 不是优劣排名，而是 Ownership 选择。组件库常同时支持两种模式，但必须明确“当前值”和“初始值”的契约。

## Wrong Way

- 所有组件都强制受控。
- 同一份值同时由内部 State 和外部 value 控制。
- 把“是否使用 input DOM defaultValue”当成全部定义。

## Production Boundary

需要表单联动、路由同步、外部校验、统一重置时更偏 Controlled；纯局部交互可以 Uncontrolled。

## 本课只记住 3 件事

1. 选择标准是 Ownership 与协调需求。
2. Controlled 提升可组合性，也增加父级责任。
3. Uncontrolled 简单，但外部控制能力有限。

## Challenge

给同一 Widget 设计 `value/onChange` 与 `defaultValue` 两套 API，并写出冲突时的规则。

## Mastery Check

- **Must**：能根据需求选择模式。
- **Should**：能设计双模式 API。
- **Expert**：能避免受控/非受控切换造成的状态歧义。
