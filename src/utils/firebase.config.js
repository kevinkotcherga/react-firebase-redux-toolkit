// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: 'react-firebase-redux-too-b111a.firebaseapp.com',
	projectId: 'react-firebase-redux-too-b111a',
	storageBucket: 'react-firebase-redux-too-b111a.appspot.com',
	messagingSenderId: '770083731760',
	appId: '1:770083731760:web:41913d7209e6261502b0f5',
});

// Initialize Firebase
export const auth = app.auth();
export default app;
