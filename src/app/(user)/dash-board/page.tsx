"use client";

import React from "react";
import CardCourse from "@/components/(general)/cards/courses";
import { courses } from "@/data/courses";

export default function ProfilePage() {

  // Filtering courses for different sections
  const popularCourses = courses
    .sort((a, b) => a.rank_popular - b.rank_popular)
    .slice(0, 4);
  const personalizedCourses = courses
    .sort((a, b) => a.rank_personalized - b.rank_personalized)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-[#FFE3FA] text-white p-6 pb-12">
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
      </section>
    </div>
  );
}
