# KP016：Array、ReadonlyArray、共享引用与可变性风险

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 基础类型与数据建模 |
| 深度 | Must / Should |
| Pattern | FAILURE-LAB + MUTABILITY-LAB + DOMAIN-MODELING-LAB |
| 主问题 | `readonly T[]` 已经不允许 `push`，为什么数据仍然可能被其他引用修改？ |
| 最终证据 | Expected Error、共享别名 Runtime、Snapshot 对照、Declaration Emit |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课会建立一个广告 Campaign 的受众 Segment 模型，分别保留三种视图：

```text
可变源数组 sharedSegments
→ readonlyView：同一数组的只读访问视图
→ snapshot：防御性复制得到的只读快照
```

随后主动执行两类修改：

```text
通过 readonlyView 修改“可变元素”的字段
通过 sharedSegments 别名 push 新元素
```

你会观察到：

```text
readonlyView 不能 push / splice / 替换索引
但它并没有冻结原数组
也没有自动把数组元素变成深层 readonly
```

最终再通过 `createSnapshot()` 和 `appendSegment()` 建立生产可用的边界：

```text
外部可变集合
→ 防御性复制
→ readonly collection + readonly element
→ 非破坏性更新返回新数组
```

---

## 2. 核心结论

### 2.1 `T[]` 表示可变数组

`SegmentInput[]` 允许：

```ts
segments.push(segment);
segments[0] = nextSegment;
segments.sort(...);
segments.reverse();
```

因此只要函数参数声明为 `T[]`，调用者就必须假设函数可能修改传入集合。

### 2.2 `readonly T[]` 只限制当前访问路径

`readonly SegmentInput[]` 禁止通过这个引用修改数组结构，但底层对象仍然可能同时被另一个可变引用持有：

```ts
const source: SegmentInput[] = [];
const view: readonly SegmentInput[] = source;
source.push(...);
```

`view.length` 会变化，因为两者指向同一个 Runtime Array。

### 2.3 ReadonlyArray 不会自动让元素深度只读

下面的类型：

```ts
readonly SegmentInput[]
```

只让数组容器只读。`SegmentInput` 的字段仍然可写，所以：

```ts
view[0]!.name = "changed";
```

仍然合法。

若需要集合和元素都只读，必须明确表达：

```ts
readonly SegmentView[]
```

其中 `SegmentView` 的字段本身也是 `readonly`。

### 2.4 静态 readonly 不等于 Runtime Freeze

TypeScript 的 readonly 在 Emit 后会消失。它不会自动调用：

```ts
Object.freeze(...)
```

也不会阻止 JavaScript、反射、第三方库或其他别名修改对象。需要 Runtime 不可变时，必须另外选择 Freeze、深拷贝、不可变数据结构或状态管理策略。

---

## 3. 前置知识与课程边界

### 前置知识

- KP015：理解浅层 `readonly` 与嵌套对象的区别。
- 理解 JavaScript Array 是引用类型。
- 能运行 `check`、`build`、`start` 和 `verify`。

### 本课完整拥有

- `T[]`、`Array<T>`、`readonly T[]`、`ReadonlyArray<T>` 的职责。
- 可变数组与只读数组之间的赋值方向。
- Shared Reference / Alias Mutation。
- Readonly Collection 与 Readonly Element 的区别。
- 函数输入为什么优先声明为 readonly。
- Defensive Copy 与 Snapshot。
- 非破坏性追加和返回新集合。

### 暂不展开

- Tuple 的固定位置语义：KP017。
- Deep Readonly Utility Type：08.06。
- Immer、Persistent Data Structure 与状态管理：后续架构 Stage。
- Runtime Deep Freeze 实现：后续 Runtime / Architecture 课程。

---

## 4. 项目目录

```text
kp016-array-readonlyarray-shared-mutation/
├── README.md
├── package.json
├── tsconfig.json
├── verify.mjs
└── src/
    ├── index.ts
    └── expected-errors.ts
```

每个文件都服务于同一个主问题，不依赖上一课的目录、依赖或构建产物。

---

## 5. 从零运行

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

| 命令 | 验证内容 |
| --- | --- |
| `npm run check` | 正常源码通过；ReadonlyArray 的非法修改继续报错 |
| `npm run build` | 生成 JavaScript、`.d.ts`、Declaration Map 与 Source Map |
| `npm start` | 观察共享引用和快照的真实 Runtime 差异 |
| `npm run verify` | 自动检查输出、声明签名和课程不变量 |

---

## 6. 实现步骤

### Step 1：区分输入模型与只读视图

可变编辑模型：

```ts
interface SegmentInput {
  id: string;
  name: string;
  weight: number;
}
```

只读输出模型：

```ts
interface SegmentView {
  readonly id: string;
  readonly name: string;
  readonly weight: number;
}
```

不要只在数组上写 readonly，却忘记元素本身仍可变。

### Step 2：建立同一数组的两个访问路径

```ts
const sharedSegments: SegmentInput[] = [...];
const readonlyView: readonly SegmentInput[] = sharedSegments;
```

它们的静态权限不同，但 Runtime Identity 相同。

### Step 3：通过只读数组访问可变元素

```ts
readonlyView[0]!.name = "Changed through readonly element";
```

这条代码用于证明：ReadonlyArray 保护集合结构，不自动保护元素字段。

### Step 4：通过可变别名改变数组结构

```ts
sharedSegments.push(...);
```

`readonlyView` 也会观察到长度变化。Readonly View 不是 Snapshot。

### Step 5：建立防御性复制

```ts
segments: draft.segments.map((segment) => ({ ...segment }))
```

这里只复制一层，因为当前 `SegmentInput` 只包含 Primitive。若元素内部继续包含 Object / Array，就必须重新评估复制深度。

### Step 6：对只读输入执行非破坏性更新

```ts
function appendSegment(
  segments: readonly SegmentView[],
  segment: SegmentView
): SegmentView[] {
  return [...segments, { ...segment }];
}
```

函数明确不修改输入，而是返回新数组。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export interface SegmentInput {
  id: string;
  name: string;
  weight: number;
}

export interface SegmentView {
  readonly id: string;
  readonly name: string;
  readonly weight: number;
}

export interface CampaignDraft {
  id: string;
  segments: SegmentInput[];
}

export interface CampaignSnapshot {
  readonly id: string;
  readonly segments: readonly SegmentView[];
}

export function renameFirstSegment(
  segments: SegmentInput[],
  nextName: string
): void {
  const first = segments[0];
  if (first !== undefined) first.name = nextName;
}

export function summarizeSegments(segments: readonly SegmentView[]): string {
  return segments.map((segment) => `${segment.name}@${segment.weight}`).join("|");
}

export function createSnapshot(draft: CampaignDraft): CampaignSnapshot {
  return {
    id: draft.id,
    segments: draft.segments.map((segment) => ({ ...segment }))
  };
}

export function appendSegment(
  segments: readonly SegmentView[],
  segment: SegmentView
): SegmentView[] {
  return [...segments, { ...segment }];
}

export const sharedSegments: SegmentInput[] = [
  { id: "SEG-NEW", name: "New households", weight: 60 },
  { id: "SEG-RETURN", name: "Returning viewers", weight: 40 }
];

export const readonlyView: readonly SegmentInput[] = sharedSegments;

export const draft: CampaignDraft = {
  id: "CAMPAIGN-2026",
  segments: sharedSegments
};

export const snapshot = createSnapshot(draft);

// ReadonlyArray 只禁止通过 readonlyView 改变集合结构；元素仍是可变的 SegmentInput。
readonlyView[0]!.name = "Changed through readonly element";

// 另一个可变别名依然可以改变同一个数组，readonlyView 会观察到变化。
sharedSegments.push({ id: "SEG-LOYAL", name: "Loyal viewers", weight: 20 });

export const extendedSnapshot = appendSegment(snapshot.segments, {
  id: "SEG-PREMIUM",
  name: "Premium viewers",
  weight: 10
});

console.log("ARRAY_READONLY");
console.log(`draft=${draft.segments[0]!.name}:${draft.segments.length}`);
console.log(`readonlyView=${readonlyView[0]!.name}:${readonlyView.length}`);
console.log(`snapshot=${snapshot.segments[0]!.name}:${snapshot.segments.length}`);
console.log(`extended=${extendedSnapshot.map((segment) => segment.name).join(",")}`);
console.log(`summary=${summarizeSegments(snapshot.segments)}`);
```

### `src/expected-errors.ts`

```ts
import {
  readonlyView,
  renameFirstSegment,
  snapshot,
  type SegmentInput,
  type SegmentView
} from "./index.js";

// @ts-expect-error -- ReadonlyArray 没有 push。
readonlyView.push({ id: "SEG-X", name: "X", weight: 1 });

// @ts-expect-error -- ReadonlyArray 不允许替换索引位置。
readonlyView[0] = { id: "SEG-X", name: "X", weight: 1 };

// @ts-expect-error -- 需要可变数组的函数不能接收 readonly 数组。
renameFirstSegment(readonlyView, "Unsafe rename");

// @ts-expect-error -- Snapshot 的元素属性也被建模为 readonly。
snapshot.segments[0]!.name = "Mutated snapshot";

// @ts-expect-error -- readonly SegmentView[] 不能赋给可变 SegmentInput[]。
const mutableSegments: SegmentInput[] = snapshot.segments;
void mutableSegments;

const mutableElement: SegmentInput = { id: "SEG-M", name: "Mutable", weight: 1 };
const readonlyElement: SegmentView = mutableElement;
void readonlyElement;
```

正常源码证明“允许什么”，Expected Error 证明“禁止什么”。两者共同定义 API Contract。

---

## 8. Failure Lab：为什么加了 readonly 仍然被改了

### 故障现象

团队把函数参数改成：

```ts
function render(segments: readonly SegmentInput[]) {}
```

随后认为数据已经完全不可变。但某处仍然持有：

```ts
SegmentInput[]
```

并对它执行 `push()`，页面观察到长度变化；另一处还通过 `segments[0].name` 修改了元素。

### 根因

```text
ReadonlyArray 是访问权限
不是所有权转移
不是快照
不是深度不可变
不是 Runtime Freeze
```

### 修复策略

根据业务边界选择：

```text
只是不希望函数修改输入
→ 参数使用 readonly T[]

需要稳定快照
→ 进入边界时复制数组

元素也不能修改
→ readonly ReadonlyElement[]

Runtime 必须冻结
→ Object.freeze / Deep Freeze / Immutable Structure
```

不要用一个 readonly 解决四个不同问题。

---

## 9. 预期 Runtime 输出

```text
ARRAY_READONLY
draft=Changed through readonly element:3
readonlyView=Changed through readonly element:3
snapshot=New households:2
extended=New households,Returning viewers,Premium viewers
summary=New households@60|Returning viewers@40
```

其中最关键的对照是：

```text
draft / readonlyView
→ 被共享引用修改

snapshot
→ 因复制而保持原始值和长度
```

---

## 10. Assignability 规则

常见赋值方向：

```text
SegmentInput[]
→ readonly SegmentInput[]        ✅

readonly SegmentInput[]
→ SegmentInput[]                 ❌
```

原因是把只读数组交给可变位置后，对方可能 `push`、`sort` 或替换元素，从而破坏原调用者的保证。

函数签名也应表达相同意图：

```text
只读函数
summarize(items: readonly T[])

确实会修改调用者数组的函数
sortInPlace(items: T[])
```

默认优先前者；只有 API 契约明确要求原地修改时才使用可变参数。

---

## 11. 生产级规则

1. **只读输入优先**：不修改调用者集合的函数，参数使用 `readonly T[]`。
2. **说明所有权**：公共 API 文档必须说明是 Borrow、Copy、Transfer 还是 Snapshot。
3. **元素单独建模**：ReadonlyArray 不等于 Readonly Element。
4. **边界防御性复制**：缓存、Store、SDK 返回值和异步任务快照不得直接泄漏内部可变数组。
5. **复制深度可解释**：元素有嵌套引用时，必须说明浅拷贝是否足够。
6. **禁止用断言去除 readonly**：需要可变副本时显式复制，而不是 `as T[]`。

---

## 12. 常见误区

1. **`const arr` 就是不可变数组**：`const` 只禁止变量重新绑定，仍可 `push()`。
2. **ReadonlyArray 会冻结 Runtime**：类型在 Emit 后被擦除。
3. **数组 readonly 后元素也 readonly**：容器和元素是两层契约。
4. **Spread 一定是深拷贝**：`[...items]` 只复制数组容器。
5. **所有函数都接收 `T[]`**：这会不必要地拒绝 readonly 调用者，并暗示函数可能修改输入。
6. **把 readonly 断言成 mutable**：只是伪造权限，没有获得安全所有权。

---

## 13. Mastery Check

不看本课源码，独立完成：

1. 创建一个 `readonly Product[]`，再通过原始可变别名改变它的长度。
2. 证明 readonly 数组中的可变 Product 字段仍然可以修改。
3. 建立 `ProductView`，同时让集合和元素字段只读。
4. 写一个接收 readonly 输入、返回新数组的排序或追加函数。
5. 为非法 `push`、索引替换和 readonly → mutable 赋值建立 Expected Error。
6. 解释何时需要 Copy，何时需要 Runtime Freeze。

---

## 14. 证据阅读与排障

阅读 `src/index.ts` 时，标出可变源、readonly view、snapshot 和新数组四种身份；再对照 `expected-errors.ts`，确认被拒绝的是“通过当前引用修改”，不是“世界上再也没人能修改”。

完整验收链：

```text
Type Check
+ Expected Error
+ Declaration Emit
+ Shared Reference Runtime
+ Snapshot Runtime
```

排障时优先问：当前变量是同一对象的 View，还是独立 Copy？元素类型是否也 readonly？真正需要的是静态权限、稳定快照还是 Runtime Freeze？
