import React from "react";

export default function PageTitle({pageTitle}: { pageTitle: string }) {
    return <div className='text-black'>
        <p className='text-s'>Rabbit Sitter Hana</p>
        <p className='text-xs text-mono-200'>Customer Management System</p>
        <h1 className='mt-2 text-4xl font-bold'>{pageTitle}</h1>
    </div>
}