# KP094：password 输入框

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `type="password"` 主要负责视觉遮挡，不代表密码已经加密。
2. 正确区分 `autocomplete="current-password"` 与 `autocomplete="new-password"`。
3. 实现可访问的“显示/隐藏密码”切换，并保持输入值不丢失。
4. 知道密码长度校验、密码管理器、粘贴行为与服务端安全校验之间的职责边界。

## 理论讲解

### 1. password 的遮挡不是加密

```html
<input type="password" name="password">
```

浏览器会把字符视觉上显示成圆点或其他遮挡符号，但真实值仍存在于表单控件中，JavaScript 和表单提交都能读取它。

因此：

> `type="password"` 解决的是屏幕旁观风险的一部分，不是传输加密。

真正的链路保护依赖 HTTPS，服务端还需要安全的密码存储策略。

### 2. `current-password`：已有账号密码

登录场景：

```html
<input
  type="password"
  name="currentPassword"
  autocomplete="current-password"
>
```

它告诉浏览器和密码管理器：这里期待的是用户已有凭据。

### 3. `new-password`：创建或修改密码

注册、修改密码场景：

```html
<input
  type="password"
  name="newPassword"
  autocomplete="new-password"
>
```

浏览器可能据此提供密码生成和保存建议。

不要为了“安全”随意关闭密码管理器支持。对用户来说，允许可靠的密码管理器通常比强迫记忆和手输更安全。

### 4. 显示/隐藏密码

常见做法是切换：

```js
input.type = input.type === 'password' ? 'text' : 'password';
```

按钮应该：

- 使用 `type="button"`，避免误提交表单。
- 有明确文本，例如“显示密码 / 隐藏密码”。
- 用 `aria-pressed` 表达当前切换状态。
- 不清空输入值。

显示密码会增加旁观者看到内容的风险，所以应由用户主动触发。

### 5. minlength 只是客户端约束

```html
<input type="password" minlength="12">
```

浏览器可以帮助检查长度，但服务器仍必须执行最终密码策略。

另外，密码策略不应简单演化成“越复杂越好”的前端谜题；真实系统还需要考虑泄露密码检测、限速、多因素认证等整体安全设计。

### 6. 不要阻止粘贴

阻止 `paste` 会妨碍密码管理器和用户使用长随机密码。

浏览器原生 password 输入允许粘贴，通常应该保留这种能力。

### 7. 不要在日志中输出密码原文

本节实验只输出：

- 字段类型。
- `autocomplete`。
- 密码长度。
- validity 状态。

不会把密码原文打印到控制台或页面结果中。这也是日常调试应养成的习惯。

## 动手编码：从 0 到 1

### 第 1 步：创建当前密码字段

```html
<label>
  当前密码
  <input
    id="current-password"
    type="password"
    name="currentPassword"
    autocomplete="current-password"
    minlength="8"
  >
</label>
```

**为什么这样写**：把登录/验证现有凭据的语义明确告诉浏览器。

### 第 2 步：创建新密码字段

```html
<label>
  新密码
  <input
    id="new-password"
    type="password"
    name="newPassword"
    autocomplete="new-password"
    minlength="12"
  >
</label>
```

**为什么这样写**：新密码和当前密码是不同的自动填充语义。

### 第 3 步：加入显示/隐藏按钮

```html
<button
  type="button"
  class="toggle-password"
  data-target="current-password"
  aria-pressed="false"
>
  显示当前密码
</button>
```

**为什么这样写**：`type="button"` 避免默认 submit；`data-target` 明确控制哪个输入框。

### 第 4 步：切换 type 和 aria-pressed

```js
button.addEventListener('click', () => {
  const input = document.getElementById(button.dataset.target);
  const showing = input.type === 'text';

  input.type = showing ? 'password' : 'text';
  button.setAttribute('aria-pressed', String(!showing));
  button.textContent = showing ? '显示密码' : '隐藏密码';
  input.focus();
});
```

**为什么这样写**：把视觉状态和按钮可访问状态一起更新，并把焦点返回输入框。

**运行后观察**：切换前后 `value.length` 不变，说明只是显示方式变化。

### 第 5 步：只检查长度和 validity，不打印原文

```js
{
  type: input.type,
  autocomplete: input.autocomplete,
  length: input.value.length,
  tooShort: input.validity.tooShort,
  valid: input.validity.valid
}
```

**为什么这样写**：调试安全敏感字段时应避免把明文复制到日志和截图中。

### 本节核心代码

- `type="password"`
- `autocomplete="current-password"`
- `autocomplete="new-password"`
- `minlength`
- 显示/隐藏切换

### 实验辅助代码

- `data-target`：让一个通用函数控制不同密码字段。
- `aria-pressed`：同步切换按钮状态。
- 长度/validity 输出：只观察元信息，不输出密码原文。

最终源码：[`index.html`](./index.html)

## 运行案例

打开 `index.html` 后：

1. 在两个密码框输入不同长度内容。
2. 点击对应“显示密码”按钮。
3. 再次点击恢复遮挡。
4. 点击“检查密码字段状态”。

你可以观察浏览器是否提供密码管理器建议，但不同浏览器和用户配置的表现可能不同。

## 效果验证

你应该能够验证：

- [ ] password 默认以遮挡形式显示。
- [ ] 切换为 text 后值没有丢失，再切回 password 仍保持原值。
- [ ] 两个字段分别使用 `current-password` 与 `new-password`。
- [ ] minlength 不满足时能在用户编辑后反映 `tooShort` / validity 状态。
- [ ] 输出区域没有打印密码原文。
- [ ] 能解释 password 遮挡、HTTPS、服务端密码校验三者不是同一层安全机制。
