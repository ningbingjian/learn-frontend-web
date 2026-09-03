import {
  annotatedConfig,
  preciseConfig,
  type AppConfig,
  type RouteDefinition,
  type RouteName
} from "./index.js";

const directExtra: AppConfig = {
  environment: "prod",
  retries: 3,
  features: [],
  // @ts-expect-error -- Fresh Object Literal 会执行 Excess Property Check。
  owner: "platform"
};
void directExtra;

const wrongEnvironment = {
  // @ts-expect-error -- satisfies 验证值是否满足目标契约。
  environment: "production",
  retries: 3,
  features: []
} satisfies AppConfig;
void wrongEnvironment;

const missingRetries = {
  environment: "prod",
  features: []
  // @ts-expect-error -- satisfies 不会替缺失字段补默认值。
} satisfies AppConfig;
void missingRetries;

const extraWithSatisfies = {
  environment: "prod",
  retries: 3,
  features: [],
  // @ts-expect-error -- Fresh Literal + satisfies 同样检查多余字段。
  owner: "platform"
} satisfies AppConfig;
void extraWithSatisfies;

// 类型标注把 environment 暴露为完整 Environment，而不是当前值 "prod"。
// @ts-expect-error -- annotatedConfig.environment 已经被声明成 Environment。
const annotatedProdOnly: "prod" = annotatedConfig.environment;
void annotatedProdOnly;

// satisfies 保留原表达式的精确推断。
const preciseProdOnly: "prod" = preciseConfig.environment;
void preciseProdOnly;

const incompleteRoutes = {
  home: { path: "/", secure: false },
  jobs: { path: "/jobs", secure: true }
  // @ts-expect-error -- Known Key Record 必须覆盖 settings。
} satisfies Record<RouteName, RouteDefinition>;
void incompleteRoutes;
