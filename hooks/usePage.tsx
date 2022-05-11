import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRecoilState} from "recoil";
import {PagePropsInterface} from "@/interfaces/index";
import {pageState} from "@/store/index";
import {useRouter} from "next/router";

export default function usePage() {
    const [page, setPage] = useRecoilState<PagePropsInterface>(pageState);
    const router = useRouter();

    function setCurrentPage(name: PagePropsInterface): void {
        setPage(name)
        console.log(router.pathname)
    }

    return {setCurrentPage};
}