import {
  counters,
  partialCapacity,
  type CompleteRegionCapacity,
  type OpenCounterMap
} from "./index.js";

// noUncheckedIndexedAccess 让动态索引读取成为 number | undefined。
// @ts-expect-error -- 未知键不能直接当成一定存在的 number。
const unsafeCounter: number = counters["missing"];
void unsafeCounter;

// @ts-expect-error -- Complete Record 必须覆盖所有 RegionCode。
const incompleteCapacity: CompleteRegionCapacity = {
  "us-west": 100,
  "us-east": 90
};
void incompleteCapacity;

const extraCapacity: CompleteRegionCapacity = {
  "us-west": 100,
  "us-east": 90,
  "eu-central": 80,
  // @ts-expect-error -- Known Key Record 不接受集合外的区域。
  "ap-south": 70
};
void extraCapacity;

// @ts-expect-error -- Partial Record 的成员读取仍可能缺失。
const unsafePartial: number = partialCapacity["us-east"];
void unsafePartial;

interface InvalidMixedDictionary {
  readonly [key: string]: number;
  // @ts-expect-error -- 显式属性也必须兼容 Index Signature 的值类型。
  readonly name: string;
}
void (0 as unknown as InvalidMixedDictionary);

const knownShape = {
  requests: 1,
  errors: 2
};
declare const dynamicKey: string;
// @ts-expect-error -- 没有 Index Signature 的已知对象不能用任意 string 索引。
knownShape[dynamicKey];

const openMap: OpenCounterMap = {};
// @ts-expect-error -- 即使值类型是 number，动态读取仍可能是 undefined。
const mustExist: number = openMap["anything"];
void mustExist;
