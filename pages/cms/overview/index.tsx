import type {NextApiRequest, NextPage} from 'next'
import Layout from "@/components/Layout";
import React from "react";
import {parseCookies} from "@/helpers/parseCookies";
import {GetServerSideProps} from "next";
import {API_URL, NEXT_API_URL} from "@/config/index";
import credentialChecker from "@/helpers/credentialChecker";
import {useQuery} from "react-query";

const OverviewPage: NextPage = ({data}: any) => {
    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <h1>OverviewPage</h1>
        </Layout>
    )
}


export default OverviewPage



export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const isCredentialed = await credentialChecker(req)
    if (!isCredentialed) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }


    return {
        props: {
            'data':'test',
        },
    };
}
