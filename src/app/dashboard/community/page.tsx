/*
    Community page source file
*/

import { DropdownMenu, NewQuestionSet } from "@/lib/menu";
import { getSessionData } from "@/lib/session";
import { SplashScreen } from "@/lib/ui";
import { Button } from "@mantine/core";
import { CirclePlus, GlobeIcon } from "lucide-react";
import Link from "next/link";

export default async function Community() {
  const session = (await getSessionData()).credentials;
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
            <NewQuestionSet />
        </div>
      </div>
    </div>
  );
}