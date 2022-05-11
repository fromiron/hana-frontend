import {atom} from "recoil";


export const pageState = atom<string>({
    key: 'pageState',
    default: '',
});

