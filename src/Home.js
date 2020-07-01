import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';

function Home() {

  // const [movies, setMovies] = useState([]);

  const loginClicked = () => {
    window.location.href = '/login';
  }

  return (
    <div className='App'>
      <header className="App-header">
        <h1>Lovid</h1>
      </header>
      <div className='login-container'>
        <p>Erstellen Sie hier Ihren COVID QR Code</p>

        <button onClick={loginClicked} >Login</button>

      </div>
    </div>
  )
}

export default Home;
