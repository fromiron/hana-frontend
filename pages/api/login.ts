import {API_URL} from "@/config/index";
import type {NextApiRequest, NextApiResponse} from 'next'
import cookie from 'cookie'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {identifier, password} = req.body;
        const strapiRes = await fetch(`${API_URL}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({identifier, password}),
        });
        const data = await strapiRes.json();
        if (strapiRes.ok) {
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                })
            );
            res.status(200).json({user: data.user});
        } else {
            res.status(data.error.status).json({message: data.error.message});
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
        });
    }
}