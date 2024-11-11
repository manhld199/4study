"use client";

// import libs
import { useState, useEffect } from "react";
import Link from "next/link";
// import components
import { Button } from "../components/ui/button";
import { CardCourse } from "@/components";
import { courses } from "@/data/courses"; // Import dữ liệu từ file data.ts

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        <img
          src="/imgs/homepage-1.png"
          alt=""
          className="w-full h-auto object-cover"
        />
        {/* Nội dung chữ nằm trên hình */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-[50px] justify-center items-start px-[130px] space-y-4 text-left">
          <div className="flex flex-col gap-[15px]">
            <p className="font-regular">100% Quality Courses</p>
            <h1 className="text-4xl font-semibold">
              Find Your Perfect <span className="text-[#5271FF]">Courses</span>
              <br />
              And Improve Your <span className="text-[#5271FF]">Skills</span>
            </h1>
            <p className="font-regular">It’s Time To Get Started With Us</p>
          </div>
          <Link href="/explore">
          <button className="px-6 py-2 bg-[#5271FF] text-white rounded-[18px] hover:bg-[#405DC3]">
            Explore All Courses →
          </button>
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <img
          src="/imgs/homepage-2.png"
          alt=""
          className="w-full h-auto object-cover"
        />
        {/* Phần thông tin nằm trên hình ảnh, ở bên phải */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col gap-[50px] justify-center items-start p-10 bg-white bg-opacity-80 text-left">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[22px]">WHAT'S OUR MAIN GOAL</p>
          <h2 className="text-[32px] font-semibold text-[#5271FF] leading-10">
            Professional Courses For Students
          </h2>
          <p className="">
            In the world that demands constant growth and adaptability, 4STUDY
            is your trusted partner on the journey to success.
          </p>
          </div>
          <Link href="/about-us">
          <button className="px-6 py-2 bg-[#5271FF] text-white rounded-[18px] hover:bg-[#405DC3]">
            More About Us →
          </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[50px] max-w-[1180px] py-[50px] items-center m-auto">
        <div className="flex flex-col gap-[10px] items-center">
          <p className="text-[22px]">POPULAR COURSES</p>
          <h2 className="text-[32px] font-semibold text-[#5271FF] leading-10">Explore 1000+ Free Online Courses</h2>
          <p>
            Select your courses and achieve your professional aspirations with
            4STUDY
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {courses
            .sort((a, b) => b.rank_popular - a.rank_popular) // Sắp xếp theo độ phổ biến
            .slice(0, 3)
            .map((course: Course) => (
              <CardCourse
                key={course._id}
                course={course}
                isPersonalized={false}
              />
            ))}
        </div>
      </div>

      <img src="/imgs/homepage-3.png" alt="" className="w-full h-auto object-cover"/>

      <div className="flex flex-col gap-[50px] max-w-[1180px] py-[50px] items-center m-auto">
        <div className="flex flex-col gap-[10px] items-center">
          <p className="text-[22px]">1000+ DIFFERENT COURSES</p>
          <h2 className="text-[32px] font-semibold text-[#5271FF] leading-10">You May Also Like Following Courses</h2>
          <p>
            Select your courses and achieve your professional aspirations with
            4STUDY
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {courses
            .sort((a, b) => b.rank_popular - a.rank_popular) // Sắp xếp theo độ phổ biến
            .slice(0, 4)
            .map((course: Course) => (
              <CardCourse
                key={course._id}
                course={course}
                isPersonalized={false}
              />
            ))}
        </div>
      </div>
    </>
  );
}