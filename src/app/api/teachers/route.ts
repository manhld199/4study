import { Teacher } from "@/libs/models";
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

// [GET] /api/teachers
export const GET = async () => {
  try {
    const teachers = await Teacher.aggregate([{ $match: {} }]);

    if (!teachers.length) return notFoundResponse();
    return successResponse({ data: teachers });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
};
