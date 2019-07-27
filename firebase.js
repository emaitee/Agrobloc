import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCj90Cmigw0a63Vmp4B0GqMUeTNfSLNs1k',
  authDomain: 'agrobloc-2ac86.firebaseapp.com',
  databaseURL: 'https://agrobloc-2ac86.firebaseio.com',
  projectId: 'agrobloc-2ac86',
  storageBucket: 'agrobloc-2ac86.appspot.com',
  messagingSenderId: '683543054266',
  appId: '1:683543054266:web:c65b01745bc00521',
};
// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);

export default fire;
