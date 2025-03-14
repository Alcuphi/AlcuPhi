/*
    Set page source file
*/

import { db } from "@/db/db";
import { question, questionCollection, user } from "@/db/schema";
import { DropdownMenu } from "@/lib/menu";
import { getSessionData } from "@/lib/session";
import { SplashScreen } from "@/lib/ui";
import { Button } from "@mantine/core";
import { eq } from "drizzle-orm";
import { ArrowLeft, Brain, BrainIcon, CircleHelp, Pencil, Play, TvIcon } from "lucide-react";
import Link from "next/link";

export default async function Set({ searchParams }: { searchParams: any }) {
  // Get vars
  const session = (await getSessionData()).credentials;
  //   Get specific set by checking
  const id = (await searchParams).id;
  // Checking set
  const set = await (await db()).select().from(questionCollection).where(eq(questionCollection.publicID, id));
  if (set.length == 0) {
    return (
      <div className="bg-zinc-900 h-full w-full absolute">
      {/* For the top menu */}
      <div className="w-[100%] flex justify-center p-3 items-center gap-6">
        <div className="font-['STRIX'] text-3xl underline hover:cursor-pointer select-none">
          <DropdownMenu />
        </div>
        <SplashScreen />
      </div>
      {/* 404 UI */}
      <div className="gap-5 w-full bg-zinc-900 flex flex-col justify-center items-center h-[90vh]">
            <div className="flex">
              <h1 className="font-black text-5xl gap-2 items-center justify-center flex"><BrainIcon size={30} /> 
                  <span className="gradient_text_create">Sets</span>
              </h1>
            </div>
            <p className="w-[80%] text-center">Unfortunately. The set you are looking for couldn&apos;t be found. Do you have the correct link?</p>
            <Button component={Link} href={'/dashboard/community'} leftSection={(<ArrowLeft />)}>Back to Community</Button>
      </div>
    </div>

    )
  }
  // Define setData
  const setData = set[0];
  // Get Questions
  const questions = await (await db()).select().from(question).where(eq(question.collectionID, setData.id));
  // Expect error due to the equals
  const creator = await (await db()).select({"name": user.name,"id": user.id}).from(user).where(eq(user.id,setData.creatorID));
  // Our set
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
        <div className="gap-5 flex w-full flex-col">
            {/* Practice button */}
            <Link href={'/dashboard/community'} className="flex gap-1 hover:gap-3 transition-all"><ArrowLeft /> BACK TO COMMUNITY</Link>
            <div>
              <h1 className="font-black text-5xl gap-2  flex flex-col"><Brain size={30} /> 
                  <span className="gradient_text_create">{setData.name}</span>
              </h1>
              <p>{setData.description}</p>
              <p>By {creator[0].name}</p>
            </div>
            <div className="flex flex-row gap-2">
              {
                // @ts-expect-error Since session ID
                (creator[0].id != session.id || session.role == "user") ? null :
                (
                  <Button className="w-[25%]" component={Link} href={'/dashboard/community/set/edit?id=' + setData.publicID} leftSection={(<Pencil size={20} />)}>Edit</Button>
                )
              }
              {
                questions.length == 0 ? null : (              <Button className="w-[25%]" component={Link} href={'/dashboard/play?id=' + setData.publicID} leftSection={(<Play size={20} />)} color="grape">Play Set</Button>              )
              }
            </div>
        </div>
        {/* Questions to render */}
        {
          questions.length == 0 ? (
            <div className="bg-zinc-950 shadow-md w-[100%] rounded-md min-h-52 flex justify-center items-center flex-col gap-4">
              <div>
                <h1 className="flex flex-row gap-2 text-[25px] font-bold items-center justify-center"><CircleHelp/> Questions</h1>
                <p>No questions are available to practice in this set.</p>
              </div>
              {
                // @ts-expect-error Since session ID
                (creator[0].id != session.id || session.role == "user") ? null :
                (
                  <Button className="w-[25%]" color="grape" component={Link} href={'/dashboard/community/set/edit?id=' + setData.publicID} leftSection={(<Pencil size={20} />)}>Create Questions</Button>
                )
              }
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  );
}