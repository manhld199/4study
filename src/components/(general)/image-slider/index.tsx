"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Nếu bạn có component Button
import Link from "next/link";

// Mảng chứa các hình ảnh để hiển thị trên slider
const images: string[] = [
  "/imgs/explore-1.png",
  "/imgs/explore-2.png",
  "/imgs/explore-3.png",
];

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Hàm chuyển đến slide tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Hàm chuyển về slide trước
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer); // Clean up
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      {/* Các slide hình ảnh */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
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
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-[#FFE3FA] bg-opacity-50 text-white p-2 rounded-full w-10 h-10 hover:bg-[#C4CEFF] flex items-center justify-center z-10"
      >
        ❮
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-[#FFE3FA] bg-opacity-50 text-white p-2 rounded-full w-10 h-10 hover:bg-[#C4CEFF] flex items-center justify-center z-10"
      >
        ❯
      </Button>

      {/* Chấm điều hướng */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`block w-2 h-2 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-[#5271FF]" : "bg-white"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};
