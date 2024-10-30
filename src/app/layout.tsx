import { Nunito } from "next/font/google";

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
        {/* HEADER */}
        <header className="w-full h-[150px] bg-teal-300">Header</header>

        {/* CONTAINER */}
        <main className="w-4/5 m-auto">{children}</main>

        {/* FOOTER */}
        <footer className="w-full h-[300px] bg-teal-300">Footer</footer>
      </body>
    </html>
  );
}
