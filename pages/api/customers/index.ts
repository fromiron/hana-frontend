import {API_URL} from "@/config/index";
import type {NextApiRequest, NextApiResponse} from 'next'
import {parseCookies} from "@/helpers/parseCookies";

export default async function customers(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const token = req.cookies.token;
        const strapiRes = await fetch(`${API_URL}/customers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await strapiRes.json();
        console.log("==================================");
        console.log("strapiRes", req)
        console.log("req.cookies", token)

        console.log("==================================");
        if (strapiRes.ok) {
            res.status(200).json({customers: data});
        } else {

            res.status(data.error.status).json({message: data.error.message});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
        });
    }
}