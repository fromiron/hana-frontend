import axios, {AxiosResponse, AxiosError} from "axios";
import {NEXT_API_URL} from "@/config/index";
import {loginApiPropsInterface} from "@/interfaces/index";


const loginController = async ({email: identifier, password}: loginApiPropsInterface) => {
    console.log('[LOGIN CONTROLLER]');
    let result: AxiosResponse | AxiosError;
    await axios.post(`${NEXT_API_URL}/login`, {identifier, password})
        .then((r: AxiosResponse) => {
            result = r;
            // return r.data.user
        })
        .catch((e: AxiosError) => {
            result= e;
            // return {status: e.response?.status, error: e.response?.statusText}
        });
    return result!;
}


export {loginController}