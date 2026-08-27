# RE-KP046：数组状态不可变更新

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解数组 State 与对象 State 一样需要按只读方式处理。
2. 会使用 spread 添加元素。
3. 会使用 `map()` 替换数组中的某个元素。
4. 会使用 `filter()` 删除元素。
5. 知道应避免直接对 State 数组调用 `push()`、`pop()`、`splice()`、`sort()`、`reverse()` 等原地修改方法。
6. 能判断“返回新数组”的方法与“修改原数组”的方法。

> **本节核心代码**：`[...items, newItem]`、`items.map(...)`、`items.filter(...)` 三类不可变数组更新。
>
> **实验辅助代码**：任务列表、静态 id 和按钮只是为了覆盖添加、切换、删除三个常见动作。

## 理论讲解

### 1. 数组 State 也应当被视为只读

例如：

```jsx
const [tasks, setTasks] = useState([
  { id: 1, title: '学习 React', done: false }
]);
```

不要：

```js
tasks.push(newTask);
```

因为它直接修改了旧数组。

### 2. 添加：创建新数组

推荐：

```js
setTasks([
  ...tasks,
  newTask
]);
```

得到：

```text
旧数组元素
+
新元素
=
新数组
```

### 3. 修改某个元素：使用 map

假设要切换 id=2：

```js
setTasks(
  tasks.map(task =>
    task.id === 2
      ? { ...task, done: !task.done }
      : task
  )
);
```

这里有两层不可变原则：

```text
数组本身 → map 创建新数组
目标对象 → spread 创建新对象
```

没有变化的对象可以继续复用旧引用。

### 4. 删除：使用 filter

删除某项：

```js
setTasks(
  tasks.filter(task => task.id !== id)
);
```

`filter()` 返回新数组，不会删除旧数组中的元素。

### 5. 哪些数组 API 要警惕

常见原地修改方法：

```text
push
pop
shift
unshift
splice
sort
reverse
```

常见返回新数组的方法：

```text
map
filter
slice
concat
```

注意：

```text
slice  ≠ splice
```

两者名字很像，但行为完全不同。

### 6. sort / reverse 如果必须用怎么办

可以先复制：

```js
const next = [...tasks];
next.sort(compareFn);
setTasks(next);
```

这里修改的是新数组，不是 State 里那一份旧数组。

### 7. 数组里放对象时还要防止对象 mutation

即使你写：

```js
const next = [...tasks];
```

这也只是浅拷贝数组。

如果随后：

```js
next[0].done = true;
```

仍然修改了旧数组与新数组共同引用的对象。

所以修改元素时通常要：

```js
{ ...task, done: true }
```

---

## 动手编码：从 0 到 1

### 第 0 步：建立任务数组

```jsx
const [tasks, setTasks] = useState([
  { id: 1, title: '理解不可变数组', done: true },
  { id: 2, title: '练习 map', done: false }
]);
```

### 第 1 步：添加任务

```jsx
function addTask() {
  const newTask = {
    id: nextId,
    title: `任务 ${nextId}`,
    done: false
  };

  nextId += 1;
  setTasks([...tasks, newTask]);
}
```

这里不使用 `push()`。

### 第 2 步：切换完成状态

```jsx
function toggleTask(id) {
  setTasks(
    tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done }
        : task
    )
  );
}
```

### 第 3 步：删除任务

```jsx
function removeTask(id) {
  setTasks(tasks.filter(task => task.id !== id));
}
```

### 第 4 步：渲染任务列表

```jsx
{tasks.map(task => (
  <li key={task.id}>
    <span>{task.done ? '✅' : '⬜'} {task.title}</span>
    <button onClick={() => toggleTask(task.id)}>切换</button>
    <button onClick={() => removeTask(task.id)}>删除</button>
  </li>
))}
```

### 第 5 步：亲手做一次错误对照

临时把添加改成：

```js
tasks.push(newTask);
setTasks(tasks);
```

观察并思考：

```text
旧引用仍然是同一个数组
```

实验后恢复正确版本，不要把 mutation 留在最终源码里。

### 第 6 步：总结三类操作

```text
添加 → spread / concat
替换 → map
删除 → filter
```

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：spread、`map()`、`filter()`。
- **实验辅助代码**：任务文案和 `nextId` 用于制造增删改场景。

## 运行案例

```bash
npm run dev -- ./05-state-basics-object-array-updates/kp046-array-state-updates --config ./vite.config.js
```

## 效果验证

1. 点击“添加任务”时列表追加新对象。
2. 点击“切换”只替换目标任务对象。
3. 点击“删除”返回不包含目标项的新数组。
4. 最终源码没有使用 `push()` / `splice()` 直接修改 State 数组。
5. 能解释为什么 `[...tasks]` 只复制数组一层，并不会自动复制数组里的对象。

完成后继续 **RE-KP047：嵌套状态更新与结构设计**。
