import { define } from "../utils.ts";
import { asset } from "fresh/runtime";

export default define.page(function App({ Component }) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="theme-color" content="#a855f7" />

                {/* PWA Manifest */}
                <link rel="manifest" href={asset("/static/manifest.json")} />

                {/* iOS PWA Support - Full Screen */}
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="apple-mobile-web-app-title" content="Lang Master" />

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
                <meta property="og:site_name" content="Lang Master" />
                <meta
                    property="og:title"
                    content="Lang Master - Master Japanese Language"
                />
                <meta
                    property="og:description"
                    content="Learn Japanese through interactive JLPT N5 quizzes covering vocabulary, grammar, kanji, and reading comprehension."
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Lang Master - Master Japanese Language"
                />
                <meta
                    name="twitter:description"
                    content="Learn Japanese through interactive JLPT N5 quizzes covering vocabulary, grammar, kanji, and reading comprehension."
                />

                <title>Lang Master - Master Japanese Language</title>
                <link rel="icon" href={asset("/favicon.ico")} />
                <link rel="stylesheet" href={asset("/styles.css")} />
            </head>
            <body class="preload">
                <Component />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              // Remove preload class after page load to enable transitions
              window.addEventListener('load', () => {
                document.body.classList.remove('preload');
              });
            `,
                    }}
                />
            </body>
        </html>
    );
});
