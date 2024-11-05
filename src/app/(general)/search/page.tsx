// import components
import Search from "./search";

// import data
import { courses } from "@/data/courses";
import { schools } from "@/data/schools";
import { teachers } from "@/data/teachers";

export default function SearchPage() {
  const courseData = courses;
  const schoolData = schools;
  const teacherData = teachers;

  return (
    <Search
      courseData={courseData}
      schoolData={schoolData}
      teacherData={teacherData}
    />
  );
}
