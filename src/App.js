import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, , deleteToken] = useCookies(['mr-token'])
  const [data, loading, error] = useFetch();


  const loginClicked = () => {
    window.location.href = '/login';
  }

  const logoutUser = () => {
    deleteToken(['mr-token']);
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faGlassCheers} />
          <span> Safe Celebrate </span>
        </h1>
      </header>
      <div className='layout'>
        <div className='welcome'>
          <h2> QR Code </h2>
          <p>Erstelle deinen eigenen QR Code und geniesse deinen Ausgang</p>
          
        </div>
      </div>
    </div>
  );
}

export default App;
