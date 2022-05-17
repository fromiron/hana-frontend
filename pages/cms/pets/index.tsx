import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";
import {useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getPets} from "@/services/pets";
import debugConsole from "@/helpers/debugConsole";

const PetsPage: NextPage = () => {
    const {
        data,
        isLoading,
        isError,
        refetch
    } = useQuery(queryKeys.pets, () => getPets('populate=*').then(r => r.json()));

    debugConsole('PetsPage', data);
    return (
        <Layout title={'Pets - Rabbit Sitter Hana'} pageTitle={'Pets'}>
            <h1>PetsPage</h1>
        </Layout>
    )
}


export default PetsPage

