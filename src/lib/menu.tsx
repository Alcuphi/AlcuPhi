"use client";

import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { LogOut } from "lucide-react";
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