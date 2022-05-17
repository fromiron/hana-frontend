import type {GetServerSideProps, NextPage} from 'next'
import Layout from "@/components/Layout";
import React, {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {queryKeys} from "../../../react-query/constants";
import {getPets} from "@/services/pets";
import Table from "@/components/Table";
import {TableItem, TableRow} from "@/components/partials/TableParts";
import SectionLabel from "@/components/partials/SectionLabel";
import CheckBox from "@/components/partials/Checkbox";
import Button from "@/components/partials/Button";
import {API_URL} from "@/config/index";
import debugConsole from "@/helpers/debugConsole";
import {PetInterface, PetsPageProps, PetTypeInterface} from "@/interfaces/petInterface";
import ObjectWrapper from "@/components/partials/ObjectWrapper";
import Pagination from "@/components/Pagination";

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_LIST = [
    10, 20, 50
]
const SORT_LIST = [
    ['id:asc', 'ID昇順'],
    ['id:desc', 'ID降順'],
]


const PetsPage: NextPage<PetsPageProps> = ({petTypes}) => {
    const [pageCount, setPageCount] = useState(1);
    const [pets, setPets] = useState<PetInterface[]>([]);
    const sortFilter = useRef<string>('id:asc');
    const pageSize = useRef(DEFAULT_PAGE_SIZE)

    const [searchText, setSearchText] = useState('')
    debugConsole('petsType', petTypes)
    const {
        isLoading,
        isError,
        refetch
    } = useQuery(queryKeys.pets, () => getPets('populate=*').then(r => r.json()), {
        onSuccess: (res) => {
            setPets(res.data);
            setPageCount(res.meta.pagination.pageCount);
        },
    });

    useEffect(() => {
        (async () => {
            await refetch();
        })()
    }, []);

    if (isLoading) return <p>Loading...</p>;

    const handleSort = async (e: any) => {
        sortFilter.current = e.target.value;
    }
    const changeSearchText = (e: any) => {
        setSearchText(e.target.value);
    }

    const petList = pets.map((pet: PetInterface) => (
        <TableRow key={pet.id}>
            <TableItem>{pet.id}</TableItem>
            <TableItem>avatar</TableItem>
            <TableItem>{pet.attributes.name}</TableItem>
            <TableItem>{pet.attributes.birth}</TableItem>
            <TableItem>age</TableItem>
            <TableItem>
                icon
                {/*<IconContainer key={pet.id}>*/}
                {/*    <Image alt='pet_icon'*/}
                {/*           src={BACK_END_DEFAULT_URL + pet.attributes?.type?.data?.attributes.icon.data.attributes.url}*/}
                {/*           width={20}*/}
                {/*           height={20}/>*/}
                {/*</IconContainer>*/}
            </TableItem>
            <TableItem>{pet.attributes?.customer?.data?.attributes?.kanji}</TableItem>

        </TableRow>
    ))

    return (
        <Layout title={'Pets - Rabbit Sitter Hana'} pageTitle={'Pets'}>

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
                    {petTypes.map((type: PetTypeInterface) => (
                        <CheckBox key={type.id} name={type.attributes.type} label={type.attributes.type}
                                  checked={true} onChange={() => {
                        }}/>
                    ))}
                    <CheckBox name={'alive'} label={'生き'} checked={true} onChange={() => {
                    }}/>
                    <select onChange={() => {
                    }} className='w-fit p-2 rounded-lg bg-mono-100
                   transition duration-500 border-2 border-mono-100 w-fit bg-mono-100 focus:outline-none
                    focus:border-primary focus:bg-white rounded p-3 text-black mr-4'>
                        {PAGE_SIZE_LIST.map((value) => (
                            <option key={value} selected={pageSize.current === value} value={value}>{value}個</option>
                        ))}
                    </select>

                    <div className='mr-4'>
                        <Button title={'検索'} onClick={() => {
                        }}/>
                    </div>
                    <div className=' mr-4'>
                        <Button title={'RESET'} onClick={() => {
                        }}/>
                    </div>
                </div>
            </div>


            <SectionLabel label={'Board'}/>
            <Table thList={['ID', 'Avatar', 'Name', 'Birth', 'Age', 'Type', 'Partner']}>
                {petList}
            </Table>
            <Pagination pageCount={1} page={1} handlePage={()=>{}}/>
        </Layout>
    )
}


export default PetsPage


export const getServerSideProps: GetServerSideProps = async (context) => {

    const getPetTypes = await fetch(`${API_URL}/pet-types?populate=*`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.req.cookies.token}`
        }
    });
    const data = await getPetTypes.json();
    const props: PetsPageProps = {
        petTypes: data.data
    }
    return {
        props
    }
}