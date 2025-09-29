// resources/js/app.jsx
import "./bootstrap";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ui/ErrorFallback"; // You’ll need to create this

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <React.StrictMode>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => {
                        // Optional: reset logic here (e.g., redirect or reload)
                        window.location.replace("/");
                    }}
                >
                    <App {...props} />
                </ErrorBoundary>
            </React.StrictMode>
        );
    },
    progress: {
        color: "#ccc",
        showSpinner: true,
    },
});
