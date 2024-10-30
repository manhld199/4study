var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var teachers = new Schema({
  teacher_name: { type: String, required: true },
  teacher_about: { type: String, required: true },
  school_id: { type: Schema.Types.ObjectId, required: true },
  teacher_img: { type: String },
});
