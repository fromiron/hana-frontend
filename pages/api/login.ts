import {API_URL} from "@/config/index";
import type {NextApiRequest, NextApiResponse} from 'next'
import cookie from 'cookie'
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";


export default async function login(req: NextApiRequest, res: NextApiResponse) {
    console.log('[NEXT API] login');
    if (req.method === "POST") {
        const {identifier, password} = req.body;
        await axios.post(`${API_URL}/auth/local`, {
            identifier,
            password
        }).then((strapi: AxiosResponse) => {
            if (strapi?.status == 200) {
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", strapi.data.jwt, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60 * 24 * 7,
                        path: "/",
                    })
                );
                res.status(200).json({user: strapi.data.user});
            } else {
                res.status(strapi.status).json({error: strapi.data.error.message});
            }
            res.status(strapi?.status).end();
        }).catch((e: AxiosError) => {
            console.log(e.response?.status, e.code);
            res.status(<number>e.response?.status).json({
                error: e.code,
            });
            res.status(<number>e.response?.status).end();
        })
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
            error: `Method ${req.method} Not Allowed`,
        });
        res.status(405).end();
    }
}
