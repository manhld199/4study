"use client";

import React, { FormEvent } from "react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  // Đặt kiểu cho email, error và successMessage
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hàm kiểm tra email hợp lệ bằng regex
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Hàm xử lý submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Xóa thông báo lỗi trước mỗi lần submit mới
    setError("");
    setSuccessMessage("");

    // Kiểm tra xem email đã được nhập chưa
    if (!email) {
      setError("Email is required");
      return;
    }

    // Kiểm tra định dạng email
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Giả lập gửi yêu cầu thành công
    setTimeout(() => {
      // Cập nhật thông báo thành công và reset form
      setSuccessMessage("Email submitted successfully");
      setIsSubmitting(false);
      setEmail(""); // Reset email input field
    }, 1000);
  };

  return (
    <footer className="bg-white py-8 bottom-0 left-0 right-0 pt-[50px] pb-[50px]">
      <div className="container mx-auto flex flex-col items-center px-4 space-y-4">
        {/* Logo and Links Row */}
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="bg-white-200 text-black font-bold py-2 px-4">
            <Image src="/imgs/Logo.png" alt="Logo" width={300} height={300} />
          </div>

          {/* Links */}
          <div className="flex flex-col text-black text-sm space-y-2 text-left text-[#2C2C2C]">
            <div className="font-medium text-[22px] pb-[20px]">Resources</div>
            <a href="/about-us" className="text-[16px] hover:text-[#5271FF]">
              About us
            </a>
            <a href="/term-of-use" className="text-[16px] hover:text-[#5271FF]">
              Term of use
            </a>
            <a
              href="/term-of-service"
              className="text-[16px] hover:text-[#5271FF]">
              Term of service
            </a>
          </div>

          <div className="flex flex-col max-w-[354px] min-w-[354px] text-black text-sm space-y-2 text-left text-[#2C2C2C]">
            <div className="font-medium text-[22px] pb-[20px]">
              Join Our Newsletter
            </div>
            <p className="text-[16px] pb-[10px]">
              Provide your email address to receive updates, insights, and
              resources directly to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full max-w-sm mx-auto">
              <div className="flex items-center justify-between w-full border-[#D9D9D9] border-[1.4px] rounded-[18px] px-1 min-h-12 bg-opacity-50">
                <input
                  type="text"
                  placeholder="Your Email Address"
                  className="w-full border-0 outline-none bg-transparent ml-[4px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#5271FF] text-white rounded-[18px] py-2 px-8 h-8 flex items-center whitespace-nowrap justify-center hover:bg-[#11009E]"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Sign up"}
                </button>
              </div>
              {/* Hiển thị thông báo lỗi nếu có */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {/* Hiển thị thông báo thành công nếu có */}
              {successMessage && (
                <p className="text-green-500 text-bold mt-2">
                  {successMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
