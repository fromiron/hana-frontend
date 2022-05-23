import {useState} from "react";
import {useInterval} from "usehooks-ts";
import SectionLabel from "@/components/partials/SectionLabel";


export default function Counter({
                                    label,
                                    num,
                                    bgColor,
                                    textColor
                                }: { label: string, num: number, bgColor: string, textColor: string }) {
    const [renderNum, setRenderNum] = useState<number>(0);

    useInterval(() => {
        if (renderNum >= num) {
            return;
        } else {
            setRenderNum(renderNum + 1)
        }
    }, num > 40? 30: 100)

    return (
        <div>
            <SectionLabel label={label}/>
            <div className={`bg-mono-100 text-mono-200  p-4 rounded p-14 aspect-square w-auto flex justify-center flex-col items-center hover:bg-${bgColor} hover:text-${textColor} transition-colors duration-500`}>
                <div className='text-5xl'>{renderNum}</div>
            </div>
        </div>
    )
}