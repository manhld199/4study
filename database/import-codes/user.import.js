// import libs
import fs from "fs";
import path from "path";
import connect from "./connect.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// import data
import { userImgs } from "./data.js";

// read json file
const users = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "..", "preprocessed-data", "user.json"),
    "utf8"
  )
);
// console.log("aaaaaaaaaaaaaaaa", users);

// Hàm để mã hóa mật khẩu
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Mã hóa mật khẩu
const hashedPassword = await hashPassword("Password1234"); // Mã hóa mật khẩu 'Password1234'

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_password: { type: String, required: true },
    user_img: { type: String, required: true },
    list_courses: [
      {
        enroll_time: { type: Date },
        course_id: { type: Schema.Types.ObjectId, ref: "Course" },
      },
    ],
    suggested_courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

const importUsers = users.map(
  (user, index) =>
    new User({
      _id: new mongoose.Types.ObjectId(user.id),
      user_name: user.user_name,
      user_email: user.user_email,
      user_password: hashedPassword,
      user_img: userImgs[Math.floor(Math.random() * userImgs.length)],
      list_courses: user.list_courses.map((course) => ({
        enroll_time: new Date(course.enroll_time),
        course_id: new mongoose.Types.ObjectId(course.course_id),
      })),
    })
);
// console.log("aaaaaaaaaaaaaaaa", importUsers);
// console.log("bbbbbbbbbbbbbbbb", importUsers[0].list_courses);

// connect mongodb
connect();

// insert data
try {
  User.insertMany(importUsers).then(() => console.log("Insert successfully"));
} catch (err) {
  console.log("Errrrrrrrrr: ", err);
}
