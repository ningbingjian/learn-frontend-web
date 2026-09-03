# RE-1102-002：React Element——UI 描述对象不是 DOM

> Module：11.02 JSX、Element、Component 与 Render Output  
> 深度：Must  
> 类型：Element Object + `isValidElement` + Host/Component Type 对照  
> 前置课程：[RE-1102-001：JSX 不是 HTML](../01-jsx-source-to-transform/README.md)

---

## 1. 本课要解决的问题

上一课看到 JSX 会先被转换。

现在继续追问：

> 转换以后创建出来的“东西”到底是什么？`<section />` 和 `<RiskBadge />` 创建的是 DOM 吗？

核心结论：

```text
JSX
↓
React Element
```

而不是：

```text
JSX
↓
DOM Element
```

React Element 是一份轻量 UI 描述。

---

## 2. 学习目标

完成后应能够：

- 解释 React Element 的用途。
- 观察 `type`、`props`、`key`。
- 区分 Host Element 与 Component Element。
- 使用 `createElement` 创建等价概念的 Element。
- 使用 `isValidElement` 判断 React Element。
- 理解 React Node 范围大于 React Element。
- 解释为什么 Element 创建后应该视为不可变。
- 说明 Element 与真实 DOM 的创建时间不同。

---

## 3. 起始状态

进入：

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/02-react-element-description
```

执行：

```bash
npm install
npm run dev
```

页面会展示三类 Element：

```text
<section ... />
<RiskBadge ... />
createElement('section', ...)
```

---

## 4. Step 1：先创建一个 Host Element

源码：

```tsx
const hostElement = (
  <section className="card" data-environment="staging">
    <h2>Host Element Description</h2>
  </section>
);
```

可以先理解为类似：

```text
{
  type: "section",
  props: {...},
  key: null
}
```

这是课程级简化模型，不要依赖 React Element 的内部私有字段。

最重要的是：

```text
type = "section"
```

告诉 React：

> 这是一个 Host tag 描述，最终需要由 React DOM 处理到浏览器 DOM。

---

## 5. Step 2：Component Element 的 type 不再是字符串

```tsx
function RiskBadge(...) {
  ...
}

const componentElement = <RiskBadge level="medium" />;
```

课程级模型：

```text
{
  type: RiskBadge,
  props: {
    level: "medium"
  },
  key: null
}
```

此时 `type` 是组件函数引用。

关键点：

```text
创建这个 Element
≠ 已经执行 RiskBadge
```

真正调用组件的时间线在下一课完整观察。

---

## 6. Step 3：JSX 与 createElement

源码还创建：

```tsx
const createElementVersion = createElement(
  'section',
  { className: 'card' },
  ...
);
```

它也返回 React Element。

因此可以建立：

```text
JSX
是更常用的源码表达

createElement
是无需 JSX 的 Element 创建 API
```

现代 JSX transform 不一定在输出中直接写 `React.createElement`，所以不要把：

```text
JSX === React.createElement 文本替换
```

当成永远成立的编译实现。

稳定心智模型：

```text
JSX
→ Element creation
→ React Element
```

---

## 7. Step 4：使用 isValidElement

页面检查：

```tsx
isValidElement(<strong>hello</strong>) // true
```

但：

```tsx
isValidElement(42)        // false
isValidElement('hello')   // false
isValidElement(null)      // false
```

这里出现一个重要区别。

React 能渲染的 Node 不只有 React Element。

例如：

```text
string
number
null
array of React nodes
```

都可能成为 Render Output 的一部分。

因此：

```text
React Element
⊂
React Node / renderable values
```

`isValidElement` 判断的是“是不是 React Element”，不是“React 能不能渲染”。

---

## 8. key 在这里学到什么程度

Element 有 `key` 概念。

本课只记住：

> `key` 属于 Element 身份描述的一部分，不是普通业务 prop。

列表 Identity、错误 index key、状态保留与重置完整归：

```text
Module 11.06
List、Key 与 Identity
```

这里不提前展开。

---

## 9. Element 为什么应该不可变

React 官方要求把 Element 与它的 props 视为创建后不可变。

原因可以先按以下模型理解：

```text
Element
= 某一时刻的 UI Description
```

如果创建后偷偷修改同一个描述对象，React 的推理、开发者的推理和调试工具的证据都会变得不可靠。

Development build 中 React 可能浅冻结 Element 和 props 来帮助发现错误。

页面展示：

```tsx
Object.isFrozen(element)
Object.isFrozen(element.props)
```

注意：

- 这是开发辅助。
- 不能把“生产是否 freeze”作为业务契约。
- 正确规则始终是：创建后不要 mutate。

---

## 10. React Element 与 DOM Element 的区别

React Element：

```text
普通 JavaScript 层面的 UI 描述
React 可以创建、读取和协调
不拥有浏览器 layout / style / focus API
```

DOM Element：

```text
浏览器 Host Object
存在于 document
拥有 querySelector / classList / getBoundingClientRect 等平台能力
```

例如：

```tsx
const element = <button>发布</button>;
```

不能写：

```tsx
element.getBoundingClientRect();
```

因为它不是 `HTMLButtonElement`。

---

## 11. Failure Lab

### A：试图调用 DOM API

临时思考：

```tsx
hostElement.classList.add('active');
```

这是错误对象模型。

`hostElement` 是 React Element，不是 DOM Node。

### B：创建后修改 props

不要：

```tsx
(hostElement.props as any).className = 'changed';
```

开发模式可能直接失败，因为对象被 freeze。

即使环境没有 freeze，也违反 React 的不可变约束。

### C：认为 isValidElement(false) 就不能渲染

```tsx
isValidElement(42) // false
```

但：

```tsx
return 42;
```

仍可以成为合法 React Node。

所以必须区分：

```text
React Element validation
与
Renderable React Node
```

---

## 12. Debug 证据矩阵

| 工具 | 观察对象 |
|---|---|
| Console / JS | React Element 对象 |
| `isValidElement` | 是否为 React Element |
| React DevTools | Component Tree |
| Elements | 最终 Host DOM |

不要在 Elements 面板寻找“React Element 对象”。

Elements 面板看到的是提交后的 DOM。

---

## 13. 本课验收

不看文档回答：

1. React Element 是 DOM Element 吗？
2. `<section />` 的 type 是什么类型？
3. `<RiskBadge />` 的 type 是什么类型？
4. `createElement` 返回什么？
5. `42` 是 React Element 吗？可以渲染吗？
6. `isValidElement` 判断的是什么？
7. 为什么 Element props 创建后不能 mutate？
8. `key` 是普通业务 prop 吗？

运行：

```bash
npm run typecheck
npm run build
```

---

## 14. 官方参考

- React：createElement  
  <https://react.dev/reference/react/createElement>
- React：isValidElement  
  <https://react.dev/reference/react/isValidElement>

---

## 15. 下一课

下一课直接观察：

```text
创建 <ReleaseCard />
什么时候真正调用 ReleaseCard()
组件调用以后可以返回什么
```

进入：

[RE-1102-003：Component 何时调用，Render Output 到底是什么](../03-component-call-render-output/README.md)
