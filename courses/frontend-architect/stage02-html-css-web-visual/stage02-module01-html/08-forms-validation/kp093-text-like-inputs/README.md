# KP093：text、search、email、url、tel

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 根据字段语义在 `text`、`search`、`email`、`url`、`tel` 中选择合适的 input 类型。
2. 理解类型选择会影响移动端键盘、浏览器 UI、自动填充和内置校验。
3. 说明 `email`、`url` 有内置格式校验，而 `tel` 默认没有统一电话号码格式校验。
4. 正确使用 `autocomplete` 提示浏览器字段用途，同时知道它不是业务校验规则。

## 理论讲解

### 1. `type="text"`：通用单行文本

当字段没有更具体的原生类型时使用 `text`：

```html
<input type="text" name="fullName" autocomplete="name">
```

不要因为“最终都是字符串”就把 email、url、tel 全部降级成 text。更具体的类型能给浏览器和辅助技术更多信息。

### 2. `type="search"`：搜索查询

```html
<input type="search" name="keyword">
```

它在不同浏览器中可能提供搜索相关 UI，例如清除按钮；具体视觉表现属于用户代理实现。

语义上它表达“这是搜索查询”，而不是普通姓名、标题等文本。

### 3. `type="email"`：电子邮箱

```html
<input type="email" name="email" autocomplete="email">
```

浏览器可以：

- 在移动设备提示更适合邮箱输入的键盘。
- 提供邮箱自动填充。
- 通过 `ValidityState.typeMismatch` 检查明显不符合邮箱语法的值。

内置校验只是客户端基础校验，服务端仍要最终验证。

### 4. `type="url"`：URL

```html
<input type="url" name="website" autocomplete="url">
```

`example.com` 通常不满足 URL 类型的完整格式要求，而 `https://example.com` 更符合预期。

浏览器的类型校验不等于“这个网站真实存在”，它只检查输入是否满足 URL 语法约束。

### 5. `type="tel"`：电话号码语义，但没有全球统一格式

```html
<input type="tel" name="phone" autocomplete="tel">
```

电话号码在国家区号、分隔符、长度等方面差异很大，因此浏览器不会像 email/url 一样提供统一的 `typeMismatch` 电话格式校验。

如果产品要求特定格式，可以结合：

- 帮助文本。
- `pattern`（后续 KP108）。
- 服务端标准化和校验。

### 6. 类型、移动键盘和 `inputmode`

合适的 `type` 本身就可能影响移动键盘。`inputmode` 可以进一步提示期望的输入键盘，但它不会改变字段的数据语义或验证规则。

优先原则：

1. 先选择语义正确的 `type`。
2. 再在必要时补充 `inputmode`。

### 7. `autocomplete` 描述“这个字段是什么”

常见值：

```html
<input autocomplete="name">
<input autocomplete="email">
<input autocomplete="url">
<input autocomplete="tel">
```

自动填充结果受浏览器、用户设置、历史数据和安全策略影响，因此不要把“某浏览器没弹出自动填充”误判成 HTML 写错。

## 动手编码：从 0 到 1

### 第 1 步：放入五种输入类型

```html
<input type="text" name="fullName">
<input type="search" name="keyword">
<input type="email" name="email">
<input type="url" name="website">
<input type="tel" name="phone">
```

**为什么这样写**：把五种语义放在同一页面，便于直接比较 DOM 属性和 validity。

### 第 2 步：补充 autocomplete

```html
<input type="text" name="fullName" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="url" name="website" autocomplete="url">
<input type="tel" name="phone" autocomplete="tel">
```

搜索词不是用户身份资料，本案例给它使用 `autocomplete="off"` 只是为了减少演示时历史建议干扰，不代表所有搜索框都必须关闭自动填充。

### 第 3 步：准备可验证的测试值

```html
<input type="email" value="alice.example.com">
<input type="url" value="example.com">
<input type="tel" value="138-0013-8000">
```

**为什么这样写**：故意给 email、url 放入不完整格式，用来观察 `typeMismatch`；电话号码则展示 tel 默认不会执行全球统一格式检查。

### 第 4 步：读取 ValidityState

```js
const inputs = [...form.querySelectorAll('input')];

const rows = inputs.map(input => ({
  type: input.type,
  value: input.value,
  valid: input.validity.valid,
  typeMismatch: input.validity.typeMismatch,
  autocomplete: input.autocomplete
}));
```

**为什么这样写**：相比只看提交是否被浏览器拦截，`ValidityState` 更能直接展示类型规则。

**运行后观察**：修正 email 和 url 后再次检查，`typeMismatch` 会变为 false。

### 本节核心代码

- `type="text|search|email|url|tel"`
- `autocomplete`
- `ValidityState.typeMismatch`

### 实验辅助代码

- “检查类型与 validity”按钮。
- JSON 输出表格。
- 预填的错误测试值。

最终源码：[`index.html`](./index.html)

## 运行案例

打开 `index.html`：

1. 点击“检查类型与 validity”。
2. 观察 email、url 的 `typeMismatch`。
3. 把邮箱改成 `alice@example.com`。
4. 把网址改成 `https://example.com`。
5. 再次检查。

如果你有手机或 DevTools 设备模式，也可以比较不同 input type 对软键盘提示的影响；具体键盘布局由系统和浏览器决定。

## 效果验证

你应该能够验证：

- [ ] email 的错误测试值会出现 `typeMismatch=true`。
- [ ] url 的 `example.com` 会出现类型不匹配，而完整 URL 可通过。
- [ ] tel 默认不会因为本案例电话号码格式而触发 `typeMismatch`。
- [ ] 能说明 `autocomplete` 与业务校验不是同一件事。
- [ ] 能根据“搜索、邮箱、网址、电话、普通文本”选择对应原生类型。
