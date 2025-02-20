"use client";

import { Alert, Button, Menu, Modal, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut, CirclePlus, Newspaper, AlertCircle } from "lucide-react";
import Link from "next/link";

export function DropdownMenu() {
  return (
    <Menu
      shadow="md"
      width={200}
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <h1 className="font-extrabold">alcuφ</h1>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        {/* Logout mode */}
        <Menu.Item
          component={Link}
          href={"/logout"}
          leftSection={<LogOut size={15} />}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function NewQuestionSet() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {/* Modal */}
      <Modal opened={opened} onClose={close} title={(
        <span className="font-black text-3xl gap-3  flex justify-center items-center"><Newspaper size={32.5} /> 
          <span className="gradient_text_create">Create Set</span>
        </span>
      )}
       fullScreen>

        {/* Warning */}
        <Alert title="Safety" color="red" icon={(<AlertCircle />)}>
            <span className="text-white">Please make sure to abide by alcuφ policies when creating question sets, mainly our <Link href={'/tos'}><i>Terms of Service</i></Link>. Individual sets are at the discretion of the moderation team and can result in your account being terminated after several repeated infractions.</span>
        </Alert>
        <br />
        {/* Divider */}
        <div className="flex flex-row gap-5 h-[30vh]">
          {/* Actual Form */}
          <form className="w-[50%] flex flex-col gap-3 flex-1 min-h-52">
              <TextInput name="setName" placeholder="Ohm's law review" label="Set Name:"  required />
              <Textarea name="textDescription" placeholder="My beautiful review of Ohm's law, complete with 200,000 questions." label={"Set Description"} required/>
          </form>        
          {/* Preview */}
          <div>
            <div className="min-h-10 flex-1">
              <h1>Preview</h1>
            </div>
          </div>
        </div>
      </Modal>

      {/* Button to open modal */}
      <Button  variant="filled" color="rgba(44, 150, 12, 1)" onClick={open} leftSection={(<CirclePlus />)}><span className="text-[15px] font-bold">Create question set</span></Button>
    </>
  )
}

// /*
//   Function to help others change specific focus when playing
// */
// export function ChangeFocus() {
//   const [opened, {open,close}] = useDisclosure();
//   return (
//     <>
//       <Modal opened={opened} onClose={close} title="Authentication">
//         {/* Modal content */}
//       </Modal>


//       <Button className="w-fit" color="green" variant="default" onClick={open}>Change Focus</Button>
//     </>
//   )
// }