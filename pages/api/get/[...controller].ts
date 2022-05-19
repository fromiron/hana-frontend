import {API_URL, BACK_END_DEFAULT_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";
import {parseCookies} from "@/helpers/parseCookies";
import debugConsole from "@/helpers/debugConsole";


export default async function getController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const {token} = parseCookies(req);
        if (!token) {
            return res.status(404).json({'error': 'No token'});
        }
        const url = req.url?.split('/get')[1].toString();
        const strapiRes = await fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await strapiRes.json();
        if (strapiRes.ok) {
            return res.status(200).json(data);
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