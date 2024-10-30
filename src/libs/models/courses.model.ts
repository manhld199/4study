var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var courses = new Schema({
  course_name: { type: String, required: true },
  course_about: { type: String, required: true },
  course_videos: { type: String, required: true },
  school_id: { type: Schema.Types.ObjectId, required: true },
  teachers: [{ type: Schema.Types.ObjectId, required: true }],
  course_img: { type: String, required: true },
});
