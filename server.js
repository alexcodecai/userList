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

app.get("/api/users/combine/:id", (req, res) => {
  //console.log('sort',req.params.id, 'search', req.query.searchInput , req.params)
  let item = req.params.id.split("-");
  let sort = item[0];
  let serachInput = item[1];
  console.log(sort, '------------', serachInput)
    if (sort === "") {
    serach(res, serachInput);
  } else if (serachInput === "") {
    sorting(res, sort);
  } 
    else {
    let age = Number(req.query.serachInput);
    let item = sort.split("_");
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
          $match: {
            $or: [
              { firstname: serachInput },
              { lastname: serachInput },
              { age: age },
              { sex: serachInput }
            ]
          }
        },
        {
          $sort: { [param]: order() }
        }
      ],
      (err, users) => {
        if (err) {
          console.log("An error occurs when search and sorting users", err);
        }
        console.log(users);
        res.json(users);
      }
    );
  }
});

app.get("/api/users/:id", (req, res) => {
  let id = req.params.id;
  User.find({ _id: id }, (err, users) => {
    if (err) {
      console.log("An error occurred when getting one user", err);
    }
    console.log(req.params.id);
    res.json(users);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    .then(user => user.remove().then(() => res.status(200).json(user)))
    .catch(err => res.status(500).json(err));
});

app.put("/api/users/update/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => res.res.status(500).json(`something wrong when update`, err));
});



const serach = (res, serachInput) => {
  let age = Number(serachInput);
  User.aggregate(
    [
      {
        $match: {
          $or: [
            { firstname: serachInput },
            { lastname: serachInput },
            { age: age },
            { sex: serachInput }
          ]
        }
      }
    ],
    (err, users) => {
      if (err) {
        console.log("An error occurs when seatch users", err);
      }
      console.log(users);
      res.json(users);
    }
  );
};

const sorting = (res, sort) => {
  let item = sort.split("_");
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
};


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


app.get("/api/users/serach/:id", (req, res) => {
  let item = req.params.id;
  let age = Number(req.params.id);
  User.aggregate(
    [
      {
        $match: {
          $or: [
            { firstname: item },
            { lastname: item },
            { age: age },
            { sex: item }
          ]
        }
      }
    ],
    (err, users) => {
      if (err) {
        console.log("An error occurs when seatch users", err);
      }
      res.json(users);
    }
  );
});

app.listen(port, () => console.log(`server started on port ${port}`));
