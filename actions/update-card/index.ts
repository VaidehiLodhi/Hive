"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
import { createAuditLog } from "@/lib/create-log-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async(data : InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            errors : "Unauthorized"
        }
    }

    const {id, boardId, ...values} = data;
    let card;

    try {
        card = await db.card.update({
            where : {
                id,
                list : {
                    board : {
                        orgId
                    }
                },
            },
            data : {
                ...values,
            }
        })

        await createAuditLog ({
        entityTitle : card.title,
        entityId : card.id,
        entityType : ENTITY_TYPE.CARD,
        action : ACTION.UPDATE
       })

    } catch (error) {
        error : "Failed to update."
    }

    revalidatePath(`/board/${boardId}`);
    return { data : card}
}

export const updateCard = createSafeAction(UpdateCard, handler);