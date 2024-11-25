"use client";

import React, { useState, useEffect } from "react";
import { CardCourseMini } from "@/components"; // Import CardCourseMini
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import css nếu cần
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
interface CourseMiniSliderProps {
  courses: Course[]; // Danh sách các khóa học
}

export const CourseMiniSuggest = ({ courses }: CourseMiniSliderProps) => {
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [searchedCourses, setSearchedCourses] = useState<Course[]>([]); // Danh sách khóa học sau khi tìm kiếm

  useEffect(() => {
    // Giả sử đây là logic tìm kiếm khóa học
    setLoading(true); // Bắt đầu tải
    setTimeout(() => {
      setSearchedCourses(courses); // Sau khi tìm thấy khóa học, cập nhật danh sách khóa học
      setLoading(false); // Kết thúc tải
    }, 3000); // Giả lập thời gian tìm kiếm (ví dụ: 2 giây)
  }, [courses]); // Mỗi khi `courses` thay đổi, chúng ta sẽ gọi lại effect này

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {loading ? (
          // Hiển thị Skeleton khi đang tìm khóa học
          <div className="grid grid-row-3 gap-4 w-full">
            {/* Hiển thị 3 Skeletons */}
            <Skeleton height={120} className="skeleton-custom" />
            <Skeleton height={120} className="skeleton-custom" />
            <Skeleton height={120} className="skeleton-custom" />
          </div>
        ) : searchedCourses.length > 0 ? (
          // Hiển thị các khóa học tìm được
          searchedCourses.map((course, index) => (
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
