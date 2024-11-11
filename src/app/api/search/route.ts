// import libs
import { Course } from "@/libs/models";
import { type NextRequest } from "next/server";
import mongoose from "mongoose";

// import utils
import {
  successResponse,
  notFoundResponse,
  errorResponse,
} from "@/utils/functions/server";

// [GET] /api/search?keyword={}&teachers=[]&schools=[]&sort={}&page={}&limit={}
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");
    const sortType = searchParams.get("sort") || "Top";
    const filterSchool = searchParams.get("schools");
    const filterTeacher = searchParams.get("teachers");
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "9", 10); // Default to 9 items per page
    const skip = (page - 1) * limit; // Skip based on the current page

    // Build the aggregation pipeline
    const pipeline: any[] = [
      {
        $search: {
          index: "search",
          text: {
            query: keyword,
            path: {
              wildcard: "*", // Search across all fields in Course model
            },
          },
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
          as: "teachers",
        },
      },
      {
        $unwind: {
          path: "$school",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    // Apply filtering if filterSchool or filterTeacher is present
    const matchFilters: any = {};

    if (filterSchool) {
      const schoolIds = filterSchool.split(",");
      matchFilters["school._id"] = {
        $in: schoolIds.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    if (filterTeacher) {
      const teacherIds = filterTeacher.split(",");
      matchFilters["teachers"] = {
        $elemMatch: {
          _id: { $in: teacherIds.map((id) => new mongoose.Types.ObjectId(id)) },
        },
      };
    }

    if (Object.keys(matchFilters).length > 0) {
      pipeline.push({ $match: matchFilters });
    }

    // Sorting based on sortType
    let sortStage = {};
    if (sortType === "Popular") {
      sortStage = { rank_popular: -1 };
    } else if (sortType === "Personalized") {
      sortStage = { rank_personalized: -1 };
    }

    if (Object.keys(sortStage).length > 0) {
      pipeline.push({ $sort: sortStage });
    }

    // Pagination stages: skip and limit
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Project the required fields
    pipeline.push({
      $project: {
        course_name: 1,
        course_img: 1,
        course_about: 1,
        course_videos: 1,
        "school.school_name": 1,
        "school.school_img": 1,
        "school.school_about": 1,
        "teachers.teacher_name": 1,
        "teachers.teacher_img": 1,
        "teachers.teacher_about": 1,
      },
    });

    // Count the total number of matching documents (for pagination info)
    const totalCourses = await Course.aggregate([
      ...pipeline.slice(0, pipeline.length - 2), // Exclude pagination stages
      { $count: "total" },
    ]);

    const total = totalCourses[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const courses = await Course.aggregate(pipeline);

    if (!courses.length) return notFoundResponse();

    return successResponse({
      data: { courses, pages: { total, totalPages, page } },
    });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
};
