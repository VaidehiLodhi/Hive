"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList} from "./schema";
import { createAuditLog } from "@/lib/create-log-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async(data : InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            errors : "Unauthorized"
        }
    }

    const {title, id, boardId} = data;
    let list;

    try {
        list = await db.list.update({
            where : {
                id,
                boardId,
                board : {
                    orgId
                }
            },
            data : {
                title,
            }
        })

        await createAuditLog ({
        entityTitle : list.title,
        entityId : list.id,
        entityType : ENTITY_TYPE.LIST,
        action : ACTION.UPDATE
       })

    } catch (error) {
        error : "Failed to update."
    }

    revalidatePath(`/board/${boardId}`);
    return { data : list}
}

export const updateList = createSafeAction(UpdateList, handler);