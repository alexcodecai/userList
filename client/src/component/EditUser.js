import React, { useEffect, useState } from "react";
import { getSingleUser } from "../redux/action/getSingleUser";
import { connect } from "react-redux";
import { updateUser } from "../redux/action/updateUser";

const EditUser = ({ getSingleUser, user, match, history, updateUser }) => {
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRepassword] = useState(null);

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);
  const [genderValid, setGenderValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [repasswordValid, setrePasswordValid] = useState(true);

  const [submitValid, setSubmitVaild] = useState(false);
  const [isChange, setisChange] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);

  useEffect(() => {
    getSingleUser(match.params.id);
  }, []);

  useEffect(() => {
    if (user[0] !== undefined) {
      setFirstName(user[0].firstname);
      setLastName(user[0].lastname);
      setAge(user[0].age);
      setGender(user[0].sex);
      setPassword(user[0].password);
    }
  }, [user]);

  useEffect(() => {
    if (submitValid && isChange) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [submitValid, isChange]);

  let payload = {
    firstname: firstname,
    lastname: lastname,
    age: Number(age),
    sex: gender,
    password: password
  };
  console.log("ischange", isChange)
  const handleFirstName = e => {
    setFirstName(e.target.value);
    console.log(e.target.value);
    let condition = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/.test(
      e.target.value
    );
    setFirstNameValid(condition ? true : false);
    if (e.target.value !== user[0].firstname) {
      setisChange(true);
    } else {
      setisChange(false);
    }
    setSubmitVaild(
      condition && lastNameValid && genderValid && ageValid && passwordValid
        ? true
        : false
    );
  };

  const handleLastName = e => {
    setLastName(e.target.value);
    let condition = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/.test(
      lastname
    );
    setLastNameValid(condition ? true : false);
    if (e.target.value !== user[0].lastname) {
      setisChange(true);
    } else {
      setisChange(false);
    }
    setSubmitVaild(
      firstNameValid && condition && genderValid && ageValid && passwordValid
        ? true
        : false
    );
  };

  const handleGender = e => {
    setGender(e.target.value);
    let condition = e.target.value === "M" || e.target.value === "F";
    setGenderValid(condition ? true : false);
    if (e.target.value !== user[0].sex) {
      console.log(user[0].sex)
      setisChange(true);
    } else {
      setisChange(false);
    }
    setSubmitVaild(
      firstNameValid && lastNameValid && condition && ageValid && passwordValid
        ? true
        : false
    );
  };

  const handleAge = e => {
    setAge(e.target.value);
    let condition =
      Number(e.target.value) >= 0 && Number(e.target.value) <= 100;
    setAgeValid(condition ? true : false);
    if (Number(e.target.value) !== user[0].age) {
      setisChange(true);
    } else {
      setisChange(false);
    }
    setSubmitVaild(
      firstNameValid &&
        lastNameValid &&
        genderValid &&
        condition &&
        passwordValid
        ? true
        : false
    );
  };
  const handlePassword = e => {
    setPassword(e.target.value);
    let condition = /^(?=.{7,})/.test(password);
    let condition1 = e.target.value === rePassword;
    setrePasswordValid(condition1 ? true : false);
    setPasswordValid(condition ? true : false);
  };

  const handlerePassword = e => {
    setRepassword(e.target.value);
    let condition = e.target.value === password;
    setrePasswordValid(condition ? true : false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    updateUser(match.params.id, payload, history);
    setFirstName(null);
    setLastName(null);
    setAge(null);
    setGender(null);
    setPassword(null);
   //history.push("/");
  
  };

  if (user[0] === undefined) {
    return <p>loading data</p>;
  }
  return (
    <div>
      {}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="addContainer">
            <h1>Edit User</h1>
            <p>Please change anything you want to edit in this account.</p>
            <div id="error_message"></div>
            <label>
              <b>firstname</b>
            </label>
            <input
              type="text"
              defaultValue={firstname}
              id="firstname"
              onChange={handleFirstName}
              required
            />
            {!firstNameValid && (
              <p style={{ color: "green" }}>Please enter valid first name.</p>
            )}
            <label>
              <b>lastname</b>
            </label>
            <input
              type="text"
              defaultValue={lastname}
              name="lastname"
              id="lastname"
              onChange={handleLastName}
              required
            />
            {!lastNameValid && (
              <p style={{ color: "green" }}>Please enter valid last name.</p>
            )}
            <label>
              <b>gender</b>
            </label>
            <input
              type="text"
              defaultValue={gender}
              name="gender"
              id="gender"
              onChange={handleGender}
              required
            />
            {!genderValid && (
              <p style={{ color: "green" }}>
                Please enter either M for Male or F for Female.
              </p>
            )}
            <label>
              <b>age</b>
            </label>
            <input
              type="text"
              defaultValue={age}
              name="age"
              id="age"
              onChange={handleAge}
              required
            />
            {!ageValid && (
              <p style={{ color: "green" }}>Please be realistic.</p>
            )}
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              onChange={handlePassword}
              required
            />
            {!passwordValid && (
              <p style={{ color: "green" }}>Minimum eight characters!</p>
            )}
            <label>ReEnter password</label>
            <input
              type="password"
              placeholder="Please Enter password one more time"
              name="repassword"
              id="repassword"
              onChange={handlerePassword}
              required
            />

            {!repasswordValid && (
              <p style={{ color: "green" }}>password has to match!!</p>
            )}
            <button
              type="submit"
              className="registerbtn"
              disabled={submitDisable}
            >
              update Exist User
            </button>
            {!isChange && <p>please do not submit same user information</p>}
            <button className="registerbtn" onClick={() => history.push("/")}>
              back to user page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.getSingleUser.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: id => {
      dispatch(getSingleUser(id));
    },
    updateUser: (id, payload, history) => {
      dispatch(updateUser(id, payload, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
