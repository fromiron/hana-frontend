import Layout from "@/components/Layout";
import React from "react";
import {NextPage} from "next";
import PetTypeChart from "@/components/PetTypeChart";
import CustomerChart from "@/components/CustomerChart";
import Counter from "@/components/Counter";
import {COLORS} from "@/config/colors";


const OverviewPage: NextPage = () => {

    return (
        <Layout title={'Overview - Rabbit Sitter Hana'} pageTitle={'Overview'}>
            <div className='grid overflow-hidden grid-cols-2 md:grid-cols-2 sm:grid-cols-1 auto-rows-auto gap-4'>
                <PetTypeChart/>
                <CustomerChart/>
            </div>
            <div className='grid overflow-hidden grid-cols-4 md:grid-cols-4 sm:grid-cols-1 auto-rows-auto gap-4'>
                <Counter label={'Pet - Birth'} num={1} bgColor={COLORS.ACCENT} textColor={COLORS.WHITE}/>
                <Counter label={'Pet - Dead'} num={5} bgColor={COLORS.BLACK} textColor={COLORS.WHITE}/>
                <Counter label={'Customer - Total'} num={15} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Karte - Toal'} num={30} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Reservation - Last Month'} num={5} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Reservation - Total'} num={52} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Cancel - Last Month'} num={41} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
                <Counter label={'Cancel - Total'} num={20} bgColor={COLORS.PRIMARY} textColor={COLORS.WHITE}/>
            </div>
        </Layout>
    )
}


export default OverviewPage
