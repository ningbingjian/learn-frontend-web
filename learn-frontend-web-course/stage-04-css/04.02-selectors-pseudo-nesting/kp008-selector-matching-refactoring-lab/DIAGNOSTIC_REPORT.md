# DIAGNOSTIC_REPORT：Selector Matching & Refactoring Lab

> 使用方法：先运行 Broken Baseline，再逐项填写。不要先复制 `REFERENCE_SOLUTION.md`。  
> 每项必须包含“预测 → 证据 → 根因 → 最小修复 → 回归”。

## 项目信息

- 学习者：
- 日期：
- 浏览器与版本：
- Git Commit：
- Broken URL：`http://127.0.0.1:4173/index.html`
- Solution URL：`http://127.0.0.1:4173/solution.html`

## Evidence 规则

每个 Case 至少保留两类证据：

```text
DevTools Styles / Computed
querySelectorAll() / matches()
键盘操作
DOM Tree
CSS.supports()
getComputedStyle()
```

---

## S01：Invalid Selector List

### 症状

### Selector 源码拆解

### 预测 Match Set

### 实际 Evidence

### Root Cause

### 最小修复

### 回归检查

---

## S02：Attribute Substring Over-match

### 症状

### 预测 Match Set

### 实际 Match Set

### Root Cause

### 精确建模方案

### 回归检查

---

## S03：Deep / Broad Descendant Coupling

### 组件所有权

### 当前 Selector

### 被误伤节点

### DevTools Evidence

### 最小重构

### DOM 包装层变化回归

---

## S04：Structural Position as Business Identity

### 当前 sibling set

### `:nth-child()` 计数过程

### 动态插入前结果

### 动态插入后结果

### Root Cause

### 语义状态修复

### 回归检查

---

## S05：`:is()` Specificity Trap

### Selector 参数

### 最大 Specificity 来源

### 哪条声明获胜

### Styles Evidence

### 低权重修复

### 回归检查

---

## S06：`:has()` Direction Error

### Subject / Anchor

### Relative Selector

### 当前错误方向

### 正确关系

### 动态状态切换 Evidence

### 回归检查

---

## S07：Hover-only Interaction

### Pointer Evidence

### Keyboard Evidence

### 缺失状态

### 修复

### 回归检查

---

## S08：Focus Removal

### Active Element

### 当前 Focus Indicator

### A11Y 风险

### 最小修复

### 键盘回归

---

## S09：Generated-content-only Label

### DOM 中真实文本

### Pseudo-element 内容

### Accessibility Tree 观察

### 修复

### 禁用 CSS 回归

---

## S10：Sass Concatenation Mental Model

### 原始 Nested Source

### 期待生成的 Selector

### 浏览器实际解析

### Root Cause

### Native CSS 修复

### 迁移扫描规则

---

## S11：Scoped Query Boundary

### Query Root

### 普通后代 Query 数量

### `:scope > ...` 数量

### 被多算节点

### 修复

### 回归检查

---

## 最终 Selector Contract 摘要

- Component Identity：
- State Modeling：
- Relation Selector：
- Structural Selector：
- Nesting Depth：
- Specificity Budget：
- Focus / A11Y：
- Evidence Requirement：

## 最终结论

### 重构前最主要风险

### 重构后的可维护性变化

### 仍需进入后续 Module 解决的问题
