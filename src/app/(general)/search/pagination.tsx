// import libs
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

// import components
import { Button } from "@/components/ui/button";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) {
  const [pages, setPages] = useState<number[]>(
    Array.from({ length: totalPages }, (_, index) => index + 1).filter(
      (p) => p <= page + 1 && p >= page - 1
    )
  );

  return (
    <div className="w-full my-4 flex flex-row gap-4 justify-center items-center">
      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === 1}
        onClick={() => setPage(1)}>
        <ChevronsLeft className="w-5 h-5 text-pri2" />
      </Button>
      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.min(prev - 1, totalPages))}>
        <ChevronLeft className="w-5 h-5 text-pri2" />
      </Button>

      {page > 2 && (
        <>
          {page != 1 && (
            <Button
              variant={page == 1 ? "icon" : "none"}
              size="icon-sm"
              className={`${
                page == 1 ? "text-pri2" : ""
              } rounded-full hover:bg-white hover:shadow-sm`}
              onClick={() => setPage(1)}>
              {1}
            </Button>
          )}

          {"..."}
        </>
      )}

      {pages.map((item) => (
        <Button
          key={`page ${item}`}
          variant={page == item ? "icon" : "none"}
          size="icon-sm"
          className={`${
            page == item ? "text-pri2" : ""
          } rounded-full hover:bg-white hover:shadow-sm`}
          onClick={() => setPage(item)}>
          {item}
        </Button>
      ))}

      {page < totalPages - 1 && (
        <>
          {"..."}

          {page != totalPages && (
            <Button
              variant={page == totalPages ? "icon" : "none"}
              size="icon-sm"
              className={`${
                page == totalPages ? "text-pri2" : ""
              } rounded-full hover:bg-white hover:shadow-sm`}
              onClick={() => setPage(totalPages)}>
              {totalPages}
            </Button>
          )}
        </>
      )}

      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.max(prev + 1, 1))}>
        <ChevronRight className="w-5 h-5 text-pri2" />
      </Button>
      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}>
        <ChevronsRight className="w-5 h-5 text-pri2" />
      </Button>
    </div>
  );
}
