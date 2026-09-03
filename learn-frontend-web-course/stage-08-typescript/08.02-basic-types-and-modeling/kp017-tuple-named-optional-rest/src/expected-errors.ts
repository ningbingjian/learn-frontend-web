import {
  deployCommand,
  type ApiSuccess,
  type Coordinate,
  type UserRow
} from "./index.js";

// @ts-expect-error -- Coordinate 必须包含两个位置。
const missingLatitude: Coordinate = [121.4737];
void missingLatitude;

// @ts-expect-error -- Tuple 的第一个位置必须是 string id。
const wrongOrder: UserRow = [98, "USER-1", true];
void wrongOrder;

// @ts-expect-error -- Optional requestId 之后不能再出现额外位置。
const tooMany: ApiSuccess<string> = [200, "ok", "REQ-1", "EXTRA"];
void tooMany;

// @ts-expect-error -- status 是字面量 200，不能写成 201。
const wrongStatus: ApiSuccess<string> = [201, "created"];
void wrongStatus;

// @ts-expect-error -- readonly tuple 没有 push。
deployCommand.push("--force");

const plainArray: string[] = ["deploy", "--env", "prod"];
// @ts-expect-error -- 普通数组不能证明至少存在 name 位置。
const commandTuple: readonly [name: string, ...args: string[]] = plainArray;
void commandTuple;
