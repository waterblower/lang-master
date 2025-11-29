import {
    McpServer,
    ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { QuizAttemptSchema } from "../utils/quizData.ts";
import { record_wrong_answer } from "../api/root.tsx";

// Create an MCP server
const server = new McpServer({
    name: "外语邪修",
    version: "0.0.0",
});

server.registerTool(
    "record_wrong_answer",
    {
        title: "record_wrong_answer",
        description: "record_wrong_answer",
        inputSchema: QuizAttemptSchema,
    },
    async (input) => {
        await record_wrong_answer(input);
        return {
            content: [{ type: "text", text: "done" }],
        };
    },
);

// Add a dynamic greeting resource
server.registerResource(
    "greeting",
    new ResourceTemplate("greeting://{name}", { list: undefined }),
    {
        title: "Greeting Resource", // Display name for UI
        description: "Dynamic greeting generator",
    },
    async (uri, { name }) => ({
        contents: [
            {
                uri: uri.href,
                text: `Hello, ${name}!`,
            },
        ],
    }),
);

// Create a new transport for each request to prevent request ID collisions
const transport = new StdioServerTransport();
await server.connect(transport);
