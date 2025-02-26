/*
    Community page source file
*/

import { db } from "@/db/db";
import { questionCollection } from "@/db/schema";
import { DropdownMenu, NewQuestionSet } from "@/lib/menu";
import { getSessionData } from "@/lib/session";
import { SplashScreen } from "@/lib/ui";
import { GlobeIcon } from "lucide-react";

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
  console.log(communitySets)
  
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
      <div className="p-10 w-full bg-zinc-900 flex flex-col gap-2">
        {/* Text */}
        <div className="gap-2 flex flex-col w-fit">
            {/* Practice button */}
            <div>
              <h1 className="font-black text-5xl gap-2  flex flex-col"><GlobeIcon size={30} /> 
                  <span className="gradient_text_community">Community</span>
              </h1>
              <p>What would you like to practice today?</p>
            </div>
            {/* Component to create question set */}
            <NewQuestionSet name={session?.name} />
            {/* Filter the DATA, SO NICE WOW IT!!! */}
        </div>
      </div>
    </div>
  );
}