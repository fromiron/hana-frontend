import {NEXT_API_URL} from "@/config/index";
import {loginApiPropsInterface} from "@/interfaces/index";

const loginController = async ({email: identifier, password}: loginApiPropsInterface) => {
    console.log('[LOGIN CONTROLLER]');
    return await fetch(`${NEXT_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({identifier, password})
        }
    )
}

const logoutController = async () => {
    return await fetch(`${NEXT_API_URL}/logout`, {
        method: "POST"
    });
}


export {loginController, logoutController}