import type {NextPage} from 'next'
import Link from 'next/link';
import AccountLayout from "@/components/AccountLayout";

const HomePage: NextPage = () => {
    return (
        <AccountLayout>
            <Link href='/cms/account/login'>
                <a>login page</a>
            </Link>
        </AccountLayout>
    )
}

export default HomePage
