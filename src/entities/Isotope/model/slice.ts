import { createSlice } from '@reduxjs/toolkit';

import {
    createDraftThunk, deleteIsotopeThunk, fetchDraftThunk, fetchIsotopeByIdThunk,
    fetchIsotopesThunk, fetchNextIsotopeThunk, publishDraftThunk, setLikeThunk
} from './thunks';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { IsotopeView } from '../types';
type IsotopeState = {
    maxHalfLifeExponent?: number;

    isotopes: IsotopeView[];
    selected: IsotopeView | null;
    draft: IsotopeView | null;

    isLoading: boolean;
    error: string | null;
};

const initialState: IsotopeState = {
    maxHalfLifeExponent: undefined,
    isotopes: [],
    selected: null,
    draft: null,
    isLoading: false,
    error: null,
};

const isotopesSlice = createSlice({
    name: 'isotopes',
    initialState,
    reducers: {
        setExponent(state, action: PayloadAction<number | undefined>) {
            state.maxHalfLifeExponent = action.payload;
        },
        clearExponent(state) {
            state.maxHalfLifeExponent = undefined;
        },

        requestStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        requestFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        setIsotopes(state, action: PayloadAction<IsotopeView[]>) {
            state.isotopes = action.payload;
            state.isLoading = false;
        },
        setSelected(state, action: PayloadAction<IsotopeView | null>) {
            state.selected = action.payload;
            state.isLoading = false;
        },
        setDraft(state, action: PayloadAction<IsotopeView | null>) {
            state.draft = action.payload;
            state.isLoading = false;
        },
        removeIsotope(state, action: PayloadAction<number>) {
            state.isotopes = state.isotopes.filter(i => i.id !== action.payload);
        },
        updateLike(
            state,
            action: PayloadAction<{
                id: number;
                isLiked: boolean;
                likeCount: number
            }>,
        ) {
            const item = state.isotopes.find(i => i.id === action.payload.id);
            if (item) {
                item.isLiked = action.payload.isLiked;
                item.likeCount = action.payload.likeCount;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIsotopesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchIsotopesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isotopes = action.payload;
            })
            .addCase(fetchIsotopesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка загрузки';
            })

            .addCase(setLikeThunk.pending, (state, action) => {
                const { id } = action.meta.arg;

                const flip = (isotope: IsotopeView) => {
                    const wasLiked = isotope.isLiked;
                    isotope.isLiked = !wasLiked;
                    isotope.likeCount += wasLiked ? -1 : 1;
                }


                const catalogIsotope = state.isotopes.find(isotope => isotope.id === action.meta.arg.id);
                if (catalogIsotope) {
                    flip(catalogIsotope);
                }

                if (state.selected?.id === id) {
                    flip(state.selected);
                }

            })
            .addCase(setLikeThunk.fulfilled, (state, action) => {
                const isotopeId = action.meta.arg.id;

                const patch = {
                    isLiked: action.payload.isLiked,
                    likeCount: action.payload.likeCount,
                };

                const isotope = state.isotopes.find(isotope => isotope.id === isotopeId);
                if (isotope) {
                    Object.assign(isotope, patch);
                }

                if (state.selected?.id === isotopeId) {
                    Object.assign(state.selected, patch);
                }
            })
            .addCase(setLikeThunk.rejected, (state, action) => {
                const isotopeId = action.meta.arg.id;

                const rollback = (isotope: IsotopeView) => {
                    isotope.isLiked = !isotope.isLiked;
                    isotope.likeCount += isotope.isLiked ? 1 : -1;
                }

                const catalogIsotope = state.isotopes.find(isotope => isotope.id === isotopeId);
                if (catalogIsotope) {
                    rollback(catalogIsotope);
                }

                if (state.selected?.id === isotopeId) {
                    state.error = action.payload ?? 'Ошибка лайка';
                }
            })

            .addCase(fetchIsotopeByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchIsotopeByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected = action.payload;
            })
            .addCase(fetchIsotopeByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Не удалось загрузить изотоп';
            })

            .addCase(createDraftThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDraftThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.draft = action.payload;
            })
            .addCase(createDraftThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка создания черновика';
            })

            .addCase(publishDraftThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(publishDraftThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.draft = null;
                state.isotopes = [action.payload, ...state.isotopes];
            })
            .addCase(publishDraftThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка публикации';
            })

            .addCase(deleteIsotopeThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteIsotopeThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                const id = action.payload.id;
                state.isotopes = state.isotopes.filter(i => i.id !== id);
                if (state.selected?.id === id) {
                    state.selected = null;
                }
            })
            .addCase(deleteIsotopeThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка удаления';
            })

            .addCase(fetchDraftThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDraftThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.draft = action.payload;
            })
            .addCase(fetchDraftThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка загрузки черновика';
            })

            .addCase(fetchNextIsotopeThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNextIsotopeThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected = action.payload;
            })
            .addCase(fetchNextIsotopeThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка загрузки следующего изотопа';
            });
    },
});


export const isotopesReducer = isotopesSlice.reducer;
export const {
    setExponent,
    clearExponent,
    requestStart,
    requestFailure,
    setIsotopes,
    setSelected,
    setDraft,
    removeIsotope,
    updateLike,
} = isotopesSlice.actions;
