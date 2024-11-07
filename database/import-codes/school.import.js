// import libs
import fs from "fs";
import path from "path";
import connect from "./connect.js";
import mongoose from "mongoose";

// import data
import { schoolImgs } from "./data.js";

// read json file
const schools = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "..", "preprocessed-data", "school.json"),
    "utf8"
  )
);

const Schema = mongoose.Schema;

const schoolSchema = new Schema(
  {
    school_name: { type: String, required: true },
    school_img: { type: String, required: true },
    school_about: { type: String },
  },
  { timestamps: true }
);

const School =
  mongoose.models?.School || mongoose.model("School", schoolSchema);

const importSchools = schools.map(
  (school, index) =>
    new School({
      _id: new mongoose.Types.ObjectId(school.id),
      school_name: school.school_name,
      school_about: school.school_about,
      school_img: schoolImgs[Math.floor(Math.random() * schoolImgs.length)],
    })
);
// console.log("aaaaaaaaaaaaaaaa", importSchools);

// connect mongodb
connect();

// insert data
try {
  School.insertMany(importSchools).then(() =>
    console.log("Insert successfully")
  );
} catch (err) {
  console.log("Errrrrrrrrr: ", err);
}
