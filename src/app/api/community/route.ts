import { db } from "@/db/db";
import { questionCollection } from "@/db/schema";
import { getSessionData } from "@/lib/session";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    // Get token, data, and more
    const token = await getSessionData();
    const data = await request.json();
    // Authentication pipeline
    if (token.action == "continue") {
        // Create SET
        if (data.operation == "CREATE_SET") {
            // Generate a PublicID (alphanumeric) while length is not equal to 0, preventing conflict
            let publicID = Math.random().toString(36).slice(2);
            while ((await (await db()).select().from(questionCollection).where(eq(questionCollection.publicID, publicID))).length != 0) {
                publicID = Math.random().toString(36).slice(2);
            }
            // Insert in DB and then return
            const dbInfo = await (await db()).insert(questionCollection).values({
                'name': data.setName,
                'description': data.setDescription,
                'tags': data.setTags,
                "publicID": publicID,
                "creatorID": token.credentials?.id,
            }).returning({
                "id": questionCollection.publicID
            })

            return NextResponse.json({
                "message": "Success!",
                "status": "success",
                "setID": dbInfo[0].id
            })
        }
    }
    return NextResponse.json({
        "message": "Failure.",
        "status": "failure"
    })
}