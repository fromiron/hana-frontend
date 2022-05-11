import {API_URL} from "@/config/index";
import type {NextApiRequest, NextApiResponse} from 'next'
import {parseCookies} from "@/helpers/parseCookies";
import cookie from "cookie";
export default async function customers(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const {token} = parseCookies(req);
        if (!token) {
            console.log('==============================================================================================')
            console.log("No token");
            console.log('==============================================================================================')
            return res.status(404).json({'error': 'No token'});
        }
        const strapiRes = await fetch(`${API_URL}/customers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await strapiRes.json();
        if (strapiRes.ok) {
            return res.status(200).json({customers: data});
        } else {
            return res.status(data.error.status).json({message: data.error.message});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
        });
    }
}