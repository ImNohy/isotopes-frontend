import { data } from 'react-router';

import { fetchNextIsotopeThunk } from '@/entities/Isotope/model/thunks';
import { store } from '@/shared/redux/store';

import FeedPage from './Feed';

export const handle = {
    pageClass: "page--feed isotope-page",
};

export async function clientLoader() {
    const isotope = await store.dispatch(fetchNextIsotopeThunk(0)).unwrap();

    if (isotope === null) {
        throw data(
            null,
            {
                statusText: 'Изотоп не найден',
                status: 404
            }
        )
    }

    return null
}

export default function FeedRoute() {
    return <FeedPage/>
}
