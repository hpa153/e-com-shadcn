import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/trpc";

const trpcHandler = (req: Request) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // @ts-expect-error context already passed from express middleware
    createContext: () => ({}),
  });
};

export { trpcHandler as GET, trpcHandler as POST };
