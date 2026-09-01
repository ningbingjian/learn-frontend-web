# TS-KP019：`boolean`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 两个 boolean 条件怎样形成可检查的权限决策？ |
| Learning Artifact | `tsc` + Console `first/second` + Runtime `typeof` |
| 暂不理解 | Boolean Literal Type、Truthiness Narrowing |

## 这节课只需要搞懂什么

1. `boolean` 描述 `true/false`。
2. 布尔运算仍遵循 JavaScript Runtime。
3. TypeScript 能阻止非 boolean 值进入明确的 boolean 契约。

## 先预测

`isLoggedIn=true`、`hasPermission=false` 时，`loggedIn && permitted` 是什么？第二次把 permission 改成 `true` 呢？

## 动手实验

### Step 0：建立契约

```ts
function canOpenAdmin(loggedIn: boolean, permitted: boolean): boolean
```

### Step 1：运行两组输入

实际：

```text
first=false
second=true
boolean
```

### Step 2：制造负向实验

临时传 `'yes'`，观察 `tsc` 拒绝。恢复后保留最终源码。

## 心智模型与理论

```text
boolean input → JS logical && → boolean result
      ↑
TypeScript 静态约束参数和值关系
```

## Wrong Way / Production Boundary

- boolean 适合二态事实，不适合硬塞 loading/success/error 多状态；后者应用 Union/State Model。
- `if (value)` 的 Truthiness 与 `boolean` 类型不是同一概念，后续专门学习。

## 本课只记住 3 件事

1. **boolean 只有 true/false 类型域。**
2. **逻辑结果仍由 JS 执行。**
3. **多状态业务不要滥用多个 boolean 拼接。**

## Challenge

把“管理员访问”扩成三条件，先画 Truth Table 再写函数。

## Mastery Check

**Must** 会声明/组合 boolean；**Should** 能识别 boolean flag 爆炸；**Expert** 能把复杂状态改成判别联合。

## 最终源码与代码边界

- 核心：boolean 参数与返回关系。
- 辅助：日志/`typeof`。
- [最终源码](./src/main.ts)
