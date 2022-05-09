import {atom, selector, useSetRecoilState} from "recoil";
import {loginFormInterface, PagePropsInterface, UserInterface} from "@/interfaces/index";


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
        name: 'overview',
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

export const userSelector = selector<UserInterface>({
    key: 'userSelector',
    get: ({get}) => get(userState),
    set: ({set}, newValue) => newValue,
});

