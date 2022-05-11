import React from "react";
import {IconType} from "react-icons/lib";
import {IncomingMessage} from "http";
import {NextApiRequestCookies} from "next/dist/server/api-utils";


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
    page: string,
    onClick: React.MouseEventHandler<HTMLLIElement>
}

export interface PagePropsInterface {
    name: string,
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

