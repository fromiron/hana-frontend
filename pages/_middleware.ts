import {NextResponse} from "next/server";
import credentialChecker from "@/helpers/credentialChecker";
import { NextApiRequest } from "next";

export default async function middleware(req:NextApiRequest) {
    console.log('middleware')
    const url = req.url;
    console.log(url)
    if (url?.includes('/cms/')) {
        console.log('[CMS Credentials check]')
        const isCredentialed = await credentialChecker(req)
        if (!isCredentialed) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/cms/account/login"
                }
            }
        }
    }
    return NextResponse.next();
}