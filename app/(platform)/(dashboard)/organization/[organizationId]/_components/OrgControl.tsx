"use client"

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

//organizationId must match the folder name 
export const OrgControl =()=>{
    const params = useParams();
    const {setActive} = useOrganizationList();

    useEffect(()=>{
        if (!setActive) return;
        setActive(
            {organization : params.organizationId as string,}
        )
    },[setActive, params.organizationId]);

    return null;
}