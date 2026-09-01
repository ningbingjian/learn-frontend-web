# TS-KP031：函数返回值推断

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 不写返回类型，TypeScript 从哪里知道函数返回 number/string/void？ |
| Learning Artifact | IDE Hover + 三种函数 Runtime `typeof` |
| 暂不理解 | 复杂泛型返回推断 |

## 只需要搞懂什么
1. return 表达式可以驱动返回类型推断。
2. 没有业务 return 的函数会推断为 void。
3. 公共 API 有时仍值得显式声明返回类型。

## 先预测
Hover `calculateTotal`、`buildLabel`、`logOrder`，分别会显示什么返回类型？

## 动手实验
运行最终源码：
```text
order=1001
Keyboard: ¥399.00
number
undefined
```
`calculateTotal` 的乘法给出 number 证据；模板字符串给出 string；`logOrder` 没有 return，静态推断 void，Runtime 调用结果为 undefined。

临时让某函数不同分支返回 number/string，观察推断如何变成 Union。

## Wrong Way / Production Boundary
- 不要为了形式机械给每个内部小函数写返回注解。
- 公共导出函数、递归/复杂 API 可以显式注解稳定契约并防止实现意外漂移。

## 只记住 3 件事
**返回表达式驱动推断；void 与 Runtime undefined 要分层看；API 边界可显式注解。**

## Challenge
给 `buildLabel` 加错误的显式 `: number`，观察编译器怎样用实现反证契约。

## Mastery Check
**Must** 能读返回推断；**Should** 判断何时显式注解；**Expert** 能用注解稳定公共 API。

## 最终源码与代码边界
- 核心：三个不同返回模式。
- 辅助：`typeof` 日志。
- [最终源码](./src/main.ts)
