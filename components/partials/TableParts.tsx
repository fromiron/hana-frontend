export const TableItem = ({children}: any) => <td className='p-2 text-center'>{children}</td>;

export function TableRow({children}: any) {
    return <tr
        className='transition duration-300 ease-in-out bg-white hover:bg-mono-100 focus:bg-mono-100 cursor-pointer'>{children}</tr>;
}
