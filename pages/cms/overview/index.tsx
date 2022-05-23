import Layout from "@/components/Layout";
import React from "react";
import {NextPage} from "next";
import PetTypeChart from "@/components/PetTypeChart";
import CustomerChart from "@/components/CustomerChart";
import Counter from "@/components/Counter";
import {COLORS, LINE_CHART_COLORS} from "@/config/colors";
import {ResponsiveLine} from "@nivo/line";
import ObjectWrapper from "@/components/partials/ObjectWrapper";
import SectionLabel from "@/components/partials/SectionLabel";


const MyResponsiveLine = ({data}: { data: any }) => (


    // @ts-ignore
    <ResponsiveLine
        data={data}
        margin={{top: 50, right: 50, bottom: 50, left: 50}}
        xScale={{type: 'point'}}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        enablePoints={true}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        colors={LINE_CHART_COLORS} lineWidth={4}
        pointSize={7}
        pointColor={{from: 'color', modifiers: []}}
        pointBorderWidth={6}
        pointBorderColor={{from: 'serieColor'}}
        pointLabelYOffset={-12}
        areaOpacity={0}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 100,
                translateY: 41,
                itemsSpacing: 43,
                itemDirection: 'left-to-right',
                itemWidth: 143,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 11,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
const OverviewPage: NextPage = () => {

    const data = [
        {
            "id": "japan",
            "color": "hsl(169, 70%, 50%)",
            "data": [
                {x: 1, y: 56}, {x: 2, y: 68},
                {x: 3, y: 9}, {x: 4, y: 63},
                {x: 5, y: 97}, {x: 6, y: 97},
                {x: 7, y: 14}, {x: 8, y: 48},
                {x: 9, y: 84}, {x: 10, y: 77},
                {x: 11, y: 14}, {x: 12, y: 73},
                {x: 13, y: 85}, {x: 14, y: 44},
                {x: 15, y: 93}, {x: 16, y: 39},
                {x: 17, y: 39}, {x: 18, y: 80},
                {x: 19, y: 7}, {x: 20, y: 63},
                {x: 21, y: 69}, {x: 22, y: 73},
                {x: 23, y: 17}, {x: 24, y: 74},
                {x: 25, y: 37}, {x: 26, y: 58},
                {x: 27, y: 15}, {x: 28, y: 70},
                {x: 29, y: 18}, {x: 30, y: 58},
                {x: 31, y: 53}
            ]
        },
        {
            "id": "france",
            "color": "hsl(19, 70%, 50%)",
            "data": [
                {x: 1, y: 40}, {x: 2, y: 1},
                {x: 3, y: 28}, {x: 4, y: 87},
                {x: 5, y: 16}, {x: 6, y: 20},
                {x: 7, y: 50}, {x: 8, y: 65},
                {x: 9, y: 15}, {x: 10, y: 81},
                {x: 11, y: 11}, {x: 12, y: 23},
                {x: 13, y: 20}, {x: 14, y: 71},
                {x: 15, y: 92}, {x: 16, y: 56},
                {x: 17, y: 53}, {x: 18, y: 66},
                {x: 19, y: 35}, {x: 20, y: 32},
                {x: 21, y: 91}, {x: 22, y: 22},
                {x: 23, y: 60}, {x: 24, y: 88},
                {x: 25, y: 48}, {x: 26, y: 26},
                {x: 27, y: 12}, {x: 28, y: 40},
                {x: 29, y: 79}, {x: 30, y: 60},
                {x: 31, y: 3}
            ]
        }
    ];
    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <div className='grid overflow-hidden grid-cols-2 md:grid-cols-2 sm:grid-cols-1 auto-rows-auto gap-4'>
                <PetTypeChart/>
                <CustomerChart/>
            </div>
            <div className='grid overflow-hidden grid-cols-4 md:grid-cols-4 sm:grid-cols-1 auto-rows-auto gap-4'>
                <Counter label={'Pet - Birth'} num={1} bgColor={COLORS.ACCENT} textColor={COLORS.WHITE}/>
                <Counter label={'Pet - Dead'} num={5} bgColor={COLORS.BLACK} textColor={COLORS.WHITE}/>
                <Counter label={'Customer - Total'} num={15} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Karte - Toal'} num={30} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Reservation - Last Month'} num={5} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Reservation - Total'} num={52} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Cancel - Last Month'} num={41} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Cancel - Total'} num={20} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
            </div>
            <div>
                <SectionLabel label={'Graph'}/>
                <ObjectWrapper style={'mt-4'}>
                    <div className='bg-white rounded h-96'>
                        <MyResponsiveLine data={data}/>
                    </div>
                </ObjectWrapper>
            </div>
        </Layout>
    )
}


export default OverviewPage
