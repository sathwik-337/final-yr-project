import { db } from "@/config/db";
import { ProjectTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq ,and} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("=== POST /api/user called ===");

    const user = await currentUser();
    console.log("currentUser result:", { userId: user?.id, email: user?.primaryEmailAddress?.emailAddress });

    if (!user) {
      console.error("No user - not authenticated");
      return NextResponse.json({ error: "Not authenticated. User is null." }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    console.log("Extracted email:", email);

    if (!email) {
      console.error("No email found in primaryEmailAddress");
      return NextResponse.json({ error: `No primary email available. primaryEmailAddress: ${JSON.stringify(user.primaryEmailAddress)}` }, { status: 400 });
    }

    console.log("[Step 1] Checking existing user with email:", email);
    const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
    console.log("[Step 1 Result] Found existing users:", existingUsers.length);

    if (existingUsers && existingUsers.length > 0) {
      console.log("User already exists, returning existing user");
      return NextResponse.json({ existing: true, user: existingUsers[0] });
    }

    const data = {
      name: user.fullName ?? "Unknown",
      email,
    };

    console.log("[Step 2] Preparing insert with data:", data);

    if (!data.name || !data.email) {
      return NextResponse.json({ error: `Invalid data - name: ${data.name}, email: ${data.email}` }, { status: 400 });
    }

    console.log("[Step 3] Executing insert...");
    const result = await db.insert(usersTable).values(data).returning();
    console.log("[Step 3 Result] Insert successful:", result);

    return NextResponse.json({ inserted: true, user: result[0] });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? err.stack : "";
    console.error("=== /api/user ERROR ===");
    console.error("Message:", errorMsg);
    console.error("Stack:", errorStack);
    console.error("Full error:", err);

    return NextResponse.json({
      error: errorMsg,
      details: errorStack,
      type: err instanceof Error ? err.constructor.name : typeof err,
    }, { status: 500 });
  }
}






   

   