"use client";

// import libs
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import { Button } from "@/components/ui/button";
import { CardCourse } from "@/components";
import { courses } from "@/data/courses"; // Import dữ liệu từ file data.ts

const images: string[] = [
  "/imgs/explore-1.png",
  "/imgs/explore-2.png",
  "/imgs/explore-3.png",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, []);


    // Filtering courses for different sections
    const popularCourses = courses
    .sort((a, b) => a.rank_popular - b.rank_popular)
    .slice(0, 4);
  const personalizedCourses = courses
    .sort((a, b) => a.rank_personalized - b.rank_personalized)
    .slice(0, 4);
  const schoolCourses = courses
    .filter((course) => course.school._id === "1")
    .slice(0, 4); // Adjust school ID as needed
  const teacherCourses = courses
    .filter((course) => course.teachers.some((teacher) => teacher._id === "1"))
    .slice(0, 4); // Adjust teacher ID as needed

  return (
    <>
      {/* Slider */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-screen h-full object-cover"
            />
          ))}
        </div>

        {/* Nút điều hướng */}
        <Button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-[#FFE3FA] bg-opacity-50 text-white p-2 rounded-full w-10 h-10 hover:bg-[#C4CEFF] flex items-center justify-center">
          ❮
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-[#FFE3FA] bg-opacity-50 text-white p-2 rounded-full w-10 h-10 hover:bg-[#C4CEFF] flex items-center justify-center">
          ❯
        </Button>

        {/* Chấm điều hướng */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`block w-2 h-2 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-[#5271FF]" : "bg-white"
              }`}></span>
          ))}
        </div>
      </div>

      {/* Course Sections */}
      <section className="py-[50px] flex flex-col gap-[30px] max-w-[1180px] justify-center items-center m-auto">
        {/* Popular Courses */}
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px]">
            Popular Courses
          </h2>
          <div className="grid grid-cols-4 gap-[15px] px-[27.5px]">
            {popularCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                isPersonalized={false}
              />
            ))}
          </div>
        </div>

        {/* Personalized Courses */}
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px]">
            Personalized Courses
          </h2>
          <div className="grid grid-cols-4 gap-[15px] px-[27.5px]">
            {personalizedCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                isPersonalized={true}
              />
            ))}
          </div>
        </div>

        {/* School-Based Courses */}
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px]">
            Courses by School
          </h2>
          <div className="grid grid-cols-4 gap-[15px] px-[27.5px]">
            {schoolCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                isPersonalized={false}
              />
            ))}
          </div>
        </div>

        {/* Teacher-Based Courses */}
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px]">
            Courses by Teacher
          </h2>
          <div className="grid grid-cols-4 gap-[15px] px-[27.5px]">
            {teacherCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                isPersonalized={false}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}