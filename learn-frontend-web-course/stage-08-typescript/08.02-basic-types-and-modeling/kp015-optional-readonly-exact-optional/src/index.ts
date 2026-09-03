export type Theme = "light" | "dark";

export interface Preferences {
  theme?: Theme;
  locale: string;
  tags: string[];
}

export interface Account {
  readonly id: string;
  readonly preferences: Preferences;
}

export interface PreferencePatch {
  theme?: Theme;
  locale?: string;
  tags?: string[];
}

export type PreferenceCommand =
  | { type: "patch"; patch: PreferencePatch }
  | { type: "clear-theme" };

export interface ImmutablePreferences {
  readonly theme?: Theme;
  readonly locale: string;
  readonly tags: readonly string[];
}

export interface ImmutableAccount {
  readonly id: string;
  readonly preferences: ImmutablePreferences;
}

export function applyPatch(
  preferences: Preferences,
  patch: PreferencePatch
): Preferences {
  return {
    ...preferences,
    ...(patch.theme === undefined ? {} : { theme: patch.theme }),
    ...(patch.locale === undefined ? {} : { locale: patch.locale }),
    ...(patch.tags === undefined ? {} : { tags: [...patch.tags] })
  };
}

export function applyCommand(
  preferences: Preferences,
  command: PreferenceCommand
): Preferences {
  if (command.type === "patch") return applyPatch(preferences, command.patch);
  const { theme: _removedTheme, ...withoutTheme } = preferences;
  return withoutTheme;
}

export const account: Account = {
  id: "ACCOUNT-1",
  preferences: {
    theme: "dark",
    locale: "en-US",
    tags: ["stable"]
  }
};

const patched = applyCommand(account.preferences, {
  type: "patch",
  patch: {
    theme: "light",
    locale: "zh-CN",
    tags: ["stable", "beta"]
  }
});
const cleared = applyCommand(patched, { type: "clear-theme" });

// readonly preferences 只保护引用本身，嵌套对象仍然可变。
account.preferences.locale = "ja-JP";
account.preferences.tags.push("mutable");

console.log("OPTIONAL_READONLY");
console.log("initial=dark:en-US:stable");
console.log(`patched=${patched.theme ?? "system"}:${patched.locale}:${patched.tags.join(",")}`);
console.log(`cleared=${cleared.theme ?? "system"}:${cleared.locale}`);
console.log(`shallowMutation=${account.preferences.locale}:${account.preferences.tags.length}`);
