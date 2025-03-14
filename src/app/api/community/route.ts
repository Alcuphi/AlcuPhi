import { db } from "@/db/db";
import { question, questionCollection, questionLog } from "@/db/schema";
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

// Check if request is DELETE
export async function DELETE(request: NextRequest) {
    // Get token, data, and more
    const token = await getSessionData();
    const requestData = await request.json();
    // Check and run
    if (token.action == 'continue' && requestData.method != undefined && requestData.method == "DELETE_SET") {
        let data = await (await db()).select().from(questionCollection).where(eq(questionCollection.id, requestData?.id));
        // Check if set is under control and then respond
        if (data.length != 0 && (data[0].creatorID == token.credentials?.id || token.credentials?.role != "user")) {
            // DELETE EVERYTHING RELATED!
            // Delete from questionLog
            await (await db()).delete(questionLog).where(eq(questionLog.collectionID, data[0].id));
            // Delete from question
            await (await db()).delete(question).where(eq(question.collectionID, data[0].id));
            // Delete from collection
            await (await db()).delete(questionCollection).where(eq(questionCollection.id, data[0].id));
            // Return success
            return NextResponse.json({
                'status': 'success',
            }, {
                'status': 202
            })
        }
        // Return unknown set
        return NextResponse.json({
            'status': 'unknown set',
        }, {
            'status': 404
        })
    }
    // Return failure
    return NextResponse.json({
        'status': 'failure',
    }, {
        'status': 405
    })
}