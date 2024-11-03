"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-log-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";



const handler = async(data : InputType) : Promise<ReturnType> => {
    console.log("Handler function called");
    const { userId , orgId} = auth();

    if(!userId || !orgId){
        return {
            errors : "unauthorized",
        }
    }
    
    const {title, images} = data;

    const [
        imagesId,
        imagesThumbUrl,
        imagesFullUrl,
        imagesUserName,
        imagesLinksHTML
    ] = images.split("|")

    console.log({
        imagesId,
        imagesThumbUrl,
        imagesFullUrl,
        imagesUserName,
        imagesLinksHTML
    });

    if(!imagesId || !imagesThumbUrl || !imagesFullUrl || !imagesLinksHTML || !imagesUserName) {
        return {
            errors : "Missing fields. Failed to create board."
        }
    }

    let board;

    try {
        board = await db.board.create({
            data  : {
                orgId,
                title,
                imagesId,
                imagesThumbUrl,
                imagesFullUrl,
                imagesUserName,
                imagesLinksHTML
            }
        })

        await createAuditLog ({
        entityTitle : board.title,
        entityId : board.id,
        entityType : ENTITY_TYPE.BOARD,
        action : ACTION.CREATE
       })

    } catch (error) {
        return {
            errors : "failed to create",
        }
    }

    revalidatePath(`/board/${board.id}`);
    return {data  : board};
}

export const createBoard = createSafeAction(CreateBoard, handler)