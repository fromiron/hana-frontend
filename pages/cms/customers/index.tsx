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
import {TableItem} from "@/components/partials/TableItem";


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


function Pagination({pageCount, page, handlePage}: { pageCount: number, page: number, handlePage: any }) {
    return (
        <div>
            <ul className='flex mt-4 justify-center'>

                <li className={`p-2 ${page > 1 ? 'bg-mono-100 text-black' : 'bg-white text-mono-200'} mr-2 rounded cursor-pointer select-none hover:bg-accent hover:text-white`}
                    onClick={handlePage}
                    value={page - 1}>
                    prev
                </li>

                {Array.from({length: pageCount}, (_, i) => (
                    <li
                        key={i}
                        value={i + 1}
                        className={`p-2 ${page === i + 1 ? 'bg-primary text-white' : 'bg-mono-100 text-black'} mr-2 rounded cursor-pointer select-none hover:bg-accent hover:text-white`}
                        onClick={handlePage}
                    >
                        {i + 1}
                    </li>
                ))}
                <li className={`p-2 ${page < pageCount ? 'bg-mono-100 text-black' : 'bg-white text-mono-200'} mr-2 rounded cursor-pointer select-none hover:bg-accent hover:text-white`}
                    value={page + 1}
                    onClick={handlePage}>
                    next
                </li>
            </ul>
        </div>
    )
}

const CustomersPage: NextPage = () => {
    const [queryString, setQueryString] = useState(DEFAULT_QUERY_STRING)
    const [searchText, setSearchText] = useState('')
    const [pageCount, setPageCount] = useState(1);
    const [customers, setCustomers] = useState<CustomerInterface[]>([])
    const page = useRef(DEFAULT_PAGE_NUMBER)
    const pageSize = useRef(DEFAULT_PAGE_SIZE)
    const sexFilter = useRef<SexFilterInterface>(DEFAULT_SEX_FILTER_OPTIONS);
    const sortFilter= useRef<string>('id:asc');
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
    const setSortFilter = (sort:string)=>{
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
    }, [queryString, refetch])

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
            console.log('newSexFilter', newSexFilter)
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


    const customerList = customers?.map((customer: CustomerInterface) => (
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
                <select onChange={handleSort} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                    <option value={'id:asc'} selected={sortFilter.current === 'id:asc'}>ID昇順</option>
                    <option value={'id:desc'} selected={sortFilter.current === 'id:desc'}>ID降順</option>
                    <option value={'age_group.id:asc'} selected={sortFilter.current === 'age_group.id:asc'}>年齢昇順</option>
                    <option value={'age_group.id:desc'} selected={sortFilter.current === 'age_group.id:desc'}>年齢昇順</option>
                </select>
                <input
                    className='transition duration-500 border-2 border-mono-100 w-full bg-mono-100 focus:outline-none focus:border-primary focus:bg-white rounded p-3 text-black'
                    placeholder='Search' type='text' value={searchText} onChange={changeSearchText}/>
            </div>

            <div className='mt-4'>
                <div className='flex text-black text-xs'>
                    <label htmlFor="male"
                           className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
                        <input id="male" type="checkbox" onChange={handleSexFilter} checked={sexFilter.current.male}
                               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
                        <span className="ml-2 select-none">男性</span>
                    </label>

                    <label htmlFor="female"
                           className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
                        <input id="female" type="checkbox" onChange={handleSexFilter} checked={sexFilter.current.female}
                               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
                        <span className="ml-2 select-none">女性</span>
                    </label>

                    <label htmlFor="other"
                           className="rounded py-2 px-4 mr-4 bg-mono-100 selection:none cursor-pointer flex items-center">
                        <input id="other" type="checkbox" onChange={handleSexFilter} checked={sexFilter.current.other}
                               className="transition duration-500 appearance-none checked:bg-primary border-2 border-mono-200 h-4 w-4 rounded select-none"/>
                        <span className="ml-2 select-none">別姓</span>
                    </label>
                    <select onChange={changePageSize} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4' >
                        <option value={10} selected={pageSize.current===10}>10個</option>
                        <option value={20} selected={pageSize.current===20}>20個</option>
                        <option value={50} selected={pageSize.current===50}>50個</option>
                    </select>

                    <div className='mr-4'>
                        <Button title={'検索'} onClick={handleSearch}/>
                    </div>
                    <div className=' mr-4'>
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
            <Pagination page={page.current} pageCount={pageCount} handlePage={handlePage}/>
        </Layout>
    )
}


export default CustomersPage