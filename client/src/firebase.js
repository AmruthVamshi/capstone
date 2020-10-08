import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbVGufIMyFpjrHQ90gXTRlalO1Cnk8LaU",
  authDomain: "helpastudent-be013.firebaseapp.com",
  databaseURL: "https://helpastudent-be013.firebaseio.com",
  projectId: "helpastudent-be013",
  storageBucket: "helpastudent-be013.appspot.com",
  messagingSenderId: "592263228874",
  appId: "1:592263228874:web:040cb5959bbbaf3c5d7333",
  measurementId: "G-ZNQ70817P4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
