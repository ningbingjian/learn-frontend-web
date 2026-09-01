# C05：FAQ、确认框与浮层帮助

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 项目目标

这是整个 HTML 模块的最终综合项目。页面同时包含 FAQ、危险操作确认和轻量帮助，分别选择 `details`、`dialog` 和 Popover，让你建立“不同交互问题选择不同原生能力”的判断框架。

完成后你应该能够：

1. 用 `details/summary` 构建无需 JavaScript 也能工作的 FAQ。
2. 用 `details[name]` 实现原生单项展开分组，并接受旧环境退化为普通 details。
3. 用 `dialog.showModal()` 处理真正需要阻断背景操作的确认流程。
4. 用 `form method="dialog"` 返回用户选择。
5. 正确监听 `cancel` / `close`，并把焦点恢复到触发按钮。
6. 用 Popover 处理非模态、短暂、上下文相关的帮助。
7. 使用 `popovertarget` 建立声明式触发关系。
8. 通过功能检测和基础 HTML 内容实现渐进增强。

## 业务场景

页面是一个 SaaS 账户设置帮助中心：

- FAQ：密码、账单、数据导出；
- 删除工作区：必须二次确认；
- “什么是工作区 ID？”：适合轻量 Popover；
- 老浏览器/禁用 JavaScript：仍然能看到基础帮助内容。

## 覆盖知识点

直接覆盖 KP120～KP131，并复用：

- KP050：`main`；
- KP059：页面片段；
- KP061：自描述链接文本；
- KP105：帮助文本；
- KP119：动态状态宣布。

## 选型原则

### FAQ → details

FAQ 是“补充信息按需展开”，不需要阻断页面其它操作。

### 删除确认 → modal dialog

删除工作区会造成不可逆结果，确认期间应该把用户的注意力限制在对话框内，因此使用 `showModal()`。

### 上下文提示 → popover

“工作区 ID 是什么”只是临时帮助，打开时背景仍然可以交互，不应该使用模态 dialog。

## 动手编码：从 0 到 1

### 第 1 步：先让 FAQ 在无脚本环境工作

```html
<details name="faq">
  <summary>如何导出数据？</summary>
  <p>进入设置 → 数据导出。</p>
</details>
```

即使 JavaScript 完全失败，FAQ 仍然可用。

### 第 2 步：加入删除确认 dialog

```html
<dialog id="delete-dialog">
  <form method="dialog">
    <button value="cancel">取消</button>
    <button value="confirm">确认删除</button>
  </form>
</dialog>
```

按钮只在浏览器支持 dialog 且 JavaScript 成功初始化后显示。

### 第 3 步：处理 cancel / close 和焦点恢复

打开前记录触发按钮；`close` 后把焦点恢复给它。

Esc 触发 `cancel`。本项目允许 Esc 关闭，因此不调用 `preventDefault()`。

### 第 4 步：加入 Popover 声明式触发器

```html
<button popovertarget="workspace-help">什么是工作区 ID？</button>
<div id="workspace-help" popover>...</div>
```

如果支持 Popover，JavaScript 显示增强按钮并隐藏普通帮助区；不支持时则保留基础帮助内容。

### 第 5 步：区分 auto 和 manual

最终页面的上下文帮助使用默认 `auto`，因此允许 light dismiss。README 中同时解释 `manual` 需要应用自己负责显式关闭。

### 第 6 步：用状态区反馈确认结果

删除教学案例不会真的删除数据，只把选择写入 `role="status"` 区域。

### 第 7 步：保留无脚本基础路径

页面包含：

- 原生 details FAQ；
- 始终可见的普通帮助 section；
- `<noscript>` 提示；
- 只有增强能力可用时才显示的 dialog/popover 按钮。

### 第 8 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **项目核心 HTML**：details/name、dialog、method=dialog、popover、popovertarget、基础 fallback 内容。
- **实验辅助代码**：功能检测、showModal、close/cancel、焦点恢复和演示状态输出。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/projects/c05-native-interactions/
```

## 效果验证

1. 不运行 JavaScript 时 FAQ 仍然能通过 details 展开。
2. 支持 `details[name]` 的浏览器中，同组 FAQ 一次只展开一项。
3. “删除工作区”按钮打开 modal dialog，背景不可操作。
4. Esc 关闭确认框，并恢复触发按钮焦点。
5. 点击“确认删除”后 `returnValue` 为 `confirm`，状态区显示教学反馈。
6. Popover 打开时背景仍可交互，点击外部可 light dismiss。
7. Popover 不支持时，普通“工作区 ID”帮助 section 仍然可见。
8. 页面没有用一个组件同时承担 FAQ、模态确认和轻量提示三种不同职责。
