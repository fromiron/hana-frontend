import {API_URL} from "@/config/index";
import type {NextApiRequest, NextApiResponse} from 'next'
import {parseCookies} from "@/helpers/parseCookies";
import debugConsole from "@/helpers/debugConsole";

export default async function pets(req: NextApiRequest, res: NextApiResponse) {
    const query = req.url?.split('?')[1];
    if (req.method === "GET") {
        const {token} = parseCookies(req);
        if (!token) {
            return res.status(404).json({'error': 'No token'});
        }
        const strapiRes = await fetch(`${API_URL}/pets?${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await strapiRes.json();
        if (strapiRes.ok) {
            return res.status(200).json( data);
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