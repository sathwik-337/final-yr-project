import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/config/db";
import {ProjectTable} from "@/config/schema";
import {randomUUID} from "crypto"
export async function POST(req:NextRequest)
{
    const {userInput,device}=await req.json();
    const user=await currentUser();
    const projectId=randomUUID();
    const  result=await db.insert(ProjectTable).values({
        projectId:projectId,
        userId:user?.primaryEmailAddress?.emailAddress as string,
        device:device,
        userInput:userInput
    }).returning();

    return NextResponse.json(result[0]);
}