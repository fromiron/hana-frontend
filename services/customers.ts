import {NEXT_API_URL} from "@/config/index";

export const getCustomers =  (query: string | null = '') => {
    const url = `${NEXT_API_URL}/customers?${query}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}


export const getCustomerAgeGroup = async () => {
    return await fetch(`${NEXT_API_URL}/get/customers/age-group`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

