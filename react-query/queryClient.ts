import {QueryClient} from 'react-query';
import {toast} from "react-toastify";


function queryErrorHandler(error: unknown): void {
    // error is type unknown because in js, anything can be an error (e.g. throw(5))
    const id = 'react-query-error';
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
            staleTime: 1,
            cacheTime: 2,
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
        },
    },
});