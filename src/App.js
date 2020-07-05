import React from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
import './App.css';
// import { useCookies } from 'react-cookie';
// import Amplify from 'aws-amplify';
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

// Amplify.configure({
//   Auth: {

//     // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//     identityPoolId: 'eu-central-1:6d0faa63-5f3f-4616-bf3d-f2d6b199e564',

//     // REQUIRED - Amazon Cognito Region
//     region: 'eu-central-1',

//     // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//     // Required only if it's different from Amazon Cognito Region
//     identityPoolRegion: 'eu-central-1',

//     // OPTIONAL - Amazon Cognito User Pool ID
//     userPoolId: 'eu-central-1_mA7oi9fFZ',

//     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     userPoolWebClientId: '7hskrl3g7nb2t9m44v0ojujlsm',
//   }
// });

// const oauth = {
//   domain: "gsosh.auth.eu-central-1.amazoncognito.com",
//   scope: ["email", "profile"],
//   redirectSignIn: "http://localhost:3000",
//   redirectSignOut: "http://localhost:3000",
//   responseType: "code"
// };

// Auth.configure({ oauth });



function App() {

  // var QRCode = require('qrcode.react')

  // const errorMessages =[
  //   {message: 'Incorrect username or password.', 
  //   translation:  'Falsches Passwort oder Benutzername'}, 
  //   {message: 'An account with the given email already exists.', 
  //   translation:  'Ein Konto mit dieser Email Adresse existiert bereits'},
  //   {message: 'Password attempts exceeded', 
  //   translation:  'Anzahl Login Versuche überschritten'},
  //   {message: 'Invalid verification code provided, please try again.', 
  //   translation:  'Falscher Code. Bitte versuche es erneut.'},
  //   {message: 'User is not confirmed.', 
  //   translation:  'Dein Konto wurde nicht bestätigt. Klicke hier um dein Konto zu besätigen:'}
  // ]

  //const [token, , deleteToken] = useCookies(['mr-token'])
  //const [data, loading, error] = useFetch();
  // const [signedUp, setSignedUp] = useState(false);
  // const [signeUpRequested, setSigneUpRequested] = useState(false);
  // const [confirmed, setConfirmed] = useState(false);
  // const [confirmationFailed, setConfirmationFailed] = useState(false);
  // const [signedIn, setSignedIn] = useState(false);
  // const [user, setUser] = useState(null);
  // const [verificationCode, setVerificationCode] = useState(null);
  // const [userData, setUserData] = useState(
  //   {
  //     given_name: '',
  //     family_name: '',
  //     password: '',
  //     email: '',
  //     phone_number: ''
  //   }
  // );
  // const [contentQRCode, setContenQRCode] = useState({
  //   given_name: '',
  //   family_name: '',
  //   email: '',
  //   phone_number: ''
  // });
  // const [stringQRCode, setStringQRCode] = useState(null);
  // const [generatingQRCode, setGeneratingQRCode] = useState(true);
  // const [formError, setFormError] = useState([false, '']);

  // triggers the data after its stored, otherwise user is empty
  // useEffect(() => {
  //   // if (signedIn & confirmed) { GetUserAttributes() }
  //   // console.log('getUserAttributes')
  //   if (signedIn & confirmed) { GetUserAttributes() }
  // }, [signedIn, confirmed])

  // // triggers a new content for the QRCode for gerenating
  // useEffect(() => {
  //   if (stringQRCode) { setGeneratingQRCode(false) }
  // }, [stringQRCode])

  // useEffect(() => {
  //   // document.getElementById('login').reset()
  //   if (userData['email']) {
  //     if (!signedUp) {
  //       SignUp()
  //     } else {
  //       SignIn()
  //     }
  //   }
  // }, [userData])

  // // useEffect(() => {
  // //   console.log(formerror)
  // // }, [formerror])

  // // const loginClicked = () => {
  // //   window.location.href = '/login';
  // // }

  // // const logoutUser = () => {
  // //   deleteToken(['mr-token']);
  // // }

  // const loginClicked = (e) => {
  //   console.log(confirmationFailed)
  //   // console.log(user)
  //   // console.log(Auth.currentAuthenticatedUser())
  //   // GetUserAttributes()

  //   // var attr = Auth.userAttributes(user)
  //   // console.log(attr.data)
  //   // attr.then(attr.json())
  // }

  // const handleChange = e => {
  //   const newUserData = userData;
  //   newUserData[e.target.name] = e.target.value
  //   setUserData(newUserData);
  //   // console.log(userData)
  // }

  // const handleVerificationCode = e => {
  //   setVerificationCode(e.target.value);
  // }

  // const handleFormikSubmit = (values) => {
  //   console.log(values)
  //   delete values.passwordcontrol
  //   console.log(values)
  //   setUserData(values);

  //   // document.getElementById('login').reset()
  //   // if (!signedUp) {
  //   //   SignUp()
  //   // } else {
  //   //   SignIn()
  //   // }
  // }


  // const handleSubmit = e => {
  //   // console.log('submit')
  //   e.preventDefault();
  //   document.getElementById('login').reset()
  //   if (!signedUp) {
  //     SignUp()
  //   } else {
  //     SignIn()
  //   }
  // }

  // const handleConfirm = e => {
  //   e.preventDefault();
  //   document.getElementById('login').reset()
  //   confirmSignUp()
  // }

  // const handleNewAccountVerification = e => {
  //   VerifyAccount('ralph_amhof@hotmail.com')
  //   setSigneUpRequested(true)
  //   setSignedIn(false)
  // }

  // async function SignUp() {
  //   console.log('signup')
  //   console.log(userData)
  //   try {
  //     var respuser = await Auth.signUp({
  //       username: userData['email'],
  //       password: userData['password'],
  //       attributes: {
  //         email: userData['email'],
  //         phone_number: userData['phone_number'],   // E.164 number convention
  //         given_name: userData['given_name'],
  //         family_name: userData['family_name'],
  //         address: 'none',
  //       }
  //     });
  //     setSigneUpRequested(true)
  //     console.log({ respuser });
  //   } catch (error) {
  //     var message_filter = errorMessages.filter( message => message.message === error['message'])
  //     setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
  //     console.log('error signing up:', error);
  //   }
  // }

  // async function confirmSignUp() {
  //   try {
  //     await Auth.confirmSignUp(userData['email'], verificationCode);
  //     const respuser = await Auth.signIn(userData['email'], userData['password']);
  //     console.log('conf')
  //     console.log(respuser)
  //     setUser(respuser)
  //     setConfirmed(true)
  //     setSignedIn(true);
  //   } catch (error) {
  //     var message_filter = errorMessages.filter( message => message.message === error['message'])
  //     setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
  //     console.log('error confirming sign up', error);
  //   }

  // }

  // async function SignIn() {
  //   try {
  //     const respuser = await Auth.signIn(userData['email'], userData['password']);
  //     console.log(respuser)
  //     setUser(respuser)
  //     setConfirmed(true)
  //     setSignedIn(true);
  //   } catch (error) {
  //     var message_filter = errorMessages.filter( message => message.message === error['message'])
  //     setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
  //     // setConfirmationFailed(true)
  //     console.log('error signing in', error);
  //   }
  // }

  // async function GetUserAttributes() {
  //   // const userattr = null
  //   console.log('getuserattr')
  //   console.log(user)
  //   try {
  //     var userattr = await Auth.userAttributes(user)
  //   } catch (error) {
  //     console.log('error fetching user attributes', error);
  //   }
  //   SetLocalUserAttribute(userattr)
  // }

  // const SetLocalUserAttribute = (userattr) => {
  //   // console.log('set')
  //   // console.log(userattr)
  //   const newContentQRCode = contentQRCode;
  //   newContentQRCode['given_name'] = userattr[5]['Value']
  //   newContentQRCode['family_name'] = userattr[6]['Value']
  //   newContentQRCode['email'] = userattr[7]['Value']
  //   newContentQRCode['phone_number'] = userattr[4]['Value']
  //   setContenQRCode(newContentQRCode)
  //   setStringQRCode('startQRCode;' + contentQRCode['given_name'] + ';' + contentQRCode['family_name'] + ';' + contentQRCode['email'] + ';' + contentQRCode['phone_number'] + ';endQRCode')
  // }

  // async function VerifyAccount(attr) {
  //   try {
  //     console.log(user)
  //     const respuser = await Auth.verifyCurrentUserAttribute(attr);
  //     setConfirmed(true)
  //     setSignedIn(true);
  //   } catch (error) {
  //     var message_filter = errorMessages.filter( message => message.message === error['message'])
  //     setFormError([true, message_filter.length > 0 ? message_filter[0].translation : error['message']]);
  //     console.log('error signing in', error);
  //   }
  // }


  return (
    <div><h5>Test</h5></div>
  );
}

export default App;
