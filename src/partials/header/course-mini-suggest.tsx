"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Component Button của bạn
import { CardCourseMini } from "@/components"; // Component CardCourse hiển thị khóa học

interface CourseMiniSliderProps {
  courses: Course[]; // Prop truyền vào danh sách các khóa học
}

export const CourseMiniSuggest = ({ courses }: CourseMiniSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ mục của khóa học hiện tại
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]); // Mảng chứa các khóa học cần hiển thị

  const coursesPerPage = 3; // Mỗi lần hiển thị 3 khóa học

  // Sử dụng useEffect để cập nhật danh sách các khóa học cần hiển thị
  useEffect(() => {
    const limitedCourses = courses.slice(0, 15); // Giới hạn chỉ lấy 20 khóa học đầu tiên
    setDisplayedCourses(limitedCourses); // Cập nhật danh sách khóa học cần hiển thị
  }, [courses]);

  // Hàm để lấy 3 khóa học hiển thị tại 1 thời điểm (bao gồm cả lặp lại nếu cần)
  const getCoursesForDisplay = () => {
    const coursesToDisplay = [];
    for (let i = 0; i < coursesPerPage; i++) {
      const index = (currentIndex + i) % displayedCourses.length; // Nếu index vượt qua số khóa học, quay lại đầu
      coursesToDisplay.push(displayedCourses[index]);
    }
    return coursesToDisplay;
  };

  return (
    <div className="w-full">
      <div className="">
        {/* Hiển thị các khóa học với grid, chỉ hiển thị 3 khóa học tại một thời điểm */}
        <div className="flex flex-col space-y-4">
          {/* Thêm padding-top để tránh nút mũi tên đè lên khóa học */}
          {getCoursesForDisplay().map((course, index) => (
            <CardCourseMini
              key={`course-card-${index}`}
              course={course}
              isPersonalized={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
