"use client";

import { useSession } from "next-auth/react"; 
// import libs
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import { Button } from "../components/ui/button";
import { CardCourse } from "@/components";
import { courses } from "@/data/courses"; // Import dữ liệu từ file data.ts

const images: string[] = ["/imgs/test.jpg", "/imgs/test.jpg", "/imgs/test.jpg"];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data: session, status } = useSession(); // Get session data and status

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

  return (
    <>
      <div className="relative h-[450px] overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Nút Tìm hiểu ngay */}
        <Link
          href="/explore"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow hover:bg-[#C4CEFF]">
          Tìm hiểu ngay
        </Link>

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

      <div>
        <div className="font-bold text-xl pt-5 text-[#11009E]">NEW COURSES</div>

        <div className="grid grid-cols-4 gap-4 pt-4">
          {courses.slice(0, 8).map((course: Course) => (
            <CardCourse
              key={course._id}
              course={course}
              isPersonalized={true}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold text-xl text-[#11009E] pt-5">
          POPULAR COURSES
        </div>
        <div className="grid grid-cols-4 gap-4 pt-4">
          {courses
            .sort((a, b) => b.rank_popular - a.rank_popular) // Sắp xếp theo độ phổ biến
            .slice(0, 8)
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


