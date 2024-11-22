// import libs
import React from "react";
import Image from "next/image";

// import components
import { Checkbox } from "@/components/ui/checkbox";

export default function CardSchool1({
  data,
  isSelected = false,
  setIsSelected,
  className = "",
}: {
  data: School | Teacher;
  isSelected?: boolean;
  setIsSelected: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <div
      className={`cursor-pointer relative rounded-xl overflow-hidden hover:shadow-md ${className}`}
      onClick={() => setIsSelected(!isSelected)}>
      <div className="absolute top-2 left-2 z-10 w-5 h-5">
        <Checkbox
          className="bg-white border-none w-5 h-5"
          checked={isSelected}
          onCheckedChange={setIsSelected}
        />
      </div>

      <div className="relative w-full aspect-[10/9]">
        <Image
          src={(data as School).school_img || (data as Teacher).teacher_img}
          alt={(data as School).school_name || (data as Teacher).teacher_name}
          className="object-cover rounded-t-sm border-b-2"
          fill
        />
      </div>

      <div
        className={`absolute bottom-0 w-full p-2 ${
          isSelected ? "bg-hover" : "bg-zinc-300"
        }`}>
        <p className="text-sm line-clamp-2 font-bold capitalize">
          {(data as School).school_name || (data as Teacher).teacher_name}
        </p>
      </div>
    </div>
  );
}
