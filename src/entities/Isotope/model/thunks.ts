import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    createDraft, deletePublished, fetchAllPublished, fetchDraft, fetchNextPublished,
    fetchPublishedById, publishDraft, setLike
} from '../api/requests';

import type { IsotopePublishDTO } from '@/shared/api/api';
import type { IsotopeView } from "../types";
import type { RootState } from "@/shared/redux/store";
import type { LikeAction, LikeResult } from "@/shared/api/api";
import type { CreateDraftDTO } from "../api/types";

export const fetchIsotopesThunk = createAsyncThunk<
    IsotopeView[],
    void,
    {
        state: RootState;
        rejectValue: string;
    }
>(
    'isotopes/fetchAll',
    async (_, { getState, rejectWithValue }) => {
        const { user, isotopes } = getState();
        try {
            return await fetchAllPublished(
                {
                    isGuest: user.isGuest
                },
                isotopes.maxHalfLifeExponent,
            );
        }

        catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось загрузить изотопы')
        }
    }
)

export const setLikeThunk = createAsyncThunk<
    LikeResult,
    {
        id: number;
        action: LikeAction;
    },
    {
        rejectValue: string;
    }
>(
    'isotopes/setLike',
    async ({ id, action }, { rejectWithValue }) => {
        try {
            return await setLike(id, action);
        }

        catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось изменить лайк')
        }
    }
)

export const fetchIsotopeByIdThunk = createAsyncThunk<
    IsotopeView | null,
    number,
    {
        state: RootState;
        rejectValue: string;
    }
>(
    'isotopes/fetchById',
    async (id, { getState, rejectWithValue }) => {
        const { isGuest } = getState().user;
        try {
            return await fetchPublishedById(id, { isGuest });
        }

        catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось загрузить изотоп')
        }
    }
)

export const fetchNextIsotopeThunk = createAsyncThunk<
    IsotopeView | null,
    number,
    { state: RootState; rejectValue: string }
>(
    'isotopes/fetchNext',
    async (id, { getState, rejectWithValue }) => {
        const { isGuest } = getState().user;

        try {
            return await fetchNextPublished(id, { isGuest });

        } catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось загрузить следующий изотоп');
        }
    },
);

export const fetchDraftThunk = createAsyncThunk <
    IsotopeView | null,
void,
    { rejectValue: string }
    > (
        'isotopes/fetchDraft',
        async (_, { rejectWithValue }) => {
            try {
                return await fetchDraft();

            } catch (error) {
                return rejectWithValue((error as Error).message ?? 'Не удалось загрузить черновик изотопа');
            }
        },
);

export const createDraftThunk = createAsyncThunk<
    IsotopeView,
    CreateDraftDTO,
    { rejectValue: string }
>(
    'isotopes/createDraft',
    async (dto, { rejectWithValue }) => {
        try {
            return await createDraft(dto);
        } catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось создать черновик');
        }
    },
);


export const publishDraftThunk = createAsyncThunk<
    IsotopeView,
    IsotopePublishDTO,
    { rejectValue: string }
>(
    'isotopes/publishDraft',
    async (dto, { rejectWithValue }) => {
        try {
            return await publishDraft(dto);
        } catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось опубликовать черновик');
        }
    },
);

export const deleteIsotopeThunk = createAsyncThunk<
    IsotopeView,
    number,
    { rejectValue: string }
>(
    'isotopes/delete',
    async (id, { rejectWithValue }) => {
        try {
            return await deletePublished(id);
        } catch (error) {
            return rejectWithValue((error as Error).message ?? 'Не удалось удалить изотоп');
        }
    },
);
