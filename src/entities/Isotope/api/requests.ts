import { Api, LikeAction } from '@/shared/api/api';

import { mapIsotopeDTO } from './mappers';
import {
    mockFetchAllPublished, mockFetchFirstPublished, mockFetchNextPublished, mockFetchPublishedById
} from './requestsMock';

import type { IsotopePublishDTO, LikeResult, } from '@/shared/api/api';

import type { IsotopeView } from '../types';
import type { FetchOptions } from '@/shared/api/types';
export const generatedApi = new Api({
    baseURL: '',
    withCredentials: true,
});

export async function fetchAllPublished(
    {
        isGuest
    }: FetchOptions,
    maxHalfLifeExponent?: number,
): Promise<IsotopeView[]> {
    try {
        const { data } = await generatedApi.api.isotopeControllerFetchPublished({
            maxHalfLifeExponent,
        });


        return data.isotopes.map(mapIsotopeDTO);

    } catch (error) {
        if (isGuest) {
            return await mockFetchAllPublished(maxHalfLifeExponent);
        }

        throw error;
    }
}


export async function fetchPublishedById(
    id: number,
    {
        isGuest
    }: FetchOptions): Promise<IsotopeView | null> {
    try {
        const { data } = await generatedApi.api.isotopeControllerFetchById(id);

        if (!data) return null;

        return mapIsotopeDTO(data);

    } catch (error) {
        if (isGuest) {
            return await mockFetchPublishedById(id);
        }

        throw error;
    }
}

export async function fetchNextPublished(
    id: number,
    {
        isGuest
    }: FetchOptions): Promise<IsotopeView | null> {
    try {
        const { data } = await generatedApi.api.isotopeControllerFetchById(id, { next: 'true' });

        if (!data) return null;

        return mapIsotopeDTO(data);

    } catch (error) {
        if (isGuest) {
            let isotope = await mockFetchNextPublished(id);

            if (isotope === null) {
                isotope = await mockFetchFirstPublished();
            }

            return isotope;
        }

        throw error;
    }
}

export async function fetchDraft(
): Promise<IsotopeView | null> {
    try {
        const { data } = await generatedApi.api.isotopeControllerFetchDraft();

        if (!data) return null;

        return mapIsotopeDTO(data);

    } catch (error) {
        throw error;
    }
}

export async function createDraft(
    dto: { name: string; video?: File; image?: File },
): Promise<IsotopeView> {
    const { data } = await generatedApi.api.isotopeControllerCreateDraft(dto);

    return mapIsotopeDTO(data);
}

export async function publishDraft(
    dto: IsotopePublishDTO,
): Promise<IsotopeView> {
    const { data } =
        await generatedApi.api.isotopeControllerPublishDraft(dto);

    return mapIsotopeDTO(data);
}

export async function deletePublished(id: number): Promise<IsotopeView> {
    const { data } =
        await generatedApi.api.isotopeControllerDeletePublished(id);

    return mapIsotopeDTO(data);
}

export async function setLike(
    id: number,
    action: LikeAction,
): Promise<LikeResult> {
    const { data } =
        await generatedApi.api.isotopeControllerSetLike(id, action);

    return data;
}

export async function addLike(id: number): Promise<LikeResult> {
    return setLike(id, LikeAction.Value1);
}

export async function removeLike(id: number): Promise<LikeResult> {
    return setLike(id, LikeAction.Value0);
}
