import {MdFemale, MdMale} from "react-icons/md";
import {FaGenderless} from "react-icons/fa";
import React from "react";

export const IconContainer = ({children}: any) => <div
    className='text-xs rounded items-center h-8 flex justify-center bg-mono-100 aspect-square'>{children}</div>;
export const SexIcon = (sex: string) => {
    if (sex === 'male') {
        return <IconContainer><MdMale color={'#345eeb'}/></IconContainer>
    }
    if (sex === 'female') {
        return <IconContainer><MdFemale color={'#fc0373'}/></IconContainer>
    }
    return <IconContainer><FaGenderless color={'#b134eb'}/></IconContainer>
}