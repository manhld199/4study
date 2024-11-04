import "./globals.css";
import { Header, MainNav, ScrollUp } from '../partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col gap-2">
        <Header/>
        <MainNav/>
        {children}
        <footer className="w-full h-[300px] bg-teal-300">Footer</footer>
        <ScrollUp/>
      </body>
    </html>
  );
}
