import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";
import PageTitle from "@/components/partials/PageTitle";

const CustomersPage: NextPage = () => {
    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            Customers
        </Layout>
    )
}


export default CustomersPage

