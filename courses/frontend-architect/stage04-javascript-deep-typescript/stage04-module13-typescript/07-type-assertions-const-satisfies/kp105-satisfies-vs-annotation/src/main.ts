type ThemeConfig = {
  mode: 'light' | 'dark';
  spacing: number;
};

const annotated: ThemeConfig = {
  mode: 'dark',
  spacing: 8
};

const checked = {
  mode: 'dark',
  spacing: 8
} satisfies ThemeConfig;

function requireDark(mode: 'dark'): string {
  return `mode=${mode}`;
}

console.log(annotated.mode);
console.log(requireDark(checked.mode));
