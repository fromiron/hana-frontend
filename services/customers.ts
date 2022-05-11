import {NEXT_API_URL} from "@/config/index";

const getCustomers = async (query: string | null = '') => {
    const response = await fetch(`${NEXT_API_URL}/customers?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}

export {getCustomers};