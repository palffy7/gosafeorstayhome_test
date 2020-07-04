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

// const oauth = {
//   domain: "gsosh.auth.eu-central-1.amazoncognito.com",
//   scope: ["email", "profile"],
//   redirectSignIn: "http://localhost:3000",
//   redirectSignOut: "http://localhost:3000",
//   responseType: "code"
// };

// Auth.configure({ oauth });



function App() {

  var QRCode = require('qrcode.react')

  const errorMessages =[
    {message: 'Incorrect username or password.', 
    translation:  'Falsches Passwort oder Benutzername'}, 
    {message: 'An account with the given email already exists.', 
    translation:  'Ein Konto mit dieser Email Adresse existiert bereits'},
    {message: 'Password attempts exceeded', 
    translation:  'Anzahl Login Versuche überschritten'},
    {message: 'Invalid verification code provided, please try again.', 
    translation:  'Falscher Code. Bitte versuche es erneut.'},
    {message: 'User is not confirmed.', 
    translation:  'Dein Konto wurde nicht bestätigt. Klicke hier um dein Konto zu besätigen:'}
  ]

  //const [token, , deleteToken] = useCookies(['mr-token'])
  //const [data, loading, error] = useFetch();
  const [signedUp, setSignedUp] = useState(false);
  const [signeUpRequested, setSigneUpRequested] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationFailed, setConfirmationFailed] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [userData, setUserData] = useState(
    {
      given_name: '',
      family_name: '',
      password: '',
      email: '',
      phone_number: ''
    }
  );
  const [contentQRCode, setContenQRCode] = useState({
    given_name: '',
    family_name: '',
    email: '',
    phone_number: ''
  });
  const [stringQRCode, setStringQRCode] = useState(null);
  const [generatingQRCode, setGeneratingQRCode] = useState(true);
  const [formError, setFormError] = useState([false, '']);

  // triggers the data after its stored, otherwise user is empty
  useEffect(() => {
    // if (signedIn & confirmed) { GetUserAttributes() }
    // console.log('getUserAttributes')
    if (signedIn & confirmed) { GetUserAttributes() }
  }, [signedIn, confirmed])

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

  // useEffect(() => {
  //   console.log(formerror)
  // }, [formerror])

  // const loginClicked = () => {
  //   window.location.href = '/login';
  // }

  // const logoutUser = () => {
  //   deleteToken(['mr-token']);
  // }

  const loginClicked = (e) => {
    console.log(confirmationFailed)
    // console.log(user)
    // console.log(Auth.currentAuthenticatedUser())
    // GetUserAttributes()

    // var attr = Auth.userAttributes(user)
    // console.log(attr.data)
    // attr.then(attr.json())
  }

  const handleChange = e => {
    const newUserData = userData;
    newUserData[e.target.name] = e.target.value
    setUserData(newUserData);
    // console.log(userData)
  }

  const handleVerificationCode = e => {
    setVerificationCode(e.target.value);
  }

  const handleFormikSubmit = (values) => {
    console.log(values)
    delete values.passwordcontrol
    console.log(values)
    setUserData(values);

    // document.getElementById('login').reset()
    // if (!signedUp) {
    //   SignUp()
    // } else {
    //   SignIn()
    // }
  }


  const handleSubmit = e => {
    // console.log('submit')
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

  const handleNewAccountVerification = e => {
    VerifyAccount('ralph_amhof@hotmail.com')
    setSigneUpRequested(true)
    setSignedIn(false)
  }

  async function SignUp() {
    console.log('signup')
    console.log(userData)
    try {
      var respuser = await Auth.signUp({
        username: userData['email'],
        password: userData['password'],
        attributes: {
          email: userData['email'],
          phone_number: userData['phone_number'],   // E.164 number convention
          given_name: userData['given_name'],
          family_name: userData['family_name'],
          address: 'none',
        }
      });
      setSigneUpRequested(true)
      console.log({ respuser });
    } catch (error) {
      var message_filter = errorMessages.filter( message => message.message === error['message'])
      setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
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
      var message_filter = errorMessages.filter( message => message.message === error['message'])
      setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
      console.log('error confirming sign up', error);
    }

  }

  async function SignIn() {
    try {
      const respuser = await Auth.signIn(userData['email'], userData['password']);
      console.log(respuser)
      setUser(respuser)
      setConfirmed(true)
      setSignedIn(true);
    } catch (error) {
      var message_filter = errorMessages.filter( message => message.message === error['message'])
      setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
      // setConfirmationFailed(true)
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

  async function VerifyAccount(attr) {
    try {
      console.log(user)
      const respuser = await Auth.verifyCurrentUserAttribute(attr);
      setConfirmed(true)
      setSignedIn(true);
    } catch (error) {
      var message_filter = errorMessages.filter( message => message.message === error['message'])
      setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
      console.log('error signing in', error);
    }
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
          <h5>Dein eigener QR Code für den Ausgang</h5>
          <h5>Erstelle deinen eigenen QR Code und geniesse deinen Abend</h5>
        </div>
        {!signedIn ?
          <React.Fragment>
            {!signedUp ?
              <div className='login'>
                {!signeUpRequested ?
                  <React.Fragment>
                    <Formik
                      initialValues={{ given_name: '', family_name: '', password: '', passwordcontrol: '', email: '', phone_number: '' }}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log('formik submitting')
                        handleFormikSubmit(values)
                      }}

                      validationSchema={Yup.object().shape({
                        family_name: Yup.string()
                          .required('Nachname wird benötigt'),
                        given_name: Yup.string()
                          .required('Vorname wird benötigt'),
                        email: Yup.string()
                          .email('Muss eine gültige Email Adresse sein')
                          .required('Email wird benötigt'),
                        password: Yup.string()
                          .required('Passwort wird benötigt')
                          .min(8, 'Passwort zu kurz, muss mindestens 8 Zeichen lang sein')
                          .matches(/(?=.*[0-9])/, 'Passwort muss eine Zahl enthalten.')
                          .matches(/(?=.*[a-z])/, 'Passwort muss einen Kleinbuchstaben enthalten.')
                          .matches(/(?=.*[A-Z])/, 'Passwort muss einen Grossbuchstaben enthalten.'),
                        passwordcontrol: Yup.string()
                          .required('Passwort muss übereinstimmen')
                          .oneOf([Yup.ref('password'), null], 'Passwort stimmt nicht überein'),
                        phone_number: Yup.string()
                          .required('Handynummer wird benötigt')
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
                              placeholder='Vorname'
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
                              placeholder='Nachnamen'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.family_name && touched.family_name && "error"} />
                            {errors.family_name && touched.family_name && (
                              <div className="input-feedback">{errors.family_name}</div>
                            )}
                            <label>Passwort</label><br />
                            <input
                              type='password'
                              name='password'
                              placeholder='Passwort'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.password && touched.password && "error"} />
                            {errors.password && touched.password && (
                              <div className="input-feedback">{errors.password}</div>
                            )}
                            <label>Passwort Kontrolle</label><br />
                            <input
                              type='password'
                              name='passwordcontrol'
                              placeholder='Passwort Kontrolle'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.passwordcontrol && touched.passwordcontrol && "error"} />
                            {errors.passwordcontrol && touched.passwordcontrol && (
                              <div className="input-feedback">{errors.passwordcontrol}</div>
                            )}
                            <label>Email</label><br />
                            <input
                              type='text'
                              name='email'
                              placeholder='Email Adresse'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.email && touched.email && "error"} />
                            {errors.email && touched.email && (
                              <div className="input-feedback">{errors.email}</div>
                            )}
                            <label>Handynummer</label><br />
                            <input
                              type='tel'
                              name='phone_number'
                              placeholder='Telefonnummer im Format +...'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.phone_number && touched.phone_number && "error"} />
                            {errors.phone_number && touched.phone_number && (
                              <div className="input-feedback">{errors.phone_number}</div>
                            )}
                            <div className='submit-button'>
                              <button type='submit' >Registrieren</button>
                            </div>
                            {formError[0] && (
                              <div className="login-feedback">{formError[1]}</div>
                            )}
                            <p onClick={() => setSignedUp(true)}>Du hast bereits ein Konto? Melde dich hier an!</p>
                          </form>
                        )
                      }}
                    </Formik>
                  </React.Fragment>
                  :
                  <form id='login' onSubmit={handleConfirm}>
                    <label>Gib deinen Code ein</label><br />
                    <input type='text' name='verification_code' onChange={handleVerificationCode} /><br />
                    <button >Bestätigen</button><br />
                    {formError[0] && (
                    <div className="login-feedback">{formError[1]}</div>
                  )}
                  </form>
                }
              </div> :
              <div className='signIn'>
                <form id='login' onSubmit={handleSubmit}>
                  <label>Email</label><br />
                  <input type='text' name='email' onChange={handleChange} /><br />
                  <label>Passwort</label><br />
                  <input type='password' name='password' onChange={handleChange} /><br />
                  <button>Login</button><br />
                  {formError[0] && (
                    <div className="login-feedback">{formError[1]}</div>
                  )}
                  
                  <p onClick={() => setSignedUp(false)}>Hast du noch kein Konto? Registriere dich hier!</p>
                </form>
                {confirmationFailed && (
                    <div><button onClick={handleNewAccountVerification}>Bestätige deine Kontaktdaten</button></div>
                  )}
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
                  <QRCode value={stringQRCode} size='300' />
                </div>
              </div>
            }
          </React.Fragment>}
        {/* <button onClick={loginClicked}>Login</button> */}
        <div className='explanation-start'>
          <h5>Und so wird's gemacht:</h5>
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
