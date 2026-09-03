import type { Project } from "./index.js";

declare const externalInput: unknown;

// @ts-expect-error -- unknown 在缩小前不能直接访问属性。
externalInput.name;

// @ts-expect-error -- number 与 string 没有足够重叠，编译器拒绝单次断言。
const impossible = 42 as string;
void impossible;

declare const maybeToken: string | undefined;
// @ts-expect-error -- 可能为 undefined，必须先处理缺失状态。
maybeToken.length;

// 双重断言可以绕过上面的保护，因此这里只作为反例。
const forged = 42 as unknown as Project;
void forged;
