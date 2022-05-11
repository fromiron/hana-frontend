import {atom} from "recoil";
import {PagePropsInterface} from "@/interfaces/index";


export const pageState = atom<PagePropsInterface>({
    key: 'pageState',
    default: {
        name: 'overview',
    },
});

