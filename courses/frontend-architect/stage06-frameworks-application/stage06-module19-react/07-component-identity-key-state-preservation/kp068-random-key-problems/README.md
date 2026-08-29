# RE-KP068：随机 key 的问题

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么 `key={Math.random()}` 会破坏组件身份稳定性。
2. 理解 key 每次变化时，React 会把旧组件视为被移除、把新 key 对应的组件视为新实例。
3. 能解释随机 key 为什么会导致输入框内容、焦点、本地 State 等丢失。
4. 区分“key 唯一”与“key 稳定”这两个要求。
5. 知道列表中应优先使用数据本身携带的稳定 ID。
6. 能识别 `Date.now()`、`crypto.randomUUID()` 在 Render 阶段直接生成 key 的同类问题。

> **本节核心代码**：故意错误的 `<DraftEditor key={Math.random()} />` 与稳定写法 `<DraftEditor key="editor" />` 的对照。  
> **实验辅助代码**：父组件计数器只用于制造无关重渲染，让随机 key 的 remount 现象稳定复现。

## 理论讲解

### 1. key 的任务不是“消除 warning”

上一节已经建立：

```text
React 通过 position + type + key
判断某个位置上的组件身份是否延续
```

如果 key 在两次 Render 之间变化：

```text
Render A: <DraftEditor key="a" />
Render B: <DraftEditor key="b" />
```

React 不会把它理解成：

```text
同一个 DraftEditor，只是 key 属性变了
```

而更接近：

```text
key=a 的组件离开
key=b 的新组件出现
```

因此旧组件的本地 State 会被销毁，新组件从初始 State 开始。

### 2. `Math.random()` 为什么尤其危险

如果写：

```jsx
<DraftEditor key={Math.random()} />
```

每次父组件重新 Render 都会重新执行：

```js
Math.random()
```

于是：

```text
第一次 Render -> key=0.18
第二次 Render -> key=0.73
第三次 Render -> key=0.41
```

对于 React 来说，它看到的是三个不同身份。

结果就是：

```text
父组件只是改了一个无关计数
        ↓
DraftEditor key 变化
        ↓
旧 DraftEditor 被卸载
        ↓
新 DraftEditor 挂载
        ↓
input State 回到初始值
```

### 3. “唯一”并不等于“稳定”

随机值通常很容易做到唯一：

```text
0.183829...
0.833422...
0.572910...
```

但 key 的真正要求还包括：

```text
同一个业务实体在不同 Render 之间
应该继续拿到同一个 key
```

因此：

```jsx
items.map(item => <Row key={item.id} />)
```

通常比：

```jsx
items.map(item => <Row key={Math.random()} />)
```

正确得多。

### 4. 随机 key 会影响什么

如果组件被 remount，可能重置：

- `useState` 本地状态。
- 输入框草稿。
- DOM focus。
- 展开/折叠状态。
- 组件内部缓存。
- 子树内更多组件的状态。

所以它不只是“性能稍差”。

很多时候它会直接造成用户可见 Bug。

### 5. `crypto.randomUUID()` 本身不是坏 API

关键是**什么时候生成**。

错误模式：

```jsx
<Row key={crypto.randomUUID()} />
```

因为每次 Render 都创建新 ID。

如果是在“创建数据实体”时生成并保存：

```js
const newTask = {
  id: crypto.randomUUID(),
  title: 'Learn React'
};
```

以后一直：

```jsx
<TaskRow key={task.id} />
```

这个 ID 就可以是稳定 key。

### 6. 不要用随机 key 强行“刷新组件”

有时开发者发现页面没更新，就写：

```jsx
<Component key={Math.random()} />
```

这相当于：

```text
每次都销毁再重建
```

它可能掩盖真正的 State 建模问题。

如果业务确实需要重置状态，应该使用有业务语义的 key：

```jsx
<ProfileForm key={user.id} user={user} />
```

而不是随机 key。

## 动手编码：从 0 到 1

### 第 0 步：创建一个带本地 State 的编辑器

```jsx
function DraftEditor() {
  const [draft, setDraft] = useState('');

  return (
    <input
      value={draft}
      onChange={event => setDraft(event.target.value)}
    />
  );
}
```

**本步目标**：让子组件拥有明显可观察的本地状态。  
**运行后观察**：输入文本会保存在 `draft` 中。

### 第 1 步：在父组件加入无关计数器

```jsx
const [parentCount, setParentCount] = useState(0);
```

按钮：

```jsx
<button onClick={() => setParentCount(parentCount + 1)}>
  Parent render: {parentCount}
</button>
```

**本步目标**：制造父组件 Render，但不直接修改编辑器数据。

### 第 2 步：故意使用随机 key

```jsx
<DraftEditor key={Math.random()} />
```

现在：

1. 在输入框输入 `hello`。
2. 点击父组件计数按钮。
3. 输入内容立即消失。

**为什么**：父组件重新 Render → random key 变化 → 编辑器 remount。

### 第 3 步：加入稳定版本做并排对照

```jsx
<DraftEditor key="stable-editor" />
```

这一个编辑器在父组件重渲染时仍然保留 State。

### 第 4 步：形成判断规则

看到：

```jsx
key={Math.random()}
key={Date.now()}
key={crypto.randomUUID()}
```

如果这些表达式发生在 Render 中，就应该立刻警觉。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：随机 key 与稳定 key 的身份对照。
- **实验辅助代码**：父级计数器只是为了触发 Render。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp068-random-key-problems --config ./vite.config.js
```

## 效果验证

你应该能够验证：

1. 两个输入框都先输入文字。
2. 点击“父组件重渲染”。
3. 随机 key 编辑器文字被清空。
4. 稳定 key 编辑器文字保留。
5. 能解释发生的不是“input 被清空”，而是组件身份变化导致旧 State 被销毁。
6. 能说出正确原则：key 要唯一，也要在实体生命周期中保持稳定。

完成后继续 **RE-KP069：嵌套组件定义导致状态意外重置**。
