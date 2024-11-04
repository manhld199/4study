"use client";

// import libs
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import { Button } from "../components/ui/button";

const images = ["/imgs/test.jpg", "/imgs/test.jpg", "/imgs/test.jpg"];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="relative mx-[100px] h-[450px] overflow-hidden">
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

      <div className="mx-[100px]">
        <div className="font-bold text-xl pt-4 text-[#11009E]">NEW COURSES</div>

        <div className="grid grid-cols-4 gap-4 py-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-gray-300 flex items-center justify-center h-[290px] rounded-md">
              Khóa học
            </div>
            // <CardCourse key={i} />
          ))}
        </div>
      </div>
      <div className="mx-[100px]">
        <div className="font-bold text-xl text-[#11009E]">POPULAR COURSES</div>
        <div className="grid grid-cols-4 gap-4 py-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-gray-300 flex items-center justify-center h-[290px] rounded-md">
              Khóa học
            </div>
            // <CardCourse key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
