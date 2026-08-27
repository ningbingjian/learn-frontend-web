# RE-KP045：对象状态不可变更新

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用对象作为一个完整的 State 值。
2. 使用对象展开语法 `...` 保留未修改字段。
3. 理解 setter 接收的是一份新的完整对象，而不是自动“局部 merge”。
4. 会用计算属性 `[name]` 更新表单中的指定字段。
5. 理解对象 spread 是浅拷贝，嵌套对象更新需要继续复制下一层。

> **本节核心代码**：`setForm({ ...form, [name]: value })`，用新对象替换旧对象并保留其他字段。
>
> **实验辅助代码**：三项表单字段和 JSON 预览只用于观察对象 State 的整体替换结果。

## 理论讲解

### 1. 一个 State 可以保存一个对象

例如：

```jsx
const [form, setForm] = useState({
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com'
});
```

此时 `form` 是一个整体 State 值。

### 2. setter 不会自动帮你 merge 对象

如果你写：

```js
setForm({
  firstName: 'Grace'
});
```

下一份 State 就是你传入的新对象。

不要期待 React 自动保留：

```text
lastName
email
```

所以更新对象时通常需要显式保留旧字段。

### 3. 使用对象 spread 复制一层

常见写法：

```js
setForm({
  ...form,
  firstName: 'Grace'
});
```

展开顺序很重要：

```text
先复制旧字段
      ↓
再用 firstName 覆盖旧值
```

如果顺序反过来：

```js
setForm({
  firstName: 'Grace',
  ...form
});
```

旧的 `form.firstName` 会再次把 `'Grace'` 覆盖掉。

### 4. 多个输入框可以复用一个 Handler

输入框带：

```jsx
<input name="firstName" ... />
<input name="lastName" ... />
<input name="email" ... />
```

事件中读取：

```js
const { name, value } = event.target;
```

然后：

```js
setForm({
  ...form,
  [name]: value
});
```

这里：

```text
[name]
```

是 JavaScript 计算属性名，不是 React 特殊语法。

### 5. 为什么不拆成三个 useState

当然可以写：

```jsx
const [firstName, setFirstName] = useState('Ada');
const [lastName, setLastName] = useState('Lovelace');
const [email, setEmail] = useState('ada@example.com');
```

但当这些字段天然属于同一个表单对象时，用一个对象 State 也很合理。

选择重点是：

```text
这些值是否经常一起表达一个完整实体？
```

而不是“对象一定比多个 State 高级”。

### 6. Spread 是浅拷贝

`...form` 只复制对象第一层。

如果结构是：

```js
{
  name: 'Ada',
  address: {
    city: 'London'
  }
}
```

仅仅：

```js
{ ...form }
```

不会自动深拷贝 `address`。

嵌套更新会在 RE-KP047 专门处理。

---

## 动手编码：从 0 到 1

### 第 0 步：准备对象 State

创建 `src/main.jsx`，导入：

```jsx
import { useState } from 'react';
```

### 第 1 步：建立表单对象

```jsx
const [form, setForm] = useState({
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com'
});
```

### 第 2 步：先只更新一个字段

例如：

```js
setForm({
  ...form,
  firstName: 'Grace'
});
```

确认其他字段仍然存在。

### 第 3 步：把三个输入框绑定到对象

```jsx
<input name="firstName" value={form.firstName} onChange={handleChange} />
<input name="lastName" value={form.lastName} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
```

### 第 4 步：写通用 Handler

```jsx
function handleChange(event) {
  const { name, value } = event.target;

  setForm({
    ...form,
    [name]: value
  });
}
```

现在三个输入框可以共享同一套更新逻辑。

### 第 5 步：显示完整对象

用：

```jsx
<pre>{JSON.stringify(form, null, 2)}</pre>
```

每修改一个输入框，都能直接观察新的完整对象。

### 第 6 步：理解这里真正发生了什么

每次输入：

```text
旧 form
   ↓ spread
复制出新对象
   ↓
覆盖一个字段
   ↓
setForm(nextForm)
   ↓
重新 Render
```

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`{ ...form, [name]: value }`。
- **实验辅助代码**：输入框与 JSON 预览用于观察整体对象 State。

## 运行案例

```bash
npm run dev -- ./05-state-basics-object-array-updates/kp045-object-state-updates --config ./vite.config.js
```

## 效果验证

1. 修改 firstName 时，lastName 和 email 不会丢失。
2. 三个输入框共享同一个 `handleChange`。
3. 每次更新都创建新的对象交给 setter。
4. 能解释为什么 `setForm({ firstName: 'Grace' })` 不会自动保留其他字段。
5. 能解释对象 spread 为什么只解决一层复制。

完成后继续 **RE-KP046：数组状态不可变更新**。
