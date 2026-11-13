import { redirect } from 'react-router';

import { fetchDraft } from '@/entities/Isotope/api/requests';
import { BASE } from '@/navigation';

import PublishDraftPage from './PublishDraft';

import type { Route } from "./+types/PublishDraft.route";
export const handle = {
    pageClass: 'page--draft page--draft-publish'
};

export async function loader() {
    const isotopeDraft = await fetchDraft();
    if (!isotopeDraft) {
        return redirect(`/${BASE}/draft`);
    }

    return {
        isotopeDraft,
    };
}

export default function PublishDraftRoute(
    { loaderData }: Route.ComponentProps,
) {
    return <PublishDraftPage
        isotopeDraft={loaderData.isotopeDraft} />;
}
