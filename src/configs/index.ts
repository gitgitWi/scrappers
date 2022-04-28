import { resolve } from "path";

import { config } from "dotenv";

config({
  path: resolve(__dirname, ".env"),
});

export const { Z_BASE_URL = "", N_BASE_URL = "" } = process.env;
