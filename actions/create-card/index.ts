"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard} from "./schema";
import { orderBy } from "lodash";
import { createAuditLog } from "@/lib/create-log-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async(data : InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            errors : "Unauthorized"
        }
    }

    const {title, boardId, listId} = data;
    let card;

    try {
        //fetching the list in which we are putting the card
        const list = await db.list.findUnique({
            where : {
                id : listId,
                board : {
                    orgId
                },
            },
        });

        if(!list) {
            return {
                errors : "List not found!",
            }
        }

        //fetching the last card inside the list
        const lastCard = await db.card.findFirst({
            where : {listId},
            orderBy : {order : "desc"},
            select : {order : true}
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data : {
                title,
                listId,
                order : newOrder,
            },
        })

        await createAuditLog({
            entityId : card.id,
            entityTitle : card.title,
            entityType : ENTITY_TYPE.CARD,
            action : ACTION.CREATE,
        })

    } catch (error) {
        error : "Failed to create."
    }

    revalidatePath(`/board/${boardId}`);
    return { data : card}
}

export const createCard = createSafeAction(CreateCard, handler);