import { NextResponse } from "next/server";
import { Course } from "@/libs/models";
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

export async function GET() {
  try {
    // 1. Tính số lượng khóa học của mỗi trường học
    const schoolsWithCourseCount = await Course.aggregate([
      {
        $group: {
          _id: "$school_id",  // Nhóm theo trường học
          courseCount: { $sum: 1 },  // Đếm số lượng khóa học của từng trường
        },
      },
      {
        $sort: { courseCount: -1 },  // Sắp xếp giảm dần theo số lượng khóa học
      },
      {
        $limit: 1,  // Lấy trường có số khóa học nhiều nhất
      },
    ]);

    // Kiểm tra nếu không có trường học nào
    if (!schoolsWithCourseCount.length) {
      return notFoundResponse({ message: "No schools found" });
    }

    // Lấy ID của trường có số khóa học nhiều nhất
    const schoolId = schoolsWithCourseCount[0]._id;
    const courseCount = schoolsWithCourseCount[0].courseCount;

    // 2. Lấy tất cả các khóa học của trường đó
    const result = await Course.aggregate([
      {
        $match: {
          school_id: schoolId,  // Lọc các khóa học có trường là trường có số khóa học nhiều nhất
        },
      },
      {
        $lookup: {
          from: "schools",
          localField: "school_id",
          foreignField: "_id",
          as: "school",  // Lấy thông tin trường
        },
      },
      {
        $unwind: {
          path: "$school",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "teachers",
          foreignField: "_id",
          as: "teachers",  // Lấy thông tin giáo viên
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
          "school.course_count": { $literal: courseCount },  // Thêm số lượng khóa học vào thông tin trường
          "teachers.teacher_name": 1,
          "teachers.teacher_img": 1,
          "teachers.teacher_about": 1,
        },
      },
    ]);

    // Kiểm tra nếu không có khóa học nào của trường
    if (!result.length) {
      return notFoundResponse({ message: `No courses found for school with ID ${schoolId}` });
    }

    // 3. Trả về danh sách khóa học của trường có số khóa học nhiều nhất
    return successResponse({
      message: "Thành công",
      data: {
        school: {
          _id: schoolId,
          total_courses: courseCount,  // Thêm số lượng khóa học của trường
        },
        courses: result,  // Trả về danh sách các khóa học của trường
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
}
