"use client";
// import libs
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import components
import { CardCourse } from "@/components";

export default function RecommendedCourses() {
  const router = useRouter();
  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOtherCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/courses/all-course", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOtherCourses(data.data || []);
      } catch (error) {
        console.error("Error fetching other courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherCourses();
  }, []);

  const handleSeeMoreClick = () => {
    router.push("/search");
  };

  return (
    <div className="absolute left-0 w-[100%] bg-[#11009E] flex flex-col px-[130px] py-[30px] gap-[30px]">
      <p className="text-white text-[36px] font-semibold mb-3">
        You may also like
      </p>

      {/* Slider for other courses */}
      {loading ? (
        <div className="grid grid-cols-4 gap-12">
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              height={350}
              className="rounded-[10px] skeleton-custom"
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={15}
            slidesPerView={4}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}>
            {otherCourses.map((course, index) => (
              <SwiperSlide key={`course-card-${course._id}`}>
                <CardCourse course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom navigation buttons */}
          <div className="swiper-button-next text-white"></div>
          <div className="swiper-button-prev text-white"></div>
        </div>
      )}

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
