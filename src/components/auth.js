import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

var QRCode = require('qrcode.react');

function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordcheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [emailcheck, setEmailCheck] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [isLoginView, setIsLoginView] = useState('true');
    const [renderQRCode, setRenderQRCode] = useState(false);

    const [token, setToken] = useCookies(['mr-token'])

    useEffect(() => {
        console.log(token);
        console.log(renderQRCode)
        if (token['mr-token']) window.location.href = '/movies';
    }, [token, renderQRCode])

    const handleLoginError = (resp) => {
        console.log('test')
        console.log(resp)
        if (resp.token) {
            setToken('mr-token', resp.token)
        } else {
            console.error('error login')
        }
    }

    const loginClicked = () => {
        API.loginUser({ username, password })
            //.then(resp => console.log(resp))
            .then(resp => handleLoginError(resp))
            .catch(error => console.log(error))
        
    }

    const registerClicked = () => {
        // API.registerUser({ username, password })
        //     .then(resp => loginClicked())
        //     .catch(error => console.log('Error:' + error))
        setRenderQRCode(true)
    }

    const isDisabled = username.length === 0 || password.length === 0;

    return (
        <div className='App'>

            <header className="App-header">
                {isLoginView ? <h1>Anmelden</h1> : <h1>Registrieren</h1>}
            </header>
            <div className='login-container'>
                {isLoginView ?
                    <React.Fragment>
                        <label htmlFor='username'>Benutzername</label><br />
                        <input id='username' type='text' placeholder='Benutzername' value={username}
                            onChange={evt => setUsername(evt.target.value)} /><br />
                        <label htmlFor='password'>Passwort</label><br />
                        <input id='password' type='password' placeholder='Passwort'
                            value={password} onChange={evt => setPassword(evt.target.value)} /><br />
                    </React.Fragment> :
                    <React.Fragment>
                        <label htmlFor='username'>Benutzername</label><br />
                        <input id='username' type='text' placeholder='Benutzername' value={username}
                            onChange={evt => setUsername(evt.target.value)} /><br />
                        <label htmlFor='password'>Passwort</label><br />
                        <input id='password' type='password' placeholder='Passwort'
                            value={password} onChange={evt => setPassword(evt.target.value)} /><br />
                        <label htmlFor='password'>Passwort wiederholen</label><br />
                        <input id='passwordcheck' type='password' placeholder='Passwort'
                            value={passwordcheck} onChange={evt => setPasswordCheck(evt.target.value)} /><br />
                        <label htmlFor='password'>Email Adresse</label><br />
                        <input id='email' type='email' placeholder='Email'
                            value={email} onChange={evt => setEmail(evt.target.value)} /><br />
                        <label htmlFor='password'>Email Adresse wiederholen</label><br />
                        <input id='emailcheck' type='email' placeholder='Email'
                            value={emailcheck} onChange={evt => setEmailCheck(evt.target.value)} /><br />
                        <label htmlFor='street'>Strasse</label><br />
                        <input id='street' type='text' placeholder='Strasse' value={street}
                            onChange={evt => setStreet(evt.target.value)} /><br />
                        <label htmlFor='city'>Wohnort</label><br />
                        <input id='city' type='text' placeholder='Wohnort' value={city}
                            onChange={evt => setCity(evt.target.value)} /><br />
                    </React.Fragment>
                }
                {isLoginView ?
                    <button onClick={loginClicked} disabled={isDisabled}>Login</button> :
                    <button onClick={registerClicked} disabled={isDisabled}>Registrieren</button>
                }
                {isLoginView ?
                    <p onClick={() => setIsLoginView(false)}>Noch nicht registriert? Erstelle hier dein Konto!</p> :
                    <p onClick={() => setIsLoginView(true)}>Schon ein Konto erstellt? Hier anmelden!</p>
                }
                {renderQRCode ? 
                <QRCode value="Max;Must;max_muster@hotmail.com;0797775533" />: 
                <h3>No QRCode</h3>
                }


            </div>
        </div>
    )
}

export default Auth;