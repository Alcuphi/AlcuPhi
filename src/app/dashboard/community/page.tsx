/*
    Community page source file
*/

import { db } from "@/db/db";
import { questionCollection, user } from "@/db/schema";
import { DropdownMenu, NewQuestionSet, SetRenderer } from "@/lib/menu";
import { getSessionData } from "@/lib/session";
import { SplashScreen } from "@/lib/ui";
import { Button } from "@mantine/core";
import { eq } from "drizzle-orm";
import { ArrowLeft, GlobeIcon } from "lucide-react";
import Link from "next/link";

export default async function Community() {
  // Get vars
  const session = (await getSessionData()).credentials;
  // Get community sets using our various features
  const communitySets = await (await db()).select({
    "setName": questionCollection.name,
    "setDescription": questionCollection.description,
    "setTags": questionCollection.tags,
    "creatorID": questionCollection.creatorID,
    "publicID": questionCollection.publicID,
  }).from(questionCollection)
  // define data info
  var dataInfo = [];
  // For loop
  for (let i = 0; i < communitySets.length; i++) {
    if (communitySets[i].creatorID != null) {
      // @ts-expect-error Bless no mess with eq() operator
      let creatorID = (await (await db()).select({'name': user.name}).from(user).where(eq(user.id, communitySets[i].creatorID)))[0];
      // Check for set creator
      dataInfo.push({
        // Push with a DB query for all info
        // 'userInfo': ,
        // return set info
        'setInfo': communitySets[i],
        'userInfo': creatorID
      })
    }
  }

  return (
    <div className="bg-zinc-900 h-full w-full absolute">
      {/* For the top menu */}
      <div className="w-[100%] flex justify-center p-3 items-center gap-6">
        <div className="font-['STRIX'] text-3xl underline hover:cursor-pointer select-none">
          <DropdownMenu />
        </div>
        <SplashScreen />
      </div>

      {/* Regular UI */}
      <div className="p-10 gap-5 w-full bg-zinc-900 flex flex-col">
        {/* Text */}
        <div className="gap-4 flex w-full flex-col">
            <Link href={'/dashboard/'} className="flex gap-1 hover:gap-3 transition-all"><ArrowLeft /> BACK TO DASHBOARD</Link>
            {/* Practice button */}
            <div>
              <h1 className="font-black text-5xl gap-2  flex flex-col"><GlobeIcon size={30} /> 
                  <span className="gradient_text_community">Community</span>
              </h1>
              <p>What would you like to practice today?</p>
            </div>
            {/* Component to create question set */}
            <div className="flex flex-col md:flex-row md:w-full gap-3">
              <NewQuestionSet name={session?.name} />
              <Button component={Link} href={'/dashboard/community/my'}>My Sets</Button>
            </div>
        </div>
        {/* Filter the DATA, SO NICE WOW IT!!! */}
        <SetRenderer filterByCreator={true} sets={dataInfo} />
      </div>
    </div>
  );
}