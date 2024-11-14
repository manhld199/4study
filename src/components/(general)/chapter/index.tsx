"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Chapter = ({ title, lessons }: { title: string; lessons: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="bg-[#C4CEFF] p-5 rounded-md border border-[#11009E]">
    //   <div
    //     className="flex justify-between items-center cursor-pointer"
    //     onClick={() => setIsOpen(!isOpen)}>
    //     <h2 className="text-xl font-semibold text-[#11009E]">{title}</h2>
    //     <p className="text-[#5271FF] text-lg flex items-center">
    //       {lessons.length} lessons{" "}
    //       <span className="ml-2">
    //         {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    //       </span>
    //     </p>
    //   </div>

    //   {isOpen && (
    //     <div className="space-y-3 mt-3">
    //       {lessons.map((lesson, index) => (
    //         <div
    //           key={index}
    //           className="bg-white p-3 rounded-md border border-[#5271FF] text-[#11009E] text-lg">
    //           Lesson {index + 1}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="flex w-full h-[44px] bg-white items-center justify-center border border-[#D4D1D1]-200 rounded-[18px]">
      <p>{title}</p>
    </div>
  );
};

export default Chapter;
