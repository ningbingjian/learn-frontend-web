# Type Error Observatory Report

## 实验矩阵

项目覆盖 Literal Widening、Contextual Typing、Assignability、Assertion、配置、模块、语法和 Runtime Validation。

## 核心结论

1. 诊断数量不等于根因数量。
2. 类型视图不会改变 Runtime 对象。
3. 断言不会创造 Runtime 证据。
4. LSP 与 CLI 应共享相同项目配置；不一致时先核对工作区版本和 tsconfig。
5. Expected Error 是负向回归，不是静默忽略。

## Annotation Policy

局部值优先推断；公共函数、跨模块输出和不稳定返回边界显式标注。

## Assertion Budget

双重断言预算为 0。其他断言必须记录位置、理由、外部证据、Owner 和移除条件。
