"use client";
// import SessionProvider
import { SessionProvider } from "next-auth/react";

// import libs
import { Nunito } from "next/font/google";
import { usePathname } from "next/navigation";
// import partials
import { Header, MainNav, ScrollUp } from "../partials";
import { Footer } from "../partials";

// import css
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      <html lang="en" className={nunito.className}>
        <body className="flex flex-col gap-2 bg-bg1">
          {/* HEADER và MainNav trong một div để kiểm soát khoảng cách */}
          <div className="">
            <Header />
            <MainNav />
          </div>

          {/* CONTAINER */}
          <main
            className={pathname === "/about-us" ? "w-full" : "w-4/5 m-auto"}>
            {children}
          </main>

          {/* FOOTER */}
          <Footer />
          <ScrollUp />
        </body>
      </html>
    </SessionProvider>
  );
}
