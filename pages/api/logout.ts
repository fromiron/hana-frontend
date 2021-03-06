import type {NextApiRequest, NextApiResponse} from 'next'
import cookie from 'cookie'


export default async function logout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        res.setHeader("Set-Cookie", cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            path: '/'
        }));

        res.status(200).json({ message: 'Success' });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
        });
    }
}
