import { createTRPCReact } from "@trpc/react-query";

import { AppRouterProps } from "./";

export const trpc = createTRPCReact<AppRouterProps>({});
