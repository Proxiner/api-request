import React, { useEffect, useRef, useState } from "react";

import "./Users.css";

function Users() {

  const [usersList, setUsersList] = useState([]);

  const [searchedUser , setSearchedUser] = useState([]);

  const inputTag = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((output) => setUsersList(output));
    }, []);
    
  const fetchUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users?name=${inputTag.current.value}`)
    .then(response => response.json())
    .then(output => setSearchedUser(output))
  }

  const mathcedUsers = usersList.filter((user)=>{
    user.name.toLowerCase().includes(searchQuery)
  })

  return (
    <div className="container">
      <input
        type="text"
        ref={inputTag}
        placeholder="Search:"
      />
      <button onClick={fetchUser}> search </button>
      <div className="row">
        {usersList.map((user) => (
          <ul key={user.id}>
            <li> {user.name} </li>
            <li> {user.email} </li>
            <li> {user.phone}</li>
            <li> {user.website} </li>
          </ul>
        ))}
      </div>
      <div className="row">
        {searchedUser.map((user)=>(
           <ul key={user.id}>
            <li> {user.name} </li>
            <li> {user.email} </li>
            <li> {user.phone}</li>
            <li> {user.website} </li>
           </ul>
        ))}

        <p>{JSON.stringify(mathcedUsers)}</p>
      </div>
    </div>
  );
}

export default Users;
