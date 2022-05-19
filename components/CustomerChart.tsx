import {useQuery} from "react-query";
import {queryKeys} from "../react-query/constants";
import React from "react";
import {getCustomerAgeGroup} from "@/services/customers";
import debugConsole from "@/helpers/debugConsole";

export default function CustomerChart() {

    const {
        data: customerAgeGroupList,
        isLoading,
        isError
    } = useQuery(queryKeys.customerAgeGroup, () => getCustomerAgeGroup().then(r => r.json()))
    if (isLoading) {
        return <div></div>
    }
    if (isError) {
        return <div></div>
    }

    debugConsole('customerAgeGroupList', customerAgeGroupList)
    return <></>
}