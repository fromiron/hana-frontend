import React, {useEffect} from "react";
import Head from "next/head";
import {LayoutInterface} from "../interfaces"
import {
    MdOutlineLibraryBooks,
    MdPeople,
    MdOutlinePets,
    MdCalendarToday,
    MdSettings,
    MdOutlineRedo,
    MdFolderOpen
} from "react-icons/md";
import Image from "next/image";
import IconMenuItem from "@/components/partials/IconMenuItem";
import Logo from "@/public/logo.svg";
import {useRouter} from "next/router";
import PageTitle from "@/components/partials/PageTitle";
import {useRecoilState} from "recoil";
import {pageState} from "@/store/index";

export default function Layout({title, keywords, description, children, pageTitle}: LayoutInterface) {
    const router = useRouter();
    const [page, setPage] = useRecoilState<string>(pageState);
    useEffect(() => {
        setPage(router.asPath.replace('/cms/', '').toLowerCase())
    }, [])

    const handleRoute = async (url: string) => {
        await router.push(url)
    }
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords}/>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
            </Head>
            <div className="container bg-white h-full max-w-full max-h-screen overflow-y-scroll">
                <div className='flex h-full'>
                    <div className='w-72 h-full bg-white border-r-2 border-mono-100 px-4'>
                        <div className='m-10'>
                            <Image src={Logo} alt="logo"/>
                        </div>
                        <div className='text-xs text-mono-200'>
                            Admin Tools
                        </div>
                        <ul>
                            <IconMenuItem Icon={MdOutlineLibraryBooks} onClick={() => handleRoute('/cms/overview')}
                                          title={'Overview'} page={page}/>

                            <IconMenuItem Icon={MdPeople} onClick={() => handleRoute('/cms/customers')}
                                          title={'Customers'} page={page}/>

                            <IconMenuItem Icon={MdOutlinePets} onClick={() => handleRoute('/cms/pets')}
                                          title={'Pets'} page={page}/>

                            <IconMenuItem Icon={MdCalendarToday} onClick={() => handleRoute('/cms/reservations')}
                                          title={'Reservations'} page={page}/>

                            <IconMenuItem Icon={MdFolderOpen} onClick={() => handleRoute('/cms/karte')}
                                          title={'Karte'} page={page}/>

                            <IconMenuItem Icon={MdSettings} onClick={() => handleRoute('/cms/settings')}
                                          title={'Settings'} page={page}/>

                        </ul>
                        <div className='border-b border-mono-100'/>
                        <div className='mt-10 text-xs text-mono-200'>
                            Links
                        </div>
                        <ul>
                            <IconMenuItem Icon={MdOutlineRedo} onClick={() => console.log('site1')}
                                          title={'site1'} page={null}/>

                            <IconMenuItem Icon={MdOutlineRedo} onClick={() => console.log('site2')}
                                          title={'site2'} page={null}/>
                        </ul>

                    </div>
                    <div className='p-10 w-full h-full'>
                        <PageTitle pageTitle={pageTitle}/>
                        <div className='mt-10 h-full'>
                            {children}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

Layout.defaultProps = {
    title: "Rabbit Sitter Hana - Customer Management System",
    keywords: "Rabbit Sitter Hana, Customer Management System",
    description: "Rabbit Sitter Hanaのカスタマー管理システムです。",
};




