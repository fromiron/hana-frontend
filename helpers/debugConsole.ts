import {DEBUG_CONSOLE_ON} from "@/config/index";

export default function debugConsole(title: string, any: any = null) {
    if (DEBUG_CONSOLE_ON) {
        console.log('=========================================================================================');
        console.log(title);
        if (any) console.log(any);
        console.log('=========================================================================================');
    }
}