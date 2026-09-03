interface InvoiceLine {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
}

let inferredCount = 0;
// 推断已经把 inferredCount 建模成 number。
// @ts-expect-error -- 不能再赋 string
inferredCount = "one";

const lines: InvoiceLine[] = [];

// 空数组若没有上下文，常常无法表达真正的领域意图；边界应显式标注。
// @ts-expect-error -- quantity 必须是 number
lines.push({ description: "Review", quantity: "2", unitPrice: 300 });

function withExplicitReturn(value: number): string {
  // 显式返回类型帮助编译器在函数内部定位契约漂移。
  // @ts-expect-error -- 约定返回 string，实际返回 number
  return value;
}

const names = ["Ada", "Lin"];
// map 的回调参数由数组元素提供 Contextual Typing，无需重复写 name: string。
const lengths = names.map((name) => name.length);

void inferredCount;
void withExplicitReturn;
void lengths;
