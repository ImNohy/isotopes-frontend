import { api } from '@/shared/api/axios';

import type { UserView } from "../types";
import type { LoginCredentials, UserDTO } from "./types";

export async function login(
    credentials: LoginCredentials
): Promise<UserView | null> {
    try {
        const { data } = await api.post<UserDTO>(
            '/auth/login',
            credentials,
        );

        return {
            userId: data.userId,
        }

    } catch {
        return null;
    }
}

export async function logout(
): Promise<boolean> {
    try {
        await api.post(
            '/auth/logout',
            null
        );

        return true;

    } catch {
        return false;
    }
}
