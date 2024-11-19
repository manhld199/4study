"use client";

import React, { useState, useEffect } from "react";
import { CourseMiniSuggest } from "./course-mini-suggest"; // Import Component CourseMiniSuggest hiển thị khóa học
import { useSession } from "next-auth/react";

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
        const personalizedResponse = await fetch("/api/courses/personalized");
        const personalizedData = await personalizedResponse.json();
        setPersonalizedCourses(personalizedData.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [session]);

  useEffect(() => {
    // Kết hợp cả khóa học phổ biến và khóa học cá nhân hóa vào một danh sách duy nhất
    const combinedCourses = [...popularCourses, ...personalizedCourses];
    setAllCourses(combinedCourses);
  }, [popularCourses, personalizedCourses]);

  const showSuggestions = suggestions.length > 0 || allCourses.length > 0;

  return (
    <div className="absolute top-[100%] left-0 border transform w-full bg-white rounded-[18px] max-w-[700px] max-h-[726px] overflow-y-auto z-50">
      {showSuggestions && (
        <>
          {/* Hiển thị các khóa học phổ biến và cá nhân hóa */}
          <div>
            <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
              Popular Courses
            </div>
            <div className="max-w-[660px] mx-auto">
              <CourseMiniSuggest
                courses={popularCourses.filter((course) =>
                  course.course_name
                    .toLowerCase()
                    .includes(suggestions[0].toLowerCase())
                )}
              />
            </div>
          </div>

          {/* Hiển thị khóa học cá nhân hóa nếu người dùng đã đăng nhập */}
          {session?.user && (
            <div className="pb-[20px]">
              <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
                Personalized Courses
              </div>
              <div className="max-w-[660px] mx-auto">
                <CourseMiniSuggest
                  courses={personalizedCourses.filter((course) =>
                    course.course_name
                      .toLowerCase()
                      .includes(suggestions[0].toLowerCase())
                  )}
                  // Truyền hàm callback để xử lý khi người dùng nhấp vào khóa học
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
