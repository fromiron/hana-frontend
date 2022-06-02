import {MdClose} from "react-icons/md";
import React from "react";
import useModal from "@/hooks/useModal";

export default function ModalCloseBtn({confirm}: { confirm: boolean }) {
    const {modalClose} = useModal();
    const handleClose = async () => {
        if (confirm) {
            if (window.confirm('close?')) {
                await modalClose();
            }
        } else {
            await modalClose();
        }
    }
    return <div
        className='cursor-pointer transition duration-500 text-primary rounded hover:text-white hover:bg-primary'>
        <MdClose size={24} onClick={handleClose}/>
    </div>
}