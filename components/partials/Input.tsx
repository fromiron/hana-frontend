import {useState} from "react";
import {InputInterface} from "@/interfaces/index";

export default function Input({Icon, type, placeholder, name, onChange, isError}: InputInterface) {
    const [focus, setFocus] = useState(false);
    console.log('nameisError', name, isError)
    return (
        <div
            className={`relative bg-white rounded flex border border-2 transition duration-500 ease-in-out ${focus ? 'border-primary' : (isError?'border-accent' :'border-mono-100')}`}>
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
        </div>)
}