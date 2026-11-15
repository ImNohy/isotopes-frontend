import { redirect } from 'react-router';

import { login } from '@/entities/User/api/requests';
import { loginSuccess, userRequestFailure, userRequestStart } from '@/entities/User/model/slice';
import { BASE } from '@/navigation';
import { store } from '@/shared/redux/store';
import { mapFormData } from '@/shared/utils/mapFormData';

import SignInPage from './SignIn';

import type { Route } from './+types/SignIn.route';
import type { LoginCredentials } from '@/entities/User/api/types';
export const handle = {
    pageClass: 'page--sign-in',
}

export async function clientAction({
    request
}: Route.ClientActionArgs) {
    const rawData = await request.formData();

    const mappedData = mapFormData<LoginCredentials>(
        rawData,
        [
            { key: 'login', map: String },
            { key: 'password', map: String }
        ]
    );

    store.dispatch(userRequestStart());

    const user = await login(mappedData);

    if (user === null) {
        store.dispatch(userRequestFailure('Неверный логин или пароль'));
        return {
            ok: false,
        }
    }

    store.dispatch(loginSuccess(user));
    return redirect(`${BASE}/catalog`);
}

export default function AuthRoute() {
    return <SignInPage />;
}
