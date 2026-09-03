# Module 04.01：CSS 语言、样式表与级联体系

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：建设中  
> 当前完成：KP001～KP003 / 9 课

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
- Rule、Selector、Declaration、Property、Value、At-rule。
- 浏览器 CSS 解析、无效声明和错误恢复。
- Origin、Importance、Context、Layer、Specificity、Scoping Proximity、Source Order。
- Inheritance、CSS-wide Keyword 与最终值阶段。

本 Module 不展开：

- 复杂选择器语义：由 04.02 完整教学。
- 尺寸、盒模型和布局算法：由 04.03～04.08 完整教学。
- 浏览器渲染流水线：由 Stage 09 深入。
- 生产性能治理：由 04.14 和 Stage 24 深入。

### 1.4 Must / Should / Expert

**Must**

- 能正确接入外部样式表。
- 能识别 Rule、Selector、Declaration、Property、Value。
- 能解释最常见的来源顺序、优先级和继承结果。
- 能在 Styles 与 Computed 面板中找到最终生效声明。

**Should**

- 能系统分析 Origin、Importance、Specificity、Source Order。
- 能使用 Cascade Layer 控制大型项目覆盖关系。
- 能诊断无效 CSS、样式未加载和错误继承。

**Expert**

- 能解释 declared、cascaded、specified、computed、used、actual value。
- 能解释 `@scope`、Scoping Proximity 与 Layer 的架构意义。
- 能为大型系统设计可治理的级联顺序和覆盖 API。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [CSS 是什么：第一次让结构拥有可控外观](./kp001-what-is-css/) | Must | BUILD-LAB | ✅ |
| KP002 | [CSS 怎样进入页面：Inline、Internal 与 External](./kp002-attach-stylesheet/) | Must | BUILD + NETWORK-LAB | ✅ |
| KP003 | [Rule、Declaration、Property 与 Value](./kp003-rules-declarations-properties-values/) | Must | BROWSER-MECHANISM-LAB | ✅ |
| KP004 | Shorthand、Longhand、注释、At-rule 与语法边界 | Must | BUILD-LAB | ⏳ |
| KP005 | Origin、Importance、Context 与 Source Order | Must / Should | FAILURE-LAB | ⏳ |
| KP006 | Specificity、Inheritance 与 CSS-wide Keyword | Must / Should | FAILURE-LAB | ⏳ |
| KP007 | Cascade Layer、`@scope` 与大型覆盖顺序 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP008 | 无效 CSS、错误恢复、Styles、Computed 与 CSSOM | Should / Expert | FAILURE-LAB | ⏳ |
| KP009 | Module Project：First Stylesheet Diagnostic Lab | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

本 Module 前三课都从新的最小项目开始，不依赖上一课运行目录：

```text
KP001：零状态建立
KP002：零状态建立
KP003：零状态建立
```

这样做是为了让学习者能分别证明：

1. CSS 的职责是什么。
2. CSS 通过哪些路径进入文档。
3. CSS 源码由哪些语言单位组成。

后续若采用复制演进，Lesson README 必须写出完整 Step 0、来源目录、复制命令、基线验证和修改清单。

---

## 4. 统一运行方式

前三课都不依赖第三方包。

进入任意 Lesson：

```bash
npm run check
npm run dev
```

默认地址：

```text
http://localhost:4173
```

`server.mjs` 是实验辅助代码，只负责通过本地 HTTP 提供 `index.html` 与 `styles.css`；它不是当前 CSS 知识点。

---

## 5. 证据设计

本 Module 主要使用：

- Elements → DOM Tree：确认 CSS 没有替换 HTML 结构。
- Elements → Styles：确认规则来源、覆盖和无效声明。
- Elements → Computed：确认最终计算值。
- Network：确认外部 CSS 是独立资源。
- Console → `document.styleSheets`：观察 CSSOM。
- 自动检查脚本：保证课程文件和关键实验条件存在。

---

## 6. Failure Lab 分布

- CSS 链接路径错误，外部样式没有加载。
- 同等优先级规则因源顺序发生覆盖。
- 无效 Property Value 被浏览器忽略。
- Specificity 误判导致修复无效。
- `!important` 扩散形成覆盖战争。
- 继承属性和非继承属性混淆。
- Layer 顺序设计错误导致第三方样式反向压制业务样式。

---

## 7. Module Project

项目名称：

```text
First Stylesheet Diagnostic Lab
```

项目提供一个故意损坏的静态页面，至少包含：

- 一个错误的 `<link href>`。
- 一组 Inline / Internal / External 冲突。
- 一组 Specificity 冲突。
- 一组继承误判。
- 一条无效声明。
- 一个顺序错误的 Cascade Layer。

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
- 准确指出一段 CSS 中的 Rule、Selector、Declaration、Property 和 Value。
- 用 DevTools 找到某个最终样式来自哪个文件和哪一行。
- 不靠增加更高优先级，系统分析样式冲突。
- 解释继承与 CSS-wide Keyword 的差异。
- 设计最小可治理的 Cascade Layer 顺序。
- 完成 Module Project 的故障定位、修复和复盘。
