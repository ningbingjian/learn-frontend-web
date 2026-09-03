import {
  assertNever,
  emitMessages,
  type Command
} from "./index.js";

declare const external: unknown;
// @ts-expect-error -- unknown 必须先缩小后才能读取属性。
external.label;

const result = emitMessages(() => 1);
// @ts-expect-error -- void 结果不能作为 number 使用。
const count: number = result;
void count;

// @ts-expect-error -- 普通字符串不能赋给 never。
const impossible: never = "reachable";
void impossible;

type ExtendedCommand = Command | { type: "pause"; jobId: string };

function incomplete(command: ExtendedCommand): string {
  switch (command.type) {
    case "start":
    case "stop":
    case "status":
      return command.type;
  }

  // @ts-expect-error -- pause 尚未处理，因此 command 不是 never。
  return assertNever(command);
}

void incomplete;
