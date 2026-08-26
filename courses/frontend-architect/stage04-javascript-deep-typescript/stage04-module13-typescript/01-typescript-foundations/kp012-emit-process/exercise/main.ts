type Settings = {
  theme?: {
    name?: string;
  };
};

const settings: Settings = {};
const themeName = settings.theme?.name ?? 'default';

console.log(themeName);
