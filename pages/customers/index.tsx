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
                    <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                    </tr>
                    <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


export default CustomersPage

