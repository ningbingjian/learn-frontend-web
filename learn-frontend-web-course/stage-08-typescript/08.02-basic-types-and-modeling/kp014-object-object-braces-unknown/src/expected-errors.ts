import {
  describeNonNullish,
  describeObject
} from "./index.js";

// @ts-expect-error -- object 排除 Primitive string。
describeObject("text");

// @ts-expect-error -- {} 排除 null 和 undefined。
describeNonNullish(null);

declare const unknownValue: unknown;
// @ts-expect-error -- unknown 缩小前不能访问属性。
unknownValue.label;

declare const objectValue: object;
// @ts-expect-error -- object 只说明非 Primitive，没有声明 name 属性。
objectValue.name;

// 下面两行说明 {} 过宽：Primitive 非 nullish 值也能进入。
const broadNumber: {} = 42;
const broadString: Object = "hello";
void broadNumber;
void broadString;
