import {
  CONFIG_TOKEN,
  ServiceRegistry,
  type AppConfig
} from "./index.js";

const boxed: String = new String("x");

// @ts-expect-error -- Wrapper Object String 不能赋给 Primitive string。
const primitive: string = boxed;
void primitive;

// @ts-expect-error -- bigint 与 number 不能直接混合运算。
const mixed = 1n + 1;
void mixed;

const registry = new ServiceRegistry();
// @ts-expect-error -- CONFIG_TOKEN 只能绑定 AppConfig。
registry.set(CONFIG_TOKEN, { log: () => "wrong service" });

const arbitrary = Symbol("app-config");
// @ts-expect-error -- 普通 symbol 不能伪装成 CONFIG_TOKEN 的 unique symbol 类型。
const forgedToken: typeof CONFIG_TOKEN = arbitrary;
void forgedToken;

const valid: AppConfig = { environment: "development" };
registry.set(CONFIG_TOKEN, valid);
