import { redirect } from 'react-router';

import { clearExponent, setDraft, setIsotopes, setSelected } from '@/entities/Isotope/model/slice';
import { logout } from '@/entities/User/api/requests';
import { logoutSuccess, userRequestFailure, userRequestStart } from '@/entities/User/model/slice';
import { BASE } from '@/navigation';
import { store } from '@/shared/redux/store';

export async function clientAction() {
    store.dispatch(userRequestStart())
    const success = await logout();

    if (success) {
        store.dispatch(logoutSuccess());
        store.dispatch(clearExponent())
        store.dispatch(setIsotopes([]))
        store.dispatch(setSelected(null));
        store.dispatch(setDraft(null));

        return redirect(`${BASE}/catalog`);
    }

    store.dispatch(userRequestFailure('При выходе произошла ошибка. Попробуйте ещё раз'));
    return redirect(`${BASE}/catalog`);
}
