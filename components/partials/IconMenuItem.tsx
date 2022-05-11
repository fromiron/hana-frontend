import React from "react";
import {IconMenuInterface} from "@/interfaces/index";
import {motion} from "framer-motion"

export default function IconMenuItem({Icon, title, onClick, page = ''}: IconMenuInterface) {

    const titleLower = title.toLowerCase();
    const pageLower = page;
    return (
        <motion.li whileHover={{scale: 1.02}}
                   className={`select-none my-4 p-2 cursor-pointer hover:text-accent hover:bg-primary ${titleLower === pageLower ? 'bg-primary text-white' : 'bg-white text-mono-200'} rounded flex transition duration-500 ease-in-out`}
                   onClick={onClick}>
            <Icon size={30} className='mr-4'/>{title}
        </motion.li>

    );
}