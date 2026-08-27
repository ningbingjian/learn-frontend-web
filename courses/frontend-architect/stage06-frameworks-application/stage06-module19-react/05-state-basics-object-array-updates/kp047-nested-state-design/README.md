# RE-KP047：嵌套状态更新与结构设计

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解对象 spread 只复制一层。
2. 会对嵌套对象沿着更新路径逐层创建新对象。
3. 能解释为什么只复制最外层、却直接修改内层对象仍然属于 mutation。
4. 知道嵌套过深会让更新代码变复杂。
5. 能判断什么时候应该考虑把 State 结构设计得更扁平。

> **本节核心代码**：`setProfile({ ...profile, address: { ...profile.address, city: value } })`，从被修改字段一路复制到 State 根节点。
>
> **实验辅助代码**：用户资料表单和 JSON 预览只是为了观察多层引用变化。

## 理论讲解

### 1. Spread 是浅拷贝，不是深拷贝

State：

```js
{
  name: 'Ada',
  address: {
    city: 'London',
    country: 'UK'
  }
}
```

写：

```js
const nextProfile = {
  ...profile
};
```

只创建了新的最外层对象。

此时：

```js
nextProfile !== profile
```

但是：

```js
nextProfile.address === profile.address
```

内层 `address` 还是同一个对象引用。

### 2. 只复制外层再修改内层仍然是 mutation

下面看起来“已经复制过”：

```js
const nextProfile = { ...profile };
nextProfile.address.city = 'Paris';
```

但 `nextProfile.address` 和 `profile.address` 是同一个对象。

所以这行实际上也改了旧 State 里的：

```js
profile.address.city
```

因此仍然不安全。

### 3. 正确方式：沿路径逐层复制

要修改：

```text
profile.address.city
```

需要创建：

```text
新的 city 值
      ↑
新的 address 对象
      ↑
新的 profile 对象
```

代码：

```js
setProfile({
  ...profile,
  address: {
    ...profile.address,
    city: 'Paris'
  }
});
```

### 4. 为什么要“从修改点一路复制到根”

可以把嵌套对象想成引用关系：

```text
profile
  ├─ name
  └─ address ──→ { city, country }
```

如果你想让 `city` 变化，但又不修改旧 `address`，就必须创建一个新的 `address`。

而 `profile` 又要指向新的 `address`，所以 `profile` 也必须是新的。

### 5. 嵌套层级越深，更新成本越高

例如：

```text
company
  ↓
department
  ↓
team
  ↓
member
  ↓
settings
```

每次修改最深处都要逐层复制，代码会快速膨胀。

这通常是一个 State 建模信号：

> 如果业务对象非常深，而且频繁更新深层字段，应考虑是否可以把 State 设计得更扁平。

### 6. “扁平化”不是把所有字段都拆成 useState

扁平化思维不是机械地：

```text
一个字段 = 一个 useState
```

而是减少无必要的深层嵌套和重复数据。

例如可以考虑把：

```js
{
  selectedUser: {
    id: 1,
    name: 'Ada',
    ...很多重复字段
  }
}
```

改成只保存：

```js
{
  selectedUserId: 1
}
```

前提是其他数据已经有可靠来源。

### 7. 本节不引入 Immer

第三方工具可以减少多层 spread，但本节先掌握原理：

```text
旧 State 不改
更新路径逐层复制
最终得到新的根 State
```

只有先理解这个模型，后面使用抽象工具才不会失去判断能力。

---

## 动手编码：从 0 到 1

### 第 0 步：创建嵌套 State

```jsx
const [profile, setProfile] = useState({
  name: 'Ada',
  address: {
    city: 'London',
    country: 'UK'
  }
});
```

### 第 1 步：先更新第一层 name

第一层很简单：

```jsx
function handleNameChange(event) {
  setProfile({
    ...profile,
    name: event.target.value
  });
}
```

### 第 2 步：尝试只复制外层

下面代码不要保留到最终源码：

```js
const nextProfile = { ...profile };
nextProfile.address.city = 'Paris';
```

思考：

```text
address 是否还是同一个对象？
```

答案是“是”。

### 第 3 步：正确更新 city

```jsx
function handleCityChange(event) {
  setProfile({
    ...profile,
    address: {
      ...profile.address,
      city: event.target.value
    }
  });
}
```

### 第 4 步：正确更新 country

同样：

```jsx
function handleCountryChange(event) {
  setProfile({
    ...profile,
    address: {
      ...profile.address,
      country: event.target.value
    }
  });
}
```

### 第 5 步：加 JSON 预览

```jsx
<pre>{JSON.stringify(profile, null, 2)}</pre>
```

修改三个输入框，确认完整结构始终存在。

### 第 6 步：画出更新路径

修改城市时：

```text
city
 ↓
new address
 ↓
new profile
 ↓
setProfile
```

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：嵌套 spread，沿更新路径创建新对象。
- **实验辅助代码**：表单和 JSON 预览用于观察结构。

## 运行案例

```bash
npm run dev -- ./05-state-basics-object-array-updates/kp047-nested-state-design --config ./vite.config.js
```

## 效果验证

1. 修改 name 时只需要复制最外层。
2. 修改 city/country 时需要同时复制 `address` 和 `profile`。
3. 能证明 `{ ...profile }` 不会深拷贝 `profile.address`。
4. 最终源码没有直接修改 `profile.address.city`。
5. 能解释为什么深层嵌套会增加 State 更新和维护成本。

完成后继续 **RE-KP048：函数式更新**。
