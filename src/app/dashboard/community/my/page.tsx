/*
    Set page source file
*/

import { db } from "@/db/db";
import { questionCollection } from "@/db/schema";
import { DropdownMenu, NewQuestionSet, SetRenderer } from "@/lib/menu";
import { getSessionData } from "@/lib/session";
import { SplashScreen } from "@/lib/ui";
import { ArrowLeft, TvIcon } from "lucide-react";
import Link from "next/link";

export default async function MySet() {
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
      // Check for set creator
      if (communitySets[i].creatorID == session?.id) {
        dataInfo.push({
          // Push with a DB query for all info
          // 'userInfo': ,
          // return set info
          'setInfo': communitySets[i],
          'userInfo': {
            "name": session?.name
          }
        })  
      }      
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
        <div className="flex w-full flex-col gap-4">
            <Link href={'/dashboard/community'} className="flex gap-1 hover:gap-3 transition-all"><ArrowLeft /> BACK TO COMMUNITY</Link>
            {/* Practice button */}
            <div>
              <h1 className="font-black text-5xl gap-2  flex flex-col"><TvIcon size={30} /> 
                  <span className="gradient_text_create">My Sets</span>
              </h1>
            </div>
            {/* Component to create question set */}
            <div className="flex flex-col md:flex-row md:w-full gap-3">
              <NewQuestionSet name={session?.name} />
            </div>
        </div>
        {/* Filter the DATA, SO NICE WOW IT!!! */}
        <SetRenderer sets={dataInfo} filterByCreator={false} />
      </div>
    </div>
  );
}