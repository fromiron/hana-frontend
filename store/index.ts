import {atom} from "recoil";
import {loginStateInterface, PagePropsInterface} from "@/interfaces/index";

export const loginState = atom<loginStateInterface>({
    key: 'loginState',
    default: {
        email: '',
        emailError: false,
        password: '',
        passwordError: false,
    },
});

export const pageState = atom<PagePropsInterface>({
    key: 'pageState',
    default: {
        page: 'overview',
    },
});