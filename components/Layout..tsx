import React from "react";
import Head from "next/head";
import {LayoutInterface} from "../interfaces"

export default function Layout({title, keywords, description, children}: LayoutInterface) {
    return (
        <>
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="keywords" content={keywords}/>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={keywords}/>
                </Head>
            </div>
            <div>{children}</div>
        </>
    );
}

Layout.defaultProps = {
    title: "Rabbit Sitter Hana - Customer Management System",
    keywords: "Rabbit Sitter Hana, Customer Management System",
    description: "Rabbit Sitter Hanaのカスタマー管理システムです。",
};
