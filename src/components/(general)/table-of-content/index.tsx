"use client";

import React from "react";

interface TableOfContentsProps {
  items: { id: string; label: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full border border-[#5271FF] border-l-4 p-5 mx-auto">
      <h2 className="text-[#5271FF] text-xl font-bold mb-4">
        Table of Contents
      </h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="hover:text-[#11009E] transition-colors"
              onClick={(e) => handleSmoothScroll(e, item.id)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
