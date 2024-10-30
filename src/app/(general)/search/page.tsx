import Search from "./search";

import { courses } from "@/data/courses";

export default function SearchPage() {
  const coursesData = courses;
  return <Search courseData={coursesData} />;
}
