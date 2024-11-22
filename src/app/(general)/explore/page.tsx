"use client";

import { useState, useEffect } from "react";
import { ImageSlider } from "@/components/(general)/image-slider";
import { CardCourse } from "@/components"; // Import CardCourse
import Link from "next/link";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import css nếu cần
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export default function Home() {
  const { data: session, status } = useSession();
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [personalizedCourses, setPersonalizedCourses] = useState<any[]>([]);
  const [teacherCourses, setTeacherCourses] = useState<any[]>([]);
  const [schoolCourses, setSchoolCourses] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const popularResponse = await fetch("/api/courses/popularity");
        const popularData = await popularResponse.json();
        setPopularCourses(popularData.data);

        const personalizedResponse = await fetch("/api/courses/personalized");
        const personalizedData = await personalizedResponse.json();
        setPersonalizedCourses(personalizedData.data);

        const teacherResponse = await fetch("/api/courses/teacher");
        const teacherData = await teacherResponse.json();
        setTeacherCourses(teacherData.data.courses);

        const schoolResponse = await fetch("/api/courses/school");
        const schoolData = await schoolResponse.json();
        setSchoolCourses(schoolData.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <ImageSlider />
      <section className="py-[50px] flex flex-col gap-[30px] max-w-[1180px] justify-center items-center m-auto">
        {/* Personalized Courses */}
        {session && (
          <div className="w-full">
            <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
              Personalized Courses
            </h2>
            {loading ? (
              <div className="grid grid-cols-4 gap-4">
                {/* Displaying 4 separate Skeletons while loading */}
                <Skeleton height={350} className="skeleton-custom" />
                <Skeleton height={350} className="skeleton-custom" />
                <Skeleton height={350} className="skeleton-custom" />
                <Skeleton height={350} className="skeleton-custom" />
              </div>
            ) : personalizedCourses?.length > 0 ? (
              <div className="w-full">
                <div className="relative">
                  {/* Swiper with custom navigation buttons */}
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={4}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                  >
                    {personalizedCourses.slice(0, 20).map((course, index) => (
                      <SwiperSlide key={index}>
                        <CardCourse course={course} />
                      </SwiperSlide>
                    ))}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </Swiper>
                </div>
              </div>
            ) : (
              <p>No personalized courses available at the moment.</p>
            )}
          </div>
        )}

        {/* Popular Courses */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Popular Courses
          </h2>
          {loading ? (
            <div className="grid grid-cols-4 gap-4 ">
              {/* Hiển thị 4 Skeletons riêng biệt */}
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
            </div>
          ) : popularCourses?.length > 0 ? (
            <div className="w-full">
              <div className="relative">
                {/* Swiper with custom navigation buttons */}
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={15}
                  slidesPerView={4}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  loop={true}>
                  {popularCourses.slice(0, 20).map((course, index) => (
                    <SwiperSlide key={index}>
                      <CardCourse course={course} />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              </div>
            </div>
          ) : (
            <p>No popular courses available at the moment.</p>
          )}
        </div>

        {/* Courses by Teacher */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Courses by Teacher
          </h2>
          {loading ? (
            <div className="grid grid-cols-4 gap-4 ">
              {/* Hiển thị 4 Skeletons riêng biệt */}
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
            </div>
          ) : teacherCourses?.length > 0 ? (
            <div className="w-full">
              <div className="relative">
                {/* Swiper with custom navigation buttons */}
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={15}
                  slidesPerView={4}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  loop={true}>
                  {teacherCourses.slice(0, 20).map((course, index) => (
                    <SwiperSlide key={index}>
                      <CardCourse course={course} />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              </div>
            </div>
          ) : (
            <p>No teacher courses available at the moment.</p>
          )}
        </div>

        {/* Courses by School */}
        <div className="w-full">
          <h2 className="text-[32px] text-[#5271FF] font-semibold leading-[40px] pb-[10px]">
            Courses by School
          </h2>
          {loading ? (
            <div className="grid grid-cols-4 gap-4 ">
              {/* Hiển thị 4 Skeletons riêng biệt */}
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
              <Skeleton height={350} className="skeleton-custom" />
            </div>
          ) : schoolCourses?.length > 0 ? (
            <div className="w-full">
              <div className="relative">
                {/* Swiper with custom navigation buttons */}
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={15}
                  slidesPerView={4}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  loop={true}>
                  {schoolCourses.slice(0, 20).map((course, index) => (
                    <SwiperSlide key={index}>
                      <CardCourse course={course} />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              </div>
            </div>
          ) : (
            <p>No school courses available at the moment.</p>
          )}
        </div>
      </section>
    </>
  );
}
