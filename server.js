const mongo = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;

const User = require("./models/user");
mongo
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err));

app.get("/api/users", (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    console.log(users);
    res.json(users);
  }).sort({ age: -1 });
});
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/users", (req, res) => {
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
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

app.put("/api/users/update/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => res.json(`something wrong when update`, err));
});

app.get('/api/users/sort/:id', (req, res) => {
  let item = req.params.id.split("_");
  let param = item[0];
  let order = () => {
    if (item[1] === "ascending") {
      return 1;
    } else {
      return -1;
    }
  }
  User.aggregate([{ $sort : { [param]: order() } }], (err, users) => {
    if (err) {
      console.log("An error occurs when sorting data", err);
    }
    res.json(users);
  })
})

app.listen(port, () => console.log(`server started on port ${port}`));
