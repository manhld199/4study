// app/api/courses/popularity/route.ts
import { NextResponse } from "next/server";
import { User, Course } from "@/libs/models";
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

export async function GET() {
  try {
    // Đếm số lượng người đăng ký cho từng khóa học từ bảng `User`
    const enrollmentCounts = await User.aggregate([
      { $unwind: "$list_courses" }, // Tách từng khóa học trong `list_courses`
      {
        $group: {
          _id: "$list_courses.course_id", // Nhóm theo `course_id`
          enrollment_count: { $sum: 1 }   // Đếm số lần xuất hiện của `course_id`
        }
      }
    ]);

    // console.log("Enrollment Counts:", enrollmentCounts);

    // Tạo một map để dễ dàng tra cứu `enrollment_count` theo `course_id`
    const enrollmentMap = enrollmentCounts.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr.enrollment_count;
      return acc;
    }, {});

    // console.log("Enrollment Map:", enrollmentMap);

    // Lấy thông tin khóa học, trường học và giáo viên liên quan
    const result = await Course.aggregate([
      {
        $lookup: {
          from: "schools",
          localField: "school_id",
          foreignField: "_id",
          as: "school",
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "teachers",
          foreignField: "_id",
          as: "teachers",
        },
      },
      {
        $unwind: {
          path: "$school",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          course_name: 1,
          course_img: 1,
          course_about: 1,
          course_videos: 1,
          enrollment_count: 1,
          "school.school_name": 1,
          "school.school_img": 1,
          "school.school_about": 1,
          "teachers.teacher_name": 1,
          "teachers.teacher_img": 1,
          "teachers.teacher_about": 1,
        },
      },
    ]);

    result.forEach((course) => {
      const enrollmentCount = enrollmentMap[course._id.toString()] || 0;
      // console.log(`Course ID: ${course._id}, Enrollment Count: ${enrollmentCount}`);
      course.enrollment_count = enrollmentCount;
    });
    
    // Kiểm tra lại việc sắp xếp
    // console.log("Sorted Results:", result);
    result.sort((a, b) => b.enrollment_count - a.enrollment_count);
    

    // Kiểm tra xem có dữ liệu không
    if (!result.length) return notFoundResponse();

    return successResponse({
      data: result,
    });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
}
