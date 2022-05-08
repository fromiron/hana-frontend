import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";
import {parseCookies} from "@/helpers/parseCookies";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";

const OverviewPage: NextPage = () => {
    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <h1>OverviewPage</h1>
        </Layout>
    )
}


export default OverviewPage


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const {token} = parseCookies(req);
    console.log(token);
    return {
        props: {
            token
        },
    };
}
