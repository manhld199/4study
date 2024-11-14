// app/api/courses/popularity/route.ts
import { NextResponse } from "next/server";
import { Course } from "@/libs/models";
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

export async function GET() {
  try {
    // Lấy thông tin khóa học, trường học và giáo viên liên quan, đồng thời sử dụng trường `enrollment_count` trong Course
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
          enrolled_users: 1,
          "school.school_name": 1,
          "school.school_img": 1,
          "school.school_about": 1,
          "teachers.teacher_name": 1,
          "teachers.teacher_img": 1,
          "teachers.teacher_about": 1,
        },
      },
    ]);

    // Kiểm tra nếu không có dữ liệu
    if (!result.length) return notFoundResponse();

    return successResponse({
      data: result,
    });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
}
