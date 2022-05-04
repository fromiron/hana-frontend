import React from "react";
import Head from "next/head";
import {AccountInterface} from "../interfaces"

export default function AccountLayout({title, keywords, description, children}: AccountInterface) {
    return (
        <div>
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="keywords" content={keywords}/>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={keywords}/>
                </Head>
            </div>
            <div className="container bg-white h-screen">
                {children}
            </div>
        </div>
    );
}

AccountLayout.defaultProps = {
    title: "Rabbit Sitter Hana - Customer Management System",
    keywords: "Rabbit Sitter Hana, Customer Management System",
    description: "Rabbit Sitter Hanaのカスタマー管理システムです。",
};
