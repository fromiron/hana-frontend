import type {NextPage} from 'next'
import Layout from "@/components/Layout";
import Link from 'next/link';

const HomePage: NextPage = () => {
    return (
        <Layout>
            <Link href='/account/login'>
                <a>login page</a>
            </Link>
        </Layout>
    )
}

export default HomePage
