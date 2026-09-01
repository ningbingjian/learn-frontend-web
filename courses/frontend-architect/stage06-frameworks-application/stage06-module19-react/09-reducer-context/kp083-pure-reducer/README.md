# RE-KP083：Pure Reducer

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | 为什么 reducer 必须只计算 next State，不能顺手改数组、发请求、写 localStorage？ |
| Learning Artifact | Mutating reducer 故障 → Pure reducer 修复 |

## 先制造问题

```js
state.items.push(action.item);
return state;
```

这段看起来“确实把数组加了元素”，为什么仍然是坏 reducer？

## 动手实验

### Step 0：故意 Mutation
观察旧对象也被改变，State 历史边界消失。

### Step 1：改为返回新值
```js
return {
  ...state,
  items: [...state.items, action.item],
};
```

### Step 2：移除副作用
Reducer 不发送请求、不计时、不操作 DOM；这些行为放事件/Effect 等适当边界。

### Step 3：相同输入重复调用
`reducer(state, action)` 应产生同样结果，而不依赖随机数/当前时间。

[查看最终源码](./src/main.jsx)

## 理论收束
Pure Reducer 满足纯函数模型：不修改输入、相同输入得到相同输出、只负责计算。React 开发检查可以通过额外调用帮助暴露不纯逻辑。

## Wrong Way
- `push/splice` 直接改旧 State。
- reducer 内 `fetch()`。
- reducer 内生成依赖 `Date.now()` 的业务事件 ID。

## Production Boundary
需要时间、随机 ID、网络结果时，先在事件/服务层获得事实，再把结果作为 Action Payload 交给 reducer。

## 本课只记住 3 件事
1. Reducer 计算，不执行副作用。
2. 不修改旧 State。
3. Pure 让 Transition 可预测、可测试。

## Challenge
给 reducer 写一个“同输入调用两次结果一致”的简单测试思路。

## Mastery Check
- **Must**：能识别 Mutation。
- **Should**：会把副作用移出 reducer。
- **Expert**：能设计 deterministic Transition。
