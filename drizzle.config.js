import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:xthST7yAb9FM@ep-mute-meadow-a5k9pzj4.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
  },
  verbose: true,
  strict: true,
})