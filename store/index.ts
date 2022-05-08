import {atom} from "recoil";
import {loginApiPropsInterface, loginFormInterface, PagePropsInterface, UserInterface} from "@/interfaces/index";


export const loginFormState = atom<loginFormInterface>({
    key: 'loginFormState',
    default: {
        email: '',
        emailError: false,
        password: '',
        passwordError: false
    },
});

export const pageState = atom<PagePropsInterface>({
    key: 'pageState',
    default: {
        page: 'overview',
    },
});

export const userState = atom<UserInterface>({
    key: 'userState',
    default: {
        id: 0,
        username: '',
        email: '',
        provider: '',
        confirmed: false,
        blocked: true,
        createdAt: '',
        updatedAt: ''
    }
});
