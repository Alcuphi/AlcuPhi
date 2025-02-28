import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@/app/globals.css";
import { MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "AlcuPhi",
  description: "Alcumus for us Physicists ⚛",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased text-white`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
