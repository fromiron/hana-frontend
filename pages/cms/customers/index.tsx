import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import React, {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getCustomers} from "@/services/customers";
import qs from "qs";
import Image from "next/image";
import {BACK_END_DEFAULT_URL} from "@/config/index";
import Button from "@/components/partials/Button";
import LoadIndicator from "@/components/LoadIndicator";
import {CustomerInterface, PetInterface, SexFilterInterface} from "@/interfaces/customerInterface";
import {IconContainer, SexIcon} from "@/components/partials/Icon";
import debugConsole from "@/helpers/debugConsole";
import {TableItem, TableRow} from "@/components/partials/TableParts";
import Pagination from "@/components/Pagination";
import SectionLabel from "@/components/partials/SectionLabel";
import CheckBox from "@/components/partials/Checkbox";
import Table from "@/components/Table";


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
    pagination: {
        page: DEFAULT_PAGE_NUMBER,
        pageSize: DEFAULT_PAGE_SIZE,
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
const SORT_LIST = [
    ['id:asc', 'ID昇順'],
    ['id:desc', 'ID降順'],
    ['age_group.id:asc', '年齢昇順'],
    ['age_group.id:desc', '年齢降順'],
]
const PAGE_SIZE_LIST = [
    10, 20, 50
]

const CustomersPage: NextPage = () => {
    const [queryString, setQueryString] = useState(DEFAULT_QUERY_STRING)
    const [searchText, setSearchText] = useState('')
    const [pageCount, setPageCount] = useState(1);
    const [customers, setCustomers] = useState<CustomerInterface[]>([])
    const page = useRef(DEFAULT_PAGE_NUMBER)
    const pageSize = useRef(DEFAULT_PAGE_SIZE)
    const sexFilter = useRef<SexFilterInterface>(DEFAULT_SEX_FILTER_OPTIONS);
    const sortFilter = useRef<string>('id:asc');
    const {
        isLoading,
        isError,
        refetch
    } = useQuery(queryKeys.customers, () => getCustomers(queryString).then(r => r.json()), {
        onSuccess:
            (data) => {
                setCustomers(data.customers.data);
                setPageCount(data.customers.meta.pagination.pageCount);
            }
    });
    const setSortFilter = (sort: string) => {
        sortFilter.current = sort;
    }
    const setPage = (num: number) => {
        page.current = num;
    }
    const setPageSize = (num: number) => {
        pageSize.current = num;
    }

    const setSexFilter = (newFilter: SexFilterInterface) => {
        sexFilter.current = newFilter;
    }

    useEffect(() => {
        (async function () {
            await refetch()
        })()
    }, [])

    useEffect(() => {
        (async function () {
            await refetch()
        })()
    }, [queryString])

    const handlePage = async (e: { target: { value: string; }; }) => {
        const newPage = parseInt(e.target.value);
        if (newPage < 1 || newPage > pageCount) {
            return;
        }
        new Promise<void>(resolve => {
            setPage(newPage);
            resolve();
        }).then(() => {
            handleQuery()
        })
    }


    const handleQuery = async () => {
        let newQueryString = '';
        new Promise<void>((resolve) => {
            let sexEq = Object.keys(sexFilter.current).filter((key) => sexFilter.current[key] === true);
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
                    deleted_at: {
                        $null: true,
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
                sort: [sortFilter.current],
                pagination: {page: page.current, pageSize: pageSize.current},
            };
            debugConsole('newQueryString - page', newQuery.pagination.page)
            newQueryString = qs.stringify(newQuery, {
                encodeValuesOnly: true,
            })
            resolve();
        }).then(_ => {
            setQueryString(newQueryString);
        })
    }
    const handleSort = async (e: any) => {
        setSortFilter(e.target.value)
        await handleQuery();
    }


    const handleSexFilter = async (e: any) => {
        const filterName = e.target.id;
        const checked = e.target.checked;
        const newSexFilter = {
            ...sexFilter.current,
            [filterName]: checked
        }
        new Promise<void>((resolve) => {
            setSexFilter(newSexFilter);
            resolve();
        }).then(() => {
            handleQuery()
        })
    }

    const resetFilter = async () => {
        new Promise<void>(resolve => {
            setPageSize(DEFAULT_PAGE_SIZE);
            setSortFilter('id:asc')
            setSearchText('');
            setSexFilter(DEFAULT_SEX_FILTER_OPTIONS)
            setQueryString(DEFAULT_QUERY_STRING);
            resolve();
        }).then(() => {
            handleQuery()
        })
    }
    const handleSearch = async () => {
        setPage(1);
        await handleQuery();
    }
    const changeSearchText = (e: any) => {
        setSearchText(e.target.value);
    }

    const changePageSize = async (e: any) => {
        const newPageSize = e.target.value;
        const changePagePromise = new Promise<void>((resolve) => {
            setPage(1);
            setPageSize(newPageSize);
            resolve();
        })
        changePagePromise.then(() => {
            handleQuery();
        })
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

    const tableHeaderList = [
        'ID',
        'Name',
        'Age',
        'Gender',
        'Mail',
        'Address',
        'Tel',
        'Pets'
    ]

    const customerList = customers?.map((customer: CustomerInterface) => (
        <TableRow key={customer.id}>
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
        </TableRow>
    ))


    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            <SectionLabel label={'Filters'}/>
            <div className='flex'>
                <select onChange={handleSort} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    {SORT_LIST.map(([value, label]) => (
                        <option key={value} selected={sortFilter.current === value} value={value}>{label}</option>
                    ))}
                </select>
                <input
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black'
                    placeholder='Search' type='text' value={searchText} onChange={changeSearchText}/>
            </div>

            <div className='mt-4'>
                <div className='flex text-black text-xs'>

                    <CheckBox name={'male'} label={'男性'} checked={sexFilter.current.male} onChange={handleSexFilter}/>
                    <CheckBox name={'female'} label={'女性'} checked={sexFilter.current.female}
                              onChange={handleSexFilter}/>
                    <CheckBox name={'other'} label={'別姓'} checked={sexFilter.current.other} onChange={handleSexFilter}/>

                    <select onChange={changePageSize} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                        {PAGE_SIZE_LIST.map((value) => (
                            <option key={value} selected={pageSize.current === value} value={value}>{value}個</option>
                        ))}
                    </select>

                    <div className='mr-4'>
                        <Button title={'検索'} onClick={handleSearch}/>
                    </div>
                    <div className=' mr-4'>
                        <Button title={'RESET'} onClick={resetFilter}/>
                    </div>

                </div>
            </div>
            <SectionLabel label={'Board'}/>
            <div className='p-4 bg-mono-100 rounded w-full'>
                <Table thList={tableHeaderList}>{customerList}</Table>
            </div>
            <Pagination page={page.current} pageCount={pageCount} handlePage={handlePage}/>
        </Layout>
    )
}


export default CustomersPage