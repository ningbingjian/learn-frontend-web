# RE-KP006 课后练习

请先修改 [`main.jsx`](./main.jsx)，不要先看参考答案。

## 任务

请为下面 5 个项目场景选择第一步方向：

```text
Framework first
Build Tool first
Keep + audit + plan migration
```

场景：

1. 新建一个需要 SSR、路由、数据加载和服务端能力的正式业务应用。
2. 为了学习 React Core，从零做一个最小组件实验项目。
3. 公司已有一个运行 5 年的 CRA 后台系统，目前仍能正常发布。
4. 一个很小的嵌入式 React 页面，只需要客户端交互，不需要完整 Framework。
5. 团队准备把旧 CRA 项目迁移，但还没有盘点环境变量、代理和测试配置。

请在 `scenarios` 中补全：

```jsx
recommendation
reason
```

## 运行

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./01-react-foundations/kp006-cra-deprecation/exercise --config ./vite.config.js
```

## 思考题

1. “CRA deprecated”为什么不能直接翻译成“CRA 已经不能用了”？
2. Framework 与 Build Tool 的选择依据是什么？
3. 为什么旧项目迁移前必须先盘点 `react-scripts`、环境变量、代理、测试和部署方式？
4. 如果只是学习 React 本体，为什么不需要一上来就用完整 Framework？

## 验收

你应该能够独立解释下面三条：

```text
新完整应用 → Framework first
React Core 学习 → Build Tool first
已有 CRA → 保持运行 + 审计 + 迁移计划
```

完成后查看 [`../solution/main.jsx`](../solution/main.jsx)。
