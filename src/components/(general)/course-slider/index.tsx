"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Component Button của bạn
import { CardCourse } from "@/components"; // Component CardCourse hiển thị khóa học
import { Course } from "@/libs/models"; // Định nghĩa kiểu Course

interface CourseSliderProps {
  courses: Course[]; // Prop truyền vào danh sách các khóa học
}

export const CourseSlider = ({ courses }: CourseSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ mục của khóa học hiện tại
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]); // Mảng chứa các khóa học cần hiển thị

  const coursesPerPage = 4; // Mỗi lần hiển thị 4 khóa học

  // Sử dụng useEffect để cập nhật danh sách các khóa học cần hiển thị
  useEffect(() => {
    const limitedCourses = courses.slice(0, 20); // Giới hạn chỉ lấy 20 khóa học đầu tiên
    setDisplayedCourses(limitedCourses); // Cập nhật danh sách khóa học cần hiển thị
  }, [courses]);

  // Sử dụng useEffect để tự động di chuyển mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Chuyển sang khóa học tiếp theo và nếu tới cuối thì quay lại đầu
        return (prevIndex + 1) % displayedCourses.length;
      });
    }, 2000); // 3000 ms = 3 giây

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [displayedCourses.length]);

  // Hàm để lấy 4 khóa học hiển thị tại 1 thời điểm (bao gồm cả lặp lại nếu cần)
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
      <div className="relative">
        {/* Nút điều hướng - Đặt chúng ngay trên vùng chứa grid khóa học */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center p-4 z-10">
          <Button
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + displayedCourses.length) % displayedCourses.length)}
            className="bg-[#5271FF] text-white p-4 rounded-full"
          >
            ❮
          </Button>
          <Button
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedCourses.length)}
            className="bg-[#5271FF] text-white p-4 rounded-full"
          >
            ❯
          </Button>
        </div>

        {/* Hiển thị các khóa học với grid, chỉ hiển thị 4 khóa học tại một thời điểm */}
        <div className="grid grid-cols-4 gap-4"> {/* Thêm padding-top để tránh nút mũi tên đè lên khóa học */}
          {/* Hiển thị 4 khóa học tại 1 thời điểm */}
          {getCoursesForDisplay().map((course, index) => (
            <CardCourse key={`course-card-${index}`} course={course} isPersonalized={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
