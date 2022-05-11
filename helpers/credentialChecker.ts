import {parseCookies} from "@/helpers/parseCookies";
import {API_URL} from "@/config/index";
import { NextApiRequest } from "next";


export default async function credentialChecker(req: NextApiRequest):Promise<boolean> {
    const {token} = parseCookies(req)
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    if (!response.ok) {
        return false
    }
    if (data.blocked) {
        return false
    }
    if (!data.confirmed) {
        return false
    }
    if (!data.email) {
        return false
    }
    return true;
}