# RE-1102-004：JSX Expression、Fragment、Conditional 与 Empty Node

> Module：11.02 JSX、Element、Component 与 Render Output  
> 深度：Must  
> 类型：JSX 表达式 + Render Output 边界实验  
> 前置课程：[RE-1102-003：Component 何时调用，Render Output 到底是什么](../03-component-call-render-output/README.md)

---

## 1. 本课要解决的问题

前三课已经建立：

```text
JSX Source
→ React Element
→ Component Invocation
→ Render Output
```

但真实 JSX 中经常出现：

```tsx
{count}
{online ? <span>在线</span> : <span>离线</span>}
{warning && <p>有风险</p>}
<></>
{null}
{false}
{undefined}
```

这些值到底怎样进入 Render Output？为什么有些值会显示、有些值完全不产生 DOM？为什么 `0 && <Panel />` 会把 `0` 渲染出来？为什么 Fragment 可以组织多个兄弟节点，却不会额外增加一个 DOM 包装元素？

本课只解决这个边界。

---

## 2. 学习目标

完成本课后，你应该能够：

- 解释 JSX `{}` 中要求的是 JavaScript Expression，而不是任意 Statement。
- 在 JSX 中正确使用变量、函数调用和条件表达式。
- 区分 ternary 与 `&&` 条件渲染的语义。
- 解释为什么数字 `0` 是可渲染值，而 `false`、`null`、`undefined` 通常作为 Empty Node。
- 使用 Fragment 返回多个兄弟节点而不制造额外 DOM wrapper。
- 解释 Fragment 自身不是 Host DOM Element。
- 说明普通 JavaScript Object 不能直接作为 React child。
- 使用 Elements 面板验证 Fragment 没有生成额外包装节点。

---

## 3. 起始状态

本 Lesson 独立运行，不依赖前三课目录。

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/04-jsx-expression-fragment-empty-node
npm install
npm run dev
```

目录：

```text
04-jsx-expression-fragment-empty-node/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

---

## 4. Step 1：JSX 大括号里放的是 Expression

打开：

```text
src/main.tsx
```

项目中先准备普通 JavaScript 值：

```tsx
const environment = 'staging';
const completed = 3;
const total = 5;
const remaining = total - completed;
```

然后在 JSX 中读取：

```tsx
<p>环境：{environment}</p>
<p>已完成：{completed}</p>
<p>剩余：{remaining}</p>
```

`{}` 的核心含义不是“进入 React 模式”，而是：

```text
JSX 文本上下文
→ 切回 JavaScript Expression
→ 得到一个值
→ 这个值进入当前 Render Output
```

### Expression 可以是什么

例如：

```tsx
{environment}
{completed + 1}
{remaining === 0 ? '完成' : '未完成'}
{formatProgress(completed, total)}
```

### Statement 不能直接塞进去

下面是错误心智模型：

```tsx
{
  if (remaining > 0) {
    return <p>还有任务</p>;
  }
}
```

`if` 是 Statement，不是一个可以直接产生值的 Expression。

正确做法通常是：

- 在 `return` 之前先计算变量；
- 使用 ternary；
- 抽取函数或组件。

---

## 5. Step 2：ternary 是最明确的二选一

源码：

```tsx
{serviceOnline ? (
  <span className="status status--ok">服务在线</span>
) : (
  <span className="status status--danger">服务离线</span>
)}
```

心智模型：

```text
condition
→ true branch value
或
→ false branch value
→ 选中的 React Node 进入 Render Output
```

它不是 React 特有语法，而是 JavaScript conditional expression。

---

## 6. Step 3：理解 `&&` 条件渲染

常见写法：

```tsx
{hasRisk && <p className="warning">仍有发布风险</p>}
```

JavaScript 的 `&&` 返回的不是固定 boolean，而是操作数本身：

```text
左边 truthy
→ 返回右边

左边 falsy
→ 返回左边
```

因此：

```tsx
true && <p>风险</p>
```

得到 Element。

但：

```tsx
0 && <p>风险</p>
```

得到的是数字：

```text
0
```

数字是可渲染 React Node，因此页面会真的出现 `0`。

### 本课故意保留这个实验

源码：

```tsx
const queuedWarnings = 0;

<p className="pitfall">
  错误写法结果：{queuedWarnings && <strong>有告警</strong>}
</p>
```

页面会显示：

```text
错误写法结果：0
```

更稳妥：

```tsx
{queuedWarnings > 0 && <strong>有告警</strong>}
```

这里左侧明确得到 boolean。

---

## 7. Step 4：Empty Node 不等于字符串“空”

本课直接渲染：

```tsx
{null}
{false}
{undefined}
```

它们通常不会产生可见 Host DOM 内容。

可以先建立这一层模型：

```text
null / undefined / boolean
→ 可以成为 Render Output 的空结果
→ 不产生对应文本 DOM
```

注意：

```tsx
{String(false)}
```

会渲染：

```text
false
```

因为它已经是字符串。

---

## 8. Step 5：Fragment 组织兄弟节点，但不制造 wrapper

组件：

```tsx
function ReleaseFacts() {
  return (
    <>
      <dt>环境</dt>
      <dd>staging</dd>
      <dt>审批</dt>
      <dd>3 / 5</dd>
    </>
  );
}
```

如果不用 Fragment，组件通常需要返回一个共同父节点。

错误地增加包装：

```tsx
<div>
  <dt>环境</dt>
  <dd>staging</dd>
</div>
```

会改变真实 DOM 结构，而且这里 `div` 还破坏了 `dl` 的语义结构。

Fragment：

```tsx
<>
  ...
</>
```

允许返回多个兄弟 React Node，却不会因为 Fragment 本身创建一个额外 `<div>`。

### DevTools 验证

Elements 中检查：

```html
<dl>
  <dt>环境</dt>
  <dd>staging</dd>
  <dt>审批</dt>
  <dd>3 / 5</dd>
</dl>
```

你不会看到：

```html
<fragment>
```

Fragment 是 React Render Output 组织能力，不是浏览器标签。

---

## 9. Step 6：普通 Object 不能直接当 child

这是错误示例：

```tsx
const release = {
  environment: 'staging',
  completed: 3,
};

return <p>{release}</p>;
```

普通对象不是 React 可以直接显示的文本内容。

你必须明确选择展示什么：

```tsx
<p>{release.environment}</p>
```

或者在调试场景显式序列化：

```tsx
<pre>{JSON.stringify(release, null, 2)}</pre>
```

关键区别：

```text
Object 是业务数据容器
≠
React Element
≠
自动可显示文本
```

---

## 10. 当前源码核心

本课页面同时展示：

```text
Expression
Conditional
&& pitfall
Empty Node
Fragment
```

你可以直接在 `src/main.tsx` 修改：

```tsx
serviceOnline
hasRisk
queuedWarnings
```

观察页面变化。

---

## 11. Failure Lab

### Failure A：`0 && UI`

把：

```tsx
queuedWarnings = 0
```

保留后观察 `0` 出现在页面。

修复：

```tsx
queuedWarnings > 0 && ...
```

### Failure B：把 Object 直接放进 JSX

临时写：

```tsx
<p>{release}</p>
```

TypeScript 会先帮助阻止这个错误；如果通过不安全方式绕过类型，React 运行阶段也无法把普通 Object 当作正常 child 渲染。

### Failure C：为了“只能返回一个根节点”乱加 div

观察语义结构和 CSS Grid/Flex 布局可能因此改变。

正确思路：

> “一个 Render Output”不等于“必须增加一个真实 DOM wrapper”。

---

## 12. Wrong Way

### 把 JSX 当模板字符串

JSX 最终产生 React 描述值，不是 HTML 字符串拼接。

### 在 JSX 中塞大量复杂业务表达式

语法允许不代表可读。复杂规则应先命名，再进入 Render Output。

### 把 `&&` 当成固定返回 boolean

必须记住 JavaScript short-circuit 的真实值语义。

### 用无意义 wrapper 解决返回结构

需要 DOM wrapper 时才加 Host Element；只为组织 React Node 时考虑 Fragment。

---

## 13. Debug 证据

### React DevTools

观察 `App` 与 `ReleaseFacts` 组件树。

### Elements

重点确认 Fragment 不产生 Host DOM wrapper。

### TypeScript

临时把 Object 直接作为 child，观察类型错误。

### View Source 不够

浏览器接收到的是 Vite 入口 HTML，不会把运行后的 React DOM 当作初始 HTML 源码。动态 DOM 应看 Elements。

---

## 14. 本课验收

不看文档回答：

1. JSX `{}` 为什么能放 `completed + 1`，却不能直接放 `if`？
2. `condition && <Panel />` 的真实 JavaScript 返回规则是什么？
3. 为什么 `0 && <Panel />` 可能显示 `0`？
4. `false` 本身为什么通常不产生文本节点？
5. `String(false)` 为什么会显示？
6. Fragment 是 DOM Element 吗？
7. Fragment 为什么对 `dl`、table 等语义结构很有价值？
8. 普通 Object 为什么不能直接作为 child？

实际验收：

```bash
npm run typecheck
npm run build
```

都必须成功。

---

## 15. 下一课

下一课不增加新的 JSX 技巧，而是回答 React 更重要的约束：

> 为什么组件 Render 必须尽量是纯函数、幂等计算？

[RE-1102-005：Pure Render、Idempotency 与 Render-time Mutation](../05-pure-render-idempotency-mutation/README.md)
