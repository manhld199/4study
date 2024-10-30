var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var users = new Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true },
  user_password: { type: String, required: true },
  list_courses: [
    {
      enroll_time: { type: Date, required: true },
      course_id: { type: Schema.Types.ObjectId, required: true },
      required: true,
    },
  ],
  suggest_courses: [{ type: Schema.Types.ObjectId }],
  user_img: { type: String, required: true },
});
