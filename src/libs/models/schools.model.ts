var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schools = new Schema({
  school_name: { type: String },
  school_about: { type: String },
  school_img: { type: String },
});
