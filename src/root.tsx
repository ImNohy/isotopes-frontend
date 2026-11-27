import './scss/reset.scss';
import './scss/typography.scss';
import './scss/variables.scss';
import './scss/style.scss';

import { useEffect } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useMatches } from 'react-router';

import { clearUserError } from './entities/User/model/slice';
import NavBar from './features/NavBar/NavBar';
import { getVisibleNavItems } from './navigation';
import { useAppDispatch, useAppSelector } from './shared/redux/hooks';
import { makeClassString } from './shared/utils/makeClassString';
import { resolveStaticPath } from './shared/utils/resolveStaticPath';

type ShellClasses = {
    pageClass?: string;
};

export default function App() {
    const isGuest = useAppSelector(s => s.user.isGuest);

    const logoutError = useAppSelector(s => {
        return s.user.error && !s.user.isGuest
            ? s.user.error
            : null
    })
    const dispatch = useAppDispatch();

    const matches = useMatches();
    const shell = [...matches]
        .reverse()
        .map(match => match.handle as ShellClasses)
        .find(handle => handle?.pageClass)

    useEffect(() => {
        if (!logoutError) return;

        const t = setTimeout(() => dispatch(clearUserError()), 3000);
        return () => clearTimeout(t);
    }, [logoutError, dispatch]);


    return (
        <html lang="ru">
            <head>
                <meta name="color-scheme" content="dark" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href={resolveStaticPath('favicon.ico')} type="image/x-icon" />

                <Meta />
                <Links />
            </head>
            <body>
                <div className={makeClassString("page", shell?.pageClass)}>
                    {logoutError && (
                        <div className='notification'>
                            <h4 className='notification__header'>Ошибка</h4>
                            <p className='notification__content'>{logoutError}</p>
                        </div>
                    )}

                    <Outlet />
                    <NavBar
                        items={getVisibleNavItems(isGuest)}
                    />

                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
