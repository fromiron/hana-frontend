import React from "react";
import {ButtonInterface} from "@/interfaces/index";
import { motion } from "framer-motion"

export default function Button({title, onClick}:ButtonInterface) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            className='w-full rounded p-3 bg-primary text-mono-100 transition duration-500 ease-in-out hover:bg-secondary'
            type='button'
            onClick={onClick}>{title}
        </motion.button>
    )
}