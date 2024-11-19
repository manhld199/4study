"use client";
// import libs
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import components
import {
  Chapter,
  InfoTeacher,
  RecommendedCourses,
  NotificationSuccess,
} from "@/components";
import { Button } from "@/components/ui/button";
// import utils
import {
  capitalizeFirstSentence,
  truncateWords,
} from "@/utils/functions/format";

interface CourseDetailProps {
  courseData: Course;
  isRegistered: boolean;
  setIsRegistered: (isRegistered: boolean) => void;
}

export default function CourseDetail({
  courseData,
  isRegistered,
  setIsRegistered,
}: CourseDetailProps) {
  const router = useRouter();
  const currentUrl = window.location.pathname + window.location.search;
  const { data: session, status } = useSession();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<"success" | "warning">("success"); // Thêm trạng thái
  const currentTime = new Date().toLocaleString();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!session) {
      // Nếu chưa đăng nhập, yêu cầu đăng nhập
      router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }

    if (isRegistered) {
      setNotificationType("warning");
      setIsDialogOpen(true);
      return;
    }

    try {
      const response = await fetch("/api/users/course/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          courseId: courseData._id,
          enrollTime: currentTime,
        }),
      });

      if (response.ok) {
        setIsRegistered(true);
        setNotificationType("success");
        setIsDialogOpen(true);
      } else {
        console.error("Failed to register the course.");
      }
    } catch (error) {
      console.error("Error registering course:", error);
    }
  };

  const handleChapterClick = (index: number) => {
    setSelectedVideo(courseData.course_videos[index]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between py-[50px] gap-[50px]">
        <div className="flex flex-col bg-white w-[800px] p-[20px] gap-[20px] rounded-[18px]">
          <div className="h-[350px] rounded-[10px] relative">
            {selectedVideo ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.replace("watch?v=", "embed/")}
                title="Selected Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-[10px]"
              />
            ) : (
              <Image
                src={courseData.course_img}
                alt="Course Image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            )}
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
              {courseData.course_videos.length} Chapters | Teacher(s):{" "}
              {courseData.teachers.length} | The total time: 18h36min
            </p>
          </div>
          <div className="space-y-6">
            {courseData.course_videos.map((video, index) => (
              <Chapter
                key={index}
                title={`Chapter ${index + 1}`}
                index={index}
                onClick={handleChapterClick}
              />
            ))}
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
            className={`mt-6 w-full text-white py-3 text-[16px] rounded-[18px] bg-[#5271FF] hover:bg-[#11009E] ${
              isRegistered ? "bg-[#11009E] disabled:opacity-50" : ""
            }`}>
            {isRegistered ? "Enrolled" : "Enroll now"}
          </Button>
        </div>
      </div>
      <RecommendedCourses />
      <NotificationSuccess
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={
          notificationType === "success"
            ? "Enrollment Successful!"
            : "Already Registered"
        }
        message={
          notificationType === "success"
            ? "You have successfully enrolled in this course!"
            : "You have already registered for this course. No need to register again."
        }
      />
    </div>
  );
}
