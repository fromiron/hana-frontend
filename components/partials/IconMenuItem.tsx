import React from "react";
import {IconMenuInterface} from "@/interfaces/index";
import {motion} from "framer-motion"

export default function IconMenuItem({Icon, title, onClick}: IconMenuInterface) {
    return (
        <motion.li whileHover={{scale: 1.02}}
                   className='my-4 p-2 cursor-pointer text-mono-200 hover:text-white hover:bg-primary rounded flex transition duration-500 ease-in-out'
                   onClick={onClick}>
            <Icon size={30} className='mr-4'/>{title}
        </motion.li>

    );
}