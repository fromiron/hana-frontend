import React from "react";

export default function Pagination({pageCount, page, handlePage}: { pageCount: number, page: number, handlePage: any }) {
    return (
        <div>
            <ul className='flex mt-4 justify-center'>
                <li className={`p-2 ${page > 1 ? 'bg-mono-100 text-black' : 'bg-white text-mono-200'} mr-2 rounded cursor-pointer select-none hover:bg-accent hover:text-white`}
                    onClick={handlePage}
                    value={page - 1}>
                    prev
                </li>

                {Array.from({length: pageCount}, (_, i) => (
                    <li
                        key={i}
                        value={i + 1}
                        className={`p-2 ${page === i + 1 ? 'bg-primary text-white' : 'bg-mono-100 text-black'} mr-2 rounded cursor-pointer select-none hover:bg-accent hover:text-white`}
                        onClick={handlePage}
                    >
                        {i + 1}
                    </li>
                ))}
                <li className={`p-2 ${page < pageCount ? 'bg-mono-100 text-black' : 'bg-white text-mono-200'} mr-2 rounded cursor-pointer select-none hover:bg-accent hover:text-white`}
                    value={page + 1}
                    onClick={handlePage}>
                    next
                </li>
            </ul>
        </div>
    )
}
