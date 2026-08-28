# RE-KP078：状态生命周期设计

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 从 create / preserve / reset / dispose 四个阶段设计 State 生命周期。
2. 理解组件身份不变时 State 会被保留。
3. 理解改变 `key` 可以表达“这是新的业务实体”，从而主动 reset State。
4. 理解组件离开渲染树后，其局部 State 会被销毁。
5. 能为表单草稿、编辑器、步骤流等状态明确什么时候应该保留、什么时候应该清空。

> **本节核心代码**：`DraftEditor key={document.id}` 与条件挂载组合展示 preserve / reset / dispose。  
> **实验辅助代码**：父级 render 计数只用于验证无关 Render 不会重置局部 State。

## 理论讲解

### 1. State 设计不只问“存什么”

还要问：

```text
什么时候创建？
什么时候继续保留？
什么时候主动重置？
什么时候彻底销毁？
```

这就是 State 生命周期设计。

### 2. Create

组件第一次以某个身份进入树时：

```jsx
const [draft, setDraft] = useState(initialText);
```

这份 State 被创建。

### 3. Preserve

只要 React 认为这是同一个组件身份：

- 父组件重新 Render；
- 普通 Props 改变；
- 周围无关 UI 变化；

局部 State 通常继续保留。

### 4. Reset

如果业务语义已经变成“另一份实体”，可以显式改变 key：

```jsx
<DraftEditor key={document.id} document={document} />
```

从文档 A 切到文档 B：

```text
key: A → B
```

React 会把它视为新身份，新建局部草稿 State。

### 5. Dispose

组件离开树：

```jsx
{showEditor && <DraftEditor ... />}
```

当 `showEditor` 变成 false，组件卸载，对应局部 State 也被销毁。

再次显示时，会重新创建。

### 6. 生命周期应该服务业务语义

例如编辑器草稿：

```text
父级刷新统计信息 → 应保留
切换到另一篇文档 → 应重置
关闭编辑器并结束任务 → 可以销毁
```

这比“看到 useState 就放进去”更接近架构设计。

## 动手编码：从 0 到 1

### 第 0 步：建立 DraftEditor

```jsx
function DraftEditor({ document }) {
  const [draft, setDraft] = useState(document.text);
}
```

**本步目标**：建立局部草稿。  
**为什么这样写**：编辑中的临时文本不应直接修改原始数据。  
**运行后观察**：输入可以独立修改 draft。

### 第 1 步：父级保存当前文档

```jsx
const [documentId, setDocumentId] = useState('a');
```

**本步目标**：让业务实体由父级选择。  
**为什么这样写**：当前文档是父级工作流状态。  
**运行后观察**：可以在 A / B 文档间切换。

### 第 2 步：用 key 表达实体身份

```jsx
<DraftEditor key={document.id} document={document} />
```

**本步目标**：切换实体时重置草稿。  
**为什么这样写**：A 的草稿不应该泄漏到 B。  
**运行后观察**：切换文档后输入恢复为新文档初始文本。

### 第 3 步：增加父级无关 Render

```jsx
const [parentTick, setParentTick] = useState(0);
```

**本步目标**：验证 preserve。  
**为什么这样写**：同一 document key 下身份不变。  
**运行后观察**：父级 tick 增加，当前 draft 不丢失。

### 第 4 步：条件移除 Editor

```jsx
{showEditor && (
  <DraftEditor key={document.id} document={document} />
)}
```

**本步目标**：验证 dispose。  
**为什么这样写**：组件离开树后，局部 State 生命周期结束。  
**运行后观察**：隐藏后再显示，draft 重新初始化。

### 第 5 步：整理生命周期图

```text
mount → create
same identity → preserve
key change → reset
unmount → dispose
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：key、条件渲染与局部 draft State 的生命周期。
- **实验辅助代码**：父级 tick 和静态文档数据。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp078-state-lifecycle-design --config ./vite.config.js
```

## 效果验证

1. 编辑 draft 后触发父级无关 Render，内容仍保留。
2. 切换 document，draft 重置为对应初始文本。
3. 隐藏 Editor 后再显示，局部 State 被重新创建。
4. 能区分 reset 与 dispose。
5. 能为业务 State 明确生命周期策略。

完成后继续 **RE-KP079：状态归属与组件边界**。
