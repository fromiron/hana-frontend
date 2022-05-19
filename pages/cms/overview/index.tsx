import Layout from "@/components/Layout";
import React from "react";
import {NextPage} from "next";
import PetTypeChart from "@/components/PetTypeChart";
import CustomerChart from "@/components/CustomerChart";
import PieChart from "@/components/PieChart";


const OverviewPage: NextPage = () => {

    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <div className='flex w-full'>
                <PetTypeChart/>
                <div className='w-4'/>
                <CustomerChart/>
            </div>
        </Layout>
    )
}


export default OverviewPage
