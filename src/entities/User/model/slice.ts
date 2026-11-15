import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserView } from "../types"

type UserState = {
    user: UserView | null;
    isGuest: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isGuest: true,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRequestStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        userRequestFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        loginSuccess(state, action: PayloadAction<UserView>) {
            state.user = action.payload;
            state.isGuest = false;
            state.isLoading = false;
        },
        logoutSuccess(state) {
            state.isLoading = false;
            state.user = null;
            state.isGuest = true;
            state.error = null;
        },
        clearUserError(state) {
            state.isLoading = false;
            state.error = null;
        }
    }
})

export const userReducer = userSlice.reducer;
export const { userRequestFailure, userRequestStart, loginSuccess, logoutSuccess, clearUserError } = userSlice.actions;
