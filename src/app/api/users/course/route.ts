import { NextRequest, NextResponse } from "next/server";
import { User } from "@/libs/models";
import mongoose from "mongoose";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "@/utils/functions/server";

// [POST] /api/users/course
export async function POST(req: NextRequest) {
  try {
    const { userId, courseId, enrollTime } = await req.json();

    
    console.log("Request Body received:", { userId, courseId, enrollTime });

    if (!userId || !courseId || !enrollTime) {
      return NextResponse.json(
        errorResponse({
          message: "Missing required fields (userId, courseId, enrollTime).",
        }),
        { status: 400 }
      );
    }

    const result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $addFields: {
          isCourseEnrolled: {
            $in: [
              new mongoose.Types.ObjectId(courseId),
              "$list_courses.course_id",
            ],
          },
        },
      },
      {
        $project: {
          list_courses: 1,
          isCourseEnrolled: 1,
        },
      },
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        notFoundResponse({ message: "User not found." }),
        { status: 404 }
      );
    }

    const user = result[0];

    if (user.isCourseEnrolled) {
      return NextResponse.json(
        successResponse({
          message: "User is already enrolled in this course.",
        }),
        { status: 200 }
      );
    }

    // Thêm khóa học vào list_courses
    const newCourse = {
      course_id: new mongoose.Types.ObjectId(courseId),
      enroll_time: new Date(enrollTime),
    };

    const updatedUser = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $push: { list_courses: newCourse } }
    );

    if (updatedUser.modifiedCount > 0) {
      return NextResponse.json(
        successResponse({
          message: "Course successfully added to user's list.",
          data: { userId, courseId, enrollTime },
        }),
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        notFoundResponse({ message: "Failed to update user courses." }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(errorResponse({ error }), { status: 500 });
  }
}
