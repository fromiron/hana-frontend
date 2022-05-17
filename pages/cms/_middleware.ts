import {NextResponse} from "next/server";
import credentialChecker from "@/helpers/credentialChecker";
import {NextApiRequest} from "next";
import {NEXT_DEFAULT_URL} from "@/config/index";
import debugConsole from "@/helpers/debugConsole";

export default async function middleware(req: NextApiRequest) {
    const url = req.url;
    if (url?.includes('/cms/') && blockedUrlChecker(url.split('/cms/')[1])) {
        debugConsole('[CMS Credentials check]')
        const isCredentialed = await credentialChecker(req)
        if (!isCredentialed) {
        return NextResponse.redirect(`${NEXT_DEFAULT_URL}/cms/account/login`)
        }
    }
    return NextResponse.next()

}

function blockedUrlChecker(url: string) {
    const blockedUrlList = [
        'customer/',
        'overview/',
        'pets/',
        'reservations/',
        'settings/',
    ];
    return blockedUrlList.includes(url);
}