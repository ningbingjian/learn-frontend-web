# TS-KP049：Excess Property Checking

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 TypeScript 为什么会对直接出现的对象字面量执行额外属性检查。
2. 识别“目标类型中不存在的属性”产生的 Excess Property Checking 错误。
3. 理解这一检查尤其适合发现拼写错误和错误配置项。
4. 区分普通结构化兼容与对象字面量的额外检查。
5. 知道将对象先保存到变量后再传入时，检查行为可能不同。
6. 不把 Excess Property Checking 误解成“TypeScript 对象类型永远是精确封闭对象”。
7. 为下一节“对象字面量的新鲜度直觉”建立事实基础。

> **本节核心代码**：`PanelOptions` + `createPanel()`，对比直接对象字面量与已经存在的对象变量。
>
> **实验辅助代码**：`opacity` 只是用来制造额外属性对照，不参与 `createPanel()` 的业务逻辑。

## 理论讲解

### 1. 先看最典型的问题

假设配置类型是：

```ts
type PanelOptions = {
  color?: string;
  width?: number;
};
```

函数：

```ts
function createPanel(options: PanelOptions) {
  // ...
}
```

如果直接传：

```ts
createPanel({
  colour: 'red',
  width: 240
});
```

`colour` 并不存在于目标类型中。

TypeScript 会认为这很可能是：

```text
color
```

的拼写错误，所以会报告额外属性问题。

### 2. 为什么对象字面量需要特殊对待

JavaScript 配置对象非常容易出现：

```text
timeout → tiemout
color   → colour
width   → widht
```

如果类型系统只检查“至少存在一些兼容属性”，直接对象字面量里的错误 key 很容易静默通过。

所以 TypeScript 对直接出现在目标类型上下文中的对象字面量执行更严格的额外属性检查。

### 3. 正确的直接对象字面量

下面合法：

```ts
createPanel({
  color: 'red',
  width: 240
});
```

因为两个属性都来自 `PanelOptions`。

### 4. 多出来一个未知属性

下面通常会失败：

```ts
createPanel({
  color: 'red',
  width: 240,
  opacity: 0.8
});
```

原因不是 `opacity` 的值类型错误，而是：

```text
PanelOptions
没有声明 opacity
```

这里检查的是**额外属性名称**。

### 5. 这不代表对象类型是“精确类型”

现在看：

```ts
const reusableOptions = {
  color: 'blue',
  width: 320,
  opacity: 0.8
};

createPanel(reusableOptions);
```

这可以通过。

因为 `reusableOptions` 的结构至少包含：

```text
color: string
width: number
```

而多出来的 `opacity` 并不会让这个已存在变量失去结构兼容性。

所以不能简单总结为：

```text
目标类型没写的属性
→ 永远都不能存在
```

### 6. TypeScript 仍然是结构化类型系统

普通结构化兼容关注：

> 实际值是否具备目标类型需要的成员？

Excess Property Checking 则是在某些对象字面量位置上再追加一层检查：

> 这个刚写出来的对象是不是出现了很可疑的未知属性？

两者不是互相矛盾，而是叠加工作。

### 7. 为什么本节最终源码保留 reusableOptions

最终源码同时运行：

```ts
createPanel({ color: 'red', width: 240 });
```

和：

```ts
createPanel(reusableOptions);
```

目的是建立事实：

```text
直接对象字面量
和
已经存在的变量
```

在额外属性检查上可能表现不同。

“为什么会不同”的编译器直觉放到下一节 TS-KP050 专门解释。

### 8. 不要用类型断言习惯性绕过检查

看到错误后可以写类型断言来压掉某些诊断，但这通常不是第一选择。

如果 `opacity` 真的是合法业务配置，应该考虑：

- 把它加入配置类型。
- 使用正确的扩展结构。
- 如果确实允许任意额外键，再设计合适的索引签名。

如果只是拼写错了，就应该直接修正拼写。

### 9. 变量并不是“万能绕过器”

虽然很多情况下先放变量会避开这类直接字面量检查，但不要记成：

```text
对象先放变量
→ TypeScript 就什么都不检查
```

变量本身仍然要满足结构兼容规则。

某些“全是可选属性”的弱类型场景，TypeScript 也可能对完全没有共同成员的值继续报告问题。

所以正确理解应该是：

> Excess Property Checking 是额外的一层字面量检查，不是 TypeScript 唯一的对象检查机制。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp049-excess-property-checking/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明配置结构

```ts
type PanelOptions = {
  color?: string;
  width?: number;
};
```

### 第 2 步：创建消费配置的函数

```ts
function createPanel(options: PanelOptions): string {
  const color = options.color ?? 'gray';
  const width = options.width ?? 200;
  return `${color}:${width}`;
}
```

### 第 3 步：直接传合法对象字面量

```ts
console.log(
  createPanel({ color: 'red', width: 240 })
);
```

类型检查通过。

### 第 4 步：临时加入未知属性

尝试：

```ts
createPanel({
  color: 'red',
  width: 240,
  opacity: 0.8
});
```

应该收到额外属性错误。

验证后删除。

### 第 5 步：临时制造拼写错误

尝试：

```ts
createPanel({
  colour: 'red',
  width: 240
});
```

这正是 Excess Property Checking 非常有价值的场景。

### 第 6 步：创建带额外属性的已有变量

```ts
const reusableOptions = {
  color: 'blue',
  width: 320,
  opacity: 0.8
};
```

### 第 7 步：传入这个变量

```ts
console.log(createPanel(reusableOptions));
```

能够通过，因为该变量具备目标类型需要的结构。

### 第 8 步：运行并观察

预期：

```text
red:240
blue:320
```

`opacity` 在 JavaScript 对象上真实存在，但 `createPanel()` 的参数类型只承诺它使用 `PanelOptions` 的成员。

### 第 9 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：直接对象字面量的额外属性检查。
- **实验辅助代码**：`reusableOptions.opacity` 用于和结构化兼容形成对照。

## 运行案例

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp049-excess-property-checking/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp049-excess-property-checking/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp049-excess-property-checking/dist/main.js
```

预期：

```text
red:240
blue:320
```

## 效果验证

你应该能够确认：

- 直接对象字面量会受到额外属性检查。
- 这个机制能发现未知配置项和常见拼写错误。
- 已存在变量仍然按结构化兼容规则参与检查。
- Excess Property Checking 不等于“对象类型精确封闭”。
- 不应该为了消除错误而机械使用类型断言。
- 下一节可以继续解释为什么对象字面量和变量会出现这种差异。
