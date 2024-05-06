import zod from "zod"

const envSchema = zod.object({
  DATABASE_URL: zod.string(),
  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
  NEXTAUTH_URL: zod.string(),
  NEXTAUTH_SECRET: zod.string(),
  URL: zod.string(),
  API_URL: zod.string(),
  ADMINS: zod.string(),
  ADMINS_EDITORS: zod.string(),
  FTP_URL: zod.string(),
  FTP_HOST: zod.string(),
  FTP_USER: zod.string(),
  FTP_PASS: zod.string(),
})

export const env = envSchema.parse(process.env)