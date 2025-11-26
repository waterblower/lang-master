// Import CSS files here for hot module reloading to work.
import "./assets/styles.css";

import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { tRPC_Router } from "./api/root.tsx";

export const api = createTRPCClient<tRPC_Router>({
    links: [
        httpBatchLink({
            url: "/api",
        }),
    ],
});
