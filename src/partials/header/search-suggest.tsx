"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CourseMiniSuggest } from "./course-mini-suggest"; // Import Component CourseMiniSuggest hiển thị khóa học
import { useSession } from "next-auth/react";
import Fuse from "fuse.js";

export default function SearchSuggest({
  suggestions,
}: {
  suggestions: string[]; // Danh sách gợi ý tìm kiếm
}) {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [personalizedCourses, setPersonalizedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allCourses, setAllCourses] = useState<Course[]>([]); // Danh sách tất cả khóa học đã fetch
  const { data: session } = useSession();
  const options = {
    keys: ["course_name"], // Chỉ tìm kiếm trong tên khóa học
    threshold: 0.4, // Độ khớp (0 là khớp hoàn hảo, 1 là không khớp)
  };

  const fusePopular = new Fuse(popularCourses, options);
  const fusePersonalized = new Fuse(personalizedCourses, options);

  // Fetch dữ liệu khóa học
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        // Fetch popular courses
        const popularResponse = await fetch("/api/courses/popularity");
        const popularData = await popularResponse.json();
        setPopularCourses(popularData.data);

        // Fetch personalized courses
        if (session?.user) {
          const personalizedResponse = await fetch("/api/courses/personalized");
          const personalizedData = await personalizedResponse.json();
          setPersonalizedCourses(personalizedData.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    if (session) fetchCourses();
  }, [session]);

  // useEffect(() => {
  //   // Kết hợp cả khóa học phổ biến và khóa học cá nhân hóa vào một danh sách duy nhất
  //   const combinedCourses = [...popularCourses, ...personalizedCourses];
  //   setAllCourses(combinedCourses);
  // }, [popularCourses, personalizedCourses]);
  // const filteredPopularCourses = useMemo(() => {
  //   if (suggestions.length === 0) return []; // Nếu suggestions rỗng, trả về mảng rỗng
  //   return fusePopular.search(suggestions[0]).map((result) => result.item);
  // }, [fusePopular, suggestions]);

  // const filteredPersonalizedCourses = useMemo(() => {
  //   if (suggestions.length === 0) return []; // Nếu suggestions rỗng, trả về mảng rỗng
  //   return fusePersonalized.search(suggestions[0]).map((result) => result.item);
  // }, [fusePersonalized, suggestions]);

  const filteredPopularCourses = useMemo(() => {
    if (suggestions.length === 0 || !popularCourses.length) return []; // Avoid searching when there's no suggestion or courses
    return fusePopular.search(suggestions[0]).map((result) => result.item);
  }, [fusePopular, suggestions, popularCourses]);

  const filteredPersonalizedCourses = useMemo(() => {
    if (suggestions.length === 0 || !personalizedCourses.length) return []; // Avoid searching when there's no suggestion or courses
    return fusePersonalized.search(suggestions[0]).map((result) => result.item);
  }, [fusePersonalized, suggestions, personalizedCourses]);

  const showSuggestions =
    suggestions.length > 0 &&
    (filteredPopularCourses.length > 0 ||
      filteredPersonalizedCourses.length > 0);

  return (
    <div className="absolute top-[100%] left-0 border transform w-full bg-white rounded-[18px] max-w-[700px] max-h-[726px] overflow-y-auto z-50">
      {showSuggestions ? (
        <>
          {/* Hiển thị các khóa học phổ biến và cá nhân hóa */}
          <div>
            <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
              Popular Courses
            </div>
            <div className="max-w-[660px] mx-auto">
              <CourseMiniSuggest courses={filteredPopularCourses} />
            </div>
          </div>

          {/* Hiển thị khóa học cá nhân hóa nếu người dùng đã đăng nhập */}
          {session?.user && (
            <div className="pb-[20px]">
              <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
                Personalized Courses
              </div>
              <div className="max-w-[660px] mx-auto">
                <CourseMiniSuggest courses={filteredPersonalizedCourses} />
              </div>
            </div>
          )}
        </>
      ) : (
        // Chỉ hiển thị "No courses found" khi không có khóa học nào
        <div></div>
      )}
    </div>
  );
}
