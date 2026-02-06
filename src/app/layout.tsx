import type { Metadata } from "next";
import { Roboto, Albra, NotoSerif, Helvetica } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance Digest App - BLOTT",
  description: "Latest finance news around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Roboto.variable} ${Albra.variable} ${NotoSerif.variable} ${Helvetica.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
