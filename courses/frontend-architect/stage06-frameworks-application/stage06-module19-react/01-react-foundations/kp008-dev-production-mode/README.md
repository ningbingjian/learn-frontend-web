# RE-KP008：开发模式与生产模式差异

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分开发服务器、生产构建和本地生产预览三个阶段。
2. 理解 Development Mode 更强调错误提示、调试和快速反馈，Production Build 更强调可交付产物与运行效率。
3. 会读取 Vite 的 `import.meta.env.MODE`、`DEV`、`PROD`。
4. 知道 Vite 的 mode 与 `NODE_ENV` 是相关但不同的概念。
5. 知道 `vite preview` 只是本地预览生产构建结果，不是推荐的正式生产服务器。
6. 能解释为什么“开发环境正常”不等于“生产构建一定正常”。

> **本节核心代码**：`import.meta.env.MODE`、`import.meta.env.DEV`、`import.meta.env.PROD` 以及 `dev → build → preview` 的对照。
>
> **实验辅助代码**：`StrictMode`、页面列表和提示文字只用于把两种模式显示出来，不是本节要深入学习的 React API。

## 理论讲解

### 1. 同一个 React 项目为什么要区分开发和生产

开发阶段最需要的是：

```text
修改代码后尽快看到结果
错误信息尽可能清楚
保留调试能力
尽早暴露不安全写法
```

真正交付给用户时更关注：

```text
产物体积
加载效率
运行性能
去掉只服务于开发者的检查与提示
```

因此现代前端工程天然存在两套目标不同的执行环境。

### 2. Vite 的三条命令不要混为一谈

课程模块共享：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

可以先记成：

```text
vite / npm run dev
开发服务器
直接服务开发中的模块
支持 HMR / Fast Refresh

vite build / npm run build
生产构建
生成 dist/ 静态产物

vite preview / npm run preview
本地启动一个服务器预览 dist/
用于检查生产构建结果
```

`preview` 的重点是“预览刚刚 build 出来的结果”，不是“以后线上就运行这个命令”。

### 3. `import.meta.env.DEV` 与 `PROD`

Vite 为源码暴露：

```js
import.meta.env.MODE
import.meta.env.DEV
import.meta.env.PROD
```

开发服务器默认处于 development mode，标准 `vite build` 默认以 production mode 构建。

例如：

```js
if (import.meta.env.DEV) {
  console.log('development diagnostics');
}
```

生产构建时这些常量会被静态替换，因此只在开发模式成立的代码分支有机会被构建优化移除。

### 4. Mode 和 `NODE_ENV` 不是完全相同的概念

不要直接写出：

```text
Vite mode === NODE_ENV
```

Vite 的 mode 用来选择 `.env.[mode]` 等配置；`NODE_ENV` 则影响 development / production 语义。大多数默认命令下它们看起来一致，但使用 `--mode staging` 等自定义模式后，两者必须分开理解。

现阶段只需要知道：

```text
mode
工程环境命名与 env 文件选择

DEV / PROD
当前构建是否处于开发/生产语义
```

### 5. React 在开发环境会做额外工作

React 的一些检查只服务于开发阶段。例如 `StrictMode` 会开启额外的 development-only checks，用来更早发现不纯渲染、Effect 清理等问题。

因此以后遇到：

```text
开发环境日志更多
某些函数开发时看起来执行额外次数
生产构建表现不同
```

不要第一反应就是“React 生产环境也会重复执行”。先判断这是不是开发期检查。

### 6. 为什么必须真正执行一次 build

开发服务器能运行，只证明：

```text
开发链路可用
```

但生产构建还可能暴露：

- 只在构建阶段出现的模块解析问题。
- 环境变量配置错误。
- 动态路径或资源引用问题。
- 生产代码分支错误。
- 部署 base path 问题。

所以真实项目至少要把：

```text
dev
build
preview / 部署验证
```

当成三个不同检查点。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们让同一份 React 源码在开发服务器和生产构建中显示不同的环境信息。

### 第 1 步：创建最小 HTML Root

创建 `index.html`：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 2 步：读取 Vite 当前模式

创建 `src/main.jsx`，先写：

```jsx
const modeFacts = [
  ['MODE', import.meta.env.MODE],
  ['DEV', String(import.meta.env.DEV)],
  ['PROD', String(import.meta.env.PROD)],
];
```

本步目标是把抽象环境变量变成页面上可见的数据。

### 第 3 步：根据 DEV / PROD 输出不同内容

加入：

```jsx
{import.meta.env.DEV ? (
  <p>当前是开发环境</p>
) : (
  <p>当前是生产构建</p>
)}
```

为什么这样写？

因为只有真正跑 dev/build 两套链路，才能看到同一源码如何得到不同常量值。

### 第 4 步：用开发服务器运行

在 React 模块根目录执行：

```bash
npm run dev -- ./01-react-foundations/kp008-dev-production-mode --config ./vite.config.js
```

页面应该显示类似：

```text
MODE: development
DEV: true
PROD: false
```

### 第 5 步：执行生产构建

停止开发服务器后执行：

```bash
npm run build -- ./01-react-foundations/kp008-dev-production-mode --config ./vite.config.js
```

当前知识点会生成 `dist/`。

### 第 6 步：预览生产构建

执行：

```bash
npm run preview -- ./01-react-foundations/kp008-dev-production-mode --config ./vite.config.js
```

打开预览地址，页面应显示生产语义：

```text
MODE: production
DEV: false
PROD: true
```

### 第 7 步：对照最终源码

最终源码见 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`import.meta.env.MODE / DEV / PROD` 和 dev/build/preview 三阶段。
- **实验辅助代码**：`StrictMode`、列表渲染和说明文案只负责让环境差异可观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./01-react-foundations/kp008-dev-production-mode --config ./vite.config.js
```

另开一次生产验证：

```bash
npm run build -- ./01-react-foundations/kp008-dev-production-mode --config ./vite.config.js
npm run preview -- ./01-react-foundations/kp008-dev-production-mode --config ./vite.config.js
```

## 效果验证

请亲手确认：

1. dev 下 `DEV=true`、`PROD=false`。
2. 标准 build + preview 下 `DEV=false`、`PROD=true`。
3. 能解释 `MODE` 与 `NODE_ENV` 为什么不能简单画等号。
4. 能解释 `preview` 为什么不等于正式生产部署方案。
5. 能说明 React `StrictMode` 的额外检查为什么属于开发期行为。
6. 以后发布前会单独验证生产 build，而不是只看开发服务器。
