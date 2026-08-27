# RE-KP044：State 不可直接修改

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解当前 Render 读取到的 State 应当被当作只读快照。
2. 知道直接修改对象属性并不会等价于一次 React State 更新。
3. 理解 React 需要通过 setter 收到“下一份状态”。
4. 能解释为什么直接 mutation 可能让旧快照、日志和后续 Render 变得难以推理。
5. 能把“修改旧对象”改写为“创建新对象并交给 setter”。

> **本节核心代码**：`setProfile({ ...profile, score: profile.score + 1 })`，重点是替换 State，而不是原地修改旧对象。
>
> **实验辅助代码**：案例保留一个明确标记为“错误示范”的 mutation 按钮和一个无关 `refreshCount`，只用于观察“对象被改了，但 React 没收到 setter 更新”的问题。

## 理论讲解

### 1. State 值不是让你随手修改的普通变量

假设：

```jsx
const [profile, setProfile] = useState({
  name: 'Ada',
  score: 10
});
```

在当前这次 Render 中，`profile` 应该被理解成：

```text
这一次 Render 对 State 的读取结果
            ↓
          Snapshot
```

不要把它理解成一个应该被你原地改写的“全局可变对象”。

### 2. 直接 mutation 为什么有问题

下面代码在 JavaScript 层面当然可以执行：

```js
profile.score += 1;
```

但这里没有调用：

```js
setProfile(...)
```

因此 React 没有收到一次正式 State 更新请求。

常见现象是：

```text
对象内部值已经被 JavaScript 改掉
            ↓
React 并不知道你想更新 UI
            ↓
当前界面没有因为这次 mutation 自动重新 Render
```

### 3. 更危险的是“旧快照被污染”

直接修改旧对象不只是“UI 没刷新”。

如果之后因为其他 State 更新导致组件重新 Render，之前被 mutation 的对象可能突然以新值出现在 UI 中。

于是你会得到非常难理解的时间线：

```text
点击 A：改了对象，UI 没变化
点击 B：修改另一个 State
        ↓
组件重新 Render
        ↓
A 的 mutation 突然也出现在 UI
```

这就是为什么 React 官方建议把 State 当成只读。

### 4. 正确方式：创建下一份值

不要：

```js
profile.score += 1;
```

而是：

```js
setProfile({
  ...profile,
  score: profile.score + 1
});
```

这里做了两件事：

```text
旧 profile
   ↓ 读取
创建一个新对象
   ↓
交给 setProfile
   ↓
React 保存下一份 State
```

### 5. “不可变”不是说 JavaScript 对象真的冻结了

这里的“不可变更新”是 React 编程约定：

> 对已经进入 Props / State 的对象，不要修改旧版本；需要变化时创建新版本。

它并不意味着所有普通 JavaScript 对象都会自动 `Object.freeze()`。

### 6. 为什么这条规则很重要

把 State 当只读可以让很多事情更可靠：

- 旧日志仍然代表旧状态。
- React 能通过引用变化快速判断数据是否被替换。
- 后续 Snapshot、并发渲染和优化模型更容易成立。
- Undo / History 等需要保留旧版本的能力更容易实现。

本节先建立纪律，后面对象、数组和嵌套结构都会建立在这条规则上。

---

## 动手编码：从 0 到 1

### 第 0 步：准备最小工程

创建：

```text
kp044-state-immutability/
├── index.html
└── src/
    └── main.jsx
```

### 第 1 步：创建对象 State

在 `src/main.jsx` 中：

```jsx
function App() {
  const [profile, setProfile] = useState({
    name: 'Ada',
    score: 10
  });

  return <h1>{profile.name}：{profile.score}</h1>;
}
```

页面先显示：

```text
Ada：10
```

### 第 2 步：故意写一个错误 mutation

加入：

```jsx
function mutateWrongly() {
  profile.score += 1;
  console.log('对象里的 score 已变成：', profile.score);
}
```

按钮：

```jsx
<button onClick={mutateWrongly}>错误：直接修改对象</button>
```

点击后观察：

- Console 中对象值发生变化。
- 页面数字不会因为这次 mutation 自动重新 Render。

### 第 3 步：加入实验辅助刷新 State

为了证明旧对象已经被污染，加入：

```jsx
const [refreshCount, setRefreshCount] = useState(0);
```

以及：

```jsx
<button onClick={() => setRefreshCount(refreshCount + 1)}>
  触发一次无关 Render
</button>
```

现在流程是：

```text
先点“错误：直接修改对象”
        ↓
UI 暂时不变
        ↓
再点“触发一次无关 Render”
        ↓
组件重新执行
        ↓
被偷偷 mutation 的 score 出现在 UI
```

这正是 mutation 难以推理的地方。

### 第 4 步：写正确更新

加入：

```jsx
function updateCorrectly() {
  setProfile({
    ...profile,
    score: profile.score + 1
  });
}
```

按钮：

```jsx
<button onClick={updateCorrectly}>正确：通过 setter 替换</button>
```

点击后 UI 会正常更新。

### 第 5 步：对比两种心智模型

错误：

```text
拿到旧对象
   ↓
直接修改旧对象内部字段
   ↓
React 没收到下一份 State
```

正确：

```text
读取旧 State
   ↓
创建新值
   ↓
setProfile(nextProfile)
   ↓
React 重新 Render
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：通过 setter 提交新对象，而不是直接 mutation State。
- **实验辅助代码**：错误按钮与 `refreshCount` 专门用来暴露 mutation 的隐蔽问题；生产代码不应模仿错误按钮。

## 运行案例

在 React 模块根目录执行：

```bash
npm run dev -- ./05-state-basics-object-array-updates/kp044-state-immutability --config ./vite.config.js
```

## 效果验证

你应该能够验证：

1. 点击“错误：直接修改对象”时 Console 值变化，但页面不会因此自动重新 Render。
2. 再触发一个无关 State 更新后，被 mutation 的旧对象值会暴露出来。
3. 点击“正确：通过 setter 替换”会通过正式 State 更新让 UI 改变。
4. 能解释为什么“JavaScript 对象能被修改”不代表“React State 应该被修改”。
5. 能把 `state.someField = value` 改写成“创建新值 + setter”的形式。

完成后继续 **RE-KP045：对象状态不可变更新**。
