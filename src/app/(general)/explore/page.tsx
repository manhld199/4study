"use client";

import { useState, useEffect } from "react";
import { ImageSlider } from "@/components/(general)/image-slider"; // Import ImageSlider
import { CourseSlider } from "@/components/(general)/course-slider"; // Import CourseSlider
import Link from "next/link";

export default function Home() {
  // State để lưu các khóa học
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [personalizedCourses, setPersonalizedCourses] = useState<any[]>([]);
  const [teacherCourses, setTeacherCourses] = useState<any[]>([]);
  const [schoolCourses, setSchoolCourses] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Fetch dữ liệu cho 4 mục
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        // Fetch popular courses
        const popularResponse = await fetch("/api/courses/popularity", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const popularData = await popularResponse.json();
        setPopularCourses(popularData.data);

        // Fetch personalized courses
        const personalizedResponse = await fetch("/api/courses/personalized", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const personalizedData = await personalizedResponse.json();
        setPersonalizedCourses(personalizedData.data);

        // Fetch courses by teacher
        const teacherResponse = await fetch("/api/courses/teacher", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const teacherData = await teacherResponse.json();
        setTeacherCourses(teacherData.data.courses);

        // Fetch courses by school
        const schoolResponse = await fetch("/api/courses/school", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const schoolData = await schoolResponse.json();
        setSchoolCourses(schoolData.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      {/* Image Slider */}
      <ImageSlider />

      {/* Course Slider */}
      <section className="py-[50px] flex flex-col gap-[30px] max-w-[1180px] justify-center items-center m-auto">
        {/* Personalized Courses */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Personalized Courses
          </h2>
          {loading ? (
            <p>Loading personalized courses...</p>
          ) : personalizedCourses?.length > 0 ? (
            <CourseSlider courses={personalizedCourses} />
          ) : (
            <p>
              No personalized courses available at the moment.&nbsp;
              <Link href="/login" className="underline text-[#5271FF]">
                Log in right now
              </Link>
            </p>
          )}
        </div>

        {/* Popular Courses */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Popular Courses
          </h2>
          {loading ? (
            <p>Loading popular courses...</p>
          ) : popularCourses?.length > 0 ? (
            <CourseSlider courses={popularCourses} />
          ) : (
            <p>No popular courses available at the moment.</p>
          )}
        </div>

        {/* Courses by Teacher */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Courses by Teacher with Top
          </h2>
          {loading ? (
            <p>Loading teacher courses...</p>
          ) : teacherCourses.length > 0 ? (
            <CourseSlider courses={teacherCourses} />
          ) : (
            <p>No teacher courses available at the moment.</p>
          )}
        </div>

        {/* Courses by School */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Courses by School with Top
          </h2>
          {loading ? (
            <p>Loading school courses...</p>
          ) : schoolCourses.length > 0 ? (
            <CourseSlider courses={schoolCourses} />
          ) : (
            <p>No school courses available at the moment.</p>
          )}
        </div>
      </section>
    </>
  );
}
