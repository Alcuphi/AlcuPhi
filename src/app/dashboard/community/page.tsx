/*
    Community page source file
*/

import { DropdownMenu } from "@/lib/menu";
import { getSessionData } from "@/lib/session";
import { SplashScreen } from "@/lib/ui";
import { Button } from "@mantine/core";
import { GlobeIcon } from "lucide-react";

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
        <div>
            <h1 className="font-black text-5xl gap-2  flex flex-col"><GlobeIcon size={30} /> 
                <span className="gradient_text_community">Community</span>
            </h1>
            <p>What would you like to practice today?</p>
        </div>
        <Button>Create question set</Button>
      </div>
    </div>
  );
}