# RE-KP002 课后练习

请先完成当前目录的 `main.jsx`，不要先看 `../solution/main.jsx`。

## 任务

你需要把下面三层职责真正连起来：

```text
react
  ↓
React Element
  ↓
react-dom/client
  ↓
浏览器 DOM
```

请完成：

1. 从 `react-dom/client` 导入 `createRoot`。
2. 使用 `createElement` 创建一个 `<h1>`，内容为 `Renderer boundary`。
3. 获取 `#root` DOM 容器。
4. 创建 React DOM Root。
5. 调用 `root.render(element)`。
6. 运行后确认标题出现在页面中。

## 运行

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

```bash
npm run dev -- ./01-react-foundations/kp002-react-reactdom-renderer/exercise --config ./vite.config.js
```

## 思考题

1. `createElement` 为什么不从 `react-dom/client` 导入？
2. `createRoot` 为什么需要一个真实 DOM 容器？
3. React Element 与 DOM Element 是同一种对象吗？
4. 如果宿主平台不是浏览器，为什么 Renderer 这一层仍然有意义？

## 验收

你应该能不看答案写出这条最小链路：

```js
const element = createElement('h1', null, 'Renderer boundary');
const container = document.getElementById('root');
const root = createRoot(container);
root.render(element);
```

完成后查看 [`../solution/main.jsx`](../solution/main.jsx)。
