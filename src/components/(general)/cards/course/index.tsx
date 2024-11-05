// import libs
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

// import components
import { Badge } from "@/components/ui/badge";

interface Course {
  _id: string;
  course_name: string;
  course_img: string;
  course_about: string;
  course_videos: string[];
  school: {
    _id: string;
    school_name: string;
    school_img: string;
    school_about: string;
  };
  teachers: {
    _id: string;
    teacher_name: string;
    teacher_img: string;
    teacher_about: string;
  }[];
  rank_popular: number;
  rank_personalized: number;
}

export default function CardCourse({
  course,
  className = "",
  isPersonalized = true,
}: {
  course: Course;
  className?: string;
  isPersonalized: boolean;
}) {
  return (
    <Link
      href={`/course/${course._id}`}
      target="_blank"
      className={`cursor-pointer w-full border-2 rounded-lg flex flex-col gap-2 items-center overflow-hidden bg-white hover:bg-pri3/30 ${className}`}
    >
      <div className="relative w-full">
        <div className="relative w-full aspect-[10/3]">
          <Image
            src={course.course_img}
            alt={course.course_name}
            className="object-cover rounded-t-md border-b-2"
            fill
          />
        </div>

        {isPersonalized && (
          <div
            className="absolute top-0 left-0 w-12 h-12 bg-pri2"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          >
            <Star fill="yellow" strokeWidth={0} className="mt-1 ml-[2px]" />
          </div>
        )}

        <div className="absolute left-2 bottom-2 w-1/3">
          <div className="relative w-full aspect-[10/5]">
            <Image
              src={course.school.school_img}
              alt={course.school.school_name}
              className="object-cover rounded-lg shadow-sm shadow-zinc-800"
              fill
            />
          </div>
        </div>
        <div className="absolute w-1/3 right-2 bottom-2">
          {course.teachers.slice(0, 2).map((teacher, index) => (
            <div
              key={`course teacher ${course._id} ${index}`}
              className="w-full mt-2">
              <div className="relative w-full aspect-[10/5]">
                <Image
                  src={teacher.teacher_img}
                  alt={teacher.teacher_name}
                  className="object-cover rounded-lg shadow-sm shadow-zinc-800"
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pb-2 flex flex-col gap-1">
        <div className="px-3 flex flex-row justify-between">
          <div className="flex flex-row gap-1 flex-wrap">
            {course.teachers.slice(0, 2).map((teacher, index) => (
              <Badge
                key={`badge ${course._id} teacher ${index}`}
                className="w-fit bg-pri2"
              >
                {teacher.teacher_name}
              </Badge>
            ))}
          </div>
          {course.teachers.length > 2 && (
            <Badge className="bg-zinc-400">+{course.teachers.length - 2}</Badge>
          )}
        </div>

        <div className="h-24 px-3 flex flex-col gap-1 border-b-2">
          <h4 className="text-zinc-500 w-full line-clamp-1">
            {course.course_name}
          </h4>
          <p className="text-zinc-500 line-clamp-2">{course.course_about}</p>
        </div>

        <p className="text-zinc-500 px-3 font-bold text-pri2">
          {course.school.school_name}
        </p>
      </div>
    </Link>
  );
}
