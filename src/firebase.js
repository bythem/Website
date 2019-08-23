import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAWvWlPb7SDSbPgSVxbLQdDudZhYaGt-cI",
    authDomain: "bythem-f0fdb.firebaseapp.com",
    databaseURL: "https://bythem-f0fdb.firebaseio.com",
    projectId: "bythem-f0fdb",
    storageBucket: "bythem-f0fdb.appspot.com",
    messagingSenderId: "1016948882454",
    appId: "1:1016948882454:web:be72974fb1ed51ed"
  };
  firebase.initializeApp(config);
  
  export const db = firebase.database(); 
  export const fbStorage = firebase.storage();
  export const fbAuth = firebase.auth();