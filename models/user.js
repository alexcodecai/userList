const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  sex: String,
  age: Number,
  password:Number,
  admin:Boolean,
});

module.exports = User = mongoose.model("user", UserSchema);


