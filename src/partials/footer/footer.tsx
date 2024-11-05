import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-8 bottom-0 left-0 right-0">
      <div className="container mx-auto flex flex-col items-center px-4 space-y-4">
      
        {/* Logo and Links Row */}
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="bg-white-200 text-black font-bold py-2 px-4">
            <Image src="/imgs/Logo.png" alt="Logo" width={300} height={300} />
          </div>

          {/* Links */}
          <div className="flex flex-col text-black text-sm space-y-2 text-right">
            <a href="/about-us" className="underline hover:text-[#11009E]">
              About us
            </a>
            <a href="/term-of-use" className="underline hover:text-[#11009E]">
              Term of use
            </a>
            <a href="/term-of-service" className="underline hover:text-[#11009E]">
              Term of service
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-black text-sm mt-4">
          &copy; copyright {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
