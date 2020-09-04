import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/action/addUser";

function AddUser({ history, addUser }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  let payload = {
    firstname: firstname,
    lastname: lastname,
    age: age,
    sex: gender,
    password: password
  };
  console.log(addUser)
  const handleSubmit = e => {
    e.preventDefault();
    addUser(payload);
    setFirstName("");
    setLastName("");
    setAge("");
    setGender("");
    setPassword("");
  };
 console.log(payload)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="addContainer">
          <h1>Add New User</h1>
          <p>Please fill in this form to create an account.</p>

          <label>
            <b>firstname</b>
          </label>
          <input
            type="text"
            placeholder="Enter firstname"
            name="firstname"
            id="firstname"
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <label>
            <b>lastname</b>
          </label>
          <input
            type="text"
            placeholder="Enter lastname"
            name="lastname"
            id="lastname"
            onChange={e => setLastName(e.target.value)}
            required
          />
          <label>
            <b>gender</b>
          </label>
          <input
            type="text"
            placeholder="Enter gender "
            name="gender"
            id="gender"
            onChange={e => setGender(e.target.value)}
            required
          />
          <label>
            <b>age</b>
          </label>
          <input
            type="text"
            placeholder="Enter age "
            name="age"
            id="age"
            onChange={e => setAge(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password "
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="registerbtn">
            Register New User
          </button>
          <button className="registerbtn" onClick={() => history.push("/")}>
            back to user page
          </button>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (payload) => {
      dispatch(addUser(payload));
    }
  };
};

export default connect(mapDispatchToProps)(AddUser);
