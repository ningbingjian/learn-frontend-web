import {
  account,
  type ImmutableAccount,
  type PreferencePatch,
  type Preferences
} from "./index.js";

// @ts-expect-error -- readonly id 不允许重新赋值。
account.id = "ACCOUNT-2";

// exactOptionalPropertyTypes 下，缺失和显式 undefined 不相同。
// @ts-expect-error -- theme?: Theme 不接受显式 undefined。
const invalidPreferences: Preferences = {
  locale: "en-US",
  tags: [],
  theme: undefined
};
void invalidPreferences;

// @ts-expect-error -- Patch 中的 Optional theme 同样不能写 undefined。
const invalidPatch: PreferencePatch = { theme: undefined };
void invalidPatch;

declare const immutable: ImmutableAccount;
// @ts-expect-error -- 深层 readonly locale 不可修改。
immutable.preferences.locale = "zh-CN";
// @ts-expect-error -- readonly string[] 没有 push。
immutable.preferences.tags.push("beta");
