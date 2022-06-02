import React from "react";
import {IconType} from "react-icons/lib";


export interface AccountInterface {
    title: string,
    keywords: string,
    description: string,
    children: any,
}

export interface LayoutInterface extends AccountInterface {
    pageTitle: string,
}

export interface InputInterface {
    Icon?: IconType,
    prefix?:string,
    name: string,
    value?: string,
    placeholder: string,
    type: string,
    isError: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ButtonInterface {
    title?: string,
    Icon?: IconType,
    type?:"button" | "submit" | "reset" | undefined,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | void,
    bgColor?: string,
    disabled?:boolean
}

export interface loginApiPropsInterface {
    email: string,
    password: string,
}

export interface loginFormInterface extends loginApiPropsInterface {
    emailError: boolean,
    passwordError: boolean,
}

export interface loginPropsInterface {
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    loginFormData: loginFormInterface,
}

export interface IconMenuInterface {
    Icon: IconType,
    title: string,
    page: string | null,
    onClick: React.MouseEventHandler<HTMLLIElement>
}


export interface UserInterface {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UseUserInterface {
    user: UserInterface | null | undefined | void;
    updateUser: (user: UserInterface) => void;
    clearUser: () => void;
    getUser: () => void;
}

export interface ChartDataInterface {
    id: string,
    value: number,
}