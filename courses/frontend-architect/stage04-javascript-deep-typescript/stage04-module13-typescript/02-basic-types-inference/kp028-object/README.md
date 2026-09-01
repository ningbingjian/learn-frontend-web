# TS-KP028：`object`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | TypeScript 的小写 `object` 到底接受哪些 JavaScript 值？ |
| Learning Artifact | object/array/function 三组调用 + primitive 负向实验 |
| 暂不理解 | `{}` / `Object` 差异（下一课） |

## 只需要搞懂什么
1. `object` 排除 string/number/boolean/bigint/symbol/null/undefined 等 primitive。
2. 普通对象、数组、函数都属于非 primitive 值。
3. object 本身不描述具体有哪些业务字段。

## 先预测
`{}`、`[1,2,3]`、`()=>'ok'` 能否传入？`'text'` 呢？

## 动手实验
运行：
```text
object keys=2
array length=3
function object
```
然后临时 `describeObject('text')`，观察 `tsc` 拒绝。

### 立即解释
`object` 是“非 primitive”边界，不是“普通字典对象”的同义词。

## Wrong Way / Production Boundary
- 如果需要 `name/price` 等字段，应写具体对象类型，而不是只写 object。
- 接受 object 后通常还需要 Narrowing 才能访问具体能力。

## 只记住 3 件事
**object=非 primitive；数组/函数也能进入；业务结构仍需具体类型。**

## Challenge
分别测试 Date、Map、null 和 number，先预测再 check。

## Mastery Check
**Must** 能判断 object 接受范围；**Should** 不用 object 代替业务 DTO；**Expert** 能设计合适的 object boundary。

## 最终源码与代码边界
- 核心：object + Runtime 分类。
- 辅助：Array.isArray/typeof 用于观察分类。
- [最终源码](./src/main.ts)
