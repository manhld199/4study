// import libs
import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";

const RenderOption: React.FC<{
  option: { value?: string; _id?: string; name?: string; img?: string };
  isSelected: boolean;
  handleToggle: (value: string | any) => void;
  type: string;
}> = ({ option, isSelected, handleToggle, type }) => {
  const renderSelectionIndicator = () => {
    switch (isSelected) {
      case true:
        return (
          <div className="relative w-5 min-w-5 h-5 min-h-5">
            <div
              className={cn(
                "w-full h-full rounded-md border-2 flex justify-center items-center transition-all",
                "bg-pri2 dark:border-zinc-200"
              )}>
              <div className="w-3 h-3 text-white">
                <Check className="w-full h-full" />
              </div>
            </div>
          </div>
        );
      case false:
        return (
          <div className="relative w-5 h-5">
            <div
              className={cn(
                "w-full h-full rounded-md border-2 flex justify-center items-center transition-all",
                "border-zinc-500"
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderOptionContent = () => {
    switch (type) {
      case "search-page":
        return (
          <div
            className={`w-full flex flex-col gap-2 ${
              isSelected ? "bg-hover" : "bg-zinc-300"
            }`}>
            <div className="h-11 px-2 pt-2 grid grid-cols-[1.25rem_1fr] gap-2 text-black">
              {renderSelectionIndicator()}
              <p className="text-sm font-semibold line-clamp-2 capitalize">
                {option.name}
              </p>
            </div>

            {option.img && (
              <div className="relative w-full aspect-square">
                <Image
                  alt={option.name ?? ""}
                  src={option.img}
                  fill={true}
                  className="rounded-b-md object-cover"
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <>
            {renderSelectionIndicator()}
            {option.value}
          </>
        );
    }
  };

  return (
    <div
      className={cn(
        "m-1 cursor-pointer transition-all",
        "overflow-hidden rounded-lg hover:shadow-lg"
      )}
      onClick={() => handleToggle(option)}>
      {renderOptionContent()}
    </div>
  );
};

export default RenderOption;
