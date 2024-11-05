// import libs
import { Nunito } from "next/font/google";

// import partials
import { Header, MainNav } from "../partials";

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
  return (
    <html lang="en" className={nunito.className}>
      <body className="flex flex-col gap-2 bg-bg1">
        {/* HEADER và MainNav trong một div để kiểm soát khoảng cách */}
    <div className="">
      <Header />
      <MainNav />
    </div>

        {/* CONTAINER */}
        <main className="w-4/5 m-auto">{children}</main>

        {/* FOOTER */}
        <footer className="w-full h-[300px] bg-teal-300">Footer</footer>
      </body>
    </html>
  );
}
