import { DropdownMenu } from "@/lib/menu";
import { QuestionLog, QuestionRenderer } from "@/lib/question";
import { Button, Tabs } from "@mantine/core";
import Link from "next/link";

export default async function Play({searchParams}: {searchParams: any}) {
  if ((await searchParams).component == undefined) {
    return (
      <main className="bg-zinc-900 h-full w-full absolute">
        {/* For the top menu */}
        <div className="w-[100%] flex justify-center p-3 items-center gap-6">
          <div className="font-['STRIX'] text-3xl hover:cursor-pointer select-none">
            {/* Dropdown menu component */}
            <DropdownMenu />
          </div>
        </div>
        
        {/* Regular UI */}
        <div className="p-10 w-full font-['Mulish'] bg-zinc-900 flex flex-col gap-6">
          {/* UI i guess that includes change focus button */}
          <div className="flex flex-col gap-3 w-fit">
            <h1 className="text-4xl font-bold">Practice</h1>
            <Button className="w-fit" component={Link} href={'?component="changeFocus"'} color="green" variant="default">Change Focus</Button>
          </div>
          {/* Button */}
          {/* Side by side UI for practicing */}
          <section className="flex flex-col md:flex-row w-full justify-center items-center gap-7 md:gap-5">
            <div className="md:w-[30%] w-full rounded-lg">
              <QuestionLog />
            </div>
            <div className="md:w-[70%] rounded-lg min-h-[30vh]">
              <QuestionRenderer />
            </div>
          </section>
        </div>
      </main>
    );
  }
  // else if ((await searchParams).component == "changeFocus") {
  //   return (
  //     <></>
  //   )
  // }

  // Component below to change focus
  return (
    <main className="bg-zinc-900 h-full w-full absolute">
      {/* For the top menu */}
      <div className="w-[100%] flex justify-center p-3 items-center gap-6">
        <div className="font-['STRIX'] text-3xl hover:cursor-pointer select-none">
          {/* Dropdown menu component */}
          <DropdownMenu />
        </div>
      </div>
      
      {/* Regular UI */}
      <div className="p-10 w-full font-['Mulish'] bg-zinc-900 flex flex-col gap-6">
        {/* UI i guess that includes change focus button */}
        <div className="flex flex-col gap-3 w-fit">
          <h1 className="text-4xl font-bold">Change Focus</h1>
          <Button className="w-fit" component={Link} href={'/dashboard/play'} color="green" variant="default">Return back</Button>
        </div>
        {/* Button */}
        {/* Side by side UI for practicing */}
        <section className="flex flex-col md:flex-row w-full justify-center items-center gap-7 md:gap-5">
          <h2>Simple Form to change your focus for the adaptive software</h2>
        </section>
      </div>
    </main>
  )
}
