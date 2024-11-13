"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardCourse, CardCourseMini } from "@/components";
import { CourseMiniSlider } from "@/components/(general)/cards/course-mini-slider";
import { CourseSlider } from "@/components/(general)/course-slider";

export default function Home() {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
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

        // Fetch other courses
        const otherResponse = await fetch("/api/courses/all-course", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const otherData = await otherResponse.json();
        setOtherCourses(otherData.data);
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
      {/* Phần ảnh nền và nội dung chữ */}
      <div className="relative overflow-hidden">
        <img
          src="/imgs/homepage-1.png"
          alt="Home page"
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-[50px] justify-center items-start px-[130px] text-left">
          <div className="flex flex-col gap-[15px]">
            <p className="font-regular">100% Quality Courses</p>
            <h1 className="text-4xl font-semibold">
              Find Your Perfect <span className="text-[#5271FF]">Courses</span>
              <br />
              And Improve Your <span className="text-[#5271FF]">Skills</span>
            </h1>
            <p className="font-regular">
              It&apos;s Time To Get Started With Us
            </p>
          </div>
          <Link href="/explore">
            <Button className="px-6 py-2 bg-[#5271FF] text-white rounded-[18px] hover:bg-[#405DC3]">
              Explore All Courses →
            </Button>
          </Link>
        </div>
      </div>

      {/* Phần nội dung khác */}
      <div className="relative overflow-hidden">
        <img
          src="/imgs/homepage-2.png"
          alt="Home page"
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col gap-[50px] justify-center items-start p-10 bg-white bg-opacity-80 text-left">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[22px]">WHAT&apos;S OUR MAIN GOAL</p>
            <h2 className="text-[32px] font-semibold text-[#5271FF] leading-10">
              Professional Courses For Students
            </h2>
            <p>
              In the world that demands constant growth and adaptability, 4STUDY
              is your trusted partner on the journey to success.
            </p>
          </div>
          <Link href="/about-us">
            <Button className="px-6 py-2 bg-[#5271FF] text-white rounded-[18px] hover:bg-[#405DC3]">
              More About Us →
            </Button>
          </Link>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="flex flex-col gap-[50px] max-w-[1180px] py-[50px] items-center m-auto">
        <div className="flex flex-col gap-[10px] items-center">
          <p className="text-[22px]">POPULAR COURSES</p>
          <h2 className="text-[32px] font-semibold text-[#5271FF] leading-10">
            Explore 1000+ Free Online Courses
          </h2>
          <p>
            Select your courses and achieve your professional aspirations with
            4STUDY
          </p>
        </div>

        {loading ? (
          <p>Loading popular courses...</p>
        ) : (
          <CourseMiniSlider courses={popularCourses} />
        )}
      </div>

      <img
        src="/imgs/homepage-3.png"
        alt="Home page"
        className="w-full h-auto object-cover"
      />

      {/* Recommended Courses Section */}
      <div className="flex flex-col gap-[50px] max-w-[1180px] py-[50px] items-center m-auto">
        <div className="flex flex-col gap-[10px] items-center">
          <p className="text-[22px]">1000+ DIFFERENT COURSES</p>
          <h2 className="text-[32px] font-semibold text-[#5271FF] leading-10">
            You May Also Like Following Courses
          </h2>
          <p>
            Select your courses and achieve your professional aspirations with
            4STUDY
          </p>
        </div>

        {loading ? (
          <p>Loading recommended courses...</p>
        ) : (
          <CourseSlider courses={otherCourses} />
        )}
      </div>
    </>
  );
}
