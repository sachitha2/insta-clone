import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCtPhy2FU5VPXt8-xZHSFF3SlbLTHKbJFE",
    authDomain: "insta-clone-9ff78.firebaseapp.com",
    databaseURL: "https://insta-clone-9ff78-default-rtdb.firebaseio.com",
    projectId: "insta-clone-9ff78",
    storageBucket: "insta-clone-9ff78.appspot.com",
    messagingSenderId: "672450643714",
    appId: "1:672450643714:web:b0aad66c35ccac4055e41b",
    measurementId: "G-PSB64FG5B4"
});
const db = firebaseApp.firestore();
const auth  = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};

