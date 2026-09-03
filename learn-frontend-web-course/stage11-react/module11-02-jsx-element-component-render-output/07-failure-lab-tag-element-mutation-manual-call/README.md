# RE-1102-007：Failure Lab——错误标签、Element Mutation 与手工调用组件

> Module：[11.02 JSX、Element、Component 与 Render Output](../README.md)  
> 类型：综合 Failure Lab  
> 难度：Should  
> 前置课程：[RE-1102-006 Render vs Commit](../06-render-vs-commit-host-dom/README.md)

---

## 1. 本课为什么存在

前六课已经分别建立了 JSX、React Element、Component Invocation、Render Output、Pure Render 与 Render / Commit 的正确模型。

但真实项目里的错误通常不是单个概念不会，而是几个对象被混成了一个：

```text
JSX 标签
React Element
Component Function
Component Boundary
DOM Element
```

本课不再新增大块 API，而是主动制造三类常见故障：

```text
小写标签被当成 Host Tag
Element / props 被直接修改
Component Function 被手工调用
```

目标不是背一句“不要这样写”，而是通过运行证据回答：

1. React 到底把这段代码解释成了什么？
2. 为什么错误写法有时看起来还能工作？
3. 它破坏了哪一层契约？
4. 怎样用 Console、React DevTools、Elements 和对象检查定位？

---

## 2. 学习目标

完成本课后，应能够：

- 解释 JSX 标签首字母大小写为什么会改变 `element.type`。
- 区分 Host Element Descriptor 与 Component Element Descriptor。
- 说明浏览器创建了一个陌生标签，不代表 React 调用了同名组件。
- 使用 `isValidElement`、`typeof element.type` 和 React DevTools 建立证据。
- 解释 React Element 的 immutable contract。
- 理解 development freeze 是诊断手段，不是业务代码可依赖的功能。
- 解释无 Hook 组件被手工调用时为什么可能“暂时看起来可用”。
- 稳定复现带 Hook 组件被手工调用时的 Invalid Hook Call。
- 说明手工调用组件会绕过 React 的组件身份、Hook Dispatcher 与 DevTools 边界。
- 给出正确的组件组合方式。

---

## 3. 项目目录

```text
07-failure-lab-tag-element-mutation-manual-call/
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── scripts/
│   └── verify.mjs
└── src/
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

每个 Lesson 仍然独立安装、运行、类型检查和构建。

---

## 4. 运行课程

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/07-failure-lab-tag-element-mutation-manual-call
npm install
npm run dev
```

打开终端输出的本地地址，然后同时打开：

- Browser Console。
- Elements。
- React DevTools Components。

额外验证：

```bash
npm run verify
npm run typecheck
npm run build
```

---

# 5. Failure 1：标签大小写改变了对象类型

## 5.1 正确组件写法

```tsx
<ReleaseBadge label="正确组件边界" />
```

它产生的 Component Element 大致是：

```text
type = ReleaseBadge function reference
props = { label: "正确组件边界" }
```

React 读取到函数类型后，才会在 Render 工作中调用 `ReleaseBadge`。

## 5.2 错误心智模型

很多人把下面两件事当成一样：

```tsx
<ReleaseBadge />
<releasebadge />
```

它们完全不同。

小写标签在 JSX 模型中表示 Host Tag。课程源码使用等价、可编译的动态写法制造同一结果：

```tsx
createElement(
  'releasebadge',
  { 'data-failure': 'lowercase-host-tag' },
  '这只是一个陌生 Host Element',
);
```

此时：

```text
type = "releasebadge"
```

React 不会去查找名为 `ReleaseBadge` 的 JavaScript 函数。

## 5.3 观察证据

在页面中比较两张卡片，并检查：

```text
错误描述对象：type kind = string
正确描述对象：type kind = function
```

再看 Elements：

```html
<releasebadge data-failure="lowercase-host-tag">
  这只是一个陌生 Host Element
</releasebadge>
```

最后看 React DevTools：

- 正确写法存在 `ReleaseBadge` 组件边界。
- 错误 Host Tag 不会产生同名组件边界。

## 5.4 错误修复方式

不要通过 CSS 把陌生标签“修得像组件”。

真正的修复是让 `element.type` 指向组件引用：

```tsx
<ReleaseBadge label="正确组件边界" />
```

---

# 6. Failure 2：直接修改 React Element / props

## 6.1 错误代码

```tsx
const descriptor = <ReleaseBadge label="original" />;

(descriptor.props as { label: string }).label = 'tampered';
```

这段代码把 React Element 当成了一个待持续修改的 View Model。

但 Element 的正确角色是：

```text
某一时刻创建出的 UI Description
```

要得到新描述，应创建新 Element，而不是修改旧 Element：

```tsx
const nextDescriptor = <ReleaseBadge label="next" />;
```

## 6.2 Development Freeze

React 开发构建通常会冻结 Element 及其 props，帮助尽早暴露 mutation：

```tsx
Object.isFrozen(descriptor)
Object.isFrozen(descriptor.props)
```

课程按钮会：

1. 创建一个新的 Element。
2. 记录 mutation 前的 `label`。
3. 检查 Element / props 是否冻结。
4. 尝试写入 `props.label`。
5. 捕获错误并记录 mutation 后的值。

## 6.3 不能得出的错误结论

不要把课程结论简化成：

```text
只要 Object.isFrozen() === false
就可以修改 Element
```

错误。

Freeze 是 development diagnostic；immutable contract 才是长期编程约束。

即使某个生产构建没有冻结对象，直接 mutation 仍然存在问题：

- React 不知道你什么时候完成修改。
- 新旧描述的边界被破坏。
- 调试快照不再可信。
- 未来实现细节变化可能让代码立刻失败。
- 共享同一个 Element 引用时会出现远距离污染。

## 6.4 正确替代

```tsx
const before = <ReleaseBadge label="before" />;
const after = <ReleaseBadge label="after" />;
```

或者通过 Props / State 产生下一份描述：

```tsx
<ReleaseBadge label={currentLabel} />
```

完整 Props API 在 Module 11.03 学习；本课只固定“创建新描述，不修改旧描述”的边界。

---

# 7. Failure 3：手工调用 Component Function

## 7.1 为什么这个错误很隐蔽

假设组件没有 Hook：

```tsx
function ReleaseBadge({ label }: { label: string }) {
  return <span>{label}</span>;
}
```

手工调用：

```tsx
const output = ReleaseBadge({ label: 'manual' });
```

确实会返回一个 React Element。

所以初学者容易得出：

> 组件本质就是函数，直接调用更简单。

问题是：JavaScript 层面“能调用”，不等于 React 组件模型允许你把它当普通模板函数。

## 7.2 正确写法和手工调用的差异

正确写法：

```tsx
const descriptor = <ReleaseBadge label="proper" />;
```

此时：

```text
descriptor.type = ReleaseBadge
```

React 可以建立组件边界。

手工调用：

```tsx
const output = ReleaseBadge({ label: 'manual' });
```

返回值通常已经是 Host Element Description：

```text
output.type = "span"
```

`ReleaseBadge` 这一层从 React 的树模型中消失了。

## 7.3 Hook 为什么会把问题暴露出来

课程还提供：

```tsx
function HookedReleaseBadge(...) {
  const [count] = useState(0);
  return ...;
}
```

在按钮事件中手工调用：

```tsx
HookedReleaseBadge({ label: 'manual hook call' });
```

此时没有正在进行的 React Component Render，也就没有正确的 Hook Dispatcher，上述调用会触发 Invalid Hook Call。

## 7.4 为什么“现在没有 Hook”也不能手工调用

因为组件 API 会演进。

今天：

```tsx
function ReleaseBadge() {
  return <span />;
}
```

明天组件内部加入 Hook：

```tsx
function ReleaseBadge() {
  const [open] = useState(false);
  return <span />;
}
```

如果调用方一直手工执行函数，组件内部一次正常重构就会让调用方崩溃。

此外，手工调用还会破坏：

- React DevTools 组件边界。
- Hook 调用顺序归属。
- 组件身份与状态生命周期。
- Error Boundary / Suspense 等树级行为。
- 未来 Compiler 与调度假设。

## 7.5 正确替代

```tsx
<ReleaseBadge label="proper" />
```

需要共享纯计算时，把计算提取成普通函数：

```ts
function formatReleaseLabel(value: string) {
  return value.trim().toUpperCase();
}
```

然后由多个组件调用普通函数，而不是互相手工调用组件。

---

# 8. 三类故障的统一诊断矩阵

| 故障 | 错误对象模型 | 最关键证据 | 正确修复 |
|---|---|---|---|
| 小写组件标签 | 把 Component 当 Host Tag | `typeof element.type === 'string'`、Elements | 使用大写组件引用 |
| Element Mutation | 把 Description 当可变 View Model | Freeze、before/after、异常 | 创建下一份 Element / State |
| 手工调用无 Hook 组件 | 把 Component 当模板函数 | 返回 Element 的 `type` 已是 Host Tag | 使用 `<Component />` |
| 手工调用 Hook 组件 | 绕过 Hook Dispatcher | Invalid Hook Call | 让 React 调用组件 |

---

# 9. Debug 操作顺序

遇到“组件没有执行”“DevTools 找不到组件”“Hook 报错”等问题时，按以下顺序检查。

## 9.1 看源码标签

```text
标签首字母是大写还是小写？
```

## 9.2 看 Element Type

```tsx
console.log(element.type);
```

判断：

```text
string → Host Element Description
function → Function Component Description
```

## 9.3 看 React DevTools

确认预期组件边界是否存在。

## 9.4 看 Elements

确认浏览器实际收到的是标准元素、陌生 Host Tag，还是组件最终返回的 Host DOM。

## 9.5 搜索手工调用

检查是否出现：

```tsx
ComponentName(props)
```

而不是：

```tsx
<ComponentName {...props} />
```

## 9.6 检查 mutation

搜索：

```text
element.props.x = ...
Object.assign(element.props, ...)
array.push(...) during render
```

---

# 10. Wrong Fixes

以下做法都不是正确修复：

```text
关闭 Strict Mode
捕获 Invalid Hook Call 后继续运行
给陌生小写标签补 CSS
用 any 隐藏 Element mutation
让所有组件永远不使用 Hook
把组件函数包在 try/catch 中手工调用
```

这些方案只是在隐藏证据，没有恢复 React 所需要的对象边界。

---

# 11. 与其他 Module 的边界

本课只负责 11.02 的综合故障：

- JSX 标签如何决定 Element Type。
- Element immutable contract。
- Component Invocation 所有权。

下面内容不在本课展开：

- Props / Children API 设计：11.03。
- State Snapshot / Update Queue：11.04。
- List / Key Identity：11.06。
- Hook 规则完整体系：11.10 与 11.23。
- Fiber / Scheduler：11.22。
- DOM Renderer 源码：11.23。

---

# 12. 练习

## 练习 1

新增一个 `ReleasePanel` 组件，然后分别创建：

```tsx
<ReleasePanel />
createElement('releasepanel')
```

打印二者的 `type`。

## 练习 2

创建 Element 后尝试：

```tsx
Object.assign(element.props, { label: 'changed' })
```

记录开发和生产构建下的现象差异，但说明为什么两种环境都不应该依赖 mutation。

## 练习 3

把一个无 Hook 组件手工调用，再给组件内部加入 `useState`，记录调用方为什么突然失败。

## 练习 4

使用 React DevTools 比较：

```tsx
<ReleaseBadge />
ReleaseBadge(...)
```

所形成的组件树边界。

---

# 13. 验收问题

不看文档回答：

1. JSX 为什么用大小写区分 Host Tag 与 Component？
2. `<releasebadge />` 会自动寻找 `ReleaseBadge` 函数吗？
3. 一个陌生 HTML 标签被浏览器创建出来，能否证明组件执行过？
4. React Element 为什么应视为快照式 Description？
5. `Object.isFrozen` 为 false 时能否安全修改 Element？
6. 无 Hook 组件为什么手工调用可能暂时成功？
7. 手工调用后 `element.type` 为什么可能直接变成 `span`？
8. 带 Hook 组件为何出现 Invalid Hook Call？
9. 手工调用会破坏哪些 React 树级能力？
10. 共享计算逻辑应该提取成组件还是普通函数？
11. 删除 Strict Mode 为什么不是修复？
12. 哪些证据可以证明预期组件边界不存在？

---

# 14. 本课结论

必须能够完整说出：

```text
JSX 标签大小写决定 Element Type 的类别
React Element 是不可变 UI Description
组件虽然是 JavaScript 函数，但调用权属于 React
<Component /> 与 Component() 不是可互换语法
```

下一课将把整个 Module 11.02 串成一个可操作的 **Render Model Inspector**，从 JSX Source 一直观察到最终 Host DOM。
