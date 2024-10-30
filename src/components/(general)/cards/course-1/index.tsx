import React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CardCourse1({
  course,
  className = "",
}: {
  course: Course;
  className?: string;
}) {
  return (
    <Link
      href={`/course/${course._id}`}
      target="_blank"
      className={`cursor-pointer w-full pb-4 border-2 rounded-lg flex flex-col gap-2 items-center overflow-hidden bg-white hover:bg-pri3/30 ${className}`}>
      <div className="relative w-full">
        <div className="relative w-full aspect-[10/7]">
          <Image
            src={course.course_img}
            alt={course.course_name}
            className="object-cover rounded-t-md border-b-2"
            fill
          />
        </div>

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
      </div>

      <div className="w-full px-4 flex flex-col gap-1">
        <Badge className="w-fit bg-pri2">{course.school.school_name}</Badge>
        <h4 className="w-full line-clamp-2">{course.course_name}</h4>
        <p className="line-clamp-2">{course.course_about}</p>
      </div>
    </Link>
  );
}
