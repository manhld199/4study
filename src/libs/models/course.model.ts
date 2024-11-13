import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    course_name: { type: String, required: true },
    course_img: { type: String, required: true },
    course_about: { type: String },
    course_videos: [{ type: String }],
    school_id: { type: Schema.Types.ObjectId, ref: "School" },
    teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
    enrolled_users: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Course =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);

export default Course;
