# TS-KP017：`string`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 本课主问题 | 为什么字符串可以安全调用 `trim()` / `toUpperCase()`，而 number 不行？ |
| Learning Artifact | IDE 类型推断 + `tsc` 负向实验 + Node `typeof` |
| 暂不理解 | String Literal Type、Template Literal Type |

## 这节课只需要搞懂什么

1. 小写 `string` 描述 JavaScript 字符串值。
2. TypeScript 根据 `string` 允许字符串成员并拒绝不兼容操作。
3. 局部变量可以由初始值自动推断，不必机械注解。

## 前置状态与先预测

源码中：

```ts
const productName: string = 'Mechanical Keyboard';
const category = 'Accessories';
```

预测编辑器 Hover `category` 会不会知道它是 string；再预测 `normalizeLabel(123)` 能否通过。

## 动手实验

### Step 0：调用字符串能力

```ts
value.trim().toUpperCase()
```

`tsc` 允许，因为参数契约是 `string`。

### Step 1：观察推断

`category` 没写 `: string`，但仍能传给 `normalizeLabel()`。这时给现象命名：**Type Inference**。

### Step 2：制造错误

临时调用：

```ts
normalizeLabel(123)
```

观察 Diagnostic；恢复后运行输出：

```text
MECHANICAL KEYBOARD / ACCESSORIES
string
```

第二行来自 JavaScript `typeof`，把静态类型与真实运行时值并排观察。

## 心智模型

```text
"Accessories" → TS 推断 string → string API 可用
                            ↓
                     JS Runtime typeof = "string"
```

## Wrong Way / Production Boundary

- 优先使用小写 `string`，不要把包装对象 `String` 当常规基础类型。
- 字符串类型正确不代表内容业务合法，例如邮箱、URL、UUID 仍需额外验证。

## 本课只记住 3 件事

1. **小写 `string` 描述 JS 字符串。**
2. **字符串成员由类型约束提供静态反馈。**
3. **明显初始化场景优先让 TypeScript 推断。**

## Challenge

新增 `const sku = ' KB-001 ';`，不写注解，用 `normalizeLabel()` 处理；再临时赋 number 观察错误。

## Mastery Check

### Must
会声明/使用 string 并解释输出。
### Should
能识别何时注解冗余。
### Expert
能区分 primitive string、literal string 和业务格式验证职责。

## 最终源码与代码边界

- **核心代码**：string 参数、返回值与字符串 API。
- **辅助代码**：`typeof` 仅用于观察 Runtime。
- **最终源码**：[`src/main.ts`](./src/main.ts)
