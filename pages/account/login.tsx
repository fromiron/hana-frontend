import type {NextPage} from 'next'
import React, {useState} from "react";
import LoginForm from "@/components/LoginForm";
import {useRecoilState} from "recoil";
import {loginFormInterface, UserInterface} from "@/interfaces/index";
import {loginFormState, userState} from "@/store/index";
import {validateEmail, validatePassword} from "@/helpers/validators";
import AccountLayout from "@/components/AccountLayout";
import {loginController} from "@/controllers/authController";
import {INVALID_LOGIN_PARAMETERS, UNAUTHORIZED_ACCOUNT} from "@/config/index";
import {useRouter} from "next/router";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPage: NextPage = () => {
    const [loginFormData, setLoginFormData] = useState<loginFormInterface>({
        email: "",
        password: "",
        passwordError: false,
        emailError: false
    });
    const [user, setUser] = useRecoilState<UserInterface>(userState);
    const [isLoading, setIsLoading] = React.useState(false);

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
        handleValidate();
        if (!loginFormData.emailError && !loginFormData.passwordError) {
            console.log('[LOGIN PAGE] handleLogin - call login api');
            const response = await loginController({
                email: loginFormData.email,
                password: loginFormData.password
            });
            console.log(response)
            const data = await response.json();
            if (!response.ok) {
                setIsLoading(false);
                setLoginFormData({...loginFormData, emailError: true, passwordError: true});
                toast.error(data.message.toString(), {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            if (response.ok) {
                await setUser(data.user);
                await setLoginFormData({...loginFormData, emailError: false, passwordError: false});
                await setIsLoading(false);
                await toast.success(`${data.user.username}様、ログイン成功しました。`, {
                    position: toast.POSITION.TOP_CENTER
                })
                await router.push('/overview');
            }
        }
    }
    return (
        <AccountLayout>
            <ToastContainer/>
            <div className='relative w-screen h-screen'>
                <div className="absolute inset-0 bg-black flex justify-center items-center">
                    <LoginForm loginFormData={loginFormData} handleEmailChange={handleEmailChange}
                               handlePasswordChange={handlePasswordChange} handleLogin={handleLogin}/>
                </div>
            </div>
        </AccountLayout>
    )

}

export default LoginPage;

