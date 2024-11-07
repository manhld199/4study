// import libs
import fs from "fs";
import path from "path";
import connect from "./connect.js";
import mongoose from "mongoose";

// import data
import { courseImgs, courseVideos } from "./data.js";

// read json file
const courses = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "..", "preprocessed-data", "course.json"),
    "utf8"
  )
);
// console.log("aaaaaaaaaaaaaaaa", courses);

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    course_name: { type: String, required: true },
    course_img: { type: String, required: true },
    course_about: { type: String },
    course_videos: [{ type: String }],
    school_id: { type: Schema.Types.ObjectId, ref: "School" },
    teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  },
  { timestamps: true }
);

const Course =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);

const importCourses = courses.map(
  (course, index) =>
    new Course({
      _id: new mongoose.Types.ObjectId(course.id),
      course_name: course.course_name,
      course_img: courseImgs[Math.floor(Math.random() * courseImgs.length)],
      course_about: course.course_about,
      course_videos: [
        courseVideos[Math.floor(Math.random() * courseVideos.length)],
      ],
      school_id: new mongoose.Types.ObjectId(course.school_id),
      teachers: course.teachers.map(
        (teacher) => new mongoose.Types.ObjectId(teacher)
      ),
    })
);
// console.log("aaaaaaaaaaaaaaaa", importCourses);

// connect mongodb
connect();

// insert data
try {
  Course.insertMany(importCourses).then(() =>
    console.log("Insert successfully")
  );
} catch (err) {
  console.log("Errrrrrrrrr: ", err);
}
