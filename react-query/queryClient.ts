import {QueryClient} from 'react-query';
import {toast} from "react-toastify";


function queryErrorHandler(error: unknown): void {
    // error is type unknown because in js, anything can be an error (e.g. throw(5))
    const id = 'react-controller-error';
    const title =
        error instanceof Error
            ? // remove the initial 'Error: ' that accompanies many errors
            error.toString().replace(/^Error:\s*/, '')
            : 'error connecting to server';

    toast.error(title, {position: toast.POSITION.BOTTOM_RIGHT, toastId: id});
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: queryErrorHandler,
            staleTime: 1000 * 60, //1分
            cacheTime: 1000 * 60 * 60, //キャッシュ保存時間1時間
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    },
});