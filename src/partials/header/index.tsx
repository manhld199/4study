"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import coursesData from "../../../database/preprocessed-data/course.json";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import SearchSuggest from "./search-suggest";
import { usePathname } from "next/navigation";
import debounce from "lodash.debounce"; // Correct import for debounce

export default function Header() {
  const currentUrl = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    signOut();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false); // Ẩn gợi ý khi nhấn ra ngoài
      }
    };

    // Thêm event listener khi component mount
    document.addEventListener("mousedown", handleClickOutside);

    // Xóa event listener khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>(""); // Lưu trữ giá trị tìm kiếm
  const [suggestions, setSuggestions] = useState<string[]>([]); // Lưu trữ danh sách gợi ý
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true); // Quản lý hiển thị gợi ý

  useEffect(() => {
    // Chỉ hiển thị gợi ý nếu có suggestions
    setShowSuggestions(suggestions.length > 0);
  }, [suggestions]);

  useEffect(() => {
    setShowSuggestions(false); // Ẩn gợi ý khi chuyển trang
  }, [currentUrl]); // Theo dõi thay đổi URL

  // Hàm gọi API để lấy khóa học
  const fetchCourses = async (query: string) => {
    try {
      const response = await fetch(`/api/courses/popularity`); // Thay đổi API endpoint tại đây
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      return data.data
        .map((course: { course_name: string }) => course.course_name) // Chỉ lấy tên khóa học
        .filter((courseName: string) =>
          courseName.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };

  // Xử lý khi người dùng chọn một gợi ý
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setIsSubmitting(false);
    setShowSuggestions(false);
  };

  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      const filteredSuggestions = await fetchCourses(query);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    }, 300) // Giảm thời gian debounce
  ).current;

  // Hàm tìm kiếm gợi ý
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Cập nhật giá trị tìm kiếm

    if (query.length > 0) {
      // Nếu có giá trị tìm kiếm, gọi API để tìm kiếm gợi ý
      // const filteredSuggestions = await fetchCourses(query);
      // setSuggestions(filteredSuggestions);
      // setShowSuggestions(filteredSuggestions.length > 0);
      debouncedSearch(query);
    } else {
      setSuggestions([]); // Nếu không có gì nhập, xóa gợi ý
      setShowSuggestions(false);
    }
  };
  // Xử lý sự kiện khi người dùng nhấn "Search"
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngừng form gửi đi khi nhấn Enter hoặc submit

    // Logic xử lý tìm kiếm, nếu bạn cần lấy giá trị từ input
    if (searchQuery.length > 0) {
      debouncedSearch(searchQuery); // Gọi hàm tìm kiếm đã debounce
    } else {
      setSuggestions([]); // Xóa gợi ý khi không có từ khóa tìm kiếm
      setShowSuggestions(false); // Ẩn gợi ý khi không có từ khóa tìm kiếm
    }
  };

  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("Session:", session);
  console.log("Status:", status);

  useEffect(() => {
    if (status === "loading") return;
    if (!session && currentUrl === "/dash-board") {
      router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
    }
  }, [session, status, router, currentUrl]);

  // useEffect(() => {
  //   const handleClickOutMenuDropdown = (event: MouseEvent) => {
  //     // Kiểm tra nếu click ngoài menu thì đóng menu
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   // Thêm event listener khi component mount
  //   document.addEventListener("mousedown", handleClickOutMenuDropdown);

  //   // Xóa event listener khi component unmount
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutMenuDropdown);
  //   };
  // }, []);

  if (!session) {
    return (
      <header className="z-20 bg-white pt-[24px] fixed top-0 left-0 right-0">
        <div className="w-4/5 m-auto h-20 flex items-center justify-between px-5">
          {/* Logo */}
          <Link href="/">
            <img src="/imgs/Logo.png" alt="Logo" className="h-16" />
          </Link>

          {/* Search bar */}
          <form
            id="search-bar"
            onSubmit={handleSearch}
            className="relative flex items-center justify-between w-full max-w-[480px] min-w-[700px] border-[#D9D9D9] border-[1.4px] rounded-[18px] px-1 min-h-12  bg-opacity-50">
            <FiSearch className="min-w-[30px] min-h-[30px] p-[7px] rounded-full stroke-[#5271FF]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Find Your Courses..."
              className="w-full border-0 outline-none bg-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
            />
            <Link href={`/search?keyword=${searchQuery}`}>
              <Button
                type="submit"
                className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 hover:bg-[#11009E]">
                {isSubmitting ? "Submitting..." : "Search"}
              </Button>
            </Link>
            {/* Hiển thị gợi ý tìm kiếm */}
            {showSuggestions && suggestions.length > 0 && (
              <div ref={suggestionsRef}>
                <SearchSuggest suggestions={suggestions} />
              </div>
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
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white pt-[24px] fixed top-0 left-0 right-0 z-20">
      <div className="w-4/5 m-auto h-20 flex items-center justify-between px-5">
        {/* Logo */}
        <Link href="/">
          <img src="/imgs/Logo.png" alt="Logo" className="h-16" />
        </Link>

        {/* Search bar */}
        <form
          id="search-bar"
          onSubmit={handleSearch}
          className="relative flex items-center justify-between w-full max-w-[480px] min-w-[700px] border-[#D9D9D9] border-[1.4px] rounded-[18px] px-1 min-h-12  bg-opacity-50">
          <FiSearch className="min-w-[30px] min-h-[30px] p-[7px] rounded-full stroke-[#5271FF]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Find Your Courses..."
            className="w-full border-0 outline-none bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
          />
          <Link href={`/search?keyword=${searchQuery}`}>
            <Button
              type="submit"
              className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 hover:bg-[#11009E]">
              {isSubmitting ? "Submitting..." : "Search"}
            </Button>
          </Link>
          {/* Hiển thị gợi ý tìm kiếm */}
          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionsRef}>
              <SearchSuggest suggestions={suggestions} />
            </div>
          )}
        </form>
        {/* Khi chưa có account */}
        {/* <div>
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
        </div> */}

        {/* My Courses Button và Avatar */}
        <div className="flex items-center relative">
          <img
            ref={avatarRef}
            src={session.user?.image}
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
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="w-[290px] absolute top-12 right-0 bg-white shadow-2xl rounded-lg p-3 w-auto min-w-max z-50">
              <div className="flex items-center mb-3 gap-2 w-full">
                <img
                  src={session.user?.image}
                  alt="Avatar"
                  className="h-[60px] w-[60px] rounded-full"
                />
                <div className="pl-[10px] pb-[20px] flex-grow">
                  <p className="font-medium">{session.user?.name}</p>
                  <p className="text-sm text-gray-500 break-all">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="w-full text-left text-white bg-[#5271FF] rounded-[18px] h-[40px] hover:bg-[#11009E] pt-[30px] font-medium py-1">
                Log out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
