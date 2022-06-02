import '@/styles/global.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from 'recoil';
import {QueryClientProvider, Hydrate} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import {queryClient} from "../react-query/queryClient";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider
            client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </Hydrate>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}

export default MyApp
