"use client";

// import libs
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

// import components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardCourse } from "@/components";
import FilterSchool from "./filter-school";
import FilterTeacher from "./filter-teacher";

export default function Search({
  courseData,
  schoolData,
  teacherData,
}: {
  courseData: Course[];
  schoolData: School[];
  teacherData: Teacher[];
}) {
  const searchKey = "test key 1";
  const resultsCount = 1000000;

  const [filteredData, setFilteredData] = useState<Course[]>(courseData);

  const [sortState, setSortState] = useState<string>("Top");
  const [filterSchoolState, setFilterSchoolState] = useState<string[]>([]);
  const [filterTeacherState, setFilterTeacherState] = useState<string[]>([]);

  // Filter logic
  useEffect(() => {
    const filtered = courseData.filter((course) => {
      const matchesSchool =
        filterSchoolState.length === 0 ||
        filterSchoolState.indexOf(course.school._id) != -1;
      // console.log("matchesSchool", matchesSchool);

      const matchesTeacher =
        filterTeacherState.length === 0 ||
        course.teachers.some(
          (teacher) => filterTeacherState.indexOf(teacher._id) != -1
        );
      // console.log("matchesTeacher", matchesTeacher);

      return matchesSchool && matchesTeacher;
    });

    setFilteredData(filtered);
  }, [filterSchoolState, filterTeacherState]);

  // Sort logic
  useEffect(() => {
    let sortedData = [...courseData];

    if (sortState === "Top") sortedData = sortedData;
    else if (sortState === "Popular")
      sortedData.sort((a, b) => b.rank_popular - a.rank_popular);
    else if (sortState === "Personalized")
      sortedData.sort((a, b) => b.rank_personalized - a.rank_personalized);

    setFilteredData(sortedData);
  }, [sortState, courseData]);

  return (
    <div className="w-full min-h-[500px] grid grid-cols-[1fr_3fr] gap-2">
      <div className="ư-full p-4 bg-white rounded-lg flex flex-col gap-4 items-center">
        <div className="w-full flex flex-col gap-2">
          <h5 className="w-full text-center pb-2 border-b-2">Schools</h5>

          <FilterSchool
            schoolData={schoolData}
            value={filterSchoolState}
            onChange={setFilterSchoolState}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <h5 className="w-full text-center pb-2 border-b-2">Teachers</h5>

          <FilterTeacher
            teacherData={teacherData}
            value={filterTeacherState}
            onChange={setFilterTeacherState}
          />
        </div>
      </div>

      <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-4 items-center">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="pb-2 border-b-2">
            <p className="text-base">
              <span className="font-bold">{resultsCount}</span> results for "
              {searchKey}"
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" asChild>
                <div className="flex flex-row gap-3">
                  <span className="text-base font-bold">Sort by:</span>
                  <span className="tex-base">{sortState}</span>
                  <ChevronDown className="min-w-5 min-h-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup
                value={sortState}
                onValueChange={setSortState}>
                <DropdownMenuRadioItem className="capitalize" value="Top">
                  Top
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem className="capitalize" value="Popular">
                  Popular
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  className="capitalize"
                  value="Personalized">
                  Personalized
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full grid grid-cols-3 gap-2">
          {filteredData.length > 0 ? (
            filteredData.map((course, index) => (
              <CardCourse
                key={`course card ${index}`}
                isPersonalized={sortState == "Personalized" && index <= 5}
                course={course}
              />
            ))
          ) : (
            <>null</>
          )}
        </div>
      </div>
    </div>
  );
}
