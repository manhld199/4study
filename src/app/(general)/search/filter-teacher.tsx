"use client";

import React, { useEffect, useState } from "react";
import { CardFilterSearch, SelectDialog } from "@/components";

export default function FilterTeacher({
  teacherData,
  onChange,
  value = [],
}: {
  teacherData: Teacher[];
  onChange: (selectedTeachers: string[]) => void;
  value: string[];
}) {
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>(value);

  useEffect(() => {
    setSelectedTeachers(value);
  }, [value]);

  const handleSelect = (teacherId: string) => {
    const updatedSelected = selectedTeachers.includes(teacherId)
      ? selectedTeachers.filter((id) => id !== teacherId)
      : [...selectedTeachers, teacherId];

    setSelectedTeachers(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        {teacherData.slice(0, 4).map((teacher, index) => (
          <CardFilterSearch
            key={`filter_teacher_${index}`}
            data={teacher}
            isSelected={selectedTeachers.includes(teacher._id)}
            setIsSelected={() => handleSelect(teacher._id)}
          />
        ))}
      </div>

      <SelectDialog
        isMultiChoice={true}
        name="Choose teacher(s)"
        value={value}
        onChange={onChange as any}
        options={teacherData.map((item: any) => ({
          _id: item._id,
          img: item.teacher_img,
          name: item.teacher_name,
        }))}
        type="search-page"
        placeholder="See more..."
      />
    </>
  );
}
