import { calculateQuote } from "./pricing.js";
import type { QuoteRequest } from "./pricing.js";

// Checker 阶段：字段类型不兼容。
// @ts-expect-error -- units 必须是 number
const invalidRequest: QuoteRequest = { units: "4", unitPrice: 25 };

// Checker 阶段：对象缺少必填字段 unitPrice。
// @ts-expect-error -- unitPrice 是必填字段
calculateQuote({ units: 4 });

void invalidRequest;
