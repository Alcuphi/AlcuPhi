// app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";
import { MantineProvider } from "@mantine/core";
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session";
export const metadata: Metadata = {
  title: "Alcuphi",
  description: "Alcumus for us Physicists ⚛",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionData();

  if (session.action === "logout") {
    return redirect("/logout");
  }
  return (
    <>
       {children}
    </>
  );
}
