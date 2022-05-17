import debugConsole from "@/helpers/debugConsole";
import {NEXT_API_URL} from "@/config/index";

const getPets =  (query: string | null = '') => {
    debugConsole('getCustomers - query', query);
    const url = `${NEXT_API_URL}/pets?${query}`;
    debugConsole('pets', url);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {getPets};