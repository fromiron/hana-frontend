import type {GetStaticProps, NextApiRequest, NextPage} from 'next'
import {GetServerSideProps} from "next";
import Layout from "@/components/Layout";
import React, {useState} from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getCustomers} from "@/services/customers";
import qs from "qs";
import Image from "next/image";
import {BACK_END_DEFAULT_URL} from "@/config/index";
import {MdFemale, MdMale} from "react-icons/md";
import {FaGenderless} from "react-icons/fa";
import Button from "@/components/partials/Button";
import LoadIndicator from "@/components/LoadIndicator";

interface CustomerInterface {
    id: number;
    attributes: {
        kana: string;
        kanji: string;
        email: string;
        address: string;
        createdAt: string;
        updatedAt: string;
        note: string;
        phone: string;
        zipcode: string;
        sex: { data: SexInterface },
        age_group: { data: AgeGroupInterface },
        pets: { data: PetInterface[] }
    }
}

interface SexInterface {
    id: number;
    attributes: {
        sex: string;
    }
}

interface AgeGroupInterface {
    id: number;
    attributes: {
        group: string;
    }
}

interface PetInterface {
    id: number;
    attributes: {
        name: string,
        birth: string,
        createdAt: string,
        updatedAt: string,
        note: string,
        dead: boolean,
        type: {
            data: {
                id: number,
                attributes: {
                    type: string,
                    icon: {
                        data: {
                            attributes: {
                                url: string
                            }
                        }
                    }
                }
            }
        }
    }
}

interface CustomersResponse {
    customers: [CustomerInterface];
}

const IconContainer = ({children}: any) => <div
    className='text-xs rounded min-h-fit h-auto flex justify-center p-1 bg-mono-100 mr-2'>{children}</div>;
const SexIcon = (sex: string) => {
    if (sex === 'male') {
        return <IconContainer><MdMale color={'#345eeb'}/></IconContainer>
    }
    if (sex === 'female') {
        return <IconContainer><MdFemale color={'#fc0373'}/></IconContainer>
    }
    return <IconContainer><FaGenderless color={'#b134eb'}/></IconContainer>
}

const defaultQuery = qs.stringify({
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
}, {
    encodeValuesOnly: true,
});

const defaultFilterConfig = {
    male: true,
    female: true,
    other: true
}
const CustomersPage: NextPage = () => {
    const [queryString, setQueryString] = useState(defaultQuery);
    const [sexFilter, setSexFilter] = useState(defaultFilterConfig);
    const {data, isLoading, isError, refetch} = useQuery(queryKeys.customers, async () => {
        const res = await getCustomers(queryString);
        if (res.ok) {
            return res.json()
        }
    });

    const handleQuery = async (qsString: string) => {
        const newQueryObject = JSON.parse(qsString);
        const parsedDefaultQueryObject = qs.parse(defaultQuery);
        const query = Object.assign(parsedDefaultQueryObject, newQueryObject)
        const newQueryString = qs.stringify(query)
        await setQueryString(newQueryString);
        await refetch();
    }

    const handleSexFilter = async (e: any) => {
        const filterName = e.target.id;
        const checked = e.target.checked;
        setSexFilter({...sexFilter, [filterName]: checked})
        const list: string[] = [];

        Object.entries(sexFilter).forEach(([key, value]) => {
            if (value) {
                list.push(key);
            }
        })
        console.log(sexFilter)
        console.log(list);
        const filter = {
            filters: {
                sex: {
                    sex: {
                        $eq: list,
                        $null:sexFilter.other
                    }
                }
            },
        }
        const queryString = JSON.stringify(filter);
        await handleQuery(queryString);
    }

    const resetFilter = async () => {
        await setSexFilter(defaultFilterConfig)
        await setQueryString(defaultQuery);
        await refetch();
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
                        <Image
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
                <select onChange={(e) => handleQuery(e.target.value)} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    <option value={JSON.stringify({'sort': ['id:asc']})}>ID昇順</option>
                    <option value={JSON.stringify({'sort': ['id:desc']})}>ID降順</option>
                    <option value={JSON.stringify({'sort': ['age_group.id:asc']})}>年齢昇順</option>
                    <option value={JSON.stringify({'sort': ['age_group.id:desc']})}>年齢昇順</option>
                </select>
                <input
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black'
                    placeholder='Search' type='text'/>
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
                    <div className='w-fit'>
                        <Button title={'RESET'} onClick={resetFilter}/>
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


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const client = new QueryClient();

    try {
        await client.prefetchQuery<CustomersResponse>(queryKeys.customers, async () => {
            const res = await getCustomers(defaultQuery);
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


