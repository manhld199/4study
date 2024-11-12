"use client";

// import libs
import { useState } from "react";

// import components
import { Chapter } from "@/components";
import { Button } from "@/components/ui/button";
import { InfoTeacher } from "@/components";
import Image from "next/image";
import {
  truncateWords,
  capitalizeFirstSentence,
} from "@/utils/functions/format";

export default function CourseDetail({ courseData }: { courseData: Course }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const handleRegister = () => {
    const currentTime = new Date().toLocaleString();
    console.log(
      `Registering for course with ID: ${courseData._id} at ${currentTime}`
    );

    setIsRegistered(true);
  };

  return (
    <div className="flex justify-between py-[50px] gap-[50px]">
      <div className="flex flex-col bg-white w-[700px] p-[20px] gap-[20px] rounded-[18px]">
        <div className="h-[300px] rounded-[10px] relative">
          <Image
            src={courseData.course_img}
            alt="Course Image"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <p className="text-[32px] font-bold text-[#5271FF]">
              {capitalizeFirstSentence(courseData.course_name)}
            </p>
            <p className="text-[16px] text-[#5271FF] text-nowrap">
              1000 Enrolled Students
            </p>
          </div>
          <p className="text-[#2C2C2C] text-[16px] text-justify">
            {capitalizeFirstSentence(
              truncateWords(courseData.course_about, 70)
            )}
          </p>
        </div>
        <div className="h-[1px] w-[665px] bg-[#D4D1D1]"></div>
        <div className="text-[16px] mb-8">
          <p className="text-[#5271FF]">Courses Details</p>
          <p className="text-[#2C2C2C]">
            3 Chapters | {courseData.course_videos.length * 3} lessons |
            Teacher(s): {courseData.teachers.length} | The total time: 18h36min
          </p>
        </div>
        <div className="space-y-6">
          <Chapter title="Chapter 1" lessons={courseData.course_videos} />
          <Chapter title="Chapter 2" lessons={courseData.course_videos} />
          <Chapter title="Chapter 3" lessons={courseData.course_videos} />
          <Chapter title="Chapter 4" lessons={courseData.course_videos} />
          <Chapter title="Chapter 5" lessons={courseData.course_videos} />
        </div>
      </div>

      <div className="flex flex-col self-start bg-white w-[400px] rounded-[18px] border-[1px] border-[#D4D1D1]-900 px-[30px] py-[20px] gap-[20px]">
        <div className="text-[32px] text-[#5271FF] text-center">Teacher</div>
        <div className="h-[1px] w-[335px] bg-[#D4D1D1]"></div>
        <div className="">
          {courseData.teachers.map((teacher, index) => (
            <InfoTeacher
              key={index}
              teacher_name={capitalizeFirstSentence(teacher.teacher_name)}
              teacher_img={teacher.teacher_img}
              teacher_about={capitalizeFirstSentence(
                truncateWords(teacher.teacher_about, 20)
              )}
            />
          ))}
        </div>
        <Button
          onClick={handleRegister}
          disabled={isRegistered}
          className={`mt-6 w-full text-white py-3 text-[16px] rounded-[18px] bg-[#5271FF] hover:bg-[#11009E]${
            isRegistered
              ? " bg-[#5271FF] cursor-default"
              : "bg-[#5271FF] hover:bg-[#11009E]"
          }`}>
          {isRegistered ? "Enrolled" : "Enroll now"}
        </Button>
      </div>
    </div>
  );
}
