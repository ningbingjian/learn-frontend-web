# RE-KP204：服务端与客户端输出一致性

> [返回 Chapter 21](../README.md)

## 学习目标

1. 理解“同一份初始数据”是 SSR/Hydration 首屏一致性的关键来源之一。
2. 学会把服务端使用的数据序列化给客户端，再用于首次 Hydration Render。
3. 区分“Hydration 首屏一致性”和“Hydration 之后客户端继续获取新数据”。

## 理论讲解

服务端如果使用库存 `7` 生成 HTML，而客户端首次 Render 立即使用库存 `6`，就会产生 mismatch。

常见生产模式是：

```text
server data
   ↓
render HTML
   ↓
serialize bootstrap data into document
   ↓
client reads same data
   ↓
hydrateRoot with same first-render inputs
```

Hydration 完成之后，再发起客户端请求获取更新数据是另一件事。

## 动手编码：从 0 到 1

### 第 1 步：定义 Server 初始数据

```js
const serverData = {
  productName: 'React 19.2 课程',
  inventory: 7,
};
```

### 第 2 步：服务端使用它生成 HTML

```jsx
const serverHtml = renderToString(<ProductPanel data={serverData} />);
```

### 第 3 步：把同一份数据序列化进 bootstrap script

```js
bootstrapDataElement.textContent = JSON.stringify(serverData);
```

### 第 4 步：客户端读取序列化数据

```js
const clientInitialData = JSON.parse(bootstrapDataElement.textContent);
```

### 第 5 步：Hydration 首次 Render 使用 clientInitialData

```jsx
hydrateRoot(root, <ProductPanel data={clientInitialData} />);
```

预期：不会因为数据不同而触发 Hydration Mismatch。

## 运行案例

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## 效果验证

1. 页面显示 Server JSON 和 Client bootstrap JSON 完全一致。
2. `Recoverable hydration error` 保持 `none`。
3. 点击按钮后本地交互 State 正常变化，说明 Hydration 已完成。
4. 重点不是“永远不能更新数据”，而是第一次客户端 Render 必须与 Server HTML 使用相同事实基线。

## 本节核心代码

- 服务端 HTML 与客户端首次 Render 共用一份可序列化初始数据。
- 服务端数据必须安全序列化；真实项目应避免把敏感信息或可破坏 `<script>` 边界的原始字符串直接拼进去。
- 首屏一致之后，客户端可以继续正常更新 State/数据。

## 实验辅助代码

- `type="application/json"` 的 script 仅作为教学版 bootstrap data 容器。
- 本课数据是固定安全常量，未演示复杂生产序列化器。

[查看最终源码](./src/main.jsx)
