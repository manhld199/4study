import { NextResponse } from "next/server";
import { Course, Teacher } from "@/libs/models"; // Giả sử bạn có mô hình Teacher trong MongoDB
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

export async function GET() {
  try {
    // 1. Tìm giáo viên có nhiều khóa học nhất
    const mostCoursesTeacher = await Course.aggregate([
      {
        $unwind: "$teachers", // Mỗi khóa học có thể có nhiều giáo viên, nên ta cần tách giáo viên ra thành các bản ghi riêng
      },
      {
        $group: {
          _id: "$teachers", // Nhóm theo teacher_id
          total_courses: { $sum: 1 }, // Đếm số lượng khóa học của mỗi giáo viên
        },
      },
      {
        $sort: { total_courses: -1 }, // Sắp xếp giảm dần theo số lượng khóa học
      },
      {
        $limit: 1, // Lấy giáo viên có số khóa học nhiều nhất
      },
    ]);

    if (!mostCoursesTeacher.length) {
      return notFoundResponse({ message: "No teacher found with courses" });
    }

    const teacherId = mostCoursesTeacher[0]._id; // Lấy ID của giáo viên có nhiều khóa học nhất

    // 2. Lấy các khóa học mà giáo viên này giảng dạy
    const courses = await Course.aggregate([
      {
        $match: {
          teachers: { $in: [teacherId] }, // Lọc các khóa học có giáo viên là giáo viên có nhiều khóa học nhất
        },
      },
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
          as: "teachers", // Thêm thông tin về giáo viên
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

    // Kiểm tra nếu không có khóa học nào
    if (!courses.length) {
      return notFoundResponse({ message: `No courses found for teacher with ID ${teacherId}` });
    }

    // 3. Trả về các khóa học của giáo viên có nhiều khóa học nhất
    return successResponse({
      data: {
        teacher: mostCoursesTeacher[0], // Trả về thông tin giáo viên
        courses: courses, // Trả về danh sách các khóa học
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
}
