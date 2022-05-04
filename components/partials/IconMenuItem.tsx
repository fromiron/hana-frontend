import React from "react";
import {IconMenuInterface} from "@/interfaces/index";

export default function IconMenuItem({Icon, title, onClick}: IconMenuInterface) {
    return (
        <li className='my-4 p-2 cursor-pointer text-mono-200 hover:text-white hover:bg-primary rounded flex' onClick={onClick}>
            <Icon size={30} className='mr-4'/>{title}
        </li>

    );
}