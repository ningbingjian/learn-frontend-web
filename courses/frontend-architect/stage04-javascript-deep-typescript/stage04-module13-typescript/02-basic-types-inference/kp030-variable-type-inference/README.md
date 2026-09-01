# TS-KP030：变量类型推断

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 不写 `: number` / `: string`，TypeScript 为什么仍知道变量能做什么、不能被赋什么？ |
| Learning Artifact | IDE Hover + 合法重赋值 + 非法重赋值 Diagnostic |
| 暂不理解 | Literal Widening、Best Common Type |

## 只需要搞懂什么
1. 初始化表达式可以提供推断证据。
2. 推断不是 any；推断结果仍然约束后续操作。
3. 明显局部值不必机械重复类型注解。

## 先预测
Hover `retryCount`、`label`、`enabled`、`config`，它们会是什么类型？

## 动手实验
### Step 0：不写注解
```ts
let retryCount = 0;
let label = 'pending';
const enabled = true;
```
### Step 1：使用推断后的能力
`retryCount += 1`、`label.toUpperCase()` 都通过。
### Step 2：制造错误
临时 `retryCount = '1'` 或 `label = 1`，观察 Diagnostic。
### Step 3：运行
```text
PENDING:1:true
/api/products:3000
```

## 心智模型
```text
initializer → inference → variable type → later assignments checked
```

## Wrong Way / Production Boundary
- `const x = 1` 不需要为了“像 TypeScript”写 `const x: number = 1`。
- 公共 API、函数边界、复杂对象有时仍值得显式注解；推断优先不等于禁止注解。

## 只记住 3 件事
**初始值能驱动推断；推断仍然安全；局部显然类型优先减少冗余注解。**

## Challenge
删除一个显式注解并用 Hover 验证；再制造错误证明类型并未丢失。

## Mastery Check
**Must** 能读 Hover 推断；**Should** 判断何时省略注解；**Expert** 能平衡 API 可读性与局部推断。

## 最终源码与代码边界
- 核心：无显式注解变量与后续检查。
- 辅助：日志展示运行结果。
- [最终源码](./src/main.ts)
