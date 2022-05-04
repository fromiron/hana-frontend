import React from "react";
import Head from "next/head";
import {LayoutInterface} from "../interfaces"
import {MdOutlineLibraryBooks, MdPeople, MdOutlinePets, MdCalendarToday, MdSettings, MdOutlineRedo} from "react-icons/md";
import Image from "next/image";
import IconMenuItem from "@/components/partials/IconMenuItem";
import Logo from "@/public/logo.svg";

export default function Layout({title, keywords, description, children}: LayoutInterface) {
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

                <div className='flex h-full'>
                    <div className='w-72 h-full bg-white border-r-2 border-mono-100 px-4'>
                        <div className='m-10'>
                            <Image src={Logo} alt="logo"/>
                        </div>
                        <div className='text-xs text-mono-200'>
                            Admin Tools
                        </div>
                        <ul>
                            <IconMenuItem Icon={MdOutlineLibraryBooks} onClick={() => console.log('Overview')}
                                          title={'Overview'}/>

                            <IconMenuItem Icon={MdPeople} onClick={() => console.log('Customers')}
                                          title={'Customers'}/>

                            <IconMenuItem Icon={MdOutlinePets} onClick={() => console.log('Pets')}
                                          title={'Pets'}/>

                            <IconMenuItem Icon={MdCalendarToday} onClick={() => console.log('Reservations')}
                                          title={'Reservations'}/>

                            <IconMenuItem Icon={MdSettings} onClick={() => console.log('Settings')}
                                          title={'Settings'}/>
                        </ul>
                        <div className='border-b border-mono-100'/>
                        <div className='mt-10 text-xs text-mono-200'>
                            Links
                        </div>
                        <ul>
                            <IconMenuItem Icon={MdOutlineRedo} onClick={() => console.log('site1')}
                                          title={'site1'}/>

                            <IconMenuItem Icon={MdOutlineRedo} onClick={() => console.log('site2')}
                                          title={'site2'}/>
                        </ul>

                    </div>
                    <div>{children}</div>
                </div>

            </div>
        </div>
    );
}

Layout.defaultProps = {
    title: "Rabbit Sitter Hana - Customer Management System",
    keywords: "Rabbit Sitter Hana, Customer Management System",
    description: "Rabbit Sitter Hanaのカスタマー管理システムです。",
};
