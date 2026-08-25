# RE-KP003 课后练习

请先完成当前目录的 `main.jsx`，不要先看参考答案。

## 任务

请给下面能力补上主要责任层：

- 组件组合
- 本地状态
- URL 路由
- SSR / SSG 集成
- 开发服务器与构建
- 部署约定

可使用的分类：

```text
React Core
Framework / Ecosystem
Toolchain
Framework / Platform
```

要求：

1. 不允许把所有能力都归到 React。
2. 每一项写一句 `reason` 说明为什么。
3. 页面能够正常渲染分类结果。

## 运行

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./01-react-foundations/kp003-library-vs-framework/exercise --config ./vite.config.js
```

## 思考题

1. `React + Vite` 为什么不自动等于一个完整 React Framework？
2. React Router 为什么不是 `react` 包内置路由 API？
3. Framework 为什么不等于“必须 SSR”？
4. 如果团队从零搭建路由、SSR、数据加载、构建约定，这是不是在逐步承担 Framework 的职责？

## 验收

你应该能够面对一个能力先问：

> 这是 React Core 原生负责，还是应用框架、生态库、构建工具或部署平台负责？

完成后查看 [`../solution/main.jsx`](../solution/main.jsx)。
