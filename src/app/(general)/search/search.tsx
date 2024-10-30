"use client";

// import libs
import React, { useState } from "react";
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
import { CardCourse1 } from "@/components";

export default function Search({ courseData }: { courseData: Course[] }) {
  const searchKey = "test key 1";
  const resultsCount = 1000000;

  const [sortState, setSortState] = useState<string>("None");

  return (
    <div className="w-full min-h-[500px] grid grid-cols-[1fr_3fr] gap-2">
      <div className="bg-yellow-200"></div>
      <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-4 items-center">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-base">
            <span className="font-bold">{resultsCount}</span> results for "
            {searchKey}"
          </p>

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
                <DropdownMenuRadioItem className="capitalize" value="None">
                  None
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem className="capitalize" value="asc">
                  Ascending
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem className="capitalize" value="desc">
                  Decending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full grid grid-cols-3 gap-2">
          {courseData.length > 0 ? (
            courseData.map((course, index) => (
              <CardCourse1 key={`course card ${index}`} course={course} />
            ))
          ) : (
            <>null</>
          )}
        </div>
      </div>
    </div>
  );
}
