import { useEffect, useState } from "react";
import { CardCourse } from "@/components";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function RecommendedCourses() {
  const [popularCourses, setPopularCourses] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // Fetch the popular courses data
    const fetchPopularCourses = async () => {
      try {
        const popularResponse = await fetch("/api/courses/popularity", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const popularData = await popularResponse.json();

        const top4Courses = popularData.data.slice(0, 4);
        setPopularCourses(top4Courses);
      } catch (error) {
        console.error("Error fetching popular courses:", error);
      }
    };

    fetchPopularCourses();
  }, []);

  const handleSeeMoreClick = () => {
    router.push("/search");
  };

  return (
    <div className="absolute left-0 w-[100%] bg-[#11009E] flex flex-col px-[130px] py-[30px] gap-[30px]">
      <p className="text-white text-[36px] font-semibold mb-3">
        You may also like
      </p>
      {/* Render top 4 popular courses */}
      <div className="grid grid-cols-4 gap-12">
        {popularCourses.map((course, index) => (
          <CardCourse
            key={`course-card-${course._id}`}
            course={course}
            isPersonalized={false}
          />
        ))}
      </div>
      <div
        onClick={handleSeeMoreClick}
        className="flex items-center justify-center cursor-pointer text-white">
        <span className="text-white font-semibold text-[16px] underline">
          See more
        </span>
        <ChevronRight className="ml-2" />
      </div>
    </div>
  );
}
