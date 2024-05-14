import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { nextApp, nextHandler } from "./next-utils";
import nextBuild from "next/dist/build";
import { IncomingMessage } from "http";
import path from "path";
import { parse } from "url";
import { PayloadRequest } from "payload/types";

import { getPayloadClient } from "./get-payload";
import { appRouter } from "./trpc";
import { stripeWebhookHandler } from "./webhooks";

const app = express();
export const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;
export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

const startServer = async () => {
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler);

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Production build in progress");
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });

    return;
  }

  // Protect cart route from unauthenticated access
  const cartRouter = express.Router();

  cartRouter.use(payload.authenticate);

  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) {
      return res.redirect("/sign-in?origin=cart");
    }

    const parsedUrl = parse(req.url, true);

    return nextApp.render(req, res, "/cart", parsedUrl.query);
  });

  app.use("/cart", cartRouter);

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info(`Server started on port ${PORT}`);

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.JS App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

startServer();
