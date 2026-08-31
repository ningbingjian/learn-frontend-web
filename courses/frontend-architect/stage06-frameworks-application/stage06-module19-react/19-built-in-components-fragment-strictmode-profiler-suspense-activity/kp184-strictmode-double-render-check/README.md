# RE-KP184：StrictMode 的双 Render 检查

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 StrictMode 为什么会在开发环境额外调用应保持纯净的函数。
2. 用可复现 Bug 识别 Render 中的 mutation。
3. 理解双 Render 是检查手段，不是 production 固定执行次数。
4. 用复制数据而非修改外部对象修复不纯 Render。

## 理论讲解

### 1. Double Render

React 假设 Function Component 对同样的 props/state/context 是幂等的。开发期 StrictMode 会额外调用组件函数以及部分应该纯净的回调，以放大不纯代码。

### 2. Impurity

错误示例：

```jsx
const items = stories;
items.push({ id: 'create', label: 'Create Story' });
```

这里 `items` 和外部 `stories` 指向同一个数组。每次 Render 都会永久修改外部数据，因此再次调用马上暴露重复项。

正确方向：

```jsx
const items = stories.slice();
items.push(...);
```

当前 Render 新创建的局部数组允许 local mutation，因为它不会污染之前存在的对象。

### 3. Development

开发环境看到两次调用，不代表生产中组件永远只调用一次。正确要求不是“记住调用次数”，而是组件应允许 React 重试、暂停或再次执行 Render 而不产生副作用。

## 动手编码：从 0 到 1

### 第 1 步：准备两份相同故事数据

一份给 ImpureStoryTray，一份给 PureStoryTray。

### 第 2 步：故意写入不纯 Render

ImpureStoryTray 直接对模块级数组 `push`。

**观察**：StrictMode 首次渲染就会让 `Create Story` 重复出现。

### 第 3 步：写纯版本

PureStoryTray 先 `slice()` 再 push。

**观察**：即使组件被重复调用，也只渲染一个 `Create Story`。

### 第 4 步：增加刷新按钮

State 更新让两棵树再次 Render，不纯版本会继续累计污染，纯版本保持稳定。

### 第 5 步：最终源码

[打开本节最终源码](./src/main.jsx)

- **本节核心代码**：外部对象 mutation 与 local mutation 的对照。
- **实验辅助代码**：刷新按钮、两列列表、Console log。

## 运行案例

```bash
npm run dev
```

打开本课页面并观察两列列表。

## 效果验证

- Impure 列表会快速暴露重复项。
- Pure 列表保持稳定。
- 关闭 StrictMode 不能真正修复 mutation，只会让 Bug 更不容易被发现。
