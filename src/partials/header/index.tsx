"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); 
  const avatarRef = useRef<HTMLImageElement>(null); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && // Kiểm tra nếu click không nằm trong menu
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node) // Kiểm tra nếu click không nằm trong avatar
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="px-20">
      <div className="w-full h-20 bg-teal-300 flex items-center justify-between bg-white px-5">
        {/* Logo */}
        <Link href="/">
          <img src="/imgs/Logone.png" alt="Logo" className="h-10" />
        </Link>

        {/* Search bar */}
        <div className="flex items-center justify-between w-full max-w-[480px] min-w-[360px] border-[#5271FF] border-[1.4px] rounded-lg px-4 min-h-10 bg-[#C4CEFF] bg-opacity-50">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-0 outline-none bg-transparent"
          />
          <FiSearch className="min-w-[30px] min-h-[30px] p-[7px] rounded-full bg-[#5271FF] cursor-pointer stroke-white" />
        </div>

        {/* My Courses Button và Avatar */}
        <div className="flex items-center relative">
          <Link href="/course/1">
            <Button
              variant="ghost"
              className="cursor-pointer text-[#5271FF] text-base hover:bg-transparent hover:text-[#11009E]">
              Personal courses
            </Button>
          </Link>
          <img
            ref={avatarRef}
            src="/imgs/test.jpg"
            alt="Avatar"
            className="h-[40px] w-[40px] rounded-full cursor-pointer"
            onClick={toggleMenu}
          />

         {/* Login Button */}
         {/* <div className="flex items-center">
         <Link href="/login"> 
          <Button className="h-10 bg-[#5271FF] hover:bg-[#11009E]">
            LOG IN
          </Button>
          </Link>
        </div> */}

          {/* Menu thả xuống */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-12 right-0 bg-white shadow-2xl rounded-lg p-3 w-auto min-w-max z-50"
            >
              <div className="flex items-center mb-3 gap-2 w-full">
                <img
                  src="/imgs/test.jpg"
                  alt="Avatar"
                  className="h-[60px] w-[60px] rounded-full"
                />
                <div className="flex-grow">
                  <p className="font-medium">User name</p>
                  <p className="text-sm text-gray-500 break-all">
                    Emailllhhhhhhhhh@gmail.com
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="w-full text-left text-white bg-[#5271FF] hover:bg-[#11009E] font-medium py-1 rounded-md">
                LOG OUT
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
