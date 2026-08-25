# RE-KP001 课后练习

请先修改 [`main.jsx`](./main.jsx)，不要先看参考答案。

## 任务：让订单卡片由状态决定 UI

当前练习提供一个订单对象：

```js
const order = {
  id: 'ORD-2026-0825',
  status: 'processing',
};
```

请完成下面任务：

1. 根据 `order.status` 计算 `ready`：当状态为 `ready` 时为 `true`。
2. 卡片 class 在两种状态之间切换：`is-processing` / `is-ready`。
3. 状态文字显示 `Processing` / `Ready`。
4. 标题显示 `Preparing order` / `Ready to ship`。
5. 说明文字随状态变化。
6. 只有 `ready === true` 时“Ship now”按钮才可用。
7. 完成后把 `order.status` 从 `processing` 改为 `ready`，刷新页面，确认所有相关 UI 一起变化。

本练习故意不引入交互式 State。重点不是学习 Hook，而是验证：

```text
同一份业务状态
      ↓
推导出多个 UI 结果
```

## 运行练习

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次学习本模块时先执行：

```bash
npm install
```

启动练习：

```bash
npm run dev -- ./01-react-foundations/kp001-react-declarative-ui/exercise --config ./vite.config.js
```

## 思考题

1. 如果状态从 `processing` 变成 `ready`，命令式 DOM 写法需要手动同步哪些位置？
2. 当前 React 写法中，哪个值是业务事实，哪些内容只是从业务事实推导出的 UI？
3. 为什么不建议再额外保存一个 `title = 'Ready to ship'` 作为独立业务状态？
4. “声明式”是否意味着浏览器底层不再执行 DOM 更新？

## 验收

把 `order.status` 分别设成：

```js
'processing'
```

和：

```js
'ready'
```

两种情况下都只修改这一个业务值，页面的状态文字、样式、标题、说明和按钮可用性应该保持一致。

完成后再查看 [`../solution/main.jsx`](../solution/main.jsx)。
