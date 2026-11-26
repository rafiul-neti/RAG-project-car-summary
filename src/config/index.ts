import "dotenv/config";
import { env } from "node:process";

export default {
  database_url: env.DATABASE_URL,
};
