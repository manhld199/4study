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
    <header className="bg-white pt-[24px]">
      <div className="w-4/5 m-auto h-20 flex items-center justify-between px-5">
        {/* Logo */}
        <Link href="/">
          <img src="/imgs/Logone.png" alt="Logo" className="h-10" />
        </Link>

        {/* Search bar */}
        <div className="flex items-center justify-between w-full max-w-[480px] min-w-[700px] border-[#D9D9D9] border-[1.4px] rounded-[18px] px-1 min-h-12  bg-opacity-50">
          <FiSearch className="min-w-[30px] min-h-[30px] p-[7px] rounded-full stroke-[#5271FF]" />
          <input
            type="text"
            placeholder="Find Your Courses..."
            className="w-full border-0 outline-none bg-transparent"
          />
          <Link href="/courses">
            <Button
              type="submit"
              className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 hover:bg-[#11009E]">
              Search
            </Button>
          </Link>
        </div>
        {/* Khi chưa có account */}
        <div>
          <Link href="/login">
            <Button
              type="submit"
              className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 hover:bg-[#11009E]">
              Login
            </Button>
          </Link>
        </div>

        {/* My Courses Button và Avatar */}
        {/* <div className="flex items-center relative">
          <img
            ref={avatarRef}
            src="/imgs/test.jpg"
            alt="Avatar"
            className="h-[40px] w-[40px] rounded-full cursor-pointer"
            onClick={toggleMenu}
          />
          <Link href="/dash-board">
            <Button
              variant="ghost"
              className="cursor-pointer text-[#5271FF] text-base hover:bg-transparent hover:text-[#11009E]">
              Dashboard
            </Button>
          </Link>

          {/* Menu thả xuống */}
        {/* {isMenuOpen && (
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
        </div> */}
      </div>
    </header>
  );
}
