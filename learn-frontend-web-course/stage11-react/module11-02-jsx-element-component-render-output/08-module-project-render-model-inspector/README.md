# RE-1102-008：Module Project——Render Model Inspector

> Module：[11.02 JSX、Element、Component 与 Render Output](../README.md)  
> 类型：Module Project + Review  
> 难度：Must / Should  
> 前置课程：[RE-1102-007 综合 Failure Lab](../07-failure-lab-tag-element-mutation-manual-call/README.md)

---

## 1. 项目目标

前七课把 React Render Model 拆成了多个局部实验：

```text
JSX Source
→ JSX Transform
→ React Element
→ Component Invocation
→ Render Output
→ Pure Render
→ Render / Commit
→ Failure Diagnosis
```

本项目把这些概念重新组合成一个可运行的 **Render Model Inspector**。

学习者可以选择不同场景，并同时观察：

```text
JSX Source
课程级 Transform 结果
Element Type / Props / Key
Component Render Console
Render Output Preview
MutationObserver Commit Evidence
最终 Browser DOM
```

它不是 React 内部源码调试器，也不会伪造 Fiber 可视化；项目只使用当前 Module 已经建立的公开模型和浏览器证据。

---

## 2. 强制交付物

项目必须包含：

- Host Element 场景。
- Component Element 场景。
- Fragment 场景。
- Empty Node / Conditional 场景。
- JSX Source 与课程级 Transform 对照。
- `isValidElement` 检查。
- `type`、`props`、`key`、children 形态检查。
- Component Render Console Evidence。
- Root 外 `MutationObserver` Commit Evidence。
- “有 Render、无 DOM Mutation”的对照按钮。
- “Render + Visible Commit”的对照按钮。
- Project Report。
- Module Review。
- 自动结构与证据验证脚本。

---

## 3. 项目目录

```text
08-module-project-render-model-inspector/
├── README.md
├── PROJECT_REPORT.md
├── MODULE_REVIEW.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── scripts/
│   └── verify.mjs
└── src/
    ├── App.tsx
    ├── model.tsx
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

职责划分：

```text
model.tsx
→ 场景目录、React Element 创建、公开对象检查

App.tsx
→ Inspector UI、场景选择、Render-only / Visible Update

main.tsx
→ React Root、Strict Mode、Root 外 MutationObserver
```

---

## 4. 运行方式

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/08-module-project-render-model-inspector
npm install
npm run dev
```

打开浏览器后，同时打开：

- Console。
- Elements。
- React DevTools Components。

验证与构建：

```bash
npm run verify
npm run typecheck
npm run build
npm run preview
```

---

# 5. Inspector 的四个场景

## 5.1 Host Element

源码模型：

```tsx
<section data-revision={revision}>
  <h3>Host Element</h3>
</section>
```

检查结果核心应为：

```text
isValidElement = true
type kind = string
type name = section
```

这说明 JSX 描述的是 Host Element，不需要 React 调用自定义组件函数。

## 5.2 Component Element

源码模型：

```tsx
<ReleaseCard revision={revision} />
```

检查结果应为：

```text
isValidElement = true
type kind = function
type name = ReleaseCard
```

随后 React 在 Render 工作中调用 `ReleaseCard`，Console 会输出：

```text
[Render] ReleaseCard revision=...
```

Element Inspector 与 Console 分别证明：

```text
描述对象指向哪个 Component
React 何时真正调用 Component
```

## 5.3 Fragment

源码模型：

```tsx
<>
  <strong>Fragment Child A</strong>
  <span>Fragment Child B</span>
</>
```

React Element 是有效描述，但 Fragment 不创建额外 Host Wrapper。

观察 Elements 时，两个子节点直接出现在 Preview 容器下。

## 5.4 Empty Node / Conditional

源码模型：

```tsx
function EmptyDecision({ revision }) {
  return revision % 2 === 0
    ? <p>偶数版本产生可见节点</p>
    : null;
}
```

Component Element 仍然是有效 React Element：

```text
type = EmptyDecision
```

但 Component Render Output 可以是：

```text
null
```

因此必须区分：

```text
Component Element 是否有效
和
组件最终是否产生 Host DOM
```

---

# 6. Source、Transform 与 Element Inspector

项目为每个场景保存两段教学文本：

```text
JSX Source
课程级 Transform
```

例如：

```tsx
<ReleaseCard revision={revision} />
```

课程级模型：

```js
jsx(ReleaseCard, { revision })
```

注意：

- Inspector 展示的是课程级模型，不宣称等于某个工具所有版本的精确输出。
- 真实转换结果受 TypeScript、Babel、SWC、Vite 和开发 / 生产模式影响。
- Compiler / AST 全体系属于 Stage 16。

Element Inspector 使用公开能力：

```tsx
isValidElement(descriptor)
typeof descriptor.type
descriptor.key
Object.keys(descriptor.props)
Object.isFrozen(descriptor)
```

不读取 `_owner`、`$$typeof` 等内部实现字段来建立生产逻辑。

---

# 7. Render Evidence 与 Commit Evidence

## 7.1 Render Evidence

`App` 与场景组件会在 Console 中记录：

```text
[Render] Inspector ...
[Render] ReleaseCard ...
[Render] EmptyDecision ...
```

这些日志只能证明 Component Function 参与了 Render 计算。

它们不能证明 DOM 一定发生变化。

## 7.2 Commit Evidence

`main.tsx` 在 React Root 外创建：

```tsx
new MutationObserver(...)
```

并监听 Root 内：

```text
childList
characterData
attributes
```

MutationObserver 的结果写入 Root 外的 Host Evidence Panel，避免 React 再次管理同一日志节点。

## 7.3 Render-only 对照

“只请求 Render”按钮更新一个不进入 JSX 输出的 state：

```tsx
setRenderRequest((value) => value + 1);
```

预期：

```text
Console 出现新的 Render 日志
MutationObserver 没有对应可见 DOM mutation
```

Strict Mode 开发检查可能让 Render 日志数量增加，但仍不能据此推导 DOM mutation 数量。

## 7.4 Visible Commit 对照

“改变可见 Revision”按钮更新进入输出的值：

```tsx
setRevision((value) => value + 1);
```

预期：

```text
Render 重新计算
→ Host Output 改变
→ Commit 写入必要 DOM
→ MutationObserver 记录证据
```

---

# 8. 操作实验

## 实验 A：证明 `<Component />` 不等于 `Component()`

1. 选择 Component Element。
2. 查看 Inspector 的 `type kind`。
3. 清空 Console。
4. 点击“只请求 Render”。
5. 观察 React 调用 `ReleaseCard` 的日志。
6. 在 React DevTools 中确认 `ReleaseCard` 边界。

结论：

```text
JSX 先创建指向组件的 Element
React 再在 Render 工作中调用组件
```

## 实验 B：证明 Render 不等于 Commit

1. 清空右侧 Commit Evidence。
2. 点击“只请求 Render”。
3. 比较 Console 与 Commit Evidence。
4. 点击“改变可见 Revision”。
5. 再次比较两套证据。

## 实验 C：证明 Fragment 不创建 Wrapper

1. 选择 Fragment。
2. 在 Inspector 中确认它是有效 Element。
3. 打开 Elements。
4. 查看 Preview 容器直接包含两个子节点。

## 实验 D：证明有效 Component Element 可以输出 null

1. 选择 Empty Node。
2. Revision 为奇数时查看 Preview。
3. Element Inspector 仍显示 Component Type。
4. 点击 Visible Update 进入偶数 Revision。
5. 观察节点出现及 Commit Evidence。

---

# 9. 证据矩阵

| 问题 | 最适合的证据 |
|---|---|
| JSX 大致变成什么 | Transform Inspector / 编译输出 |
| 当前值是不是 React Element | `isValidElement` |
| Element 指向 Host 还是 Component | `typeof element.type` |
| Component Function 是否执行 | Console / breakpoint |
| Component Boundary 是否存在 | React DevTools |
| 最终浏览器节点是什么 | Elements |
| Root 内是否真实发生 DOM mutation | MutationObserver |
| Element 是否被 development freeze | `Object.isFrozen` |

不要让一个工具回答它不负责的问题。

例如：

```text
Console Render 日志
不能单独证明 DOM Commit
```

---

# 10. 项目中的 Pure Render 约束

项目在 Render 中允许：

- 根据 state 选择 Scenario。
- 创建新的 React Element。
- 计算 Inspector 文本。
- 读取当前 Props / State。
- 创建局部数组和对象。

项目不在 Render 中：

- 修改业务模块级数组。
- 写入 React Root 外的 DOM。
- 注册事件监听器。
- 发起网络请求。
- 更新 State。

Console 日志只作为当前教学诊断证据，不应被当成业务状态存储方案。

MutationObserver 的注册发生在 React Root 外的启动代码中，不发生在 Component Render 期间。

---

# 11. Failure Checklist

项目验收前主动检查：

```text
[ ] 是否把 JSX 文本当成真实 DOM？
[ ] 是否把 Component Element 当成已经调用过组件？
[ ] 是否读取 React Element 内部私有字段？
[ ] 是否在 Render 中修改共享对象？
[ ] 是否用 Render 日志数量推导 Commit 次数？
[ ] 是否让 React 与外部脚本共同修改同一日志节点？
[ ] 是否用 Fragment 代替所有语义容器？
[ ] 是否把 null 输出误判为组件没有执行？
```

---

# 12. 自动验证

```bash
npm run verify
```

验证脚本会检查：

- 必要文件是否完整。
- 场景目录是否包含 Host / Component / Fragment / Empty。
- 是否使用 `isValidElement`。
- 是否存在 `MutationObserver` Commit Evidence。
- 是否提供 Render-only 与 Visible Update。
- 是否包含 Project Report 与 Module Review。
- npm scripts 是否完整。

自动验证只证明结构和关键证据存在，不替代浏览器行为验证。

---

# 13. 项目报告

阅读：

- [PROJECT_REPORT.md](./PROJECT_REPORT.md)
- [MODULE_REVIEW.md](./MODULE_REVIEW.md)

Project Report 记录：

- 架构与数据流。
- 场景说明。
- 证据边界。
- 已知限制。
- 生产意义。

Module Review 负责确认：

- 11.02 是否越界。
- 8 课是否形成闭环。
- 哪些主题必须留给后续 Owner Module。
- 下一 Module 的进入条件。

---

# 14. 验收问题

不看文档回答：

1. Inspector 为什么同时需要 Console 与 MutationObserver？
2. `isValidElement` 能否判断一个值是否最终产生 DOM？
3. Component Element 的 `type` 为什么是函数引用？
4. Fragment Element 为什么有效但没有 Host Wrapper？
5. EmptyDecision Element 有效时为什么仍可能没有 DOM？
6. Render-only state 为什么能触发组件执行却不改变 DOM？
7. Strict Mode 中 Render 日志增多是否等于多次 Commit？
8. 为什么 MutationObserver 放在 React Root 外？
9. 为什么 Inspector 不读取 React 私有字段？
10. JSX Transform 文本为什么标记为课程级模型？
11. 哪些工作属于 11.22 Fiber / Scheduler，而不是本项目？
12. 哪些工作属于 11.23 DOM Renderer，而不是本项目？

---

# 15. Module 11.02 最终心智模型

完成项目后，应能够从头说出：

```text
JSX 是 JavaScript Syntax Extension
        ↓ transform
React Element 是不可变 UI Description
        ↓ React 读取 type
当 type 是 Component 时，React 调用 Component Function
        ↓
Component 返回 React Node / Render Output
        ↓
React 继续展开和计算
        ↓
只有必要变化在 Commit 阶段写入 Host DOM
```

并能明确否定：

```text
JSX 就是 HTML
React Element 就是 DOM Element
创建 <Component /> 就已经调用组件
Component Render 就一定修改 DOM
Fragment 就是一个 div
删除 Strict Mode 可以修复不纯 Render
手工调用组件只是另一种等价语法
```

Module 11.02 至此完成。下一 Module 进入：

```text
Module 11.03
Props、Children、Composition 与 API Design
```
