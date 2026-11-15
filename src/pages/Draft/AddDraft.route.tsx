import { redirect } from 'react-router';

import { createDraftThunk, fetchDraftThunk } from '@/entities/Isotope/model/thunks';
import { BASE } from '@/navigation';
import { store } from '@/shared/redux/store';
import { mapFormData } from '@/shared/utils/mapFormData';

import AddDraftPage from './AddDraft';

import type { Route } from './+types/AddDraft.route';
import type { CreateDraftDTO } from '@/entities/Isotope/api/types';

export const handle = {
    pageClass: 'page--draft page--draft-add'
};

export async function clientLoader() {
    const draft = await store.dispatch(fetchDraftThunk()).unwrap();

    if (draft) {
        return redirect(`${BASE}/publish`);
    }

    return null;
}

export async function clientAction({
    request
}: Route.ClientActionArgs) {
    const rawData = await request.formData();

    console.log(rawData);
    
    const mappedData = mapFormData<CreateDraftDTO>(rawData, [
        {
            key: 'video',
            map: (file) => {
                console.log(file);
                console.log(file instanceof File && file.size > 0 );


                 return file instanceof File && file.size > 0 ? file : undefined }
        },
        {
            key: 'image',
            map: (file) => file instanceof File && file.size > 0 ? file : undefined,
        },
        {
            key: 'name',
            map: String,
        },

    ]);

    try {
        await store.dispatch(createDraftThunk(mappedData))
        return redirect(`${BASE}/publish`);

        // TODO
    } catch { }
}

export default function AddDraftRoute() {
    return <AddDraftPage />;
}
