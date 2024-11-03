"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-log-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async(data : InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            errors : "Unauthorized"
        }
    }

    const {id} = data;
    let board;

    try {
        board = await db.board.delete({
            where : {
                id,
                orgId,
            },
        })

        await createAuditLog ({
        entityTitle : board.title,
        entityId : board.id,
        entityType : ENTITY_TYPE.BOARD,
        action : ACTION.DELETE
       })

    } catch (error) {
        error : "Failed to delete."
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler);