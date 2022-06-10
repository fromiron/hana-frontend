import ReactModal from "react-modal";
import React, { useEffect, useState} from 'react'
import {useRecoilState} from "recoil";
import {modalState} from "@/store/index";


export default function useModal() {
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
        return <ReactModal isOpen={isOpen}
                           style={{
                               overlay: {
                                   position: 'fixed',
                                   top: 0,
                                   left: 0,
                                   right: 0,
                                   bottom: 0,
                                   backgroundColor: 'transparent'
                               },
                               content: {
                                   position: 'absolute',
                                   top: 0,
                                   left: 0,
                                   right: 0,
                                   bottom: 0,
                                   overflow: 'auto',
                                   backgroundColor: 'rgba(0,0,0,0.2)',
                                   WebkitOverflowScrolling: 'touch',
                                   outline: 'none',
                                   paddingTop:100
                               }
                           }}
        >
            {renderComponent}
        </ReactModal>
    }

    return {isOpen, modalOpen, modalClose, ModalContainer}
}


