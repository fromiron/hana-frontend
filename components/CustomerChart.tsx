import {useQuery} from "react-query";
import {queryKeys} from "../react-query/constants";
import React from "react";
import {getCustomerAgeGroup} from "@/services/customers";
import debugConsole from "@/helpers/debugConsole";
import {ChartDataInterface} from "@/interfaces/index";
import ObjectWrapper from "@/components/partials/ObjectWrapper";
import PieChart from "@/components/PieChart";
import {CustomerCountInterface} from "@/interfaces/customerInterface";
import SectionLabel from "@/components/partials/SectionLabel";

export default function CustomerChart() {

    const {
        data: customerAgeGroupList,
        isLoading,
        isError
    } = useQuery<CustomerCountInterface[]>(queryKeys.customerAgeGroup, () => getCustomerAgeGroup().then(r => r.json()))
    if (isLoading) {
        return <div></div>
    }
    if (isError) {
        return <div></div>
    }

    let totalValue = 0;
    const chartData: ChartDataInterface[] = customerAgeGroupList?.map(customerAgeGroup => {
        const id: string = customerAgeGroup.group;
        const value: number = +customerAgeGroup.count;
        totalValue += value;
        return {id, value}
    }) ?? [];

    if (!chartData?.length) {
        return <div></div>
    }


    return <div className={'flex-1'}>
        <SectionLabel label={'Customers - Age Group'}/>
        <ObjectWrapper>
            <PieChart chartData={chartData} totalValue={totalValue}/>
        </ObjectWrapper>
    </div>
}