# KP010：乱码诊断

> 节点：`node-02-01-01-01-02-01-01-02`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [完整源码讲解](#完整源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [课后练习](#课后练习)

## 学习目标

学完本节后，你应该能够：

1. 理解乱码通常来自“字节”和“解码方式”不匹配，而不是字符随机损坏。
2. 区分常见乱码、替换字符 `�`、字体缺字和转义错误。
3. 建立固定的乱码排查链路：原始字符 → 字节 → 声明 → 解码器 → 最终字符。
4. 能通过“同一组字节、两种解码方式”的实验定位第一次错误发生在哪一层。

> **本节核心知识是乱码诊断思路，不是 JavaScript API。**  
> `TextEncoder`、`TextDecoder`、`Array.from()` 等全部属于实验辅助代码，只用来制造一个可控的编码/解码实验。

## 理论讲解

### 1. 乱码通常是“解码错了”

正确链路应该是：

```text
字符
  ↓ 正确编码
字节
  ↓ 正确解码
字符
```

如果字节本身是 UTF-8，但读取方使用了另一种编码规则：

```text
UTF-8 字节
  ↓ 错误解码器
错误字符
```

就可能出现乱码。

### 2. 常见表现不完全等价

排查时要区分：

- `ä¸­æ–‡` 一类文本：常见于编码/解码不一致。
- `�`：通常表示解码器遇到了无法按当前编码解释的字节序列。
- 方框、空白字形：可能是字体不包含对应字符。
- `&amp;#x4E2D;`：可能是转义层级错误，而不是编码错误。
- 错误字符再次保存：问题可能已经进入数据库、缓存或消息队列。

### 3. 找“第一次变错”的位置

推荐固定按下面顺序排查：

```text
原始字符是什么？
      ↓
实际字节是什么？
      ↓
HTTP / HTML 声明是什么？
      ↓
实际使用什么解码器？
      ↓
最终得到什么字符？
```

不要一看到乱码就反复尝试不同转码函数；先找出第一次发生变化的位置。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确实验设计

我们要人为控制一个变量：

> **两次解码使用完全相同的一组 UTF-8 字节，只改变解码方式。**

如果最终结果不同，就能证明问题来自解码方式，而不是字节本身发生了变化。

### 第 1 步：先写页面骨架

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP010：乱码诊断</title>
</head>
<body>
  <h1>同一组字节，不同解码结果</h1>
  <pre id="result"></pre>
</body>
</html>
```

这里先保证案例文件本身按 UTF-8 正常运行。

### 第 2 步：确定原始字符

在 `body` 末尾加入：

```html
<script>
  const original = '中文';
</script>
```

当前已知：

```text
原始字符 = 中文
```

### 第 3 步：把原始字符编码成 UTF-8 字节

继续加入：

```js
const bytes = new TextEncoder().encode(original);
```

> **实验辅助代码**：`TextEncoder` 用来获得可控的 UTF-8 字节。本节重点不是学习这个 API。

现在链路是：

```text
中文
  ↓ UTF-8 编码
bytes
```

### 第 4 步：先用正确的 UTF-8 解码

继续加入：

```js
const correct =
  new TextDecoder('utf-8').decode(bytes);
```

此时预期：

```text
原始字符：中文
UTF-8 解码：中文
```

这证明这组字节本身可以正确还原成原始文本。

### 第 5 步：对同一组字节故意使用错误解码器

继续加入：

```js
const wrong =
  new TextDecoder('windows-1252').decode(bytes);
```

注意最关键的一点：

```text
correct 使用 bytes
wrong   也使用 bytes
```

字节没有换，只是解码规则不同。

这一步就是本案例的核心对照实验。

### 第 6 步：把实际字节转成十六进制

继续加入：

```js
const hex = Array.from(
  bytes,
  value => value.toString(16).padStart(2, '0')
).join(' ');
```

这样页面可以明确告诉我们两次解码共享的字节是：

```text
e4 b8 ad e6 96 87
```

### 第 7 步：一次性输出完整诊断链路

最后加入：

```js
document.querySelector('#result').textContent = [
  '原始字符：' + original,
  '实际字节：' + hex,
  'UTF-8 解码：' + correct,
  'Windows-1252 解码：' + wrong,
  '',
  '结论：字节没有变化，错误发生在解码方式。'
].join('\n');
```

刷新页面后，从上往下读：

```text
原始字符
   ↓
实际字节
   ↓
正确解码结果
   ↓
错误解码结果
   ↓
结论
```

这样就不是“看到乱码后猜原因”，而是在一条受控链路里定位错误。

### 第 8 步：更换原始文本再次验证

临时把：

```js
const original = '中文';
```

改成：

```js
const original = 'café';
```

或者其他包含非 ASCII 字符的文本。

刷新后观察：

- 字节发生变化。
- UTF-8 解码仍能正确还原。
- 错误解码器可能产生另一种异常文本。

最后恢复 `'中文'`，保证最终文件与仓库源码一致。

### 第 9 步：把实验方法迁移到真实问题

以后遇到真实乱码，不要直接照搬这里的 `windows-1252`。

正确动作是问：

```text
数据最初是什么字符？
实际落盘/传输的字节是什么？
哪一层声明了什么 charset？
哪一层真正使用了什么解码方式？
第一次变错发生在哪里？
```

这才是这个实验真正要训练的能力。

---

## 完整源码讲解

仓库最终 [`index.html`](./index.html) 为：

```html
<!doctype html>
<!--
  KP010：乱码诊断

  同一组 UTF-8 字节：
  - 用 UTF-8 解码，得到原始中文。
  - 用 Windows-1252 解码，得到典型乱码。

  诊断顺序：
  1. 原始字符是什么？
  2. 实际字节是什么？
  3. 使用什么编码解码？
  4. 第一次错误发生在哪一层？
-->
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP010：乱码诊断</title>
</head>
<body>
  <h1>同一组字节，不同解码结果</h1>

  <pre id="result"></pre>

  <script>
    const original = '中文';
    const bytes = new TextEncoder().encode(original);

    const correct =
      new TextDecoder('utf-8').decode(bytes);

    const wrong =
      new TextDecoder('windows-1252').decode(bytes);

    const hex = Array.from(
      bytes,
      value => value.toString(16).padStart(2, '0')
    ).join(' ');

    document.querySelector('#result').textContent = [
      '原始字符：' + original,
      '实际字节：' + hex,
      'UTF-8 解码：' + correct,
      'Windows-1252 解码：' + wrong,
      '',
      '结论：字节没有变化，错误发生在解码方式。'
    ].join('\n');
  </script>
</body>
</html>
```

这个最终案例里真正值得记住的不是 API 名称，而是：

```text
同一组 bytes
├── UTF-8 解码        → 正确文本
└── Windows-1252 解码 → 错误文本
```

因此第一次错误发生在“解码方式”这一层。

## 运行案例

直接打开 [`index.html`](./index.html)，从上到下核对每一层结果。

或执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

## 效果验证

你应该能够确认：

- 原始字符为“中文”。
- 实际字节为 `e4 b8 ad e6 96 87`。
- UTF-8 解码结果仍然是“中文”。
- Windows-1252 解码结果与原文不同。
- 两次解码使用的是完全相同的 `bytes`。
- 能解释为什么这个实验说明“错误发生在解码方式”，而不是“字节随机坏了”。

## 课后练习

1. 把原始文本改成 `café`，记录正确和错误解码结果。
2. 假设数据库里已经保存的是乱码文本，思考错误可能发生在“写入前”还是“读取时”。
3. 遇到页面出现方框字符时，列出至少两种可能原因，并说明为什么不能立刻认定是编码问题。
