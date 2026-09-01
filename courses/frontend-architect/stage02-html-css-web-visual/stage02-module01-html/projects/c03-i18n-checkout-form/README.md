# C03：国际化注册与结算表单

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 项目目标

这个项目把表单章节从“会写 input”推进到一个有国际化、原生约束、字段错误和服务端错误模拟的注册/结算流程。完成后你应该能够：

1. 正确使用 `form`、`fieldset`、`legend`、`label` 和帮助文本。
2. 为不同业务字段选择合适的 input 类型。
3. 用 `required`、`minlength`、`pattern` 等原生约束建立第一层校验。
4. 使用 `ValidityState`、`aria-invalid`、`aria-describedby` 呈现可理解的字段错误。
5. 把服务端错误映射回具体字段，同时保留用户已经输入的数据。
6. 在一个页面中正确处理不同语言和书写方向。
7. 不把前端校验当作安全边界。

## 业务场景

用户需要完成：

- 联系信息；
- 配送地址；
- 支付方式偏好；
- 服务条款确认；
- 最终提交。

为了演示国际化，地址区域提供中文与阿拉伯文方向示例。

## 覆盖知识点

重点覆盖：

- KP011～KP012：`lang` / `dir`；
- KP089～KP106：form、控件、label、帮助文本、fieldset；
- KP107：步骤提示思路；
- KP108～KP111：约束校验、ValidityState、字段错误、服务端错误；
- KP119：提交结果动态状态宣布。

## 动手编码：从 0 到 1

### 第 1 步：先用 fieldset 划分业务组

```html
<form id="checkout" novalidate>
  <fieldset>
    <legend>1. 联系信息</legend>
    ...
  </fieldset>
  <fieldset>
    <legend>2. 配送地址</legend>
    ...
  </fieldset>
</form>
```

`fieldset/legend` 表达字段之间的业务关系，而不是仅为了画边框。

### 第 2 步：给每个控件建立 label 和帮助文本

```html
<label for="email">电子邮箱</label>
<input id="email" name="email" type="email" required aria-describedby="email-help email-error">
<p id="email-help">用于接收订单确认。</p>
<p id="email-error" class="error"></p>
```

placeholder 不承担 label 的职责。

### 第 3 步：加入原生约束

姓名用 `minlength`，邮编用 `pattern`，邮箱直接用 `type="email"`。

浏览器约束是快速反馈，不是服务端可信校验。

### 第 4 步：用 JavaScript 映射 ValidityState

提交时遍历字段：

```js
if (!control.validity.valid) {
  // 根据 valueMissing / typeMismatch / patternMismatch 等生成字段错误
}
```

并同步：

```html
aria-invalid="true"
```

### 第 5 步：加入错误汇总和首个错误聚焦

页面顶部错误汇总列出链接，点击可以回到对应字段。提交失败后自动聚焦第一个错误字段。

### 第 6 步：模拟服务端最终校验

当邮箱输入 `used@example.com` 时，模拟服务器返回“邮箱已被注册”；当姓名输入 `server` 时，模拟通用服务器异常。

重点观察：

- 字段错误回到邮箱字段；
- 通用错误显示在表单级状态区；
- 用户其它字段内容没有丢失。

### 第 7 步：加入语言和方向边界

地址示例中加入：

```html
<p lang="ar" dir="rtl">مثال على عنوان الشحن</p>
```

不要因为整个页面是中文，就假设局部内容永远是 LTR。

### 第 8 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **项目核心 HTML**：fieldset/legend、label、帮助文本、原生约束、错误关联、局部语言方向。
- **实验辅助代码**：ValidityState 映射、错误汇总、模拟 422/500 响应、动态状态展示。

## 运行案例

直接打开 `index.html` 即可，或者：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/projects/c03-i18n-checkout-form/
```

## 效果验证

建议按以下顺序实验：

1. 空表单提交，观察必填错误和首个错误聚焦。
2. 输入非法邮箱，观察 `typeMismatch` 对应的错误文本。
3. 输入错误邮编，观察 `patternMismatch`。
4. 输入合法数据后提交，观察 FormData 预览。
5. 将邮箱改为 `used@example.com`，观察服务端字段错误。
6. 将姓名改为 `server`，观察通用服务器错误与重试提示。
7. 检查提交失败后其它字段值是否仍保留。
8. 使用读屏/Accessibility 面板检查字段是否同时具备名称、帮助文本和错误描述。
9. 检查阿拉伯文示例是否使用局部 `lang` 和 `dir="rtl"`。
