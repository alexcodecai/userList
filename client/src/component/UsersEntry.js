import React from "react";


const UserEntry = props => {
  return (
    <tr>
      <td>
        <button>edit</button>
      </td>
      <td>
        <button>delete</button>
      </td>
      <td>{props.user.firstname}</td>
      <td>{props.user.lastname}</td>
      <td>{props.user.sex}</td>
      <td>{props.user.age}</td>
    </tr>
  );
};
export default UserEntry;
