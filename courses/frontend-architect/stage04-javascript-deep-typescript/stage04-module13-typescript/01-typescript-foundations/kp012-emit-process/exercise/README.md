# TS-KP012 练习：比较不同 target 的 Emit

## 第一步

当前练习配置使用：

```json
"target": "ES2018"
```

执行：

```bash
npx tsc -p ./01-typescript-foundations/kp012-emit-process/exercise/tsconfig.json
```

保存一份 `dist/main.js` 的观察结果。

## 第二步

把 target 临时改成：

```json
"target": "ES2022"
```

删除 `dist/` 后重新构建。

比较：

```ts
settings.theme?.name ?? 'default'
```

在两种 target 下的 Emit 差异。

## 第三步

恢复 ES2018，并故意加入一个类型错误，确认继承的 `noEmitOnError: true` 会阻止新输出。

答案见 [`../solution/README.md`](../solution/README.md)。
