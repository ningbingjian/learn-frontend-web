# TS-KP012 参考答案

关键观察：

1. ES2018 目标下，`?.` / `??` 需要转换成更老目标能够理解的 JavaScript 条件逻辑。
2. ES2022 目标下，更多现代语法可以直接保留。
3. `type Settings` 不会作为普通 JavaScript 类型对象保留在 Emit 产物中。
4. `sourceMap: true` 会额外生成 `.js.map`。
5. 本课程共享配置显式开启 `noEmitOnError: true`，所以制造类型错误并清理旧 `dist/` 后，本次错误构建不会产生新的正常输出。

重点不是背 TypeScript 生成的具体临时代码变量名，而是能够解释“为什么不同 target 会得到不同 JavaScript”。
