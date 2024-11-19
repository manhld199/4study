// import libs
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, UsersRound } from "lucide-react";

// import components
import { Badge } from "@/components/ui/badge";

// import utils
import { truncateWords } from "@/utils/functions/format";
import { convertNumberToShortString } from "@/utils/functions/convert";

export default function CardCourse({
  course,
  className = "",
}: {
  course: Course;
  className?: string;
}) {
  return (
    <Link
      href={`/course/${course?._id || 1}`}
      target="_blank"
      className={`relative cursor-pointer w-full border-2 rounded-3xl flex flex-col gap-2 items-center overflow-hidden bg-white hover:shadow-lg pb-2  ${className}`}>
      <div className="z-20 absolute top-0 right-0 flex flex-row gap-2 items-center bg-white pr-2 pl-3 py-1 rounded-bl-2xl">
        <UsersRound className="w-3.5 h-3.5" />
        <span className="text-sm">
          {convertNumberToShortString(course.enrolled_users)}
        </span>
      </div>

      <div className="relative w-full">
        <div className="relative w-full aspect-[10/7]">
          <Image
            src={course?.course_img}
            alt={course?.course_name}
            className="object-cover rounded-t-md border-b-2"
            fill
          />
        </div>
      </div>

      <div className="w-full py-2 flex flex-col gap-3">
        <div className="px-4 flex flex-row justify-between">
          <div className="flex flex-row gap-1 flex-wrap">
            {course?.teachers.slice(0, 2).map((teacher, index) => (
              <Badge
                key={`badge ${course._id} teacher ${index}`}
                className="w-fit bg-pri2 hover:bg-pri2 capitalize">
                {truncateWords(teacher.teacher_name, 10)}
              </Badge>
            ))}
          </div>
          {course?.teachers.length > 2 && (
            <Badge className="bg-zinc-400 hover:bg-zinc-400">
              +{course?.teachers.length - 2}
            </Badge>
          )}
        </div>

        <div className="h-28 px-4 flex flex-col gap-1 border-b-2">
          <h4 className="w-full line-clamp-1 capitalize">
            {course?.course_name}
          </h4>
          <p className="text-zinc-500 line-clamp-2 first-letter:uppercase">
            {course?.course_about}
          </p>
        </div>

        <p className="px-4 font-bold text-pri2">{course?.school.school_name}</p>
      </div>
    </Link>
  );
}
