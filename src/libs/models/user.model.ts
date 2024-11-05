import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
