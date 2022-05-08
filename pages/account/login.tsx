import type {NextPage} from 'next'
import React from "react";
import LoginForm from "@/components/LoginForm";
import {useRecoilState} from "recoil";
import {loginFormInterface, UserInterface} from "@/interfaces/index";
import {loginFormState, userState} from "@/store/index";
import {validateEmail, validatePassword} from "@/helpers/validators";
import AccountLayout from "@/components/AccountLayout";
import {loginController} from "@/controllers/authController";
import {INVALID_LOGIN_PARAMETERS, UNAUTHORIZED_ACCOUNT} from "@/config/index";
import {useRouter} from "next/router";

const LoginPage: NextPage = () => {
    const [loginFormData, setLoginFormData] = useRecoilState<loginFormInterface>(loginFormState);
    const [user, setUser] = useRecoilState<UserInterface>(userState);
    const [isLoading, setIsLoading] = React.useState(false);
    const [message , setMessage] = React.useState<string>('');

    const router = useRouter();
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, email: e.target.value});
        validateEmail(loginFormData.email);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, password: e.target.value});
        validatePassword(loginFormData.password);
    };

    const handleValidate = () => {
        const emailIsValid = validateEmail(loginFormData.email);
        const passwordIsValid = validatePassword(loginFormData.password);
        setLoginFormData({...loginFormData, emailError: !emailIsValid, passwordError: !passwordIsValid});
    };

    const handleLogin = async () => {
        console.log('[LOGIN PAGE] handleLogin');
        setIsLoading(true);
        setMessage('');
        handleValidate();
        if (!loginFormData.emailError && !loginFormData.passwordError) {
            console.log('[LOGIN PAGE] handleLogin - call login api');
            const response = await loginController({
                email: loginFormData.email,
                password: loginFormData.password
            });
            if (response.status === 200) {
                console.log('[LOGIN PAGE] handleLogin - login success');
                const resUser = response?.data.user;
                if(resUser) {
                    setUser(resUser);
                    router.push('/overview');
                    console.log(user)
                }
            }
            if (response.status !== 200) {
                console.log('[LOGIN PAGE] handleLogin - login failed');
                if(response?.response?.status === 400){
                    setMessage(INVALID_LOGIN_PARAMETERS);
                    setLoginFormData({...loginFormData, emailError: true, passwordError: true});
                }
                if(response?.response?.status === 401){
                    setMessage(UNAUTHORIZED_ACCOUNT)
                }
            }
            setIsLoading(false);
        }
    }

    return (
        <AccountLayout>
            <div className='relative w-screen h-screen'>
                <div className="absolute inset-0 bg-black flex justify-center items-center">
                    <LoginForm loginFormData={loginFormData} handleEmailChange={handleEmailChange}
                               handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} message={message}/>
                </div>
            </div>
        </AccountLayout>
    )
}


export default LoginPage

