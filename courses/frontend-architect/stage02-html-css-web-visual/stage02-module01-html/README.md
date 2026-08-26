# Stage 02 · Module 01：HTML 学习索引

> **目录标识**：`stage02-module01-html`
>
> **文档职责**：本 README 只负责模块导航、知识点目录、包含内容、生成状态和学习顺序。
>
> **模块规模**：10 个章节、131 个原子知识点、5 个综合项目。

## 目录约定

每个原子知识点对应一个独立目录。HTML 知识点当前使用一份 Markdown 讲解文档和一份可直接运行的案例源码：

```text
kp001-standard-declaration/
├── README.md    # 学习目标、理论讲解、动手编码、运行案例、效果验证
└── index.html   # 当前知识点的独立案例源码
```

每一行“包含内容”就是对应知识点文档需要展开的讲解范围。后续模块可以根据技术需要使用多个源码、测试或配置文件，不受单文件限制。

## 学习顺序

|  顺序 | 章节                        | 目录                             | 知识点 | 当前状态  |
| --: | ------------------------- | ------------------------------ | --: | ----- |
|  01 | [文档骨架与解析入口](#chapter-01)  | `01-document-skeleton/`        |  16 | 16/16 |
|  02 | [元信息与资源声明](#chapter-02)   | `02-metadata-resources/`       |  14 | 12/14 |
|  03 | [文本内容模型](#chapter-03)     | `03-text-semantics/`           |  14 | 0/14  |
|  04 | [列表、区块和页面地标](#chapter-04) | `04-lists-landmarks/`          |  12 | 0/12  |
|  05 | [超链接与导航](#chapter-05)     | `05-links-navigation/`         |   8 | 0/8   |
|  06 | [图片、音视频和嵌入](#chapter-06)  | `06-media-embedding/`          |  16 | 0/16  |
|  07 | [数据表格](#chapter-07)       | `07-data-tables/`              |   8 | 0/8   |
|  08 | [表单结构、控件与校验](#chapter-08) | `08-forms-validation/`         |  23 | 0/23  |
|  09 | [时间、修改和度量语义](#chapter-09) | `09-machine-readable-content/` |   8 | 0/8   |
|  10 | [披露、弹窗与轻量浮层](#chapter-10) | `10-native-interactions/`      |  12 | 0/12  |

## 状态说明

| 状态 | 含义 |
|---|---|
| 待生成 | 已完成目录规划，知识点文档和源码尚未落盘 |
| 编写中 | README 或源码仍不满足完整交付标准 |
| 已完成 | 学习目标、理论讲解、动手编码、运行案例和效果验证均已完成 |

## 原子知识点目录

<a id="chapter-01"></a>

<details>
<summary><strong>01 · 文档骨架与解析入口</strong>（16 个知识点，目录 <code>01-document-skeleton/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| KP001 | 标准声明 | 1. 标准语法<br>2. 放置位置<br>3. DOM 节点与文档模式 | [文档](./01-document-skeleton/kp001-standard-declaration/README.md) · [源码](./01-document-skeleton/kp001-standard-declaration/index.html) | 已完成 |
| KP002 | 声明用途 | 1. 文档模式选择<br>2. 与版本开关的区别<br>3. 浏览器特性检测 | [文档](./01-document-skeleton/kp002-declaration-purpose/README.md) · [源码](./01-document-skeleton/kp002-declaration-purpose/index.html) | 已完成 |
| KP003 | Standards Mode | 1. `CSS1Compat` 标志<br>2. `content-box` 尺寸<br>3. `border-box` 与实际测量 | [文档](./01-document-skeleton/kp003-standards-mode/README.md) · [源码](./01-document-skeleton/kp003-standards-mode/index.html) | 已完成 |
| KP004 | Quirks Mode | 1. `BackCompat` 标志<br>2. 常见触发原因<br>3. 诊断与模式对照 | [文档](./01-document-skeleton/kp004-quirks-mode/README.md) · [源码](./01-document-skeleton/kp004-quirks-mode/index.html) | 已完成 |
| KP005 | `html` | 1. 文档根元素<br>2. 文档主语言<br>3. 书写方向与局部隔离 | [文档](./01-document-skeleton/kp005-html-root/README.md) · [源码](./01-document-skeleton/kp005-html-root/index.html) | 已完成 |
| KP006 | `head` | 1. 元信息容器<br>2. 常见子元素<br>3. 与可见页面顶部的区别 | [文档](./01-document-skeleton/kp006-document-head/README.md) · [源码](./01-document-skeleton/kp006-document-head/index.html) | 已完成 |
| KP007 | `body` | 1. 单一文档主体<br>2. `body` 与 `main`<br>3. 业务挂载节点 | [文档](./01-document-skeleton/kp007-document-body/README.md) · [源码](./01-document-skeleton/kp007-document-body/index.html) | 已完成 |
| KP008 | 容错解析 | 1. 解析器自动纠错<br>2. 段落隐式结束<br>3. 源码与 DOM 对照 | [文档](./01-document-skeleton/kp008-error-tolerant-parsing/README.md) · [源码](./01-document-skeleton/kp008-error-tolerant-parsing/index.html) | 已完成 |
| KP009 | UTF-8 | 1. 字符与字节<br>2. UTF-8 声明与文件编码<br>3. 多语言文本与字节观察 | [文档](./01-document-skeleton/kp009-utf8-encoding/README.md) · [源码](./01-document-skeleton/kp009-utf8-encoding/index.html) | 已完成 |
| KP010 | 乱码诊断 | 1. 编码与解码不一致<br>2. 常见乱码表现<br>3. 按链路定位错误 | [文档](./01-document-skeleton/kp010-mojibake-diagnosis/README.md) · [源码](./01-document-skeleton/kp010-mojibake-diagnosis/index.html) | 已完成 |
| KP011 | `lang` | 1. 页面主语言<br>2. 局部语言覆盖<br>3. 语言标签与辅助技术 | [文档](./01-document-skeleton/kp011-lang-attribute/README.md) · [源码](./01-document-skeleton/kp011-lang-attribute/index.html) | 已完成 |
| KP012 | `dir` | 1. `ltr` 与 `rtl`<br>2. `auto` 自动判断<br>3. 方向继承与局部覆盖 | [文档](./01-document-skeleton/kp012-dir-attribute/README.md) · [源码](./01-document-skeleton/kp012-dir-attribute/index.html) | 已完成 |
| KP013 | 设备宽度 | 1. viewport 元信息<br>2. `width=device-width`<br>3. 移动端默认布局宽度 | [文档](./01-document-skeleton/kp013-device-width/README.md) · [源码](./01-document-skeleton/kp013-device-width/index.html) | 已完成 |
| KP014 | 初始缩放 | 1. `initial-scale`<br>2. CSS 像素与缩放比例<br>3. 用户缩放可访问性 | [文档](./01-document-skeleton/kp014-initial-scale/README.md) · [源码](./01-document-skeleton/kp014-initial-scale/index.html) | 已完成 |
| KP015 | 布局视口与视觉视口 | 1. 两类视口定义<br>2. 缩放和键盘的影响<br>3. 视口尺寸 API | [文档](./01-document-skeleton/kp015-layout-and-visual-viewport/README.md) · [源码](./01-document-skeleton/kp015-layout-and-visual-viewport/index.html) | 已完成 |
| KP016 | 调试方式 | 1. 设备模拟<br>2. 真实设备验证<br>3. 视口数据读取 | [文档](./01-document-skeleton/kp016-viewport-debugging/README.md) · [源码](./01-document-skeleton/kp016-viewport-debugging/index.html) | 已完成 |

</details>

<a id="chapter-02"></a>

<details>
<summary><strong>02 · 元信息与资源声明</strong>（14 个知识点，目录 <code>02-metadata-resources/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP017 | `title` | 1. 元素语法与位置<br>2. 标签页和历史记录用途<br>3. 标题内容组织 | [文档](./02-metadata-resources/kp017-document-title/README.md) · [源码](./02-metadata-resources/kp017-document-title/index.html) | 已完成 |
| KP018 | 动态标题 | 1. `document.title`<br>2. 路由状态同步<br>3. 未读状态与标题恢复 | [文档](./02-metadata-resources/kp018-dynamic-title/README.md) · [源码](./02-metadata-resources/kp018-dynamic-title/index.html) | 已完成 |
| KP019 | description | 1. `meta` 声明方式<br>2. 摘要内容编写<br>3. 页面唯一性与搜索展示 | [文档](./02-metadata-resources/kp019-meta-description/README.md) · [源码](./02-metadata-resources/kp019-meta-description/index.html) | 已完成 |
| KP020 | canonical | 1. `rel="canonical"`<br>2. 规范 URL 选择<br>3. 参数页与重复内容 | [文档](./02-metadata-resources/kp020-canonical-url/README.md) · [源码](./02-metadata-resources/kp020-canonical-url/index.html) | 已完成 |
| KP021 | 标题与摘要 | 1. 社交元信息字段<br>2. 页面标题与摘要一致性<br>3. 平台回退策略 | [文档](./02-metadata-resources/kp021-social-title-description/README.md) · [源码](./02-metadata-resources/kp021-social-title-description/index.html) | 已完成 |
| KP022 | 分享图片 | 1. 图片地址与绝对 URL<br>2. 尺寸、比例和格式<br>3. 抓取缓存与更新验证 | [文档](./02-metadata-resources/kp022-social-share-image/README.md) · [源码](./02-metadata-resources/kp022-social-share-image/index.html) | 已完成 |
| KP023 | 图标 | 1. favicon 声明<br>2. 类型与尺寸选择<br>3. 多设备图标回退 | [文档](./02-metadata-resources/kp023-site-icons/README.md) · [源码](./02-metadata-resources/kp023-site-icons/index.html) | 已完成 |
| KP024 | 主题颜色 | 1. `theme-color` 语法<br>2. 明暗主题媒体条件<br>3. 不支持环境的回退 | [文档](./02-metadata-resources/kp024-theme-color/README.md) · [源码](./02-metadata-resources/kp024-theme-color/index.html) | 已完成 |
| KP025 | stylesheet | 1. `rel` 与 `href`<br>2. `media` 条件<br>3. 加载顺序与阻塞行为 | [文档](./02-metadata-resources/kp025-stylesheet-link/README.md) · [源码](./02-metadata-resources/kp025-stylesheet-link/index.html) | 已完成 |
| KP026 | 内联与外联 | 1. 作用范围与复用<br>2. 缓存和请求成本<br>3. CSP 与维护边界 | [文档](./02-metadata-resources/kp026-inline-vs-external-resources/README.md) · [源码](./02-metadata-resources/kp026-inline-vs-external-resources/index.html) | 已完成 |
| KP027 | 普通、defer、async | 1. 解析与下载时序<br>2. 执行顺序保证<br>3. 使用场景选择 | [文档](./02-metadata-resources/kp027-script-defer-async/README.md) · [源码](./02-metadata-resources/kp027-script-defer-async/index.html) | 已完成 |
| KP028 | module | 1. `type="module"`<br>2. 导入、作用域和严格模式<br>3. 延迟执行与跨域要求 | [文档](./02-metadata-resources/kp028-module-script/README.md) · [源码](./02-metadata-resources/kp028-module-script/index.html) | 已完成 |
| KP029 | preconnect 与 dns-prefetch | 1. DNS 与连接阶段<br>2. `crossorigin` 配置<br>3. 连接预算和适用来源 | `kp029-preconnect-dns-prefetch/` | 待生成 |
| KP030 | preload 与 prefetch | 1. 当前页与未来页资源<br>2. `as`、类型和优先级<br>3. 重复下载与带宽风险 | `kp030-preload-prefetch/` | 待生成 |

</details>

<a id="chapter-03"></a>

<details>
<summary><strong>03 · 文本内容模型</strong>（14 个知识点，目录 <code>03-text-semantics/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP031 | `h1`～`h6` | 1. 六级标题语义<br>2. 标题与视觉字号<br>3. 文档结构导航 | `kp031-heading-levels/` | 待生成 |
| KP032 | 层级连续性 | 1. 层级递进<br>2. 跳级问题<br>3. 页面大纲检查 | `kp032-heading-continuity/` | 待生成 |
| KP033 | 主标题 | 1. 页面主题表达<br>2. `h1` 数量与上下文<br>3. 标题和文档标题配合 | `kp033-page-main-heading/` | 待生成 |
| KP034 | 组件标题 | 1. 组件嵌入上下文<br>2. 标题级别由外部决定<br>3. 可复用组件策略 | `kp034-component-heading/` | 待生成 |
| KP035 | `p` | 1. 段落内容模型<br>2. 段落自动闭合<br>3. 与普通容器的区别 | `kp035-paragraph/` | 待生成 |
| KP036 | 换行与分隔 | 1. `br` 强制换行<br>2. `hr` 主题分隔<br>3. 段落和 CSS 间距选择 | `kp036-line-break-and-separator/` | 待生成 |
| KP037 | `em` 与 `strong` | 1. 语气强调<br>2. 内容重要性<br>3. 嵌套与语义强度 | `kp037-emphasis-and-importance/` | 待生成 |
| KP038 | `b`、`i`、`mark`、`small` | 1. 视觉提醒与术语语气<br>2. 高亮相关性<br>3. 附属说明文本 | `kp038-text-level-semantics/` | 待生成 |
| KP039 | `blockquote` 与 `q` | 1. 块级与行内引用<br>2. `cite` 属性<br>3. 引号显示与来源说明 | `kp039-blockquote-and-q/` | 待生成 |
| KP040 | `cite` 元素 | 1. 作品标题语义<br>2. 与作者姓名的区别<br>3. 与引用结构组合 | `kp040-cite-element/` | 待生成 |
| KP041 | `code`、`pre` | 1. 代码语义<br>2. 空白和换行保留<br>3. 转义与长代码处理 | `kp041-code-and-pre/` | 待生成 |
| KP042 | `kbd`、`samp`、`var` | 1. 用户输入<br>2. 程序输出<br>3. 变量和占位符 | `kp042-kbd-samp-var/` | 待生成 |
| KP043 | `abbr`、`dfn` | 1. 缩写及完整含义<br>2. 术语首次定义<br>3. 可理解性和提示边界 | `kp043-abbr-and-dfn/` | 待生成 |
| KP044 | `ruby`、`bdi`、`bdo` | 1. 注音标注<br>2. 双向文本隔离<br>3. 方向强制覆盖 | `kp044-ruby-bdi-bdo/` | 待生成 |

</details>

<a id="chapter-04"></a>

<details>
<summary><strong>04 · 列表、区块和页面地标</strong>（12 个知识点，目录 <code>04-lists-landmarks/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP045 | `ul` | 1. 无序集合语义<br>2. `li` 子元素<br>3. 嵌套列表结构 | `kp045-unordered-list/` | 待生成 |
| KP046 | `ol` | 1. 有序步骤语义<br>2. `start` 与 `reversed`<br>3. `li[value]` 编号控制 | `kp046-ordered-list/` | 待生成 |
| KP047 | `dl`、`dt`、`dd` | 1. 名称与描述关系<br>2. 一对多组合<br>3. 术语表和元数据场景 | `kp047-description-list/` | 待生成 |
| KP048 | 选择边界 | 1. 列表与普通段落<br>2. 列表与导航<br>3. 列表类型选择依据 | `kp048-list-selection-boundary/` | 待生成 |
| KP049 | `header`、`footer` | 1. 页面级页眉页脚<br>2. 分区级页眉页脚<br>3. 嵌套上下文语义 | `kp049-header-and-footer/` | 待生成 |
| KP050 | `main` | 1. 主内容地标<br>2. 页面唯一可见主区<br>3. 与 `body` 和分区的关系 | `kp050-main-landmark/` | 待生成 |
| KP051 | `nav` | 1. 主要导航集合<br>2. 多个导航的命名<br>3. 普通链接组的选择边界 | `kp051-nav-landmark/` | 待生成 |
| KP052 | `aside` | 1. 间接相关内容<br>2. 页面级与文章级侧栏<br>3. 与主内容的独立性 | `kp052-aside/` | 待生成 |
| KP053 | 独立内容 | 1. `article` 独立语义<br>2. 可分发与可复用判断<br>3. 标题和作者信息 | `kp053-independent-content/` | 待生成 |
| KP054 | 嵌套文章 | 1. 评论与回复结构<br>2. 父子文章关系<br>3. 标题层级和归属 | `kp054-nested-article/` | 待生成 |
| KP055 | 主题分区 | 1. `section` 主题分组<br>2. 标题要求<br>3. 页面章节组织 | `kp055-thematic-section/` | 待生成 |
| KP056 | 与 div 区分 | 1. 有无主题语义<br>2. 标题和地标影响<br>3. 纯样式容器选择 | `kp056-section-vs-div/` | 待生成 |

</details>

<a id="chapter-05"></a>

<details>
<summary><strong>05 · 超链接与导航</strong>（8 个知识点，目录 <code>05-links-navigation/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP057 | 绝对与相对地址 | 1. URL 组成<br>2. 绝对地址解析<br>3. 相对地址解析基准 | `kp057-absolute-relative-url/` | 待生成 |
| KP058 | 根相对与文档相对 | 1. `/` 根相对路径<br>2. `./` 与 `../` 文档相对路径<br>3. 子路径部署影响 | `kp058-root-document-relative-url/` | 待生成 |
| KP059 | 页面片段 | 1. `#id` 目标定位<br>2. 滚动与焦点行为<br>3. URL 编码和历史记录 | `kp059-fragment-navigation/` | 待生成 |
| KP060 | mailto、tel、download | 1. 邮件和电话协议<br>2. 下载文件名建议<br>3. 平台行为与安全限制 | `kp060-mailto-tel-download/` | 待生成 |
| KP061 | 自描述文本 | 1. 链接目的表达<br>2. 脱离上下文仍可理解<br>3. 可访问名称与重复链接 | `kp061-descriptive-link-text/` | 待生成 |
| KP062 | 新窗口提示 | 1. 行为预期告知<br>2. 键盘和读屏体验<br>3. 产品场景取舍 | `kp062-new-window-notice/` | 待生成 |
| KP063 | `target` | 1. `_self` 与 `_blank`<br>2. 命名浏览上下文<br>3. iframe 和窗口定位 | `kp063-target-attribute/` | 待生成 |
| KP064 | `rel` | 1. `noopener`<br>2. `noreferrer`<br>3. 链接关系类型和安全边界 | `kp064-rel-attribute/` | 待生成 |

</details>

<a id="chapter-06"></a>

<details>
<summary><strong>06 · 图片、音视频和嵌入</strong>（16 个知识点，目录 <code>06-media-embedding/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP065 | 地址与固有尺寸 | 1. `src` 资源地址<br>2. 图片固有尺寸<br>3. `width`、`height` 与布局稳定 | `kp065-image-source-intrinsic-size/` | 待生成 |
| KP066 | 替代文本 | 1. 信息图片描述<br>2. 装饰图片空 `alt`<br>3. 加载失败和辅助技术体验 | `kp066-alternative-text/` | 待生成 |
| KP067 | `figure` | 1. 独立内容单元<br>2. 图片、代码和图表场景<br>3. 与正文引用关系 | `kp067-figure-element/` | 待生成 |
| KP068 | `figcaption` | 1. 图注语义<br>2. 与 `figure` 的归属<br>3. 前置和后置位置 | `kp068-figcaption-element/` | 待生成 |
| KP069 | srcset | 1. 像素密度描述符<br>2. 宽度描述符<br>3. 浏览器候选选择 | `kp069-srcset/` | 待生成 |
| KP070 | sizes | 1. 图片插槽宽度<br>2. 媒体条件匹配<br>3. 与 `w` 描述符配合 | `kp070-sizes/` | 待生成 |
| KP071 | `picture` | 1. 艺术方向<br>2. `source` 匹配顺序<br>3. `img` 必需回退 | `kp071-picture-element/` | 待生成 |
| KP072 | `source` 类型 | 1. `type` 格式提示<br>2. `media` 条件<br>3. 格式回退与请求选择 | `kp072-source-type/` | 待生成 |
| KP073 | 控制与策略 | 1. `controls`<br>2. `autoplay`、`muted`、`playsinline`<br>3. `preload` 加载策略 | `kp073-media-controls-policy/` | 待生成 |
| KP074 | 多资源回退 | 1. 多个 `source` 顺序<br>2. 媒体格式兼容<br>3. 最终提示内容 | `kp074-media-source-fallback/` | 待生成 |
| KP075 | `track` | 1. 字幕轨道类型<br>2. `srclang` 与 `label`<br>3. 默认轨道和 cue | `kp075-track-element/` | 待生成 |
| KP076 | 可访问替代 | 1. 字幕与文字稿<br>2. 音频描述<br>3. 无法播放时的内容替代 | `kp076-accessible-media-alternative/` | 待生成 |
| KP077 | 标题与尺寸 | 1. iframe 可访问标题<br>2. 宽高和纵横比<br>3. 布局稳定与边界 | `kp077-iframe-title-size/` | 待生成 |
| KP078 | 懒加载 | 1. `loading="lazy"`<br>2. 首屏 iframe 选择<br>3. 网络与性能验证 | `kp078-iframe-lazy-loading/` | 待生成 |
| KP079 | sandbox | 1. 默认限制集合<br>2. 常用许可令牌<br>3. 最小权限和组合风险 | `kp079-iframe-sandbox/` | 待生成 |
| KP080 | allow 与来源信任 | 1. Permissions Policy<br>2. 功能许可范围<br>3. 来源校验与跨窗口通信 | `kp080-iframe-permissions-trust/` | 待生成 |

</details>

<a id="chapter-07"></a>

<details>
<summary><strong>07 · 数据表格</strong>（8 个知识点，目录 <code>07-data-tables/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP081 | table、tr、td | 1. 表格数据适用场景<br>2. 行与数据单元格<br>3. 规则网格结构 | `kp081-table-tr-td/` | 待生成 |
| KP082 | thead、tbody、tfoot | 1. 表头、主体和表尾分组<br>2. 解析器自动插入 `tbody`<br>3. 样式与脚本选择 | `kp082-table-sections/` | 待生成 |
| KP083 | caption | 1. 表格标题<br>2. 可访问名称<br>3. 与周围正文的区别 | `kp083-table-caption/` | 待生成 |
| KP084 | colgroup、col | 1. 列分组结构<br>2. `span` 跨列<br>3. 可设置样式的范围 | `kp084-colgroup-col/` | 待生成 |
| KP085 | th 与 scope | 1. 行列标题单元格<br>2. `scope="row"`<br>3. `scope="col"` | `kp085-th-scope/` | 待生成 |
| KP086 | headers 与 id | 1. 复杂表头标识<br>2. 数据格关联多个表头<br>3. 读屏关系验证 | `kp086-headers-id/` | 待生成 |
| KP087 | rowspan、colspan | 1. 跨行跨列语法<br>2. 网格坐标变化<br>3. 复杂度与可访问性 | `kp087-rowspan-colspan/` | 待生成 |
| KP088 | 小屏策略 | 1. 横向滚动容器<br>2. 关键列优先级<br>3. 保留表格语义的响应式方案 | `kp088-responsive-table/` | 待生成 |

</details>

<a id="chapter-08"></a>

<details>
<summary><strong>08 · 表单结构、控件与校验</strong>（23 个知识点，目录 <code>08-forms-validation/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP089 | action 与 method | 1. 提交目标地址<br>2. GET 查询参数<br>3. POST 请求体 | `kp089-form-action-method/` | 待生成 |
| KP090 | enctype | 1. 默认 URL 编码<br>2. `multipart/form-data`<br>3. 文件上传与编码选择 | `kp090-form-enctype/` | 待生成 |
| KP091 | name 与 value | 1. 成功控件规则<br>2. 键值对构造<br>3. 同名字段与 `FormData` | `kp091-control-name-value/` | 待生成 |
| KP092 | disabled 与 readonly | 1. 可编辑性区别<br>2. 焦点和提交行为<br>3. 适用控件范围 | `kp092-disabled-readonly/` | 待生成 |
| KP093 | text、search、email、url、tel | 1. 输入语义选择<br>2. 移动键盘提示<br>3. 内置校验与自动填充 | `kp093-text-like-inputs/` | 待生成 |
| KP094 | password | 1. 密码遮挡<br>2. `autocomplete` 场景<br>3. 显示切换与安全边界 | `kp094-password-input/` | 待生成 |
| KP095 | number、range | 1. 数值与范围输入<br>2. `min`、`max`、`step`<br>3. 精度和文本型数字边界 | `kp095-number-range-inputs/` | 待生成 |
| KP096 | date、time 等 | 1. 日期时间控件类型<br>2. 提交值格式<br>3. 时区与浏览器回退 | `kp096-date-time-inputs/` | 待生成 |
| KP097 | checkbox、radio | 1. 多选与单选语义<br>2. `checked` 和提交值<br>3. 同名分组 | `kp097-checkbox-radio/` | 待生成 |
| KP098 | file、color、hidden | 1. 文件选择和 `accept`<br>2. 颜色值<br>3. 隐藏字段与信任边界 | `kp098-file-color-hidden/` | 待生成 |
| KP099 | option、optgroup | 1. 选项值与文本<br>2. 选项分组标签<br>3. 默认选中和禁用状态 | `kp099-option-optgroup/` | 待生成 |
| KP100 | 选型边界 | 1. `select` 与 radio<br>2. checkbox 与多选列表<br>3. 原生控件与自定义控件取舍 | `kp100-selection-control-boundary/` | 待生成 |
| KP101 | 多行文本 | 1. `textarea` 初始值<br>2. `rows` 与 `cols`<br>3. 换行和长度限制 | `kp101-textarea/` | 待生成 |
| KP102 | 按钮类型 | 1. `submit`<br>2. `button`<br>3. `reset` 与默认类型风险 | `kp102-button-type/` | 待生成 |
| KP103 | 建议输入 | 1. `list` 关联<br>2. `datalist` 建议项<br>3. 建议与强制选项的区别 | `kp103-datalist/` | 待生成 |
| KP104 | label | 1. 显式 `for` 关联<br>2. 隐式包裹关联<br>3. 点击区域与可访问名称 | `kp104-label/` | 待生成 |
| KP105 | 帮助文本 | 1. 持久说明文字<br>2. `aria-describedby` 关联<br>3. placeholder 的使用边界 | `kp105-help-text/` | 待生成 |
| KP106 | fieldset、legend | 1. 相关字段分组<br>2. 分组标题<br>3. 单选组与批量禁用 | `kp106-fieldset-legend/` | 待生成 |
| KP107 | 分步表单 | 1. 步骤结构<br>2. 当前步骤和进度提示<br>3. 状态保存与返回 | `kp107-multi-step-form/` | 待生成 |
| KP108 | required、minlength、maxlength、pattern | 1. 必填与长度约束<br>2. 模式约束<br>3. 原生校验触发时机 | `kp108-constraint-validation-attributes/` | 待生成 |
| KP109 | validity | 1. `ValidityState` 属性<br>2. `checkValidity()` 与 `reportValidity()`<br>3. 自定义校验消息 | `kp109-validity-state/` | 待生成 |
| KP110 | 字段错误 | 1. 错误与字段关联<br>2. 错误出现和清除时机<br>3. 首个错误聚焦与汇总 | `kp110-field-errors/` | 待生成 |
| KP111 | 服务端错误 | 1. 服务端最终校验<br>2. 错误映射和数据保留<br>3. 通用错误与重试流程 | `kp111-server-errors/` | 待生成 |

</details>

<a id="chapter-09"></a>

<details>
<summary><strong>09 · 时间、修改和度量语义</strong>（8 个知识点，目录 <code>09-machine-readable-content/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP112 | `time` | 1. 人类可读文本<br>2. `datetime` 机器值<br>3. 日期、时间和时长格式 | `kp112-time-element/` | 待生成 |
| KP113 | `data` | 1. 展示文本与机器值<br>2. `value` 属性<br>3. 商品编号和枚举场景 | `kp113-data-element/` | 待生成 |
| KP114 | `ins` 与 `del` | 1. 新增与删除语义<br>2. `datetime` 和 `cite`<br>3. 修订记录展示 | `kp114-ins-del/` | 待生成 |
| KP115 | `s` 与删除区分 | 1. 不再准确或适用<br>2. 文档修订语义<br>3. 原价和过期信息场景 | `kp115-s-vs-del/` | 待生成 |
| KP116 | `progress` | 1. 任务完成进度<br>2. `value` 与 `max`<br>3. 确定和不确定状态 | `kp116-progress-element/` | 待生成 |
| KP117 | `meter` | 1. 已知范围内度量<br>2. `min`、`max`、`value`<br>3. `low`、`high`、`optimum` | `kp117-meter-element/` | 待生成 |
| KP118 | `output` | 1. 计算结果语义<br>2. `for` 关联输入<br>3. 表单归属和值更新 | `kp118-output-element/` | 待生成 |
| KP119 | 动态宣布 | 1. 动态结果变化<br>2. 可访问名称与状态<br>3. live region 宣布策略 | `kp119-live-updates/` | 待生成 |

</details>

<a id="chapter-10"></a>

<details>
<summary><strong>10 · 披露、弹窗与轻量浮层</strong>（12 个知识点，目录 <code>10-native-interactions/</code>）</summary>

| 编号 | 知识点 | 包含内容 | 知识点目录 | 状态 |
|---|---|---|---|---|
| KP120 | 内容模型 | 1. `details` 与 `summary`<br>2. `open` 状态<br>3. 原生键盘交互 | `kp120-details-content-model/` | 待生成 |
| KP121 | 合适场景 | 1. 补充信息披露<br>2. FAQ 和说明区<br>3. 不应隐藏的重要内容 | `kp121-details-use-cases/` | 待生成 |
| KP122 | name 分组 | 1. 同名 details 分组<br>2. 单项展开行为<br>3. 兼容性和回退 | `kp122-details-name-group/` | 待生成 |
| KP123 | 体验取舍 | 1. 原生交互优势<br>2. 状态保存和深链接<br>3. 动画与搜索可发现性 | `kp123-accordion-tradeoffs/` | 待生成 |
| KP124 | open 与 show | 1. `open` 属性直接展示<br>2. `show()` 非模态打开<br>3. 关闭和焦点行为 | `kp124-dialog-open-show/` | 待生成 |
| KP125 | showModal | 1. 模态顶层显示<br>2. 背景不可交互<br>3. 初始焦点和焦点约束 | `kp125-dialog-show-modal/` | 待生成 |
| KP126 | method=dialog | 1. 对话框内表单<br>2. 提交即关闭<br>3. 按钮值与 `returnValue` | `kp126-dialog-method/` | 待生成 |
| KP127 | 取消与恢复 | 1. Esc 与 `cancel` 事件<br>2. `close` 事件<br>3. 触发元素焦点恢复 | `kp127-dialog-cancel-focus-restore/` | 待生成 |
| KP128 | popover 模式 | 1. `auto` 模式<br>2. `manual` 模式<br>3. 显示隐藏生命周期 | `kp128-popover-modes/` | 待生成 |
| KP129 | invoker | 1. `popovertarget`<br>2. 显示、隐藏和切换动作<br>3. 声明式触发关系 | `kp129-popover-invoker/` | 待生成 |
| KP130 | 与 dialog 区分 | 1. 模态需求<br>2. 焦点和背景交互<br>3. 菜单、提示与确认场景 | `kp130-popover-vs-dialog/` | 待生成 |
| KP131 | 渐进增强 | 1. 功能支持检测<br>2. 无脚本基础内容<br>3. 不支持环境的替代交互 | `kp131-progressive-enhancement-fallback/` | 待生成 |

</details>

## 综合项目目录

综合项目用于串联多个原子知识点，同样采用“一个项目目录 + 一份讲解文档 + 自包含源码”的方式。

| 项目 | 目录 | 覆盖章节 | 状态 |
|---|---|---|---|
| C01 城市新闻专题页 | `projects/c01-city-news/` | 文档基础、文本语义、页面地标 | 待生成 |
| C02 跨设备商品详情页 | `projects/c02-product-detail/` | 链接、图片、音视频与嵌入 | 待生成 |
| C03 国际化注册与结算表单 | `projects/c03-i18n-checkout-form/` | 表单控件、校验与错误恢复 | 待生成 |
| C04 SaaS 套餐比较表 | `projects/c04-saas-pricing-table/` | 表格关系、复杂表头与小屏策略 | 待生成 |
| C05 FAQ、确认框与浮层帮助 | `projects/c05-native-interactions/` | details、dialog 与 popover | 待生成 |

## 模块完成条件

- [ ] 131 个知识点目录全部存在。
- [ ] 每个知识点至少包含 `README.md` 和 `index.html`。
- [ ] 每个知识点都在模块索引中列出明确的“包含内容”。
- [ ] 每份 README 包含学习目标、理论讲解、动手编码、运行案例和效果验证。
- [ ] 每份源码可以独立运行，并与文档描述一致。
- [ ] 模块索引中不存在失效链接。
- [ ] C01～C05 综合项目全部完成。
