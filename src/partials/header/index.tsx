"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import coursesData from "../../../database/preprocessed-data/course.json";
import { usePathname } from "next/navigation";

export default function Header() {
  const currentUrl = usePathname();
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

  const [searchQuery, setSearchQuery] = useState<string>(""); // Lưu trữ giá trị tìm kiếm
  const [suggestions, setSuggestions] = useState<string[]>([]); // Lưu trữ danh sách gợi ý
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hàm tìm kiếm gợi ý
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Tìm kiếm các khóa học phù hợp với truy vấn
      const filteredSuggestions = coursesData
        .map((course) => course.course_name) // Chỉ lấy tên khóa học
        .filter((courseName) =>
          courseName.toLowerCase().includes(query.toLowerCase())
        );

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Nếu không có gì nhập, xóa gợi ý
    }
  };

  // Xử lý khi người dùng chọn một gợi ý
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion); // Cập nhật input thành gợi ý đã chọn
    setSuggestions([]); // Ẩn danh sách gợi ý
  };

  // Xử lý sự kiện khi người dùng nhấn "Search"
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSubmitting(true);
      // Bạn có thể thực hiện tìm kiếm qua API hoặc chuyển hướng sang trang tìm kiếm
      console.log("Searching for:", searchQuery); // Tìm kiếm với query
      setIsSubmitting(false);
      setSuggestions([]); // Xóa gợi ý sau khi tìm kiếm
    }
  };

  return (
    <header className="bg-white pt-[24px]">
      <div className="w-4/5 m-auto h-20 flex items-center justify-between px-5">
        {/* Logo */}
        <Link href="/">
          <img src="/imgs/Logone.png" alt="Logo" className="h-16" />
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-between w-full max-w-[480px] min-w-[700px] border-[#D9D9D9] border-[1.4px] rounded-[18px] px-1 min-h-12  bg-opacity-50">
          <FiSearch className="min-w-[30px] min-h-[30px] p-[7px] rounded-full stroke-[#5271FF]" />
          <input
            type="text"
            placeholder="Find Your Courses..."
            className="w-full border-0 outline-none bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Link href={`/search?keyword=${searchQuery}`}>
            <Button
              type="submit"
              className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 hover:bg-[#11009E]">
              {isSubmitting ? "Submitting..." : "Search"}
            </Button>
          </Link>
          {/* Hiển thị gợi ý tìm kiếm */}
          {suggestions.length > 0 && (
            <ul className="absolute top-[100%] left-0 w-full bg-white border border-[#D9D9D9] rounded-[12px] max-h-[200px] overflow-y-auto z-50">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-[#f0f0f0]"
                  onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </form>
        {/* Khi chưa có account */}
        <div>
          <Link
            href={{
              pathname: "/login", 
              query: { returnUrl: currentUrl }, 
            }}>
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
        {/*
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-12 right-0 bg-white shadow-2xl rounded-lg p-3 w-auto min-w-max z-50">
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
                className="w-full text-left text-white bg-[#5271FF] rounded-[50px] hover:bg-[#11009E] font-medium py-1 rounded-md">
                LOG OUT
              </Button>
            </div>
          )}
        </div> */}
      </div>
    </header>
  );
}
