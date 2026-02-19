import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { userInput, device } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const projectId = randomUUID();

    await db.insert(ProjectTable).values({
      projectId,
      userId: user.primaryEmailAddress?.emailAddress as string,
      device,
      userInput,
    });

    // 👇 send clean response to frontend
    return NextResponse.json({
      projectId,
    });

  } catch (error) {
    console.error("Project creation error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
