import type {NextPage} from 'next'
import {GetServerSideProps} from "next";
import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getCustomers} from "@/services/customers";
import qs from "qs";
import Image from "next/image";
import {BACK_END_DEFAULT_URL} from "@/config/index";
import Button from "@/components/partials/Button";
import LoadIndicator from "@/components/LoadIndicator";
import {CustomerInterface, CustomersResponse, PetInterface, SexFilterInterface} from "@/interfaces/customerInterface";
import {IconContainer, SexIcon} from "@/components/partials/Icon";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

const DEFAULT_QUERY = {
    populate: {
        age_group: {
            fields: ['group'],
        },
        sex: {
            fields: ['sex'],
        },
        pets: {
            populate: {
                type: {
                    fields: ['type'],
                    populate: '*'
                },
            },

        }
    },
    filters: {
        sex: {
            sex: {$eq: ['male', 'female', 'other']}
        },
        deleted_at: {
            $null: true,
        },
    },
    sort: ['id:asc']
}

const DEFAULT_QUERY_STRING = qs.stringify(DEFAULT_QUERY, {
    encodeValuesOnly: true,
})


const DEFAULT_SEX_FILTER_OPTIONS: SexFilterInterface = {
    male: true,
    female: true,
    other: true
}


const CustomersPage: NextPage = () => {
    const [queryString, setQueryString] = useState(DEFAULT_QUERY_STRING);
    const [searchText, setSearchText] = useState('')
    const [sexFilter, setSexFilter] = useState<SexFilterInterface>(DEFAULT_SEX_FILTER_OPTIONS);
    const [sortFilter, setSortFilter] = useState<object>(['id:asc']);
    const {data, isLoading, isError, refetch} = useQuery(queryKeys.customers, async () => {
        const res = await getCustomers(queryString);
        if (res.ok) {
            return res.json()
        }
    });

    useEffect(() => {
        (async function () {
            await refetch()
        })();
    }, [queryString])


    const handleQuery = async () => {
        console.log('[CUSTOMER FETCH]')
        let sexEq = Object.keys(sexFilter).filter((key) => sexFilter[key] === true);
        if (sexEq.length === 0) {
            sexEq = ['']
        }
        const newQuery = {
            ...DEFAULT_QUERY,
            filters: {
                sex: {
                    sex: {
                        $eq: sexEq,
                    }
                },
                $or: [
                    {kana: {$contains: searchText}},
                    {kanji: {$contains: searchText}},
                    {email: {$contains: searchText}},
                    {address: {$contains: searchText}},
                    {note: {$contains: searchText}},
                    {phone: {$contains: searchText}},
                    {zipcode: {$contains: searchText}},
                ]
            },
            sort: sortFilter
        };
        console.log('newQuery', newQuery.filters.sex.sex.$eq)

        await setQueryString(qs.stringify(newQuery, {
            encodeValuesOnly: true,
        }));
    }
    const handleSort = async (sort: string) => {
        await setSortFilter([sort]);
    }


    const handleSexFilter = async (e: any) => {
        const filterName = e.target.id;
        const checked = e.target.checked;
        console.log(e.target)

        const newSexFilter = {
            ...sexFilter,
            [filterName]: checked
        }
        console.log("newSexFilter", newSexFilter)
        await setSexFilter(newSexFilter)
    }
    //
    const resetFilter = async () => {
        await setSearchText('');
        await setSexFilter(DEFAULT_SEX_FILTER_OPTIONS)
        await setQueryString(DEFAULT_QUERY_STRING);
    }
    const handleSearch = async () => {
        await handleQuery();
    }
    const changeSearchText = (e: any) => {
        setSearchText(e.target.value);
    }

    if (isLoading) {
        return <Layout pageTitle={'Customers'}>
            <LoadIndicator/>
        </Layout>
    }
    if (isError) {
        return <Layout pageTitle={'Customers'}>
            <div>Error...</div>
        </Layout>
    }
    const customers = data.customers;

    const TableItem = ({children}: any) => <td className='p-2 text-center'>{children}</td>;


    const customerList = customers?.data?.map((customer: CustomerInterface) => (
        <tr key={customer.id}
            className='transition duration-300 ease-in-out bg-white hover:bg-mono-100 focus:bg-mono-100 cursor-pointer'>
            <TableItem>{customer.id}</TableItem>
            <TableItem>{`${customer.attributes?.kanji}(${customer.attributes?.kana})`}</TableItem>
            <TableItem>{customer.attributes?.age_group?.data?.attributes?.group}</TableItem>
            <TableItem>{SexIcon(customer.attributes?.sex?.data?.attributes?.sex)}</TableItem>
            <TableItem>{customer.attributes?.email}</TableItem>
            <TableItem>{customer.attributes?.address}</TableItem>
            <TableItem>{customer.attributes?.phone}</TableItem>
            <TableItem>
                <div className='flex'>{customer.attributes?.pets?.data.map(
                    (pet: PetInterface) => <IconContainer key={pet.id}>
                        <Image alt='pet_icon'
                               src={BACK_END_DEFAULT_URL + pet.attributes?.type?.data?.attributes.icon.data.attributes.url}
                               width={20}
                               height={20}/>
                    </IconContainer>
                )}</div>
            </TableItem>
        </tr>
    ))
    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            <div className='text-xs mb-2 text-mono-200'>Filters</div>
            <div className='flex'>
                <select onChange={(e) => handleSort(e.target.value)} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    <option value={'id:asc'}>ID昇順</option>
                    <option value={'id:desc'}>ID降順</option>
                    <option value={'age_group.id:asc'}>年齢昇順</option>
                    <option value={'age_group.id:desc'}>年齢昇順</option>
                </select>
                <input
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black'
                    placeholder='Search' type='text' value={searchText} onChange={changeSearchText}/>
            </div>

            <div className='mt-4'>
                <div className='flex text-black text-xs'>
                    <label htmlFor="male"
                           className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
                        <input id="male" type="checkbox" onChange={handleSexFilter} checked={sexFilter.male}
                               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
                        <span className="ml-2 select-none">男性</span>
                    </label>

                    <label htmlFor="female"
                           className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
                        <input id="female" type="checkbox" onChange={handleSexFilter} checked={sexFilter.female}
                               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
                        <span className="ml-2 select-none">女性</span>
                    </label>

                    <label htmlFor="other"
                           className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
                        <input id="other" type="checkbox" onChange={handleSexFilter} checked={sexFilter.other}
                               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
                        <span className="ml-2 select-none">別姓</span>
                    </label>
                    <div className='flex'>
                        <div className='min-w-full mr-4'>
                            <Button title={'検索'} onClick={handleSearch}/>
                        </div>
                        <div className='min-w-full'>
                            <Button title={'RESET'} onClick={resetFilter}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-xs mt-4 mb-2 text-mono-200'>Board</div>

            <div className='p-4 bg-mono-100 rounded w-full'>
                <table className="table-auto rounded overflow-hidden w-full">
                    <thead className='text-white bg-primary'>
                    <tr className='px-6 py-2 divide-white  text-s'>
                        <th className='p-2'>ID</th>
                        <th className='p-2'>名前(かな)</th>
                        <th className='p-2'>年齢</th>
                        <th className='p-2'>性別</th>
                        <th className='p-2'>メール</th>
                        <th className='p-2'>住所</th>
                        <th className='p-2'>連絡先</th>
                        <th className='p-2'>ペット</th>
                    </tr>
                    </thead>
                    <tbody className='white divide-y divide-mono-100 bg-white text-black'>
                    {customerList}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


export default CustomersPage


export const getServerSideProps: GetServerSideProps = async () => {
    const client = new QueryClient();

    try {
        await client.prefetchQuery<CustomersResponse>(queryKeys.customers, async () => {
            const res = await getCustomers(DEFAULT_QUERY_STRING);
            if (res.ok) {
                return res.json()
            }
        });
    } catch (e) {
        return {
            props: {
                dehydratedState: dehydrate(client)
            },
        };
    }
    return {
        props: {},
    };
}


