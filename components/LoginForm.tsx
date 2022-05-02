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

    const handleValidate = async () => {
        if (validateEmail(state.email)) {
            setState({...state, emailError: false});
        } else {
            setState({...state, emailError: true});
        }
        if (validatePassword(state.password)) {
            setState({...state, passwordError: false});
        } else {
            setState({...state, passwordError: true});
        }
    };


    const handleLogin = async () => {
        await handleValidate();
        console.log(state);
    }
    return (
        <div className='bg-white rounded shadow-2xl p-4 m-4 h-fit max-w-lg w-full md:w-2/4'>
            <div className='flex justify-center mt-2 mb-10'>
                <Image src={Logo} alt="logo"/>
            </div>

            <div className='mb-3 text-right'>
                <Input Icon={MdAlternateEmail} type={'email'} name={'email'} value={state.email}
                       isError={state.emailError}
                       placeholder={'rabbitsitter@hana.com'}
                       onChange={handleEmailChange}/>
                <span className='text-xs text-mono-200'>メールを入力してください。</span>
            </div>

            <div className='mb-3 text-right'>
                <Input Icon={MdLock} type={'password'} name={'password'} value={state.password}
                       isError={state.passwordError}
                       placeholder={'● ● ● ● ● ●'}
                       onChange={handlePasswordChange}/>
                <span className='text-xs text-mono-200'>小文字・大文字・数字を含む7文字以上のパスワードが必要です。</span>
            </div>
            <div className={'my-2 text-right'}>
                <Link href='/account/password'><a className={'transition duration-500 ease-in-out hover:text-primary'}>Reset Password?</a></Link>
            </div>
            <Button title={'LOGIN'} onClick={handleLogin}/>
        </div>

    )
}