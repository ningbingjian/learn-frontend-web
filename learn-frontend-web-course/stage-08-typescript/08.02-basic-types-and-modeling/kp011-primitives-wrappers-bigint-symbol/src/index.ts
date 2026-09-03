export const CONFIG_TOKEN: unique symbol = Symbol("app-config");
export const LOGGER_TOKEN: unique symbol = Symbol("logger");

export interface AppConfig {
  environment: "development" | "production";
}

export interface Logger {
  log(message: string): string;
}

export type ServiceMap = {
  [CONFIG_TOKEN]: AppConfig;
  [LOGGER_TOKEN]: Logger;
};

export class ServiceRegistry {
  private readonly services = new Map<symbol, unknown>();

  set<Token extends keyof ServiceMap>(
    token: Token,
    service: ServiceMap[Token]
  ): void {
    this.services.set(token, service);
  }

  get<Token extends keyof ServiceMap>(token: Token): ServiceMap[Token] {
    const service = this.services.get(token);
    if (service === undefined) {
      throw new Error(`Missing service: ${String(token)}`);
    }
    return service as ServiceMap[Token];
  }
}

export const primitiveText: string = "hello";
export const wrapperText: String = new String("hello");
export const exactBudget = 900719925474099312345n;

function captureBigIntJsonFailure(): string {
  try {
    JSON.stringify({ budget: exactBudget });
    return "none";
  } catch (error: unknown) {
    return error instanceof TypeError ? "TypeError" : "Error";
  }
}

export const bigintJson = JSON.stringify(
  { budget: exactBudget },
  (_key, value: unknown) => typeof value === "bigint" ? value.toString() : value
);

const registry = new ServiceRegistry();
registry.set(CONFIG_TOKEN, { environment: "production" });
registry.set(LOGGER_TOKEN, { log: (message) => `registry-${message}` });

const config = registry.get(CONFIG_TOKEN);
const logger = registry.get(LOGGER_TOKEN);

console.log("PRIMITIVES");
console.log(`primitiveType=${typeof primitiveText}`);
console.log(`wrapperType=${typeof wrapperText}`);
console.log(`bigintJsonFailure=${captureBigIntJsonFailure()}`);
console.log(`bigintJson=${bigintJson}`);
console.log(`service=${config.environment}:${logger.log("ready")}`);
