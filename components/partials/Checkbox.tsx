import React from "react";

export default function CheckBox({
                                     name,
                                     label,
                                     checked,
                                     onChange
                                 }: { name: string, label: string, checked: boolean, onChange: any }) {
    return <label htmlFor={name}
                  className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
        <input id={name} type="checkbox" onChange={onChange} checked={checked}
               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
        <span className="ml-2 select-none">{label}</span>
    </label>
}