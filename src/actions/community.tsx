/*
    Community set actions file for Community Sets
    ©2025 AlcuPhi
*/

import { db } from "@/db/db";
import { question, questionCollection } from "@/db/schema";
import { getSessionData } from "@/lib/session";
import { eq } from "drizzle-orm";

// Function
export class Community {
    // Edit set function
    public static async editSet(formData: FormData) {
        "use server";
        // Get token
        const token = await getSessionData();
        if (token.action == 'continue') {
            // @ts-expect-error We will always expect the error. However, this code utilizes set Information to check
            const setData = await (await db()).select().from(questionCollection).where(eq(questionCollection.publicID, formData.get("setPublicID")))
            // Check if current user is owner and if set exists in db
            if (setData.length != 0 && setData[0].creatorID == token.credentials?.id) {
                // Update set
                console.log(formData.get('setTags'))
                // await (await db()).update(questionCollection).set({
                //     'name': formData.get("setName"),
                //     'description': formData.get("setDescription"),
                //     "tags": formData.get("setTags")
                // })
            }
        }
    }
}