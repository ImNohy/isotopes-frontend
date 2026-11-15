import { data } from 'react-router';

import { fetchIsotopeByIdThunk, fetchNextIsotopeThunk } from '@/entities/Isotope/model/thunks';
import { store } from '@/shared/redux/store';

import FeedPage from './Feed';

import type { Route } from "./+types/FeedById.route"
import type { IsotopeView } from '@/entities/Isotope/types';
export const handle = {
    pageClass: "page--feed isotope-page",
};

export async function clientLoader({
    request,
    params,
}: Route.ClientLoaderArgs) {
    const isotopeId = Number(params.isotopeId);

    const url = new URL(request.url);
    const isNext = url.searchParams.get('next') === 'true';

    const action = isNext
        ? fetchNextIsotopeThunk(isotopeId)
        : fetchIsotopeByIdThunk(isotopeId);

    let isotope: IsotopeView | null;

    try {
        isotope = await store.dispatch(action).unwrap();

    } catch {
        throw data(
            null,
            {
                status: 500,
                statusText: 'Ошибка загрузки'
            }
        );
    }
    if (isotope === null) {
        throw data(
            null,
            {
                status: 404,
                statusText: 'Изотоп не найден'
            }
        );
    }

    return null;
}

export default function FeedByIdRoute() {
    return <FeedPage/>
}
