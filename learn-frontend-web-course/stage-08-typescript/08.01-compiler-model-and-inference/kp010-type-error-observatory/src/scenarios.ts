export type DiagnosticKind =
  | "syntax"
  | "type"
  | "module"
  | "configuration"
  | "runtime";

export interface DiagnosticScenario {
  id: string;
  title: string;
  kind: DiagnosticKind;
  rootCause: string;
  firstEvidence: string;
  priority: number;
  cascadeCount: number;
}

export const scenarios: readonly DiagnosticScenario[] = [
  { id: "CFG-001", title: "strict 未开启", kind: "configuration", rootCause: "配置基线缺失", firstEvidence: "tsc --showConfig", priority: 100, cascadeCount: 5 },
  { id: "MOD-001", title: "错误模块入口", kind: "module", rootCause: "exports 与 Runtime 文件不一致", firstEvidence: "tsc --traceResolution", priority: 95, cascadeCount: 4 },
  { id: "TYP-001", title: "声明字段错误", kind: "type", rootCause: "上游 DTO 声明不真实", firstEvidence: "第一条 TS2322", priority: 90, cascadeCount: 4 },
  { id: "TYP-002", title: "Literal 被扩大", kind: "type", rootCause: "可变位置丢失精确信息", firstEvidence: "Declaration Emit", priority: 70, cascadeCount: 1 },
  { id: "TYP-003", title: "Context 丢失", kind: "type", rootCause: "回调脱离目标位置", firstEvidence: "Hover + TS7006", priority: 70, cascadeCount: 1 },
  { id: "TYP-004", title: "方向判断错误", kind: "type", rootCause: "Source 不满足 Target", firstEvidence: "最小赋值表达式", priority: 65, cascadeCount: 1 },
  { id: "RUN-001", title: "断言伪造输入", kind: "runtime", rootCause: "缺少 Runtime Validation", firstEvidence: "Runtime stack", priority: 85, cascadeCount: 2 },
  { id: "SYN-001", title: "括号未闭合", kind: "syntax", rootCause: "源文件语法错误", firstEvidence: "第一条 Parser Diagnostic", priority: 99, cascadeCount: 1 },
  { id: "RUN-002", title: "非空断言失效", kind: "runtime", rootCause: "undefined 被强制忽略", firstEvidence: "Runtime fixture", priority: 80, cascadeCount: 1 }
];

export function orderForTriage(
  input: readonly DiagnosticScenario[]
): DiagnosticScenario[] {
  return [...input].sort((left, right) => right.priority - left.priority);
}
