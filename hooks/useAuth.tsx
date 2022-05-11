import {UserInterface, UseUserInterface} from "@/interfaces/index";
import {NEXT_API_URL} from "@/config/index";
import {useQuery, useQueryClient} from "react-query";
import {queryKeys} from "../react-query/constants";
import useToast from "@/hooks/useToast";
import {useRouter} from "next/router";
import {getStorageUser, removeStorageUser, setStorageUser} from "../react-query/userStorage";


export function useUser(): UseUserInterface {
    const queryClient = useQueryClient();
    const {data: user} = useQuery(queryKeys.user, () => getUser(),{
        initialData: getStorageUser,
        onSuccess:(received: UserInterface|null) => {
            if(!received) {
                removeStorageUser();
            }else{
                setStorageUser(received);
            }
        }
    });
    const {successMsg, errorMsg} = useToast();
    const router = useRouter();

    async function updateUser(newUser: UserInterface): Promise<void> {
        queryClient.setQueriesData(queryKeys.user, newUser);
        await successMsg("Logged in successfully");
        await router.push('/cms/overview');
    }

    async function clearUser() {
        queryClient.setQueriesData(queryKeys.user, null);
        await router.push('/');
    }

    async function getUser() {
        const response = await fetch(`${NEXT_API_URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return null;
        }
        if (response.ok) {
            if (!data.user) {
                return null;
            }
            return data.user;
        }
    }

    return {user, updateUser, clearUser, getUser};
}

interface UseAuthInterface {
    login: (email: string, password: string) => Promise<void>;
    join: (email: string, password: string) => Promise<void>;
    logout: () => void;
}


export function useAuth(): UseAuthInterface {
    const SERVER_ERROR = 'There was an error contacting the server.';
    const {clearUser, updateUser} = useUser();
    const {successMsg, errorMsg} = useToast();

    async function authServerCall(
        urlEndpoint: string,
        email: string,
        password: string,
    ): Promise<void> {
        try {
            const response = await fetch(NEXT_API_URL+urlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({identifier: email, password})
            });
            const data = await response.json();
            if (!response.ok) {
                if (!data.message) {
                    await errorMsg(SERVER_ERROR);
                    return;
                }
                await errorMsg(data.message);
                return;
            }
            if (response.ok) {
                if (!data.user) {
                    await errorMsg(SERVER_ERROR);
                    return;
                }
                updateUser(data.user);
            }
        } catch (e) {
            await errorMsg(SERVER_ERROR);
            clearUser();
        }

    }


    async function login(email: string, password: string): Promise<void> {
        await authServerCall('/login', email, password);
    }

    async function join(email: string, password: string): Promise<void> {
        await authServerCall('/join', email, password);
    }

    function logout(): void {
        clearUser();
    }

    return {
        login,
        join,
        logout
    };
}