import cookie from "cookie";
import {NextApiRequest} from "next";

export function parseCookies(req: NextApiRequest) {
    return req ? req.cookies : {};
}