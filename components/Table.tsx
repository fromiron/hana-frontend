import React from "react";
import ObjectWrapper from "@/components/partials/ObjectWrapper";

export default function Table({children, thList}: { children: React.ReactNode, thList: string[] }) {
    return <ObjectWrapper>
        <table className="table-auto rounded overflow-hidden w-full">
            <thead className='text-white bg-primary'>
            <tr className='px-6 py-2 divide-white text-s'>
                {thList.map((value, index) => (
                    <th key={index} className='p-2'>{value}</th>
                ))}
            </tr>
            </thead>
            <tbody className='white divide-y divide-mono-100 bg-white text-black'>
            {children}
            </tbody>
        </table>
    </ObjectWrapper>
}