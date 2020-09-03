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

var alex = new User({
  firstname: 'alex',
  lastname: 'cai',
  sex: 'M',
  age: 21,
  password:'123456',
  admin:true
})

var james = new User({
  firstname: 'james',
  lastname: 'lee',
  sex: 'M',
  age: 32,
  password:'123456',
  admin:true
})

// alex.save((err, user) => {
//   if (err) {
//       console.log("SOMETHING WENT WRONG" + err);
//   }
//   else{
//     console.log("A new user added to records");
//   }
  
// })

// james.save((err, user) => {
//   if (err) {
//       console.log("SOMETHING WENT WRONG");
//   } else{
//     console.log("A new user added to records");
//   }
  
// })