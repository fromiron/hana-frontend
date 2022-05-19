import Layout from "@/components/Layout";
import React from "react";
import {NextPage} from "next";
import PetTypeChart from "@/components/PetTypeChart";
import CustomerChart from "@/components/CustomerChart";
import PieChart from "@/components/PieChart";


const OverviewPage: NextPage = () => {

    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <h1>OverviewPage</h1>
            <PetTypeChart/>

            <CustomerChart/>
        </Layout>
    )
}


export default OverviewPage
