# RE-KP070：状态保留与条件渲染

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解条件表达式本身不会自动决定 State 是否保留。
2. 会从最终渲染树的“位置 + 组件类型 + key”判断身份是否延续。
3. 理解两个条件分支如果在同一位置都渲染同一组件类型，State 可以被保留。
4. 理解组件如果从树中被移除，其 State 会被销毁；重新出现时会重新初始化。
5. 能区分“隐藏内容”“改变 Props”“移除组件”三种不同设计。
6. 能为 Tab、步骤表单、详情面板判断 State 应该保留还是重置。

> **本节核心代码**：同位置同类型的条件分支与“组件/占位元素”条件切换的对照。  
> **实验辅助代码**：两个独立示例区用来同时观察 preserve 与 reset，不代表真实业务一定要并排实现两套 UI。

## 理论讲解

### 1. 不要只看 JSX 源码长什么样

例如：

```jsx
{compact ? (
  <Counter label="Compact" />
) : (
  <Counter label="Comfortable" />
)}
```

源码中确实有两个 `<Counter />`。

但每次 Render 最终只会在这个位置产生一个 Counter。

而且两边：

```text
位置相同
类型都是 Counter
key 也没有变化
```

因此切换 `compact` 时，React 可以把它理解为：

```text
同一个 Counter
只是 Props 改了
```

State 会保留。

### 2. 条件分支不同，不等于组件身份一定不同

React 判断的重点不是：

```text
这段 JSX 写在 if 左边还是右边？
```

而是 Render 后：

```text
父节点下面的这个位置
现在是什么 type / key？
```

这和前面“渲染树位置决定身份”完全一致。

### 3. 组件从树中消失时 State 会被销毁

例如：

```jsx
{showCounter ? <Counter /> : <p>Counter hidden</p>}
```

当 `showCounter` 从 `true` 变为 `false`：

```text
这个位置从 Counter
变成 p
```

组件类型发生变化，Counter 子树被移除。

如果之后切回：

```jsx
<Counter />
```

这是一个重新创建的 Counter，State 从初始值开始。

### 4. “不显示”有多种实现语义

需求说：

```text
暂时不显示这个面板
```

可能有三种不同策略：

#### 策略 A：仍保留组件，只改内部 UI

组件仍在树中，State 可保留。

#### 策略 B：组件仍在树中，用 CSS 隐藏

State 也可保留，但大型隐藏树会继续占资源。

#### 策略 C：条件渲染直接移除组件

组件离开树，State 通常被销毁。

所以“隐藏”是产品需求，“是否卸载”是技术设计。

### 5. 什么时候应该重置

典型需要重置的场景：

```text
切换到另一个用户的编辑表单
开始一轮全新的流程
离开页面后希望丢弃草稿
```

可以通过：

- 让组件离开树。
- 改变组件类型。
- 改变有业务意义的 key。

### 6. 什么时候应该保留

典型需要保留：

```text
同一个组件只是主题变化
同一实体只是切换展示模式
短暂收起再展开仍希望保留草稿
```

此时要避免意外改变组件身份。

## 动手编码：从 0 到 1

### 第 0 步：准备可观察 State 的 Counter

```jsx
function Counter({ label }) {
  const [score, setScore] = useState(0);
  return (
    <section>
      <h3>{label}</h3>
      <button onClick={() => setScore(score + 1)}>{score}</button>
    </section>
  );
}
```

### 第 1 步：做“同位置同类型”条件切换

```jsx
{compact ? (
  <Counter label="Compact mode" />
) : (
  <Counter label="Comfortable mode" />
)}
```

先把 score 加到 3，再切换模式。

预期：score 仍是 3。

### 第 2 步：做“Counter 与其他类型”切换

```jsx
{showCounter ? (
  <Counter label="Removable counter" />
) : (
  <p>Counter 已从树中移除</p>
)}
```

### 第 3 步：验证移除后重建

1. Counter 加到 4。
2. 点击隐藏。
3. 再点击显示。
4. 新 Counter 回到 0。

### 第 4 步：画出两条身份链

保留：

```text
Counter(position A)
→ Counter(position A)
```

重置：

```text
Counter(position B)
→ p(position B)
→ Counter(position B, new instance)
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：两种条件渲染对组件 type/position 的不同影响。
- **实验辅助代码**：两个独立开关只为了让 preserve/reset 行为并排观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp070-state-preservation-conditional-rendering --config ./vite.config.js
```

## 效果验证

1. “模式切换”区域把 Counter 加到非 0。
2. 切换 compact/comfortable，State 保留。
3. “移除组件”区域把 Counter 加到非 0。
4. 隐藏后再次显示，State 回到 0。
5. 能解释真正判断条件是 render tree 的 position/type/key，不是 `?:` 语法本身。
6. Chapter 07 至此形成完整链路：position → type → key → list key → random key → nested definition → conditional tree。

完成后进入 **Chapter 08：状态建模、提升状态与受控设计**。
