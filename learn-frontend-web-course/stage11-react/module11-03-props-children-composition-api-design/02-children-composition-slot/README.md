# RE-1103-002：children 是组合槽，不是特殊数组

> Module：[11.03 Props、Children、Composition 与 API Design](../README.md)  
> 深度：Must  
> 目标：理解嵌套 JSX 如何进入 `children`，并建立 opaque children 数据结构边界。

---

## 1. 从普通 Props 到结构输入

上一课通过命名 props 传入数据：

```tsx
<ReleaseCard
  release={release}
  density="compact"
/>
```

有些组件不只需要“数据”，还需要调用方提供一段 UI 结构：

```tsx
<CompositionPanel title="发布信息">
  <ReleaseFacts />
</CompositionPanel>
```

标签内部的嵌套内容会成为：

```text
CompositionPanel.props.children
```

课程级模型：

```text
Parent JSX nesting
        ↓
children prop
        ↓
Wrapper Component decides where to place the slot
        ↓
React continues rendering the supplied React Node
```

---

## 2. 学习目标

完成本课后，应能够：

1. 解释嵌套 JSX 与 `children` prop 的关系。
2. 使用 `ReactNode` 描述常见 children 输入。
3. 说明 `children` 不保证是数组。
4. 解释为什么 children 被视为 opaque data structure。
5. 区分小写 `children` prop 与大写 `Children` API。
6. 使用 `Children.count` 与 `Children.toArray` 做有限观察。
7. 解释它们的结果为什么不等于 DOM 节点数。
8. 说明 Children API 不会穿透 Component Element。
9. 使用 children 建设视觉包装器。
10. 判断何时应该改用显式数据 prop 或显式子组件。

---

## 3. 运行课程

```bash
cd learn-frontend-web-course/stage11-react/module11-03-props-children-composition-api-design/02-children-composition-slot
npm install
npm run verify
npm run typecheck
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

---

## 4. 项目结构

```text
02-children-composition-slot/
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

---

## 5. children 本质上仍是一个 Prop

组件契约：

```tsx
interface CompositionPanelProps {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}
```

组件读取：

```tsx
function CompositionPanel({
  title,
  description,
  children,
}: CompositionPanelProps) {
  return (
    <article>
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  );
}
```

调用方填写：

```tsx
<CompositionPanel
  title="单个 Component Element"
  description="父组件提供实际内容"
>
  <ReleaseFacts />
</CompositionPanel>
```

`CompositionPanel` 不需要知道 `ReleaseFacts` 内部怎样实现。

这就是组合：

```text
Shell 负责结构
Caller 负责内容
```

---

## 6. 为什么类型通常使用 ReactNode

本课允许槽里出现：

```text
string
number
React Element
Fragment
array of React Nodes
null
undefined
boolean
```

因此使用：

```tsx
readonly children: ReactNode;
```

而不是过早限制：

```tsx
readonly children: ReactElement;
```

两者边界不同。

### ReactNode

表达“可以成为 React Render Output 的节点集合”。

### ReactElement

只表达 React Element 对象。

因此：

```tsx
children={42}
```

可以属于 `ReactNode`，但 `42` 不是 React Element。

Module 11.02 已经通过 `isValidElement` 建立过这条边界。

---

## 7. children 不保证是数组

错误：

```tsx
function Panel({ children }: Props) {
  return children.map(/* ... */);
}
```

原因：

```text
单个 child
可能不是 Array

多个 child
内部结构也不应该成为组件公共假设
```

React 将 children 视为 opaque data structure。组件不应该依赖它当前恰好是什么 JavaScript 形态。

如果确实需要遍历、计数或转换，使用：

```tsx
Children.count(children)
Children.map(children, fn)
Children.toArray(children)
```

但这不意味着应当大量操纵 children。

---

## 8. 小写 children 与大写 Children

### 小写 children

```tsx
function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
```

它是普通 prop，是组合的基础能力。

### 大写 Children

```tsx
import { Children } from 'react';
```

它是一组处理 opaque children 的 API。

两者不要混淆：

```text
children prop
→ 常用、自然的组合输入

Children API
→ 较少使用，只在确实需要观察或转换 children 时使用
```

---

## 9. 本课的三个指标

`CompositionPanel` 显示：

```tsx
const countedNodes = Children.count(children);
const flattenedVisibleNodes = Children.toArray(children).length;
const runtimeArray = Array.isArray(children);
```

这三个结果回答不同问题。

### Children.count

统计 children 数据结构中的节点。

注意：

- Empty Node 也可能参与 count。
- 数组本身不算一个节点，但其内容会被遍历。
- Component Element 被视为一个节点。
- 不会穿透 Component Element 读取它最终返回什么。

### Children.toArray

将 children 变成普通数组，便于使用数组方法。

空节点会从结果中省略，因此：

```text
Children.count(children)
不一定等于
Children.toArray(children).length
```

### Array.isArray

只是在当前运行时观察实现形态，不应成为组件契约。

页面故意展示它，是为了证明：

```text
有时是数组
≠
永远可以当数组
```

---

## 10. 单个 Component Element

调用：

```tsx
<CompositionPanel>
  <ReleaseFacts />
</CompositionPanel>
```

`children` 是一个 Component Element 描述：

```text
type = ReleaseFacts
props = {}
```

不是：

```text
ReleaseFacts 最终返回的 dl DOM
```

React 后续才会调用 `ReleaseFacts`。

因此外层 Children API 无法提前读取其 Render Output。

---

## 11. 混合 React Node 与 Empty Node

课程中写：

```tsx
<CompositionPanel>
  发布风险数：{0}
  {showOptionalNote ? <p>...</p> : null}
  {false}
  {undefined}
</CompositionPanel>
```

这里包含：

```text
string
number 0
Element 或 null
false
undefined
```

关键结论：

```text
0 是可见数字节点
false / null / undefined 通常不产生可见 Host Node
```

但是 Children API 的计数结果与最终 DOM 不是一回事。

不要把：

```text
Children.count
```

当成：

```text
DOM childNodes.length
```

更不能当成业务项目数量。

---

## 12. Fragment 是一个组合边界

课程使用：

```tsx
<>
  <ul>
    ...
  </ul>
  <p>...</p>
</>
```

Fragment 可以让调用方把多个 sibling 作为一个组合结果传入，而不创建额外 Host Wrapper。

Module 11.02 已经解释 Fragment 与 Host DOM 的关系；本课关注它如何作为 children 填入槽位。

---

## 13. Children API 不会穿透组件

课程定义：

```tsx
function MoreChecks() {
  return (
    <>
      <li>容量基线已确认</li>
      <li>回滚包已上传</li>
    </>
  );
}
```

调用方传入：

```tsx
<ul>
  <li>审批人已确认</li>
  <MoreChecks />
</ul>
```

在外层 children 描述中：

```text
<MoreChecks />
```

是一个 Component Element。

外层组件不能通过 `Children.count` 得知它未来会返回两个 `li`。

这是重要边界：

```text
Children API 操作传入的 Element Description
不是递归读取所有组件最终 DOM
```

---

## 14. Wrong Way：用 Children 猜测业务结构

脆弱写法：

```tsx
function Tabs({ children }: Props) {
  const first = Children.toArray(children)[0];
  // 继续猜测 first 的类型、props 和内部结构
}
```

它可能导致：

- 包装一层组件后逻辑失效。
- Fragment 行为与预期不同。
- 调用方难以理解隐式约束。
- 类型只能靠断言维持。
- 重构 UI 结构时破坏业务行为。

当业务逻辑需要明确数据时，更稳定的方向是：

```tsx
<Tabs
  items={[
    { id: 'overview', label: '概览', content: <Overview /> },
    { id: 'risk', label: '风险', content: <Risk /> },
  ]}
/>
```

或者显式暴露受约束的子组件。

完整 compound component 与 Context 将在 11.09 之后处理。

---

## 15. Debug 实验

### 实验一：单个 child

观察第一张面板：

```text
Array.isArray(children)
```

通常不会因为只有一个 Component Element 就变成数组。

结论：

```text
children.map 不是安全默认
```

### 实验二：切换 Empty Node

1. 取消“显示可选说明”。
2. 记录 Children.count 和 toArray length。
3. 打开可选说明。
4. 再次比较。
5. 到 Elements 中检查真实 DOM。

结论：

```text
children 指标
与
最终 Host DOM 数量
需要分开观察
```

### 实验三：MoreChecks

1. 在 React DevTools 找到 `MoreChecks`。
2. 确认它是独立组件。
3. 查看页面最终有两个额外 `li`。
4. 回到外层 children 指标。
5. 理解外层 Children API 不会穿透它。

---

## 16. 课程验收

不看文档回答：

1. 嵌套 JSX 最终进入哪个 prop？
2. 为什么 children 仍然只是 props 的一部分？
3. ReactNode 与 ReactElement 有什么区别？
4. `children` 是否保证为数组？
5. 为什么 `Array.isArray(children)` 不能作为公共契约？
6. 小写 children 与大写 Children 分别是什么？
7. `Children.count` 是否等于 DOM 节点数？
8. `Children.toArray` 是否保留所有 Empty Node？
9. Children API 能否看到 `<MoreChecks />` 最终返回的两个 `li`？
10. 什么时候应该把 children 改成显式数据 prop？

---

## 17. 本课结论

```text
children
= 父组件填入的 UI 组合槽

ReactNode
= 槽允许接收的常见 Render Output 类型

Opaque
= 不依赖 children 内部实现形态

Children API
= 有限观察与转换工具，不是业务结构解析器
```

下一课：

```text
RE-1103-003
显式 Slots 与稳定组件 API
```

---

## 18. 官方参考

- [React：Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React API Reference：Children](https://react.dev/reference/react/Children)
