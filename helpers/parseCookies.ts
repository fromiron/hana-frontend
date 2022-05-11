import {NextApiRequest} from "next";

export function parseCookies(req: NextApiRequest): Record<string, string> {
    return req?.cookies ? req?.cookies : {};
}