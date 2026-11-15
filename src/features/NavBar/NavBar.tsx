import './style.scss';

import { Form, NavLink } from 'react-router';

import { makeClassString } from '@/shared/utils/makeClassString';

import type { NavBarProps } from './types';

export default function NavBar({
    items,
    className,
}: NavBarProps) {
    const classes = makeClassString(
        'navigation',
        className,
    )

    return (
        <nav className={classes}>
            {items.map(({ to, iconUrl, isAction }) =>
                isAction === undefined
                    ? (
                        <NavLink
                            key={to}
                            to={to}
                            className='navigation__link'
                        >
                            <div className="navigation__icon" style={{ maskImage: `url("${iconUrl}")` }} />
                        </NavLink>
                    )
                    : (
                        <Form
                            key={to}
                            method="post"
                            action={to}
                            className="navigation__form"
                        >
                            <button type="submit" className="navigation__link">
                                <div className="navigation__icon" style={{ maskImage: `url("${iconUrl}")` }} />
                            </button>
                        </Form>
                    )
            )}
        </nav>
    );
}
