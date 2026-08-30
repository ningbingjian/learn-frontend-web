# TS-KP063：公共库 API 中的选择策略

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 在公共库 API 中根据“是否开放增强”决定是否优先使用 `interface`。
2. 在 Union、Tuple、函数别名等类型表达式上自然使用 `type`。
3. 理解公共 API 的选型不是单纯代码风格，而会影响第三方扩展方式。
4. 知道 interface declaration merging 既是能力，也可能成为意外全局合并风险。
5. 理解 API 名称应避免和宿主环境全局类型冲突。
6. 形成“根据契约目的选工具，而不是全项目一刀切”的工程策略。

> **本节核心代码**：用 `interface` 描述可扩展插件对象契约，用 `type` 描述状态 Union 和插件工厂函数。
>
> **实验辅助代码**：`createPlugin()` 和日志输出只是为了把公共 API 设计落成可运行案例。

## 理论讲解

### 1. 公共 API 与内部局部类型的责任不同

内部代码的类型通常只服务当前项目。

公共库 API 则可能被：

- 其它项目 import。
- 第三方插件扩展。
- 生态包做 module augmentation。
- 长期跨版本维护。

因此选 `type` 还是 `interface`，不仅是格式偏好。

### 2. 需要开放对象契约时，interface 很自然

例如插件协议：

```ts
interface LibraryPlugin {
  name: string;
  setup(context: PluginContext): void;
}
```

这是一个典型对象契约：

```text
插件必须有什么成员？
插件应该提供什么方法？
```

如果未来设计上允许第三方扩展接口，interface 的开放性很有价值。

### 3. Union / Tuple / 函数别名更适合 type

例如状态：

```ts
type PluginState = 'idle' | 'ready';
```

函数工厂：

```ts
type PluginFactory =
  (name: string) => LibraryPlugin;
```

这些不是“普通对象形状需要开放扩展”的场景，用 `type` 更直接。

### 4. 不要为了统一风格强迫所有 API 只用一种

一种常见但过度简化的团队规则是：

```text
所有东西只用 interface
```

或者：

```text
所有东西只用 type
```

这会让一部分类型表达变得别扭。

更实用的规则是：

```text
开放对象契约
→ interface 优先考虑

Union / Tuple / 函数别名 / 类型运算
→ type 优先考虑
```

这只是默认倾向，不是语言强制规则。

### 5. declaration merging 是能力，也是风险

如果公共接口就是设计成可增强：

```text
第三方增加字段
第三方补充事件映射
第三方扩展上下文
```

声明合并可能正是你想要的。

但如果一个名字无意中和其它全局接口相同，也可能产生意外合并。

因此公共 API 命名必须谨慎。

### 6. 宿主环境的全局名称可能已经存在

本节设计案例时，如果直接声明：

```ts
interface Plugin {
  name: string;
}
```

在包含 DOM 类型库的工程里，可能和浏览器已有的全局 `Plugin` 接口发生 declaration merging。

这会导致意外出现：

- `description`
- `filename`
- `length`
- 等浏览器 Plugin 成员要求

所以最终源码使用：

```ts
interface LibraryPlugin
```

这不是 TypeScript 语法限制，而是公共 API 命名设计问题。

### 7. 公共库要考虑“使用者如何扩展”

设计 API 时可以问：

```text
这个类型是封闭结果，还是开放契约？
调用者是否应该增强它？
是否需要 module augmentation？
它是对象 shape，还是 Union / Tuple / 函数表达式？
```

答案比“团队喜欢哪个关键字”更重要。

### 8. API 稳定性比关键字本身更重要

无论使用 `type` 还是 `interface`，公共库都要关注：

- 是否改变必需字段。
- 是否改变函数参数。
- 是否改变返回值。
- 是否改变可扩展入口。
- 是否破坏旧版本消费者。

类型关键字不能替代 API 兼容性设计。

### 9. 不要把内部实现类型全部暴露出去

公共库通常应该暴露稳定契约，而不是把内部实现细节全部 export。

例如：

```text
公开：Plugin / PluginContext / PluginState

隐藏：内部缓存结构、临时计算对象、私有中间类型
```

这会减少未来重构成本。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp063-public-api-choice-strategy/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明插件上下文接口

```ts
interface PluginContext {
  appName: string;
}
```

这是一个典型对象契约。

### 第 2 步：声明插件接口

不要使用容易和 DOM 全局类型冲突的 `Plugin`，而是：

```ts
interface LibraryPlugin {
  name: string;
  setup(context: PluginContext): void;
}
```

### 第 3 步：使用 type 表达状态集合

```ts
type PluginState = 'idle' | 'ready';
```

这是 Union，`type` 最自然。

### 第 4 步：使用 type 表达函数类型

```ts
type PluginFactory =
  (name: string) => LibraryPlugin;
```

### 第 5 步：实现插件工厂

```ts
const createPlugin: PluginFactory = (name) => ({
  name,
  setup(context) {
    console.log(`${name}@${context.appName}`);
  }
});
```

### 第 6 步：创建插件并设置状态

```ts
const libraryPlugin = createPlugin('analytics');
const pluginState: PluginState = 'ready';
```

### 第 7 步：运行

```ts
libraryPlugin.setup({ appName: 'frontend-lab' });
console.log(pluginState);
```

预期：

```text
analytics@frontend-lab
ready
```

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：interface 用于插件对象契约，type 用于 Union 和函数别名。
- **实验辅助代码**：插件工厂和日志输出用来模拟公共库真实使用方式。

## 运行案例

```bash
npm run check -- ./04-type-interface-structural-typing/kp063-public-api-choice-strategy/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp063-public-api-choice-strategy/tsconfig.json
node ./04-type-interface-structural-typing/kp063-public-api-choice-strategy/dist/main.js
```

预期：

```text
analytics@frontend-lab
ready
```

## 效果验证

你应该能够确认：

- 公共对象协议可以优先考虑 interface。
- Union / Tuple / 函数别名等表达式通常更适合 type。
- 不需要强制整个库只使用其中一种关键字。
- declaration merging 是开放扩展能力，也可能造成意外合并。
- 公共 API 名称要考虑 DOM / Node / 第三方声明中的全局名称冲突。
- API 稳定性、扩展性和兼容性比关键字偏好更重要。
