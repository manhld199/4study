"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [courseData, setCourseData] = useState<Course | null>(null);
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

  if (loading)
    return <p className="flex items-center min-h-screen">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!courseData) return null;

  return <CourseDetail courseData={courseData} />;
}
