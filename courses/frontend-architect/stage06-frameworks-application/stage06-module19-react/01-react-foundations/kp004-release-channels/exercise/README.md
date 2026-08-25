# RE-KP004 课后练习

请先完成当前目录的 `main.jsx`，不要先看参考答案。

## 任务

实现：

```js
function detectChannel(version) {
  // TODO
}
```

让下面输入得到正确结果：

```text
19.2.8
→ Latest / Stable

19.3.0-canary-example-20260801
→ Canary

0.0.0-experimental-example-20260801
→ Experimental
```

要求：

1. 先判断 Experimental。
2. 再判断 Canary。
3. 其他普通版本先归为 Latest / Stable。
4. 页面必须同时显示当前 `React.version` 的分类结果。

> 本练习不是要求你手写完整 SemVer 解析器，只验证本节发布渠道字符串的基本识别。

## 运行

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./01-react-foundations/kp004-release-channels/exercise --config ./vite.config.js
```

## 思考题

1. 为什么普通业务应用应该优先 Stable？
2. Canary 为什么应该固定具体版本，而不是无脑追最新？
3. Experimental 为什么可能永远不会进入 Stable？
4. `19.2.8` 这个补丁号为什么不应该当作永久知识？
5. 看到社区文章介绍一个 React API 时，你准备如何确认它属于哪个渠道？

## 验收

你应该能解释：

```text
Stable = 业务默认
Canary = 受控提前采用
Experimental = 实验验证
```

并强调它们代表不同稳定性承诺，而不是“版本越新越高级”。

完成后查看 [`../solution/main.jsx`](../solution/main.jsx)。
