import { resolveStaticPath } from './shared/utils/resolveStaticPath';

export const Access = {
    Everyone: 0,
    Guest: 1,
    Auth: 2,
} as const;

export type Access =
    (typeof Access)[keyof typeof Access];

export type NavItem = {
    to: string;
    iconUrl: string;
    access: Access;
    isAction?: true;
};

export const BASE = '/isotopes';

const NAV_ITEMS: NavItem[] = [
    {
        to: 'feed',
        access: Access.Everyone,
        iconUrl: resolveStaticPath('/icons/home.svg'),
    },
    {
        to: 'draft',
        access: Access.Auth,
        iconUrl: resolveStaticPath('/icons/circle-plus.svg'),
    },
    {
        to: 'auth',
        access: Access.Guest,
        iconUrl: resolveStaticPath('/icons/profile.svg'),
    },
    {
        to: 'catalog',
        access: Access.Everyone,
        iconUrl: resolveStaticPath('/icons/grid.svg'),
    },
    {
        to: 'auth/logout',
        access: Access.Auth,
        iconUrl: resolveStaticPath('/icons/exit.svg'),
        isAction: true,
    },
]

export function getVisibleNavItems(isGuest: boolean) {
    return NAV_ITEMS
        .filter(({ access }) =>
            access === Access.Everyone ||
            (isGuest ? access === Access.Guest : access === Access.Auth)
        )
        .map(item => ({
            ...item,
            to: `${BASE}/${item.to}`,
        }));
}
