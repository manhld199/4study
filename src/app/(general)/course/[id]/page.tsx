import { courses } from "@/data/courses";
import CourseDetail from "./course-detail";

const sampleCourseId = "abc";

export default function CoursePage() {
  const courseData = courses; 

  if (courseData._id !== sampleCourseId) {
    return <div>Course not found</div>;
  }

  return <CourseDetail courseData={courseData} />;
}
