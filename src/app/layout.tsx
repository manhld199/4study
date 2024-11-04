import "./globals.css";
import { Header, MainNav } from '../partials';

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
      </body>
    </html>
  );
}
