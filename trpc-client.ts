import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { tRPC_Router } from "./api/root.tsx";

export const api = createTRPCClient<tRPC_Router>({
    links: [
        httpBatchLink({
            url: "/api",
        }),
    ],
});
