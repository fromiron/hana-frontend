import {useQuery} from "react-query";
import {queryKeys} from "../react-query/constants";
import {getPetTypeCount} from "@/services/pets";
import React from "react";
import PieChart from "@/components/PieChart";
import ObjectWrapper from "@/components/partials/ObjectWrapper";
import {PetTypeCountInterface} from "@/interfaces/petInterface";
import {ChartDataInterface} from "@/interfaces/index";
import SectionLabel from "@/components/partials/SectionLabel";

export default function PetTypeChart() {
    const {
        data: petTypeList,
        isLoading,
        isError,
    } = useQuery<PetTypeCountInterface[]>(queryKeys.petTypes, () => getPetTypeCount().then(r => r.json()))


    if (isLoading) {
        return <div></div>
    }
    if (isError) {
        return <div></div>
    }
    let totalValue = 0;
    const chartData: ChartDataInterface[] = petTypeList?.map(petType => {
        const id: string = petType.type;
        const value: number = +petType.count;
        totalValue += value;
        return {id, value}
    }) ?? [];

    if (!chartData?.length) {
        return <div></div>
    }


    return <div className={'flex-1'}>
        <SectionLabel label={'Pet - Types'}/>
        <ObjectWrapper>
            <PieChart chartId={'petTypeChart'} chartData={chartData} totalValue={totalValue}/>
        </ObjectWrapper>
    </div>
}