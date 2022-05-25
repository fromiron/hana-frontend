import React from "react";
import {ButtonInterface} from "@/interfaces/index";
import {motion} from "framer-motion"

export default function SmallButton({title, type, onClick, bgColor, Icon, disabled}: ButtonInterface) {

    return (
        <motion.button
            whileHover={{scale: 1.02}}
            className={`select-none w-full rounded p-2 ${bgColor ? bgColor : 'bg-primary'} cursor-pointer text-mono-100 transition duration-500 ease-in-out hover:bg-secondary flex justify-center`}
            type={type ? type : 'button'}
            onClick={onClick}
            disabled={disabled}
        >
            {Icon && <Icon/>}{title}

        </motion.button>
    )
}