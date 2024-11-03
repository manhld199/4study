"use client";

import { Chapter } from "@/components";
import { Button } from "@/components/ui/button";

type Teacher = {
  teacher_name: string;
  teacher_about: string;
  teacher_img: string;
};

type Course = {
  _id: string;
  course_name: string;
  course_about: string;
  course_videos: string[];
  teachers: Teacher[];
};

export default function CourseDetail({ courseData }: { courseData: Course }) {
  const handleRegister = () => {
    const currentTime = new Date().toLocaleString();
    console.log(
      `Registering for course with ID: ${courseData._id} at ${currentTime}`
    );
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 bg-white">
      <div className="flex-[7] bg-[#FFE3FA] p-8 rounded-md shadow-lg border border-[#11009E]">
        <h1 className="text-3xl font-bold mb-4 text-[#11009E]">
          {courseData.course_name}
        </h1>
        <p className="text-[#5271FF] mb-6 text-xl">{courseData.course_about}</p>

        <div className="text-[#11009E] mb-8">
          <p className="font-semibold text-xl">Course Content</p>
          <p className="text-lg">
            3 Chapters | {courseData.course_videos.length * 3} lessons |
            Teacher(s): {courseData.teachers.length}
          </p>
        </div>

        {/* Chapters */}
        <div className="space-y-6">
          <Chapter title="Chapter 1" lessons={courseData.course_videos} />
          <Chapter title="Chapter 2" lessons={courseData.course_videos} />
          <Chapter title="Chapter 3" lessons={courseData.course_videos} />
        </div>
      </div>

      <div className="flex-[3] mt-8 lg:mt-0 lg:ml-8 bg-[#FFE3FA] p-8 rounded-md shadow-lg border border-[#11009E]">
        <div className="bg-[#C4CeFF] rounded-md flex items-center border border-[#11009E] p-3">
          <div>
            <p className="text-2xl font-semibold text-center text-[#11009E] mb-4">
              Teacher
            </p>
            {courseData.teachers.map((teacher, index) => (
              <div key={index} className="flex items-center text-center mb-4">
                <div>
                  <img
                    src={teacher.teacher_img}
                    alt={teacher.teacher_name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                </div>
                <div className="flex-1 px-4 text-left">
                  <p className="text-[#11009E] font-semibold">
                    {teacher.teacher_name}
                  </p>
                  <p className="text-[#5271FF]">{teacher.teacher_about}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={handleRegister}
          className="mt-6 w-full bg-[#5271FF] text-white py-3 text-xl rounded-md hover:bg-[#11009E] h-12">
          Register Now
        </Button>
      </div>
    </div>
  );
}
