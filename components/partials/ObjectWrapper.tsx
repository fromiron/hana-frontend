
interface ObjectWrapperInterface{
    children: any,
    style?:string
}

export default function ObjectWrapper({children, style}:ObjectWrapperInterface) {
    return <div className={`p-4 bg-mono-100 rounded w-auto ${style}`}>
        {children}
    </div>
}