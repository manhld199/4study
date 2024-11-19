"use client";

import React, { useState, useEffect } from "react";
import { CardCourseMini } from "@/components"; // Import CardCourseMini

interface CourseMiniSliderProps {
  courses: Course[]; // Danh sách các khóa học
}

export const CourseMiniSuggest = ({ courses }: CourseMiniSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ mục của khóa học hiện tại
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]); // Mảng chứa các khóa học cần hiển thị

  const coursesPerPage = 3; // Số khóa học hiển thị mỗi lần

  // Sử dụng useEffect để cập nhật danh sách các khóa học cần hiển thị
  useEffect(() => {
    const limitedCourses = courses?.slice(0, 15); // Lấy 15 khóa học đầu tiên
    setDisplayedCourses(limitedCourses); // Cập nhật danh sách khóa học cần hiển thị
  }, [courses]);

  // Hàm để lấy 3 khóa học hiển thị tại 1 thời điểm
  const getCoursesForDisplay = () => {
    const coursesToDisplay = [];
    for (let i = 0; i < coursesPerPage; i++) {
      if (displayedCourses && displayedCourses.length > 0) {
        const index = (currentIndex + i) % displayedCourses.length; // Đảm bảo chỉ số không vượt quá độ dài mảng
        // Kiểm tra thêm để tránh truy cập vào phần tử không tồn tại
        if (displayedCourses[index] !== undefined) {
          coursesToDisplay.push(displayedCourses[index]);
        } else {
          // Xử lý khi phần tử không tồn tại tại vị trí `index` (nếu có)
          coursesToDisplay.push(null); // Hoặc một giá trị thay thế phù hợp
        }
      } else {
        // Nếu không có khóa học để hiển thị, đẩy giá trị mặc định vào
        coursesToDisplay.push(null); // Hoặc một giá trị mặc định khác
      }
    }
    return coursesToDisplay;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Hiển thị các khóa học dưới dạng mini card */}
        {getCoursesForDisplay().map((course, index) => (
          <CardCourseMini
            key={`course-card-${index}`}
            course={course}
            isPersonalized={false} // Có thể thay đổi nếu cần
          />
        ))}
      </div>
    </div>
  );
};
