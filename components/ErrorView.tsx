import type { ComponentChildren } from "preact";

export interface ErrorViewProps {
    error?: Error | unknown;
    title?: string;
    message?: string;
    children?: ComponentChildren;
    showStack?: boolean;
}

export function ErrorView(props: ErrorViewProps) {
    const {
        error,
        title = "An Error Occurred",
        message,
        children,
        showStack = false,
    } = props;

    const errorMessage = message ||
        (error instanceof Error ? error.message : String(error));
    const errorStack = error instanceof Error ? error.stack : undefined;

    return (
        <div class="max-w-2xl mx-auto p-6">
            <div class="bg-red-50 border-2 border-red-300 rounded-lg p-6 shadow-md">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <svg
                            class="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h2 class="text-xl font-bold text-red-800 mb-2">
                            {title}
                        </h2>
                        {errorMessage && (
                            <p class="text-red-700 mb-3 whitespace-pre-wrap">
                                {errorMessage}
                            </p>
                        )}
                        {children}
                        {showStack && errorStack && (
                            <details class="mt-4">
                                <summary class="cursor-pointer text-sm font-semibold text-red-800 hover:text-red-900">
                                    Stack Trace
                                </summary>
                                <pre class="mt-2 text-xs bg-red-100 p-3 rounded overflow-x-auto text-red-900 border border-red-200">
                                    {errorStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
