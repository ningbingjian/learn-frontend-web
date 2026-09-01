# 卷 01～09：从完全零基础到 TypeScript 类型架构

> 覆盖 Stage 01～27。  
> 目标：建立不依赖框架的 Web、HTML、CSS、JavaScript、浏览器调试和 TypeScript 基础。

---

# 卷 01：计算机、终端、编辑器与 Git

## Stage 01：计算机、操作系统与文件系统入门

**目标**：不再把开发环境当作黑盒，能够独立管理项目文件、运行程序并处理最常见的本机问题。

**模块**：

1. **计算机基本模型**：CPU、内存、磁盘、进程、线程、文件、网络接口分别负责什么；程序从磁盘加载到内存再被 CPU 执行的最小模型。
2. **操作系统与目录**：用户目录、系统目录、应用目录、隐藏文件、文件扩展名、绝对路径、相对路径、当前目录、父目录、路径分隔符。
3. **文本基础**：纯文本与二进制、UTF-8、乱码原因、换行符、BOM、文件编码、大小写敏感、文件权限。
4. **终端基础**：`pwd`、`ls`、`cd`、`mkdir`、`touch`、`cp`、`mv`、`rm`、`cat`、`less`、`head`、`tail`、`grep`、`find`；通配符、引号、管道、重定向和退出码。
5. **进程与端口**：前台与后台进程、PID、`ps`、`kill`、`lsof`、`localhost`、端口冲突、环境变量与 `PATH`。
6. **安全操作习惯**：危险删除命令、备份、可恢复删除、最小权限、不要把密钥放入普通文本或仓库。

**实践与证据**：创建标准学习工作区；用终端完成目录和文件操作；启动一个本地 HTTP 服务；主动制造“路径错误、命令不存在、端口被占用、权限不足”四类问题并记录修复过程。

**阶段门槛**：不依赖图形界面，能从任意目录定位项目、运行程序、识别当前进程和端口，并解释错误发生在哪一层。

## Stage 02：编辑器、浏览器与开发工具

**目标**：建立“编辑—运行—观察—调试—修复”的最小开发闭环。

**模块**：

1. **编辑器工作区**：文件树、标签页、搜索、替换、多光标、格式化、代码折叠、快捷键、项目级配置和用户级配置。
2. **语法与诊断**：语法高亮、语言服务、自动补全、跳转定义、重命名、格式化器、Linter、错误与警告的区别。
3. **浏览器运行模型初识**：地址栏、页面、标签页、刷新、强制刷新、缓存、隐私窗口、浏览器配置文件。
4. **DevTools 全景**：Elements、Styles、Computed、Console、Sources、Network、Application、Performance、Memory、Lighthouse 与 Accessibility 面板各解决什么问题。
5. **JavaScript 运行环境**：浏览器 JavaScript 与 Node.js 的区别；Node.js、包管理器、版本管理、脚本命令的最小使用方式。
6. **技术文档能力**：Markdown 标题、列表、代码块、链接、表格、图片、目录；README 的目标、前置条件、运行步骤和验证方式。

**实践与证据**：从空目录创建 `index.html`、`style.css`、`main.js`；在浏览器中运行；通过 Elements 修改 DOM 和 CSS；在 Sources 设置断点；在 Network 识别页面和静态资源请求；写出可复现的 README。

**阶段门槛**：能区分编辑器报错、终端报错、浏览器控制台报错、网络错误和页面样式问题，不再用“页面坏了”笼统描述故障。

## Stage 03：Git、GitHub 与协作基础

**目标**：让每一步学习都有可追踪历史，并具备最基本的团队协作能力。

**模块**：

1. **Git 对象和区域**：工作区、暂存区、本地仓库、Commit、Blob、Tree、HEAD 的直观模型。
2. **日常命令**：`init`、`status`、`add`、`commit`、`log`、`diff`、`show`、`restore`、`revert`；什么时候不能直接使用危险的 `reset --hard`。
3. **分支协作**：branch、switch、merge、rebase 的用途；快进合并、合并提交、冲突产生和解决。
4. **远程仓库**：remote、clone、fetch、pull、push、upstream；本地分支与远程跟踪分支。
5. **GitHub 工作流**：Issue、Branch、Pull Request、Review、Conversation、Checks、Merge、Release。
6. **提交质量**：原子提交、清晰 Commit Message、Conventional Commits、`.gitignore`、Tag、Changelog、不要提交密钥和大体积构建产物。

**实践与证据**：创建功能分支；完成至少 5 个原子提交；制造并解决一次冲突；提交 PR；对自己的 PR 做 Review；使用 `revert` 安全撤销错误提交。

**阶段门槛**：能够从 `git log` 和 `git diff` 解释一次修改的原因、范围和结果，并在不破坏主分支历史的情况下修复错误。

---

# 卷 02：互联网、HTTP 与 Web 心智模型

## Stage 04：互联网、地址与连接

**目标**：知道浏览器访问一个网址时，请求如何找到目标服务器。

**模块**：

1. **互联网结构**：终端、局域网、路由器、运营商、自治系统、数据中心、云、源站、代理和 CDN。
2. **地址系统**：URL 的 scheme、host、port、path、query、fragment；域名、IP、IPv4、IPv6、私网地址、NAT 和端口。
3. **DNS**：递归解析、权威服务器、A/AAAA/CNAME 记录、TTL、缓存、DNS 失败和域名污染的基本概念。
4. **传输层直觉**：TCP 连接、可靠传输、UDP、QUIC；连接建立、丢包、重传、延迟和带宽。
5. **TLS 初识**：HTTPS 为什么需要证书；身份验证、密钥协商和加密传输的直观过程。
6. **常用诊断工具**：`curl`、`ping`、`traceroute`、`dig`/`nslookup`、浏览器 Security 面板和 Network Timing。

**实践与证据**：拆解 10 个不同 URL；查询域名 DNS；使用 `curl -v` 查看连接与响应；比较本地服务、IP 访问、域名访问和 HTTPS 访问的差异；画出一次访问的路径图。

**阶段门槛**：能区分 DNS 失败、连接失败、TLS 失败、HTTP 错误和前端页面错误。

## Stage 05：HTTP 请求与响应

**目标**：能够完整阅读一次浏览器请求，不再只关注响应 JSON。

**模块**：

1. **报文结构**：请求行、状态行、Header、Body；方法、路径、协议版本和状态码。
2. **方法语义**：GET、HEAD、POST、PUT、PATCH、DELETE、OPTIONS；安全性、幂等性和重试影响。
3. **状态码体系**：1xx、2xx、3xx、4xx、5xx；常见重定向、缓存命中、鉴权失败、限流和网关错误。
4. **内容表达**：`Content-Type`、字符集、JSON、HTML、表单、Multipart、二进制、压缩和内容协商。
5. **状态与缓存初识**：Cookie、Session、`Cache-Control`、ETag、Last-Modified、浏览器缓存和中间缓存。
6. **Network Waterfall**：Queueing、DNS、Connect、SSL、TTFB、Download；请求优先级和阻塞关系。

**实践与证据**：用 DevTools 保存 HAR；用 `curl` 构造 GET/POST/Header/Cookie 请求；实现一个返回 HTML、JSON 和错误状态的本地服务；解释 Waterfall 中每个阶段。

**阶段门槛**：面对接口失败，能给出方法、URL、状态码、请求头、响应头、请求体、响应体和时间信息，而不是只截图一句报错。

## Stage 06：Web 应用形态与系统全景

**目标**：建立从浏览器页面到后端、CDN 和部署环境的整体结构。

**模块**：

1. **应用形态**：静态网站、MPA、SPA、SSR、SSG、混合渲染、PWA、桌面壳和跨端应用。
2. **系统角色**：浏览器、Web Server、应用服务器、API、BFF、数据库、对象存储、消息系统、搜索、CDN。
3. **资源与路由**：文档导航、客户端路由、服务端路由、静态资源路径、API 路径和 404 的不同来源。
4. **浏览器边界**：同源、沙箱、进程隔离、权限、用户代理和浏览器兼容的基本概念。
5. **Web 标准**：WHATWG、W3C、ECMA、TC39、浏览器厂商、MDN 与 Web Platform Baseline 的角色。
6. **架构表达入门**：System Context、Container、请求时序图、数据流图；先表达事实，再讨论技术选型。

**实践与证据**：对一个常见网站画系统上下文图和页面加载时序；分别搭建静态站点和最小 SPA；比较刷新、路由、SEO、缓存和部署差异。

**阶段门槛**：能够解释“代码运行在哪里、HTML 在哪里生成、路由由谁处理、数据从哪里来、静态资源由谁提供”。

---

# 卷 03：HTML、语义、表单与基础可访问性

## Stage 07：HTML 文档骨架与语义内容

**目标**：使用 HTML 表达内容结构，而不是把所有东西写成 `div`。

**模块**：

1. **文档骨架**：DOCTYPE、`html`、`head`、`body`、语言、字符集、Viewport、Title、Meta。
2. **文本语义**：标题层级、段落、强调、重要、引用、代码、时间、缩写、上下标和分隔。
3. **页面地标**：`header`、`nav`、`main`、`article`、`section`、`aside`、`footer` 的职责和嵌套边界。
4. **导航与引用**：相对 URL、绝对 URL、锚点、下载、外链安全、列表、描述列表和面包屑。
5. **图片语义**：`img`、`alt`、`figure`、`figcaption`；内容图片、装饰图片和功能图片。
6. **解析与容错**：HTML Token、DOM Tree、隐式闭合、错误嵌套、浏览器自动修复以及查看真实 DOM。

**实践与证据**：从纯文本需求建立语义页面；查看 DOM Tree；故意写出错误嵌套并观察浏览器修复；使用 HTML Validator 处理错误。

**阶段门槛**：在不看 CSS 的情况下，页面结构仍然有合理阅读顺序和标题层级。

## Stage 08：表单、表格、媒体与嵌入内容

**目标**：能够构建可提交、可验证、可键盘操作的复杂输入界面。

**模块**：

1. **表单模型**：`form`、action、method、name/value、提交、重置、GET 与 POST 表单。
2. **输入控件**：文本、密码、邮箱、数字、日期、范围、颜色、Checkbox、Radio、Select、Textarea、File。
3. **表单语义**：`label`、`fieldset`、`legend`、`datalist`、`output`、帮助文本、错误信息和必填提示。
4. **原生校验与自动填充**：required、pattern、min/max、step、Validity API、autocomplete、移动端输入模式。
5. **数据表格**：caption、thead/tbody/tfoot、th、scope、复杂表头；布局表格为什么不可取。
6. **媒体与嵌入**：响应式图片、`picture`、`srcset`、`sizes`、音视频、字幕、Iframe、Lazy Loading 和嵌入安全初识。

**实践与证据**：实现注册、订单和文件上传表单；实现可访问数据表格；使用键盘完成所有操作；查看实际提交数据；验证不同输入类型在移动端的行为。

**阶段门槛**：表单不能只“看起来像”，必须有正确 Label、提交语义、错误反馈、自动填充和键盘路径。

## Stage 09：HTML 可访问性、SEO 与渐进增强

**目标**：让页面对搜索引擎、辅助技术、慢网络和功能受限环境都更可靠。

**模块**：

1. **Accessibility Tree**：DOM、可访问性树、Role、Name、State、Value 的关系。
2. **原生语义优先**：Button 与可点击 Div、Link 与 Button、Heading、Landmark；ARIA 的第一规则和常见误用。
3. **焦点与键盘**：Tab 顺序、可见焦点、Skip Link、Dialog 焦点管理、快捷键冲突和焦点陷阱。
4. **SEO 基础**：Title、Description、Canonical、Robots、Sitemap、Open Graph、结构化数据和可抓取链接。
5. **渐进增强**：核心功能先由 HTML 保证；JavaScript 失败、CSS 失败、图片失败和慢网络下的退化体验。
6. **内容安全边界**：用户输入、富文本、`innerHTML`、Iframe、外部链接和第三方嵌入的风险意识。

**实践与证据**：使用屏幕阅读器或浏览器 Accessibility 面板检查页面；关闭 CSS/JavaScript 验证核心内容；运行基础 SEO/A11Y 审计；修复错误 Role 和焦点顺序。

**阶段门槛**：提交一份语义、键盘、Accessibility Tree、SEO 和降级能力检查报告。

---

# 卷 04：CSS 基础、布局与响应式

## Stage 10：CSS 语法、层叠与盒模型

**目标**：能解释一个样式为什么生效或不生效，而不是不断提高选择器权重。

**模块**：

1. **规则结构**：Selector、Declaration、Property、Value、At-rule、注释和无效声明。
2. **选择器**：类型、类、ID、属性、组合器、伪类、伪元素、`:is()`、`:where()`、`:not()`、`:has()` 的基础使用。
3. **层叠算法**：来源、重要性、Cascade Layer、Specificity、Scope、源码顺序；继承、初始值和计算值。
4. **盒模型**：Content、Padding、Border、Margin、`box-sizing`、Margin Collapse 和尺寸计算。
5. **值与单位**：px、%、em、rem、vw/vh、动态视口单位、颜色、函数、`calc()`、`min()`、`max()`、`clamp()`。
6. **调试方法**：Styles、Computed、Box Model、Matched Rules、被覆盖声明和无效值。

**实践与证据**：完成层叠冲突实验；解释 20 个样式覆盖案例；分别用 content-box 和 border-box 计算实际尺寸；提交 DevTools 截图与结论。

**阶段门槛**：任何样式冲突都能沿层叠算法定位，不通过滥用 `!important` 解决普通问题。

## Stage 11：普通流、定位、Flex 与 Grid

**目标**：能够依据布局问题选择正确机制，而不是用绝对定位堆页面。

**模块**：

1. **Formatting Context**：Block、Inline、Inline-block、Normal Flow、BFC、IFC 和格式化上下文的直观模型。
2. **定位系统**：static、relative、absolute、fixed、sticky；Containing Block、Offset 和滚动容器。
3. **层叠上下文**：z-index、Stacking Context 的创建条件、绘制顺序和“z-index 无效”排查。
4. **Flexbox**：主轴、交叉轴、Basis、Grow、Shrink、换行、对齐、最小尺寸陷阱和常见布局模式。
5. **Grid**：显式/隐式网格、Track、Line、Area、`fr`、`minmax()`、Auto-placement 和二维布局。
6. **Overflow 与滚动**：Overflow、Scrollbar、滚动容器、Sticky 失效、文本溢出和可滚动区域可访问性。

**实践与证据**：实现导航栏、卡片流、后台布局、复杂表单和 Dashboard；使用 Flex/Grid Overlay 调试；制造 Sticky 和 z-index 故障并修复。

**阶段门槛**：能用“包含块、格式化上下文、主轴/轨道、滚动容器、层叠上下文”解释布局行为。

## Stage 12：响应式、字体、颜色与视觉还原

**目标**：构建从小屏到大屏、从浅色到深色都稳定的页面。

**模块**：

1. **响应式策略**：Mobile First、Breakpoint、内容驱动断点、流式尺寸、媒体查询和设备特征。
2. **排版系统**：字体族、Web Font、字号、行高、字重、字距、段落节奏、Fallback、FOIT/FOUT。
3. **颜色与主题**：RGB/HSL/现代颜色空间、透明度、对比度、系统主题、`prefers-color-scheme`。
4. **图片与图标**：响应式图片、密度、裁剪、`object-fit`、SVG、Icon Font 的取舍和图标可访问性。
5. **视觉还原方法**：布局网格、Spacing Scale、Typography Scale、设计稿测量、像素误差和多尺寸验收。
6. **打印与特殊媒介**：Print Styles、强制颜色模式、高对比度、减少数据和减少运动偏好初识。

**实践与证据**：完成三断点产品官网；加入深色主题和打印样式；测量布局偏差；使用多设备模式和真实浏览器截图验收。

**阶段门槛**：页面不能只在一个固定宽度下正确，必须有明确的内容压缩、换行、隐藏、重排和触控策略。

---

# 卷 05：现代 CSS、动效与 CSS 架构

## Stage 13：现代布局与自适应组件

**目标**：从“页面响应式”进一步升级到“组件在未知容器中也能自适应”。

**模块**：

1. **Intrinsic Sizing**：min-content、max-content、fit-content、自动最小尺寸和内容驱动布局。
2. **Container Queries**：容器建立、尺寸查询、样式查询、容器单位和组件级响应式。
3. **Grid 深入**：Subgrid、Auto-fit/Auto-fill、Dense Packing、复杂 Track 和不规则 Dashboard。
4. **逻辑属性**：Inline/Block 方向、Writing Mode、RTL、Logical Margin/Padding/Border 和国际化布局。
5. **现代尺寸能力**：Aspect Ratio、Object Fit、Safe Area、动态视口、滚动吸附和多列布局。
6. **渐进采用**：Baseline、`@supports`、Fallback、Polyfill 成本和兼容矩阵。

**实践与证据**：构建无需媒体查询即可在侧栏、弹窗和主区域复用的卡片；实现 RTL；比较现代方案与旧兼容方案的复杂度。

**阶段门槛**：组件不能依赖页面固定宽度，必须证明在至少 5 种容器尺寸和两种书写方向下稳定。

## Stage 14：动画、交互反馈与渲染成本

**目标**：构建有意义、可访问、性能可控的动效。

**模块**：

1. **Transition 与 Transform**：可插值属性、Transform Matrix、Transform Origin、3D 空间和合成层直觉。
2. **Keyframes**：时间函数、方向、填充、迭代、暂停、组合和动画事件。
3. **交互状态**：Hover、Focus、Active、Disabled、Loading、Success、Error、Skeleton 和微交互。
4. **View Transition**：同文档与跨文档过渡的基本模型、共享元素、路由配合和降级。
5. **Scroll-driven Motion**：滚动时间线、视图时间线、进度驱动效果和避免滚动劫持。
6. **可访问与性能**：`prefers-reduced-motion`、眩晕风险、Layout/Paint/Composite 成本和主线程压力。

**实践与证据**：实现 Modal、Toast、列表进入、页面切换和滚动进度；用 Performance 面板对比 `top/left` 与 Transform 动画；加入 Reduced Motion。

**阶段门槛**：每个动画都能回答“服务什么交互目的、可否取消、是否触发布局、低性能设备如何退化”。

## Stage 15：CSS 架构、Token 与主题系统

**目标**：让样式能被多人长期维护，而不是只在一个页面中可用。

**模块**：

1. **组织方法比较**：BEM、OOCSS、SMACSS、ITCSS、Utility First、CSS Modules、CSS-in-JS 和零运行时方案。
2. **层叠治理**：Reset、Base、Object、Component、Utility、Cascade Layer、Scope 和第三方样式隔离。
3. **Design Token**：原始值、语义 Token、组件 Token；颜色、间距、排版、圆角、阴影、动效和层级。
4. **主题体系**：CSS Variables、主题继承、品牌主题、浅色/深色、高对比度、租户覆盖和运行时切换。
5. **样式质量**：Stylelint、命名约束、重复检测、未使用 CSS、Critical CSS、产物体积和浏览器目标。
6. **迁移策略**：全局 CSS 到模块化、旧组件到 Token、双轨运行、视觉回归和分阶段替换。

**实践与证据**：为主线项目建立 Token 与主题包；实现至少 3 个主题；提交 CSS 依赖图、命名规范、迁移 ADR 和视觉回归结果。

**阶段门槛**：新增主题时不复制整套组件 CSS；修改基础 Token 时能评估影响面并通过自动化发现回归。

---

# 卷 06：JavaScript 语言基础

## Stage 16：值、类型、表达式与控制流

**目标**：准确理解代码如何计算，不依赖试错猜结果。

**模块**：

1. **运行入口**：Script、Module、严格模式、解析错误与运行错误。
2. **值与类型**：Undefined、Null、Boolean、Number、BigInt、String、Symbol、Object；原始值与引用直觉。
3. **变量**：`let`、`const`、`var`、声明、初始化、赋值、命名、可变性和常量对象。
4. **运算与转换**：算术、比较、逻辑、空值合并、可选链、显式转换、隐式转换、Truthy/Falsy。
5. **相等性**：`==`、`===`、`Object.is`、NaN、正负零和对象引用。
6. **控制流**：条件、Switch、循环、Break/Continue、Early Return 和防御式分支。

**实践与证据**：完成类型与转换实验；为每个表达式先预测再运行；用断点观察变量；实现命令行或浏览器中的小型价格计算器。

**阶段门槛**：能解释常见隐式转换和边界值，不用死记某个案例答案。

## Stage 17：函数、作用域、闭包与 this

**目标**：掌握 JavaScript 最核心的复用和状态封装机制。

**模块**：

1. **函数形态**：声明、表达式、箭头函数、方法、立即执行函数和高阶函数。
2. **参数模型**：默认参数、Rest、Arguments、值传递、对象引用、返回值和多返回结果。
3. **作用域**：全局、模块、函数、块级作用域；词法作用域、遮蔽、提升和暂时性死区。
4. **闭包**：函数携带词法环境；私有状态、工厂函数、回调、缓存和错误闭包案例。
5. **`this`**：调用位置、普通函数、方法、构造调用、显式绑定、箭头函数和事件回调。
6. **函数设计**：纯函数、副作用、参数对象、Guard Clause、组合、可测试性和 API 可读性。

**实践与证据**：实现计数器工厂、缓存函数、事件回调和函数组合器；通过断点观察闭包变量；修复丢失 `this` 的案例。

**阶段门槛**：能够从调用方式推导 `this`，从定义位置推导作用域，并识别闭包带来的生命周期和内存影响。

## Stage 18：对象、集合、模块与错误处理

**目标**：用标准语言能力组织真实业务数据和代码边界。

**模块**：

1. **对象**：属性读写、动态键、可选链、解构、展开、浅拷贝、深拷贝边界和对象比较。
2. **数组**：遍历、Map/Filter/Reduce、查找、排序、分组、不可变更新和稀疏数组。
3. **集合与内建对象**：Map、Set、WeakMap、WeakSet、Date、Intl、RegExp、URL 和 URLSearchParams。
4. **序列化**：JSON 语法、`stringify`/`parse`、丢失类型、循环引用和数据边界。
5. **模块**：Export、Import、Default/Named、静态依赖、动态 Import、循环依赖初识。
6. **错误处理**：Error 类型、Throw、Try/Catch/Finally、错误 Cause、自定义错误、不要吞错和用户错误/系统错误区分。

**实践与证据**：实现数据转换工具库；处理日期、货币和 URL；拆分为 ES Modules；设计明确的错误类型；为边界值编写测试用例。

**阶段门槛**：模块对外 API 清晰，调用方能区分成功、业务失败、参数错误和系统异常。

---

# 卷 07：DOM、异步与原生 JavaScript 应用

## Stage 19：DOM、事件、表单与安全更新

**目标**：不依赖框架构建交互页面，并理解框架最终操作的浏览器对象。

**模块**：

1. **DOM 模型**：Document、Element、Text、Attribute、Node、Tree、Live Collection 与 Static List。
2. **查询和更新**：Selector、Traversal、创建、插入、替换、删除、Clone、Template、DocumentFragment。
3. **内容安全**：`textContent`、`innerHTML`、属性、URL、样式注入和用户内容转义的边界。
4. **事件系统**：捕获、目标、冒泡、默认行为、Propagation、委托、Passive、Once 和自定义事件。
5. **表单脚本**：FormData、Constraint Validation、输入法、Composition Event、受控校验和异步校验。
6. **UI 状态同步**：State 到 DOM 的映射、增量更新、列表 Key 的直觉、焦点和 Selection 保持。

**实践与证据**：实现动态表格、搜索、Modal、表单校验和列表编辑；观察事件传播路径；演示不安全 HTML 更新并修复为安全方案。

**阶段门槛**：能解释每次 DOM 更新的来源、事件路径、焦点变化和安全边界。

## Stage 20：Promise、Async/Await、Fetch 与并发控制

**目标**：可靠处理网络和异步任务，而不是只会在函数前加 `async`。

**模块**：

1. **异步来源**：Timer、事件、网络、文件、动画、Worker；同步返回值和未来结果。
2. **Promise 模型**：Pending/Fulfilled/Rejected、Then Chain、错误传播、Finally、Promise 解析过程。
3. **Async/Await**：暂停的是函数而不是线程；串行、并行、批量、依赖任务和错误边界。
4. **并发组合**：`all`、`allSettled`、`race`、`any`；并发上限、任务队列和部分失败。
5. **Fetch**：请求配置、Header、Body、Response、流、HTTP 错误与网络错误的区别。
6. **取消与韧性**：AbortController、Timeout、Retry、指数退避、抖动、去重、竞态和过期响应。

**实践与证据**：实现搜索建议并处理竞态；实现超时、取消和重试；对比串行与并行耗时；在 Network 面板证明取消和缓存行为。

**阶段门槛**：面对重复点击、慢请求、乱序响应、部分失败和页面卸载时，应用行为明确且可测试。

## Stage 21：原生 SPA、状态管理与可维护结构

**目标**：在学习框架之前，亲手解决框架要解决的基本问题。

**模块**：

1. **应用分层**：View、State、Service、Repository、Router、Validation 和 Infrastructure 的职责。
2. **状态模型**：本地 UI 状态、共享客户端状态、服务端状态、URL 状态、持久化状态和派生状态。
3. **客户端路由**：History、Location、Push/Replace、Back/Forward、404、刷新和滚动恢复。
4. **数据层**：加载、缓存、失效、乐观更新、错误恢复、空状态和重复请求去重。
5. **持久化**：LocalStorage、SessionStorage、版本迁移、序列化、过期和多标签页同步初识。
6. **基础质量**：模块边界、日志、错误页、Loading、测试、性能标记和构建前检查。

**实践与证据**：完成一个不依赖 UI 框架的任务或订单 SPA；包括路由、查询、编辑、缓存、持久化、错误处理和测试。

**阶段门槛**：新增功能不需要修改所有文件；状态来源明确；刷新和前进后退正确；失败场景有可恢复路径。

---

# 卷 08：JavaScript 运行时、模式与算法

## Stage 22：原型、类、描述符与元编程

**目标**：理解 JavaScript 对象系统，而不是把 `class` 当成 Java/C# 的完全复制。

**模块**：

1. **原型链**：对象委托、`[[Prototype]]`、属性查找、Own Property、继承与遮蔽。
2. **构造与类**：`new` 的过程、Constructor、Prototype、Class、Static、Private Field 和继承。
3. **属性描述符**：Writable、Enumerable、Configurable、Getter/Setter、Freeze、Seal 和不可变边界。
4. **Symbol 与协议**：Well-known Symbols、Iterator、Iterable、Async Iterator 和自定义迭代。
5. **Generator**：暂停与恢复、惰性序列、协程直觉和异步迭代。
6. **Proxy / Reflect**：拦截操作、响应式基础、校验、日志、虚拟对象和不变量限制。

**实践与证据**：手写简化版 `new`、继承、可迭代集合和响应式对象；使用描述符观察属性行为；记录 Proxy 陷阱。

**阶段门槛**：能画出实例、构造函数、Prototype 和父原型关系，并说明 Class 语法隐藏了什么。

## Stage 23：执行上下文、事件循环、内存与垃圾回收

**目标**：能够解释异步顺序、卡顿和内存泄漏的根因。

**模块**：

1. **代码执行链**：解析、编译/解释、执行上下文、词法环境、调用栈和异常展开。
2. **任务调度**：Task、Microtask、Animation Frame、Rendering Opportunity、Idle Work 和浏览器事件循环。
3. **Node.js 差异初识**：不同事件循环阶段、I/O 回调和浏览器环境差异。
4. **内存模型**：Stack/Heap 的实用模型、可达性、引用图、闭包保留和 DOM Retainer。
5. **垃圾回收**：标记清除、分代、增量和并发回收的高层模型；Weak Collection 的用途。
6. **泄漏与卡顿**：全局引用、未清理监听器、Timer、Detached DOM、无限缓存、长任务和递归。

**实践与证据**：预测并验证任务顺序；使用 Performance 发现 Long Task；使用 Heap Snapshot 和 Allocation Timeline 修复泄漏。

**阶段门槛**：能提供调用栈、任务队列或 Retainer Path 作为结论证据，而不是凭感觉说“异步问题”或“内存高”。

## Stage 24：编程范式、设计模式、数据结构与前端算法

**目标**：根据问题选择抽象，而不是机械套用模式或刷题模板。

**模块**：

1. **函数式思想**：纯函数、不可变、组合、柯里化、惰性、Functor/Monad 只作为 Expert 延伸，不先堆术语。
2. **面向对象思想**：封装、组合优于继承、职责、依赖倒置和对象生命周期。
3. **常用模式**：Observer、Pub/Sub、Command、Strategy、Adapter、Facade、Factory、State、Middleware、Plugin。
4. **数据结构**：Array、Linked List、Stack、Queue、Hash Map、Set、Tree、Trie、Graph、Heap、LRU Cache。
5. **复杂度**：时间、空间、摊还分析；数据规模、常数项、浏览器主线程和可读性之间的取舍。
6. **前端算法场景**：树遍历、权限树、路由匹配、虚拟列表、Diff 直觉、搜索、排序、去重、调度和缓存淘汰。

**实践与证据**：实现事件总线、命令栈、LRU、树形菜单、并发队列和虚拟列表核心；对比多种实现并记录复杂度与维护成本。

**阶段门槛**：不只给出能运行的代码，还能说明数据规模、复杂度、可读性、扩展性和失败边界。

---

# 卷 09：TypeScript 从基础到类型架构

## Stage 25：TypeScript 基础与类型收窄

**目标**：利用类型系统提前发现错误，而不是把所有报错用 `any` 消掉。

**模块**：

1. **编译模型**：TypeScript 与 JavaScript 的关系；类型擦除、编译期与运行时、`tsc` 和语言服务。
2. **基本类型**：Primitive、Array、Tuple、Object、Function、Literal、Union、Intersection、Never、Unknown、Any。
3. **结构化类型**：Interface、Type Alias、可选、Readonly、Index Signature 和 Excess Property Check。
4. **函数类型**：参数、返回、可选、Rest、Callback、Overload 和 `this` 参数。
5. **类型收窄**：`typeof`、`in`、`instanceof`、判等、Truthiness、用户定义 Type Guard 和 Assertion Function。
6. **配置基础**：Strict、Target、Lib、Module、Module Resolution、Source Map、Include/Exclude。

**实践与证据**：把卷 07 的原生 SPA 逐步迁移为 TypeScript；禁止新增隐式 `any`；为 API、表单和状态建立类型。

**阶段门槛**：能够解释每一个类型断言为什么安全；不能把 `as` 当成“让编译器闭嘴”的工具。

## Stage 26：泛型、条件类型、映射类型与类型推导

**目标**：设计可复用且能保持输入输出关系的高级类型。

**模块**：

1. **泛型**：Type Parameter、Constraint、Default、Keyof、Indexed Access、Generic Function/Class/Interface。
2. **映射类型**：属性遍历、Modifiers、Key Remapping 和基于模型生成 DTO/ViewModel。
3. **条件类型**：分配行为、`infer`、递归条件类型、尾递归限制和可读性边界。
4. **模板字面量类型**：事件名、路径、资源键、CSS Token、路由参数和字符串协议。
5. **联合建模**：Discriminated Union、Exhaustiveness Check、State Machine 和不可能状态消除。
6. **高级语义**：`satisfies`、Const Assertion、Const Type Parameter、Variance、Brand/Opaque Type 和类型级测试。

**实践与证据**：实现类型安全事件总线、路由参数推导、表单字段映射、API Result、权限模型和主题 Token 类型。

**阶段门槛**：高级类型必须改善调用体验；若类型比业务本身更难理解，要能主动降级为更简单设计。

## Stage 27：声明文件、运行时校验与大型类型架构

**目标**：建立跨模块、跨包、跨前后端都可演进的类型边界。

**模块**：

1. **声明系统**：`.d.ts`、Ambient Declaration、Global、Module Declaration、Module Augmentation 和第三方无类型库适配。
2. **包与解析**：`package.json` 的 Types、Exports、Imports、条件导出、ESM/CJS 类型差异和 Dual Package 风险。
3. **运行时边界**：TypeScript 不验证外部数据；Schema Validation、Parser、Decoder、错误聚合和安全默认值。
4. **契约生成**：OpenAPI、JSON Schema、GraphQL Codegen、共享类型与独立契约的取舍。
5. **大型项目**：Project References、Incremental、Build Mode、路径别名、Monorepo、类型检查性能和依赖方向。
6. **公共 API 设计**：最小导出面、稳定类型、向后兼容、Deprecated、类型测试、SemVer 和破坏性变更。
7. **迁移治理**：JS 到 TS、Strict 分阶段开启、`any` 债务、类型覆盖指标、第三方类型升级和 Codemod。

**实践与证据**：完成一个独立 TypeScript SDK；包含运行时校验、声明输出、类型测试、构建、版本策略、示例应用和错误兼容方案。

**阶段门槛**：SDK 的消费者无需阅读内部实现即可获得准确补全；错误外部数据不会穿透到核心领域；破坏性类型变更有迁移说明。

---

# 本分册综合验收

完成卷 01～09 后，学习者必须提交：

1. 一个语义化、响应式、可访问的多页面网站。
2. 一个不依赖前端框架的原生 JavaScript SPA。
3. 一份 HTML/CSS/网络/事件循环/内存实验记录。
4. 一个可被其他项目安装使用的 TypeScript SDK。
5. 完整 Git 历史、README、测试、错误复现和修复记录。
6. 一次阶段答辩：从输入 URL 开始，解释 DNS、连接、HTTP、HTML 解析、CSS 布局、JavaScript 执行、DOM 更新和类型边界。

只有能够以运行证据说明这些链路，才进入浏览器深层机制与框架阶段。