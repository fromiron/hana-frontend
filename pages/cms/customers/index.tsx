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
import {CustomerInterface, SexFilterInterface} from "@/interfaces/customerInterface";
import {IconContainer, SexIcon} from "@/components/partials/Icon";
import {TableItem, TableRow} from "@/components/partials/TableParts";
import Pagination from "@/components/Pagination";
import SectionLabel from "@/components/partials/SectionLabel";
import CheckBox from "@/components/partials/Checkbox";
import Table from "@/components/Table";
import {PetInterface} from "@/interfaces/petInterface";
import SmallButton from "@/components/partials/SmallButton";
import {CgDetailsMore} from "react-icons/cg";
import {queryClient} from "../../../react-query/queryClient";
import {
    CUSTOMER_DEFAULT_PAGE_NUMBER,
    CUSTOMER_DEFAULT_PAGE_SIZE,
    CUSTOMER_DEFAULT_QUERY,
    CUSTOMER_DEFAULT_QUERY_STRING, CUSTOMER_DEFAULT_SEX_FILTER_OPTIONS,
    CUSTOMER_PAGE_SIZE_LIST,
    CUSTOMER_SORT_LIST,
} from "./query_config";
import UseModal from "@/hooks/useModal";
import CustomerModal from "@/components/CustomerModal";
import dateConvertor from "@/helpers/dateConvertor";


const CustomersPage: NextPage = () => {
    const [queryString, setQueryString] = useState(CUSTOMER_DEFAULT_QUERY_STRING)
    const [searchText, setSearchText] = useState('')
    const [pageCount, setPageCount] = useState(1);
    const [customers, setCustomers] = useState<CustomerInterface[]>([])
    const page = useRef(CUSTOMER_DEFAULT_PAGE_NUMBER)
    const pageSize = useRef(CUSTOMER_DEFAULT_PAGE_SIZE)
    const sexFilter = useRef<SexFilterInterface>(CUSTOMER_DEFAULT_SEX_FILTER_OPTIONS);
    const sortFilter = useRef<string>('id:asc');
    const {modalOpen, ModalContainer} = UseModal();


    const todoKeys = {
        all: ['todos'] as const,
        lists: () => [...todoKeys.all, 'list'] as const,
        list: (filters: string) => [...todoKeys.lists(), {filters}] as const,
        details: () => [...todoKeys.all, 'detail'] as const,
        detail: (id: number) => [...todoKeys.details(), id] as const,
    }

    const {
        isLoading,
        isError,
        refetch
    } = useQuery([queryKeys.customers, 'list'], () => getCustomers(queryString).then(r => r.json()), {
        onSuccess:
            (res) => {
                if (res.data) {
                    setCustomers(res.data);
                    queryClient.setQueryData([queryKeys.customers, 'list'], res.data)
                    res.data.map((previous: { id: unknown | string; }) => queryClient.setQueryData([queryKeys.customers, previous.id], previous));
                    setPageCount(res.meta.pagination.pageCount);
                }
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
                ...CUSTOMER_DEFAULT_QUERY,
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
            setPageSize(CUSTOMER_DEFAULT_PAGE_SIZE);
            setSortFilter('id:asc')
            setSearchText('');
            setSexFilter(CUSTOMER_DEFAULT_SEX_FILTER_OPTIONS)
            setQueryString(CUSTOMER_DEFAULT_QUERY_STRING);
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
        'Pets',
        'View',
        'Updated'
    ]

    const handleModalOpen = async (customerId: number) => {

        await modalOpen(
            <CustomerModal customerId={customerId}/>
        )

    }

    const customerList = customers?.map((customer: CustomerInterface) => (
        <TableRow key={customer.id}>
            <TableItem>{customer.id}</TableItem>
            <TableItem>{`${customer.attributes?.kanji}(${customer.attributes?.kana})`}</TableItem>
            <TableItem>{customer.attributes?.age_group?.data?.attributes?.group}</TableItem>
            <TableItem
                className='flex justify-center'>{SexIcon(customer.attributes?.sex?.data?.attributes?.sex)}</TableItem>
            <TableItem>{customer.attributes?.email}</TableItem>
            <TableItem>{customer.attributes?.address}</TableItem>
            <TableItem>{customer.attributes?.phone}</TableItem>
            <TableItem className='flex justify-center'>
                <div className='inline-grid grid-flow-col gap-1 auto-cols-max'>{customer.attributes?.pets?.data.map(
                    (pet: PetInterface) => {
                        return <div key={pet.id} className='group'>
                            <div className='relative group-hover:block'>
                                <IconContainer>
                                    <Image alt='pet_icon'
                                           src={BACK_END_DEFAULT_URL + pet.attributes?.type?.data?.attributes.icon.data.attributes.url}
                                           width={20}
                                           height={20}/>
                                </IconContainer>
                                <div className="absolute mx-2 hidden bottom-10 -left-2 group-hover:block">
                                    <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full min-w-max">
                                        {pet.attributes.name}
                                        <svg className="absolute text-black h-2 left-0 ml-3 top-full" x="0px" y="0px"
                                             viewBox="0 0 255 255" xmlSpace="preserve">
                                            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                )}</div>
            </TableItem>
            <TableItem>
                <SmallButton Icon={CgDetailsMore} onClick={() => handleModalOpen(customer.id)}/>
            </TableItem>
            <TableItem>{dateConvertor().datetimeToString(customer.attributes?.updatedAt)}</TableItem>
        </TableRow>
    ))

    return (
        <Layout title={'Customers - Rabbit Sitter Hana'} pageTitle={'Customers'}>
            <ModalContainer/>
            <SectionLabel label={'Filters'}/>
            <div className='flex'>
                <select onChange={handleSort} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    {CUSTOMER_SORT_LIST.map(([value, label]) => (
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
                        {CUSTOMER_PAGE_SIZE_LIST.map((value) => (
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
            <Table thList={tableHeaderList}>{customerList}</Table>
            <Pagination page={page.current} pageCount={pageCount} handlePage={handlePage}/>
        </Layout>
    )
}


export default CustomersPage