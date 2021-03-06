import {ResponsivePie} from '@nivo/pie'
import {PIE_CHART_COLORS} from "@/config/colors";
import calculator from "@/helpers/calculator";
import {ChartDataInterface} from "@/interfaces/index";
import {useInterval} from "usehooks-ts";
import {useState} from "react";


export default function PieChart({chartData: data, totalValue}:
                                     { chartData: ChartDataInterface[], totalValue: number }) {
    const [renderNum, setRenderNum] = useState<number>(0);

    useInterval(() => {
        if (renderNum >= totalValue) {
            return;
        } else {
            setRenderNum(renderNum + 1)
        }
    }, totalValue > 40? 30: 100)

    return (
        <div className='min-w-96 h-80 relative'>
            <div className='absolute bg-white py-2 px-4 h-min w-min rounded'>
                <div className='text-xs text-mono-200'>
                    total
                </div>
                <div className='text-center font-bold text-black'>{renderNum}</div>
            </div>
            <ResponsivePie
                data={data}
                margin={{top: 30, right: 90, bottom: 30, left: 20}}
                innerRadius={0.5}
                sortByValue={true}
                padAngle={1.5}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                colors={PIE_CHART_COLORS}
                enableArcLinkLabels={false}
                arcLabel={(data) => `${calculator().percent(data.data.value, totalValue)}%`}
                arcLabelsSkipAngle={20}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'brighter',
                            3
                        ]
                    ]
                }}
                legends={[
                    {
                        data: data.map((item, index) => {
                            return {
                                id: index,
                                label: `${item.id}(${item.value})`,
                                color: PIE_CHART_COLORS[index]
                            }
                        }),
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        itemsSpacing: 16,
                        itemWidth: -15,
                        itemHeight: 18,
                        itemTextColor: '#1B1D21',
                        itemDirection: 'left-to-right',
                        symbolSize: 18,
                        symbolShape: 'circle',
                    }
                ]}
            />
        </div>
    )
}
