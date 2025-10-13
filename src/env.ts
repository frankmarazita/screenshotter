import { z } from "zod";

export enum Environment {
  Development = "development",
  Production = "production",
}

const zEnv = z.object({
  ENVIRONMENT: z.nativeEnum(Environment).default(Environment.Development),
  SENTRY_DSN: z.string().optional(),
});

export const ENV = zEnv.parse(process.env);
