import {UserInterface} from "@/interfaces/index";
import {queryKeys} from "./constants";

export function getStorageUser(): UserInterface | null {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem(queryKeys.user);
        return user ? JSON.parse(user) : null;
    }
    return null;
}

export function setStorageUser(user: UserInterface): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(queryKeys.user, JSON.stringify(user));
    }
}

export function removeStorageUser(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(queryKeys.user)
    }
}