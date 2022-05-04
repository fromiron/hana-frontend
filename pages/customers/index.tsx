import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";

const CustomersPage: NextPage = () => {
    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            <div>
                <select>
                    <option value="">Select a customer</option>
                    <option value="1">Customer 1</option>
                    <option value="1">Customer 2</option>
                </select>
            </div>
        </Layout>
    )
}


export default CustomersPage

