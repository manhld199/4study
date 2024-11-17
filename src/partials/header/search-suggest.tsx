"use client";

// import libs
import React, { useEffect, useState } from "react";
import { CourseMiniSuggest } from "./course-mini-suggest"; // Component CourseMiniSuggest hiển thị khóa học
import { useSession } from "next-auth/react";

export default function SearchSuggest({
  suggestions,
}: {
  suggestions: string[];
}) {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [personalizedCourses, setPersonalizedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, []);

  const showSuggestions = suggestions.length > 0;

  return (
    <div className="absolute top-[100%] border transform w-full bg-white rounded-[18px] max-w-[700px] max-h-[726px] overflow-y-auto z-50">
      {showSuggestions && (
        <>
          {/* Hiển thị khóa học phổ biến */}
          <div>
            <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
              Popular Courses
            </div>
            <div className="max-w-[660px] mx-auto">
              <CourseMiniSuggest courses={popularCourses} />
            </div>
          </div>

          {/* Hiển thị khóa học được cá nhân hóa */}
          <div className="pb-[20px]">
            <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
              Personalized Courses
            </div>
            <div className="max-w-[660px] mx-auto">
              <CourseMiniSuggest courses={personalizedCourses} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
