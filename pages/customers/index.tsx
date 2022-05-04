import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";

const CustomersPage: NextPage = () => {
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

            <div>

                List
            </div>
        </Layout>
    )
}


export default CustomersPage

