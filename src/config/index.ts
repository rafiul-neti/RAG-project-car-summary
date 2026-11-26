import "dotenv/config";
import { env } from "node:process";

export default {
  port: env.PORT,
  database_url: env.DATABASE_URL,
};
