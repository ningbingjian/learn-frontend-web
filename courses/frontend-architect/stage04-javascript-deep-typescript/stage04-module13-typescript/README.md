# 模块 13：TypeScript 从入门到工程应用

> 目标：建立一套从 TypeScript 语言基础、类型系统、高级类型、编译配置、声明体系，到框架集成、库开发、类型架构与编译器原理的完整学习路径。
>
> 版本基线：以 TypeScript 7.x 为当前主线，同时保留 TypeScript 5.x / 6.x 中仍具有迁移价值的重要行为与历史背景。

## 一、模块定位

TypeScript 不是“给 JavaScript 加几个类型注解”。本模块希望最终解决五类能力问题：

1. 能准确理解 TypeScript 的静态类型系统与 JavaScript 运行时之间的边界。
2. 能独立完成中大型前端、Node.js、SDK 与公共库的类型设计。
3. 能阅读并设计泛型、条件类型、映射类型、模板字面量类型等高级类型。
4. 能正确配置、构建、发布、测试和升级 TypeScript 工程。
5. 能从类型系统、编译器、模块解析、声明文件和组织架构层面定位复杂问题。

## 二、学习层级

```text
TypeScript Language
        ↓
Type System
        ↓
Advanced Types
        ↓
Compiler / Module / Declaration
        ↓
Engineering
        ↓
Framework Integration
        ↓
Library / SDK
        ↓
Type Architecture
        ↓
Compiler Internals
```

## 三、知识点编号约定

- `TS-KPxxx`：TypeScript 原子知识点。
- Chapter：知识领域。
- Lesson：可独立学习的一节课程。
- Lab：实验。
- Project：综合项目。

每个原子知识点后续独立落盘时，原则上包含：

```text
README.md       理论、原理、从 0 到 1 编码、运行与验证
src/            最小可运行示例
```

其他源码或配置文件按知识点实际需要增加，不创建独立的 `exercise/`、`solution/` 目录。

---

# Chapter 01：TypeScript 认知、安装与运行模型

## Lesson 01.1：TypeScript 是什么

- TS-KP001：TypeScript 与 JavaScript 的关系
- TS-KP002：静态类型检查与 JavaScript 运行时的边界
- TS-KP003：TypeScript 的擦除型类型系统
- TS-KP004：类型安全不是运行时数据校验
- TS-KP005：TypeScript 的设计目标与非目标
- TS-KP006：渐进式类型系统与 JavaScript 迁移
- TS-KP007：结构化类型系统基本直觉
- TS-KP008：编译期错误与运行时错误的区别

## Lesson 01.2：安装、编译与执行

- TS-KP009：安装 TypeScript 与版本管理
- TS-KP010：`tsc` 基本使用
- TS-KP011：`.ts`、`.tsx`、`.mts`、`.cts` 文件
- TS-KP012：源码到 JavaScript 的 Emit 过程
- TS-KP013：`--noEmit` 与只类型检查
- TS-KP014：Watch Mode
- TS-KP015：使用 Node.js 直接运行 TypeScript 的现代方式与限制
- TS-KP016：编辑器语言服务与 `tsserver` / 新语言服务体系概念

### Lab 01

建立最小 TypeScript 工程，分别验证“类型检查通过”“类型检查失败但可产生 JavaScript”“运行时输入不受静态类型保护”三个场景。

---

# Chapter 02：基础类型与类型推断

## Lesson 02.1：原始类型

- TS-KP017：`string`
- TS-KP018：`number`
- TS-KP019：`boolean`
- TS-KP020：`bigint`
- TS-KP021：`symbol`
- TS-KP022：`null`
- TS-KP023：`undefined`

## Lesson 02.2：特殊类型

- TS-KP024：`any`
- TS-KP025：`unknown`
- TS-KP026：`never`
- TS-KP027：`void`
- TS-KP028：`object`
- TS-KP029：`{}` 与 `Object` 的差异

## Lesson 02.3：推断与上下文类型

- TS-KP030：变量类型推断
- TS-KP031：函数返回值推断
- TS-KP032：上下文类型 Contextual Typing
- TS-KP033：Best Common Type
- TS-KP034：字面量拓宽 Literal Widening
- TS-KP035：控制流类型分析概览

---

# Chapter 03：数组、元组、对象与索引结构

## Lesson 03.1：数组与元组

- TS-KP036：`T[]` 与 `Array<T>`
- TS-KP037：只读数组 `readonly T[]` / `ReadonlyArray<T>`
- TS-KP038：Tuple 基础
- TS-KP039：可选 Tuple 元素
- TS-KP040：Rest Tuple 元素
- TS-KP041：Named Tuple Elements
- TS-KP042：Readonly Tuple
- TS-KP043：Variadic Tuple Types

## Lesson 03.2：对象类型

- TS-KP044：匿名对象类型
- TS-KP045：可选属性
- TS-KP046：`readonly` 属性
- TS-KP047：索引签名
- TS-KP048：数字索引与字符串索引
- TS-KP049：Excess Property Checking
- TS-KP050：对象字面量的新鲜度直觉
- TS-KP051：嵌套对象类型设计

---

# Chapter 04：`type`、`interface` 与结构化类型

## Lesson 04.1：类型别名

- TS-KP052：`type` 基础
- TS-KP053：类型别名组合
- TS-KP054：递归类型别名

## Lesson 04.2：接口

- TS-KP055：`interface` 基础
- TS-KP056：接口继承
- TS-KP057：多接口继承
- TS-KP058：接口声明合并
- TS-KP059：接口调用签名
- TS-KP060：接口构造签名

## Lesson 04.3：如何选择

- TS-KP061：`type` 与 `interface` 相同点
- TS-KP062：`type` 与 `interface` 差异
- TS-KP063：公共库 API 中的选择策略
- TS-KP064：结构化类型与名义类型的区别

---

# Chapter 05：函数类型系统

## Lesson 05.1：函数声明

- TS-KP065：参数类型
- TS-KP066：返回值类型
- TS-KP067：可选参数
- TS-KP068：默认参数
- TS-KP069：Rest 参数
- TS-KP070：函数类型表达式
- TS-KP071：调用签名 Call Signature
- TS-KP072：构造签名 Construct Signature

## Lesson 05.2：高级函数类型

- TS-KP073：函数重载
- TS-KP074：Overload Signature 与 Implementation Signature
- TS-KP075：`this` 参数
- TS-KP076：回调函数参数设计
- TS-KP077：函数参数数量兼容
- TS-KP078：函数返回值兼容
- TS-KP079：`strictFunctionTypes`
- TS-KP080：回调中的 `void` 特殊规则

---

# Chapter 06：联合、交叉、字面量与类型收窄

## Lesson 06.1：组合类型

- TS-KP081：Union Types
- TS-KP082：Intersection Types
- TS-KP083：String Literal Types
- TS-KP084：Numeric / Boolean Literal Types
- TS-KP085：Literal Union
- TS-KP086：判别联合 Discriminated Union

## Lesson 06.2：类型收窄

- TS-KP087：`typeof` Narrowing
- TS-KP088：Truthy / Falsy Narrowing
- TS-KP089：Equality Narrowing
- TS-KP090：`in` Operator Narrowing
- TS-KP091：`instanceof` Narrowing
- TS-KP092：赋值导致的收窄
- TS-KP093：控制流分析 Control Flow Analysis
- TS-KP094：用户自定义 Type Predicate
- TS-KP095：Assertion Functions
- TS-KP096：`never` 与穷尽检查
- TS-KP097：复杂状态机中的判别联合

---

# Chapter 07：类型断言、常量推断与 `satisfies`

- TS-KP098：`as` 类型断言
- TS-KP099：尖括号断言及 TSX 限制
- TS-KP100：Double Assertion
- TS-KP101：Non-null Assertion `!`
- TS-KP102：`as const`
- TS-KP103：Const Assertion 对对象、数组和字面量的影响
- TS-KP104：`satisfies` Operator
- TS-KP105：`satisfies` 与类型注解的差异
- TS-KP106：避免滥用断言掩盖模型错误

---

# Chapter 08：泛型基础到高级泛型

## Lesson 08.1：泛型基础

- TS-KP107：Generic Function
- TS-KP108：Type Parameter
- TS-KP109：泛型类型推断
- TS-KP110：多个类型参数
- TS-KP111：泛型 Interface
- TS-KP112：泛型 Type Alias
- TS-KP113：泛型 Class

## Lesson 08.2：泛型约束

- TS-KP114：Generic Constraints
- TS-KP115：`extends` Constraint
- TS-KP116：`keyof` Constraint
- TS-KP117：泛型默认类型参数
- TS-KP118：泛型参数之间建立约束关系
- TS-KP119：Const Type Parameters

## Lesson 08.3：泛型设计

- TS-KP120：推断优先还是显式参数优先
- TS-KP121：减少无意义泛型参数
- TS-KP122：泛型 API 的调用体验
- TS-KP123：泛型约束过宽与过窄问题
- TS-KP124：泛型导致错误信息复杂化的治理

---

# Chapter 09：类型操作符

- TS-KP125：`keyof`
- TS-KP126：`typeof` Type Operator
- TS-KP127：Indexed Access Types
- TS-KP128：`T[K]`
- TS-KP129：`keyof typeof`
- TS-KP130：`typeof arr[number]`
- TS-KP131：`keyof` 与索引签名
- TS-KP132：类型操作符组合设计

---

# Chapter 10：映射类型

- TS-KP133：Mapped Types 基础
- TS-KP134：`[K in keyof T]`
- TS-KP135：添加和移除 `readonly`
- TS-KP136：添加和移除可选修饰符
- TS-KP137：Key Remapping with `as`
- TS-KP138：过滤 Key
- TS-KP139：映射类型与模板字面量组合
- TS-KP140：递归 Mapped Type
- TS-KP141：DeepReadonly / DeepPartial 的边界

---

# Chapter 11：条件类型与分布式条件类型

- TS-KP142：Conditional Types 基础
- TS-KP143：条件类型中的泛型约束
- TS-KP144：Distributive Conditional Types
- TS-KP145：阻止条件类型分布
- TS-KP146：条件类型递归
- TS-KP147：过滤联合成员
- TS-KP148：条件类型的实际 API 建模
- TS-KP149：条件类型复杂度治理

---

# Chapter 12：`infer` 与类型提取

- TS-KP150：`infer` 基础
- TS-KP151：推导函数返回值
- TS-KP152：推导函数参数
- TS-KP153：推导数组元素
- TS-KP154：推导 Tuple 元素
- TS-KP155：推导 Promise 内部类型
- TS-KP156：推导构造函数实例
- TS-KP157：嵌套 `infer`
- TS-KP158：协变位置与逆变位置中的推断直觉

---

# Chapter 13：模板字面量类型与字符串类型编程

- TS-KP159：Template Literal Types
- TS-KP160：联合类型展开
- TS-KP161：`Uppercase`
- TS-KP162：`Lowercase`
- TS-KP163：`Capitalize`
- TS-KP164：`Uncapitalize`
- TS-KP165：事件名类型生成
- TS-KP166：路由参数字符串解析
- TS-KP167：字符串递归类型
- TS-KP168：字符串类型编程的性能边界

---

# Chapter 14：内置 Utility Types

- TS-KP169：`Partial<T>`
- TS-KP170：`Required<T>`
- TS-KP171：`Readonly<T>`
- TS-KP172：`Record<K, T>`
- TS-KP173：`Pick<T, K>`
- TS-KP174：`Omit<T, K>`
- TS-KP175：`Exclude<T, U>`
- TS-KP176：`Extract<T, U>`
- TS-KP177：`NonNullable<T>`
- TS-KP178：`Parameters<T>`
- TS-KP179：`ConstructorParameters<T>`
- TS-KP180：`ReturnType<T>`
- TS-KP181：`InstanceType<T>`
- TS-KP182：`ThisParameterType<T>`
- TS-KP183：`OmitThisParameter<T>`
- TS-KP184：`ThisType<T>`
- TS-KP185：`Awaited<T>`
- TS-KP186：`NoInfer<T>`
- TS-KP187：手写常用 Utility Types

---

# Chapter 15：类型兼容性、Variance 与 Soundness

- TS-KP188：Structural Compatibility
- TS-KP189：对象兼容规则
- TS-KP190：函数兼容规则
- TS-KP191：Enum 兼容性
- TS-KP192：Class Private/Protected 对兼容性的影响
- TS-KP193：泛型兼容性
- TS-KP194：Covariance
- TS-KP195：Contravariance
- TS-KP196：Bivariance
- TS-KP197：Invariance
- TS-KP198：Variance Annotations `in` / `out`
- TS-KP199：TypeScript 中有意存在的不完全 Soundness
- TS-KP200：为什么类型正确不等于程序绝对安全

---

# Chapter 16：类与面向对象类型

- TS-KP201：Class 字段与方法
- TS-KP202：Constructor
- TS-KP203：`public`
- TS-KP204：`protected`
- TS-KP205：`private`
- TS-KP206：JavaScript `#private` 与 TS `private`
- TS-KP207：`readonly`
- TS-KP208：Parameter Properties
- TS-KP209：Getter / Setter
- TS-KP210：Static Members
- TS-KP211：Abstract Class
- TS-KP212：Abstract Members
- TS-KP213：`implements`
- TS-KP214：`extends`
- TS-KP215：`override`
- TS-KP216：`noImplicitOverride`
- TS-KP217：`this` Type
- TS-KP218：Polymorphic `this`
- TS-KP219：Class Expressions
- TS-KP220：Generic Classes
- TS-KP221：Class 的实例侧与静态侧
- TS-KP222：Mixins

---

# Chapter 17：枚举、Symbol 与品牌类型

- TS-KP223：Numeric Enum
- TS-KP224：String Enum
- TS-KP225：Heterogeneous Enum
- TS-KP226：Computed Enum Members
- TS-KP227：Const Enum
- TS-KP228：Enum 的运行时代码
- TS-KP229：Enum 与 Literal Union 的选择
- TS-KP230：Unique Symbol
- TS-KP231：Branded Types
- TS-KP232：Opaque Type 模式
- TS-KP233：业务 ID 防串用设计

---

# Chapter 18：模块系统与模块解析

## Lesson 18.1：模块语法

- TS-KP234：ES Module Import / Export
- TS-KP235：Default Export
- TS-KP236：Named Export
- TS-KP237：Re-export
- TS-KP238：Namespace Import
- TS-KP239：Dynamic Import
- TS-KP240：`import type`
- TS-KP241：`export type`
- TS-KP242：Type-only Import/Export 与运行时依赖

## Lesson 18.2：ESM / CommonJS

- TS-KP243：CommonJS 基础
- TS-KP244：ESM 与 CJS 互操作
- TS-KP245：`.mts` / `.cts`
- TS-KP246：`.mjs` / `.cjs`
- TS-KP247：`package.json` 中 `type`
- TS-KP248：NodeNext / Node16 模块语义
- TS-KP249：`esModuleInterop`
- TS-KP250：`allowSyntheticDefaultImports`

## Lesson 18.3：模块解析

- TS-KP251：Module Resolution 基本流程
- TS-KP252：Relative / Bare Specifier
- TS-KP253：`moduleResolution`
- TS-KP254：`baseUrl`
- TS-KP255：`paths`
- TS-KP256：`rootDirs`
- TS-KP257：Package `exports`
- TS-KP258：Package `imports`
- TS-KP259：`types` / `typings`
- TS-KP260：`typesVersions`
- TS-KP261：`moduleSuffixes`
- TS-KP262：Bundler Module Resolution
- TS-KP263：`traceResolution` 调试

---

# Chapter 19：Namespace、声明合并与模块扩展

- TS-KP264：Namespace 基础
- TS-KP265：Nested Namespace
- TS-KP266：Namespace 与 ESM 的区别
- TS-KP267：Declaration Merging
- TS-KP268：Interface Merging
- TS-KP269：Namespace Merging
- TS-KP270：Class / Function / Enum 与 Namespace 合并
- TS-KP271：Module Augmentation
- TS-KP272：Global Augmentation
- TS-KP273：扩展第三方库类型

---

# Chapter 20：声明文件 `.d.ts`

- TS-KP274：声明文件的作用
- TS-KP275：Ambient Declaration
- TS-KP276：`declare`
- TS-KP277：声明变量、函数、类与对象
- TS-KP278：Ambient Module
- TS-KP279：Global Declaration
- TS-KP280：UMD 声明
- TS-KP281：模块声明模板
- TS-KP282：全局库声明模板
- TS-KP283：Global-modifying Module
- TS-KP284：Declaration Rollup 基本概念
- TS-KP285：`declaration`
- TS-KP286：`declarationMap`
- TS-KP287：`emitDeclarationOnly`
- TS-KP288：`@types` 与 DefinitelyTyped
- TS-KP289：第三方库缺少类型时的处理
- TS-KP290：声明文件兼容性设计

---

# Chapter 21：JavaScript、JSDoc 与渐进迁移

- TS-KP291：`allowJs`
- TS-KP292：`checkJs`
- TS-KP293：`// @ts-check`
- TS-KP294：`// @ts-nocheck`
- TS-KP295：`// @ts-ignore`
- TS-KP296：`// @ts-expect-error`
- TS-KP297：JSDoc 基础类型注解
- TS-KP298：JSDoc Generic
- TS-KP299：JSDoc Import Types
- TS-KP300：大型 JavaScript 项目渐进迁移策略
- TS-KP301：迁移过程中 `any` 债务治理

---

# Chapter 22：`tsconfig.json` 完整体系

## Lesson 22.1：工程入口与文件集合

- TS-KP302：`files`
- TS-KP303：`include`
- TS-KP304：`exclude`
- TS-KP305：`extends`
- TS-KP306：配置继承策略

## Lesson 22.2：类型检查严格度

- TS-KP307：`strict`
- TS-KP308：`noImplicitAny`
- TS-KP309：`strictNullChecks`
- TS-KP310：`strictFunctionTypes`
- TS-KP311：`strictBindCallApply`
- TS-KP312：`strictPropertyInitialization`
- TS-KP313：`useUnknownInCatchVariables`
- TS-KP314：`noImplicitThis`
- TS-KP315：`noUncheckedIndexedAccess`
- TS-KP316：`exactOptionalPropertyTypes`
- TS-KP317：`noImplicitOverride`
- TS-KP318：`noPropertyAccessFromIndexSignature`
- TS-KP319：`allowUnreachableCode`
- TS-KP320：`allowUnusedLabels`

## Lesson 22.3：Emit 与语言目标

- TS-KP321：`target`
- TS-KP322：`lib`
- TS-KP323：`module`
- TS-KP324：`moduleResolution`
- TS-KP325：`jsx`
- TS-KP326：`sourceMap`
- TS-KP327：`inlineSourceMap`
- TS-KP328：`removeComments`
- TS-KP329：`outDir`
- TS-KP330：`rootDir`
- TS-KP331：`noEmit`
- TS-KP332：`noEmitOnError`
- TS-KP333：`verbatimModuleSyntax`
- TS-KP334：`isolatedModules`
- TS-KP335：`isolatedDeclarations`

## Lesson 22.4：类型加载与兼容

- TS-KP336：`types`
- TS-KP337：`typeRoots`
- TS-KP338：`skipLibCheck`
- TS-KP339：为什么不应把 `skipLibCheck` 当成万能修复

---

# Chapter 23：编译、增量构建与 Project References

- TS-KP340：Incremental Compilation
- TS-KP341：`.tsbuildinfo`
- TS-KP342：Composite Projects
- TS-KP343：Project References
- TS-KP344：`tsc -b`
- TS-KP345：引用图与构建顺序
- TS-KP346：大型 Monorepo 类型边界
- TS-KP347：Solution-style `tsconfig`
- TS-KP348：Watch Build
- TS-KP349：多包共享类型
- TS-KP350：避免跨包源码深层引用

---

# Chapter 24：Decorators 与元编程

- TS-KP351：ECMAScript Decorators 基本模型
- TS-KP352：Class Decorator
- TS-KP353：Method Decorator
- TS-KP354：Field Decorator
- TS-KP355：Accessor Decorator
- TS-KP356：Decorator Context
- TS-KP357：Decorator 返回值与替换行为
- TS-KP358：Decorator 初始化逻辑
- TS-KP359：Legacy `experimentalDecorators`
- TS-KP360：新旧 Decorator 模型差异
- TS-KP361：`emitDecoratorMetadata` 历史用途与限制
- TS-KP362：依赖注入框架中的 Decorator 类型设计

---

# Chapter 25：浏览器、DOM 与 Web API 类型

- TS-KP363：`lib.dom.d.ts`
- TS-KP364：DOM Element 类型层级
- TS-KP365：`HTMLElement` 与具体元素类型
- TS-KP366：`querySelector` 泛型与空值
- TS-KP367：Event 类型
- TS-KP368：EventTarget 类型收窄
- TS-KP369：Form 类型建模
- TS-KP370：Fetch Request / Response 类型
- TS-KP371：Web Storage 类型
- TS-KP372：File / Blob 类型
- TS-KP373：Web Worker 类型
- TS-KP374：不同 `lib` 组合对全局类型的影响

---

# Chapter 26：Node.js + TypeScript

- TS-KP375：Node.js 类型包
- TS-KP376：Node ESM / CJS 类型配置
- TS-KP377：NodeNext 实践
- TS-KP378：`package.json exports` 类型入口
- TS-KP379：Node 内置模块类型
- TS-KP380：环境变量类型与运行时校验
- TS-KP381：Express/Fastify 等服务端 Request 类型扩展思想
- TS-KP382：服务端 DTO 与 Domain Type 分离
- TS-KP383：构建后的运行时路径问题

---

# Chapter 27：React + TypeScript

> 本章只解决 TypeScript 与 React 的交界，不替代 React 专项模块。

- TS-KP384：Component Props
- TS-KP385：Children 类型
- TS-KP386：Event Handler 类型
- TS-KP387：`useState` 类型推断
- TS-KP388：`useRef`
- TS-KP389：`useReducer` 与判别联合
- TS-KP390：Context 类型
- TS-KP391：泛型 React Component
- TS-KP392：Polymorphic Component 类型
- TS-KP393：`ComponentProps`
- TS-KP394：Ref Forwarding 类型
- TS-KP395：Custom Hook 类型设计
- TS-KP396：HOC 类型设计与限制
- TS-KP397：Server / Client Component 类型边界概念

---

# Chapter 28：Vue + TypeScript

> 本章只解决 TypeScript 与 Vue 的交界，不替代 Vue 专项模块。

- TS-KP398：`defineProps`
- TS-KP399：`defineEmits`
- TS-KP400：`withDefaults`
- TS-KP401：`ref` / `reactive` 类型推断
- TS-KP402：Computed 类型
- TS-KP403：Template Ref 类型
- TS-KP404：Provide / Inject 类型
- TS-KP405：Composable 类型设计
- TS-KP406：泛型组件
- TS-KP407：Vue SFC 类型检查链路

---

# Chapter 29：运行时校验与外部数据边界

- TS-KP408：静态类型不能验证 JSON
- TS-KP409：`unknown` 作为外部输入边界
- TS-KP410：手写 Runtime Type Guard
- TS-KP411：Schema Validation 基本思想
- TS-KP412：Zod / Valibot / ArkType 等库的类型推导思路
- TS-KP413：Schema-first 与 Type-first
- TS-KP414：API Response Runtime Validation
- TS-KP415：环境变量 Runtime Validation
- TS-KP416：表单数据 Runtime Validation
- TS-KP417：反序列化与领域模型边界

---

# Chapter 30：API、SDK 与领域类型设计

- TS-KP418：Request / Response Generic
- TS-KP419：Endpoint Definition 类型
- TS-KP420：Path Params 类型
- TS-KP421：Query Params 类型
- TS-KP422：Request Body 类型
- TS-KP423：分页类型
- TS-KP424：统一错误类型
- TS-KP425：Result Type
- TS-KP426：Success / Failure 判别联合
- TS-KP427：HTTP Error 与 Business Error 分离
- TS-KP428：鉴权类型
- TS-KP429：Abort / Timeout 类型接口
- TS-KP430：Retry Policy 类型
- TS-KP431：API Schema 到 Client 类型
- TS-KP432：DTO、Entity、ViewModel 类型边界
- TS-KP433：避免“全局万能类型”
- TS-KP434：让非法状态无法表达

---

# Chapter 31：高级领域建模与类型级设计

- TS-KP435：Algebraic Data Type 直觉
- TS-KP436：Option / Maybe 模式
- TS-KP437：Result / Either 模式
- TS-KP438：Finite State Machine 类型
- TS-KP439：状态迁移约束
- TS-KP440：Branded Identifier
- TS-KP441：单位类型与数值语义
- TS-KP442：不可变领域对象
- TS-KP443：Command / Event 类型
- TS-KP444：Domain Event 判别联合
- TS-KP445：类型安全 Event Bus
- TS-KP446：类型安全配置系统
- TS-KP447：类型安全权限模型
- TS-KP448：类型安全路由定义

---

# Chapter 32：类型级编程与复杂工具类型

- TS-KP449：递归条件类型
- TS-KP450：Recursive Tuple Manipulation
- TS-KP451：Tuple Length / Head / Tail
- TS-KP452：Union to Intersection
- TS-KP453：Union Filtering
- TS-KP454：Object Key Filtering
- TS-KP455：Deep Path 类型
- TS-KP456：Path Value 类型
- TS-KP457：String Parser 类型
- TS-KP458：类型级状态变换
- TS-KP459：递归深度限制
- TS-KP460：Instantiation Depth / Complexity 问题
- TS-KP461：什么时候不应该做类型体操

### Lab 32

完成一组 Type Challenges，但必须为每个答案解释：输入空间、递归终止条件、分布式条件类型行为、推断位置以及性能风险。

---

# Chapter 33：类型测试、错误测试与 API 稳定性

- TS-KP462：类型测试的目标
- TS-KP463：`@ts-expect-error`
- TS-KP464：为什么避免长期依赖 `@ts-ignore`
- TS-KP465：正向类型测试
- TS-KP466：负向类型测试
- TS-KP467：`tsd` 等类型测试工具思想
- TS-KP468：声明文件快照与 API Extractor 思路
- TS-KP469：类型层 SemVer
- TS-KP470：破坏性类型变更
- TS-KP471：库升级的类型回归测试

---

# Chapter 34：性能、诊断与大型工程治理

- TS-KP472：TypeScript 编译性能的主要来源
- TS-KP473：复杂泛型对编辑器性能的影响
- TS-KP474：大型 Union 的成本
- TS-KP475：递归条件类型的成本
- TS-KP476：声明文件膨胀
- TS-KP477：`--extendedDiagnostics`
- TS-KP478：`--generateTrace`
- TS-KP479：模块解析性能
- TS-KP480：Project References 对大型仓库的价值
- TS-KP481：类型包边界治理
- TS-KP482：公共类型与业务内部类型隔离
- TS-KP483：避免跨领域共享巨型 `types.ts`
- TS-KP484：错误信息可读性作为 API 设计指标

---

# Chapter 35：库开发、打包与类型发布

- TS-KP485：Library Source Layout
- TS-KP486：生成 `.d.ts`
- TS-KP487：Declaration Map
- TS-KP488：多入口 Package
- TS-KP489：Conditional Exports
- TS-KP490：ESM/CJS 双格式发布的类型问题
- TS-KP491：Package `types` 字段
- TS-KP492：`exports` 中的类型条件
- TS-KP493：类型入口与运行时入口一致性
- TS-KP494：Tree Shaking 与类型无关但 API 设计相关的边界
- TS-KP495：Bundler 与 `tsc` 职责分离
- TS-KP496：API Extractor / Declaration Bundling 思想
- TS-KP497：发布前类型兼容验证

---

# Chapter 36：Compiler Architecture 与 Compiler API

## Lesson 36.1：编译器内部结构

- TS-KP498：Scanner
- TS-KP499：Parser
- TS-KP500：AST
- TS-KP501：Binder
- TS-KP502：Symbol Table
- TS-KP503：Type Checker
- TS-KP504：Emitter
- TS-KP505：Program
- TS-KP506：SourceFile
- TS-KP507：Node / Symbol / Type 的区别
- TS-KP508：Diagnostics

## Lesson 36.2：Compiler API

- TS-KP509：创建 Program
- TS-KP510：遍历 AST
- TS-KP511：读取 Node 信息
- TS-KP512：TypeChecker API
- TS-KP513：Symbol 查询
- TS-KP514：Printer
- TS-KP515：Transformer 基本思想
- TS-KP516：Language Service 基本职责
- TS-KP517：编写简单静态分析工具

---

# Chapter 37：TypeScript 版本演进与迁移

- TS-KP518：为什么要阅读 Release Notes
- TS-KP519：TypeScript 4.x 中仍重要的历史能力
- TS-KP520：TypeScript 5.x 关键演进
- TS-KP521：Const Type Parameters
- TS-KP522：现代 Decorators 迁移
- TS-KP523：TypeScript 6.x 迁移背景
- TS-KP524：TypeScript 7.x Native Compiler 架构变化
- TS-KP525：TypeScript 7.x 新默认配置对旧项目的影响
- TS-KP526：Deprecated Options 清理
- TS-KP527：大型项目升级策略
- TS-KP528：版本锁定与 CI 类型检查
- TS-KP529：依赖库 TypeScript 版本兼容

---

# Chapter 38：企业级 TypeScript 架构

- TS-KP530：Type Boundary
- TS-KP531：Domain Type 与 Transport Type 分离
- TS-KP532：共享类型包的适用边界
- TS-KP533：前后端共享类型的收益与风险
- TS-KP534：Contract-first API
- TS-KP535：Schema-first API
- TS-KP536：生成类型与手写类型的边界
- TS-KP537：Monorepo 类型依赖方向
- TS-KP538：公共 API 最小化
- TS-KP539：内部复杂泛型封装
- TS-KP540：错误类型标准化
- TS-KP541：权限与 Feature Flag 类型模型
- TS-KP542：国际化 Key 类型
- TS-KP543：配置中心类型模型
- TS-KP544：插件系统类型设计
- TS-KP545：Event-driven Frontend 类型设计
- TS-KP546：大型重构中的类型迁移计划
- TS-KP547：类型债务盘点与治理
- TS-KP548：TypeScript Coding Guidelines
- TS-KP549：类型复杂度 Review Checklist
- TS-KP550：架构层类型验收标准

---

# 四、综合项目

## Project 01：Strict TypeScript Migration

把一个原生 JavaScript 应用逐步迁移到严格 TypeScript：

- 开启 `strict`。
- 消除隐式 `any`。
- 所有外部输入从 `unknown` 开始。
- 使用判别联合表达请求状态。
- 对 API 响应做运行时校验。
- 输出迁移问题清单与类型债务清单。

## Project 02：Type Challenges Laboratory

建立类型体操实验室，覆盖：

- Tuple 操作。
- Union 操作。
- Object Key 变换。
- Conditional Type。
- `infer`。
- Template Literal Type。
- Recursive Types。

要求每题不只给答案，还要解释类型系统执行过程和性能边界。

## Project 03：Type-safe API SDK

实现一个小型类型安全 SDK：

- Endpoint 定义。
- Path / Query / Body 类型。
- Response Generic。
- Success / Failure 判别联合。
- Error 分类。
- Auth。
- Timeout。
- Abort。
- Retry。
- Pagination。
- Runtime Validation。
- Declaration Output。
- Type Tests。

## Project 04：Typed Component / Utility Library

发布一个小型 TypeScript 公共库：

- 多入口。
- ESM。
- `.d.ts`。
- `declarationMap`。
- Package `exports`。
- 类型测试。
- SemVer。
- API 文档。

## Project 05：Enterprise Type Architecture

模拟中大型业务系统：

- Domain Type。
- API DTO。
- ViewModel。
- Permission。
- Feature Flag。
- Router。
- Event Bus。
- Config。
- Shared Package。
- Runtime Schema。

最终输出类型依赖图、公共 API、架构决策记录和治理规范。

---

# 五、阶段验收标准

完成本模块后，应至少能够做到：

1. 不依赖 `any` 完成常规业务开发。
2. 准确解释 `unknown`、`never`、`void` 与 `any`。
3. 熟练使用联合、交叉、判别联合和类型收窄。
4. 能设计泛型 API，而不是只会阅读泛型。
5. 能使用并解释 `keyof`、Indexed Access、Mapped Type、Conditional Type、`infer`、Template Literal Type。
6. 能手写核心 Utility Types 并说明其原理。
7. 理解结构化类型、协变、逆变与 TypeScript 的 Soundness 取舍。
8. 能正确处理 ESM/CJS、模块解析和 NodeNext。
9. 能编写、修复和发布 `.d.ts`。
10. 能从 JavaScript 渐进迁移到 Strict TypeScript。
11. 能合理配置 `tsconfig.json`，而不是复制模板后不理解。
12. 能使用 Project References 设计大型仓库。
13. 能区分静态类型与运行时校验。
14. 能设计类型安全 API SDK。
15. 能为 React / Vue / Node 等生态提供可靠类型边界。
16. 能建立类型测试和库 API 兼容性检查。
17. 能定位复杂类型导致的编译与编辑器性能问题。
18. 能理解 TypeScript 编译器 Scanner、Parser、Binder、Checker、Emitter 的基本职责。
19. 能用 Compiler API 完成简单 AST/类型分析工具。
20. 能针对大型企业项目制定类型边界、共享策略和类型债务治理方案。

---

# 六、施工进度

当前状态：**课程地图 v1 已建立，详细课程文件持续生成中。**

| 范围 | 状态 |
| --- | --- |
| Chapter 01-38 | 已规划 |
| TS-KP001 ~ TS-KP550 | 已规划 |
| Labs | 待细化 |
| Projects 01-05 | 已规划 |
| 原子知识点 README | 持续生成 |
| 可运行源码 | 持续生成 |

后续施工顺序默认按 Chapter 01 → Chapter 38 进行；框架交界章节可以在对应 React/Vue 学习阶段再次回看。
