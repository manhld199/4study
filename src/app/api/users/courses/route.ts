import { User } from "@/libs/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
// [POST] /api/users/courses
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in the request body" },
        { status: 400 }
      );
    }

    const result = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) }, 
      },
      {
        $project: {
          list_courses: 1, // Only include list_courses
        },
      },
      {
        $unwind: "$list_courses", 
      },
      {
        $group: {
          _id: "$_id", // Group by the user ID
          courses: { $push: "$list_courses.course_id" }, 
        },
      },
    ]);

    if (!result.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userCourses = result[0].courses;

    return NextResponse.json({
      data: userCourses, 
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.log("Error: ", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
