// import libs
import React from "react";
import { ChevronRight } from "lucide-react";

// import components
import { Badge } from "@/components/ui/badge";

const RenderTrigger: React.FC<{
  type: string;
  value: string | string[];
  placeholder: string;
  options: any[];
  setIsDialogOpen: (open: boolean) => void;
}> = ({ type, value, placeholder, options, setIsDialogOpen }) => {
  switch (type) {
    case "badge":
      return (
        <div
          className="p-2 flex items-center justify-between border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md cursor-pointer"
          onClick={() => setIsDialogOpen(true)} // mở dialog khi click
        >
          {!value ? (
            <p className="text-sm text-zinc-500">{placeholder}</p>
          ) : Array.isArray(value) ? (
            <div className="flex flex-row gap-2">
              {value.map((item, index) => (
                <Badge key={`selected item ${index}`} variant="pri2">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <Badge variant="pri2">{value}</Badge>
          )}
          <ChevronRight />
        </div>
      );
    case "search-page":
      return (
        <div
          className="w-fit flex items-center justify-between cursor-pointer"
          onClick={() => setIsDialogOpen(true)} // mở dialog khi click
        >
          <p className="text-sm font-semibold text-pri2">{placeholder}</p>
          {/* <ChevronRight /> */}
        </div>
      );
    default:
      return (
        <div
          className="px-2 py-4 flex items-center justify-between border-b-[1px] border-zinc-300 cursor-pointer"
          onClick={() => setIsDialogOpen(true)} // mở dialog khi click
        >
          <p>
            {Array.isArray(value) ? value.join(", ") : value || placeholder}
          </p>
          <ChevronRight />
        </div>
      );
  }
};

export default RenderTrigger;
