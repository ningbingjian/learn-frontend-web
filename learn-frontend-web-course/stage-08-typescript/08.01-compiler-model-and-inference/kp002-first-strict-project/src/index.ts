type Theme = "light" | "dark";

interface UserPreferences {
  displayName: string;
  theme: Theme;
  locale?: string;
  shortcuts: Record<string, string>;
}

function normalizeDisplayName(input: string): string {
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : "Anonymous";
}

function createPreferenceReport(preferences: UserPreferences): string {
  const displayName = normalizeDisplayName(preferences.displayName);
  const locale = preferences.locale ?? "zh-CN";
  const paletteShortcut = preferences.shortcuts["openPalette"] ?? "not configured";

  return [
    `Hello ${displayName}`,
    `theme=${preferences.theme}`,
    `locale=${locale}`,
    `palette=${paletteShortcut}`
  ].join(" · ");
}

const preferences: UserPreferences = {
  displayName: " Ada ",
  theme: "dark",
  shortcuts: {
    openPalette: "Ctrl+K"
  }
};

console.log(createPreferenceReport(preferences));
