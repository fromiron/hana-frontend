import {NEXT_API_URL} from "@/config/index";
import debugConsole from "@/helpers/debugConsole";

const getCustomers =  (query: string | null = '') => {
    debugConsole('getCustomers - query', query);
    const url = `${NEXT_API_URL}/customers?${query}`;
    debugConsole('getCustomers', url);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {getCustomers};