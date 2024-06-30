import React, { useState, useRef, useEffect } from "react";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [searched, setSearched] = useState(false);

  const input = useRef();
  const dropdown = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((output) => setUsers(output));
  }, []);

  const searchUser = () => {
    setSearched(true);

    const searchQuery = input.current.value.toLowerCase();
    const searchFilter = dropdown.current.value;

    if (searchQuery === "") {
      setSearched(false);
      setFilterUser([]);
      return;
    }

    let filteredUsers;

    switch (searchFilter) {
      case "username":
        filteredUsers = users.filter((userData) =>
          userData.username.toLowerCase().includes(searchQuery)
        );
        break;

      case "email":
        filteredUsers = users.filter((userData) =>
          userData.email.toLowerCase().includes(searchQuery)
        );
        break;

      case "name":
        filteredUsers = users.filter((userData) =>
          userData.name.toLowerCase().includes(searchQuery)
        );
        break;

      case "phone":
        filteredUsers = users.filter((userData) =>
          userData.phone.toLowerCase().includes(searchQuery)
        );
        break;

      case "company":
        filteredUsers = users.filter((userData) =>
          userData.company.name.toLowerCase().includes(searchQuery)
        );
        break;
    }

    setFilterUser(filteredUsers);
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

        <select name="filter" ref={dropdown}>
          <option value="username"> Username </option>
          <option value="name"> Name </option>
          <option value="email"> Email</option>
          <option value="phone"> Phone </option>
          <option value="company"> Company </option>
        </select>
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
