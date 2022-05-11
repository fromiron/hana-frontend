import {NEXT_API_URL} from "@/config/index";

const getCustomers = async () => {
    const response = await fetch(`${NEXT_API_URL}/customers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}

export {getCustomers};