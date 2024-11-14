import React from "react";

interface TeacherProps {
  teacher_name: string;
  teacher_img: string;
  teacher_about: string;
}

const InfoTeacher: React.FC<TeacherProps> = ({
  teacher_name,
  teacher_img,
  teacher_about,
}) => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-16 h-16 mr-4">
        <img
          src={teacher_img}
          alt={teacher_name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex-1 text-[#2C2C2C]">
        <p className="text-[22px] font-semibold">{teacher_name}</p>
        <p className="text-[16px] text-justify">{teacher_about}</p>
      </div>
    </div>
  );
};

export default InfoTeacher;
