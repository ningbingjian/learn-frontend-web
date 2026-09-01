# RE-KP122：在 Render 中计算派生数据

> [返回 Chapter 13](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | 为什么 filteredItems/fullName/total 这类值通常不应该再存 State？ |
| Learning Artifact | Derived State Effect → Render Calculation 重构 |

## 先制造双 Source
```jsx
const [visible, setVisible] = useState([]);
useEffect(() => setVisible(filter(items, query)), [items, query]);
```
现在 `items/query/visible` 谁才是真实来源？

## 动手重构
### Step 0：运行旧版本
观察输入变化后需要 Effect 再 setState。
### Step 1：删除 visible State
```jsx
const visible = filter(items, query);
```
### Step 2：如果计算确实昂贵
先测量，再考虑 `useMemo`；不要因此改回 Effect。

[查看最终源码](./src/main.jsx)

## 理论收束
派生数据是现有 Props/State 的函数，应在 Render 计算，保证同一次 Render 内事实一致。

## Wrong Way
- 保存任何能推导的列表/总数。
- 用 Effect 修“同步”自己复制的数据。
- 没测量就 memo 所有计算。

## Production Boundary
大型过滤/排序可能需要性能优化，但数据模型仍应保持单一来源。

## 本课只记住 3 件事
1. 可推导就不重复存 State。
2. Render 计算保持一致性。
3. 性能优化与数据建模分开。

## Challenge
把购物车 total 从 State 改为 Render 派生。

## Mastery Check
- **Must**：会识别 Derived State。
- **Should**：能区分 useMemo 与 Effect。
- **Expert**：能减少复杂页面的同步 State 网络。
