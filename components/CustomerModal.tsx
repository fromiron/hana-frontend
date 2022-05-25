import {MdClose} from "react-icons/md";
import SmallButton from "@/components/partials/SmallButton";
import {queryClient} from "../react-query/queryClient";
import {CustomerInterface} from "@/interfaces/customerInterface";
import {queryKeys} from "../react-query/constants";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {DEBUG_CONSOLE_ON} from "@/config/index";

interface CustomerModalInterface {
    isOpen: boolean,
    onClick: MouseEventHandler<SVGElement> | undefined,
    customerId: number | null,
}

function CustomerForm({defaultValue}: { defaultValue: CustomerInterface | undefined }) {
    const customerId = defaultValue?.id;
    const data = defaultValue?.attributes;
    const {register, handleSubmit, control, setValue} = useForm({defaultValues:data});
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [selectedSexId, setSelectedSexId] = useState<number>(data?.sex?.data?.id??3);

    const onSubmit = (data: any) => console.log(data);
    const handleOnChange = () => {

    };
    useEffect(()=>{
        setValue('sex.data.id', selectedSexId);
    },[])

    const handleSexFormState=(sexId:number)=>{
        setSelectedSexId(sexId);
        setValue('sex.data.id', sexId);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} onChange={handleOnChange}>
            <div className='flex flex-col text-black'>
                <div className='flex w-full'>
                    <div className='flex flex-col mb-4 mr-4 flex-1'>
                        <label htmlFor='kanji' className='text-sm mb-1'>漢字</label>
                        <input {...register("kanji")}
                               className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                               defaultValue={data?.kanji} disabled={isDisable}/>
                    </div>
                    <div className='flex flex-col mb-4 flex-1'>
                        <label htmlFor='kana' className='text-sm mb-1'>かな</label>
                        <input {...register("kana")}
                               className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                               defaultValue={data?.kana} disabled={isDisable}/>
                    </div>
                </div>


                <div className='flex flex-col mb-4'>
                    <label htmlFor='sex' className='text-sm mb-1'>性別</label>
                    <div className='grid grid-cols-3 gap-10 px-10 py-4 bg-mono-100 rounded'>
                        <SmallButton onClick={() => handleSexFormState(1)} title={'男性'} disabled={isDisable}
                                     bgColor={selectedSexId !== 1 ? 'bg-mono-200' : undefined}/>
                        <SmallButton onClick={() => handleSexFormState(2)} title={'女性'} disabled={isDisable}
                                     bgColor={selectedSexId !== 2 ? 'bg-mono-200' : undefined}/>
                        <SmallButton onClick={() => handleSexFormState(3)} title={'別姓'} disabled={isDisable}
                                     bgColor={selectedSexId !== 3 ? 'bg-mono-200' : undefined}/>
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className='flex flex-col mb-4 mr-4 flex-1'>
                        <label htmlFor='phone' className='text-sm mb-1'>連絡先</label>
                        <input {...register("phone")}
                               className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                               defaultValue={data?.phone} disabled={isDisable}/>
                    </div>
                    <div className='flex flex-col mb-4 flex-1'>
                        <label htmlFor='email' className='text-sm mb-1'>メール</label>
                        <input {...register("email")}
                               className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                               defaultValue={data?.email} disabled={isDisable}/>
                    </div>
                </div>
                <div className='flex w-full'>
                    <div className='flex flex-col mb-4 mr-4'>
                        <label htmlFor='zipcode' className='text-sm mb-1'>ZIP</label>
                        <input {...register("zipcode")}
                               className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                               defaultValue={data?.zipcode} disabled={isDisable}/>
                    </div>
                    <div className='flex flex-col mb-4 w-full'>
                        <label htmlFor='address' className='text-sm mb-1'>住所</label>
                        <input {...register("address")}
                               className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                               defaultValue={data?.address} disabled={isDisable}/>
                    </div>
                </div>
                <label htmlFor='note' className='text-sm mb-1'>NOTE</label>
                <textarea {...register("note")}
                          className={`outline-none p-2 rounded border border-solid ${isDisable ? 'border-mono-100' : 'bg-white'} border-mono-100 border-4 bg-mono-100 transition duration-500 focus:border-primary`}
                          defaultValue={data?.note} disabled={isDisable}/>
            </div>

            <div
                className="flex flex-row items-center justify-between mt-6 pt-6 bg-white border-t border-mono-100 rounded-bl-lg rounded-br-lg">

                <div className='w-24'>
                    <SmallButton title={'修正'} onClick={() => setIsDisable(!isDisable)}/>
                </div>
                <div>
                    <SmallButton title={'アップデート'} bgColor={isDisable?'bg-mono-200':'bg-accent'}  disabled={isDisable} type={'submit'}/>
                </div>

            </div>

            {DEBUG_CONSOLE_ON && <DevTool control={control}/>}

        </form>
    );
}

export default function CustomerModal({isOpen, onClick, customerId}: CustomerModalInterface) {

    if (!customerId) {
        return <></>
    }
    const customer = queryClient.getQueryData<CustomerInterface>([queryKeys.customers, customerId]);
    const data = customer?.attributes;
    return (
        <div
            className={`${isOpen ? 'block' : 'hidden'} absolute z-50 top-0 right-0 bottom-0 left-0  backdrop-blur-sm overflow-auto`}>
            <div className="flex justify-center h-screen items-center bg-gray-200 antialiased">
                <div
                    className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded shadow-xl">
                    <div
                        className="flex flex-row justify-between items-center p-4 bg-primary rounded-tl-lg rounded-tr-lg bg-[url('/bar_bg.png')] bg-no-repeat bg-right">
                        <p className="font-semibold text-white">{data?.kanji ? data?.kanji : data?.kana} 様</p>
                        <div
                            className='cursor-pointer transition duration-500 text-primary rounded hover:text-white hover:bg-primary'>
                            <MdClose size={23} onClick={onClick}/>
                        </div>
                    </div>
                    <div className={'h-auto bg-white p-8'}>
                        <CustomerForm defaultValue={customer}/>
                    </div>

                </div>
            </div>

        </div>
    )
}