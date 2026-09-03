import {
  assertNever,
  type BuildEvent
} from "./index.js";

// 新增分支后，旧 switch 不再穷尽。
type ExtendedBuildEvent = BuildEvent | { kind: "configuration"; option: string };

function incompleteSummary(event: ExtendedBuildEvent): string {
  switch (event.kind) {
    case "diagnostic":
      return `TS${event.code}`;
    case "runtime":
      return event.message;
  }

  // @ts-expect-error -- configuration 分支尚未处理，因此 event 不是 never。
  return assertNever(event);
}

void incompleteSummary;
