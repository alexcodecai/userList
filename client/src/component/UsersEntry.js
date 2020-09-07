import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";
const UserEntry = props => {
  return (
    <tr>
      <td>
        <Link to={`/EditUser/${props.user._id}`}>
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
