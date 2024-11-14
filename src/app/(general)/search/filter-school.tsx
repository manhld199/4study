"use client";

// import libs
import React, { useEffect, useState } from "react";

// import components
import { CardFilterSearch, SelectDialog } from "@/components";

export default function FilterSchool({
  schoolData,
  onChange,
  value = [],
}: {
  schoolData: School[];
  onChange: (selectedSchools: string[]) => void;
  value: string[];
}) {
  const [selectedSchools, setSelectedSchools] = useState<string[]>(value);

  useEffect(() => {
    setSelectedSchools(value);
  }, [value]);

  const handleSelect = (schoolId: string) => {
    const updatedSelected = selectedSchools.includes(schoolId)
      ? selectedSchools.filter((id) => id !== schoolId)
      : [...selectedSchools, schoolId];

    setSelectedSchools(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <div className="w-full flex flex-col gap-2 pb-4 border-b-[1px]">
      <h4 className="text-pri2">School</h4>

      <div className="grid grid-cols-2 gap-2">
        {schoolData.slice(0, 6).map((school, index) => (
          <CardFilterSearch
            key={`filter_school_${index}`}
            data={school}
            isSelected={selectedSchools.includes(school._id)}
            setIsSelected={() => handleSelect(school._id)}
          />
        ))}
      </div>

      <SelectDialog
        isMultiChoice={true}
        name="Choose school(s)"
        value={value}
        onChange={onChange as any}
        options={schoolData.map((item: any) => ({
          _id: item._id,
          img: item.school_img,
          name: item.school_name,
        }))}
        type="search-page"
        placeholder="See more..."
      />
    </div>
  );
}
