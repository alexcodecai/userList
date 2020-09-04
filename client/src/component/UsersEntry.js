import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";
const UserEntry = props => {
  return (
    <tr>
      <td>
        <Link to={`/EditUser/${props.user._id}`} firstname={props.user.firstname} >
          {/* <EditUser

          
            firstname={props.user.firstname}
            lastname={props.user.lastname}
            sex={props.user.sex}
            age={props.user.age}
          /> */}
          edit
        </Link>
      </td>
      <td className="deletebtn">
        <HighlightOffIcon
          style={{ cursor: "pointer", color: "black" }}
          onClick={e => props.handleRemove(e, props.user._id)}
        ></HighlightOffIcon>
        Delete
      </td>
      <td>{props.user.firstname}</td>
      <td>{props.user.lastname}</td>
      <td>{props.user.sex}</td>
      <td>{props.user.age}</td>
    </tr>
  );
};
export default UserEntry;
