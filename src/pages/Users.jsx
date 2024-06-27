import React, { useEffect, useRef, useState } from "react";

import "./Users.css";

function Users() {
  const [usersList, setUsersList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const inputTag = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((output) => setUsersList(output));
  }, []);

  const fetchUser = () => {
    setSearched(true);
    const searchQuery = inputTag.current.value.toLowerCase();

    if (searchQuery === "") {
      setSearched(false);
      setFilteredUsers([]);
      return;
    }

    const matchedUsers = usersList.filter((user) =>
      user.name.toLowerCase().includes(searchQuery)
    );

    setFilteredUsers(matchedUsers);
  };

  return (
    <div className="container">
      <input
        type="text"
        ref={inputTag}
        onInput={fetchUser}
        placeholder="Search:"
      />
      <div className="row">
        {!searched
          ? usersList.map((user) => (
              <ul key={user.id}>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Phone: {user.phone}</li>
                <li>Website: {user.website}</li>
              </ul>
            ))
          : filteredUsers.map((user) => (
              <ul key={user.id}>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Phone: {user.phone}</li>
                <li>Website: {user.website}</li>
              </ul>
            ))}
      </div>
    </div>
  );
}

export default Users;
