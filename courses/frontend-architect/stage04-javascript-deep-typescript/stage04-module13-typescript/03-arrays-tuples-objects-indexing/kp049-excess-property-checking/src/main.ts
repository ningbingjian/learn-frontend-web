type PanelOptions = {
  color?: string;
  width?: number;
};

function createPanel(options: PanelOptions): string {
  const color = options.color ?? 'gray';
  const width = options.width ?? 200;
  return `${color}:${width}`;
}

const reusableOptions = {
  color: 'blue',
  width: 320,
  opacity: 0.8
};

console.log(createPanel({ color: 'red', width: 240 }));
console.log(createPanel(reusableOptions));
