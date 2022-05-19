import {NEXT_API_URL} from "@/config/index";

export const getPets = async (query: string | null = '') => {
    const url = `${NEXT_API_URL}/pets?${query}`;
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}


export const getPetTypeCount = async () => {
    return await fetch(`${NEXT_API_URL}/get/pet-types/count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
