const mongo = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;

const User = require("./models/user");
mongo
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err));

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/users", (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    res.json(users);
  });
});

app.get("/api/users/:id", (req, res) => {
  let id = req.params.id
  User.find({_id: id}, (err, users) => {
    if (err) {
      console.log("An error occurred when getting one user", err);
    }
    console.log(req.params.id);
    res.json(users);
  })
});

app.use(bodyParser.json());

app.post("/api/users", (req, res) => {
  console.log("-------------", req.body);
  const newUser = new User({
    admin: req.body.admin,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    sex: req.body.sex,
    age: req.body.age,
    password: req.body.password
  });
  newUser.save().then(res.json(`New data ${newUser} inserted`));
});

app.delete("/api/users/deleteone/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json(user)))
    .catch(err => res.status(404).json(err));
});

app.put("/api/users/update/:id", (req, res) => {
  console.log("-------------", req.body)
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => res.json(`something wrong when update`, err));
});

app.get("/api/users/serach/:id", (req, res) => {
  let item = req.params.id;
  let age = Number(req.params.id)
   User.aggregate( ( [ { $match: { $or: [{ firstname: item }, { lastname: item }, { age: age }, { sex: item }] } } ]),(err, users) => {
    if (err) {
      console.log("An error occurs when seatch users", err);
    }
    res.json(users)
  },)
 
});

app.get("/api/users/sort/:id", (req, res) => {
  let item = req.params.id.split("_");
  let param = item[0];
  let order = () => {
    if (item[1] === "ascending") {
      return 1;
    } else {
      return -1;
    }
  };
  User.aggregate(
    [
      {
        $sort: { [param]: order() }
      }
    ],
    (err, users) => {
      if (err) {
        console.log("An error occurs when sorting data", err);
      }
      res.json(users);
    }
  );
});


// app.get("api/users/serach/:condition" ,(req, res) =>{
//   const array = req.params.condition.split("-");
//   const sort = arr[0];
//   const search = arr[1];
//   if ()

// })







// app.get('/api/users/search/:condition', (req, res) => {
//   const arr = req.params.condition.split("-");
//   const sort = arr[0];
//   const userName = arr[1];
//   console.log(sort);
//   console.log(userName)
//   // when there is userName
//   let sortArray = (array, sort) => {
//     if (sort === "") {
//       return array;
//     }
//     let param = sort.split("_")[0];
//     let order = sort.split("_")[1];

//     if (param === "age") {
//       if (order === "ascending") {
//         array.sort(function(a, b){
//           return a.age - b.age;
//         })
//       } else {
//         array.sort(function(a, b){
//           return b.age - a.age;
//         })
//       }
//     } else {
//       if (order === "ascending") {
//         array.sort(function(a,b){
//           return a[param].localeCompare(b[param]);
//         })
//       } else {
//         array.sort(function(a,b){
//           return b[param].localeCompare(a[param]);
//         })
//       }
//     }
//     return array;
//   }

//   // When there is no userName
//   if (!userName) {
//     console.log('no',sort);
//     console.log(userName)
//     if (sort === "") {
//       User.find({})
//       .then(user => res.status(200).json(user))
//       .catch(err => res.status(404).json(err))
//     } else {
//       let param = sort.split("_")[0];
//       let order = sort.split("_")[1];
//       let getOrder = () => {
//         if (order === "ascending") {
//           return 1;
//         } else {
//           return -1;
//         }
//       }
//       User.aggregate([{ $sort: { [param]: getOrder() } }])
//         .then(users => res.status(200).json(users))
//         .catch(err => res.status(404).json(err))
//     }
//   } else {
//     const regex = new RegExp("^" + userName, 'gi');

//     User.find({
//       '$or': [
//         { 'firstname': regex },
//         { 'lastname': regex }
//       ]})
//       .exec()
//       .then(users => res.status(200).json(sortArray(users, sort)))
//       .catch(err => res.status(404).json(err))
//   }
// });







app.listen(port, () => console.log(`server started on port ${port}`));
