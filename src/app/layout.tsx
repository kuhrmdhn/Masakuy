import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/element/header/Header";
import Sidebar from "@/components/element/sidebar/Sidebar";
import { Roboto } from "next/font/google";
import AlertProvider from "@/components/provider/AlertProvider";
import SuspenseProvider from "./SuspenseProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"]
});

export const metadata: Metadata = {
  title: {
    default: "Masakuy!",
    template: "%s | Masakuy!"
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SuspenseProvider>
          <Header />
          <Sidebar />
          <main className="pt-20">
            {children}
          </main>
          <AlertProvider />
        </SuspenseProvider>
      </body>
    </html>
  );
}
