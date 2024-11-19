"use client";

import React, { useState, useEffect } from "react";
import { CardCourseMini } from "@/components"; // Import CardCourseMini

interface CourseMiniSliderProps {
  courses: Course[]; // Danh sách các khóa học
}

export const CourseMiniSuggest = ({ courses }: CourseMiniSliderProps) => {
  // Không cần quản lý currentIndex hay việc giới hạn số lượng nữa
  console.log("Rendering courses:", courses);
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Hiển thị tất cả các khóa học dưới dạng mini card */}
        {courses && courses.length > 0 ? (
          courses.map((course, index) => (
            <CardCourseMini
              key={`course-card-${index}`}
              course={course}
              isPersonalized={false} // Có thể thay đổi nếu cần
            />
          ))
        ) : (
          <div>No courses found</div> // Hiển thị khi không có khóa học
        )}
      </div>
    </div>
  );
};
