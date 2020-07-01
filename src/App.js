import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';
import { ReactComponent as Man } from './components/svgs/man.svg';
import { ReactComponent as Woman } from './components/svgs/woman.svg';
import { ReactComponent as Arrow } from './components/svgs/arrow.svg';
import { ReactComponent as Login } from './components/svgs/login.svg';
import { ReactComponent as Qrcode } from './components/svgs/qrcode.svg';
import { ReactComponent as Check } from './components/svgs/check.svg';
import { ReactComponent as Accept } from './components/svgs/accept.svg';
import { ReactComponent as Celebrate } from './components/svgs/celebrate.svg';
import { ReactComponent as Ballon } from './components/svgs/ballon.svg';
import { ReactComponent as Stars } from './components/svgs/stars.svg';


function App() {

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
          <p>Erstelle deinen eigenen QR Code und geniesse deinen Abend</p>
          <p>Und so wird's gemacht:</p>
        </div>
        <div className='explanation'>
          <div className='stepBegin'>
            <div><h4 style={{textAlign: 'right'}}>Erstelle dein Konto</h4></div>
            <div>
              <Man transform='translate(20,0)'/>
              <Woman transform='translate(30,0)' />
            </div>
          </div>
          <div className='stepArrow'>
            <div className=''></div>
            <div >
              <Arrow className='' transform='translate(65,15)' />
            </div>
          </div>
          <div className='stepLogin'>
            <div className=''><h4 style={{textAlign: 'right'}}>Bestätige deine Daten</h4></div>
            <div>
              <Login className='' transform='translate(43,0) scale(0.8)' />
            </div>
          </div>
          <div className='stepArrow'>
            <div className=''></div>
            <div>
              <Arrow className='' transform='translate(65,10)' />
            </div>
          </div>
          <div className='stepQrcode'>
            <div className=''><h4 style={{textAlign: 'right'}}>Für dich wird ein QR Code erstellt</h4></div>
            <div>
              <Qrcode className='' transform='translate(43,0) scale(0.8)' />
            </div>
          </div>
          <div className='stepArrow'>
            <div className=''></div>
            <div>
              <Arrow className='' transform='translate(65,10)' />
            </div>
          </div>
          <div className='stepCheck'>
            <div className=''><h4 style={{textAlign: 'right'}}>Zeige den QR Code beim Eintritt zusammen mit deiner ID</h4></div>
            <div>
              <Check className='' transform='translate(0,0) scale(0.8)' />
            </div>
          </div>
          <div className='stepArrow'>
            <div className=''></div>
            <div>
              <Arrow className='' transform='translate(65,0)' />
            </div>
          </div>
          <div className='stepAccept'>
            <div className=''><h4 style={{textAlign: 'right'}}>Deine Angaben werden verglichen</h4></div>
            <div>
              <Accept className='' transform='translate(54,0) scale(0.8)' />
            </div>
          </div>
          <div className='stepArrow'>
            <div className=''></div>
            <div>
              <Arrow className='' transform='translate(65,15)' />
            </div>
          </div>
          <div className='stepCelebrate'>
            <div className=''><h4 style={{textAlign: 'right'}}>Wir wünschen dir einen schönen Abend</h4></div>
            <div>
              <Stars className='Arrow2' transform='translate(20,5) scale(0.8)' />
              <Ballon className='Arrow2' transform='translate(20,0) scale(0.8)' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
