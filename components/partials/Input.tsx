import {useState} from "react";
import {InputInterface} from "@/interfaces/index";
import { motion } from "framer-motion";

export default function Input({Icon, type, placeholder, name, onChange, isError}: InputInterface) {
    const [focus, setFocus] = useState(false);
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className='mb-3 text-right transition duration-500 ease-in-out'>
        <div
            className={`relative bg-white rounded flex border border-10 transition duration-500 ease-in-out ${focus ? 'border-primary' : (isError?'border-accent' :'border-mono-100')}`}>
            <div
                className={`w-10 h-auto flex justify-center items-center transition duration-500 ease-in-out ${focus ? 'bg-primary border-primary' : (isError?'bg-accent border-accent' :'bg-mono-100 border-mono-100')}`}>
                <Icon color='white'/>
            </div>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="relative w-full p-3 text-sm bg-white rounded focus:outline-none text-gray-600"
                onChange={onChange}
            />
        </div>
        </motion.div>)
}