"use client";

// import libs
import React, { useEffect, useState } from "react";
import { CardCourse } from "@/components"; // Component CardCourse hiển thị khóa học
import { CourseMiniSuggest } from "./course-mini-suggest"; 
import { useSession } from "next-auth/react";

export default function SearchSuggest() {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [persionalizedCourses, setPersionalizedCourses] = useState<Course[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch dữ liệu khóa học
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const popularResponse = await fetch("/api/courses/popularity", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const popularData = await popularResponse.json();
        setPopularCourses(popularData.data);

        // Fetch persionalized courses
        const personalizedResponse = await fetch("/api/courses/personalized", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const persionalizedData = await personalizedResponse.json();
        setPersionalizedCourses(persionalizedData.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="absolute top-[100%] border transform translate-x-[710px] w-full w-full bg-white rounded-[18px] max-w-[700px] overflow-y-auto z-50">
      {/* Popular courses */}
      <div>
        <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
          Popular Courses
        </div>
        <div className="max-w-[660px] mx-auto">
          <CourseMiniSuggest courses={popularCourses} />
        </div>
      </div>
      {/* Personalized courses */}
      <div className="pb-[20px]">
        <div className="text-[22px] text-[#5271FF] font-medium leading-none p-[20px]">
          Personalized Courses
        </div>
        <div className="max-w-[660px] mx-auto">
          <CourseMiniSuggest courses={persionalizedCourses} />
        </div>
      </div>
    </div>
  );
}
