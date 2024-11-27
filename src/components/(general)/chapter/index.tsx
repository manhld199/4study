"use client";
const Chapter = ({
  title,
  index,
  onClick,
  isDisabled,
}: {
  title: string;
  index: number;
  onClick: (index: number) => void;
  isDisabled: boolean;
}) => {
  return (
    <div
      onClick={() => !isDisabled && onClick(index)} 
      className={`flex w-full h-[44px] bg-white items-center justify-center border border-[#D4D1D1] rounded-[18px] cursor-pointer hover:bg-gray-100 ${
        isDisabled ? "opacity-50 pointer-events-none" : "" 
      }`}>
      <p className="text-[16px] font-medium">{title}</p>
    </div>
  );
};

export default Chapter;
