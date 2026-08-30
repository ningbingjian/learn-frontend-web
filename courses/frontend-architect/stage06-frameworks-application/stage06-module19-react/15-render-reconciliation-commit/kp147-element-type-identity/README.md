# RE-KP147：Element Type 与身份比较

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Element Type 是 React 判断“前后是否还是同一类节点”的核心身份信息之一。
2. 区分“同一个 Type，只是 Props 变化”和“Type 本身发生变化”。
3. 理解同 Type 匹配时 State 可以继续保留。
4. 理解不同 Type 替换时旧组件身份被移除，新组件身份重新创建。
5. 从 Reconciliation 角度重新解释组件 State 为什么会保留或重置。

> **本节核心代码**：`<Editor tone={...} />` 在 tone 变化时仍是同一个 `Editor` Type；切换成 `<Preview />` 时 Type 改变，`Editor` 身份被移除。  
> **实验辅助代码**：`draft` 输入框用于观察组件 State 是否保留。

## 理论讲解

### 1. Type 是什么

对于原生元素：

```jsx
<div />
<button />
```

Type 分别可以理解为：

```text
'div'
'button'
```

对于自定义组件：

```jsx
<Editor />
<Preview />
```

Type 则分别是 `Editor` 和 `Preview` 组件本身。

### 2. 同 Type + 同位置

例如前后两次都是：

```jsx
<Editor tone="normal" />
```

变成：

```jsx
<Editor tone="strong" />
```

Type 仍是 `Editor`。

React 可以把它理解为：

```text
同一个组件身份
只是 Props 更新
```

因此组件内部 State 可以继续保留。

### 3. Type 变化

如果：

```jsx
<Editor />
```

变成：

```jsx
<Preview />
```

Type 已经不同。

这不是“给同一个组件换 Props”，而是：

```text
移除 Editor 身份
创建 Preview 身份
```

切回 `Editor` 时，又会创建新的 Editor State。

### 4. Type 与 Key 是不同维度

本节只关注 Type。

下一节再处理：

```text
同一父节点下多个 sibling
如何通过 key 建立稳定身份
```

### 5. 不要把 Type 比较理解成业务 className 比较

下面仍然是同一个 DOM Element Type：

```jsx
<section className="light" />
<section className="dark" />
```

`className` 是 Prop。

真正 Type 变化是：

```jsx
<section />
<article />
```

或者：

```jsx
<Editor />
<Preview />
```

## 动手编码：从 0 到 1

### 第 0 步：创建 Editor

**目标**：准备一个拥有本地 State 的组件。

```jsx
function Editor() {
  const [draft, setDraft] = useState('');
  return <input value={draft} onChange={event => setDraft(event.target.value)} />;
}
```

**为什么这样写**：本地 `draft` 最容易观察身份是否被保留。

**观察**：输入内容后，Editor 保存 draft。

### 第 1 步：让同一个 Editor 接收不同 Props

**目标**：验证“Props 变化 ≠ Type 变化”。

```jsx
<Editor tone={tone} />
```

切换：

```jsx
setTone(tone === 'normal' ? 'strong' : 'normal');
```

**为什么这样写**：前后 Type 始终是 `Editor`。

**观察**：切换 tone 后 draft 仍然存在。

### 第 2 步：加入 Preview

**目标**：准备不同组件 Type。

```jsx
function Preview() {
  return <strong>这里只是预览模式</strong>;
}
```

**为什么这样写**：`Preview` 与 `Editor` 是两个不同的 Component Type。

**观察**：可以在两种组件之间切换。

### 第 3 步：在相同位置切换 Type

**目标**：观察身份重建。

```jsx
{mode === 'editor' ? <Editor tone={tone} /> : <Preview />}
```

**为什么这样写**：同一位置从 `Editor` 换成 `Preview`。

**观察**：Editor 中输入 draft → 切到 Preview → 再切回 Editor，draft 被重置。

### 第 4 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同 Type Props 更新与不同 Type 替换的对比。
- **实验辅助代码**：Editor 的 draft State 和模式切换按钮。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp147-element-type-identity --config ./vite.config.js
```

## 效果验证

1. 在 Editor 中输入任意草稿。
2. 点击“切换 tone”，草稿继续存在。
3. 点击“切到 Preview”，Editor 被替换。
4. 再切回 Editor，草稿重新从空字符串开始。
5. 能解释 tone 属于 Props 变化，而 `Editor → Preview` 属于 Type 变化。
6. 能从 Element Type 身份匹配解释 State 保留与重置。

完成后继续 **RE-KP148：Key 在 Reconciliation 中的作用**。
