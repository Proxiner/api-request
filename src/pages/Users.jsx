import React, { useState, useEffect } from "react";
import "./Users.css";
import { useRef } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const input = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((output) => setUsers(output));
  }, []);

  const searchUser = () => {
    setSearchQuery(input.current.value.trim());
  };

  return (
    <div className="users-container">
      <div className="search-row">
        <input
          ref={input}
          onInput={searchUser}
          type="text"
          placeholder="Username?"
        />
        <button> Search </button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userData) => (
            <tr
              className={
                searchQuery &&
                userData.username
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
                  ? "colored"
                  : ""
              }
              key={userData.id}
            >
              <td>{userData.username}</td>
              <td>{userData.name}</td>
              <td>{userData.email}</td>
              <td>{userData.phone}</td>
              <td>{userData.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
