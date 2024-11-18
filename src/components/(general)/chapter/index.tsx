"use client";

const Chapter = ({
  title,
  index,
  onClick,
}: {
  title: string;
  index: number;
  onClick: (index: number) => void;
}) => {
  return (
    <div
      onClick={() => onClick(index)} // Truyền index của Chapter được click
      className="flex w-full h-[44px] bg-white items-center justify-center border border-[#D4D1D1] rounded-[18px] cursor-pointer hover:bg-gray-100">
      <p className="text-[16px] font-medium">{title}</p>
    </div>
  );
};

export default Chapter;
