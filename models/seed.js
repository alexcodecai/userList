const faker = require('faker');
const User = require('./user');
const db = require("../config/keys").mongoURI;
const mongo = require("mongoose");
mongo
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err));

let array = ["M",'F','F'] 
let sex = array[Math.ceil(Math.random() * array.length)];
const seedUserData = () => {
  for (let i = 0; i < 30; i++) {
    const name = faker.name.firstName()
    const dates = faker.name.lastName()
    const age = faker.random.number(80);  
    const password = faker.random.number(99999999)
    User.create({
      admin:true,
      firstname: name,
      lastname: dates, 
      sex: sex,
      age: age,
      password:password
    }, (err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
      }
    });
  };
}


seedUserData();