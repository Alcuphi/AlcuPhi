"use client";

import { Alert, Button, Menu, Modal, TagsInput, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut, CirclePlus, Newspaper, AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { json } from "stream/consumers";

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

export function NewQuestionSet({name}: {name: string | undefined}) {
  const [opened, { open, close }] = useDisclosure(false);
  // States
  const [title, setTitle] = useState("Empty Project");
  const [description, setDescription] = useState("Empty Description");
  const [tags, setTags] = useState<String[]>(["Empty Tag"]);

  // Submission handler function
  function submitHandler(event: any) {
    event.preventDefault();
    console.log("🟠 Creating set...");
    // Define data
    let data = [event.target.textDescription.value, 
    event.target.setName.value, 
    event.target.setTags.value.split(',')]
    // Send a message
    fetch("/api/community", {
      method: "PATCH",
      // Body
      body: JSON.stringify({
        'operation': 'CREATE_SET',
        'setName': data[1],
        'setDescription': data[0],
        'setTags': data[2],
      })
    // Several promise executions and then print
    }).then(d => {d.json().then(data => {
      if (data.status == "success") {
        // Lil message 😈
        console.log("🟢 Set created!")
        // Redirect
        return redirect("/dashboard/community/set?id=" + data.setID)
      } else {
        console.log("🔴 Set was not created.")
      }
    })})

  }

  // Handler
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
            <span className="text-white">Please make sure to abide by alcuφ policies when creating question sets, namely our <Link href={'/tos'}><i>Terms of Service</i></Link>. Individual sets are at the discretion of the moderation team and can result in your account being terminated after several repeated infractions.</span>
        </Alert>
        <br />
        {/* Divider */}
        <div className="flex gap-5 h-[50vh] flex-col md:flex-row">
          {/* Actual Form */}
          <form className="flex flex-col gap-3 flex-1 w-full" onSubmit={submitHandler}>
              <TextInput name="setName"
              // OnChange for the change values
              onChange={(event) => {
                if (event.target.value == "") {
                  setTitle("Empty Project")
                } else {
                  setTitle(event.target.value)
                }
              }}
              placeholder="Ohm's law review" label="Set Name:"  required />

              {/* Description */}
              <Textarea name="textDescription" placeholder="My beautiful review of Ohm's law, complete with 200,000 questions." label={"Set Description:"}
              // OnChange for the change values
              onChange={(event) => {
                if (event.target.value == "") {
                  setDescription("Empty Description")
                } else {
                  setDescription(event.target.value)
                }
              }}              
              required/>
              {/* Tags */}
              <TagsInput label="Set Tags:" placeholder={"E&M"} name="setTags"
              // Onchange
              onChange={(event) => {
                if (event.length == 0) {
                  setTags(["Empty Tag"]);
                } else {
                  setTags(event);
                }
              }}
              required/>
              {/* Submit Button */}
              <Button type="submit" color="grape">Create Set</Button>
          </form>        
          {/* Preview */}
          <div className="w-full flex-1">
            <h1 className="font-bold text-2xl">Preview</h1>
            <br />
            {/* Card */}
            <div className="relative rounded-lg bg_override h-64 flex flex-col w-full overflow-hidden">
              <div
                // Class
                className="absolute inset-0 bg-cover bg-center filter blur-0 opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('/bg_community.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              {/* Big Text */}
              {/* Text */}
              <div className="relative z-10 flex flex-col justify-center h-full items-center p-6 gap-2">
                <h1 className="text-2xl font-black text-white">{title}</h1>
                <h2 className="text-xl font-bold text-white">by {name}</h2>
                <p className="mt-1 font-['Mulish'] font-extrabold text-gray-300 text-center">
                  {description}
                </p>
                {/* Map tagsd */}
                {
                  tags.map((tag, id) => {
                    return (
                      <p key={id} className="text-gray-300 pl-3 pr-3 bg-tags rounded-md">
                        {tag}
                      </p>
                    )
                  })
                }
              </div>
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