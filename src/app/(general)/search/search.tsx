"use client";

// import libs
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// import components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardCourse } from "@/components";
import FilterSchool from "./filter-school";
import FilterTeacher from "./filter-teacher";

// import utils
import { PUBLIC_API_SEARCH_URL } from "@/utils/constants/urls";

export default function Search({
  schoolData,
  teacherData,
  keyword,
  pageNumber,
}: {
  schoolData: School[];
  teacherData: Teacher[];
  keyword: string;
  pageNumber: number;
}) {
  const router = useRouter();

  const [filteredData, setFilteredData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortState, setSortState] = useState<string>("Top");
  const [filterSchoolState, setFilterSchoolState] = useState<string[]>([]);
  const [filterTeacherState, setFilterTeacherState] = useState<string[]>([]);
  const [page, setPage] = useState<number>(isNaN(pageNumber) ? 1 : pageNumber);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Update URL with only keyword and page
  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) {
      params.set("keyword", keyword);
    }
    if (page) {
      params.set("page", page.toString());
    }

    // Update the URL with only the relevant query params (keyword, page)
    router.push(`?${params.toString()}`, { scroll: false });
  }, [keyword, page]);

  // Fetch data whenever filters, sort, or page changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const schoolQuery = filterSchoolState.length
        ? `&schools=${filterSchoolState.join(",")}`
        : "";
      const teacherQuery = filterTeacherState.length
        ? `&teachers=${filterTeacherState.join(",")}`
        : "";
      const sortQuery = `&sort=${sortState}`;

      const url = `${PUBLIC_API_SEARCH_URL}?keyword=${keyword}&page=${page}${schoolQuery}${teacherQuery}${sortQuery}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setFilteredData(result.data.courses || []);
        setTotalPages(result.data.pages.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterSchoolState, filterTeacherState, sortState, keyword, page]);

  return (
    <div className="relative mt-4 w-full min-h-[500px] grid grid-cols-[1fr_3fr] gap-8">
      <div className="w-full h-fit p-4 bg-white border-[1px] rounded-2xl flex flex-col gap-4 items-center">
        <div className="w-full pb-4 border-b-[1px]">
          <Button
            variant="none"
            className="w-fit cursor-pointer flex flex-row gap-3 bg-white border-[1px] border-pri2 rounded-2xl">
            <span className="text-base font-semibold">Filter by</span>
          </Button>
        </div>

        <FilterSchool
          schoolData={schoolData}
          value={filterSchoolState}
          onChange={setFilterSchoolState}
        />

        <FilterTeacher
          teacherData={teacherData}
          value={filterTeacherState}
          onChange={setFilterTeacherState}
        />
      </div>

      <div className="w-full rounded-lg flex flex-col gap-4 items-center">
        <div className="w-full mt-3 mb-3 flex flex-row justify-between items-center">
          <div className="pb-2 border-b-[1px] border-normal-text">
            <p className="text-base">
              {totalPages > 1 ? "Over " : ""}
              <span className="font-bold">
                {filteredData.length * totalPages}
              </span>{" "}
              {filteredData.length == 1 && totalPages == 1
                ? "result"
                : "results"}{" "}
              for <span className="font-bold">&quot;{keyword}&quot;</span>
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="none"
                className="cursor-pointer flex flex-row gap-3 bg-white border-[1px] border-pri2 rounded-2xl hover:shadow-md">
                <span className="text-base font-semibold">Sort by:</span>
                <span className="tex-base">{sortState}</span>
                <ChevronDown className="min-w-5 min-h-5 text-pri2" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup
                value={sortState}
                onValueChange={setSortState}
              >
                <DropdownMenuRadioItem className="capitalize" value="Top">
                  Top
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem className="capitalize" value="Popular">
                  Popular
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  className="capitalize"
                  value="Personalized"
                >
                  Personalized
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="w-full grid grid-cols-3 gap-3">
              {filteredData.length > 0 ? (
                filteredData.map((course, index) => (
                  <CardCourse
                    key={`course card ${index}`}
                    isPersonalized={sortState == "Personalized" && index <= 5}
                    course={course}
                  />
                ))
              ) : (
                <>No results</>
              )}
            </div>

            <div className="pagination-controls">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
