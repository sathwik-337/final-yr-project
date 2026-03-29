import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ projects: [] });
    }

    const projects = await db
      .select()
      .from(ProjectTable)
      .where(eq(ProjectTable.userId, email))
      .orderBy(desc(ProjectTable.createdOn))
      .limit(10);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Fetch user projects error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
