"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { courses } from "@/data/courses";
import CardCourse from "@/components/(general)/cards/course";
import { ChevronRight } from "lucide-react";

export default function ProfilePage() {
  // Filtering courses for different sections
  const popularCourses = courses
    .sort((a, b) => a.rank_popular - b.rank_popular)
    .slice(0, 4);
  const personalizedCourses = courses
    .sort((a, b) => a.rank_personalized - b.rank_personalized)
    .slice(0, 4);
  const totalCourses = courses.length;  
  return (
    <div className="">
      <div className="flex justify-center py-4">
        <div className="bg-white w-[1300px] h-[302px] rounded-[18px] shadow-lg p-6">
          <div className="space-y-1">
            <h4 className="text-[32px] text-[#5271FF] font-medium leading-none">
              Dash Board
            </h4>
            <p className="text-[22px] pt-[12px]">
              Discover your study progress
            </p>
          </div>
          <Separator className="my-4" />

          {/* Main flex container with even distribution of space */}
          <div className="flex  justify-between text-sm">
            {/* First column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">Completed Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">
                {totalCourses}
              </div>
              <button
                className="text-blue-500 text-[16px] mt-2 hover:underline text-left"
                onClick={() => {
                  // Scroll đến phần tử mục tiêu, ví dụ: cuộn đến phần "completed-courses"
                  const target = document.getElementById("completed-courses");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                See all
              </button>
            </div>

            {/* Vertical Separator */}
            <Separator
              orientation="vertical"
              className="h-[100px] w-[1px] bg-gray-300 mx-4" // Added fixed height and width
            />

            {/* Second column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">Personalize Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">{126}+</div>
              <button
                className="text-blue-500 text-[16px] mt-2 hover:underline text-left"
                onClick={() => {
                  const target = document.getElementById(
                    "personalized-courses"
                  );
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                See all
              </button>
            </div>

            {/* Vertical Separator */}
            <Separator
              orientation="vertical"
              className="h-[100px] w-[1px] bg-gray-300 mx-4" // Added fixed height and width
            />

            {/* Third column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">Popular Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">{126}+</div>
              <Link
                href="/explore"
                className="text-blue-500 text-[16px] mt-2 hover:underline">
                See all
              </Link>
            </div>

            {/* Vertical Separator */}
            <Separator
              orientation="vertical"
              className="h-[100px] w-[1px] bg-gray-300 mx-4" // Added fixed height and width
            />

            {/* Fourth column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">All Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">
                {totalCourses}+
              </div>
              <Link
                href="/courses"
                className="text-blue-500 text-[16px] mt-2 hover:underline">
                See all
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/*Completed Courses*/}
        <div id="completed-courses">
          <h4 className="text-[32px] text-[#5271FF] font-medium leading-none pt-[30px] pb-[30px]">
            Completed Courses
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {popularCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={false}
              />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 pt-[30px]">
            {popularCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={false}
              />
            ))}
          </div>

          {/* Navigation bar */}
          <div className="pt-[30px] pb-[30px]">Navigation bar</div>
        </div>

        {/* Personalized Courses */}
        <div id="personalized-courses">
          <h4 className="text-[32px] text-[#5271FF] font-medium leading-none pt-[30px] pb-[30px]">
            Personalized Courses
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {personalizedCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={true}
              />
            ))}
          </div>
          <Link
            href="/explore"
            className="text-blue-500 text-[16px] mt-2 hover:underline flex items-center space-x-2 justify-center pb-[50px] pt-[30px]">
            See more
            <ChevronRight className="ml-2 w-[24px] h-[24px] stroke-1" />
          </Link>
        </div>
      </div>

      {/* What Is Your Next? */}
      <div className="w-full">
        <div
          className="bg-[#11009E] left-0 top-0 w-full h-auto p-6"
          style={{ width: "100% !important" }}>
          <h4 className="text-[32px] text-white font-semibold leading-none pb-[30px]">
            What Is Your Next?
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {personalizedCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={true}
              />
            ))}
          </div>
          <Link
            href="/courses"
            className="text-white text-[16px] mt-2 hover:underline flex items-center space-x-2 justify-center pb-[5px] pt-[30px]">
            See more
            <ChevronRight className="ml-2 w-[24px] h-[24px] stroke-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
