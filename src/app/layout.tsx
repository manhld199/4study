import "./globals.css";
import { Footer } from "@/partials";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col gap-2">
        <header className="w-full h-[150px] bg-teal-300">Header</header>
        {children}
        {/* <footer className="w-full h-[300px] bg-teal-300">Footer</footer> */}
        <Footer />
      </body>
    </html>
  );
}
