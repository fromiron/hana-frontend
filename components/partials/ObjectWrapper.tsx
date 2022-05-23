
export default function ObjectWrapper({children, style}:{children:any, style:string | null}) {
    return <div className={`p-4 bg-mono-100 rounded w-auto ${style}`}>
        {children}
    </div>
}