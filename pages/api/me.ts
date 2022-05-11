import {NextApiRequest, NextApiResponse} from "next";
import {API_URL} from "@/config/index";
import cookie from "cookie";
import {parseCookies} from "@/helpers/parseCookies";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const {token} = parseCookies(req);
        const strapiRes = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await strapiRes.json();
        if (strapiRes.ok) {
            res.status(200).json({user: data});
        } else {
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", "", {
                    httpOnly: true,
                    path: "/",
                })
            );
            res.status(data.error.status).json({message: data.error.message});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
        });
    }
}
