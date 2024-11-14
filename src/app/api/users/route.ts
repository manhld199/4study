import { User } from "@/libs/models";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "@/utils/functions/server";

// [GET] /api/user
export const GET = async () => {
  try {
    const users = await User.aggregate([{ $match: {} }]);

    if (!users.length) return notFoundResponse();
    return successResponse({ data: users });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
};
