import ReactModal from "react-modal";
import React, { useEffect, useState} from 'react'
import {useRecoilState} from "recoil";
import {modalState} from "@/store/index";


export default function ModalProvider() {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [renderComponent, setRenderComponent] = useState<JSX.Element>();

    useEffect(()=>{},[renderComponent])


    const modalOpen = async (children: JSX.Element) => {
        setRenderComponent(children);
        console.log(typeof children);
        await setIsOpen(true);
    }
    const modalClose = () => {
        setRenderComponent(<React.Fragment></React.Fragment>)
        setIsOpen(false)
    };


    const ModalContainer = () => {
        return <ReactModal isOpen={isOpen}>
            <button onClick={modalClose} className='bg-mono-200 text-white p-3 m-3'>close</button>
            {renderComponent}
        </ReactModal>
    }

    return {isOpen, modalOpen, modalClose, ModalContainer}
}


