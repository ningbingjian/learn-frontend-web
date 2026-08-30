const collected: string[] = [];

type Consumer = (value: string) => void;

const pushValue = (value: string): number => collected.push(value);
const consume: Consumer = pushValue;

const ignored = consume('Keyboard');
console.log(collected.join(' | '));
console.log(ignored);

['Mouse', 'Monitor'].forEach((value) => collected.push(value));
console.log(collected.join(' | '));
