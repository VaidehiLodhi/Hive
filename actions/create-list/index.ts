"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-log-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async(data : InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            errors : "Unauthorized"
        }
    }

    const {title, boardId} = data;
    let list;

    try {
        //fetching the board where list is to be created
        const board = await db.board.findUnique({
            where : {
                id : boardId,
                orgId
            }
        })

        if(!board) {
            return {
                errors : "Board Not Found"
            }
        }

        //fetching last list of the board so we can assign order to our new list 
        const lastList = await db.list.findFirst({
            where : {
                boardId : boardId
            },
            orderBy : {
                order : "desc"
            },
            select : {
                order : true
            }
        })

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data : {
                title, 
                boardId,
                order: newOrder
            }
        })

        await createAuditLog ({
        entityTitle : list.title,
        entityId : list.id,
        entityType : ENTITY_TYPE.LIST,
        action : ACTION.CREATE
       })
    } catch (error) {
        error : "Failed to create."
    }

    revalidatePath(`/board/${boardId}`);
    return { data : list}
}

export const createList = createSafeAction(CreateList, handler);