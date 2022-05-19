import {ResponsivePie} from '@nivo/pie'
import {CHART_COLORS} from "@/config/colors";
import ObjectWrapper from "@/components/partials/ObjectWrapper";
import calculator from "@/helpers/calculator";


// @ts-ignore
export default function PieChart({chartData:data, totalValue}: { chartData: ChartDataInterface[], totalValue: number }) {

    return (
        <ObjectWrapper>
            <div className='min-w-96 h-96'>
                total:{totalValue}
                <ResponsivePie
                    data={data}
                    margin={{top: 40, right: 40, bottom: 40, left: 40}}
                    innerRadius={0.5}
                    sortByValue={true}
                    padAngle={0.7}
                    cornerRadius={4}
                    activeOuterRadiusOffset={8}
                    colors={CHART_COLORS}
                    enableArcLinkLabels={false}
                    arcLabel={(data) => `${calculator().percent(data.data.value,totalValue)}%`}
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
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            itemsSpacing: 16,
                            itemWidth: 130,
                            itemHeight: 18,
                            itemTextColor: '#1B1D21',
                            itemDirection: 'left-to-right',
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </ObjectWrapper>)
}
