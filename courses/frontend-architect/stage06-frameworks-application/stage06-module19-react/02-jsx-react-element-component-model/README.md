# Chapter 02：JSX、React Element 与组件模型

> [返回 React 模块索引](../README.md)

本 Chapter 从 React 最常见的“代码外观”进入底层心智模型：先分清 JSX 是语法扩展而不是 HTML，再理解现代 JSX 自动转换与 React Element，随后把 Element、Component、DOM Node、函数组件、Fragment、表达式、属性和 children 逐层拆开。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP011 | JSX 的定位与语法边界 | 1. JSX 是 JavaScript 语法扩展 2. JSX 与 HTML/React 的边界 3. 基础语法规则 | [文档](./kp011-jsx-positioning/README.md) · [源码](./kp011-jsx-positioning/src/main.jsx) | 已完成 |
| RE-KP012 | JSX 转换与 `jsx/jsxs` 运行时直觉 | 1. 浏览器不直接执行 JSX 2. Automatic Runtime 3. `jsx/jsxs/jsxDEV` | [文档](./kp012-jsx-transform-runtime/README.md) · [源码](./kp012-jsx-transform-runtime/src/main.jsx) | 已完成 |
| RE-KP013 | React Element 的不可变描述对象 | 1. Element 是描述 2. 与 DOM 分离 3. 不可变与开发期冻结 | [文档](./kp013-react-element-immutable/README.md) · [源码](./kp013-react-element-immutable/src/main.jsx) | 已完成 |
| RE-KP014 | React Element、Component 与 DOM Node 的区别 | 1. Component 2. Element 3. DOM Node 4. 三层链路 | [文档](./kp014-element-component-dom-node/README.md) · [源码](./kp014-element-component-dom-node/src/main.jsx) | 已完成 |
| RE-KP015 | 函数组件的最小模型 | 1. JavaScript Function 2. Props 3. React 调用组件 4. 返回 UI 描述 | [文档](./kp015-function-component-model/README.md) · [源码](./kp015-function-component-model/src/main.jsx) | 已完成 |
| RE-KP016 | 组件名称与大写规则 | 1. 大写组件 2. 小写宿主标签 3. JSX type 解析 | [文档](./kp016-component-capitalization/README.md) · [源码](./kp016-component-capitalization/src/main.jsx) | 已完成 |
| RE-KP017 | 返回单根节点与 Fragment | 1. 单一返回值 2. Fragment 3. 无额外 DOM 4. 显式 Fragment key | [文档](./kp017-single-root-fragment/README.md) · [源码](./kp017-single-root-fragment/src/main.jsx) | 已完成 |
| RE-KP018 | JSX 表达式插值 | 1. `{}` 2. Expression 3. Statement 边界 4. 空节点与对象 | [文档](./kp018-jsx-expression-interpolation/README.md) · [源码](./kp018-jsx-expression-interpolation/src/main.jsx) | 已完成 |
| RE-KP019 | JSX 属性与 JavaScript 表达式 | 1. 字符串属性 2. `{}` 属性值 3. Boolean/style 4. spread 边界 | [文档](./kp019-jsx-props-expressions/README.md) · [源码](./kp019-jsx-props-expressions/src/main.jsx) | 已完成 |
| RE-KP020 | JSX children 的基本模型 | 1. 文本 2. Element 3. 数组与空节点 4. `0` 与布尔值差异 | [文档](./kp020-jsx-children-model/README.md) · [源码](./kp020-jsx-children-model/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 02：**10 / 10，已完成**
- 下一 Chapter：**Chapter 03：Props、组合与组件 API**
- 下一知识点：**RE-KP021：Props 作为只读输入**
