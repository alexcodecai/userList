import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/action/addUser";

function AddUser({ history, addUser }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [ageValid, setAgeValid] = useState(false);
  const [genderValid, setGenderValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  let payload = {
    firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1),
    lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
    age: Number(age),
    sex: gender.charAt(0).toUpperCase() + lastname.slice(1),
    password: Number(password)
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    let condition = (e.target.value.length < 8 || e.target.value.length > 2)
    setFirstNameValid(condition ? true : false);
   
  }
  const handleLastName = (e) => {
    setLastName(e.target.value);
    let condition = (e.target.value.length < 8 || e.target.value.length > 2)
    setLastNameValid(condition ? true : false);
   
  }

  const handleGender = (e) => {
    setGender(e.target.value);
    let condition = e.target.value === "M" || e.target.value === "F"
    setGenderValid(condition ? true : false);
  
  }
  
  const handleAge = (e) => {
    setAge(e.target.value);
    let condition = (e.target.value < 100 ) 
    setAgeValid(condition ? true : false);
    
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    let condition = (e.target.value < 9) 
    setPasswordValid(condition ? true : false);
   
  }

  const handleSubmit = e => {
    e.preventDefault();
      addUser(payload);
      setFirstName("");
      setLastName("");
      setAge("");
      setGender("");
      setPassword("");
      history.push("/");
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="addContainer">
          <h1>Add New User</h1>
          <p>Please fill in this form to create an account.</p>
          <div id="error_message"></div>
          <label>
            <b>firstname</b>
          </label>
          <input
            type="text"
            placeholder="Enter firstname"
            id="firstname"
            onChange={handleFirstName}
            required
          />
          {!firstNameValid && <p style={{color: "green"}}>Please enter valid first name.</p>}
          <label>
            <b>lastname</b>
          </label>
          <input
            type="text"
            placeholder="Enter lastname"
            name="lastname"
            id="lastname"
            onChange={handleLastName}
            required
          />
           {!lastNameValid && <p style={{color: "green"}}>Please enter valid last name.</p>}
          <label>
            <b>gender</b>
          </label>
          <input
            type="text"
            placeholder="Enter gender "
            name="gender"
            id="gender"
            onChange={handleGender}
            required
          />
          {!genderValid && <p style={{color: "green"}}>Please enter either M for Male or F for Female.</p>}
          <label>
            <b>age</b>
          </label>
          <input
            type="text"
            placeholder="Enter age "
            name="age"
            id="age"
            onChange={handleAge}
            required
          />
          {!ageValid && <p style={{color: "green"}}>Please dont dream.</p>}
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password "
            name="password"
            id="password"
            onChange={handlePassword}
            required
          />
           {!passwordValid && <p style={{color: "green"}}>password cant be longer than 8</p>}
          <button type="submit" className="registerbtn" >
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
    addUser: payload => {
      dispatch(addUser(payload));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
