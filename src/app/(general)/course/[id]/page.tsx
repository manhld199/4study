"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import CourseDetail from "./course-detail";

interface Teacher {
  _id: string;
  teacher_name: string;
  teacher_img: string;
  teacher_about: string;
}

interface School {
  _id: string;
  school_name: string;
  school_img: string;
  school_about: string;
}

interface Course {
  _id: string;
  course_name: string;
  course_about: string;
  course_img: string;
  course_videos: string[];
  teachers: Teacher[];
  school: School;
}

export default function CoursePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourseData = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const result = await res.json();

        if (res.ok && result.data.length > 0) {
          setCourseData(result.data[0]);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Failed to fetch course data:", err);
        setError("Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (session && courseData) {
      checkIfEnrolled(session.user.id);
    }
  }, [session, courseData]);

  const checkIfEnrolled = async (userId: string) => {
    try {
      const response = await fetch("/api/users/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        const courseIds = data.data || [];

        const enrolled = courseIds.includes(courseData?._id);
        setIsRegistered(enrolled);
      } else {
        console.error("Failed to fetch enrolled courses.");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
        <Skeleton height={300} width={700} />
        <Skeleton height={40} width={300} />
        <Skeleton count={3} height={20} width={500} />
        <Skeleton height={40} width={150} />
        <Skeleton height={150} width={400} />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!courseData) return null;

  return (
    <CourseDetail
      courseData={courseData}
      isRegistered={isRegistered}
      setIsRegistered={setIsRegistered} // Pass setIsRegistered
    />
  );
}
