"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { courses } from "@/data/courses";
import CardCourse from "@/components/(general)/cards/course";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { CourseSlider } from "@/components/(general)/course-slider"; // Import CourseSlider
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession(); // Lấy thông tin session
  const router = useRouter(); // Dùng router để chuyển hướng

  // State để lưu các khóa học
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [personalizedCourses, setPersonalizedCourses] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Fetch dữ liệu cho 4 mục
  useEffect(() => {
    if (status === "loading") return; // Chờ khi loading
    if (!session) {
      router.push("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    } else {
      // Fetch dữ liệu nếu người dùng đã đăng nhập
      const fetchCourses = async () => {
        try {
          setLoading(true);

          // Fetch popular courses
          const popularResponse = await fetch("/api/courses/popularity", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const popularData = await popularResponse.json();
          setPopularCourses(popularData.data);

          // Fetch personalized courses
          const personalizedResponse = await fetch(
            "/api/courses/personalized",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const personalizedData = await personalizedResponse.json();
          setPersonalizedCourses(personalizedData.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [session, status, router]);

  // Nếu session đang loading hoặc người dùng chưa đăng nhập, không render content
  if (status === "loading" || !session) {
    return <div>Redirecting to login...</div>;
  }
  
  return (
    <div className="">
      <div className="flex justify-center py-4">
        <div className="bg-white w-full h-[302px] rounded-[18px] shadow-lg p-6">
          <div className="space-y-1">
            <h4 className="text-[32px] text-[#5271FF] font-medium leading-none">
              Dash Board
            </h4>
            <p className="text-[22px] pt-[12px]">
              Discover your study progress
            </p>
          </div>
          <Separator className="my-4" />

          {/* Main flex container with even distribution of space */}
          <div className="flex  justify-between text-sm">
            {/* First column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">Completed Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">
                {popularCourses.length}
              </div>
              <button
                className="text-blue-500 text-[16px] mt-2 hover:underline text-left"
                onClick={() => {
                  // Scroll đến phần tử mục tiêu, ví dụ: cuộn đến phần "completed-courses"
                  const target = document.getElementById("completed-courses");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                See all
              </button>
            </div>

            {/* Vertical Separator */}
            <Separator
              orientation="vertical"
              className="h-[100px] w-[1px] bg-gray-300 mx-4" // Added fixed height and width
            />

            {/* Second column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">Personalize Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">
                {personalizedCourses.length}+
              </div>
              <button
                className="text-blue-500 text-[16px] mt-2 hover:underline text-left"
                onClick={() => {
                  const target = document.getElementById(
                    "personalized-courses"
                  );
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                See all
              </button>
            </div>

            {/* Vertical Separator */}
            <Separator
              orientation="vertical"
              className="h-[100px] w-[1px] bg-gray-300 mx-4" // Added fixed height and width
            />

            {/* Third column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px]">Popular Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">
                {popularCourses.length}+
              </div>
              <Link
                href="/explore"
                className="text-blue-500 text-[16px] mt-2 hover:underline">
                See all
              </Link>
            </div>

            {/* Vertical Separator */}
            <Separator
              orientation="vertical"
              className="h-[100px] w-[1px] bg-gray-300 mx-4" // Added fixed height and width
            />

            {/* Fourth column */}
            <div className="flex flex-col items-left space-y-4">
              <div className="text-[24px] pr-[200px]">All Courses</div>
              <div className="text-[32px] pt-[32px] pb-[24px]">
                {popularCourses.length}+
              </div>
              <Link
                href="/courses"
                className="text-blue-500 text-[16px] mt-2 hover:underline">
                See all
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/*Completed Courses*/}
        <div id="completed-courses">
          <h4 className="text-[32px] text-[#5271FF] font-medium leading-none pt-[30px] pb-[30px]">
            Completed Courses
          </h4>
          <div className="">
            {loading ? (
              <p>Loading completed courses...</p>
            ) : popularCourses?.length > 0 ? (
              <CourseSlider courses={popularCourses} />
            ) : (
              <p>No completed courses available at the moment.</p>
            )}
          </div>

          <div className="pt-[30px]">
            {loading ? (
              <p>Loading completed courses...</p>
            ) : popularCourses?.length > 0 ? (
              <CourseSlider courses={popularCourses} />
            ) : (
              <p>No completed courses available at the moment.</p>
            )}
          </div>
        </div>

        {/* Personalized Courses */}
        <div id="personalized-courses">
          <h4 className="text-[32px] text-[#5271FF] font-medium leading-none pt-[30px] pb-[30px]">
            Personalized Courses
          </h4>
          <div className="">
            {loading ? (
              <p>Loading personalized courses...</p>
            ) : personalizedCourses?.length > 0 ? (
              <CourseSlider courses={personalizedCourses} />
            ) : (
              <p>
                No personalized courses available at the moment.&nbsp;
                <Link href="/login" className="underline text-[#5271FF]">
                  Log in right now
                </Link>
              </p>
            )}
          </div>
          <Link
            href="/explore"
            className="text-blue-500 text-[16px] mt-2 hover:underline flex items-center space-x-2 justify-center pb-[50px] pt-[30px]">
            See more
            <ChevronRight className="ml-2 w-[24px] h-[24px] stroke-1" />
          </Link>
        </div>
      </div>

      {/* What Is Your Next? */}
      <div className="w-full">
        <div
          className="bg-[#11009E] left-0 top-0 w-full h-auto p-6"
          style={{ width: "100% !important" }}>
          <h4 className="text-[32px] text-white font-semibold leading-none pb-[30px]">
            What Is Your Next?
          </h4>
          <div className="">
            {loading ? (
              <p>Loading personalized courses...</p>
            ) : personalizedCourses?.length > 0 ? (
              <CourseSlider courses={personalizedCourses} />
            ) : (
              <p>
                No personalized courses available at the moment.&nbsp;
                <Link href="/login" className="underline text-[#5271FF]">
                  Log in right now
                </Link>
              </p>
            )}
          </div>
          <Link
            href="/search"
            className="text-white text-[16px] mt-2 hover:underline flex items-center space-x-2 justify-center pb-[5px] pt-[30px]">
            See more
            <ChevronRight className="ml-2 w-[24px] h-[24px] stroke-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Ví dụ khi người dùng chưa đăng nhập thì không truy cập vào dash-broad
// "use client";

// import { useEffect } from "react";
// import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";

// const DashBoard = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   console.log("Session:", session);
//   console.log("Status:", status);

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) {
//       router.push("/login");
//     }
//   }, [session, status, router]);

//   if (!session) {
//     return <div>Redirecting to login...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome to your dashboard, {session.user?.name}</h1>

//       <button onClick={() => signOut({ callbackUrl: "/login" })}>
//         Log out
//       </button>
//     </div>
//   );
// };

// export default DashBoard;
