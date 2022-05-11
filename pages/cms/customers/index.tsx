import type {NextApiRequest, NextPage} from 'next'
import {GetServerSideProps} from "next";
import Layout from "@/components/Layout";
import React from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getCustomers} from "@/services/customers";

interface CustomerInterface {
    id: number;
    attributes: {
        kana: string;
        kanji: string;
        email: string;
        address: string;
        createdAt: string;
        updatedAt: string;
        note: string;
        phone: string;
        zipcode: string;
    }
}

interface CustomersResponse {
    customers: [CustomerInterface];
}


const CustomersPage: NextPage = () => {
    const {data, isLoading, isError, refetch} = useQuery(queryKeys.customers, async () => {
        const res = await getCustomers();
        if (res.ok) {
            return res.json()
        }
    });

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        console.log(isError);
    }
    const customers = data.customers;

    const rowList = customers?.data?.map((customer: CustomerInterface) => (
        <tr key={customer.id}>
            <td>{customer.attributes.kana}</td>
        </tr>
    ))

    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            <div className='flex'>
                <select
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    <option value="">新規登録順</option>
                    <option value="1">名前順</option>
                    <option value="1">年齢順</option>
                </select>
                <input
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black'
                    placeholder='Search' type='text'/>
            </div>
            <button onClick={() => refetch()}>Refetch</button>
            <div>
                <table className="table-auto">
                    <thead>
                    <tr>
                        <th>名前</th>
                        <th>メール</th>
                        <th>住所</th>
                        <th>住所</th>
                        <th>住所</th>
                        <th>住所</th>

                    </tr>
                    </thead>
                    <tbody>
                    {rowList}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


export default CustomersPage


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const client = new QueryClient();
    try {
        await client.prefetchQuery<CustomersResponse>(queryKeys.customers, async () => {
            const res = await getCustomers();
            if (res.ok) {
                return res.json()
            }
        });
    } catch (e) {
        return {
            props: {
                dehydratedState: dehydrate(client)
            },
        };
    }
    return {
        props: {},
    };


}


