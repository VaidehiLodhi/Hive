import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BoardTitleForm } from "./board-title-form";
import { Board } from "@prisma/client";
import { BoardOptions } from "./board-options";

interface BoardNavBarProps {
    data : Board
}

export const BoardNavBar = async({data} : BoardNavBarProps)=> {
    
    return (
        <div className="w-full h-14 z-40 bg-black/40 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            <BoardTitleForm data={data}/>
            <div className="ml-auto">
                <BoardOptions id={data.id}/>
            </div>
        </div>
    )
}