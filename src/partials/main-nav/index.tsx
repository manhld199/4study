"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const currentPath = usePathname(); // Lấy đường dẫn hiện tại

  // Mảng chứa tất cả các liên kết điều hướng
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/course/1", label: "Courses" },
    { href: "/explore", label: "Explore" },
    { href: "/term-of-use", label: "Term of use" },
    { href: "/term-of-service", label: "Term of service" },
    { href: "/about-us", label: "About us" },
  ];

  return (
    <nav className="bg-white shadow-md px-20 py-2">
      <ul className="flex px-5 text-[14px] font-medium leading-[24px] tracking-[0.15px] whitespace-nowrap uppercase h-[45px]">
        {navLinks.map(({ href, label }) => (
          <Link href={href} key={href}>
            <li
              className={`flex justify-center items-center min-w-[96px] max-w-[150px] w-full min-h-[45px] px-6 cursor-pointer ${
                currentPath === href
                  ? "bg-[#5271FF] text-white"
                  : "hover:bg-[#C4CEFF]"
              }`}>
              {label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
