import type {NextApiRequest, NextPage} from 'next'
import {GetServerSideProps} from "next";
import Layout from "@/components/Layout";
import React from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getCustomers} from "@/services/customers";
import {NEXT_API_URL} from "@/config/index";

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


const CustomersPage: NextPage = () => {
    const {data, isLoading, refetch} = useQuery(queryKeys.customers, () => getCustomers());

    if (isLoading) {
        return <div>Loading...</div>
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


export const getServerSideProps: GetServerSideProps = async ({req   }) => {
    const client = new QueryClient();
    await client.prefetchQuery(queryKeys.customers, async () => {
        const response = await fetch(`${NEXT_API_URL}/customers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.json();
    })
    return {
        props: {
            dehydratedState: dehydrate(client)
        },
    };
}


