
export const TableItem = ({
                              children,
                              className = ''
                          }: { children: any, className?: string }) => {
    return <td className={`${className??className} py-2 text-center align-middle`}>{children}</td>;
}


export function TableRow({children}:{children:JSX.Element[]}) {
    return <tr
        className='transition duration-300 ease-in-out bg-white hover:bg-mono-100 focus:bg-mono-100 cursor-pointer'>{children}</tr>;
}
