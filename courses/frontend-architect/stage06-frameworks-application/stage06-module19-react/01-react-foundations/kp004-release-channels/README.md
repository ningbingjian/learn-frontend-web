# RE-KP004：React 19.2.x 稳定线与 Canary / Experimental 渠道

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 React 的 Latest / Stable、Canary、Experimental 三类发布渠道。
2. 知道 Stable 使用语义化版本，Canary 与 Experimental 不应按普通 SemVer 稳定性理解。
3. 理解普通面向用户的 React 应用为什么默认选择 Latest / Stable。
4. 知道 Canary 更适合框架、库、工具链等经过控制并固定版本的集成场景。
5. 知道 Experimental 仅用于实验和验证，不能把实验 API 当成稳定业务契约。
6. 能读取 `React.version` 并通过版本字符串建立最基本的渠道识别能力。

> **本节核心知识**：发布渠道的稳定性承诺与适用场景，而不是记住某一个补丁号。
>
> **实验辅助代码**：`React.version`、字符串判断函数、示例版本号和 Vite 只用于观察版本渠道，本节不深入 npm 版本解析实现。

## 理论讲解

### 1. 本课程当前版本基线

本课程在 **2026-08** 的 React 稳定主线设为：

```text
React 19.2.x
```

截至 **2026-08-25**，React GitHub Releases 中最新稳定补丁为：

```text
19.2.8
发布时间：2026-07-21
```

为什么课程写“19.2.x”而不是把所有知识点标题都绑定到 `19.2.8`？

因为课程真正关注的是：

```text
19.2 这一稳定能力线
```

补丁版本通常用于修复 Bug、安全问题和兼容问题，不应该让每一节基础知识都随补丁号重命名。

但是实际项目仍应关注最新安全修复并及时升级补丁。

### 2. Latest / Stable：普通业务应用默认选择

React 官方版本策略中，Stable 也称为 **Latest channel**。

它的特点：

```text
遵循 SemVer
经过高等级测试
npm 默认 latest 标签
适合直接面向真实用户的应用
```

SemVer 版本：

```text
x.y.z
│ │ └── patch：修复
│ └──── minor：新能力 / 非破坏改进
└────── major：破坏性变更
```

例如：

```text
19.2.8
```

如果你只是开发普通业务 React 应用，不确定应该选哪个渠道：

> 默认选 Latest / Stable。

### 3. Canary：更靠近 React 主分支的预发布渠道

Canary 会跟踪 React 源码主分支，更新频率高于 Stable。

版本字符串通常带：

```text
canary
```

类似：

```text
19.3.0-canary-<hash>-<date>
```

Canary 的主要特点：

```text
比 Stable 更早获得接近完成的新能力
不遵循普通 Stable SemVer 稳定承诺
不同 Canary 版本之间可能有破坏性变化
使用时应固定具体版本
```

React 官方对 Canary 有明确的使用场景：

```text
Framework
Library
Developer Tooling
集成测试
经过策划和控制的发布环境
```

所以 Canary 不是简单的：

```text
Stable 的“更高级版本”
```

它是不同发布策略。

### 4. 为什么 Framework 有时会使用 Canary

某些 React 新能力需要：

```text
React
+ Router
+ Bundler
+ Server Runtime
+ Framework Integration
```

一起配合。

Framework 团队可能希望在 React 下一个 Stable 发布前，就对接接近稳定的新能力。

因此可以：

```text
固定一个经过测试的 Canary 版本
        ↓
Framework 自己完成集成测试
        ↓
按 Framework 的发布节奏交付
```

关键不是“用了 Canary”，而是：

> 有人对这个固定版本组合负责测试、升级和回归。

普通业务项目直接跟随最新 Canary，却没有这样的治理能力，风险通常不值得。

### 5. Experimental：实验渠道

Experimental 比 Canary 的稳定承诺更低。

版本通常类似：

```text
0.0.0-experimental-<hash>-<date>
```

它会开启额外实验性 Feature Flag，里面的能力可能：

```text
API 大幅调整
行为改变
最终换名字
甚至永远不会进入 Stable
```

React 官方明确表示 Experimental 主要用于测试，**不要用于直接面向用户的生产应用**。

因此课程中如果提到实验 API，会明确标记：

```text
Experimental
```

而不会把它和正式稳定 API 混写。

### 6. 三个渠道对比

| 渠道 | 稳定性 | 版本特点 | 典型使用场景 |
|---|---|---|---|
| Latest / Stable | 最高 | SemVer | 普通生产应用 |
| Canary | 预发布 | hash + 日期，可能破坏变化 | Framework、Library、集成测试、固定版本环境 |
| Experimental | 最低 | `0.0.0-experimental-*` | 实验验证、研究 |

可以记成：

```text
Stable
业务默认
   ↓
Canary
受控的提前采用
   ↓
Experimental
实验验证
```

这不是“功能越来越强”的等级，而是“稳定承诺越来越低”。

### 7. 为什么必须区分“API 在哪里看到”与“API 是否稳定”

你可能从这些地方看到 React 新能力：

```text
React Blog
GitHub PR
Canary 文档
Conference Talk
RFC
社区文章
```

但：

```text
看到了
≠
已经进入 Stable
```

使用一个 API 前至少确认：

1. 当前 React Stable 文档里是否存在。
2. 它属于 Latest、Canary 还是 Experimental。
3. 目标 Framework 是否固定并支持对应 React 版本。
4. 版本升级是否有迁移说明。

### 8. `React.version` 可以告诉你当前实际安装版本

在运行时可以读取：

```js
React.version
```

例如：

```text
19.2.8
```

这能帮助你确认：

```text
项目 package.json 写了什么
      ↓
实际安装并运行的 React 是什么版本
```

但不要用 `React.version` 在业务代码中频繁做功能判断。

正常工程应通过依赖管理、升级策略和兼容测试管理版本，而不是在 UI 业务逻辑中写大量版本分支。

### 9. 课程为什么固定稳定线

学习仓库强调可重复验证。

如果每次安装都自动追逐 Canary：

```text
今天案例能运行
明天 Canary 行为变化
后天 API 改名
```

课程内容会非常不稳定。

所以当前课程策略是：

```text
基础课程
以 Stable 19.2.x 为主

Canary
用于理解版本治理和少量框架集成背景

Experimental
只在明确的实验章节出现
```

### 10. 本节参考的官方来源

- React Versioning Policy：`https://react.dev/community/versioning-policy`
- React Versions：`https://react.dev/versions`
- React GitHub Releases：`https://github.com/facebook/react/releases`

版本信息会随时间变化，因此学习时应重新检查官方来源，而不是永久记忆本节写下的补丁号。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们做两个实验：

1. 读取当前项目实际运行的 `React.version`。
2. 对几种示例版本字符串做最小渠道分类。

### 第 1 步：进入共享 React 环境

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次学习：

```bash
npm install
```

### 第 2 步：准备 HTML Root

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RE-KP004：React 发布渠道</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 第 3 步：读取实际 React 版本

在 `src/main.jsx` 中：

```js
import React from 'react';

console.log(React.version);
```

运行后先记录当前版本。

这个值来自真正安装到当前项目里的 React，而不是课程文档里的文字。

### 第 4 步：写最小渠道识别函数

加入：

```js
function detectChannel(version) {
  if (version.includes('experimental')) {
    return 'Experimental';
  }

  if (version.includes('canary')) {
    return 'Canary';
  }

  return 'Latest / Stable';
}
```

这个函数不是完整的 npm SemVer 解析器。

它只是为了把本节最重要的版本字符串特征变成一个可观察实验。

### 第 5 步：分类当前安装版本

执行：

```js
detectChannel(React.version)
```

如果当前使用课程 Stable 依赖，应得到：

```text
Latest / Stable
```

### 第 6 步：加入三类示例版本

准备：

```js
const samples = [
  '19.2.8',
  '19.3.0-canary-example-20260801',
  '0.0.0-experimental-example-20260801',
];
```

然后依次分类。

观察：

```text
19.2.8
→ Stable

...-canary-...
→ Canary

0.0.0-experimental-...
→ Experimental
```

### 第 7 步：把“稳定性”一起显示

页面不要只展示渠道名称，还要写：

```text
推荐对象
是否默认用于业务生产
是否需要固定版本
```

这样可以避免形成“会识别字符串但不知道为什么”的机械知识。

### 第 8 步：对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节区分：

- **核心知识**：Latest / Stable、Canary、Experimental 的承诺与适用边界。
- **实验辅助代码**：`React.version` 和简化 `detectChannel()`。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

```bash
npm run dev -- ./01-react-foundations/kp004-release-channels --config ./vite.config.js
```

## 效果验证

完成本节后，请确认：

1. 能说出普通业务项目默认选择 Latest / Stable 的原因。
2. 知道 Stable 遵循 SemVer。
3. 知道 Canary 适合受控、固定版本、充分测试的提前集成场景。
4. 知道 Experimental 不提供生产稳定性保证。
5. 能通过 `React.version` 查看实际 React 版本。
6. 不会因为看到一个新 React API 的文章，就默认它已经进入 Stable。
7. 知道版本补丁号是时间敏感信息，需要重新查官方来源。

完成后继续学习 **RE-KP005：React Compiler 1.0 已稳定的版本认知**。
