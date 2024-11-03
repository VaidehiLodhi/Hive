"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-modals";

export const ModalProvider =()=> {

    //preventing hydration errors because use effect only runs on client 
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=> {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }

    return(
        <>
            <CardModal/>
        </>
    )
}