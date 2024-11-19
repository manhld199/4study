"use client";

// import libs
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";

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
import Pagination from "./pagination";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
  const { data: session, status } = useSession();

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

      let url = `${PUBLIC_API_SEARCH_URL}?keyword=${keyword}&page=${page}${schoolQuery}${teacherQuery}${sortQuery}`;
      const urlPersonalized = "/api/courses/personalized";

      if (sortState == "Personalized") url = urlPersonalized;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        setFilteredData(
          sortState == "Personalized" ? result.data : result.data.courses
        );
        setTotalPages(
          sortState == "Personalized" ? 1 : result.data.pages.totalPages
        );
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
              {filteredData.length * totalPages > filteredData.length
                ? "Over "
                : ""}
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
                onValueChange={setSortState}>
                <DropdownMenuRadioItem className="capitalize" value="Top">
                  Top
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem className="capitalize" value="Popular">
                  Popular
                </DropdownMenuRadioItem>

                {session && (
                  <DropdownMenuRadioItem
                    className="capitalize"
                    value="Personalized">
                    Personalized
                  </DropdownMenuRadioItem>
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading ? (
          <ColorRing height="80" width="80" ariaLabel="loading" />
        ) : (
          <div>
            <div className="w-full grid grid-cols-3 gap-3">
              {filteredData.length > 0 ? (
                <>
                  {filteredData.map((course, index) => (
                    <CardCourse key={`course card ${index}`} course={course} />
                  ))}
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                </>
              ) : (
                <div className="col-span-full relative w-[300px] h-[300px]">
                  <Image
                    src="/imgs/search-not-found.png"
                    alt="Search not found"
                    fill={true}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
