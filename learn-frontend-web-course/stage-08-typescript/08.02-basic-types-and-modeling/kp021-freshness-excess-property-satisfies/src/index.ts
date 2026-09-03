export type Environment = "dev" | "staging" | "prod";

export interface AppConfig {
  readonly environment: Environment;
  readonly retries: number;
  readonly features: readonly string[];
}

export const annotatedConfig: AppConfig = {
  environment: "prod",
  retries: 3,
  features: ["audit", "metrics"]
};

export const preciseConfig = {
  environment: "prod",
  retries: 3,
  features: ["audit", "metrics"]
} as const satisfies AppConfig;

// 变量中转后，结构赋值只检查目标所需字段；额外 owner 仍存在于 Runtime。
export const stagedWithExtra = {
  environment: "prod",
  retries: 3,
  features: ["audit"],
  owner: "platform"
} as const;

export const acceptedThroughVariable: AppConfig = stagedWithExtra;

export type RouteName = "home" | "jobs" | "settings";

export interface RouteDefinition {
  readonly path: `/${string}`;
  readonly secure: boolean;
}

export const ROUTES = {
  home: { path: "/", secure: false },
  jobs: { path: "/jobs", secure: true },
  settings: { path: "/settings", secure: true }
} as const satisfies Record<RouteName, RouteDefinition>;

export function isAppConfig(value: unknown): value is AppConfig {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.environment === "dev" ||
      candidate.environment === "staging" ||
      candidate.environment === "prod") &&
    typeof candidate.retries === "number" &&
    Array.isArray(candidate.features) &&
    candidate.features.every((item) => typeof item === "string")
  );
}

const invalidExternal: unknown = JSON.parse(
  '{"environment":"prod","retries":"3","features":["audit"]}'
);

console.log("SATISFIES");
console.log(`annotated=${annotatedConfig.environment}:${annotatedConfig.features.length}`);
console.log(`precise=${preciseConfig.environment}:${preciseConfig.features.join(",")}`);
console.log(`runtimeExtra=${"owner" in stagedWithExtra}:${stagedWithExtra.owner}`);
console.log(`staticView=${acceptedThroughVariable.environment}:${acceptedThroughVariable.features.length}`);
console.log(`route=${ROUTES.jobs.path}:${ROUTES.jobs.secure}`);
console.log(`runtimeValidated=${isAppConfig(invalidExternal)}`);
