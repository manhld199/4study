import { Course, User, School, Teacher } from "@/libs/models";
import { errorResponse, notFoundResponse, successResponse } from "@/utils/functions/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";

// Định nghĩa kiểu cho đối tượng trong list_courses
interface ListCourse {
  course_id: string;
  enroll_time: string;
}

export async function GET(request: Request) {
  try {
    // Lấy session từ NextAuth
    const session = await getServerSession(authOptions);

    // Nếu không có session, trả về phản hồi không hợp lệ
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log(session);
    const userId = session.user.id;

    // Kiểm tra ObjectId hợp lệ
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const objectIdUser = new ObjectId(userId);

    // Truy vấn thông tin người dùng và lấy trường `list_courses`
    const user = await User.aggregate([
      {
        $match: {
          _id: objectIdUser, // Lọc theo ID người dùng
        },
      },
      {
        $project: {
          list_courses: 1, // Chỉ lấy trường `list_courses`
        },
      },
    ]);

    // Kiểm tra nếu người dùng không có dữ liệu
    if (!user.length) {
      return notFoundResponse();
    }

    // Lấy mảng các khóa học mà người dùng đã đăng ký
    const listCourses: ListCourse[] = user[0].list_courses;

    // Truy vấn chi tiết các khóa học dựa trên `course_id` trong `list_courses`
    const courses = await Course.aggregate([
      {
        $match: {
          _id: { $in: listCourses.map((course: ListCourse) => new ObjectId(course.course_id)) }, // Lọc khóa học theo course_id trong list_courses
        },
      },
      {
        $lookup: {
          from: "schools", // Lấy thông tin trường học từ bộ sưu tập "schools"
          localField: "school_id", // Trường khóa học chứa school_id
          foreignField: "_id", // Kết nối với trường _id của bộ sưu tập schools
          as: "school", // Kết quả lưu vào trường "school"
        },
      },
      {
        $lookup: {
          from: "teachers", // Lấy thông tin giáo viên từ bộ sưu tập "teachers"
          localField: "teachers", // Trường khóa học chứa mảng ID giáo viên
          foreignField: "_id", // Kết nối với trường _id của bộ sưu tập teachers
          as: "teachers", // Kết quả lưu vào trường "teachers"
        },
      },
      {
        $unwind: { path: "$school", preserveNullAndEmptyArrays: true }, // Giải nén trường "school"
      },
      {
        $unwind: { path: "$teachers", preserveNullAndEmptyArrays: true }, // Giải nén trường "teachers"
      },
      {
        $project: {
          course_name: 1,
          course_img: 1,
          course_about: 1,
          enrolled_users: 1,
          "school.school_name": 1,
          "school.school_img": 1,
          "school.school_about": 1,
          teachers:{ $ifNull: ["$teachers", []] }, // Lấy thông tin mô tả giáo viên
        },
      },
    ]);

    // Kiểm tra nếu không có khóa học nào được tìm thấy
    if (!courses.length) {
      return notFoundResponse();
    }

    // Trả về kết quả thành công
    return successResponse({ data: courses });
  } catch (error) {
    console.error("Error: ", error);
    return errorResponse({ error: "Đã có lỗi xảy ra khi lấy khóa học" });
  }
}
