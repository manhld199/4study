// import components
import Search from "./search";

// import utils
import { fetchData } from "@/utils/functions/server";
import { API_SCHOOL_URL, API_TEACHER_URL } from "@/utils/constants/urls";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { keyword, page } = searchParams;

  const schoolData = await fetchData(API_SCHOOL_URL);
  const teacherData = await fetchData(API_TEACHER_URL);

  return (
    <Search
      schoolData={schoolData}
      teacherData={teacherData}
      keyword={keyword ?? ""}
      pageNumber={Number(page)}
    />
  );
}
