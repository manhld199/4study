// Import libs
import { Course } from "@/libs/models";
import { type NextRequest } from "next/server";
import mongoose from "mongoose";

// Import utils
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

    // keyword
    let keywordStage = {};
    if (keyword == "" || !keyword) keywordStage = { $match: {} };
    else
      keywordStage = {
        $search: {
          index: "search",
          text: {
            query: keyword,
            path: {
              wildcard: "*",
            },
          },
        },
      };

    // Build the common part of the pipeline
    const basePipeline: any[] = [
      keywordStage,
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
      basePipeline.push({ $match: matchFilters });
    }

    // Sorting based on sortType
    let sortStage = {};
    if (sortType === "Popular") {
      sortStage = { enrolled_users: -1 };
    }

    if (Object.keys(sortStage).length > 0) {
      basePipeline.push({ $sort: sortStage }); // Ensure sorting before pagination
    }

    // Define the pipeline with pagination stages for fetching results
    const paginatedPipeline = [
      ...basePipeline,
      { $skip: skip },
      { $limit: limit },
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
    ];

    // Separate pipeline for counting total courses without pagination
    const countPipeline = [...basePipeline, { $count: "total" }];

    // Count the total number of matching documents
    const totalCourses = await Course.aggregate(countPipeline);
    const total = totalCourses[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Fetch the paginated results
    const courses = await Course.aggregate(paginatedPipeline);

    if (!courses.length) return notFoundResponse();

    return successResponse({
      data: { courses, pages: { total, totalPages, page } },
    });
  } catch (error) {
    console.log("Error: ", error);
    return errorResponse({ error });
  }
};
