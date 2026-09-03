# KP007：Cascade Layer、`@scope`、Scoping Proximity 与 `revert-layer`

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP007 |
| 深度 | Should / Expert |
| Pattern | ARCHITECTURE-LAB + BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 当项目越来越大时，如何控制“谁可以覆盖谁”，而不是不断堆 Specificity 和 `!important`？ |
| 运行要求 | Node.js 20+；`@scope` 实验建议使用 2026 年主流最新版浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Cascade Governance Laboratory**，通过六组独立实验证明：

1. Cascade Layer 的优先级在 Specificity 之前参与比较。
2. 普通 Author 声明中，未分层样式高于 named layer。
3. `!important` 会反转 layer 顺序。
4. `revert-layer` 可以只撤回当前 layer。
5. `@scope` 可以限制规则作用范围。
6. 当其他条件相同时，Scoping Proximity 会在 Source Order 之前决定胜负。

最终页面包含：

```text
Layer priority
Unlayered priority
Important layer reversal
revert-layer
@scope proximity
scope limit
```

本课要求通过 DevTools 证明结论，而不是只看颜色。

---

## 2. 为什么现在需要 Layer 与 Scope

前六课已经建立：

```text
Origin
→ Importance
→ Context
→ Specificity
→ Inheritance
→ CSS-wide keywords
```

真实大型项目还会同时出现：

```text
第三方组件 CSS
业务基础样式
Design System
页面组件
Utility
临时覆盖
主题修复
```

如果没有架构约束，团队很容易演化成：

```css
.card .toolbar .button { }
#app .page .card .toolbar .button.is-active { }
.button.is-active { color: red !important; }
```

形成：

```text
为了覆盖旧规则
→ 写更重 selector
→ 下一次还要更重
→ 开始使用 !important
→ CSS 变成“谁嗓门大谁赢”
```

Cascade Layer 的意义不是“又多一个语法”，而是声明：

> 不同类型的样式，在架构上谁拥有覆盖权限。

本课使用：

```css
@layer reset, vendor, base, components, utilities, overrides;
```

对于普通声明，越靠后的 layer 优先级越高。

---

## 3. 本课边界

### 已学过

- Rule / Declaration / Property / Value。
- Shorthand / Longhand。
- Origin / Importance / Encapsulation Context。
- Specificity / Inheritance。
- `inherit` / `initial` / `unset` / `revert`。

### 本课完整拥有

- Named Cascade Layer。
- Layer declaration order。
- Layer 与 Specificity 的比较顺序。
- Unlayered normal author style。
- Important declaration 的 layer 顺序反转。
- `revert-layer`。
- `@scope` root / limit。
- Scoping Proximity。
- Layer / Scope 的大型样式治理意义。

### 本课不展开

复杂 selector 语义仍由 Module 04.02 完整教学；浏览器 Style Engine 内部实现放到 Stage 09。

---

## 4. 当前兼容性边界

截至课程基线：

- `@layer` 已广泛可用。
- `revert-layer` 已广泛可用。
- `@scope` 在 2026 年进入 Baseline 2026，但旧浏览器仍可能不支持。

所以本课采用：

```text
基础 fallback
+
@scope 渐进增强
+
明确浏览器矩阵
```

不支持 `@scope` 时，浏览器会忽略该 at-rule，页面仍保留可读 fallback。

---

## 5. 起始状态

本课从零状态建立，不复制 KP006。

最终目录：

```text
kp007-cascade-layer-scope-revert-layer/
├── README.md
├── index.html
├── styles.css
├── package.json
├── server.mjs
└── verify.mjs
```

本课没有第三方依赖。

---

## 6. Step 0：建立项目并验证失败基线

创建 `package.json` 后执行：

```bash
npm run check
```

文件未创建完整时应失败。等全部文件完成后再执行应通过。

启动：

```bash
npm run dev
```

访问：

```text
http://localhost:4173
```

---

## 7. Step 1：声明 Layer Order

`styles.css` 第一行：

```css
@layer reset, vendor, base, components, utilities, overrides;
```

本项目约定：

```text
reset
↓
vendor
↓
base
↓
components
↓
utilities
↓
overrides
```

含义：

- `reset`：归一化。
- `vendor`：第三方样式。
- `base`：项目基础。
- `components`：业务组件。
- `utilities`：显式单用途覆盖。
- `overrides`：少量受治理最终覆盖。

关键不是这六个名字，而是：

> Layer 顺序必须是架构决策，不是文件偶然加载顺序。

---

## 8. Step 2：证明 Layer Priority 先于 Specificity

在 `components`：

```css
#layer-card .layer-priority-target {
  color: #b91c1c;
}
```

在更晚的 `utilities`：

```css
.layer-priority-target {
  color: #047857;
}
```

后者 Specificity 更低，但最终应为绿色。

原因：

```text
先比较 Layer
↓
utilities 已经胜出
↓
才轮到同一 Layer 内的 Specificity
```

### DevTools 证据

Elements → Styles：

- 两条规则都匹配。
- `components` 的高 Specificity 声明被划掉。
- `utilities` 生效。

这说明 CSS Architecture 可以比 Selector Weight 更早决定覆盖权。

---

## 9. Step 3：观察 Unlayered Normal Author Style

`components` 中：

```css
.unlayered-target { color: #b91c1c; }
```

layer 外：

```css
.unlayered-target { color: #7c3aed; }
```

普通 Author 声明中：

```text
layered normal
<
unlayered normal
```

所以紫色未分层规则获胜。

这意味着团队迁移到 Layer 时，还必须治理旧的 unlayered CSS，否则旧代码可能继续压过所有 normal layers。

---

## 10. Step 4：`!important` 反转 Layer 顺序

项目中：

```css
@layer components {
  .important-target { color: #1d4ed8 !important; }
}

@layer utilities {
  .important-target { color: #047857 !important; }
}
```

`components` 更早声明。

最终应为蓝色：

```text
normal layer order:
components < utilities

important layer order:
components > utilities
```

这不是鼓励滥用 `!important`，而是理解 important 存在时为什么 Layer 优先级会反转。

---

## 11. Step 5：`revert-layer`

先有：

```css
@layer components {
  .revert-target { color: #1d4ed8; }
}

@layer utilities {
  .revert-target { color: #047857; }
}
```

再在 `overrides`：

```css
@layer overrides {
  .revert-target { color: revert-layer; }
}
```

最终回退到前一个可用 Layer 的结果，即 utilities 的绿色。

区分：

```text
revert
→ 撤回当前 Origin 的影响

revert-layer
→ 优先撤回当前 Layer 的影响
```

`revert-layer` 很适合组件变体、主题覆盖和 Utility 撤销。

---

## 12. Step 6：第一次使用 `@scope`

DOM：

```html
<div class="outer-scope">
  <div class="inner-scope">
    <p class="scope-target">...</p>
  </div>
</div>
```

先写更近的 scope：

```css
@scope (.inner-scope) {
  .scope-target { color: #047857; }
}
```

再故意在后面写更远的 scope：

```css
@scope (.outer-scope) {
  .scope-target { color: #b45309; }
}
```

两个内部 selector Specificity 相同；outer rule Source Order 更晚，但 inner scope root 更近。

支持 `@scope` 的浏览器中最终应为绿色。

在其他条件相同后：

```text
Specificity
↓
Scoping Proximity
↓
Order of Appearance
```

所以更近的 scope root 可以压过更晚出现的同 Specificity scoped rule。

---

## 13. Step 7：Scope Limit

```css
@scope (.article-scope) to (.scope-stop) {
  .scoped-note {
    color: #166534;
    background: #dcfce7;
  }
}
```

含义：

```text
从 .article-scope 开始
↓
作用于范围内匹配元素
↓
.scope-stop 作为下界
↓
limit 及其内部不属于该 scope
```

适合文章正文、嵌套 Widget、CMS、插件边界等场景。

---

## 14. 完整证据链

### 实验 A

```text
Styles
→ 高 Specificity components 被划掉
→ utilities 生效
```

### 实验 B

```text
unlayered normal author style 生效
```

### 实验 C

```text
important 的 layer 顺序与 normal 相反
```

### 实验 D

```text
overrides 中存在 revert-layer
→ Computed color 回到上一 Layer
```

### 实验 E

```text
同 Specificity
→ inner scope 更近
→ outer rule 虽更晚仍不获胜
```

### 实验 F

```text
scope limit 外部元素匹配
scope limit 内部元素不匹配
```

---

## 15. 完整运行与验收

```bash
npm run check
npm run dev
```

自动检查应输出：

```text
✓ KP007 layer order, important reversal, revert-layer, and @scope experiments are complete.
```

浏览器验收：

```text
□ 实验 A 最终绿色
□ 实验 B 最终紫色
□ 实验 C 最终蓝色
□ 实验 D 回退绿色
□ 支持 @scope 时实验 E 绿色
□ Scope Limit 内节点不获得 scoped 背景
```

---

## 16. 心智模型

把 KP005～KP007 合起来：

```text
某元素某 Property
↓
声明集合
↓
Origin / Importance
↓
Encapsulation Context
↓
Style Attribute
↓
Cascade Layer
↓
Specificity
↓
Scoping Proximity
↓
Source Order
↓
Cascaded Value
```

这是工程排障心智模型，不是对规范所有细节的替代。

---

## 17. Failure Lab：Layer Order 写反

把：

```css
@layer reset, vendor, base, components, utilities, overrides;
```

改成：

```css
@layer reset, base, components, utilities, overrides, vendor;
```

普通 vendor rules 现在位于最后一个 layer，可能反向压过业务组件。

不要用更重 selector 修复，先修 Layer Contract。

---

## 18. Wrong Way：把 Layer 当垃圾桶

如果所有人都发现 `overrides` 最容易生效，最后所有 CSS 都进入 `overrides`，等价于重新制造全局样式债务。

生产治理至少要定义：

```text
Layer Owner
进入条件
覆盖权限
Override 原因
退出时间
回归方式
```

---

## 19. 为什么 Layer 能降低 Specificity Debt

没有 Layer：

```text
vendor selector 0-4-0
→ 业务被迫写 >= 0-4-0
→ 继续升级
```

有 Layer：

```text
vendor layer
<
components layer
```

业务只写 `0-1-0` 也可以在 Specificity 比较前获得覆盖权。

Layer 把“架构优先级”从 Selector 复杂度中解耦。

---

## 20. `@scope`、CSS Modules、Shadow DOM 的区别

`@scope`：

```text
仍属于普通 CSS Cascade
限制 selector 匹配范围
引入 Scoping Proximity
```

CSS Modules：

```text
主要通过构建期类名变换形成局部命名
```

Shadow DOM：

```text
建立真正的 DOM / Style Encapsulation Context
```

它们不是同一个机制。

---

## 21. Production Boundary

适合 Layer：第三方组件、Design System、多团队 CSS、Utility 与 Component 共存、渐进迁移旧 CSS、品牌主题。

不要为了“架构感”创建过多 Layer；小页面可能 `reset / base / components` 已足够。

`@scope` 生产策略：

```text
可接受 fallback
→ @scope 增强
→ 浏览器矩阵验证
```

---

## 22. 本课只记住 3 件事

1. **Layer Priority 在 Specificity 之前，可以用架构顺序替代 Specificity 军备竞赛。**
2. **Important Declaration 会反转 Layer 顺序，unlayered normal author rule 又高于 layered normal rule。**
3. **当其他条件相同时，Scoping Proximity 会在 Source Order 之前参与决策。**

---

## 23. Challenge

### A：Vendor 隔离

把一个高 Specificity 第三方按钮放进 `vendor`，业务只能使用一个 class selector 覆盖；禁止 ID 和 `!important`。

### B：Scoped Card Theme

创建两个 scope root，让相同 `.card` 在不同 scope 中获得不同主题，不改变 card class。

### C：撤销 Utility

在 utilities 中增加 `.text-danger`，然后只在某个组件区域通过 `revert-layer` 撤销，不写死最终颜色。

---

## 24. Mastery Check

1. 为什么低 Specificity 的后置 Layer 能赢高 Specificity 的前置 Layer？
2. 为什么 unlayered normal rule 会压过 named layer normal rule？
3. 为什么 important Layer 顺序反转？
4. `revert` 与 `revert-layer` 有何区别？
5. Scoping Proximity 在什么条件下真正决定胜负？
6. Scope Root 和 Scope Limit 是什么？
7. `@scope` 为什么不等同于 Shadow DOM？
8. 为什么大型项目应显式声明 Layer Order？

---

## 25. 最终源码

```text
README.md
index.html
styles.css
package.json
server.mjs
verify.mjs
```

运行：

```bash
npm run check
npm run dev
```

当前 Lesson 独立运行，不依赖 KP006。

---

## 26. 参考规范

- MDN：`@layer`
- MDN：`@scope`
- MDN：`revert-layer`
- W3C：CSS Cascading and Inheritance Level 5 / Level 6

实验结论最终以当前浏览器 DevTools 的真实证据为准。
