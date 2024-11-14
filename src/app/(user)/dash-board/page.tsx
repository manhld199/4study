"use client";

import React from "react";
// import { Button } from "@/components/ui/button";
import CardCourse from "@/components/(general)/cards/course";
import { courses } from "@/data/courses";
// import { Search } from "lucide-react";

export default function ExplorePage() {
  // const handleExplore = () => {
  //   console.log("Search button clicked");
  // };

  // Filtering courses for different sections
  const popularCourses = courses
    .sort((a, b) => a.rank_popular - b.rank_popular)
    .slice(0, 4);
  const personalizedCourses = courses
    .sort((a, b) => a.rank_personalized - b.rank_personalized)
    .slice(0, 4);
  // const schoolCourses = courses
  //   .filter((course) => course.school._id === "1")
  //   .slice(0, 4); // Adjust school ID as needed
  // const teacherCourses = courses
  //   .filter((course) => course.teachers.some((teacher) => teacher._id === "1"))
  //   .slice(0, 4); // Adjust teacher ID as needed

  return (
    <div className="min-h-screen bg-[#FFE3FA] p-6 pb-12">
      {/* Search Bar */}
      {/* <div className="flex items-center justify-center mb-8">
        <div className="bg-[#11009E] p-2 rounded-l">
          <Search />
        </div>
        <input
          type="text"
          placeholder="Search for courses..."
          className="flex-1 p-2 bg-white text-gray-700 mr-2 max-w-xs focus:outline-none focus:ring-0"
        />
        <Button onClick={handleExplore} className="bg-[#11009E] p-2">
          Search
        </Button>
      </div> */}

      {/* Course Sections */}
      <section className="space-y-8">
        {/* Popular Courses */}
        <div>
          <h2 className="text-lg text-black font-semibold mb-4">
            Attended Courses
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {popularCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={false}
              />
            ))}
          </div>
        </div>

        {/* Personalized Courses */}
        <div>
          <h2 className="text-lg text-black font-semibold mb-4">
            Personalized Courses
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {personalizedCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={true}
              />
            ))}
          </div>
        </div>

        {/* School-Based Courses */}
        {/* <div>
          <h2 className="text-lg text-black font-semibold mb-4">
            Courses by School
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {schoolCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={false}
              />
            ))}
          </div>
        </div> */}

        {/* Teacher-Based Courses */}
        {/* <div>
          <h2 className="text-lg text-black font-semibold mb-4">
            Courses by Teacher
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {teacherCourses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                className="custom-class"
                isPersonalized={false}
              />
            ))}
          </div>
        </div> */}
      </section>
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
