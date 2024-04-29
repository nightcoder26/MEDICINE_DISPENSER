import {
  getDatabase,
  ref,
  child,
  onValue,
  get,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFgg3ewzqd649nmiRpcYCJOFlHJ-uDfSg",
  authDomain: "vendingmachine-5b13a.firebaseapp.com",
  databaseURL: "https://vendingmachine-5b13a-default-rtdb.firebaseio.com",
  projectId: "vendingmachine-5b13a",
  storageBucket: "vendingmachine-5b13a.appspot.com",
  messagingSenderId: "525459522182",
  appId: "1:525459522182:web:009eaf9991bdd2c34d0707",
  measurementId: "G-21S80HW2SN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
const userRef = ref(db, "users");
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

const form = document.getElementById("login-form");
form.addEventListener("submit", handleClick);

function handleClick(event) {
  event.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
}
