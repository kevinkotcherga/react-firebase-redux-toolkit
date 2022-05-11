// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAHz-Ezr_V3aw4zo3p4x-UkrUeemufwGrM',
	authDomain: 'react-firebase-redux-too-b111a.firebaseapp.com',
	projectId: 'react-firebase-redux-too-b111a',
	storageBucket: 'react-firebase-redux-too-b111a.appspot.com',
	messagingSenderId: '770083731760',
	appId: '1:770083731760:web:41913d7209e6261502b0f5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = app.auth();
