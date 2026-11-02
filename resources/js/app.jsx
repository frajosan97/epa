/******************************************************
 * 🧩 GLOBAL STYLES & VENDOR IMPORTS
 ******************************************************/

// Bootstrap CSS and JS Bundle
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

import 'sweetalert2/dist/sweetalert2.min.css';
import 'react-toastify/dist/ReactToastify.css';

// App-wide custom CSS
import "../css/app.css";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} :: Economic Patriotic Alliance`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
