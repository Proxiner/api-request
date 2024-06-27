import React from 'react';

import './Home.css';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-container'>
        <Link to='/products'> Products </Link>
        <Link to='/users'> Users </Link>
    </div>
  )
}

export default Home
