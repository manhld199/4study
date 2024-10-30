import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  school_name: { type: String, required: true },
  school_img: { type: String, required: true },
  school_about: { type: String },
});

const School = mongoose.models?.School || mongoose.model("School", schoolSchema);

export default School;
