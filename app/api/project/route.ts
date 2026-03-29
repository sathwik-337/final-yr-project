import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { ProjectTable, ScreenConfig, usersTable } from "@/config/schema";
import { eq ,and} from "drizzle-orm";
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


export async function GET(req: NextRequest) {
  try {
    // get projectId from query
    const projectId = req.nextUrl.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "ProjectId is required" },
        { status: 400 }
      );
    }

    // get logged-in user
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // query project
   const result = await db
  .select()
  .from(ProjectTable)
  .where(
    and(
      eq(ProjectTable.projectId, projectId),
      eq(
        ProjectTable.userId,
        user.primaryEmailAddress.emailAddress
      )
    )
  );

/* ---------- second query ---------- */

const ScreenConfigu = await db
  .select()
  .from(ScreenConfig)
  .where(eq(ScreenConfig.projectId, projectId as string));

/* ---------- single return ---------- */

return NextResponse.json({
  projectDetail: result[0] ?? null,
  screenConfig: ScreenConfigu,
});


  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { theme, projectName } = await req.json();
    const projectId = req.nextUrl.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "ProjectId is required" },
        { status: 400 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Build update object
    const updateData: any = {};
    if (theme) updateData.theme = theme;
    if (projectName) updateData.projectName = projectName;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No data provided to update" }, { status: 400 });
    }

    await db
      .update(ProjectTable)
      .set(updateData)
      .where(
        and(
          eq(ProjectTable.projectId, projectId),
          eq(ProjectTable.userId, user.primaryEmailAddress?.emailAddress as string)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}




