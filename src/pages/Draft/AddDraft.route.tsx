import { redirect } from 'react-router';

import { fetchDraft } from '@/entities/Isotope/api/requests';
import { BASE } from '@/navigation';

import AddDraftPage from './AddDraft';

export const handle = {
    pageClass: 'page--draft page--draft-add'
};

export async function loader() {
    const draft = await fetchDraft();
    if (draft) {
        return redirect(`/${BASE}/publish`);
    }

    return null;
}

export default function AddDraftRoute() {
    return <AddDraftPage />;
}
