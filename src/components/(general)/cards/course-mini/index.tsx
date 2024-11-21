import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function CardCourseMini({
  course,
  className = "",
}: {
  course: Course;
  className?: string;
  isPersonalized: boolean;
}) {
  return (
    <Link
      href={`/course/${course?._id}`}
      target="_blank"
      className={`relative cursor-pointer w-full border-[1px] border-[#D4D1D1] rounded-[18px] flex flex-row gap-5 overflow-hidden bg-white hover:shadow-lg p-[15px] ${className}`}>
      {/* Hình ảnh khóa học - chiếm 1/3 chiều rộng thẻ */}
      <div className="w-1/3 flex relative overflow-hidden">
        <img
          src={course?.course_img}
          alt={course?.course_name}
          className="w-24 h-24 rounded-[18px] object-cover"
        />
      </div>

      {/* Thông tin khóa học - chiếm 2/3 chiều rộng thẻ */}
      <div className="w-2/3 flex flex-col gap-[10px]">
        <h5 className="text-[#5271FF] font-medium text-lg truncate capitalize">
          {course?.course_name}
        </h5>
        <p className="text-sm">
          <span className="capitalize">{course?.school.school_name}</span> |{" "}
          {course?.teachers.slice(0, 1).map((teacher, index) => (
            <span key={`teacher ${index}`} className="ml-1 capitalize">
              {teacher.teacher_name}
            </span>
          ))}
          {course?.teachers.length > 1 && (
            <span className="text-gray-500 ml-1">
              +{course.teachers.length - 1}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
