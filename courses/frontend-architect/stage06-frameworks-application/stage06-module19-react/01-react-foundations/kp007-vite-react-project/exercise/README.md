# RE-KP007 课后练习

请从 [`index.html`](./index.html) 和 [`main.jsx`](./main.jsx) 的 TODO 开始完成，不要先看参考答案。

## 任务

你要完成一个最小“学习进度卡片” React 页面，要求：

1. `index.html` 中存在 `#root`。
2. 使用 `<script type="module" src="/main.jsx"></script>` 作为入口。
3. `main.jsx` 从 `react-dom/client` 引入 `createRoot`。
4. 创建 `App` 组件。
5. 页面显示标题：`My First Vite React Exercise`。
6. 页面显示三项工程角色：
   - `index.html → HTML entry`
   - `main.jsx → React entry`
   - `vite.config.js → Build tool integration`
7. 引入 `styles.css`。
8. 能通过共享 Vite 配置正常启动。

## 运行

先检查 Node：

```bash
node -v
```

然后：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./01-react-foundations/kp007-vite-react-project/exercise --config ./vite.config.js
```

## 构建验证

练习完成后尝试：

```bash
npm run build -- ./01-react-foundations/kp007-vite-react-project/exercise --config ./vite.config.js
```

确认能生成 `exercise/dist/`。

## 思考题

1. 如果没有 `index.html`，Vite 当前实验 root 还剩下什么入口？
2. `@vitejs/plugin-react` 属于 React Core 还是 Build Tool 集成层？
3. `npm run dev` 与 `npm run build` 的目标有什么不同？
4. 为什么 `npm run preview` 不能简单理解成另一个开发服务器？
5. 为什么课程共享一份 `package.json`，而不让每个 RE-KP 都安装一次 React？

## 验收

你应该能脱离 `create-vite`，自己写出：

```text
index.html
main.jsx
styles.css
```

并知道它们如何借助模块级 `package.json` 和 `vite.config.js` 运行。

完成后查看 [`../solution/main.jsx`](../solution/main.jsx)。
