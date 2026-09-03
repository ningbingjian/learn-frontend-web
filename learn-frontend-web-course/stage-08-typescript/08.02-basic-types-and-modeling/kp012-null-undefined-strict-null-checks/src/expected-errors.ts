import type { Profile, RawProfileDto } from "./index.js";

const dto: RawProfileDto = {
  id: "USER-2",
  displayName: null,
  avatarUrl: null
};

// @ts-expect-error -- displayName 可能为 null，必须先缩小或标准化。
dto.displayName.toUpperCase();

// @ts-expect-error -- strictNullChecks 阻止 null 流入普通 string。
const name: string = null;
void name;

// exactOptionalPropertyTypes 下，缺失与显式 undefined 不相同。
// @ts-expect-error -- nickname?: string 不接受显式 undefined 写入。
const profile: Profile = {
  id: "USER-3",
  displayName: "Ada",
  nickname: undefined
};
void profile;
