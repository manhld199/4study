import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

// import components
import { Button } from "@/components/ui/button";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages:number
}) {
  // const totalPages = 2;
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const newPages: number[] = [];

    // Trang đầu
    if (page > 2) {
      newPages.push(1); // Trang đầu
    }

    // Dấu "..." nếu có trang bị ẩn trước
    if (page > 3) {
      newPages.push(-1); // Dấu "..."
    }

    // Thêm các trang xung quanh trang hiện tại
    const rangeStart = Math.max(1, page - 1);
    const rangeEnd = Math.min(totalPages, page + 1);

    // Các trang gần trang hiện tại
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (!newPages.includes(i)) {
        // Kiểm tra trang này có bị trùng không
        newPages.push(i);
      }
    }

    // Dấu "..." nếu có trang bị ẩn sau
    if (page < totalPages - 2) {
      newPages.push(-1); // Dấu "..."
    }

    // Trang cuối
    if (page < totalPages - 1 && !newPages.includes(totalPages)) {
      newPages.push(totalPages);
    }

    setPages(newPages); // Cập nhật lại mảng các trang
  }, [page, totalPages]);

  return (
    <div className="w-full my-4 flex flex-row gap-4 justify-center items-center">
      {/* Nút quay lại trang đầu */}
      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === 1}
        onClick={() => setPage(1)}>
        <ChevronsLeft className="w-5 h-5 text-pri2" />
      </Button>

      {/* Nút quay lại trang trước */}
      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        <ChevronLeft className="w-5 h-5 text-pri2" />
      </Button>

      {/* Hiển thị các trang */}
      {pages.map((item, index) => {
        if (item === -1) {
          return (
            <span key={index} className="text-gray-500">
              {"..."}
            </span>
          );
        }

        return (
          <Button
            key={item}
            variant={page === item ? "icon" : "none"}
            size="icon-sm"
            className={`${
              page === item ? "text-pri2" : ""
            } rounded-full hover:bg-white hover:shadow-sm`}
            onClick={() => setPage(item)}>
            {item}
          </Button>
        );
      })}

      {/* Nút chuyển tới trang tiếp theo */}
      <Button
        variant="icon"
        size="icon-sm"
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
        <ChevronRight className="w-5 h-5 text-pri2" />
      </Button>

      {/* Nút chuyển tới trang cuối */}
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
