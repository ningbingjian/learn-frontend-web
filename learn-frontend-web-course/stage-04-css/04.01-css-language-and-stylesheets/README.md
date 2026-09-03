# Module 04.01：CSS 语言、样式表与级联体系

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：建设中  
> 当前完成：KP001～KP006 / 9 课

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 一条 CSS 样式如何从源代码进入浏览器，经过解析、匹配、冲突处理、继承和值计算，最终成为元素的实际样式？

### 1.2 为什么现在学习

在学习 Box Model、Flex、Grid 和响应式之前，必须先建立 CSS 的语言模型。否则后续遇到“写了但没有生效”“同一个属性为什么被覆盖”“为什么子元素自动有颜色”等问题时，只能靠猜。

### 1.3 与其他 Module 的边界

本 Module 完整拥有：

- CSS 与 HTML、DOM、CSSOM 的职责关系。
- Inline、Internal、External Stylesheet。
- Rule、Selector、Declaration、Property、Value、Shorthand、Longhand、At-rule。
- 浏览器 CSS 解析、无效声明和错误恢复。
- Origin、Importance、Context、Layer、Specificity、Scoping Proximity、Source Order。
- Inheritance、CSS-wide Keyword 与最终值阶段。

本 Module 不展开：

- 复杂选择器语义：由 04.02 完整教学。
- 尺寸、盒模型和布局算法：由 04.03～04.08 完整教学。
- 浏览器完整渲染流水线：由 Stage 09 深入。
- 生产性能治理：由 04.14 和 Stage 24 深入。

### 1.4 Must / Should / Expert

**Must**

- 能正确接入外部样式表。
- 能识别 Rule、Selector、Declaration、Property、Value、Shorthand、Longhand、At-rule。
- 能解释 Origin、Importance、Source Order 与最常见 Specificity 结果。
- 能区分 inherited / non-inherited property。
- 能使用 `inherit`、`initial`、`unset`、`revert`。
- 能在 Styles 与 Computed 面板中找到最终生效声明。

**Should**

- 能系统分析 Origin、Importance、Context、Specificity、Source Order。
- 能识别 shorthand reset、Specificity Debt 与 `!important` escalation。
- 能使用 Cascade Layer 控制大型项目覆盖关系。
- 能诊断无效 CSS、样式未加载和错误继承。

**Expert**

- 能解释 declared、cascaded、specified、computed、used、actual value。
- 能解释 Encapsulation Context、`@scope`、Scoping Proximity 与 Layer 的架构意义。
- 能为大型系统设计可治理的级联顺序和覆盖 API。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [CSS 是什么：第一次让结构拥有可控外观](./kp001-what-is-css/) | Must | BUILD-LAB | ✅ |
| KP002 | [CSS 怎样进入页面：Inline、Internal 与 External](./kp002-attach-stylesheet/) | Must | BUILD + NETWORK-LAB | ✅ |
| KP003 | [Rule、Declaration、Property 与 Value](./kp003-rules-declarations-properties-values/) | Must | BROWSER-MECHANISM-LAB | ✅ |
| KP004 | [Shorthand、Longhand、注释、At-rule 与语法边界](./kp004-shorthand-longhand-at-rules/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP005 | [Origin、Importance、Context 与 Source Order](./kp005-origin-importance-context-source-order/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP006 | [Specificity、Inheritance 与 CSS-wide Keyword](./kp006-specificity-inheritance-css-wide-keywords/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP007 | Cascade Layer、`@scope` 与大型覆盖顺序 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP008 | 无效 CSS、错误恢复、Styles、Computed 与 CSSOM / Value Pipeline | Should / Expert | FAILURE-LAB | ⏳ |
| KP009 | Module Project：First Stylesheet Diagnostic Lab | 全层级 | PROJECT-LAB | ⏳ |

当前完成度：

```text
6 / 9 = 66.7%
```

前六课已经建立：

```text
CSS 是什么
→ CSS 怎样进入页面
→ CSS 源码由什么组成
→ Shorthand / Longhand / At-rule
→ Origin / Importance / Context / Source Order
→ Specificity / Inheritance / CSS-wide Keywords
```

下一批将把这些基础能力收束到：

```text
Cascade Layer / @scope
→ Value Processing / CSSOM Debug
→ Module Project
```

---

## 3. 起始状态与复制链

KP001～KP006 都采用独立最小实验，不在运行时依赖上一课目录：

```text
KP001：零状态建立
KP002：零状态建立
KP003：零状态建立
KP004：零状态建立
KP005：零状态建立
KP006：零状态建立
```

这么设计是为了让每个核心机制都能被单变量观察：

1. CSS 的职责。
2. 样式表接入路径。
3. CSS 语言单位。
4. Shorthand reset 与 At-rule。
5. Cascade 前半段排序。
6. Specificity、Inheritance 与默认值。

KP007～KP009 可以在自己的 README 中明确复制前一课或从零建立，但必须继续遵守统一 Teaching Guide 的 Step 0 Contract。

---

## 4. 统一运行方式

前六课均不依赖第三方包。

进入任意 Lesson：

```bash
npm run check
npm run dev
```

默认地址：

```text
http://localhost:4173
```

`server.mjs` 只是实验辅助代码，负责通过本地 HTTP 提供 `index.html` 与 `styles.css`；它不是当前 CSS 知识点。

---

## 5. 证据设计

本 Module 主要使用：

- Elements → DOM Tree：确认 CSS 没有替换 HTML 结构。
- Elements → Styles：确认规则来源、覆盖、important、inline 与无效声明。
- Elements → Computed：确认 shorthand longhand、继承与最终计算结果。
- Network：确认外部 CSS 是独立资源以及 MIME 正确。
- ShadowRoot / `:host`：观察 Encapsulation Context。
- Console → `document.styleSheets`：观察 CSSOM。
- 自动检查脚本：保证课程文件和关键 Failure Lab 条件存在。

证据链优先级：

```text
预测
→ 浏览器真实现象
→ Styles / Computed / Network / CSSOM 证据
→ 理论解释
→ 修改一个变量
→ 再验证
```

---

## 6. Failure Lab 分布

已经完成：

- KP002：CSS 链接路径错误，外部样式没有加载。
- KP002：同等条件规则因 Source Order 覆盖。
- KP003：无效 Property Value 被浏览器忽略。
- KP004：`background` shorthand 重置 `background-image`。
- KP005：`!important` 与 Source Order 的优先关系。
- KP005：Author / UA / Inline / Encapsulation Context 对照。
- KP006：Specificity 误判导致状态规则失效。
- KP006：继承属性和非继承属性混淆。
- KP006：`initial` / `unset` / `revert` 语义混淆。

后续还要完成：

- Layer 顺序设计错误导致第三方样式反向压制业务样式。
- `@scope` proximity 误判。
- CSSOM / Value Pipeline 定位错误。
- 多故障组合诊断项目。

---

## 7. Module Project

项目名称：

```text
First Stylesheet Diagnostic Lab
```

项目提供一个故意损坏的静态页面，至少包含：

- 一个错误的 `<link href>`。
- 一组 Inline / Internal / External 冲突。
- 一组 `!important` 冲突。
- 一组 Specificity 冲突。
- 一组继承误判。
- 一条无效声明。
- 一个 shorthand reset。
- 一个顺序错误的 Cascade Layer。
- 一个 `@scope` proximity 问题。

学习者必须提交：

1. 症状记录。
2. DevTools 证据。
3. 每条样式的级联推导。
4. 根因分类。
5. 最小修复。
6. 回归检查。
7. 防止同类故障的样式约定。

---

## 8. Module Definition of Done

完成本 Module 后，学习者必须能够：

- 画出 HTML → DOM、CSS → CSSOM、匹配与最终样式的基础关系图。
- 独立判断样式表是否真正加载。
- 准确指出 Rule、Selector、Declaration、Property、Value、Shorthand、Longhand 与 At-rule。
- 解释 shorthand 为什么可能重置先前 longhand。
- 按正确顺序分析 Origin、Importance、Context、Layer、Specificity、Scope、Source Order。
- 不靠加 `!important` 或堆高 selector 解决日常冲突。
- 解释 inherited / non-inherited property 与 CSS-wide Keyword。
- 用 DevTools 找到某个最终样式来自哪个文件和哪一行。
- 设计最小可治理的 Cascade Layer 顺序。
- 完成 Module Project 的故障定位、修复和复盘。

---

## 9. 下一批

下一批一次完成最后三课：

```text
KP007  Cascade Layer、@scope、Scoping Proximity、revert-layer
KP008  CSS 错误恢复、Styles、Computed、CSSOM 与 Value Processing Pipeline
KP009  Module Project：First Stylesheet Diagnostic Lab
```

完成 KP009 后，Module 04.01 必须进行一次完整 Scope / Depth / Evidence Review，再进入 04.02 Selector。
