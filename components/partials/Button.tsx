import React from "react";
import {ButtonInterface} from "@/interfaces/index";

export default function Button({title, onClick}:ButtonInterface) {
    return (
        <button
            className='w-full rounded p-3 bg-primary text-mono-100 transition duration-500 ease-in-out hover:bg-secondary'
            type='button'
            onClick={onClick}>{title}
        </button>
    )
}