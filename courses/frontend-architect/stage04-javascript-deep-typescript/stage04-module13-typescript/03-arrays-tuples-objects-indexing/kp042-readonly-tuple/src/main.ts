type Coordinate = readonly [number, number];
type Snapshot = readonly [{ name: string }, number];

const mutableCoordinate: [number, number] = [120.5, 30.2];
const coordinate: Coordinate = mutableCoordinate;

function formatCoordinate(value: Coordinate): string {
  return `${value[0].toFixed(1)},${value[1].toFixed(1)}`;
}

const snapshot: Snapshot = [{ name: 'Keyboard' }, 1];
snapshot[0].name = 'Mechanical Keyboard';

console.log(formatCoordinate(coordinate));
console.log(snapshot[0].name);
console.log(Array.isArray(coordinate));
