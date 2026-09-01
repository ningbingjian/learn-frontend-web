# RE-KP086：createContext

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 一份数据需要跨很多中间层传给深层子树时，怎样先定义一个“共享通道”的身份和边界？ |
| Learning Artifact | Props chain → Context Object 创建与 Provider 边界图 |

## 前置问题

Chapter 08 已学过 Props Drilling：不是所有深层 Props 都要 Context。现在假设主题/当前用户确实属于整个子树的横切数据。

## 动手：从 0 到 1

### Step 0：先画共享范围
```text
App
└─ SettingsArea
   ├─ Toolbar
   └─ DeepPanel ← needs theme
```

### Step 1：创建 Context Object
```jsx
import { createContext } from 'react';
export const ThemeContext = createContext('light');
```

### Step 2：先理解它还没有“读取”数据
`createContext` 只是创建 Context 身份和默认值；消费留到下一课 `useContext`。

### Step 3：确定 Provider 应包哪棵子树
不要默认放到应用最顶层；边界应覆盖真正消费者。

[查看最终源码](./src/main.jsx)

## 心智模型
```text
createContext(defaultValue)
        ↓
Context Object (shared channel identity)
        ↓
Provider supplies value
        ↓
Consumers read nearest provider
```

## 理论收束
Context 允许父级向后代树提供值，而无需每层手动转发同一个 Prop。`createContext` 创建的是 Context 对象；真正读取/提供是后续步骤。

## Wrong Way
- 每个 State 都 createContext。
- 把 Context 当事件总线。
- Context 定义和具体页面内部数据强耦合，难以复用。

## Production Boundary
主题、Locale、认证上下文、子树级配置是典型场景；高频局部 State 不应只为省 Props 就进入 Context。

## 本课只记住 3 件事
1. createContext 创建共享通道身份。
2. 默认值不是全局可变 Store。
3. 先设计 Provider 范围，再设计消费。

## Challenge
为 `LocaleContext` 画出最小 Provider 子树，不写 useContext。

## Mastery Check
- **Must**：会创建 Context 对象。
- **Should**：能判断 Context 是否必要。
- **Expert**：能设计稳定的 Context 边界和模块 API。
