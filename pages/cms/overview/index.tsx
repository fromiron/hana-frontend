import type { NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";
import {GetServerSideProps} from "next";
import {API_URL} from "@/config/index";


const OverviewPage: NextPage<OverviewPageProps> = ({petTypesCountList}) => {
    console.log(petTypesCountList);
    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <h1>OverviewPage</h1>
            {petTypesCountList.map((petTypeCount) => {
                return (
                    <div key={petTypeCount.id}>
                        <h2>{petTypeCount.type}</h2>
                        <p>{petTypeCount.count}</p>
                    </div>
                )
            })}
        </Layout>
    )
}


export default OverviewPage

interface PetTypeCountInterface {
    id: number,
    count: number
    type: string
}

export interface OverviewPageProps {
    petTypesCountList: PetTypeCountInterface[];
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const petTypeRes = await fetch(`${API_URL}/pet-types/count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.req.cookies.token}`
        }
    });
    const data = await petTypeRes.json();

    const props: OverviewPageProps = {
        petTypesCountList: data
    }
    return {
        props
    }
}
