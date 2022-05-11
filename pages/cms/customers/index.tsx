import type {GetStaticProps, NextApiRequest, NextPage} from 'next'
import {GetServerSideProps} from "next";
import Layout from "@/components/Layout";
import React from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getCustomers} from "@/services/customers";
import qs from "qs";
import Image from "next/image";
import {API_URL, BACK_END_DEFAULT_URL} from "@/config/index";

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
        pets: {
            data: PetInterface[]
        }
    }
}

interface PetInterface {
    id: number;
    attributes: {
        name: string,
        birth: string,
        createdAt: string,
        updatedAt: string,
        note: string,
        dead: boolean,
        type: {
            data: {
                id: number,
                attributes: {
                    type: string,
                    icon: {
                        data: {
                            attributes: {
                                url: string
                            }
                        }
                    }
                }
            }
        }
    }

}

interface CustomersResponse {
    customers: [CustomerInterface];
}

// const query = qs.stringify({
//     populate: '*',
// }, {
//     encodeValuesOnly: true,
// });

const query = qs.stringify({
    populate: {
        pets: {
            populate: {
                type: {
                    fields: ['type'],
                    populate: '*'
                },
            },

        }
    },
}, {
    encodeValuesOnly: true,
});


const CustomersPage: NextPage = () => {
    const {data, isLoading, isError, refetch} = useQuery(queryKeys.customers, async () => {
        const res = await getCustomers(query);
        if (res.ok) {
            return res.json()
        }
    });

    if (isLoading) {
        return <Layout pageTitle={'Customers'}>
            <div>Loading...</div>
        </Layout>
    }
    if (isError) {
        return <Layout pageTitle={'Customers'}>
            <div>Error...</div>
        </Layout>
    }
    const customers = data.customers;

    const TableItem = ({children}: any) => <td className='p-2 text-center'>{children}</td>;

    const PetBadge = ({children}: any) => <div
        className='text-xs rounded min-h-fit h-auto p-1 bg-mono-100 mr-2'>{children}</div>;

    const customerList = customers?.data?.map((customer: CustomerInterface) => (
        <tr key={customer.id}
            className='transition duration-300 ease-in-out bg-white hover:bg-mono-100 focus:bg-mono-100 cursor-pointer'>
            <TableItem>{`${customer.attributes.kanji}(${customer.attributes.kana})`}</TableItem>
            <TableItem>{customer.attributes.email}</TableItem>
            <TableItem>{customer.attributes.address}</TableItem>
            <TableItem>{customer.attributes.phone}</TableItem>
            <TableItem>
                <div className='flex'>{customer.attributes.pets.data.map(
                    (pet: PetInterface) => <PetBadge key={pet.id}>
                        <Image
                        src={BACK_END_DEFAULT_URL + pet.attributes.type.data.attributes.icon.data.attributes.url} width={20}
                        height={20} />
                    </PetBadge>
                )}</div>
            </TableItem>
        </tr>
    ))


    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            <div className='flex'>
                <select
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    <option value="">新規登録順</option>
                    <option value="1">名前順</option>
                    <option value="2">年齢順</option>
                </select>
                <input
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black'
                    placeholder='Search' type='text'/>
            </div>
            <button onClick={() => refetch()}>Refetch</button>
            <div className='p-4 bg-mono-100 rounded w-full'>
                <table className="table-auto rounded overflow-hidden w-full">
                    <thead className='text-white bg-primary'>
                    <tr className='px-6 py-2 divide-white  text-s'>
                        <th className='p-2'>名前(かな)</th>
                        <th className='p-2'>メール</th>
                        <th className='p-2'>住所</th>
                        <th className='p-2'>連絡先</th>
                        <th className='p-2'>登録ペット数</th>
                    </tr>
                    </thead>
                    <tbody className='white divide-y divide-mono-100 bg-white text-black'>
                    {customerList}
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
            const res = await getCustomers(query);
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


