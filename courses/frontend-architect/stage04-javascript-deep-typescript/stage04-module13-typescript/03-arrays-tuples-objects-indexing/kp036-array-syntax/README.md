# TS-KP036：`T[]` 与 `Array<T>`

> [返回 Chapter 03](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | `number[]` 与 `Array<number>` 是两种不同数组，还是同一种元素约束的两种写法？ |
| Learning Artifact | 互相赋值 + sum/map Runtime 结果 + 错误元素负向实验 |
| 暂不理解 | readonly array、Tuple、泛型体系 |

## 只需要搞懂什么
1. `T[]` 与 `Array<T>` 表达同类可变数组元素类型。
2. 容器类型和元素类型要分开看。
3. 数组方法 callback 会继承元素类型信息。

## 先预测
`number[]` 能否赋给 `Array<number>`？`Array<string>` 能否赋给 `string[]`？

## 动手实验
最终源码互相赋值并运行：
```text
306
KEYBOARD | MOUSE
```
临时给 `productIds.push('104')`，观察 Diagnostic；`normalize()` 的 map value 自动是 string。

## 心智模型
```text
number[]  ≡ Array<number>
     container element = number
```

## Wrong Way / Production Boundary
- 两种语法主要是风格/组合场景差异，不要制造无意义团队争论。
- 数组只保证元素类型，不保证长度和位置语义；固定位置用 Tuple。

## 只记住 3 件事
**两种语法等价；元素类型贯穿数组 API；长度/位置不是普通数组契约。**

## Challenge
把 sum 改成 `Array<number>` 参数，验证调用端无需改动。

## Mastery Check
**Must** 会两种数组语法；**Should** 能追踪 callback 元素类型；**Expert** 能按 API 可读性选择语法。

## 最终源码与代码边界
- 核心：两种数组语法与互相赋值。
- 辅助：sum/normalize 证明元素能力。
- [最终源码](./src/main.ts)
