# RE-KP069：嵌套组件定义导致状态意外重置

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 为什么父组件一次普通更新，就可能让“写在父组件内部”的子组件 State 归零？ |
| Learning Artifact | Nested Component remount 故障复现 |

## 先预测

如果在 `Parent` 函数内部声明 `Child`，Parent 每次 Render 都会再次执行声明。React 看到的 Child Type 还是同一个吗？

## 动手实验：从 0 到 1

### Step 0：让 Child 有本地 State

先做一个可点击 Counter/Input，确认它能保存 State。

### Step 1：故意把 Child 定义放进 Parent

```jsx
function Parent() {
  function Child() {
    const [count, setCount] = useState(0);
    // ...
  }
  return <Child />;
}
```

### Step 2：触发 Parent 无关更新

**观察**：Child State 可能被重置。

**立即解释**：每次 Parent 调用都会创建一个新的函数对象；对 React 来说，前后 Render 的组件 Type 不再相同，于是身份被替换。

### Step 3：把 Child 移到模块顶层

```diff
+ function Child() { ... }
  function Parent() {
-   function Child() { ... }
    return <Child />;
  }
```

再次验证 State 能正常保留。

[查看最终源码](./src/main.jsx)

## 心智模型

```text
Nested definition
Parent render #1 → Child Type A
Parent render #2 → Child Type B
A !== B → remount → State reset
```

## Wrong Way

不要为了“代码就近”把有 State 的组件类型定义在另一个组件函数里。普通 helper function 与 React Component Type 要区分。

## Production Boundary

大型组件应通过模块级组件拆分、Props 和 composition 管理结构；不要依赖嵌套 Component Declaration。

## 本课只记住 3 件事

1. 组件 Type 本身参与 Identity。
2. 嵌套声明会在每次父 Render 创建新 Type。
3. 需要稳定身份的组件定义放在模块顶层。

## Challenge

把嵌套组件改成普通 `renderDetails()` helper，比较“调用函数返回 JSX”和“把函数当 Component Type”两种写法。

## Mastery Check

- **Must**：能解释嵌套定义为什么重置 State。
- **Should**：能区分 Component 与普通 render helper。
- **Expert**：能在组件拆分评审中识别 Identity 隐患。
