# RE-KP065：使用 key 主动重置状态

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解改变 `key` 可以让 React 把同一位置视为新的组件身份。
2. 会使用实体 ID 作为 key 主动重置局部 State。
3. 理解表单草稿为什么经常需要随“当前实体”变化而重置。
4. 知道 key reset 和手动在 Effect 中同步 State 的职责差异。
5. 能判断什么时候“保留 State”反而是 Bug。

> **本节核心代码**：`<ContactEditor key={contact.id} contact={contact} />`。
>
> **实验辅助代码**：两条联系人数据用于模拟切换编辑对象。

## 理论讲解

### 1. 保留 State 并不总是正确

假设你正在编辑 Alice：

```text
Alice 原始姓名 -> Alice
当前草稿 -> Alice Cooper
```

此时切换到 Bob。

如果编辑组件身份没有改变，本地 `draft` 可能继续保留：

```text
Alice Cooper
```

这对“编辑当前联系人”来说是错误的。

### 2. key 可以表达实体身份

写：

```jsx
<ContactEditor key={contact.id} contact={contact} />
```

当 `contact.id` 从：

```text
alice -> bob
```

React 会把它识别为不同身份。

旧编辑器 State 被丢弃，新编辑器用 Bob 的初始数据建立 State。

### 3. key reset 的优点

它直接表达：

```text
“当实体身份变化时，这个局部状态应该重新开始。”
```

而不是先保留旧 State，再额外写同步逻辑去修正。

### 4. key 不是所有同步问题的万能方案

如果组件身份本来应该保留，只是某个字段需要更新，就不应该为了方便随意改 key。

key 改变意味着：

```text
整个组件身份重建
局部 State 重置
相关 DOM 也可能重新创建
```

因此它应该匹配真实的身份边界。

## 动手编码：从 0 到 1

### 第 0 步：准备联系人

```js
const contacts = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
];
```

### 第 1 步：创建本地草稿

```jsx
function ContactEditor({ contact }) {
  const [draft, setDraft] = useState(contact.name);
  // ...
}
```

### 第 2 步：父组件切换当前联系人

```jsx
const contact = contacts[selectedIndex];
```

### 第 3 步：给编辑器加实体 key

```jsx
<ContactEditor key={contact.id} contact={contact} />
```

### 第 4 步：验证主动重置

1. 把 Alice 草稿改成其他文字。
2. 切换 Bob。
3. 输入框应该显示 Bob。
4. 切回 Alice 时，因为之前 Alice 编辑器已经卸载，草稿重新从 Alice 初始化。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：实体 ID key 主动重置局部 State。
- **实验辅助代码**：联系人切换只用于触发身份变化。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp065-key-reset-state --config ./vite.config.js
```

## 效果验证

- 修改当前联系人的本地草稿。
- 切换联系人后草稿自动重置成新实体数据。
- 能解释 reset 的原因是 `key` 改变了组件身份。
- 能说明什么时候不应该滥用 key reset。

完成后继续 **RE-KP066：列表 key 的稳定性要求**。
