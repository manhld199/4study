import { Course } from "@/libs/models";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "@/utils/functions/server";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

// [GET] /api/courses/[id]
export const GET = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return notFoundResponse({ message: "Invalid Course ID" });
    }

    // Tìm khóa học theo `id`
    const course = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

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

      { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },
    ]);

    if (!course) {
      return notFoundResponse({ message: "Course not found" });
    }

    return successResponse({ data: course });
  } catch (error) {
    console.error("Error fetching course:", error);
    return errorResponse({ error: "Internal Server Error" });
  }
};
