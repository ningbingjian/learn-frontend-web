# KP100：选择控件的选型边界

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 在 select、radio、checkbox、多选 select 之间做场景选择。
2. 理解“单选”和“多选”只是第一层判断。
3. 根据选项数量、比较需求、屏幕空间和可发现性选择控件。
4. 理解原生控件与自定义选择组件的成本差异。
5. 在保持表单语义的前提下设计稳定提交值。

## 理论讲解

### 1. 先判断：单选还是多选

最基本分支：

```text
用户能选几个？
├── 只能选一个
│   ├── radio
│   └── select
└── 可以选多个
    ├── checkbox
    └── multiple select
```

但真正的选型还要继续判断。

### 2. radio：少量、互斥、需要直接比较

适合：

- 套餐：月付 / 年付
- 配送方式：普通 / 加急
- 是否开票：是 / 否

优点：

- 所有选项同时可见
- 比较成本低
- 当前选择一眼可见

代价：

- 占空间
- 选项很多时页面会很长

一个实用经验：如果只有 2～5 个稳定选项，而且用户经常需要比较，radio 往往比 select 更直接。

### 3. select：单选项多，或者页面空间有限

适合：

- 国家 / 地区
- 城市
- 部门
- 较长枚举

优点：

- 收起时节省空间
- 原生平台选择体验成熟

代价：

- 用户看不到所有选项
- 比较多个选项要反复展开

所以“只有两个选项也统一用 select”通常不是最佳体验。

### 4. checkbox：独立开关或少量多选

两类常见场景：

独立布尔项：

```text
☑ 订阅周报
```

多选集合：

```text
☑ HTML
☑ CSS
☐ JavaScript
```

如果选项之间互不排斥，checkbox 的语义最自然。

### 5. multiple select：技术上可行，但交互发现性要谨慎

```html
<select multiple>
```

桌面端可能需要 Ctrl / Cmd / Shift 等平台交互知识，移动端表现又不同。

它并非错误，但对于普通用户的少量多选，checkbox 往往更容易理解。

multiple select 更适合：

- 选项较多
- 界面必须压缩空间
- 用户群熟悉这种交互

### 6. 不要为了视觉一致性轻易重写原生 select

自定义下拉组件需要自己处理：

- 键盘导航
- 焦点管理
- 可访问名称
- 展开 / 收起状态
- 选项角色
- 滚动定位
- 输入法
- 移动端行为
- 高对比度

如果原生控件已经能满足需求，优先原生。

### 7. 数据值必须稳定

无论视觉控件是什么，提交给服务端的业务值都应该稳定：

```html
<input type="radio" name="billing" value="monthly">
<select name="country">
  <option value="CN">中国</option>
</select>
```

不要让后端依赖纯展示文本。

### 8. 一个简单决策表

| 场景 | 优先控件 |
|---|---|
| 少量单选、需要比较 | radio |
| 大量单选、节省空间 | select |
| 单个开关 | checkbox |
| 少量多选 | checkbox 组 |
| 大量多选且用户熟悉 | multiple select |
| 超复杂搜索选择 | 原生能力不足时再考虑渐进增强 / 自定义 |

## 动手编码：从 0 到 1

### 第 1 步：构造三个真实业务问题

案例包含：

1. 账单周期：2 个单选项
2. 国家：多个单选项
3. 技能：多个可同时选择的项

### 第 2 步：账单周期使用 radio

```html
<fieldset>
  <legend>账单周期</legend>
  <label><input type="radio" name="billing" value="monthly" checked> 月付</label>
  <label><input type="radio" name="billing" value="yearly"> 年付</label>
</fieldset>
```

**为什么不用 select**：只有两个选项，而且用户需要直接比较价格策略。

### 第 3 步：国家使用 select

```html
<label for="country">国家 / 地区</label>
<select id="country" name="country">
  <option value="CN">中国</option>
  <option value="SG">新加坡</option>
  <option value="JP">日本</option>
  <option value="US">美国</option>
</select>
```

### 第 4 步：技能使用 checkbox

```html
<label><input type="checkbox" name="skill" value="html"> HTML</label>
<label><input type="checkbox" name="skill" value="css"> CSS</label>
<label><input type="checkbox" name="skill" value="javascript"> JavaScript</label>
```

### 第 5 步：保留 multiple select 对照实验

案例额外放一个“紧凑版技能选择” multiple select，帮助比较交互差异。

这不是推荐“全部改成 multiple select”，而是为了让你亲手体验其可发现性问题。

### 第 6 步：输出提交数据和控件数量

JavaScript 会输出：

- billing
- country
- checkbox skills
- multiple select skills
- 页面上每种选择控件的数量

最终源码：[`index.html`](./index.html)

**本节核心代码**：radio、select、checkbox、multiple select 的结构和稳定业务 value。

**实验辅助代码**：仅用于实时输出 FormData、对比不同控件结果的 JavaScript 和 CSS。

## 运行案例

直接打开 `index.html`，完成四组选择后观察输出。

重点体验：

1. radio 是否能立即看见全部账单选项。
2. select 是否更节省国家列表空间。
3. checkbox 多选是否直观。
4. multiple select 在你的平台上如何执行多选。

## 效果验证

你应该能够回答：

- [ ] 为什么两个互斥选项通常优先 radio？
- [ ] 为什么长枚举更适合 select？
- [ ] checkbox 为什么适合独立开关与少量多选？
- [ ] multiple select 有哪些发现性问题？
- [ ] 为什么不应仅为了 UI 风格就重写原生 select？
- [ ] 为什么显示文本和业务 value 应分离？
