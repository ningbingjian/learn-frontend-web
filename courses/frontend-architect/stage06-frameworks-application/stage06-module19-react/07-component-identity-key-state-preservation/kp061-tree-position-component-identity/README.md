# RE-KP061：组件树中的位置决定身份

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 State 实际由 React 保存，并和组件在 Render Tree 中的位置关联。
2. 理解“同一个组件函数”可以在不同位置拥有不同 State。
3. 理解相同父级位置、相同组件类型通常被 React 视为同一个组件身份。
4. 能解释为什么仅仅修改 Props 不一定会重置 State。
5. 为后续 `key`、类型变化、条件渲染和状态重置建立统一身份模型。

> **本节核心代码**：条件分支在同一个树位置渲染同一种 `Counter` 组件，只改变 `person` Prop。  
> **实验辅助代码**：Taylor / Sarah 切换按钮只用于观察身份是否变化。

## 理论讲解

### 1. State 并不真的“存在组件函数变量里”

写：

```jsx
function Counter() {
  const [score, setScore] = useState(0);
}
```

看起来像：

```text
score 存在 Counter 函数内部
```

但组件函数每次 Render 都会重新执行。

真正保存 State 的是 React。

React 需要知道：

```text
这一份 State 属于树中的哪一个组件？
```

### 2. React 使用 Render Tree 中的位置关联 State

可以先建立：

```text
父组件
└── 第一个子位置：Counter
    └── score State
```

如果下一次 Render 仍然是：

```text
同一个父级
同一个位置
同一种组件类型 Counter
```

React 通常会把它识别成：

```text
“刚才那个 Counter”
```

于是继续把原来的 State 提供给它。

### 3. Props 变化不等于组件身份变化

例如：

```jsx
{isTaylor ? (
  <Counter person="Taylor" />
) : (
  <Counter person="Sarah" />
)}
```

从源码看像两个分支。

但从 Render Tree 看，它们都占据：

```text
父节点的同一个子位置
```

并且类型都是：

```text
Counter
```

所以切换 Taylor / Sarah 时，`person` Prop 改了，但 `score` State 默认仍然可能保留。

### 4. 这就是“位置决定身份”的第一层模型

不能只看：

```text
JSX 写在 if 左边还是右边
```

更应该看最终树：

```text
这个父节点下面的这个位置
现在是什么组件类型？
```

### 5. 不同位置就是不同身份

如果同时渲染：

```jsx
<Counter person="Taylor" />
<Counter person="Sarah" />
```

即使两者都调用同一个 `Counter` 函数，它们位于两个位置，因此拥有两份独立 State。

这和 RE-KP042 “State 是组件私有记忆”可以连接起来。

### 6. 位置不是唯一因素

后续还要加入：

```text
组件类型
key
```

最终你会形成：

```text
Parent 中的位置 + Component Type + key
→ React 判断身份
→ 决定 State 保留还是重置
```

本节先只抓住“位置”这一条主线。

### 7. 为什么这个知识点非常重要

很多看起来神秘的问题都和身份有关：

```text
为什么切换页面后输入框内容还在？
为什么换了一个组件后 State 突然清空？
为什么 random key 导致输入框不断丢焦点？
为什么把组件定义写到组件内部会重置？
```

后面整个 Chapter 07 都是在扩展这一套身份模型。

## 动手编码：从 0 到 1

### 第 0 步：写 Counter

```jsx
function Counter({ person }) {
  const [score, setScore] = useState(0);

  return (
    <section>
      <h2>{person}</h2>
      <p>score：{score}</p>
      <button onClick={() => setScore(s => s + 1)}>+1</button>
    </section>
  );
}
```

### 第 1 步：在父组件保存当前人物

```jsx
const [isTaylor, setIsTaylor] = useState(true);
```

### 第 2 步：在同一个位置条件渲染同一种组件

```jsx
{isTaylor ? (
  <Counter person="Taylor" />
) : (
  <Counter person="Sarah" />
)}
```

### 第 3 步：把 Taylor 分数加到 3

```text
Taylor score = 3
```

### 第 4 步：切换到 Sarah

你会看到名字变成 Sarah，但 score 仍可能是：

```text
3
```

这不是 State 从 Taylor “复制给 Sarah”。

React 的判断更接近：

```text
同一个位置
仍然是 Counter
所以这是同一个组件身份，只是 person Prop 变了
```

### 第 5 步：再次切回 Taylor

score 仍然保留，因为组件身份没有被重置。

### 第 6 步：不要急着加 key

你可能已经想到：

```jsx
<Counter key={person} />
```

但 `key` 会在 RE-KP064～065 专门学习。

本节故意不加，先把默认的位置身份模型看清。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同一位置、同一组件类型，仅 Props 变化。
- **实验辅助代码**：人物切换按钮用于制造 Prop 变化。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp061-tree-position-component-identity --config ./vite.config.js
```

## 效果验证

1. Taylor 的 score 加到 3。
2. 切换到 Sarah。
3. score 仍保持 3。
4. 切回 Taylor，State 继续保留。
5. 能解释原因不是“Props 自动共享 State”，而是 Render Tree 中组件身份没有变化。
6. 能画出父节点下同一个 Counter 位置的树结构。

完成后继续 **RE-KP062：相同位置相同组件保留状态**。
