/*
    Community set actions file for Community Sets
    ©2025 AlcuPhi
*/

import { db } from "@/db/db";
import { question, questionCollection } from "@/db/schema";
import { getSessionData } from "@/lib/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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
            if (setData.length != 0 && (setData[0].creatorID == token.credentials?.id || token.credentials?.role != 'user')) {
                // Update set
                await (await db()).update(questionCollection).set({
                    'name': formData.get("setName")?.toString(),
                    'description': formData.get("setDescription")?.toString(),
                    // Set tags and transform to string and then into array for tags
                    'tags': formData.get('setTags')?.toString().split(','),
                // Check equality
                // @ts-expect-error Expecteed error since yeah
                }).where(eq(questionCollection.publicID, formData.get('setPublicID')))
                // Return
                return redirect(`/dashboard/community/set?id=${setData[0].publicID}`);
            }
        }
    }
}