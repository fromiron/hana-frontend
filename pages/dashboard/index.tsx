import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";

const DashboardPage: NextPage = () => {
    return (
        <Layout title={'Dashboard - Rabbit Sitter Hana'}>
            <div className='flex h-full'>
                <div className='w-1/6 h-full bg-white border-r-2 border-mono-100'>

                    <ul>
                        <li>
                            Logo
                        </li>
                        <li>
                            Overview
                        </li>
                        <li>
                            Customers
                        </li>
                        <li>
                            Pets
                        </li>
                        <li>
                            Reservations
                        </li>
                        <li>
                            Settings
                        </li>
                    </ul>
                    <div>divider</div>
                    <ul>

                        <li>

                        </li>
                        <li>
                            Logout
                        </li>
                    </ul>

                </div><div>Right</div>
            </div>
        </Layout>
    )
}


export default DashboardPage

