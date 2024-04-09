import next from "next";

import { PORT } from "./server";

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});

export const nextHandler = nextApp.getRequestHandler();
