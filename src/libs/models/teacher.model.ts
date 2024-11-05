import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  teacher_name: { type: String, required: true },
  teacher_img: { type: String, required: true },
  teacher_about: { type: String },
  school_id: { type: Schema.Types.ObjectId, ref: "School" },
});

const Teacher = mongoose.models?.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
