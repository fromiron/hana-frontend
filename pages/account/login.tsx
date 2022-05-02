import type {NextPage} from 'next'
import Layout from "@/components/Layout.";
import React from "react";
import LoginForm from "@/components/LoginForm";

const LoginPage: NextPage = () => {
    return (
        <Layout>
            <div className='relative w-screen h-screen'>
                <div className="absolute inset-0 bg-amber-400 flex justify-center items-center">
                    <LoginForm/>
                </div>
            </div>
        </Layout>
    )
}


export default LoginPage

