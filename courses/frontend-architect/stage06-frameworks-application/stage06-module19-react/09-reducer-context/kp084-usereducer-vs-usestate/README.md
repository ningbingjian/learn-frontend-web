# RE-KP084：useReducer vs useState

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 什么时候 reducer 真能降低复杂度，什么时候只是增加样板代码？ |
| Learning Artifact | 同一需求 useState / useReducer Trade-off 表 |

## 先判断

`isOpen` 一个 boolean 和“任务编辑器 add/edit/delete/select/filter”应使用同样状态工具吗？

## 动手比较

### Step 0：简单独立 State
```jsx
const [isOpen, setIsOpen] = useState(false);
```
一行就能清楚表达，不需要 Action/Reducer。

### Step 1：让 Transition 增多
当多个 Handler 重复同一规则、更新多个相关字段，useState 版本开始把“规则”分散。

### Step 2：迁移 reducer
把事件收敛为 Action，把转换收敛到单个 reducer。

### Step 3：比较成本
```text
useState: 少样板 / 局部直接 / 复杂转换容易分散
useReducer: 转换集中 / Action 可追踪 / 需要更多模型代码
```

[查看最终源码](./src/main.jsx)

## 理论收束
二者都管理组件 State。选择标准不是 State “有几个字段”，而是 Transition 复杂度、规则复用、可测试性和可读性。

## Wrong Way
- “对象 State 必须 reducer”。
- “高级项目一律 reducer”。
- 为了减少文件数量把巨大 reducer 塞回组件内部。

## Production Boundary
简单局部交互优先 useState；复杂业务转换、多个相关 Action、需要独立测试时考虑 reducer。

## 本课只记住 3 件事
1. 选择看 Transition，不看炫技程度。
2. useState 更直接。
3. reducer 的价值是集中规则。

## Challenge
为一个登录表单列出 State/Transition，再决定用哪个 Hook。

## Mastery Check
- **Must**：能说明两者取舍。
- **Should**：能识别迁移信号。
- **Expert**：能控制 reducer 粒度和模块边界。
