"use client";

import { Alert, Button, Menu, Modal, Select, TagsInput, Textarea, TextInput,Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut, CirclePlus, Newspaper, AlertCircle, Tags, Trash } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
// CSS Import
import "@/lib/styles/menu.css"

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

// SetRenderer file for rendering sets
export function SetRenderer({sets, filterByCreator = true}: {sets: any, filterByCreator: boolean}) {
  // Set states and constants
  const [set, setRender] = useState<[]>(sets);
  const setCount = set.length;
  const [RenderCount, setRenderCount] = useState(5);
  const [currentRenderCount, setCurrentRenderCount] = useState(RenderCount);

  return (
    <>
      {/* Filter */}
      <div className="bg-zinc-950 w-full rounded-lg min-h-[10vh] flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Options:</h1>  
        <div className="space-y-4">
          <TagsInput
            placeholder="Set Tags"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
            label={
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Filter by set tags:
              </label>
            }
            onChange={value => {
              // @ts-expect-error We expect this to occur
              let updateArr = [];
              // @ts-expect-error We expect this to occur
              sets.forEach(setInfo => {
                for (let i = 0; i < value.length; i++) {
                  if (setInfo.setInfo.setTags.includes(value[i])) {
                    updateArr.push(setInfo);
                  }
                }
              });
              if (value.length == 0) {
                setRender(sets);
              } else {
                // @ts-expect-error We expect this to occur
                setRender(updateArr);
              }
            }}
          />    
          <div className="space-y-4">
            <Select
              label="Sets per page:"
              defaultValue="5"
              data={["5","10", "20", "50"]}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg shadow-sm"
              onChange={(val) => {
                // @ts-expect-error We expect this to occur
                setRenderCount(parseInt(val));
                // @ts-expect-error We expect this to occur
                setCurrentRenderCount(parseInt(val));
              }}
            />
            {/* Filter by creator */}
            {
              filterByCreator ? (
                <>
                  <TextInput label="Filter by creator:"
                  placeholder="system"
                  onChange={value => {
                    // @ts-expect-error We expect this to occur
                    let updateArr = [];
                    // @ts-expect-error We expect this to occur
                    sets.forEach(setInfo => {
                      if (setInfo.userInfo.name.toLowerCase().includes(value.target.value.toLowerCase())) {
                        updateArr.push(setInfo);
                      }
                    });
                    if (value.target.value.length == 0) {
                      setRender(sets);
                    } else {
                      // @ts-expect-error We expect this to occur
                      setRender(updateArr);
                    }
                  }}
                  />
                </>
              ) : null
            }

            {/* Filter by creator */}
            <TextInput label="Filter by set name:"
            placeholder="Ohm's law review"
            onChange={value => {
              // @ts-expect-error We expect this to occur
              let updateArr = [];
              // @ts-expect-error We expect this to occur
              sets.forEach(setInfo => {
                if (setInfo.setInfo.setName.toLowerCase().includes(value.target.value.toLowerCase())) {
                  updateArr.push(setInfo);
                }
              });
              if (value.target.value.length == 0) {
                setRender(sets);
              } else {
                // @ts-expect-error We expect this to occur
                setRender(updateArr);
              }
            }}
            />
          </div>
        </div>
      </div>
      {/* Set Renderer */}
      <h1 className="font-extrabold mb-8 text-2xl">{setCount} {setCount > 1 ? "sets" : "set"} found.</h1>
      {
        set.map((keySet, i) => {
          if (i >= (currentRenderCount - RenderCount) && i < currentRenderCount) {
            return (
              // @ts-expect-error expect the unexpected
              <Link href={'/dashboard/community/set?id=' + keySet.setInfo.publicID} className="relative rounded-lg bg_override h-64 flex flex-col w-full overflow-hidden" key={i}>
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
                {/* @ts-expect-error we know it will error out as the component has no idea */}
                <h1 className="text-2xl font-black text-white">{keySet.setInfo.setName}</h1>
                {/* @ts-expect-error we know it will error out as the component has no idea */}
                <h2 className="text-xl font-bold text-white">by {keySet.userInfo.name}</h2>
                <p className="mt-1 font-['Mulish'] font-extrabold text-gray-300 text-center">
                {/* @ts-expect-error we know it will error out as the component has no idea */}
                  {keySet.setInfo.setDescription}
                </p>
                {/* Map tagsd */}
                {
                /* @ts-expect-error we know it will error out as the component has no idea */
                keySet.setInfo.setTags.map((tag, id) => {
                    return (
                      <p key={id} className="text-gray-300 pl-3 pr-3 bg-tags rounded-md">
                        {tag}
                      </p>
                    )
                  })
                }
              </div>
            </Link>

            )            
          }
        })
      }
      {/* Check if count is sufficient and allow buttons to change */}
      {
        ((currentRenderCount/RenderCount) != (Math.trunc(set.length/RenderCount)) + 1) ?
        (<>
          <Button
          // Onclick handling
          onClick={() => {
            setCurrentRenderCount(currentRenderCount + RenderCount);
          }}
          >Next Page</Button>
        </>) : null
      }
      {/* Previous renderer */}
      {
        ((currentRenderCount/RenderCount) != 1) ?
        (<>
          <Button
          // Onclick handling
          onClick={() => {
            setCurrentRenderCount(currentRenderCount - RenderCount);
          }}
          >Previous Page</Button>
        </>) : null
      }
    </>
  )
}

export function DeleteSet({id}:{id:number}) {
  // Define router
  let router = useRouter();
  // Constants
  const [opened, {open, close}] = useDisclosure();
  const [loadingState,setLoadingState] = useState(false);
  // Confirmation to delete the set
  function deleteConfirmation(event: any) {
    // FormEvent
    event.preventDefault();
    // State set
    setLoadingState(true);
    // Delete
    fetch("/api/community", {
      'method': "DELETE",
      'body': JSON.stringify({
        'method': 'DELETE_SET',
        'id': id
      })
    }).then(data => {data.json().then(res => {
      // Check if status is success and redirect back
      // to your sets
      if (res.status == "success") {
        router.push('/dashboard/community/my')
      }
    })})
  }
  return (
    <>
      {/* Confirmation to delete set */}
      <Modal opened={opened} onClose={close} title={(<span className="flex flex-row justify-center items-center gap-2"><Trash size={20}/> Confirmation</span>)} centered>
      {/* Items and justify */}
        <div className="w-[90%] h-full flex flex-col p-4 gap-5">
          <div>
            <h1 className="text-[25px] font-bold">Are you sure you want to delete this set?</h1>
            <p>This is <strong>irreversible</strong>. You won't be able to get the questions and all data will be deleted.</p>
          </div>
          {/* Confirm */}
          <form onSubmit={deleteConfirmation}>
            {
              loadingState ? 
              (
                <Button type="submit" color="red" className="w-full"><Loader color="white" type="bars" size={15}  /></Button>
              ) : (<Button type="submit" color="red">Yes, I am sure.</Button>)
            }
          </form>
        </div>
      </Modal>
      <Button color="red" onClick={open}>Delete Set</Button>
    </>
  )
}