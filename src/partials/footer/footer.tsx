"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };
  return (
    <footer className="bg-white py-8 bottom-0 left-0 right-0 pt-[50px] pb-[50px]">
      <div className="container mx-auto flex flex-col items-center px-4 space-y-4">
        {/* Logo and Links Row */}
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="bg-white-200 text-black font-bold py-2 px-4">
            <Image src="/imgs/Logo.png" alt="Logo" width={300} height={300} />
          </div>

          {/* Links */}
          <div className="flex flex-col text-black text-sm space-y-2 text-left text-[#2C2C2C]">
            <div className="font-medium text-[22px] pb-[20px]">Resources</div>
            <a href="/about-us" className="text-[16px] hover:text-[#5271FF]">
              About us
            </a>
            <a href="/term-of-use" className="text-[16px] hover:text-[#5271FF]">
              Term of use
            </a>
            <a
              href="/term-of-service"
              className="text-[16px] hover:text-[#5271FF]">
              Term of service
            </a>
          </div>

          <div className="flex flex-col max-w-[354px] min-w-[354px] text-black text-sm space-y-2 text-left text-[#2C2C2C]">
            <div className="font-medium text-[22px] pb-[20px]">
              Join Our Newsletter
            </div>
            <p className="text-[16px] pb-[10px]">
              Provide your email address to receive updates, insights, and
              resources directly to your inbox.
            </p>
            <div className="flex items-center justify-between w-full border-[#D9D9D9] border-[1.4px] rounded-[18px] px-1 min-h-12  bg-opacity-50">
              <input
                type="text"
                placeholder="Your Email Address"
                className="w-full border-0 outline-none bg-transparent ml-[4px]"
              />
              <Button
                type="submit"
                className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 hover:bg-[#11009E]">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
