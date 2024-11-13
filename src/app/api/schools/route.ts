import { School } from "@/libs/models";
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

// [GET] /api/schools
export const GET = async () => {
  try {
    const schools = await School.aggregate([{ $match: {} }]);

    if (!schools.length) return notFoundResponse();
    return successResponse({ data: schools });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
};
