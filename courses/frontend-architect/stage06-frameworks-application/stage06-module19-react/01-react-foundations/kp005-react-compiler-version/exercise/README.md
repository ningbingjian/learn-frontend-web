# RE-KP005 课后练习

请先完成 [`main.jsx`](./main.jsx)，不要先看参考答案。

## 任务

页面里已经准备了 6 条关于 React Compiler 的陈述，请你把每条陈述分类为：

```text
正确
错误
需要补充条件
```

需要判断的内容包括：

1. React Compiler 1.0 仍然只是 Beta。
2. React Compiler 工作在构建阶段。
3. React Compiler 会在浏览器里替代 React Runtime。
4. React Compiler 的核心方向之一是自动 memoization。
5. React Compiler 稳定以后，所有项目都应该立刻开启。
6. React 17 / 18 完全不能使用 React Compiler。

请在 `statements` 数组中补全 `result` 和 `reason`。

示例结构：

```jsx
{
  text: 'React Compiler 工作在构建阶段。',
  result: '正确',
  reason: 'Compiler 分析和转换源码，生成后续交给 React Runtime 执行的 JavaScript。',
}
```

## 运行

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

执行：

```bash
npm run dev -- ./01-react-foundations/kp005-react-compiler-version/exercise --config ./vite.config.js
```

## 思考题

1. “Stable” 与“默认必须开启”是不是同一个含义？
2. 为什么 Compiler 越强，Rules of React 反而越重要？
3. `useMemo` / `useCallback` 是否从 React 中消失了？
4. 为什么课程要把“版本认知”和“真正集成 Compiler”拆成两阶段学习？

## 验收

完成后，你应该能不看文档画出：

```text
React Source
    ↓
React Compiler
    ↓
Optimized JavaScript
    ↓
React Runtime
```

然后再查看 [`../solution/main.jsx`](../solution/main.jsx)。
