import React, { useState, useRef, useEffect } from "react";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [searched, setSearched] = useState(false);

  const input = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((output) => setUsers(output));
  }, []);

  const searchUser = () => {
    setSearched(true);

    const searchQuery = input.current.value.toLowerCase();

    if (searchQuery === "") {
      setSearched(false);
      setFilterUser([]);
      return;
    }

    const mathcedUsers = users.filter((userData) =>
      userData.email.toLowerCase().includes(searchQuery)
    );

    setFilterUser(mathcedUsers);
  };

  return (
    <div className="users-container">
      <div className="search-row">
        <input
          type="text"
          ref={input}
          onInput={searchUser}
          placeholder="Username?"
        />
        <button> Search </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th> Username </th>
            <th> Name </th>
            <th> Email </th>
            <th> Phone </th>
            <th> Company </th>
          </tr>
        </thead>
        <tbody>
          {searched
            ? filterUser.map((userData) => (
                <tr key={userData.id}>
                  <td>{userData.username}</td>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>{userData.phone}</td>
                  <td>{userData.company.name}</td>
                </tr>
              ))
            : users.map((userData) => (
                <tr key={userData.id}>
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
