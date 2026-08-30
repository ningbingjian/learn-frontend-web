# KP098：`file`、`color`、`hidden`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `input[type="file"]` 让用户选择本地文件。
2. 理解 `accept` 只是选择提示，不是安全校验。
3. 读取 `File` 对象的名称、类型和大小，而不是依赖路径文本。
4. 使用 `input[type="color"]` 获取标准颜色值。
5. 理解 `hidden` 会提交但不可被用户直接编辑，并且绝不能作为可信安全数据来源。

## 理论讲解

### 1. `file` 代表文件选择，不代表已经上传

```html
<input type="file" name="avatar">
```

用户选择文件后，浏览器会把本地文件暴露为 `File` 对象。

此时文件还没有自动发送到服务器。只有表单真正提交或 JavaScript 主动上传时，文件内容才会进入网络请求。

### 2. `accept` 是提示，不是验证

```html
<input type="file" accept="image/png,image/jpeg">
```

这可以让文件选择器优先展示符合条件的文件，但不能把它当成安全边界。

原因包括：

- 浏览器 / 系统可能允许用户切换到“所有文件”
- MIME type 可能缺失或被伪造
- 文件扩展名也可以被伪造

因此服务端必须重新验证：

- 实际文件类型
- 大小
- 文件内容
- 病毒 / 恶意载荷风险

### 3. 不要依赖文件路径字符串

浏览器出于隐私原因不会把真实本地绝对路径暴露给网页。

你可能看到类似：

```text
C:\fakepath\avatar.png
```

真正有价值的数据应该从：

```js
input.files
```

读取。

### 4. `File` 是 Blob 的子类型

一个 `File` 常见属性：

- `name`
- `size`
- `type`
- `lastModified`

案例会打印这些元数据，但不会读取文件正文。

### 5. `color` 的值通常是十六进制 RGB

```html
<input type="color" name="themeColor" value="#3366ff">
```

常见 `value` 形式：

```text
#3366ff
```

浏览器可能提供系统级颜色选择器，但提交值仍是文本。

### 6. `hidden` 会进入提交数据

```html
<input type="hidden" name="source" value="pricing-page">
```

适合保存：

- 页面来源标识
- 流程状态 ID
- 非交互式表单参数

但是它不安全。

用户完全可以：

- 打开 DevTools 修改 value
- 用脚本修改
- 直接构造 HTTP 请求

所以：

> hidden 只是“界面上不展示”，绝不是“用户无法修改”。

### 7. 不要把权限、价格、用户身份放在 hidden 中并直接信任

错误思路：

```html
<input type="hidden" name="price" value="9999">
<input type="hidden" name="role" value="admin">
```

然后服务端直接相信这些值。

正确做法是服务端根据可信数据源重新计算或验证。

### 8. 文件上传通常使用 multipart

在传统 HTML 表单中，文件字段通常与：

```html
enctype="multipart/form-data"
```

配合。

这个编码问题已经在 KP090 中单独学习，本节重点放在三种 input 类型本身。

## 动手编码：从 0 到 1

### 第 1 步：建立表单

创建 `index.html` 和：

```html
<form id="demo-form"></form>
```

### 第 2 步：添加 file

```html
<label for="avatar">选择头像</label>
<input
  id="avatar"
  name="avatar"
  type="file"
  accept="image/png,image/jpeg"
>
```

**运行后观察**：浏览器打开系统文件选择器。

### 第 3 步：添加 color

```html
<label for="theme-color">主题色</label>
<input id="theme-color" name="themeColor" type="color" value="#3366ff">
```

### 第 4 步：添加 hidden

```html
<input type="hidden" name="source" value="kp098-demo">
```

**运行后观察**：页面看不到它，但 FormData 中能读取到。

### 第 5 步：读取 File 元数据

```js
const file = avatar.files[0];

const info = file ? {
  name: file.name,
  type: file.type,
  size: file.size
} : null;
```

### 第 6 步：演示 hidden 可被脚本修改

```js
hidden.value = 'modified-by-script';
```

案例提供按钮执行这一步，直接证明 hidden 不能被信任。

最终源码：[`index.html`](./index.html)

**本节核心代码**：`type="file"`、`accept`、`files`、`type="color"`、`type="hidden"`。

**实验辅助代码**：输出 File 元数据、FormData 和修改 hidden 的 JavaScript，以及页面样式。

## 运行案例

直接打开 `index.html`：

1. 选择任意文件，观察 File 元数据。
2. 切换颜色。
3. 查看 FormData 中的 `source`。
4. 点击“修改 hidden 值”，再次观察提交数据。

## 效果验证

你应该能够验证：

- [ ] 选择文件后可以通过 `files[0]` 获取 File 对象。
- [ ] `accept` 不等于安全校验。
- [ ] 网页不能依赖真实本地路径。
- [ ] color 提交标准颜色字符串。
- [ ] hidden 虽不可见但仍进入 FormData。
- [ ] hidden 能被脚本和 DevTools 修改，因此服务端不能直接信任。
