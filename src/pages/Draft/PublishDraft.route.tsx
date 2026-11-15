import { redirect } from 'react-router';

import { fetchDraftThunk, publishDraftThunk } from '@/entities/Isotope/model/thunks';
import { BASE } from '@/navigation';
import { store } from '@/shared/redux/store';
import { mapFormData } from '@/shared/utils/mapFormData';

import PublishDraftPage from './PublishDraft';

import type { Route } from "./+types/PublishDraft.route";
type IsotopePublishDTO = {
    halfLife: string;
    isAlpha: boolean;
    description: string;
};


export const handle = {
    pageClass: 'page--draft page--draft-publish'
};

export async function clientLoader() {
    try {
        const isotopeDraft = await store.dispatch(fetchDraftThunk()).unwrap();
        if (!isotopeDraft) {
            return redirect(`${BASE}/draft`);
        }

        // TODO
    } catch { }

    return null;
}

export async function clientAction({
    request
}: Route.ClientActionArgs) {
    const rawData = await request.formData();

    const mappedData = mapFormData<IsotopePublishDTO>(rawData, [
        {
            key: 'halfLife',
            map: String,
        },
        {
            key: 'description',
            map: String,
        },
        {
            key: 'isAlpha',
            map: value => value === 'on' || value === 'true',
        },
    ]);

    try {
        await store.dispatch(publishDraftThunk(mappedData))
        return redirect(`${BASE}/catalog`);

        // TODO
    } catch { }
}

export default function PublishDraftRoute() {
    return <PublishDraftPage />;
}
