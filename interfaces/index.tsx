import React from "react";
import {IconType} from "react-icons/lib";

export interface LayoutInterface {
    title: string,
    keywords: string,
    description: string,
    children: any
}

export interface InputInterface {
    Icon: IconType,
    name: string,
    value: string,
    placeholder: string,
    type: string,
    isError: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ButtonInterface {
    title: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface loginStateInterface {
    email: string,
    emailError: boolean,
    password: string,
    passwordError: boolean
}