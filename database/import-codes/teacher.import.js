// import libs
import fs from "fs";
import path from "path";
import connect from "./connect.js";
import mongoose from "mongoose";

// import data
import { teacherImgs } from "./data.js";

// read json file
const teachers = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "..", "preprocessed-data", "teacher.json"),
    "utf8"
  )
);
// console.log("aaaaaaaaaaaaaaaa", teachers);

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    teacher_name: { type: String, required: true },
    teacher_img: { type: String, required: true },
    teacher_about: { type: String },
    school_id: { type: Schema.Types.ObjectId, ref: "School" },
  },
  { timestamps: true }
);

const Teacher =
  mongoose.models?.Teacher || mongoose.model("Teacher", teacherSchema);

const importTeachers = teachers.map(
  (teacher, index) =>
    new Teacher({
      _id: new mongoose.Types.ObjectId(teacher.id),
      teacher_name: teacher.teacher_name,
      teacher_img: teacherImgs[Math.floor(Math.random() * teacherImgs.length)],
      teacher_about: teacher.teacher_about,
      school_id: new mongoose.Types.ObjectId(teacher.school_id),
    })
);
// console.log("aaaaaaaaaaaaaaaa", importTeachers);

// connect mongodb
connect();

// insert data
try {
  Teacher.insertMany(importTeachers).then(() =>
    console.log("Insert successfully")
  );
} catch (err) {
  console.log("Errrrrrrrrr: ", err);
}
