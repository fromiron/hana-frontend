import Input from "@/components/partials/Input";
import {MdAlternateEmail, MdLock} from "react-icons/md";
import React from "react";
import Button from "@/components/partials/Button";
import Link from "next/link";
import Logo from '@/public/logo.svg'
import Image from 'next/image'
import {validateEmail, validatePassword} from "@/helpers/validators";
import {useRecoilState} from "recoil";
import {loginState} from "@/store/index";
import {loginStateInterface} from "@/interfaces/index";

export default function LoginForm() {
    const [state, setState] = useRecoilState<loginStateInterface>(loginState);

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
        console.log(state);
    }
    return (
        <div className='bg-white rounded shadow-2xl p-4 m-4 h-fit max-w-lg w-full md:w-2/4'>
            <div className='flex justify-center mt-2 mb-10'>
                <Image src={Logo} alt="logo"/>
            </div>
            <Input Icon={MdAlternateEmail} type={'email'} name={'email'} value={state.email}
                   isError={state.emailError}
                   placeholder={'rabbitsitter@hana.com'}
                   onChange={handleEmailChange}/>

            <Input Icon={MdLock} type={'password'} name={'password'} value={state.password}
                   isError={state.passwordError}
                   placeholder={'● ● ● ● ● ●'}
                   onChange={handlePasswordChange}/>
            <div className={'my-2 text-right'}>
                <Link href='/account/password'><a className={'transition duration-500 ease-in-out hover:text-primary'}>Reset
                    Password?</a></Link>
            </div>
            <Button title={'LOGIN'} onClick={handleLogin}/>
        </div>

    )
}