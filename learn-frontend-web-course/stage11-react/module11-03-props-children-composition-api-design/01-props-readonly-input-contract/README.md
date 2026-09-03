# RE-1103-001：Props 是只读输入契约

> Module：[11.03 Props、Children、Composition 与 API Design](../README.md)  
> 深度：Must  
> 目标：建立“父组件产生输入，子组件只读取输入”的组件边界模型。

---

## 1. 为什么第一课先讲 Props 契约

Module 11.02 已经说明：

```text
<ReleaseCard />
→ 创建 Component Element
→ React 调用 ReleaseCard
→ 得到 Render Output
```

但组件被调用时需要输入。React 通过一个 `props` 对象把调用方提供的信息交给组件：

```tsx
<ReleaseCard
  release={release}
  density="compact"
  showOwner={false}
/>
```

课程级心智模型：

```text
Parent Render
  ↓ 创建 Component Element
element.props
  ↓ React 调用组件
ReleaseCard(props)
  ↓ 组件只读取当前输入
Render Output
```

Props 不是组件内部的数据仓库。它是调用方与组件之间的输入契约。

---

## 2. 学习目标

完成本课后，应能够：

1. 解释 JSX attribute 与 component props 的关系。
2. 说明组件函数为什么接收一个 props 对象。
3. 使用 TypeScript 描述 required、optional 与 readonly props。
4. 使用参数解构读取 props。
5. 使用参数默认值定义缺省行为。
6. 解释父组件与子组件的数据所有权。
7. 说明为什么子组件不能修改 props。
8. 区分“同一个组件实现”和“不同 props 实例”。
9. 使用 React DevTools 比较两个组件的 Props。
10. 识别 prop spreading 可能隐藏 API 的风险。

---

## 3. 运行课程

```bash
cd learn-frontend-web-course/stage11-react/module11-03-props-children-composition-api-design/01-props-readonly-input-contract
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
01-props-readonly-input-contract/
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

## 5. 从调用方开始观察

调用方写：

```tsx
<ReleaseCard
  release={currentRelease}
  density="compact"
  showOwner={false}
/>
```

对于自定义组件，调用方可以把 JavaScript 值作为 props 传入：

```text
string
number
boolean
object
array
function
React Element
其他 JavaScript 值
```

本课只处理“数据输入”。函数型行为 props 会在 RE-1103-004 作为独立主题学习。

---

## 6. 组件只接收一个 Props 对象

下面两种读取方式在概念上等价。

### 读取完整对象

```tsx
function ReleaseCard(props: ReleaseCardProps) {
  return <h2>{props.release.id}</h2>;
}
```

### 参数解构

```tsx
function ReleaseCard({
  release,
  density,
  showOwner,
}: ReleaseCardProps) {
  return <h2>{release.id}</h2>;
}
```

解构不是 React 特殊语法，它是 JavaScript 参数解构。

React 负责把当前 `element.props` 作为组件输入；组件负责根据输入计算输出。

---

## 7. 使用 TypeScript 建立输入契约

源码定义：

```tsx
interface ReleaseOwner {
  readonly name: string;
  readonly team: string;
}

interface ReleaseSnapshot {
  readonly id: string;
  readonly version: string;
  readonly environment: Environment;
  readonly owner: ReleaseOwner;
  readonly riskCount: number;
  readonly approved: boolean;
}

interface ReleaseCardProps {
  readonly release: ReleaseSnapshot;
  readonly density?: Density;
  readonly showOwner?: boolean;
}
```

这里同时表达了三件事。

### required

```tsx
readonly release: ReleaseSnapshot;
```

调用方必须提供 `release`。

### optional

```tsx
readonly density?: Density;
```

调用方可以省略 `density`。

### readonly

```tsx
readonly release: ReleaseSnapshot;
```

组件不应该对收到的输入赋值。

`readonly` 是 TypeScript 的编译期约束，不等于 JavaScript 运行时深冻结。它的意义是把组件所有权写进类型契约。

---

## 8. 缺省值也是公共 API

组件使用参数默认值：

```tsx
function ReleaseCard({
  release,
  density = 'comfortable',
  showOwner = true,
}: ReleaseCardProps) {
  // ...
}
```

调用方省略：

```tsx
<ReleaseCard release={currentRelease} />
```

组件将得到：

```text
density = "comfortable"
showOwner = true
```

调用方显式覆盖：

```tsx
<ReleaseCard
  release={currentRelease}
  density="compact"
  showOwner={false}
/>
```

注意：

```text
缺少 prop 或传入 undefined
→ 默认值生效

传入 false、0、空字符串或 null
→ 这些是调用方真实提供的值
```

因此不要使用：

```tsx
const density = inputDensity || 'comfortable';
```

来替代清晰的参数默认值，因为合法 falsy 值可能被错误覆盖。

---

## 9. Props 是当前 Render 的只读输入

本课父组件保存交互状态：

```tsx
const [environment, setEnvironment] = useState<Environment>('staging');
const [riskCount, setRiskCount] = useState(2);
const [approved, setApproved] = useState(false);
```

然后创建当前输入：

```tsx
const currentRelease: ReleaseSnapshot = {
  id: 'REL-2026-0903',
  version: 'v3.8.0',
  environment,
  owner: {
    name: '宁炳剑',
    team: 'Delivery Platform',
  },
  riskCount,
  approved,
};
```

最后传给子组件：

```tsx
<ReleaseCard release={currentRelease} />
```

交互链路：

```text
用户操作父组件控件
→ 父组件请求状态更新
→ 父组件再次 Render
→ 创建下一份 currentRelease
→ ReleaseCard 收到下一份 props
→ 重新计算 Render Output
```

本课使用 `useState` 只是为了制造 props 变化。State Snapshot、Update Queue 和 Batching 将由 Module 11.04 完整负责。

---

## 10. 为什么不能修改 Props

错误思路：

```tsx
function ReleaseCard({ release }: ReleaseCardProps) {
  release.riskCount = 0;
  return <p>{release.riskCount}</p>;
}
```

它会破坏组件边界：

```text
父组件拥有的数据
    ↓ 传给子组件
子组件越权修改同一对象
    ↓
父组件、兄弟组件和日志看到隐藏变化
```

风险包括：

- 数据变化没有明确事件来源。
- React DevTools 很难解释谁修改了数据。
- 共享引用导致兄弟组件互相影响。
- 重试 Render 时结果可能依赖调用次数。
- 测试必须了解隐藏写入。
- 后续 memoization 和并发模型更难推理。

正确方向：

```text
子组件表达需要改变什么
→ 父组件决定是否接受
→ 父组件产生下一份数据
→ 下一次 Render 传入新 props
```

行为回传将在 RE-1103-004 学习；本课只建立所有权边界。

---

## 11. 同一组件，不同 Props

页面渲染两个 `ReleaseCard`：

```tsx
<ReleaseCard release={currentRelease} />

<ReleaseCard
  release={{
    ...currentRelease,
    id: 'REL-2026-0903-COMPACT',
    version: 'v3.8.0-rc.2',
  }}
  density="compact"
  showOwner={false}
/>
```

它们共享同一个实现：

```text
ReleaseCard Component Type
```

但拥有不同的 Element 和 Props：

```text
Element A.props
Element B.props
```

所以：

```text
复用组件
≠
共享一份可变 Props
```

---

## 12. Wrong Way：无节制地 Spread Props

下面写法有时合理：

```tsx
<ReleaseCard {...props} />
```

但如果到处使用，公共 API 会变得不可见：

```text
调用方传了什么
中间组件转发了什么
最终组件真正需要什么
```

都难以阅读。

还可能把不应该进入 Host DOM 的字段继续传下去：

```tsx
<div {...props} />
```

本 Module 后续会在“API Evolution 与 Prop Forwarding”中完整处理。

当前原则：

```text
少量透明包装器可以谨慎 spread
业务组件优先显式列出契约
```

---

## 13. Debug 实验

### 实验一：比较两个组件实例

1. 启动项目。
2. 打开 React DevTools。
3. 选择第一张 `ReleaseCard`。
4. 记录 `release`、`density`、`showOwner`。
5. 选择第二张 `ReleaseCard`。
6. 比较两个 Props。

结论：

```text
同一个 Component Type
可以由不同 Props 生成不同输出
```

### 实验二：观察父组件产生下一份输入

1. 打开 Console。
2. 修改环境、风险数或审批状态。
3. 观察 `[Render] ReleaseCard received props`。
4. 对比操作前后的对象。

不要从日志次数推导 DOM Commit 次数；Render / Commit 已由 RE-1102-006 解释。

### 实验三：验证缺省值

1. 检查第一张卡片。
2. 调用方未传 `density` 和 `showOwner`。
3. 组件实际按 comfortable 和 true 渲染。
4. 检查第二张卡片的显式覆盖。

---

## 14. 课程验收

不看文档回答：

1. Props 是组件自己的 State 吗？
2. JSX attributes 如何进入组件？
3. 组件函数接收几个 props 参数？
4. 参数解构是 React 语法吗？
5. optional prop 与 default value 分别解决什么问题？
6. `readonly` 是否等于运行时深冻结？
7. 为什么子组件不能修改对象型 prop？
8. 父组件如何让子组件看到新的数据？
9. 两个同类型组件是否共享同一个 props 对象？
10. 为什么无节制的 `{...props}` 会隐藏 API？

---

## 15. 本课结论

```text
Props
= 调用方传入的当前组件输入

Component
= 读取输入并计算 Render Output

Ownership
= 数据由拥有它的组件产生下一份版本

Readonly
= 子组件不越权修改调用方的数据
```

下一课：

```text
RE-1103-002
children 是组合槽，不是特殊数组
```

---

## 16. 官方参考

- [React：Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [TypeScript：Object Types / Readonly Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html)
