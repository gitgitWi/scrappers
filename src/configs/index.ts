import { resolve } from "path";

import { config } from "dotenv";

config({
  path: resolve(__dirname, ".env"),
});

export const { BASE_URL = "" } = process.env;
