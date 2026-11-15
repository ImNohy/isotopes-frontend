import { setExponent } from '@/entities/Isotope/model/slice';
import { fetchIsotopesThunk } from '@/entities/Isotope/model/thunks';
import { store } from '@/shared/redux/store';

import CatalogPage from './Catalog';

import type { Route } from "./+types/Catalog.route";
export const handle = {
    pageClass: "page--catalog",
};


export async function clientLoader({
    request
}: Route.ClientLoaderArgs) {
    const url = new URL(request.url);
    const rawExponent = url.searchParams.get('maxHalfLifeExponent');

    const parsedExponent =
        rawExponent === null
            ? -1
            : Number(rawExponent);

    const maxHalfLifeExponent =
        Number.isInteger(parsedExponent)
            && parsedExponent > -1
            && parsedExponent <= 27
            ? parsedExponent
            : undefined

    store.dispatch(setExponent(maxHalfLifeExponent));
    await store.dispatch(fetchIsotopesThunk()).unwrap();

    return null;
}

export default function CatalogRoute() {
    return <CatalogPage />
}
