import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useToast() {
    async function successMsg(message: string) {
        await toast.success(message, {
            position: "top-center",
        });
    }

    async function errorMsg(message: string) {
        await toast.error(message, {
            position: "top-center",
        });
    }

    async function infoMsg(message: string) {
        await toast.info(message, {
            position: "top-center",
        });
    }

    return {ToastContainer, successMsg, errorMsg, infoMsg};
}