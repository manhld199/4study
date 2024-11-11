// import libs
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

// import components
import { Badge } from "@/components/ui/badge";

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
      className={`cursor-pointer w-full border-2 rounded-3xl flex flex-col gap-2 items-center overflow-hidden bg-white hover:shadow-lg pb-2 ${className}`}>
      <div className="relative w-full">
        <div className="relative w-full aspect-[10/7]">
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
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}>
            <Star fill="yellow" strokeWidth={0} className="mt-1 ml-[2px]" />
          </div>
        )}
      </div>

      <div className="w-full py-2 flex flex-col gap-3">
        <div className="px-4 flex flex-row justify-between">
          <div className="flex flex-row gap-1 flex-wrap">
            {course.teachers.slice(0, 2).map((teacher, index) => (
              <Badge
                key={`badge ${course._id} teacher ${index}`}
                className="w-fit bg-pri2 hover:bg-pri2">
                {teacher.teacher_name}
              </Badge>
            ))}
          </div>
          {course.teachers.length > 2 && (
            <Badge className="bg-zinc-400 hover:bg-zinc-400">
              +{course.teachers.length - 2}
            </Badge>
          )}
        </div>

        <div className="h-28 px-4 flex flex-col gap-1 border-b-2">
          <h4 className="w-full line-clamp-1">{course.course_name}</h4>
          <p className="text-zinc-500 line-clamp-2">{course.course_about}</p>
        </div>

        <p className="px-4 font-bold text-pri2">{course.school.school_name}</p>
      </div>
    </Link>
  );
}
