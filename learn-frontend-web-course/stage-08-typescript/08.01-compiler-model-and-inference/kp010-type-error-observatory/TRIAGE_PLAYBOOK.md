# Type Error Triage Playbook

## 1. 先分类

将问题归入 Syntax、Type、Module、Configuration 或 Runtime。编辑器红线只是入口，不是结论。

## 2. 找第一条根错误

优先检查 Parser、配置和模块解析错误，再看最早出现的类型错误。不要从最后一条级联诊断开始修。

## 3. 获取第一证据

- Syntax：第一条 Parser Diagnostic
- Type：最小赋值、Hover、Declaration Emit
- Module：`tsc --traceResolution`
- Configuration：`tsc --showConfig`、`tsc --explainFiles`
- Runtime：可重复 Fixture、Stack、输入样本

## 4. 建立最小复现

删除与主问题无关的框架、网络和业务代码，一次只保留一个变量。

## 5. 修模型而非压红线

优先修正数据边界、声明、模块入口或配置。新增 `any`、双重断言和关闭 strict 必须经过评审。

## 6. 完整回归

执行正向 Check、Expected Error、Build、Runtime 和课程专属 Verify。
