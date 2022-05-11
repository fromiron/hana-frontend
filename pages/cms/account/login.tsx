import type {NextPage} from 'next'
import React, {useState} from "react";
import LoginForm from "@/components/LoginForm";
import {loginFormInterface} from "@/interfaces/index";
import {validateEmail, validatePassword} from "@/helpers/validators";
import AccountLayout from "@/components/AccountLayout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAuth} from "@/hooks/useAuth";


const LoginPage: NextPage = () => {
    const [loginFormData, setLoginFormData] = useState<loginFormInterface>({
        email: "",
        password: "",
        passwordError: false,
        emailError: false
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const {login} = useAuth();

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
        await handleValidate();
        if (!loginFormData.emailError && !loginFormData.passwordError) {
            await login(loginFormData.email, loginFormData.password)
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

