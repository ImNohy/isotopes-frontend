import { index, prefix, route } from '@react-router/dev/routes';

import type { RouteConfig } from '@react-router/dev/routes';

export default [
    ...prefix('isotopes', [
        ...prefix('feed', [
            index('./pages/Feed/Feed.route.tsx'),
            route(":isotopeId", "./pages/Feed/FeedById.route.tsx"),
        ]),
        route("catalog", "./pages/Catalog/Catalog.route.tsx"),
        route('draft', './pages/Draft/AddDraft.route.tsx'),
        route('publish', './pages/Draft/PublishDraft.route.tsx'),
        route('auth', './pages/Auth/Auth.route.tsx'),
    ])
] satisfies RouteConfig;
