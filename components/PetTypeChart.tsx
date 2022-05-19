import {useQuery} from "react-query";
import {queryKeys} from "../react-query/constants";
import {getPetTypeCount} from "@/services/pets";
import React from "react";
import PieChart from "@/components/PieChart";


interface PetTypeCountInterface {
    id: number,
    count: number
    type: string,
}

export interface ChartDataInterface {
    id: string,
    value: number,
}

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


    return <PieChart chartData={chartData} totalValue={totalValue}/>
}