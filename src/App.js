import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './App.css';
// import { useCookies } from 'react-cookie';
import Amplify, { Auth } from 'aws-amplify';
// import QRCode from 'qrcode.react'
import { ReactComponent as Man } from './components/svgs/man.svg';
import { ReactComponent as Woman } from './components/svgs/woman.svg';
import { ReactComponent as Arrow } from './components/svgs/arrow.svg';
import { ReactComponent as Login } from './components/svgs/login.svg';
import { ReactComponent as Qrcode } from './components/svgs/qrcode.svg';
import { ReactComponent as Check } from './components/svgs/check.svg';
import { ReactComponent as Accept } from './components/svgs/accept.svg';
import { ReactComponent as Ballon } from './components/svgs/ballon.svg';
import { ReactComponent as Stars } from './components/svgs/stars.svg';
import { ReactComponent as Logo } from './components/svgs/logoPage.svg';

Amplify.configure({
  Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-central-1:6d0faa63-5f3f-4616-bf3d-f2d6b199e564',

    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'eu-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_mA7oi9fFZ',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '7hskrl3g7nb2t9m44v0ojujlsm',
  }
});

const oauth = {
  domain: "gsosh.auth.eu-central-1.amazoncognito.com",
  scope: ["email", "profile"],
  redirectSignIn: "http://localhost:3000",
  redirectSignOut: "http://localhost:3000",
  responseType: "code"
};

Auth.configure({ oauth });



function App() {

  var QRCode = require('qrcode.react')

  //const [token, , deleteToken] = useCookies(['mr-token'])
  //const [data, loading, error] = useFetch();
  const [signedUp, setSignedUp] = useState(false);
  const [signeUpRequested, setSigneUpRequested] = useState(false);
  const [confirmed, setConfirmed] = useState(false)
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [verificationCode, setVerificationCode] = useState(null);
  const [userData, setUserData] = useState(
    {
      given_name: '',
      family_name: '',
      password: '',
      email: '',
      phone_number: ''
    }
  )
  const [contentQRCode, setContenQRCode] = useState({
    given_name: '',
    family_name: '',
    email: '',
    phone_number: ''
  })
  const [stringQRCode, setStringQRCode] = useState(null)
  const [generatingQRCode, setGeneratingQRCode] = useState(true)

  // triggers the data after its stored, otherwise user is empty
  useEffect(() => {
    if (signedIn & confirmed) { GetUserAttributes() }
  }, [signedIn, confirmed, GetUserAttributes])

  // triggers a new content for the QRCode for gerenating
  useEffect(() => {
    if (stringQRCode) { setGeneratingQRCode(false) }
  }, [stringQRCode])

  useEffect(() => {
    document.getElementById('login').reset()
    if (userData['email']) {
      if (!signedUp) {
        SignUp()
      } else {
        SignIn()
      }
    }
  }, [userData])

  // const loginClicked = () => {
  //   window.location.href = '/login';
  // }

  // const logoutUser = () => {
  //   deleteToken(['mr-token']);
  // }

  const loginClicked = (e) => {
    console.log(userData)
    // console.log(user)
    // console.log(Auth.currentAuthenticatedUser())
    // GetUserAttributes()

    // var attr = Auth.userAttributes(user)
    // console.log(attr.data)
    // attr.then(attr.json())
  }

  const test = () => {
    console.log('test')
  }

  const handleChange = e => {
    const newUserData = userData;
    newUserData[e.target.name] = e.target.value
    setUserData(newUserData);
    console.log(userData)
  }

  const handleVerificationCode = e => {
    setVerificationCode(e.target.value);
  }

  const handleFormikSubmit = (values) => {
    setUserData(values);
    // document.getElementById('login').reset()
    // if (!signedUp) {
    //   SignUp()
    // } else {
    //   SignIn()
    // }
  }

  const handleSubmit = e => {
    console.log('submit')
    e.preventDefault();
    document.getElementById('login').reset()
    if (!signedUp) {
      SignUp()
    } else {
      SignIn()
    }
  }

  const handleConfirm = e => {
    e.preventDefault();
    document.getElementById('login').reset()
    confirmSignUp()
  }

  const changeForm = (e) => {
    e.preventDefault();
    setUser(true)
  }

  async function SignUp() {
    console.log('signup')
    console.log(userData)
    try {
      var respuser = await Auth.signUp({
        username: userData['email'],
        password: userData['password'],
        attributes: {
          email: userData['email'],          // optional
          phone_number: userData['phone_number'],   // optional - E.164 number convention
          given_name: userData['given_name'],
          family_name: userData['family_name'],
          address: 'none',
        }
      });
      setSigneUpRequested(true)
      console.log({ respuser });
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(userData['email'], verificationCode);
      const respuser = await Auth.signIn(userData['email'], userData['password']);
      console.log('conf')
      console.log(respuser)
      setUser(respuser)
      setConfirmed(true)
      setSignedIn(true);
    } catch (error) {
      console.log('error confirming sign up', error);
    }

  }

  async function SignIn() {
    try {
      const respuser = await Auth.signIn(userData['email'], userData['password']);
      setUser(respuser)
      setConfirmed(true)
      setSignedIn(true);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function GetUserAttributes() {
    // const userattr = null
    console.log('getuserattr')
    console.log(user)
    try {
      var userattr = await Auth.userAttributes(user)
    } catch (error) {
      console.log('error fetching user attributes', error);
    }
    SetLocalUserAttribute(userattr)
  }

  const SetLocalUserAttribute = (userattr) => {
    // console.log('set')
    // console.log(userattr)
    const newContentQRCode = contentQRCode;
    newContentQRCode['given_name'] = userattr[5]['Value']
    newContentQRCode['family_name'] = userattr[6]['Value']
    newContentQRCode['email'] = userattr[7]['Value']
    newContentQRCode['phone_number'] = userattr[4]['Value']
    setContenQRCode(newContentQRCode)
    setStringQRCode('startQRCode;' + contentQRCode['given_name'] + ';' + contentQRCode['family_name'] + ';' + contentQRCode['email'] + ';' + contentQRCode['phone_number'] + ';endQRCode')
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* <div> */}
        <h1>
          {/* <FontAwesomeIcon icon={faGlassCheers} /> */}
          <Logo className='svgLogo' transform='translate(0,0) scale(1)' />
          <span> Go Safe Or Stay Home </span>
        </h1>
        {/* </div> */}
      </header>
      <div className='layout'>
        <div className='welcome'>
          <p>Dein eigener QR Code für den Ausgang</p>
          <p>Erstelle deinen eigenen QR Code und geniesse deinen Abend</p>
        </div>
        {!signedIn ?
          <React.Fragment>
            {!signedUp ?
              <div className='login'>
                {!signeUpRequested ?
                  <React.Fragment>
                    <Formik
                      initialValues={{ given_name: '', family_name: '', password: '', email: '', phone_number: '' }}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log('formik submitting')
                        handleFormikSubmit(values)
                      }}

                      validationSchema={Yup.object().shape({
                        family_name: Yup.string()
                          .required('Required'),
                        given_name: Yup.string()
                          .required('Required'),
                        email: Yup.string()
                          .email()
                          .required('Required'),
                        password: Yup.string()
                          .required('Required')
                          .min(8, 'Passwort is too short, must be 8 characters long.')
                          .matches(/(?=.*[0-9])/, 'Password must contain a number.')
                          .matches(/(?=.*[a-z])/, 'Passwort muss einen Kleinbuchstaben enthalten.')
                          .matches(/(?=.*[A-Z])/, 'Passwort muss einen Grossbuchstaben enthalten.'),
                        phone_number: Yup.string()
                          .required('Required')
                          .matches(/(?=.*[+])/, 'Deine Nummer muss ein + enthalten.'),
                      })}
                    >
                      {props => {
                        const {
                          values,
                          touched,
                          errors,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit
                        } = props;
                        return (
                          <form id='login' onSubmit={handleSubmit}>
                            <label>Vorname</label><br />
                            <input
                              type='text'
                              name='given_name'
                              placeholder='Gib hier deinen Vornamen ein'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.given_name && touched.given_name && "error"} />
                            {errors.given_name && touched.given_name && (
                              <div className="input-feedback">{errors.given_name}</div>
                            )}
                            <label>Nachname</label><br />
                            <input
                              type='text'
                              name='family_name'
                              placeholder='Gib deinen Nachnamen ein'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.family_name && touched.family_name && "error"} />
                            {errors.family_name && touched.family_name && (
                              <div className="input-feedback">{errors.family_name}</div>
                            )}
                            <label>Password</label><br />
                            <input
                              type='password'
                              name='password'
                              placeholder='Gib dein Passwort ein'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.password && touched.password && "error"} />
                            {errors.password && touched.password && (
                              <div className="input-feedback">{errors.password}</div>
                            )}
                            <label>Email</label><br />
                            <input
                              type='text'
                              name='email'
                              placeholder='Gib deine Email Adresse ein'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.email && touched.email && "error"} />
                            {errors.email && touched.email && (
                              <div className="input-feedback">{errors.email}</div>
                            )}
                            <label>Phone Number</label><br />
                            <input
                              type='tel'
                              name='phone_number'
                              placeholder='Gib deine Telefonnummer ein im Format +...'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.phone_number && touched.phone_number && "error"} />
                            {errors.phone_number && touched.phone_number && (
                              <div className="input-feedback">{errors.phone_number}</div>
                            )}
                            <button type='submit' disabled={isSubmitting}>Sign up</button><br />
                            <p onClick={() => setSignedUp(true)}>Du hast bereits ein Konto? Melde dich hier an!</p>
                          </form>
                        )
                      }}
                    </Formik>

                    {/* <form id='login' onSubmit={handleSubmit}>
                      <label>Vorname</label><br />
                      <input type='text' name='given_name' onChange={handleChange} /><br />
                      <label>Name</label><br />
                      <input type='text' name='family_name' onChange={handleChange} /><br />
                      <label>Password</label><br />
                      <input type='password' name='password' onChange={handleChange} /><br />
                      <label>Email</label><br />
                      <input type='text' name='email' onChange={handleChange} /><br />
                      <label>Phone Number</label><br />
                      <input type='tel' name='phone_number' onChange={handleChange} /><br />
                      <button>Sign up</button><br />
                      <p onClick={() => setSignedUp(true)}>Du hast bereits ein Konto? Melde dich hier an!</p>
                    </form> */}
                  </React.Fragment>
                  :
                  <form id='login' onSubmit={handleConfirm}>
                    <label>Type in Code</label><br />
                    <input type='text' name='verification_code' onChange={handleVerificationCode} /><br />
                    <button>Confirm</button><br />

                  </form>
                }
              </div> :
              <div className='signIn'>
                <form id='login' onSubmit={handleSubmit}>
                  <label>Email</label><br />
                  <input type='text' name='email' onChange={handleChange} /><br />
                  <label>Password</label><br />
                  <input type='password' name='password' onChange={handleChange} /><br />
                  <button>Sign In</button><br />
                  <p onClick={() => setSignedUp(false)}>Hast du noch kein Konto? Registriere dich hier!</p>
                </form>
              </div>
            }
          </React.Fragment> :
          <React.Fragment>
            {generatingQRCode ? <div className="App"><h2>Generating QR Code . . .</h2></div> :
              <div>
                <p>Voilà! Dies ist dein persönlicher QR Code</p>
                <p>Zeige ihn beim Eintritt zusammen mit deiner ID oder Pass.</p>
                <p>Viel Spass!</p>
                <div className='QRCode-container'>
                  {/* <QRCode value="http://facebook.github.io/react/" /> */}
                  <QRCode value={stringQRCode} />
                </div>
              </div>
            }
          </React.Fragment>}
        {/* <button onClick={loginClicked}>Login</button> */}
        <div>
          <p>Und so wird's gemacht:</p>
        </div>
        <div className='explanation'>
          <div className='stepBegin'>
            <div><h5 style={{ textAlign: 'right' }}>Erstelle dein Konto</h5></div>
            <div>
              <Man transform='translate(20,1.5)' />
              <Woman transform='translate(30,0) scale(0.99)' />
            </div>
          </div>
          <div className='stepArrow'>
            <div className=''></div>
            <div >
              <Arrow className='' transform='translate(65,15)' />
            </div>
          </div>
          <div className='stepLogin'>
            <div className=''><h5 style={{ textAlign: 'right' }}>Bestätige deine Daten</h5></div>
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
            <div className=''><h5 style={{ textAlign: 'right' }}>Für dich wird ein QR Code erstellt</h5></div>
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
            <div className=''><h5 style={{ textAlign: 'right' }}>Zeige den QR Code beim Eintritt zusammen mit deiner ID</h5></div>
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
            <div className=''><h5 style={{ textAlign: 'right' }}>Deine Angaben werden verglichen</h5></div>
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
            <div className=''><h5 style={{ textAlign: 'right' }}>Wir wünschen dir einen schönen Abend</h5></div>
            <div>
              <Stars className='Arrow2' transform='translate(20,5) scale(0.8)' />
              <Ballon className='Arrow2' transform='translate(20,0) scale(0.8)' />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
