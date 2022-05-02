import {atom} from "recoil";
import {loginStateInterface} from "@/interfaces/index";

export const loginState = atom<loginStateInterface>({
    key: 'loginState',
    default: {
        email: '',
        emailError: false,
        password: '',
        passwordError: false,
    },
});