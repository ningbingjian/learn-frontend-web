type Theme = "light" | "dark";

interface UserPreferences {
  displayName: string;
  theme: Theme;
  locale?: string;
  shortcuts: Record<string, string>;
}

// strictNullChecks：null 不能赋给 string。
// @ts-expect-error -- title 必须是 string
const title: string = null;

// noImplicitAny 属于 strict 家族。
// @ts-expect-error -- value 缺少参数类型
function unsafeFormat(value) {
  return String(value);
}

const preferences: UserPreferences = {
  displayName: "Ada",
  theme: "light",
  shortcuts: {}
};

// noUncheckedIndexedAccess：动态索引读取可能不存在。
// @ts-expect-error -- 结果是 string | undefined
const missingShortcut: string = preferences.shortcuts["missing"];

// exactOptionalPropertyTypes：可选属性缺失不等于显式写 undefined。
// @ts-expect-error -- locale 声明为可缺失，但存在时必须是 string
const invalidOptional: UserPreferences = {
  displayName: "Ada",
  theme: "dark",
  shortcuts: {},
  locale: undefined
};

// @ts-expect-error -- sepia 不属于 Theme
const invalidTheme: Theme = "sepia";

void title;
void unsafeFormat;
void missingShortcut;
void invalidOptional;
void invalidTheme;
