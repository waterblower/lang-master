import { define } from "../utils.ts";
import { asset, Partial } from "fresh/runtime";

export default define.page(function App({ Component }) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, viewport-fit=cover"
                />
                <meta name="theme-color" content="#a855f7" />

                {/* PWA Manifest */}
                <link rel="manifest" href={asset("/manifest.json")} />

                {/* iOS PWA Support - Full Screen */}
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black"
                />
                <meta name="apple-mobile-web-app-title" content="外语邪修" />

                {/* iOS Icons */}
                <link
                    rel="apple-touch-icon"
                    href={asset("/icons/icon-192x192.png")}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href={asset("/icons/icon-192x192.png")}
                />
                <link
                    rel="apple-touch-icon"
                    sizes="512x512"
                    href={asset("/icons/icon-512x512.png")}
                />

                {/* Prevent iOS Safari UI elements */}
                <meta name="mobile-web-app-capable" content="yes" />

                {/* Open Graph / Social Media */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="外语邪修" />
                <meta
                    property="og:title"
                    content="外语邪修 - Master Japanese Language"
                />
                <meta
                    property="og:description"
                    content="Learn Japanese through interactive JLPT N5 quizzes covering vocabulary, grammar, kanji, and reading comprehension."
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="外语邪修 - Master Japanese Language"
                />
                <meta
                    name="twitter:description"
                    content="Learn Japanese through interactive JLPT N5 quizzes covering vocabulary, grammar, kanji, and reading comprehension."
                />

                <title>外语邪修 - Master Japanese Language</title>
                <link rel="icon" href={asset("/favicon.ico")} />

                {/* iOS Safe Area for Dynamic Island */}
                <style>
                    {`
                        :root {
                            /* Respect safe areas for Dynamic Island and notch */
                            padding-top: env(safe-area-inset-top);
                            padding-bottom: env(safe-area-inset-bottom);
                            padding-left: env(safe-area-inset-left);
                            padding-right: env(safe-area-inset-right);
                        }

                        body {
                            /* Prevent content from appearing under Dynamic Island */
                            padding-top: env(safe-area-inset-top);
                            padding-bottom: env(safe-area-inset-bottom);
                        }
                    `}
                </style>
            </head>
            <body f-client-nav class="preload">
                <Partial name="body">
                    <Component />
                </Partial>
            </body>
        </html>
    );
});
