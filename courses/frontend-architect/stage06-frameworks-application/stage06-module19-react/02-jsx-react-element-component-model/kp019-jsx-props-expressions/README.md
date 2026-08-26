# RE-KP019：JSX 属性与 JavaScript 表达式

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 JSX 静态字符串属性与 `{...}` JavaScript 表达式属性。
2. 理解 JSX 中传给组件/宿主标签的是 props。
3. 会使用 `className`、`htmlFor`、Boolean prop、`style` 对象等常见 React DOM 写法。
4. 会使用 JSX spread syntax 转发一组 props，并知道不要无脑滥用。
5. 能解释 `src="avatarUrl"` 与 `src={avatarUrl}` 为什么完全不同。

> **本节核心代码**：`prop="string"`、`prop={expression}`、Boolean prop、`style={{...}}`、`{...props}`。
>
> **实验辅助代码**：内嵌 SVG 头像、尺寸对象和展示卡片只用于覆盖不同属性写法，避免案例依赖外部图片服务。

## 理论讲解

### 1. JSX 属性最终是在传递 props

例如：

```jsx
<img src="/avatar.png" alt="Ada" />
```

对于内置 `<img>`，React DOM 会把对应 props 映射到 Web DOM 行为。

对于自定义组件：

```jsx
<Avatar person={person} size={96} />
```

这些值会进入组件 props。Props 会在 Chapter 03 系统学习，本节只学习 JSX 属性写法。

### 2. 引号表示静态字符串

```jsx
<img alt="User avatar" />
```

这里传入固定字符串。

而：

```jsx
<img src="avatarUrl" />
```

传入的也是字面字符串 `"avatarUrl"`，并不会读取 JavaScript 变量。

### 3. 花括号表示计算 JavaScript expression

如果有：

```js
const avatarUrl = '/avatar.png';
```

要读取变量：

```jsx
<img src={avatarUrl} />
```

因此：

```text
src="avatarUrl"
→ 字符串 avatarUrl

src={avatarUrl}
→ JavaScript 变量当前值
```

### 4. 常见 DOM prop 命名

JSX 更接近 JavaScript 对象属性命名，因此常见：`className`、`htmlFor`、`onClick`、`tabIndex`。

例如：

```jsx
<label htmlFor="email">Email</label>
<input id="email" className="field" />
```

### 5. Boolean prop

动态场景：

```jsx
<button disabled={!canSubmit}>Save</button>
```

`disabled` 接收的是 Boolean expression。

对于布尔 prop，单独写 prop 名通常表示 `true`，例如 `<Button disabled />`。

### 6. `style` 接收 JavaScript 对象

```jsx
<div
  style={{
    borderRadius: 12,
    padding: 16
  }}
/>
```

双花括号只是“外层 JSX expression + 内层 JavaScript object”。React DOM 的 style prop 使用 JavaScript 风格属性名，例如 `backgroundColor`。

### 7. Spread Props

有对象：

```js
const imageProps = {
  width: 96,
  height: 96
};
```

可以写：

```jsx
<img {...imageProps} />
```

等价于把对象中的属性展开为 JSX props。

对自定义组件也可以 `<Avatar {...props} />`，但应该克制使用 spread，避免组件 API 变得不透明。

### 8. 属性表达式可以是任意 JavaScript 值

自定义组件 props 可以传 string、number、boolean、object、array、function、React Element 等 JavaScript 值。

组件如何解释这些值，是组件 API 自己的责任。

### 9. JSX 属性不是模板字符串替换语法

不要把：

```jsx
src="{avatarUrl}"
```

理解成动态值。它传入的是字符串 `{avatarUrl}`。

动态值必须写成：

```jsx
src={avatarUrl}
```

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

最终页面覆盖：静态字符串、动态表达式、`className`、`htmlFor`、Boolean prop、style object 和 spread props。

### 第 1 步：准备动态数据

创建 `src/main.jsx`，先准备名字和一个本地内嵌 SVG：

```jsx
const name = 'Ada';
const avatarSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <rect width="96" height="96" rx="18" fill="#e5e7eb" />
    <text x="48" y="58" text-anchor="middle" font-size="38">A</text>
  </svg>
`;
const avatarUrl = `data:image/svg+xml,${encodeURIComponent(avatarSvg)}`;
```

这里生成的 `avatarUrl` 是普通 JavaScript 字符串，且案例不依赖外部图片服务。`encodeURIComponent` 会负责把 SVG 中的 `#` 等 URL 特殊字符正确编码。

### 第 2 步：先写静态字符串属性

```jsx
<img className="avatar" alt="User avatar" />
```

`className` 和 `alt` 都是静态字符串。

### 第 3 步：把 src 改成动态变量

```jsx
<img src={avatarUrl} />
```

这里 `{avatarUrl}` 才会读取 JavaScript 变量。

### 第 4 步：使用动态字符串表达式

```jsx
alt={`${name} avatar`}
```

模板字符串先计算，再作为 prop 传入。

### 第 5 步：展开尺寸 props

```jsx
const imageProps = {
  width: 96,
  height: 96
};
```

然后：

```jsx
<img
  src={avatarUrl}
  alt={`${name} avatar`}
  {...imageProps}
/>
```

此时会传入 `width=96` 与 `height=96`。

### 第 6 步：加入 `htmlFor` 与 Boolean prop

```jsx
<label htmlFor="newsletter">Subscribe</label>
<input id="newsletter" type="checkbox" />

<button type="button" disabled={!canSubmit}>
  Save
</button>
```

### 第 7 步：加入 style 对象

```jsx
<section
  style={{
    padding: 16,
    border: '1px solid #ccc',
    borderRadius: 12
  }}
>
```

观察双花括号其实是 JSX expression + object literal。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **核心代码**：不同 JSX prop 写法。
- **实验辅助代码**：内嵌 SVG、尺寸数据和页面布局。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./02-jsx-react-element-component-model/kp019-jsx-props-expressions --config ./vite.config.js
```

构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp019-jsx-props-expressions --config ./vite.config.js
```

## 效果验证

请确认：

1. `src="avatarUrl"` 和 `src={avatarUrl}` 的含义不同。
2. 动态 `alt` 可以使用模板字符串表达式。
3. `className` 和 `htmlFor` 是常见 JSX DOM prop 名称。
4. `disabled={!canSubmit}` 传入 Boolean 值。
5. `style={{ ... }}` 的内层是普通 JavaScript 对象。
6. `{...imageProps}` 能展开 width/height。
7. 能解释为什么 spread props 应该克制使用。
8. 知道 JSX 属性传值最终是 props 机制的一部分。

完成后下一知识点是 **RE-KP020：JSX children 的基本模型**。
