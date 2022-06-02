import {atom} from "recoil";


export const pageState = atom<string>({
    key: 'pageState',
    default: '',
});

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});