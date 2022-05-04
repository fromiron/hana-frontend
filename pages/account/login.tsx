import type {NextPage} from 'next'
import React from "react";
import LoginForm from "@/components/LoginForm";
import {useRecoilState} from "recoil";
import {loginStateInterface} from "@/interfaces/index";
import {loginState} from "@/store/index";
import {validateEmail, validatePassword} from "@/helpers/validators";
import {useRouter} from "next/router";
import AccountLayout from "@/components/AccountLayout";

const LoginPage: NextPage = () => {
    const [state, setState] = useRecoilState<loginStateInterface>(loginState);
    const router = useRouter();
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, email: e.target.value});
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, password: e.target.value});
    };

    const handleValidate = () => {
        const emailIsValid = validateEmail(state.email);
        const passwordIsValid = validatePassword(state.password);
        setState({...state, emailError: !emailIsValid, passwordError: !passwordIsValid});
    };

    const handleLogin = () => {
        handleValidate();
        router.push('/overview');
    }

    return (
        <AccountLayout>
            <div className='relative w-screen h-screen'>
                <div className="absolute inset-0 bg-black flex justify-center items-center">
                    <LoginForm state={state} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin}/>
                </div>
            </div>
        </AccountLayout>
    )
}


export default LoginPage

