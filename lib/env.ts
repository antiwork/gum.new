import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),
  POSTGRES_USER: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_JWT_SECRET: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  GUMROAD_OAUTH_CLIENT_ID: z.string(),
  GUMROAD_OAUTH_CLIENT_SECRET: z.string(),
});

export const env = Object.freeze(envSchema.parse(process.env));
