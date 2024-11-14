import { Course } from "@/libs/models";
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

// [GET] /api/courses
export const GET = async () => {
  try {
    const courses = await Course.aggregate([{ $match: {} }]);

    if (!courses.length) return notFoundResponse();
    return successResponse({ data: courses });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
};
